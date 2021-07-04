const express = require("express");
const path = require("path");
const fs = require("fs");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const bodyparser = require("body-parser");
const app = express();
const port = 80;

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    concern: String
});

const Contact = mongoose.model('Contact', contactSchema);

app.use('/static',express.static('static'));
app.use(express.urlencoded());

app.set('view engine','pug');

app.set('views', path.join(__dirname,'views'))

app.get('/',(req,res)=>{
    const params = {};
    res.status(200).render("home.pug",params);
});

app.get('/contact',(req,res)=>{
    const params = {};
    res.status(200).render("contact.pug",params);
});
// app.post('/contact',(req,res)=>{
//     var myData = new Contact(req.body);
//     myData.save().then(() =>{
//         res.send("Data has been saved");
//     }).catch(()=>{
//         res.status(400).send("Data has been not send");
//     });
//     // res.status(200).render("contact.pug");
// });
app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        // res.send("This item has been saved to the database");
        res.render("index.pug");
    }).catch(()=>{
        res.status(400).send("item was not saved to the databse");
    });
});
// app.post('/contact',(req,res)=>{
//     name = req.body.name;
//     phone = req.body.phone;
//     email = req.body.email;
//     address = req.body.address;
//     concern = req.body.concern;
//     let outputToWrite = `Name of the client is ${name},phone no is ${phone},${email},add is${address},about ${concern}`;
//     fs.writeFileSync('data.txt',outputToWrite);

//     const params = {};
//     res.status(200).render("contact.pug",params);
// });

app.listen(port,()=>{
    console.log(`The app started ${port}`);
})