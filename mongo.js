const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
var MongoClient = require("mongodb").MongoClient;
var uri = "mongodb+srv://jen:111@cluster0-wjok0.mongodb.net/admin";
var ObjectId = require("mongodb").ObjectId;
const fetch = require('node-fetch');

// var connect = MongoClient.connect(uri,(err,client)=>{
//     client.db("all").collection("artistInfo")

// connect.find({'artistName' : "caro"})

const connect = MongoClient.connect(uri, { useNewUrlParser: true });
const db = connect.then(client => client.db("all"));
const artistInfoDB = db.then(dbo => dbo.collection("artistInfo"));
const listingsDB = db.then(dbo => dbo.collection("listings"));
const transactionsDB = db.then(dbo => dbo.collection("transactions"));
const userInfoDB = db.then(dbo => dbo.collection("userInfo"));

listingsDB.then(listingsCollection => listingsCollection.createIndex(
    {
      name: "text",
      blurb: "text"
    }
  ))

// async function createListing(listing) {
//     const listingsCollection = await listingsDB;
//     try {
//         const res = await listingsCollection.insertOne(listing);
//         return res.insertedId;
//     } catch (err) {
//         console.log(err);
//         return null;
//     }
// }

function createListing(listing) {
    return listingsDB.then(listingsCollection => {
        return listingsCollection.insertOne(listing)
        .then(res => res.insertedId)
        .catch(err => {
            console.log(err);
            return null;
        })
    })
}

function editListing(listing) {
    return listingsDB.then(listingsCollection => {
        return listingsCollection.updateOne(
            {_id: ObjectId(listing.itemID)},
            {$set: { ...listing } }
        )
        .then(res => res.modifiedCount)
        .catch(err => {
            console.log(err);
            return null;
        })
    })
}

function editArtistAccount(artistacct) {
    return artistInfoDB.then(artistInfo  => {
        // console.log("ARTISTACCT",artistacct)
        return artistInfo.updateOne(
            {_id: ObjectId(artistacct.artistID)},
            {$set: { ...artistacct } }
        )
        .then(res => {res.modifiedCount})
        .catch(err => {
            console.log(err);
            return null;
        })
    })
}

function editUserAccount(useracct) {
    return userInfoDB.then(userInfoCollection  => {
        // console.log("USERACCT",useracct.userID)
        return userInfoCollection.updateOne(
            {_id: ObjectId(useracct.userID)},
            {$set: { ...useracct } }
        )
        .then(res => {res.modifiedCount
        // console.log(res.modifiedCount)
        })
        .catch(err => {
            console.log(err);
            return null;
        })
    })
}

function getUserDetails(reqb) {
    //console.log("reqb", reqb)
    return userInfoDB.then(e=>
        e.findOne({'_id': ObjectId(reqb.userID)})
    )
}

function getArtistProfile(artistName) {
    return artistInfoDB.then(e=>
        e.findOne({...artistName})
    )
}

function getArtistAccount(artistID) {
    return artistInfoDB.then(e=>
        e.findOne({'_id': ObjectId(artistID)})
    )
}



function getRandomItems() {
    return listingsDB.then(listingsCollection => {
        return listingsCollection.find()
        .toArray()
    })
    .then(res=>{
        //console.log("all",res)
        return res.slice(0,8);
    }).catch(err => {
        console.log(err);
        return null;
    })
}

function getArtistItems(artistName) {
    return listingsDB.then(listingsCollection => {
        return listingsCollection.find({artistName})
        .toArray()
    })
    .then(res=>{
    //    console.log(res)
        return res;
    }).catch(err => {
        console.log(err);
        return null;
    })
}
function getArtistAccountItems(artistID) {
   // console.log("FIRST",artistID)
    return listingsDB.then(listingsCollection => {
        return listingsCollection.find({artistID})
        .toArray()
    })
    .then(res=>{
   //    console.log("RES ",res[0])
        return res;
    }).catch(err => {
        console.log(err);
        return null;
    })
}

function getItemsBought(userID){
    //console.log("USER ID",userID)
    return  transactionsDB.then(transactionCollection =>{
        return transactionCollection.find({userID})
        .toArray()
    })
    .then(res =>{
        //console.log("RES", res)
        return res;
    }).catch(err =>{
        console.log(err)
        return null
    })
}

