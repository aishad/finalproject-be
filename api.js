const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs")
var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://jen:111@cluster0-wjok0.mongodb.net/admin";
var ObjectId = require('mongodb').ObjectId;
const mongo = require('./mongo.js')

var connect = MongoClient.connect(uri,(err,client)=>{

app.use(bodyParser.raw({ type: "*/*", limit: "50mb" }));

app.use(express.static('images'))

app.post("/createListing", (req, res) => {
  let reqb = JSON.parse(req.body.toString());
  console.log("createListing-2",reqb)
  mongo.createListing(reqb)
  .then(itemID => {
    if(itemID) {
      //console.log('itemID', itemID)
      return res.send(JSON.stringify({ success: true, itemID }));
    }
    // console.log("createListing-3",RESB)
    res.send(JSON.stringify({ success: false }));
  });
});

app.post("/editListing", (req, res) => {
  let reqb = JSON.parse(req.body.toString());
  console.log("itemID!!!!!!!!!!!!!!!!",reqb)
  mongo.editListing(reqb)
  .then(resb => {
    if(resb) {
      return res.send(JSON.stringify({ success: true }));
    }
    return res.send(JSON.stringify({ success: false }));
  });
});

//////////////////
app.post('/uploadPicCat', (req, res) => {
  var extension = req.query.ext.split('.').pop();
  var randomString = '' +  Math.floor(Math.random() * 10000000)
  var randomFilename = randomString + '.' + extension
  fs.writeFileSync('images/cat/' +  randomFilename, req.body);
  res.send("/cat/"+randomFilename)
})

app.post('/uploadPicItem', (req, res) => {
  var extension = req.query.ext.split('.').pop();
  var randomString = '' +  Math.floor(Math.random() * 10000000)
  var randomFilename = randomString + '.' + extension
  fs.writeFileSync('images/items/' +  randomFilename, req.body);
  //console.log("req",req)
  res.send("/items/"+randomFilename)
})

app.post('/uploadPicProfile', (req, res) => {
  var extension = req.query.ext.split('.').pop();
  var randomString = '' +  Math.floor(Math.random() * 10000000)
  var randomFilename = randomString + '.' + extension
  fs.writeFileSync('images/profile/' +  randomFilename, req.body);
  res.send("/profile/"+randomFilename)
})

app.post('/uploadProfilePic', (req, res) => {
  var extension = req.query.ext.split('.').pop();
  var randomString = '' +  Math.floor(Math.random() * 10000000)
  var randomFilename = randomString + '.' + extension
  fs.writeFileSync('images/profile/' +  randomFilename, req.body); //NEED TO CHANGE WHERE PROFILE PICS GO images/artists/
  res.send("/profile/"+randomFilename)
})

app.post('/uploadSubmission', (req, res) => {
  var extension = req.query.ext.split('.').pop();
  var randomString = '' +  Math.floor(Math.random() * 10000000)
  var randomFilename = randomString + '.' + extension
  fs.writeFileSync('images/submission/' +  randomFilename, req.body); //NEED TO CHANGE WHERE PROFILE PICS GO images/artists/
  res.send("/submission/"+randomFilename)
})

// app.post('/uploadSubmission', (req, res) => {
//   var extension = req.query.ext.split('.').pop();
//   var randomString = '' +  Math.floor(Math.random() * 10000000)
//   var randomFilename = randomString + '.' + extension
//   fs.writeFileSync('images/submission/' +  randomFilename, req.body); //NEED TO CHANGE WHERE SUBMISSION PICS GO images/submissions/
//   res.send("images/submission/"+randomFilename)
// })
//////////////////


  // 1 ) Make sure you have the right input data
  // 2 ) Make sure the shouldOutput is right and comment it
  // 3 ) Create the function in mongo
  // 4 ) Export it
  // 5 ) Call the function with the right parameter in (reqb) with the then and how to deal with the then (see user detail how to call the mongo function)
  // 6 ) Insert the database call on the mongo file and make sure you return it
  // 7 ) Make sure you send it back to the front 
  // AT ALL TIME, refer yourself with the console.log that was already there with 1,2,3,4

app.post("/getArtistProfile", (req, res) => {
  let reqb = JSON.parse(req.body.toString());
  
  mongo.getArtistProfile(reqb)
  .then(RESB=>{ 
   // console.log("getArtistProfile-3", RESB)
   res.send(JSON.stringify(RESB));
  })
});

app.post("/getArtistAccount", (req, res) => {
  let reqb = JSON.parse(req.body.toString());
  let artistID = reqb.artistID;
  console.log(reqb.artistID)
  mongo.getArtistAccount(artistID)
  .then(RESB=>{ 
    //console.log("HEYHEY", RESB)
   // console.log("getArtistProfile-3", RESB)
   res.send(JSON.stringify(RESB));
  })
});

app.get("/getItemDetails", (req, res)=>{
  let itemID = req.query.itemID;
  mongo.getItemDetails(itemID)
  .then(resB=>{
   // console.log("front", resB[0])
    res.send(JSON.stringify(resB[0]))
  } )
});

app.post("/getOrders", (req, res) => {
  let reqb = JSON.parse(req.body.toString());
  mongo.getOrders(reqb.artistName)
  .then(RESB=>{
    res.send(JSON.stringify(RESB));
  })
});

app.post("/getSearchResults", (req, res)=>{
  let reqb= JSON.parse(req.body.toString());
//  let reqb = {searchTerm: this.props.query}
  //console.log("getResults-2", reqb);
 
  let terms = reqb.query.split(' ');
  mongo.search(terms).then(RESB => {
//    console.log('res', RESB)
    res.send(JSON.stringify(RESB))

  })
})


app.post("/getCart", (req, res) => {
  let reqb = JSON.parse(req.body.toString());
  let userID = reqb.userID
  //   let reqb = { userID : this.props.userID }
  //console.log("getCart-2", reqb);
  mongo.getCart(userID)
  .then(resB=>{
    //console.log('hehe', resB)
    res.send(JSON.stringify(resB))
  })
});

app.post("/getUserDetails", (req, res) => {
  // 1 ) Make sure you have the right input data
  // 2 ) Make sure the shouldOutput is right
  // 3 ) Define how to get the infos
  // 4 ) Write pseudo Code
  // 5 ) Create the function in mongo
  // 6 ) Export it
  // 7 ) Call the function with the right parameter in (reqb) with the then and how to deal with the then
  // 8 ) Insert the database call on the mongo file and make sure you return it
  // 9 ) Make sure you send it back to the front 
  // AT ALL TIME, refer yourself with the console.log that was already there with 1,2,3,4
  let reqb = JSON.parse(req.body.toString());
  //   let reqb = { userID : this.props.userID }
  //console.log("getUserDetails-2", reqb);

  mongo.getUserDetails(reqb).then(e=>{
    if(e){
      //console.log("getUserDetails-3", e);
      res.send(JSON.stringify({ success: true, ...e }));
    }else{
      res.send({success : false})
    }
  })
});

app.post("/checkout", (req, res) => {
  let reqb = JSON.parse(req.body.toString());
  //console.log(reqb);
  //console.log('mongo', mongo)
  mongo.checkout(reqb)
  .then(RESB =>{
   // console.log("createtransaction", RESB[0])
    res.send(JSON.stringify(RESB[0]))
  })
});

  app.post("/removeItem", (req, res) => {
    let reqb = JSON.parse(req.body.toString());
    // var reqb = {
    //     // userID
    //     userID : this.props.userID,
    //     // transactions
    //     cartItems : tempCartItems,
    //   }
    //console.log("removeItem-2", reqb);
    mongo.removeItem(reqb)
    .then(resB => {
      if (resB) return res.send(JSON.stringify({success: true}));
      return res.send(JSON.stringify({success: false}));
    })
    // let RESB = {
    //     cartItems: [
    //       //deleted the cartItem in question. we only had one cartItem example in this case
    //     ]
    // };
    //console.log("removeItem-3", RESB);
    //res.send(JSON.stringify());
  });

  app.post("/addToCart", (req, res) => {
    let reqb = JSON.parse(req.body.toString());
   // parsed contains name, blurb, description, id, etc.
    //   let quantity = parsed.quantity;
    // using the above info, add the item in question & its details to the user's list of cartitems
    mongo.addToCart(reqb.userID, reqb.cartObj)
    res.send(JSON.stringify({ success: true }))

  })

  app.get('/getRandomItems', (req, res)=>{
      //randomize items in the backend then send back those items
      // let RESB =
      //   [
      //       {
      //         itemID: "123456",
      //         name: "Spring Print",
      //         price: 50,
      //         artistName: "aisha",
      //         img1: "/items/43581461_041_b2.jpg",
      //         cat: "Spring",
      //         blurb: "Here's my spring print",
      //         quantity: 2
      //       },
      //       {
      //         itemID: "123457",
      //         name: "Awesome Embroidery",
      //         price: 100,
      //         artistName: "caro",
      //         img1: "/items/44313724_104_b.jpg",
      //         cat: "Spring",
      //         blurb: "Best embroidery ever!",
      //         quantity: 1
      //       },
      //       {
      //         itemID: "123458",
      //         name: "Pillow",
      //         price: 100,
      //         artistName: "caro",
      //         img1: "/items/44622173_045_b.jpg",
      //         cat: "Popular",
      //         blurb: "Check out my pillow",
      //         quantity: 1
      //       },
      //       {
      //         itemID: "123459",
      //         name: "Painting",
      //         price: 20,
      //         artistName: "jen",
      //         img1: "/items/45513033_045_b10.jpg",
      //         cat: "Prints",
      //         blurb: "This is a cool painting",
      //         quantity: 3
      //       },
      //       {
      //         itemID: "123450",
      //         name: "Cool Print",
      //         price: 30,
      //         artistName: "jen",
      //         img1: "/items/45589157_095_b.jpg",
      //         cat: "Prints",
      //         blurb: "Great print",
      //         quantity: 4
      //       }
      //     ]
      //   res.send(JSON.stringify(RESB));
      mongo.getRandomItems()
      .then(resB => {
        //console.log("all2",resB)
        res.send(JSON.stringify(resB))
      }
      )
  })

  app.get("/getCatItems", (req, res) => {
    let cat=req.query.cat;
    console.log("cat",cat)
    //using the cat, go through listings database and get the corresponding items
    // let RESB=[
    // { itemID: '123456', name: "Spring Print", price: 50, artistName: "aisha", img1: '/items/45589157_095_b.jpg', cat: "Spring" },
    // { itemID: '123457', name: "Awesome Emproidery", price: 100, artistName: "caro", img1: '/items/45513033_045_b10.jpg', cat: "Spring" }
    // ]
    // res.send(JSON.stringify(RESB));
    mongo.getCatItems(cat)
    .then(resB=> {
      //console.log("checkItems", resB)
      res.send(JSON.stringify(resB))
    }
  )
  })


  app.get("/getArtistItems", (req, res) => {
    let artistName=req.query.artistName;
    //using the artistName, go through listings database and get the corresponding items
    // let RESB=[
    // { itemID: '123456', name: "Spring Prints", price: 50, artistName: "aisha", imageURL: '/items/45589157_095_b.jpg', cat: "Spring" },
    // { itemID: '123457', name: "Awesome Emproidery", price: 100, artistName: "caro", imageURL: '/items/45513033_045_b10.jpg', cat: "Spring" }
    // ]
    mongo.getArtistItems(artistName)
      .then(resB=> {
     //   console.log("checkItems", resB)
        res.send(JSON.stringify(resB))
      }
    )
    // res.send(JSON.stringify(RESB));
  })

  app.get("/getArtistAccountItems", (req, res) => {
  // console.log("REQ",req.query.artistID)
    let artistID=req.query.artistID;
    mongo.getArtistAccountItems(artistID)
      .then(resB=> {
      //  console.log("artistItems", resB)
        res.send(JSON.stringify(resB))
      }
    )
    // res.send(JSON.stringify(RESB));
  })

  app.post("/userLogin", (req, res) => {
    let reqb = JSON.parse(req.body.toString());
    mongo.userLogin(reqb)
    .then(RESB =>{
      if (RESB){
        return res.send(JSON.stringify({success:true, RESB}))
      }
      return res.send(JSON.stringify({success:false}))
    })
    .catch(err =>console.log(err))
  });

  app.post("/userSignUp", (req, res) => {
    let reqb = JSON.parse(req.body.toString());
    let parsedReqb = {
      email: reqb.emailSignUp,
      firstName: reqb.firstName,
      lastName: reqb.lastName,
      password: reqb.passwordSignUp,
      confirmPassword: reqb.passwordSignUpConf
    };
    mongo.userSignUp(parsedReqb)
    .then(RESB => {
       if(RESB) {
         return res.send(JSON.stringify({ success: true, email: parsedReqb.email, id: RESB }));
       }
       return res.send(JSON.stringify({ success: false }));
      })
      .catch(err => console.log(err))
  });



  app.post("/artistLogin", (req, res) => {
    // let reqb = {
    //   artistName: 'aisha',
    //   aPassword: '123456',
    // }
    let reqb = JSON.parse(req.body.toString());
    mongo.artistLogin(reqb)
    .then(RESB=>{
      if (RESB){
        return res.send(JSON.stringify({success:true, RESB}))
      }
      return res.send(JSON.stringify({success:false}))
    })
    .catch(err =>console.log(err))
  });

  app.post("/artistSignUp", (req, res) => {
    let reqb = JSON.parse(req.body.toString());

    let parsedReqb={
         email: reqb.sEmail,
         artistName: reqb.sName,
        //  password: reqb.sPassword,
        //  confirmPassword: reqb.sPasswordConf,
         bio: reqb.sDescription,
         location: reqb.sLocation,
         profPicURL: reqb.sProfPicURL,
         imgURL1 : reqb.sImageURL1,
         imgURL2 : reqb.sImageURL2,
         imgURL3 : reqb.sImageURL3
    }
    mongo.artistSignUp(parsedReqb)
    .then(RESB =>{
      if (RESB){
        return res.send(JSON.stringify({success: true}))
      }
      return res.send(JSON.stringify({success: false}))
    })
    .catch(err => console.log(err))
  });



  app.get("/getItemsBought", (req, res) => {
    let userID=req.query.userID;
    //get the itemsbought for this userID via transaction database
    // let RESB = {
    //   itemsBought: [ 
    //     { itemID: '123457', name: "Awesome Embroidery", price: 100, artistName: "caro", imageURL: 'embroidery.jpg', cat: "Spring", blurb: "Best embroidery ever!", quantity: 1 },
    //     { itemID: '123458', name: "Pillow", price: 100, artistName: "caro", imageURL: 'pillow.jpg', cat: "Popular", blurb: "Check out my pillow", quantity: 1 },
    //  ]
    // }
    res.send(JSON.stringify(RESB));
  })
})
app.listen(4000, () => console.log("Listening on port 4000!"));
