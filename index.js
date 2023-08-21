//imports
const React=require( 'react');
const ReactDOM =require ('react-dom');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors'); // Import the cors middleware
const port = 3000; // You can change this port if needed
const axios = require('axios');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(express.json())
app.use(cors());
const path = require('path');
app.use(express.static(path.join(__dirname, 'C://Users/yasmine bargaoui/Desktop/bee back/index.html')));
app.use(express.static(path.join(__dirname, 'C://Users/yasmine bargaoui/Desktop/bee back/userDetection.html')));
//proxy
// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


//database
const users=[];
const mysql = require('mysql2');
const request = require('request');
const { redirect } = require('react-router');

const db = mysql.createConnection({
    host: '41.231.103.44',
    user:'folla',
    password: 'EQmUAh^822^o',
    database: 'radius_bee',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Database connected');
  }
});

/*app.post('/radacct/:framedipaddress', (req, res) => {
  const searchQuery = req.body.query; // Assuming the search query is in the request body

  // SQL query to search the database
  const sqlQuery = 'SELECT * FROM radacct WHERE framedipaddress LIKE ? limit 3';
  const queryParam = `%${searchQuery}%`;

  // Execute the query
  db.query(sqlQuery, [queryParam], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json(results);
    }
  });
});
*/
 

  //retrieving
  // Read all
  app.get('/', (req, res) => {
   res.sendFile('C://Users/yasmine bargaoui/Desktop/bee back/index.html')
  });



  app.get('/radacct', (req, res) => {
    const query = 'SELECT radacctid,framedipaddress,acctstarttime,acctstoptime FROM radacct limit 25';
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching :', err);
        res.status(500).json({ error: 'Failed to fetch' });
      } else {
        res.status(200).json(results);
      }
    });
  });
  /*app.post('/radacct/', (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).json(user);
  });*/
  



  // Read single
  app.get('/radacct/:framedipaddress', (req, res) => {
    const framedipaddress = req.params.framedipaddress;
    const acctstarttime=req.params.acctstarttime;
    const query = 'SELECT * FROM radacct WHERE framedipaddress LIKE ? limit 3   ';
  
    db.query(query, [framedipaddress|json], (err, results) => {
      if (err) {
        console.error('Error fetching item:', err);
        res.status(500).json({ error: 'Failed to fetch item' });
      } else {
        if (results.length > 0) {
          res.status(200).json(results[0]);
        } else {
          res.status(404).json({ message: 'Item not found' });
        }
      }
    });
  });
  
 

  
 //retrieving user 
 app.post('/radacct', (req, res) => {
  const framedipaddress = req.body;
const time=req.body;
let time1=time.time.toString()
  /*const  framedipaddress  = req.body; // Destructuring the 'ip' property*/
  console.log('Received IP:', framedipaddress.framedipaddress);
  console.log('recieved time:', time1);
time1=time1.replace("T"," ")
console.log(time1)

  console.log(framedipaddress)

  const query = "SELECT B.Nom,B.CIN , R.tel_adsl FROM radacct R,Bee_net_tn B WHERE (R.framedipaddress LIKE '"+framedipaddress.framedipaddress+"' AND (R.acctstarttime <='"+time1+":00'  AND R.acctstoptime>='"+time1+":00' )) and R.tel_adsl = B.telephone limit 1";
  console.log(query)
  db.query(query, (err, results) => {
    if (results.length > 0) {
      console.log(results)
      //res.status(200).json(results[0]);
const htmlContent=`


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Who Is</title>
<link rel="icon" href="/favicon.ico">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#000000">
<link rel="apple-touch-icon" href="/logo192.png">
<link rel="manifest" href="/manifest.json">
<title> Bee | Fournisseur d’accès internet </title>
<script type="text/javascript" async="" src="https://www.googletagmanager.com/gtag/js?id=G-66GY2J2XE3&amp;l=dataLayer&amp;cx=c">

</script>
<script type="text/javascript" async="" src="https://www.googletagmanager.com/gtag/js?id=G-ZY0DXSLW5N&amp;l=dataLayer&amp;cx=c">

</script>
<script async="" src="https://www.googletagmanager.com/gtm.js?id=GTM-NZDMLH9">

</script><script src="https://connect.facebook.net/signals/config/1122026921917321?v=2.9.121&amp;r=stable" async=""></script><script async="" src="https://connect.facebook.net/en_US/fbevents.js">

</script>
<script>!function(e,t,n,c,o,a,f){e.fbq||(o=e.fbq=function(){o.callMethod?o.callMethod.apply(o,arguments):o.queue.push(arguments)},e._fbq||(e._fbq=o),o.push=o,o.loaded=!0,o.version="2.0",o.queue=[],(a=t.createElement(n)).async=!0,a.src="https://connect.facebook.net/en_US/fbevents.js",(f=t.getElementsByTagName(n)[0]).parentNode.insertBefore(a,f))}(window,document,"script"),fbq("init","1122026921917321"),fbq("track","PageView")</script>
<noscript>
  <img height="1" width="1" src="https://www.facebook.com/tr?id=1122026921917321&ev=PageView
&noscript=1"/></noscript><script>!function(e,t,a,n,g){e[n]=e[n]||[],e[n].push({"gtm.start":(new Date).getTime(),event:"gtm.js"});var m=t.getElementsByTagName(a)[0],r=t.createElement(a);r.async=!0,r.src="https://www.googletagmanager.com/gtm.js?id=GTM-NZDMLH9",m.parentNode.insertBefore(r,m)}(window,document,"script","dataLayer")</script><noscript>
  <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NZDMLH9" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript><script async="" src="https://www.googletagmanager.com/gtag/js?id=G-66GY2J2XE3"></script>
<script>function gtag(){dataLayer.push(arguments)}window.dataLayer=window.dataLayer||[],gtag("js",new Date),gtag("config","G-66GY2J2XE3")</script>
<link href="/static/css/2.730d7cb3.chunk.css" rel="stylesheet">
<link href="/static/css/main.db5ab650.chunk.css" rel="stylesheet">
<style data-styled="" data-styled-version="4.4.1">

</style><style data-styled="active" data-styled-version="5.3.0">

</style>
<style>
  html {font-family: Helvetica;
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: transparent;
  }
  .header-container {
      background-color: #fff;
  }
  .pl-0, .px-0 {
      padding-left: 0!important;
  
  }
  .m-auto {
      margin: auto!important;
      
  }
  *, :after, :before {
      box-sizing: border-box;
  }
  
  *, :after, :before {
      box-sizing: border-box;
  }
  :root {
      --blue: #007bff;
      --indigo: #6610f2;
      --purple: #6f42c1;
      --pink: #e83e8c;
      --red: #dc3545;
      --orange: #fd7e14;
      --yellow: #ffc107;
      --green: #28a745;
      --teal: #20c997;
      --cyan: #17a2b8;
      --white: #fff;
      --gray: #6c757d;
      --gray-dark: #343a40;
      --primary: #007bff;
      --secondary: #6c757d;
      --success: #28a745;
      --info: #17a2b8;
      --warning: #ffc107;
      --danger: #dc3545;
      --light: #f8f9fa;
      --dark: #343a40;
      --breakpoint-xs: 0;
      --breakpoint-sm: 576px;
      --breakpoint-md: 768px;
      --breakpoint-lg: 992px;
      --breakpoint-xl: 1200px;
      --font-family-sans-serif: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
      --font-family-monospace: SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
  }
  html {
      font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
      line-height: 1.15;
      -webkit-text-size-adjust: 100%;
      -webkit-tap-highlight-color: transparent;
  }
  *, :after, :before {
      box-sizing: border-box;
  }
  button {
      padding: 10px;
      background-color: #17a2b8;
      border: none;
      color: white; 
      margin-top: 10px;
      }
      input{
      padding: 5px;
      font-size: 15px;
      }
      .logo-bee {
          width: 90px;
      }
      img, svg {
          vertical-align: middle;
      }
      img {
          border-style: none;
      }
  
  
  
  
  body {
  align-items: center;
          font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
  }
  
  .container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 80px;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  form {
      display: flex;
      flex-direction: column;
  }
  
  label {
      margin-top: 10px;
  }
  
  input {
      padding: 8px;
      margin-top: 5px;
      border: 1px solid #ccc;
      border-radius: 3px;
  }
  
  button {
      margin-top: 10px;
      padding: 8px 15px;
      background-color: #007bff;
      color: white;
      border: none;
      cursor: pointer;
  }
  
  button:hover {
      background-color: #0056b3;
  }
  
  #message {
      margin-top: 10px;
      font-weight: bold;
  }
  .table {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
}

.table th,
.table td {
  padding: 8px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.table th {
  background-color: #f2f2f2;
}
</style>
<meta name="description" content="Profitez des meilleures offres ADSL, VDSL avec Bee le meilleur fournisseur d’accès internet en Tunisie et bénéficiez d’une connexion internet à très haut débit." data-react-helmet="true"></head>
<body>

<div class="container">
  <img src="data:image/png;base64,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" class="logo-bee">
  <h1>Bee | Fournisseur d'accés Internet</h1>
  <div class="container mt-5">

      
      <div>
        Client avec ces informations :
        
        <br> 
      <table class="table">
        <thead>
          <tr>
            <th>Nom et Prénom </th>
            <th>CIN </th>
            <th>Téléphone </th>
          </tr>
        </thead>
        <tr >
          <td>${results[0].Nom}</td>
          <td>${results[0].CIN} </td>

          <td>${results[0].tel_adsl} </td>
       
        </tr>
        <tbody>
        </tbody></table>
  
    
          
      </div>
  
   <br>

  
   



`;
res.send(htmlContent)
    } 
    else  {
      const html1=`
      

      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Who Is</title>
      <link rel="icon"  type="image/x-icon" href="C://Users/yasmine bargaoui/Downloads/favicon.ico">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <meta name="theme-color" content="#000000">
     
      <link rel="manifest" href="/manifest.json">
      <title> Bee | Fournisseur d’accès internet </title>
      <script type="text/javascript" async="" src="https://www.googletagmanager.com/gtag/js?id=G-66GY2J2XE3&amp;l=dataLayer&amp;cx=c">
      
      </script>
      <script type="text/javascript" async="" src="https://www.googletagmanager.com/gtag/js?id=G-ZY0DXSLW5N&amp;l=dataLayer&amp;cx=c">
      
      </script>
      <script async="" src="https://www.googletagmanager.com/gtm.js?id=GTM-NZDMLH9">
      
      </script><script src="https://connect.facebook.net/signals/config/1122026921917321?v=2.9.121&amp;r=stable" async=""></script><script async="" src="https://connect.facebook.net/en_US/fbevents.js">
      
      </script>
      <script>!function(e,t,n,c,o,a,f){e.fbq||(o=e.fbq=function(){o.callMethod?o.callMethod.apply(o,arguments):o.queue.push(arguments)},e._fbq||(e._fbq=o),o.push=o,o.loaded=!0,o.version="2.0",o.queue=[],(a=t.createElement(n)).async=!0,a.src="https://connect.facebook.net/en_US/fbevents.js",(f=t.getElementsByTagName(n)[0]).parentNode.insertBefore(a,f))}(window,document,"script"),fbq("init","1122026921917321"),fbq("track","PageView")</script>
      <noscript>
          <img height="1" width="1" src="https://www.facebook.com/tr?id=1122026921917321&ev=PageView
      &noscript=1"/></noscript><script>!function(e,t,a,n,g){e[n]=e[n]||[],e[n].push({"gtm.start":(new Date).getTime(),event:"gtm.js"});var m=t.getElementsByTagName(a)[0],r=t.createElement(a);r.async=!0,r.src="https://www.googletagmanager.com/gtm.js?id=GTM-NZDMLH9",m.parentNode.insertBefore(r,m)}(window,document,"script","dataLayer")</script><noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NZDMLH9" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript><script async="" src="https://www.googletagmanager.com/gtag/js?id=G-66GY2J2XE3"></script>
      <script>function gtag(){dataLayer.push(arguments)}window.dataLayer=window.dataLayer||[],gtag("js",new Date),gtag("config","G-66GY2J2XE3")</script>
      <link href="/static/css/2.730d7cb3.chunk.css" rel="stylesheet">
      <link href="/static/css/main.db5ab650.chunk.css" rel="stylesheet">
      <style data-styled="" data-styled-version="4.4.1">
      
      </style><style data-styled="active" data-styled-version="5.3.0">
      
      </style>
      <style>
          html {font-family: Helvetica;
          line-height: 1.15;
          -webkit-text-size-adjust: 100%;
          -webkit-tap-highlight-color: transparent;
          }
          .header-container {
              background-color: #fff;
          }
          .pl-0, .px-0 {
              padding-left: 0!important;
          
          }
          .m-auto {
              margin: auto!important;
              
          }
          *, :after, :before {
              box-sizing: border-box;
          }
          
          *, :after, :before {
              box-sizing: border-box;
          }
          :root {
              --blue: #007bff;
              --indigo: #6610f2;
              --purple: #6f42c1;
              --pink: #e83e8c;
              --red: #dc3545;
              --orange: #fd7e14;
              --yellow: #ffc107;
              --green: #28a745;
              --teal: #20c997;
              --cyan: #17a2b8;
              --white: #fff;
              --gray: #6c757d;
              --gray-dark: #343a40;
              --primary: #007bff;
              --secondary: #6c757d;
              --success: #28a745;
              --info: #17a2b8;
              --warning: #ffc107;
              --danger: #dc3545;
              --light: #f8f9fa;
              --dark: #343a40;
              --breakpoint-xs: 0;
              --breakpoint-sm: 576px;
              --breakpoint-md: 768px;
              --breakpoint-lg: 992px;
              --breakpoint-xl: 1200px;
              --font-family-sans-serif: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
              --font-family-monospace: SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
          }
          html {
              font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
              line-height: 1.15;
              -webkit-text-size-adjust: 100%;
              -webkit-tap-highlight-color: transparent;
          }
          *, :after, :before {
              box-sizing: border-box;
          }
          button {
              padding: 10px;
              background-color: #17a2b8;
              border: none;
              color: white; 
              margin-top: 10px;
              }
              input{
              padding: 5px;
              font-size: 15px;
              }
              .logo-bee {
                  width: 90px;
              }
              img, svg {
                  vertical-align: middle;
              }
              img {
                  border-style: none;
              }
          
          
          
          
          body {
          align-items: center;
                  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
              margin: 0;
              padding: 0;
          }
         .body div
          {font-style: bold; }

                          .container {
              max-width: 1000px;
              margin: 0 auto;
              padding: 80px;
              border: 1px solid #ccc;
              border-radius: 5px;
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }
          
          form {
              display: flex;
              flex-direction: column;
          }
          
          label {
              margin-top: 10px;
          }
          
          input {
              padding: 8px;
              margin-top: 5px;
              border: 1px solid #ccc;
              border-radius: 3px;
          }
          
          button {
              margin-top: 10px;
              padding: 8px 15px;
              background-color: #007bff;
              color: white;
              border: none;
              cursor: pointer;
          }
          
          button:hover {
              background-color: #0056b3;
          }
          
          #message {
              margin-top: 10px;
              font-weight: bold;
          }
          .table {
          font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
          width: 100%;
          border-collapse: collapse;
          border: 1px solid #ddd;
        }
        
        .table th,
        .table td {
          padding: 8px;
          text-align: center;
          border-bottom: 1px solid #ddd;
        }
        
        .table th {
          background-color: #f2f2f2;
        }
      </style>
      <meta name="description" content="Profitez des meilleures offres ADSL, VDSL avec Bee le meilleur fournisseur d’accès internet en Tunisie et bénéficiez d’une connexion internet à très haut débit." data-react-helmet="true"></head>
      <body>
      
      <div class="container">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQQAAAB8CAYAAACPDs4SAAAABHNCSVQICAgIfAhkiAAAIABJREFUeF7tfXl8G9W1//eMZCdhDe8RtgchaUJpQhNL0EJZCpbCEokfZWkTOeW1hdKSJhqlQOmj9HVxVyiP1RoFUmiBlgdSQktaimUKSAot0D4IkgMkLAHCvoWyJ3Zszfl9rmQnsmNbs93Bhpl/suhs99yZ79y59ywE7/I8IMEDLdnUGWCcsZ1oggLwJAb2INC/Daua+UUmegrgp5jpSYX01elIoiDB1Loig6HkHwDsA8APoIFB4k8/gf0g8Xfu+z/2k6BhNIBoQr9gZrxP4NcYeBHAY0x4iHR/vlRYtKGucpcJyGV9nrqPiQdO61i2dyP3vuzkcJn5bRBd0z1+y69Whs5920nZI8kKhJPnE+h/JOh7GIwbi3m1TYJsSyI9QLDkNo/JiAdi7dpSIlpkhNYMDTPeY+JLNvc2XH77SQs3meG1QjuzObVTI+kvENFEK/z1eBi8lsr0jeIq9YF6tLJ/9wBBtoc/xvLn3bVssq+39zlZLmDGqwycvTwav12Wjn65gXDqxwRulainzODvlXKJSyXqqCvaA4S6LvII7HigpV37DYi+bkdGXV7Gd9PRuNQHadZRS3fzN+gvgzC+rj02CBi4rpRTv2lDhC1WDxBsuc9jrueBeR2p6T7GU/Xo7P6uEy5YPjd+iV05I/EHQsnLiehcmToqspl/VMwnfiZdzxAKPED4MLz+MdPZkk3dDGCB7GGXwUesiMj7Dg8emdwH4+gl2eMQ8nXgtM6cepsbump1eIDgtsc/hvoWdGgHMdOjsofOjHWZaHymTD3BUPI6EJ0lU0d1kcBv68yz1hSWiKNK1y4PEFxz9cdbUSybWk7APNleYPB/ZSKqjCPCiumzm9v29SnKC7LH0QcKq0r5RLMbuvp1eIDgprc/xrpid6VmoBePESD1nmPGJp0xbcWJ8VdluTsQTl5JoG/Lkl8r1+1PB6mT44bDPB1jxwOxrHYLgVqkW8y4NR2NS1uNBD/fNgl+5XnZJw6VVQLwTCmnTpPusz4FHiC45WlPD+bdmZzqK9N6ECmy3UGsz7klmsjJ0hMIab8kwoWy5NfKZeDcUk690g1dHiC44WVPx1YPtGRT1wND5Dg47SPGM+X9J81YcdD8LU6LFvIOOXbZruVyz4tE2EmG/EEy31TeaZi8erX8qEwPEFyYTU/FNg+c1t62bwN8G4jgc8EvP0lH4tKiCwPhZCuBfuzCOKAzftqZV6Xr8gDBjdn0dAzwQCyrXUag82S7hZm7dR/PWHFC4lkZuvY9/PIJkyY0rAdIZEJKvRj8Qc/mnsmPPXDev2Qq8gBBpnfHqOymkDa/M68ul2X+F/7+m513eHfziyDaRZaOfrkM3JOJxI+VpScYavsqSLlRlvxauTqjrTOvSj3d8ADBjZkcQzqaQskTFKKOMuNza/LqP2WZ3pJNiRDgy2XJHyCXMS8djd8qS1cgnHyYQEFZ8reBG2/RdZ4mM1jJAwTZsziG5E9pvn78RHp/LRFNZUaplFel3eTN+Vb/Xl2TRI7DFBdc9Ep51+5pK444b7MMXbND2mE+wj9kyB4skxk3lvLq9oVnHFLuAYJDjvwoiAmGtYsBXLDtjaSfXcotuVbW2OZ3JL+osCLtzT1wlcC/SkfV78kaSyCcvJlA0vM1GKzr7Ju5Jr/4CRlj8QBBhlfHoMymkHaQAi5VS4JVL2a8tYVp8tpC/H1ZQ2rJpu4DcIQs+TVye5jLMzLRJU/L0DXj88v2Htew5VkCjZMhv1Ymg1eWcolTZeipAMKC9qXHGBW+eUJ3p5vlq4za5dHZ80AgrN1HQzyYDL6qlEucY0/68Nwt7VcHQfrDsuQPeJAYt2ei8S/I0uXmMSSX6dDSqviDTo+FLASKbOgavyXogYLTU/HhyauzU16mXpr18L3xdbIsbMlqGYDmy5JfK1cnOm753MV3y9BVOYYc3/A0iPaWIX+QzHuLOdXwi9yoPQIQ2CjxNjo99GFVwDVvq8cxkgdEvcBxxM+CsPsIdFJuvn59X75D219XRIVlNMieLQbWz5j7xoGt1KrL0BVoTp1OCt8kQ/Z2MplPLuYTf3ZSlwcITnpzDMoyWgVIdtZdSzYlUpbPd8OFTDgnMzd+lSxdwVDyARB9Tpb8rXIZ64u8cQYKrb1O6fIAwSlPjkE5s0NLD/SR/hhgJIyYn+9+dc8D1q6VkxtwenvbLr3ke56AXWW7UlRt7p6wZbKsz95AcypAChdlj6MiX6fzi4X4ZU7p8gDBKU+OQTmBsJYjIGTUdGb8dymv/tIovVm6+R2p/1IYvzLLZ4Wewb/ORNSFVniN8ARDyRtB9FUjtPZo+F3We/cvFZzpU+EBgr3ZGLPcTaG20xRSREciM9embp2mrS3IKT4SaW8btysUkR69rxmjrNCyKDXgx0GZ4+Rslh7SvGx3XekRJeh3sGKfKR7GsmJe/ZYpnmGIPUBwwotjTMbMmcsbx+35+noQ9jNrOgO3lnKqtOIjlRZwgEiRln4x872ZqPM79f2GB0LahUSQtqLq18MMVsp0kBMnQR4gSL/tRp+CprD2AwWwXOa7XNaPXrNqyd+kjIyZYh1L1xFwoBT5g4TqxLHlcyUlcjW3+oPK7usB7C97LMzsSP1FDxBkz9Qokz+zObXXOIVFtJ7lpaxoPVbKvTkLkHN0Nz+rRRXQHS657pXy5ElTZBVSaQprpyrAH90YCzNOKeXVP9nR5QGCHe+NQd5gWPsdgK/YNp3xnWJelZat2JJNiRXIUbbtNCBAB/9weUT9uQFSSySBULJARI4HEQ1hzHNFfeN0O8eQHiBYmuKxyXTw0akZ7Oe1Tlgvju583PCJ1YWFG52QN1jGvDuXHuLT+SEZsreXyR+UWZ+6IrrkDRn6+vz+iLHjXZsW2DyG9ADBpv/HEruEN9XvizlV2tGaW70cxBwy+LpMRF5PxUAomSKixfLvF3vHkB4gyJ+hUaGhv/CJ08bo0A/rzC35P6flCnmx9rZpRD6xKefKVdb12StOTIg3ueNXoPmKiaCGZ4iwm+PCBwu0cQzpAYL02RkdCgLh5D8JdKgEa9YUc2qTBLkVkbF27QoikpZtWWs3A/lMJB6WNZZgSFsCgrSQ6Vq7e0hpevSexWvMjsUDBLMeG4P0fScLr8gznRcVc4lrZMiv1l/seg5uvFkrNSAomokuzsoYC9CqBEO7PwHCdDnyt0m1egxpERBwA4ANANf0naOtfxflt4j4bWEeM70NBQVdwaoVx8dLsh0h5M/7ayrgL3OTzggQIcBME8WfA94GfTYKWxVCieFblY4s2mDUvlPyV0wc191wDDEF+v3AFX00EdiWDVrNJuVCVS5tYELJTV8IrYFQ24lEyl+Mjs00HWNjb4/yyUf+vvgt07wGGFo6tDiYNAOktkmY+ckZkY0zpGVDyp6LGg+wzqeWComVZpxiFRDM6NhKKzraAlRQiFfeElEdrVTbkr16CnP520R0itU6fQIcGPST5dHFwzpxQVb7ms50zmCAGeiQwYCwvbuEL4hoZdmHq2QDZSCknUwEUzeG6QlmThbziSWm+QwwtHKrsq5j0hME+W/WyksM+FYmEl9mwDRLJBI2d4ezw/QxpKuAMMjqDQRutQsMAggAXTSwsF14koE/dY/fcsZQWXAt2dSPmfmc6gqg3lUfEAZK4ELZR+fKAobZzam5PoUlLYO3jYR6aaYT4bNDeXfBndpxrNNf63neod9f/6DXP/X2k+R0SnLzGJKZLyjlE5cY9cuHCQgVG8VbWffjTCsPg3hIATjUmYdvTEe2r2YrPj98ZdxmbtVhFhC2TldrOhL/idHJM0r36aNT+zX4+Xmj9DbopBZSiWW1OwgUtWGfCVa+KB1Rv2+CwRRpIKQtJcIiU0yWiPldRW+cZjRe5EMHhCoo8Nu6n0JGQUF8v4/vargN2LZvYclXW5mGBgPriTaWAUF4o9A1vudUp3P1A2HtNQL2sOen+txOhM8Op0UcQwK+J1xqA9cFnz4tfXzi5fqjNk8hjiFJ8T8HuNKs5rpSzliMxagAhBp3npmOxMWG5bBXZTNvc2N+5G94ExPE/FzXhJ7A4AfQ3nGXHUCorpq6J2wJOQkKgbB2LQHfMOEZi6T8fFF/c5qd8NmRFNubF9NDuikdidsP8x5GbbA59R0ofKlpq0wymMmGHFWAYGSlEGtPFR0Dg4pjt68PaX1l0D9T9gChumpCKRONO9Yoxa19hKoH+MJiLiF6PDh+VVaHmxufcesYkkBNt0TMn+cbHXggrD1NwCeM0lulY+D+Uk49sh7/qAKE/gdhuLejhQrRI4+fsSodjdccnVaPLH1l2Cx/ZR8Q+gy/IR2Jn1lvEo3+HgwlRd8FaUFENXZILaQSy6YWE5AyOm47dCy7dHtz8hRSSOxRSb90nb/SWUiMWAB21AFCHyhclYnGB0SnzW9feopC7KjjdKZTa48Yq58jDc8aO0kYaf4cA4QhVzBW7xzp8Qi1hjH/rphPfM2qrfX4Yu3aGiKaVY/Oid8ZODQTcb4HQr9tbh1DMvi1zd07HPDEfWe9N5xfRiUgCGO7xm/ZrfYbuiWbEi29HesDyMA7mUh8wBFiSzYlTizEyYXNy0lAwIZ0JD7VpkFb2SWGMG9nYln3zVpTWPSoU7bXyhHZkIrODxIgvfuY7MpKs0JLD/GT7kpmJzNSpbyqjjlAAPCTdCReOVK0/01fyWbrJBE1Kb5wq1GLhUwkLoKYKpcTqwMBMsQolf04p//EJJZNve1AJeG6m61GH7pgqK0JpKx2JRWX+c5iPjHXqG1m6VraU1eD4EgtwXq6SeHjbzlBvasendXfg6HkH0B0mlV+o3xig1Fn3+zhgNriCoFv7AtPHhCKXPYpb/vKeuWtyyKkl3CG2JQxauwAuprve6urg8oDClwJKDcMDksWADBoBWJ5dSACmnQfWoc7Nq0ekzaeAuZWEJkup+X0BmMwnLwIIGmNT2vnkZmPKuUTon+j49e8u5bt6uvpFbUhR2oy44he8ULJRNQB4e+OCO4T0jRH+yQxryOQ4qTcIWUxP1TMJz471G8WAcF456ZYuyai+66wMMjKW9Hq3kFlRQDfKUbzE6yCDgDDb+++HfKVIJiunlP2IWg0TqOerw85ZFmDvkvPWjeSbDDCzVfPTiO/t3RoXwGTqALlwsWnpSOqo/tYtUYHQ8nrQHSWCwMRr+whE9KkA4IYnJVv8/49hJasdgNApjanqisDJWAUDKyeLDDzuZmoeqWZCayCQoPY7Te7Utj6CWVG33C0wbB2NIBVTsiqK0OnecVCXFrbd/c6SPPj6bnxmSCy0P6wrpcw+4ir9/CNK4vMzvH1qe1RiCP+LoWmP36P+matJFcAoQIK7doGow9B7fIs1q69ZXbX3+yDagWwwPxcOqpa2uS0tOoZ4ojU3i0BBMLJ2wiVZDCpFzM/W8q/OV1WUdbYHdonSSGxeSm9NySIv5qeq/5elsMCIe0SInxXlvxaucy4sZQfGK7vGiCY+XRgRuXY0cqbW6wOusdvmWImyq+lPVWwsIw3/Kkw1OSaAch+/nQk7uiO+swjr5w8rtEvvsGlP0i6Tt/qLMjLIGxp1y4G0QUuPEgvfGruG1NkpUdPP6xtl513VETeifSWdhVflXFEcZX6QL/fXAOEvqxEcXRo5Ko8bJZOFyy8Sa2sQgBlqtFPkiEBwcKn0FBRlUacORJNIKRpRIjblVOXn/mVt3inT2wonNlVl9YCwRn568d3dW16EjDffMasOmZenImqV5vlM0ofDCe/B9BFRunt0FVL6icOch0QKp8NhlvPVzctLS3la44rjTiq7wTAdGEPu29rK2Mz+ylkZPyz5iz9hE/X1xO5cZ4vtzdkLLt0HoGXGxm3HRpmvJqJxve2I2Mk3umRtnE7ddNzBNpTlo4Bnw46zigVqvVJXFshVADB4NLczoZibfyCEWe2ZJPNgJI3QruVxsIqZLB8S/sIJsHO6JiCIS0LgrR4gW128LuK0jh59d0L3zFqm1k61yIYJe8lNIW0sxWCtCItA/3Kzxdzicom96gEhP63r1EAGXTTmPq2/7AAwZJeSYAQcDGeHsDiYk7ecnt+e+okhfBns0Bimp45l46qc0zzGWWYt9wXePO1l9xaJZRBX1iTi9/+kQOE2nqOQ/ueVvVHQFY/Y8yvEKrlzzBsfcja6kdVUOPtjqmGqvNo4F5x9OixX9+so5bu5m/U/2VAv20So1l3dhTF2rXniGiyHRn1eBncu6m3YVdZVZWE/mAo+VMQ/bCeLY78zvhDMa9+6SMHCAacM+ChsrRxWVeJo7kMNSvu7bMz65pikMC1NFwGv79Jn7j+n0veNWiaabJYNnURAdIjMXWi45bPXXy3aQMNMgSP0Q6HD/cbJLdHxry5mFd39ADBsYSm2vkYe4AQDGm3gvBFe3eVMW6deW5nPnGnMWrzVBb3Z0wrYiCeicSXmmY0wRAMa1KCoIYyoQwc4gGCBwiVeyMY0q4BYaGJe9UGKS8p5hJJGwJGZG25M7UfdEivIcnAxZlI/EJZ4xByAyHN4YJAw1vLoDM9QPAAoQoIYU1UOHIjsEeo+1Uxp0pd0seyKV12ajQDSzORuNQYjkBIW0mEk2WCTr9sUaHZAwQPEPoAwb1gGICvKeYSUisOt2S1jQD9u9wHaejivE7qDISSvyUix6pmjWwbX+wBwhgCBJFmXVvDwdEbL5xsJZADxWHqW1WvSEd9CfUpYtnUewTsVJ/SOgUzX5+Jql+3LqE+ZyCk3USE0+tTOkLxcw8QsinR4OV6R9y5VYikTUUTqdZmxxMIa1cQ4FJTVf5FKZf4gVkbjdKf/dCyhnff6N1ilN4qXX/OjVV+I3yBUPJOIjreCK1dGtb5nI8cIIjwXiIeoYekf0NtDoKlOIRKrQUe9uHpGt9b6k+uqsq3f4niM07VQxjKmkBIu4EIptLMrY6KoZ9dyi251ip/PT4rSXH1ZA71OwMXZiJxKdWl+/UFQslniMixEnojjVP01PjIAcJYCV22cgPK5AmGNVEbQdRIkH7JrKIkjG/JaksAkt52XSeOLZ+rSsudOPDI3+y8w7jN0uI1tpvoHn0PdwHBYKHU0Z7LICIVM1F1N+lPjmsKmIIh7QMQTXBB5SblnYaJq1cv7JGlK5ZN3U2AvLDiPsNJ0WfcckLicVnjCIZTCwC+WZb8AXKZHy/mEzPcBgSDQRbWsx3NbrxZzXYcXBXalUmTpGTW0clZfj+tkSR+4H0H3FrKqfNk6TqtY9neDdz7kuwjR4BfTkfU/5A1DiHX1SNHnX9QKiR+4RogmPlW7++XYCWs2Mrb23ha9oDpN5VEJfPGsSs7GNJ+BILjTWaHskvXcVJnQf2LXZuH43exUMql6UhcWmUjN/NLhC91+PbtzC16yTVAiLWnriTCt43cCHYqJvXJN/WwWsyqdLRfghG/yKIJhpIvg0hafn+/3dVSaglpbcvE6qCRe58B5NckLIM+tSKy+Alpc+JioJg4Pi3lE5XjU1cAwWzPg9qy41b6GohVQveEnqlGy6hZKVYinCejYImsG2w4ua5+p4K+XMzFb5E1xli75koQDwN/zETi0vI+gp9vmwS/8rwbxVZFEbWyrk9ZU1jyomuA0JLV8mZbt9vcWKw0SyVSTjVS5szmMZWp1Yish8Gq3GBY6wQw2yq/UT4xH6W86ljz2sF6Yx3awcQkGtDIvZh1ZszInKiKcm1SrkAo+Wsi+qYU4YOEMvMVpXzivP7/lrpCEHUUmfXbrHRr7n/72slcq9YtINGo5cZ6wGCl6Ok233KBWGm9JbrYkbLmwm/EvLVM++YJ3Z1GVztmbqJAWPsGAdLiAWptkZnh2MqtyrrspE4ifNrM+K3QMuN3mWhcWrxGMKyJeX/anc5a2NjNNHVtIf6+LUCoLRBSfRNXW6T1X8w8UawIrADBNiHbcv/tPaxVidsKp9AGABsGg4TVz4YhbqoNZR9OrWnltpLAw1bQNVIoxezJiZEbfWZzaqdG0kXQyyQj9HZoZBdFMVPR29Y4GGV9nLL/ijmLXrIjZyTeQFhbQcCXZMkfIJf1rxXzSwY0ubG4QnDF3K1LcSunDQYsHFAopbLP0dW4wYE+jAM6Nls8wRhovgM1HAf7IxBKXk5E5xrwk22SXlY+80h+sZTl/IK7r9xT72lYLztvofJSkZzd2HR0W1DxKw/bdrgBAQw8WMqphw4mHZ2AMMQDEMtqJct9Iodw0FBvXefeNA7nMjgMCMHm5GeY6P/cqLSMvtJcBu5RSySxbGo5AdLiGmqM6upWlP1vO2HR65YMNcAUCGv3EXCEAVJbJKLha7nMTY/cm3hkbAACtu8daXPjb0gHDhVcZPEIcpD80QsI1b6OW9aBaJqtu8oYc5l7yzNK9377KWPk5qgWtC89hokL5risUTPjkkw0Lq1eRGCOdhwx/mrNOrNcw6efj8YVwrCFRB38zu/34Ha6Khuh0Ev2Ph1GLyC4WbiTma8t5RNnm71djdDPe2x5o/L8648T3Ej84Q98rO/zv1F5dSADoeQjROTCpii/7fM1ThmuFP6oAgQjm2dWmr8Od4MNF68gViNKGQXroDA6AaES/dagv+zK+TajC7365OLflrxh5AE3SyPh5TC8CYQfpefGf2bWRqP0Tc3JmKJQ2ii9Hbp6LfVGESDwjV3je84xcrzmJCgAQ1e9sQcKoxMQmkLaVQphiZ0byjAv88+K+cSPDNObIKweZ5cfJ6JxJtgskTL4X5t6G/aTWW7dtRRnxupiXv3MSI4gK5GAljw7ApOViD/nNgArhg0ZXFT9fCivNL+ZOfoAoSl89X8oKFei0aRfzK+80dUz7cUHztssQ1dLNiVyIU6UIXsImeelI/ErZOkKhJPnE+h/ZMkfIFfnzxYLiYdGBARxpMfAldaXxzaGwlgF0ltFH0crUioNZFm/wULn5u3UlX0IDleARCxPGTjHuI8cBgQHOjYFQtqFRPilFT+b5tGxoFhQpSyBF9ypHcc6ubT5hlfSkfg+psdvkEGEKLNfeZoIOxtksUzGwA2lnFq3NuPW9uJ9EYEBMJqdeMBGtNwmEAyWLTIpGYp4YC1Xp60GW/Gpw4FTX5r0OcaAwT4gcKUqE0o6KyuXRxevtHwn9DG6Vc6bGX8v5dXP27V3KP5qROLuYvNtpgz5g2Uy42uZaHxA4I6Tet0qfc+M97oUTH38HvXNevZvBYTBhOIbmnppikIcYCBAjIlWgYIB0dyzAOaC7qeCrFJgfd+Wp1QiJCvARlvDf+s5oub3urkJ9cHTJCBUAJI3ACKKUi9YXTENN8Z9D798wqQJjZtM+MAS6Ujn25YEDmJq6dDiYNKckFVXBqOYjsYPrktnkeDgo1MzdB8/5kosiE7nFwvxy4yYOiwgjMRcWaqjd8o2GkX8feu/daaSQuVKOLPsWoAj2Vl9q/sDVZqBNvbz1doKDKy3aMSBgqYaI6FPFH9npgCRb2V/7kTfbriIXhz0WWRNl1Gbaulmh7TDfIR/WOE1w8OMX5fyqpRmL/PyqZ18myEyAN2pVKXw59InqP80M34ztG6VrGPgmVJu4wFAq27EPkuAYESwRzN6PBAIaScTwfZnx0gjEstSn69hP1mt3s3U07DreWaszETjp9qVMxx/MJT8Aoj+JEt+rdwyeM6aXCJnVJcHCEY9NYbpmsLaqQrwR5lDECW8S4WElMKmsfa2aYDvCSL4ZI6hT3ZP2e+fvuK4hXJawTW3+oO0+zoQpsseC4NXlnIJU8DmAYLsWRkF8meHtYN9gJTkosrwKgU63zzI6LLUrEtiWe0OAkXN8lmhZ+YrM1FVWtJXMKSdB4Kh73kr9vfzMLhb13l6f+ETo7I8QDDqqTFOFwwn3wFoFxnDMLssNWPD/I6lxyrMd5nhsUzL/G7XhJ79jQTHWdERaL5iIqjheTeOGXXGTzvzqulOXB4gWJnZMcgTDGmXgbC1Mo5jQ5CdzdiuPebaMSPhnMzcuJTPHuHvQCiZIqLFjvl+OEGMF4p5dbIVPR4gWPHaGOQ56PDL/61hQsPzBNrRKfOtLkuN6o9lUwsJuMYovS065udenbBxeiHU2mtLzjDMs0NLD1Sgr3PpmHFesRC/1co4PECw4rUxyhMMayJBx7Geijrww86c+nMZ7jjp9mU77OjvfRbAHjLkby+TT0tH1Ntk6QqEtDwRHGnrN5KNzLyqlE9Y1uMBgqw7YBTKnX5Y2y4776iI3fNhS7oZNpvxQvdre0xfu3a+lKaqLR2pH4LxU8P22CBkxj8y0fjhNkSMyNoUajtNIeUPsuT3yxWBYUqZDnr43vg6q7o8QLDquTHK19SsXaAosN2glBknlvJquww3zGtvm6TAt4EIO8iQv51MVg5ORxcVZeiaOXN547g9X18Pwn4y5NfKNJqvMJIdHiDInqVRJr9yg+712lMAWdp0EsNh4C+lnHqSrKG1ZDUNoLgs+QPkMv82HVXPkqUr0Jz8b1JIymfVQDDgbp/euO/qwsKNdsbiAYId741R3mBz6ktQeIUV82VvJH75Dm3/MpHIAJQehCSiK7c08tTbjq2f9GPFVzObU3uNU1iUVJe+0rF6zDh4XB4gWJnpjwCPjVj6nxdz6g9lucDFoqnQGecvjxpL+rEy3kBIu4kIp1vhNcPDzG9s7OrZ34n6Ex4gmPH8R4jWUrad7I3E9quDIN2VMuRgPPPqhDcOlHXMKCpbQ6EH3bhldMZZnXn1t07o8gDBCS+OURlmA2V01r/YmV8iLSeiJZu6Dy6UIRfTRazPuSVqPOnH7BS71iIPvLaUSxxk1r7h6D1AcMqTY1DOIccu21Uv94gd8N3rmc9AvpRTw/XorP7e0rH0RDBLaxM/yK470pH4/7Nqaz2+QDh1BoGvr0fnyO+MY4t59R5HZAmgdEqQJ2dsesBQ92dGT7nMB665NyEChRy/KpWQOiY9QZCfAQigp6zoB644Qc5YRIu8ccT6Q2hLAAAFMklEQVTPGgFZu45k5jtK+YSjwOYBgt1Z+QjwB8JajoDQ8EPhi4u5xIWyhupqiDJwaToS/66ssTSFtUsV4Duy5NfILfdAP/DR3BJxiuHY5QGCY64cu4JmH52cqvixjjBEWXPGq2/xjlM3FM7skjHCefdfPkF5u/E5N5rOgrGxPAFTV4S2dTt2ckzCjz4fPQFCg5Nyh5TFWFbMq99yWo8HCE57dIzKG7YqM/OXivmEtLDblqzIryDH8itGdD/zWemoM7vxQ+kJhrS7QZgj/RaQ2ATHAwTpszdGFMxb7gtsfF0U/Tyw32LZG4mndSzbu0HvedaNhisA1qQj8SZZs+FmWTRIbILjAYKsO2QMyp3d3PY5n6I8UDFd8kaiUBFr135LRHV7BTjhSgYOzUTicuICqmXRnnEnX4H/5Xuncb/VqxdKqaLtAYITd9tHSEYgpC0jwtnMfEkpn5DW7Th2V2oGevEYuXDSxeDrMhH1m7KmKRDSvk+EX8iSXytXByU6c3Fppeg9QHBjFseQjr4yX3/f2LXls06Ewg439Jb2VMFqnw8z7hQNePSGhikrjlsoeoM4frmZr8CMDaX8xmmyalcK53iA4PgtMvYFisYuMsEg1r40QsRSUqcHe5+Jv5mZq14na1YC4eTNBFogS/6A1YHOLZ2FREamLg8QZHrXkz2kB1qy2qMAORZuO5ybGXgwE4kfKmsaAuHUEQQW4dbyLwOdm50wwgMEJ7zoyTDsgfnZ1AIFuNkwg0VCFtuiijI7c8KiRy2KqMsWDGuitL20dm8DDCjjiOIqtbrhK/HyAEGicz3RAz1QDVHefT2Bpsr2DYOTmYi6RJYeOzUlzNvE2WIu4UpfCg8QzM+Ox2HRAy3t2tdB9BuL7MbZmF/btMuEA/581FnvGWcyRxkMJdeDaJo5LmvUPaQ0PXrP4jXWuM1xeYBgzl8etUUPnP3QsoZ33+gVcffyawsy/jMTjf+vRVPrsjWFk2cqIEfqD9RVBvy+mFO/aoDOERIPEBxxoyekngdi7doiIlpaj86B3+9PR+JHOiBnGBFMwVDqSTd6M4rgMGzhKcX7Ei/LG89AyR4guOXpj7EesTp45/Ve0cJsL8lu6GGdP505UX1Slp6m5uR/Kgr9Xpb8WrkM/m4pl7jUDV39OjxAcNPbH1NdsWxqMQEp+cPni9IR9fsy9QTCyScJdIBMHRXZjHuKefVY6XoGKfAAwW2Pfwz1tWS1lwDaR+rQmXPpqCo10zAQ0k4mwkqp46iAAT9e7vYfs+b+Ra9L1+UBgtsu/njri3Vo3yCmayV7YcOmncfPlnmqIOx3I+6AGU90KTjy8XvklIavNw/eCqGeh7zfbXkgltWekRp3wPwQ/Hxy+ni5G2+zw8mwD+RY7cIhncpYvVnBCR8WGAibPECwdbt7zCN5INaeOp0IN8nxEr8Jwo/Tc1UX9iYqrdzvIiJ53/SMjm6meWsLcqo5GZ0DDxCMesqjM+2BWDb1OGFbwRXTAoZgYGA9g2/k8XSlrFJog9XODmmH+Qj/cML+wTIYuIsA0fzmXhnyzcr0AMGsxzx6Qx6Y35H8osLKrYaI6xExvwjCDWWdl684MfFIPXKnfw+GtT8DcKyXJQMvEXMHlZXL7HRqdnqc3ieDDI96MiseWHBn8lOsV+MOiKGUFdpdASaxjn8nIqWOm5iJX2LCk73c8NQf5y585cN0azCkzdHBfgL7AaXyp87wExQ/+v5f7/t/KKLAqqCFXwdVeRibCPwqGC+jjM7i35a88WGOZyTd/x9jjQSFJ0PRcAAAAABJRU5ErkJggg==" class="logo-bee">
          <h1>Bee | Fournisseur d'accés Internet</h1>
          <div class="container mt-5">
        
              
              <div >
Le client n'existe pas                
                <br> 
           
              
            
                  
              </div>
          
           <br>

`;
res.send(html1)
      
    
     
   // res.json({message: 'Le Client avec l adresse IP effectuant une connexion dans le temps donné est :  ' +results[0].Nom + ' '+ results[0].Telephone  });

    


  // Perform any operations using the 'ip' value
  //res.json({message: 'Le Client avec l adresse IP effectuant une connexion dans le temps donné est :  ' +results[0].Nom + ' '+ results[0].Telephone  });


    };
//res.sendFile(res.send(results),'C://Users/yasmine bargaoui/Desktop/bee back/userDetection.html')
  })
 })