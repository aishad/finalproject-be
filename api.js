const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs")

app.use(bodyParser.raw({ type: "*/*", limit: "50mb" }));

app.use(express.static('images'))

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

  let RESB = { itemID: "123" };
  console.log("createListing-3",RESB)
  res.send(JSON.stringify(RESB));
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
//////////////////

app.post("/getArtistProfile", (req, res) => {
  let reqb = JSON.parse(req.body.toString());
  //let reqb = {artistName: this.props.artistName}
  console.log("getArtistProfile-2", reqb);

  RESB = {
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
  console.log("getArtistProfile-3", RESB)
  res.send(JSON.stringify(RESB));
});

app.get("/getItemDetails", (req, res)=>{
  let itemID = req.query.itemID;
  //get the itemdetails for this itemID
  let RESB = {
    itemID:itemID,
    name: "A pillow",
    imageURL: "items/pillow.jpg",
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
  RESB={
    searchItems: [
      { itemID: '123456', name: "Spring Print", price: 50, artistName: "aisha", imageURL: 'print.jpg', cat: "Spring", blurb: "Here's my spring print", quantity: 2 },
      { itemID: '123457', name: "Awesome Embroidery", price: 100, artistName: "caro", imageURL: 'embroidery.jpg', cat: "Spring", blurb: "Best embroidery ever!", quantity: 1 },
      { itemID: '123458', name: "Pillow", price: 100, artistName: "caro", imageURL: 'pillow.jpg', cat: "Popular", blurb: "Check out my pillow", quantity: 1 },
      { itemID: '123459', name: "Painting", price: 20, artistName: "jen", imageURL: 'painting.jpg', cat: "Prints", blurb: "This is a cool painting", quantity: 3 },
      { itemID: '123450', name: "Cool Print", price: 30, artistName: "jen", imageURL: 'print.jpg', cat: "Prints", blurb: "Great print", quantity: 4 },
  ]
  }
  console.log("getResults-3", RESB)
  res.send(JSON.stringify(RESB))
})

app.listen(4000, () => console.log("Listening on port 4000!"));
