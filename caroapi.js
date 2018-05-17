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
  console.log("createTransaction-2", reqb);

  let RESB = {
    transactionID: "12442312312"
  };
  console.log("createTransaction-3", RESB);
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
app.listen(4000, () => console.log("Listening on port 4000!"));
