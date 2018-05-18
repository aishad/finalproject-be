const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");

app.use(bodyParser.raw({ type: "*/*", limit: "50mb" }));

app.use(express.static("images"));

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
  let reqb = JSON.parse(req.body.toString());
  //   let reqb = { userID : this.props.userID }
  console.log("getUserDetails-2", reqb);

  let RESB = {
    firstName: "Jen",
    lastName: "O",
    email: "jen@email.com",
    address: "123 Blah St.",
    city: "Montreal",
    province: "Quebec",
    postalCode: "H13 1Y8",
    country: "Canada"
  };
  console.log("getUserDetails-3", RESB);
  res.send(JSON.stringify(RESB));
});

app.post("/createTransaction", (req, res) => {
  let reqb = JSON.parse(req.body.toString());
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

  let RESB = {
    transactionID: "12442312312"
  };
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

  app.get("/getItemDetails", (req, res)=>{
      let itemID = req.query.itemID;
      //get the itemdetails for this itemID
      let RESB = {
        itemID: itemID,
        name: "A pillow",
        imageURL: "items/pillow.jpg",
        blurb: "",
        artistName: "clara",
        price: ""
      }
      res.send(JSON.stringify(RESB))
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

  app.post("/getArtistProfile", (req, res) => {
    let reqb = JSON.parse(req.body.toString());
  
    let RESB = {
      artistName: "caro",
      bio: "I'm a cool artist",
      location: "Montreal, Canada",
      profPicURL: "",
      items: [
        {
          itemID: "123457",
          name: "Awesome Embroidery",
          price: 100,
          artistName: "caro",
          imageURL: "embroidery.jpg",
          cat: "Spring",
          blurb: "Best embroidery ever!",
          quantity: 1
        },
        {
          itemID: "123458",
          name: "Pillow",
          price: 100,
          artistName: "caro",
          imageURL: "pillow.jpg",
          cat: "Popular",
          blurb: "Best pillow ever!",
          quantity: 2
        }
      ]
    };
    res.send(JSON.stringify(RESB));
  });

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

app.listen(4000, () => console.log("Listening on port 4000!"));
