var express = require('express');
var socket = require('socket.io');
const path = require('path');
var fs = require('fs');
var DATA_DIR=process.env.DATA_DIR;
const fileOpenTrades = DATA_DIR + path.sep +  "open_repos_our.json";
var app = express();

var ourOpenTrades = {}
var ourOpenTradesCust = {}

function loadOpenTrades() {
     return fs.readFileSync(fileOpenTrades,'utf8');
}

function setTradesCust() {

    var repos = ourOpenTrades.repos;
    ourOpenTradesCust = { repos : [] };
    for(var i = 0; i < repos.length; i++) {
        var obj = repos[i];
        //delete obj.UpperTolerance;
        //delete obj.LowerTolerance;
        //delete obj.HigherLimit;
        //delete obj.LowerLimit;
        ourOpenTradesCust.repos.push(obj);
      
    }
}

function saveOpenTrades(currTrades) {
     var jsonStr = JSON.stringify(currTrades);
     if ( data.hasOwnProperty('repos')) {
        fs.writeFileSync(fileOpenTrades, jsonStr, 'utf8');
        console.log("currTrades:"+jsonStr);
        console.log("No Trades Written:" + currTrades.repos.length + " " + fileOpenTrades);
     };


}

var data = loadOpenTrades();
ourOpenTrades = JSON.parse(data);
setTradesCust();
console.log("No Trades Loaded:" + ourOpenTrades.repos.length);
console.log("No Trades Cust Loaded:" + ourOpenTradesCust.repos.length);
//console.log(JSON.stringify(ourOpenTradesCust));
//process.exit(0);

//if (ourOpenTrades.hasOwnProperty("repos")) {
//    console.log("No Trades Loaded repo:" + ourOpenTrades.repos.length);
//    saveOpenTrades(ourOpenTrades);/
//    
//}

server = app.listen(5000, function(){
    console.log('server is running on port 5000')
});

io = socket(server);

io.on('connection', (socket) => {
    console.log("connected...");
    console.log(socket.id);
    io.emit('RECEIVE_MESSAGE',ourOpenTrades);
    io.emit('RECEIVE_MESSAGE_CUST',ourOpenTradesCust);

    socket.on('SEND_MESSAGE', function(data){
        if ( data.hasOwnProperty('data')) {
            if ( data.data.hasOwnProperty('newTradeList')) {
                console.log("data:" + JSON.stringify(data));
                saveOpenTrades(data.data.newTradeList);
                ourOpenTrades = data.data.newTradeList;
                console.log("newlist total:" + ourOpenTrades.repos.length)
                setTradesCust();
                io.emit('RECEIVE_MESSAGE_CUST', ourOpenTradesCust);
            }
        }
        console.log("Sending message"+JSON.stringify(data));
        io.emit('RECEIVE_MESSAGE', ourOpenTrades);
        //io.emit('RECEIVE_MESSAGE',{"author":"justin2","message":"kkkkkkkkkkkkkkkkrrr"})
    });

    socket.on('SEND_MESSAGE_CUST', function(data){
        console.log("Sending message"+JSON.stringify(data));
        io.emit('RECEIVE_MESSAGE_CUST', ourOpenTradesCust);
        //io.emit('RECEIVE_MESSAGE',{"author":"justin2","message":"kkkkkkkkkkkkkkkkrrr"})
    });

});

