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
  res.send(randomFilename)
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
  res.send(randomFilename)
})
//////////////////

app.get("/getartistdetails", (req, res) => {
  //let reqb = JSON.parse(req.body.toString());
  reqb = { artistName: "caro" };

  RESB = {
    artistName: "caro",
    bio: "I'm a cool artist",
    location: "Montreal, Canada",
    imageURL: "mypic.jpg",
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


app.listen(4000, () => console.log("Listening on port 4000!"));
