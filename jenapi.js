const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");

app.use(bodyParser.raw({ type: "*/*", limit: "50mb" }));

app.use(express.static("images"));

  app.post("/userLogin", (req, res) => {
    // let reqb = {
    //   email: "jen@email.com",
    //   password: "123456",
    // }
    let reqb = JSON.parse(req.body.toString());
    let RESB = {
      email: "jen@email.com",
      firstName: "jen",
      id: "123456",
      success: true
    }
    res.send(JSON.stringify(RESB));
  });

  app.post("/userSignUp", (req, res) => {
    // let reqb = {
    //   firstName: "jen",
    //   lastName: "o",
    //   emailSignUp: "jen@email.com",
    //   passwordSignUp: "123456",
    //   passwordSignUpConf: "123456"
    // }
    let reqb = JSON.parse(req.body.toString());
    let RESB = {
      email: "jen@email.com",
      firstName: "jen",
      id: "123456",
      success: true
    }
    res.send(JSON.stringify(RESB));
  });

  app.post("/artistLogin", (req, res) => {
    // let reqb = {
    //   artistName: 'aisha',
    //   aPassword: '123456',
    // }
    let reqb = JSON.parse(req.body.toString());
    console.log(reqb)
    let RESB = {
      artistName: 'aisha'
    }
    res.send(JSON.stringify(RESB));
    console.log(res)
  });

  app.post("/artistSignUp", (req, res) => {
    // let reqb = {
      // sName: 'jen',
      // sEmail: 'jen@email.com',
      // sPassword: '123456',
      // sPasswordConf: '123456',
      // sDescription: "I'm an artist",
      // sLocation: 'Montreal, QC',
      // sProfPicURL: 'image.jpg',
      // sImageURL1: 'image1.jpg',
      // sImageURL2: 'image2.jpg',
      // sImageURL3: 'image3.jpg',
    // }
    let reqb = JSON.parse(req.body.toString());
    console.log(reqb)
    let RESB = "success"
    res.send(JSON.stringify(RESB));
    console.log(res)
  });

  app.post('/uploadProfilePic', (req, res) => {
    var extension = req.query.ext.split('.').pop();
    var randomString = '' +  Math.floor(Math.random() * 10000000)
    var randomFilename = randomString + '.' + extension
    fs.writeFileSync('images/item/' +  randomFilename, req.body); //NEED TO CHANGE WHERE PROFILE PICS GO images/artists/
    res.send("/item/"+randomFilename)
  })

  app.post('/uploadSubmission', (req, res) => {
    var extension = req.query.ext.split('.').pop();
    var randomString = '' +  Math.floor(Math.random() * 10000000)
    var randomFilename = randomString + '.' + extension
    fs.writeFileSync('images/item/' +  randomFilename, req.body); //NEED TO CHANGE WHERE SUBMISSION PICS GO images/submissions/
    res.send("success")
  })


  app.get("/getItemsBought", (req, res) => {
    let userID=req.query.userID;
    //get the itemsbought for this userID via transaction database
    let RESB = {
      itemsBought: [ 
        { itemID: '123457', name: "Awesome Embroidery", price: 100, artistName: "caro", imageURL: 'embroidery.jpg', cat: "Spring", blurb: "Best embroidery ever!", quantity: 1 },
        { itemID: '123458', name: "Pillow", price: 100, artistName: "caro", imageURL: 'pillow.jpg', cat: "Popular", blurb: "Check out my pillow", quantity: 1 },
     ]
    }
    res.send(JSON.stringify(RESB));
  })

app.listen(4000, () => console.log("Listening on port 4000!"));

