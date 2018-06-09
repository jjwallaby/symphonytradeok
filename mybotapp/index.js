const io = require('socket.io-client');
//var socket = require('socket.io');
const Symphony = require('symphony-api-client-node');
var UtilFunc = require('./src/utils/UtilFunc');
const recastai = require('recastai');

const clientRecastAI = new recastai.request('be1f2952f741f98afb33f4d7bfe66b4e', 'en');

process.on('unhandledRejection', (reason, p) => {
   console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});

//
// Globals
//
var allOpenTrades = {};
var newChanges = { newTradeList : {}, custTrade : {} };
const socket = io("http://localhost:5000");


socket.on('RECEIVE_MESSAGE', function (data) {
  console.log("Got new trades...");
  allOpenTrades = data;
})


function sendMessage(data)  {
  //ev.preventDefault();
  console.log("Get trades...");
  socket.emit('SEND_MESSAGE', {
      user: "owner",
      message: "gettrades",
      data : data
  });
}
console.log("send message");
sendMessage({});


var reply_message2 = '<div> \
<div>Messages for user <b>bot.user01</b>:</div> \
<table>  \
   <tr>  \
      <td>1504736061894</td>  \
      <td>Ping</td>  \
   </tr>  \
   <tr>  \
      <td>1504736023993</td>  \
      <td>Pong</td>  \
   </tr>  \
</table>  \
<br/> \
<br/> \
<h2>Cards</h2> \
<div class="card" data-accent-color="tempo-bg-color--blue" data-icon-src="http://rugbyfc.com/favicon.ico"> \
  <div class="cardHeader">Card Header. Always visible.</div> \
  <div class="cardBody">Card Body. User must click to view it.</div> \
</div> \
</div>';

var data_emoji = "{ \
  \"0\": \
  {\"type\":\"com.symphony.emoji\",\"version\":\"1.0\", \
  \"data\":{\"annotation\":\"hugging\",\"family\":\"\",\"size\":\"normal\",\"unicode\":\"?\"} \
  } \
}";
//var data_emoji = "{'':{'type':'com.symphony.emoji','version':'1.0','data':{'annotation':'hugging','family':'','size':'normal','unicode':'?'}}}";
var data_json = JSON.parse(data_emoji);

var reply_message3ml = "<div> \
<card iconSrc=\"http://rugbyfc.com/favicon.ico\"  accent=\"tempo-bg-color--blue\"> \
  <header>Card Header. Always visible.</header> \
  <body>Card Body. User must click to view it.</body> \
</card> \
</div>";
//<div data-format=\"PresentationML\" data-version=\"2.0\">
var reply_message3pl = " <div> \
<img src=\"http://rugbyfc.com/favicon.ico\"> \
</div>";


//data-icon-src=\"url\"
const botHearsSomething = ( event, messages ) => {
    console.log("REST:"+JSON.stringify(messages));
    messages.forEach( (message, index) => {
      console.log("JJW message received:"+JSON.stringify(message));
      var tradeSet = {};
      var ourTrade = {};
      var custTrade = {};
      var msgstatus = {};
      var statusOK = 1;
      var nplAI = {} ;
      var responseMsg = null;
      statusOK = UtilFunc.utilMsgCheckArticle(message,allOpenTrades.repos,custTrade,msgstatus);
      console.log("Artical Check Trade Status:"+msgstatus.status);
      if (msgstatus.status == "FAIL" && statusOK == -3) {
        //
        // Lets try NPL AI - RecastAI.
        // (clientRecastAI,tradeSet,MessageTxt,custTrade,msgstatus)
        //statusOK = UtilFunc.checkRecastAI(Symphony,clientRecastAI, allOpenTrades.repos,message, message.messageText, custTrade, msgstatus);
        //analyseText('Lend Repo 13m USD 1.6 T 1.25 19 start:20180604 end:20180620')
       
        var MessageTxt = message.messageText;
        var tradeSet =  allOpenTrades.repos;
        var me = this;
        console.log("ABOUT TO SEND MESSAGE:"+MessageTxt);
        clientRecastAI.analyseText(MessageTxt)
          .then(function (res) {
            if (res.intent()) { console.log('Intent: ', res.intent().slug) }
            if (res.intent().slug === 'trade') {
              // Do your code...
              console.log(JSON.stringify(res));
              m_ok = UtilFunc.validateRecastAI(res, nplAI, custTrade);
              if (m_ok == false) {
                //
                msg = "Missing " + (nplAI.totalEntities - nplAI.cntEntities) + " entry fields for Free Text quotations";
                console.log(msg);
                console.log("Missing fields - " + nplAI.missingList);
                console.log(nplAI.missingExample);
                msgstatus.status = "FAIL";
                msgstatus.dealdesc = "Invalid Ticket " + msg + " " + "Missing fields - " + nplAI.missingList
                msgstatus.errorMsg = nplAI.missingExample;
                responseMsg = UtilFunc.buildResponseArticle(message, custTrade, msgstatus);
                Symphony.sendMessage(message.stream.streamId, responseMsg, data_emoji, Symphony.PRESENTATIONML_FORMAT);
 
              } else {

                var statusOK = UtilFunc.matchFreeTextTrade(tradeSet, custTrade, msgstatus);

                responseMsg = UtilFunc.buildResponseArticle(message, custTrade, msgstatus);
                console.log("JJW REPLY DO SOMETHING 1..."+responseMsg);
                //let reply_message = 'Hello ' + message.user.firstName + ', hope you are doing well!!'
                Symphony.sendMessage(message.stream.streamId, responseMsg, data_emoji, Symphony.PRESENTATIONML_FORMAT);

                console.log("Returning Status...." + statusOK);
                //return statusOK;
              }
              //return 1;
            }
            //return 1;
          }).then(function (msg) {

          });

          console.log("OKAY return from checkRecastAI");
      } else {
        if (msgstatus.status == "DONE") {
          var newList = UtilFunc.buildNewTradeList(allOpenTrades, custTrade.keyid);
          newChanges.newTradeList = newList;
          newChanges.custTrade = custTrade;
          console.log("newchanges:" + newChanges.newTradeList.repos.length);
          sendMessage(newChanges);

        }
        responseMsg = UtilFunc.buildResponseArticle(message, custTrade, msgstatus);
        console.log("JJW REPLY DO SOMETHING 2...");
        let reply_message = 'Hello ' + message.user.firstName + ', hope you are doing well!!'
        Symphony.sendMessage(message.stream.streamId, responseMsg, data_emoji, Symphony.PRESENTATIONML_FORMAT);
        // OKAY ONE Symphony.sendMessage( message.stream.streamId, reply_message2, data_emoji, Symphony.PRESENTATIONML_FORMAT);
        //Symphony.sendMessage( message.stream.streamId, reply_message3pl, null, Symphony.PRESENTATIONML_FORMAT);
        //Symphony.sendMessage( message.stream.streamId, reply_message3pl, null, Symphony.MESSAGEML_FORMAT);
        //Symphony.sendMessage( message.stream.streamId, reply_message2, null, Symphony.MESSAGEML_FORMAT);
        };

    })
  
}

Symphony.setDebugMode(true);

Symphony.initBot(__dirname + '/config.json')
  .then( (symAuth) => {
    console.log("DO SOMETHING...");
    Symphony.getDatafeedEventsService( botHearsSomething );
  })
