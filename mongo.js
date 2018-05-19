const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
var MongoClient = require("mongodb").MongoClient;
var uri = "mongodb+srv://jen:111@cluster0-wjok0.mongodb.net/admin";
var ObjectId = require("mongodb").ObjectId;

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
        //return listingsCollection.insertOne(listing)
        return listingsCollection.updateOne(
            {_id: ObjectId(listing.itemID)},
            {$set: {...listing} }
        )
        .then(res => res.upsertedId)
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

function getRandomItems() {
    return listingsDB.then(listingsCollection => {
        return listingsCollection.find()
        .toArray()
    })
    .then(res=>{
        console.log("all",res)
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
        console.log(res)
        return res;
    }).catch(err => {
        console.log(err);
        return null;
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
    console.log(itemID)
    return listingsDB.then(listingsCollection => {
        return listingsCollection.find({'_id': ObjectId(itemID)})
        .toArray()
    })
    .then(res=>{
        console.log(res);
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
            details:{
                $elemMatch: {artistName: 'aisha'}
            } 
        })
        .toArray()
    })
    .then(res =>{
        console.log("RES on mongo", res)
        return res;
    }).catch(err =>{
        console.log(err);
        return null
    })
}

function createTransaction(){

}

function getCatItems(category) {
    return listingsDB.then(listingsCollection => {
        return listingsCollection.find({category})
        .toArray()
    })
    .then(res=>{
        console.log(res)
        return res;
    }).catch(err => {
        console.log(err);
        return null;
    })
}



module.exports = {
    createListing,
    search,
    getUserDetails,
    getArtistProfile,
    getItemDetails,
    getCart,
    getOrders,
    createTransaction,
    getArtistItems,
    getRandomItems,
    getCatItems,
    editListing,
}
