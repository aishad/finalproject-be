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

app.get('/listings', (req,res)=>{
  client.db("all").collection("listings")
  .find({'_id': ObjectId('5afdb3c1f050e705bfccb99e')})
  .toArray((err, result)=>{
    console.log("first", result)
  })
  res.send("found it")
})

app.get('/test', (req,res)=>{
  //let artistName="caro"
  console.log(mongo.fishing())
  var a = mongo.fishing()
  console.log("QWE",a)
  res.send("SUCCESS")
  //res.send(mongo.getArtistInfo(artistName))
})

app.post("/createListing", (req, res) => {
  let reqb = JSON.parse(req.body.toString());
  console.log("createListing-2",reqb)
  // reqb = {
  //     artistName: "aisha",
  //     name: 'print',
  //     price: 100,
  //     cat: "Prints",
  //     blurb: "cool print",
  //     quantity: 1,
  //     imageURL1: '/items/aisha.jpg',
  //     imageURL2: '/items/pillow.jpg',
  //     imageURL3: '/items/embroidery.jpg',
  // }

  // let RESB = { itemID: "123" };
  mongo.createListing(reqb)
  .then(itemID => {
    if(itemID) {
      console.log('itemID', itemID)
      return res.send(JSON.stringify({ success: true, itemID }));
    }
    // console.log("createListing-3",RESB)
    res.send(JSON.stringify({ success: false }));
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
  fs.writeFileSync('images/item/' +  randomFilename, req.body);
  res.send("/item/"+randomFilename)
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
  //let reqb = {artistName: this.props.artistName}
  console.log("getArtistProfile-2", reqb);

  // RESB = {
  //   artistName: "caro",
  //   bio: "I'm a cool artist",
  //   location: "Montreal, Canada",
  //   profPicURL: "",
  //   items: [
  //     {
  //       itemID: "123457",
  //       name: "Awesome Embroidery",
  //       price: 100,
  //       artistName: "caro",
  //       imageURL: "embroidery.jpg",
  //       cat: "Spring",
  //       blurb: "Best embroidery ever!",
  //       quantity: 1
  //     },
  //     {
  //       itemID: "123458",
  //       name: "Pillow",
  //       price: 100,
  //       artistName: "caro",
  //       imageURL: "pillow.jpg",
  //       cat: "Popular",
  //       blurb: "Best pillow ever!",
  //       quantity: 2
  //     }
  //   ]
  // };
  
  mongo.getArtistProfile(reqb).then((e)=>{
    console.log("getArtistProfile-3", e)
    if(e){
      res.send(JSON.stringify({success : true, ...e}))
    }else{
      res.send(JSON.stringify({success : false}))
    }
  })
  
  //res.send(JSON.stringify(RESB));
});

app.get("/getItemDetails", (req, res)=>{
  let itemID = req.query.itemID;
  //get the itemdetails for this itemID
  let RESB = {
    itemID:itemID,
    name: "A pillow",
    imageURL: "items/45589157_095_b.jpg",
    blurb: "",
    artistName: "clara",
    price: ""
  }
  console.log("getItemDetails:", RESB)
  res.send(JSON.stringify(RESB))
});


app.post("/getOrders", (req, res) => {
  let reqb = JSON.parse(req.body.toString());
  //let reqb = {artistName: this.props.artistName}
  console.log("getOrders-2", reqb);

  RESB = {
    orders: [
      { orderID: "#6789", buyerName: "Joe", itemID: ['123457','123458'], total: 100, date: "May 15, 2018", fulfilled: "fulfilled" },
      { orderID: "#1237866", buyerName: "Joe", itemID: ['1479','123458'], total: 600, date: "May 10, 2018", fulfilled: "unfulfilled" }
  ]
  };
  console.log("getOrders-3", RESB)
  res.send(JSON.stringify(RESB));
});

app.post("/getSearchResults", (req, res)=>{
  let reqb= JSON.parse(req.body.toString());
//  let reqb = {searchTerm: this.props.query}
  console.log("getResults-2", reqb);
  // RESB={
  //   searchItems: [
  //     { itemID: '123456', name: "Spring Print", price: 50, artistName: "aisha", imageURL: 'print.jpg', cat: "Spring", blurb: "Here's my spring print", quantity: 2 },
  //     { itemID: '123457', name: "Awesome Embroidery", price: 100, artistName: "caro", imageURL: 'embroidery.jpg', cat: "Spring", blurb: "Best embroidery ever!", quantity: 1 },
  //     { itemID: '123458', name: "Pillow", price: 100, artistName: "caro", imageURL: 'pillow.jpg', cat: "Popular", blurb: "Check out my pillow", quantity: 1 },
  //     { itemID: '123459', name: "Painting", price: 20, artistName: "jen", imageURL: 'painting.jpg', cat: "Prints", blurb: "This is a cool painting", quantity: 3 },
  //     { itemID: '123450', name: "Cool Print", price: 30, artistName: "jen", imageURL: 'print.jpg', cat: "Prints", blurb: "Great print", quantity: 4 },
  // ]
  // }
  // console.log("getResults-3", RESB)
  let terms = reqb.query.split(' ');
  mongo.search(terms).then(RESB => {
    console.log('res', RESB)
    res.send(JSON.stringify(RESB))

  })
})


app.post("/getCart", (req, res) => {
  let reqb = JSON.parse(req.body.toString());
  //   let reqb = { userID : this.props.userID }
  console.log("getCart-2", reqb);

  let RESB = {
    cartItems: [
      {
        itemID: "123458",
        name: "Pillow",
        price: 100,
        artistName: "caro",
        imageURL: "items/pillow.jpg",
        cat: "Popular",
        quantity: 2,
        quantityToBuy: 1
      }
    ]
  };
  console.log("getCart-3", RESB);
  res.send(JSON.stringify(RESB));
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
  console.log("getUserDetails-2", reqb);

  // SHOULD OUTPUT V
  // let RESB = {
  //   firstName: "Jen",
  //   lastName: "O",
  //   email: "jen@email.com",
  //   address: "123 Blah St.",
  //   city: "Montreal",
  //   province: "Quebec",
  //   postalCode: "H13 1Y8",
  //   country: "Canada"
  // };

  // 5 V
  mongo.getUserDetails(reqb).then(e=>{
    if(e){
      console.log("getUserDetails-3", e);
      res.send(JSON.stringify({ success: true, ...e }));
    }else{
      res.send({success : false})
    }
  })
});

app.post("/createTransaction", (req, res) => {
  let reqb = JSON.parse(req.body.toString());
  console.log(reqb);
  //   var reqb = {
  //     // Shipping Infos
  //     firstName: this.state.firstName,
  //     lastName: this.state.lastName,
  //     email: this.state.email,
  //     address: this.state.address,
  //     city: this.state.city,
  //     province: this.state.province,
  //     postalCode: this.state.postalCode,
  //     country: this.state.country,
  //     // userID
  //     userID : this.props.userID,
  //     // transactions
  //     cartItems : this.state.cartItems,
  //   }
  //console.log("createTransaction-2", reqb);

  // let RESB = {
  //   transactionID: "12442312312"
  // };
  //console.log("createTransaction-3", RESB);
  res.send(JSON.stringify(RESB));
});




  app.post("/updateQuantity", (req, res) => {
    let reqb = JSON.parse(req.body.toString());
    // var reqb = {
    //     // userID
    //     userID : this.props.userID,
    //     // transactions
    //     cartItems : this.state.cartItems,
    //   }
    console.log("updateQuantity-2", reqb);
  
    let RESB = {
        cartItems: [
          {
            itemID: "123458",
            name: "Pillow",
            price: 100,
            artistName: "caro",
            imageURL: "items/pillow.jpg",
            cat: "Popular",
            quantity: 2,
            quantityToBuy: 2,
          }
        ]
    };
    console.log("updateQuantity-3", RESB);
    res.send(JSON.stringify(RESB));
  });

  app.post("/removeItem", (req, res) => {
    let reqb = JSON.parse(req.body.toString());
    // var reqb = {
    //     // userID
    //     userID : this.props.userID,
    //     // transactions
    //     cartItems : tempCartItems,
    //   }
    console.log("removeItem-2", reqb);
  
    let RESB = {
        cartItems: [
          //deleted the cartItem in question. we only had one cartItem example in this case
        ]
    };
    console.log("removeItem-3", RESB);
    res.send(JSON.stringify(RESB));
  });

  app.post("/addToCart", (req, res) => {
    //   let parsed = JSON.parse(req.body.toString());
    //   let userID = parsed.userID;
    //   let itemID = parsed.itemID;
    //   let quantity = parsed.quantity;
    // using the above info, add the item in question to the user's list of cartitems, then send back userinfo
    let RESB = {
        id: "123",
        firstName: "Jen",
        lastName: "O",
        email: "jen@email.com",
        address: "123 Blah St.",
        city: "Montreal",
        province: "Quebec",
        postalCode: "H13 1Y8",
        country: "Canada",
        cartItems: [
            {
              itemID: "123458",
              name: "Pillow",
              price: 100,
              artistName: "caro",
              imageURL: "items/pillow.jpg",
              cat: "Popular",
              quantity: 2,
              quantityToBuy: 1
            },]

    }
    res.send(RESB)

  })

//   app.get("/getItemsBought", (req, res) => {
//       let userID=req.query.userID;
//       //get the itemsbought for this userID via transaction database
//       let RESB = {itemsBought: ["123455", "123445"]}
//       res.send(RESB)
//   })


  app.get('/getRandomItems', (req, res)=>{
      //randomize items in the backend then send back those items
      let RESB =
        [
            {
              itemID: "123456",
              name: "Spring Print",
              price: 50,
              artistName: "aisha",
              imageURL: "/items/43581461_041_b2.jpg",
              cat: "Spring",
              blurb: "Here's my spring print",
              quantity: 2
            },
            {
              itemID: "123457",
              name: "Awesome Embroidery",
              price: 100,
              artistName: "caro",
              imageURL: "/items/44313724_104_b.jpg",
              cat: "Spring",
              blurb: "Best embroidery ever!",
              quantity: 1
            },
            {
              itemID: "123458",
              name: "Pillow",
              price: 100,
              artistName: "caro",
              imageURL: "/items/44622173_045_b.jpg",
              cat: "Popular",
              blurb: "Check out my pillow",
              quantity: 1
            },
            {
              itemID: "123459",
              name: "Painting",
              price: 20,
              artistName: "jen",
              imageURL: "/items/45513033_045_b10.jpg",
              cat: "Prints",
              blurb: "This is a cool painting",
              quantity: 3
            },
            {
              itemID: "123450",
              name: "Cool Print",
              price: 30,
              artistName: "jen",
              imageURL: "/items/45589157_095_b.jpg",
              cat: "Prints",
              blurb: "Great print",
              quantity: 4
            }
          ]
        res.send(JSON.stringify(RESB));
  })

  app.get("/getCatItems", (req, res) => {
    let cat=req.query.cat;
    //using the cat, go through listings database and get the corresponding items
    let RESB=[
    { itemID: '123456', name: "Spring Print", price: 50, artistName: "aisha", imageURL: '/items/45589157_095_b.jpg', cat: "Spring" },
    { itemID: '123457', name: "Awesome Emproidery", price: 100, artistName: "caro", imageURL: '/items/45513033_045_b10.jpg', cat: "Spring" }
    ]
    res.send(JSON.stringify(RESB));
  })


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
})
app.listen(4000, () => console.log("Listening on port 4000!"));