// function getArtistProfile(artistName){
//     return artistInfoDB.then(artistInfo =>{
//         return artistInfo.find({
//             artistName: artistName
//         })
//         .toArray()
//     })
//     .then(res =>{ 
//   //      console.log("RES on mongo",res);
//         return res;
//     }).catch(err =>{
//         console.log(err)
//         return null
//     })
// }

function getDuplicates(arr) {
    let hashMap = {};
    let duplicates = [];
    arr.forEach(e => {
        let stringified = JSON.stringify(e);
        if(hashMap[stringified] === 1) duplicates.push(e);
        if(!hashMap[stringified]) hashMap[stringified] = 1
        else hashMap[stringified]++;
    })
//    console.log('arr', arr)
    return duplicates;
}

function search(terms) {
    return listingsDB.then(listingsCollection => {
        return Promise.all(terms.map(term => listingsCollection.find({
            $text: { $search: term }
            })
            .toArray()
        ))
        .then(res => {
            let matches = [];
            res.forEach(arr => matches = matches.concat(arr))
            return matches;
        })
        .then(matches => terms.length > 1 ? getDuplicates(matches) : matches)
    })
}

// function getItemDetails(itemID) {
//     console.log(itemID)
//     return listingsDB.then(listingsCollection => {
//         return listingsCollection.find({'_id': ObjectId(itemID)})
//         .toArray()
//     })
//     .then(res=>{
//         console.log(res);
//         return res;
//     }).catch(err => {
//         console.log(err);
//         return null;
//     })
//     // return listingsDB.then(e=>
//     //     e.findOne({'_id': ObjectId(reqb.itemID)})
//     // )
// }

function getItemDetails(itemID) {
  //  console.log(itemID)
    return listingsDB.then(listingsCollection => {
        return listingsCollection.find({'_id': ObjectId(itemID)})
        .toArray()
    })
    .then(res=>{
  //      console.log(res);
        return res;
    }).catch(err => {
        console.log(err);
        return null;
    })
}

function getCart(userID) {
    //console.log(userID)
    return userInfoDB.then(userInfoCollection => {
        return userInfoCollection.find({'_id': ObjectId(userID)})
        .toArray()
    })
    .then(resp=> {
        //console.log('yes', res);
        let resObj=resp[0]; //res itself is in an array, so just access the 0th element of the array to get the object
        let cartItems=resObj.cartItems;
        return cartItems;
    }).catch(err=>{
        console.log(err);
        return null;
    })
}
function getOrders(artistName){
    return transactionsDB.then(artistInfo =>{
        return artistInfo.find({
            cartItems:{
                $elemMatch: {artistName: artistName}
            } 
        })
        .toArray()
    })
    .then(res =>{
        return res;
    }).catch(err =>{
        console.log(err);
        return null
    })
}

function addUser(signUpInfo) {
    return userInfoDB.then(userInfoCollection=>{
        return userInfoCollection.insertOne(signUpInfo)
        .then(res =>{
        return res.insertedId;
        })
        .catch(
            err =>{
                console.log(err);
            }
        )
    })
}

function userSignUp(signUpInfo) {
    return userInfoDB.then(userInfoCollection => {
        return userInfoCollection.findOne({ email: signUpInfo.email })
        .then(res => {
            if(!res) return addUser(signUpInfo)
        })
    });
}

function userLogin(loginInfo){
    return userInfoDB.then(userInfoCollection =>{
        return userInfoCollection.find({
            email: loginInfo.email,
            password : loginInfo.password
        })
        .toArray()
        .then(res =>{
            if(res.length>=1) return ({email: res[0].email, firstName: res[0].firstName, id: res[0]._id})
        })
        .catch(err =>console.log(err))
    })
}

function artistLogin(loginInfo){
    //console.log(loginInfo.aPassword)

    return artistInfoDB.then(artistInfoCollection =>{
        return artistInfoCollection.find({
            artistName : loginInfo.artistName,
            password: loginInfo.aPassword
        })
        .toArray()
        .then(res =>{
            if (res.length>=1) return ({email: res[0].email, artistName: res[0].artistName, artistID: res[0]._id})
        })
        .catch(err =>console.log(err))
    })
}

