const express=require('express');
const router=express.Router();
//mongodb user model
const User=require('./../models/User');

//mongodb userVerification model
const UserVerification=require('./../models/UserVerification');

//email handler
const nodemailer=require("nodemailer");

//unique string
const {v4: uuidv4}=require("uuid");

//env variables
require('dotenv').config();

//password handler
const bcrypt=require('bcrypt');

//path for static verified page
const path =require("path")

//nodemailer stuff
let transporter= nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS, 
    }
})


//testing success 
transporter.verify((error,success)=> {
    if(error) {
        console.log(error);
    }else {
        console.log("Ready for messages");
        console.log(success);
    }
})

//send verification email
const sendVerificationEmail=({_id, email},resp ) => {
    //url for the email
    const currentUrl="http//localhost:5000/";

    const uniqueString = uuidv4()+ _id;

    const mailOptions = {
        from :process.env.AUTH_EMAIL,
        to: email, 
        subject: "verify your email",
        html: `<p>verify your email  press <a href=${
            currentUrl + "user/verify/" + _id+ "/" + uniqueString
        }>here </a>.</p>`,
    };
//hash the uniqueString
const saltRounds=10;
bcrypt
.hash(uniqueString,saltRounds)
.then((hashedUniqueString) => {
    //set values in userVerification collection
const newVerification=new UserVerification ({
    userId:_id,
    uniqueString: hashedUniqueString,
    createdAt:Date.now(),
    expiresAt:Date.now()+ 21600000,
});
newVerification
.save()
.then(()=> {
    transporter.sendMail(mailOptions)
    .then(() => {
        resp.json({
            status: "PENDING",
            message: "verification email sent",  
    });
})
    .catch((error)=> {
        resp.json({
            status: "FAILED",
            message: "verification email failed",
    });
})
})
.catch((error)=>{
    console.log(error);
    resp.json({
        status: "FAILED",
        message:"couldnt save verification email data",
    });
})
})
.catch((error)=> {
    resp.json({
        status: "FAILED",
        message: "An error occured while hashing email data",
});
})


};

//verify mail
router.get("/verify/:userId/:uniqueString", ( req,resp)=> {
let {userId,uniqueString}= req.params;
UserVerification
.find({userId})
.then((result)=> {
    if (result.length > 0) {
        //user verification record exists 
    
        const{expiresAt}=result[0];
        const hashedUniqueString= result[0].uniqueString;

        //checking for expired unique string
        if (expiresAt < Date.now()) {
            //record has expired so we delete it 
            UserVerification
            .deleteOne({userId})
            .then(result => {
                User
                .deleteOne({_id:userId})
                .then(()=> {
                    let message = "link has been expired.please sign up again ";
                    resp.redirect('/user/verified/error=true&messages=${messages}');
            
                })
                .catch(error => {
                    let message = "clearing user with expired unique string failed";
                    resp.redirect('/user/verified/error=true&messages=${messages}');
                })

            })
            .catch((error)=> {
                console.log(error);
                let message = "an error occured while clearing expired user verification record ";
                resp.redirect('/user/verified/error=true&messages=${message}');
            })
        } else {
            //valid record exists so we validate the user string
            //first compare hashed unique string
            bcrypt
            .compare(uniqueString,hashedUniqueString)
            .then(result=> {
                if(result) {
                    //string match
                    User
                    .updateOne({_id: userId},{verified:true})
                    .then(() => {
                        UserVerification
                        .deleteOne({userId})
                        .then(()=> {
                            resp.sendFile(path.join(__dirname, "./../views/verified.html"));
                        }
                        )
                    })
                    .catch(error => {
                        console.log(error);
                        let message = "an error occured while updating user record  to show verified";
                    resp.redirect('/user/verified/error=true&messages=${messages}');
            
                    })
                } else {
                    //existing record but incorrect verification details
                    let message ="invalid verification details passed. Check your inbox";
                    resp.redirect('/user/verified/error=true&messages=${messages}');
            
                }
            })
            .catch(error => {
                let message = "an error occured while comparing unique strings";
                    resp.redirect('/user/verified/error=true&messages=${messages}');
             
            })

        }
    }else {
        //user verification record doesnt exist
        let message ="account record doesnt exist or has been verified already";
        resp.redirect('/user/verified/error=true&message=${message}');
    
    }
})
.catch((error)=> {
    console.log(error);
    let message="an error occured while checkingfor existing user verification record ";
resp.redirect('/user/verified/error=true&message=${message}');

})
});

//verified page route
router.get("/verified", (req,resp)=> {
    resp.sendFile(path.join(__dirname,"./../views/verified.html"));

})

//signup
router.post('/signup',(req, resp)=> {
let{name,email, password, dateOfBirth}=req.body;
name=name.trim();
email=email.trim();
password=password.trim();
dateOfBirth=dateOfBirth.trim();
if(name==""|| email==""|| password==""|| dateOfBirth=="")
{
    resp.json({
        status: "FAILED",
        message: "Empty input fields!"
    });
} else if (!/^[a-zA-Z]*$/.test(name )){
    resp.json({
        status: "FAILED",
        message: "invalid name entered"
    });

}else {
    User.find({email}).then(result => {
if (result.length){
    resp.json({
        status: "FAILED",
        message: "User with the same email"
    })
}else {

    //new user
     //password
      const saltRounds=10;
      bcrypt.hash(password,saltRounds).then(hashedPassword=>
        {const newUser=new User({
            name,
            email,
            password: hashedPassword,
            dateOfBirth,
            verified:false,
        });
newUser.save().then(result =>{
    //handle account
    sendVerificationEmail(result,resp);

})
.catch(err => {
    resp.json({
        status:"FAILED",
        message: "An error occured while saving user"
    })
})

        })
        .catch(err=> {
            resp.json({
            status: "FAILED",
            message: "An error with hashing the password"
        })
    })
}
    }).catch(err => {
        console.log(err);
        resp.json({
            status: "FAILED",
            message: "An error occured"
        })
    })
}
})

//signin
router.post('signin', (req,resp)=>{
let{ email, password }=req.body;
email=email.trim();
password=password.trim();
if (email ==""|| password=="")
{
    resp.json({
        status:"failed",
        message:"empty credentials supplied",

    });
}else {
    //check if user exists 
    User.find({email})
    .then((data) =>{
        if (data.length) {
            //user exists

            //check if user is verified
            if (!data[0].verified) {
                resp.json({
                    status: "failed",
                    message: "email hasnt  been verified yet check your inbox",
                });
            } else {
            }

const hashedPassword=data[0].password;
bcrypt
.compare(password,hashedPassword)
.then((result)=> {
if (result) {
    //password match 
    resp.json({
        status:"success",
        message:"signin success",
        data:data,
    });
}else {
    resp.json({
        status:"failed",
        message:"invalid password entered ",
    });
}
})
.catch((error) => {
    resp.json({
        status:"failed",
        message:"an error occured while comparing pass",
    });
});

  }else {
    resp.json({
        status:"failed",
        message:"invalid credentials",
    });
  }

        }).catch((err) =>{
            resp.json({
                status:"failed",
                message:"an error occured",
            });
        });
}
});
module.exports=router;