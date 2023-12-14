const mongoose=require('mongoose');
const schema = mongoose.Schema;

const UserVerificationSchema= new schema({
    userId: String,
    uniqueString: String,
    createdAt: Date,
    expiresAt: Date,
    verified: Boolean
});

const UserVerification=mongoose.model('UserVerification',UserVerificationSchema);
 module.exports=UserVerification; 