function artistSignUp(signUpInfo) {
    //(signUpInfo)
    return artistInfoDB.then(artistInfoCollection =>{
        return artistInfoCollection.findOne({ artistName: signUpInfo.artistName})
        .then(res =>{
            if (!res) return addArtist(signUpInfo)
        })
    })
}
function addArtist(signUpInfo) {
    return artistInfoDB.then(artistInfoCollection =>{
        return artistInfoCollection.insertOne(signUpInfo)
        .then(res =>{
       //     console.log("this is the res", res.insertedId)
            return res
        })
        .catch(
            err =>{
                console.log(err)
            }
        )
    })
}

function updateQuantity(item) {
   // console.log('item', item, item.itemID)
    return listingsDB.then(listingsCollection => {
        return listingsCollection.updateOne(
            { _id : ObjectId(item.itemID) },
            { $set: { quantity : item.quantity - item.quantityToBuy } }
        )
    });
}

function updateQuantities(items) {
    return Promise.all(items.map(item => updateQuantity(item)));
}

function createTransaction(transaction){
    return transactionsDB.then(transactionCollection =>{
        return transactionCollection.insertOne(transaction)
    .then(res=> {
        return res.insertedId;
    })
    .catch(err => {
        console.log(err);
        return null;
    })
})
}

function checkout (transaction) {
    return Promise.all([createTransaction(transaction), updateQuantities(transaction.cartItems)]);
}

function getCatItems(category) {
    return listingsDB.then(listingsCollection => {
        return listingsCollection.find({category})
        .toArray()
    })
    .then(res=>{
  //      console.log(res)
        return res;
    }).catch(err => {
        console.log(err);
        return null;
    })
}

function removeItem (tempCartDetails) {
    //console.log(tempCartDetails)
    return userInfoDB.then(userInfoCollection => {
        return userInfoCollection.updateOne(
            {_id: ObjectId(tempCartDetails.userID)},
            {$set: { cartItems : tempCartDetails.cartItems } }
        )
        .then(res => res.modifiedCount)
    })
}

function addToCart (userID, cartObj) {
    console.log("cartObj", cartObj)
    return userInfoDB.then(userInfoCollection => {
        return userInfoCollection.updateOne(
            {_id: ObjectId(userID)},
            {$push: {cartItems: cartObj } }
        )
    }).then(res=>console.log("CARTUPDATED", res))
}

function saveToken (tokenInfo){
    console.log("token Info", tokenInfo.accessToken)
    return artistInfoDB.then(artistInfoCollection =>{
        return artistInfoCollection.updateOne(
            {_id : ObjectId(tokenInfo.artistID)},
            {$set: {token : tokenInfo.accessToken}}
            )
    }).then(res=>{
        console.log("Added token");
        console.log("RESSSSS", res);
        return res;
    })
    .catch(err=>console.log(err))
    //.then(getIgData(tokenInfo.token))
}
function checkToken(artistName){
    return artistInfoDB.then(artistInfoCollection=>{
        return artistInfoCollection.find({
            artistName: artistName.artistName})
    .toArray()
    })
    .then(res =>{
        console.log("HI", res)
        let resB=res[0]
        if (resB.token) {return getIgData(resB.token)}
        else return null
    })
    .catch(err =>console.log(err)
    )}


function getIgData (accessToken){
    return fetch('https://api.instagram.com/v1/users/self/media/recent/?access_token='+accessToken, {
        method: 'GET'
    }).then(res=>res.text())
    .then(RESB =>{
        console.log("INSTAGRAM", RESB);
        return RESB
    })
}

module.exports = {
    createListing,
    search,
    getUserDetails,
    getArtistProfile,
    getArtistAccount,
    getItemDetails,
    getCart,
    getOrders,
    getArtistItems,
    getItemsBought,
    userSignUp,
    userLogin,
    createTransaction,
    checkout,
    getArtistItems,
    getArtistAccountItems,
    updateQuantities,
    updateQuantity,
    getRandomItems,
    getCatItems,
    editListing,
    artistSignUp,
    artistLogin,
    removeItem,
    addToCart,
    editArtistAccount,
    editUserAccount,
    saveToken,
    checkToken
}
