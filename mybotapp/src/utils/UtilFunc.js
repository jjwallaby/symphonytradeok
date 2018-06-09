
module.exports = {

    utilMsgCheckArticle: function (message,tradeSet,custTrade,msgstatus) {
        //
        // message example
        /*
{"messageId":"o5EC3D9h7EoNsvndju4U2n___pxEE2DQdA","timestamp":1527866236726,"message":"<div data-format=\"PresentationML\" data-v
ersion=\"2.0\"><i>Shared from TradeOK - TradeBlotter V2.</i><br/><b>Repo Borrow@1.675</b><br/>15m start:20180531 end:20180614QuoteTicket:DBS BANK LTD2
 ISIN:BBG0000CRMR5<br/><i>View this article in the TradeOK - TradeBlotter V2 application on the Symphony web or desktop client.</i></div>","data":"{}"
,"user":{"userId":349026222342245,"firstName":"Justin","lastName":"Woodhead","displayName":"Justin Woodhead","email":"justin_woodhead@hotmail.com","us
ername":"justin_woodhead@hotmail.com"},"stream":{"streamId":"RlYKHue-ABWJpXptd2S7QX___px89kUAdA","streamType":"IM"},"externalRecipients":false,"origin
alFormat":"com.symphony.markdown","messageText":"Shared from TradeOK - TradeBlotter V2.<br/>Repo Borrow@1.675<br/>15m start:20180531 end:20180614Quote
Ticket:DBS BANK LTD2 ISIN:BBG0000CRMR5<br/>View this article in the TradeOK - TradeBlotter V2 application on the Symphony web or desktop client."}
        */ 
        //
        console.log("MessageTxt:" + message.messageText);
        var strMsg =  message.messageText;
        if (! strMsg.startsWith("Shared from TradeOK")) {
            msgstatus.status = "FAIL";
            msgstatus.dealdesc = "Invalid Ticket"
            msgstatus.errorMsg = "Not a valid Article. Not shared from TradeOK";
            //
            // Try RecastAI machine learning
            //
            //var statusOK = this.checkRecastAI(clientRecastAI, tradeSet, message.messageText, custTrade, msgstatus);
            //console.log("OKAY return from checkRecastAI" + statusOK);
            return -3;    
        };

        //
        // Strip out Trade
        var a_fields = strMsg.split("/>");
        sizeArr = a_fields.Length;

        // 1 Repo Borrow@1.675
        // 2 15m start:20180531 end:20180614 QuoteTicket:DBS BANK LTD2 ISIN:BBG0000CRMR5
        if (( a_fields[1].includes("Repo ")) && ( a_fields[1].includes("@"))) {

            a_fields[1] = a_fields[1].replace("Repo", " ");
            a_sidePrice = a_fields[1].split("@");
            custTrade.Side = a_sidePrice[0];
            custTrade.Price = a_sidePrice[1];
            custTrade.Side = custTrade.Side.replace(" ","");
            custTrade.Price = custTrade.Price.replace("<br","");

        } else {
            msgstatus.status = "FAIL";
            msgstatus.dealdesc = "Invalid Ticket";
            msgstatus.errorMsg = "Not a valid Article. Message Text - Missing Repo side@Price";
            return -1; 
        }
        
        //
        // Get ticket no.
        //
        posn=a_fields[2].split(" ")[0];
        console.log("posn:"+posn);
        posn = posn.replace("mm","m"); // have a second m somewhere
        a_quoteTick = a_fields[2].split("QuoteTicket:");
        quoteTicket=a_quoteTick[1].split(" ISIN:")[0];
        console.log("QuoteTicket:"+quoteTicket);
        custPositionAbs = this.convertShrtStrNominal(posn);
        var custPosition = custPositionAbs;
        if ( (custTrade.Side === "Sell" || custTrade.Side === "Lend" ) ) {
            custPosition = custPositionAbs * -1
        } else {
            custPosition = custPositionAbs;
        }

        custTrade.quoteTicket =  quoteTicket;
        custTrade.Position =  custPosition;
        custTrade.PositionAbd = custPositionAbs;
        console.log("quoteTicket:"+quoteTicket);
        var ourTrade = this.lookupQuoteTicket(tradeSet,quoteTicket);

        if ( ourTrade == null ) {
            msgstatus.status = "NOT_FOUND_TICKET";
            msgstatus.dealdesc = "Cannot find our internal ticket"
            msgstatus.errorMsg = "Cannot find ourBank Orginal Quote Ticket. Maybe done already:"+quoteTicket;
            return -2; 
        } else{
           
            console.log("Found original ticket"+JSON.stringify(ourTrade));
        };

        custTrade.Start = ourTrade.Start;
        custTrade.End = ourTrade.End;
        custTrade.Tenor = ourTrade.Tenor;
        custTrade.keyid = ourTrade.keyid;
        custTrade.Ticker = ourTrade.Ticker;
        custTrade.ISIN =  ourTrade.ISIN;
        custTrade.CCY = ourTrade.CCY;

        //
        // check price range
        // Borrow Repo<span class="tempo-text-color--blue">2.5m</span>@1.675   <span style="background-color: #ff9900;">CAPLSP2.9522</span>
        var priceCheck = this.quoteCheckPriceTarget(ourTrade,custTrade.Price);
        if ( priceCheck == -1 ) {
            console.log("Not a good price");
            msgstatus.status = "NO DEAL";
            msgstatus.dealdesc = custTrade.Side + " Repo " + custTrade.CCY + ' ' + '<span class="tempo-text-color--red">' +  posn + "@" +   custTrade.Price + '</span><span style="background-color: #ffffff;"> ' +  ourTrade.ShortDesc + '</span>';
            msgstatus.keyid = quoteTicket;
            msgstatus.errorMsg = "Not a good Deal. Price not right!";
            return -2; 

        }
        msgstatus.status = "DONE";
        msgstatus.dealdesc =  custTrade.Side + " Repo " +   custTrade.CCY + ' ' + '<span class="tempo-text-color--blue">' +  posn + "@" +   custTrade.Price + '</span><span style="background-color: #ffffff;"> ' +  ourTrade.ShortDesc + '</span>';
        msgstatus.keyid = quoteTicket;
        msgstatus.errorMsg = "";
        return 1;
    },

    


    buildNewTradeList(currentRepos,doneTradeKeyId) {

        var repos = currentRepos.repos;
        var newList = { repos : [] };
        for(var i = 0; i < repos.length; i++) {
            var obj = repos[i];
            if ( obj.keyid != doneTradeKeyId) {
                newList.repos.push(obj);
            };
      
        };

        return newList;
    },

    convertNominal: function(nominal) {

        var shortNom = "";
        var newnom = parseFloat(nominal)/1000000;
        return newnom.toString() + "m";
        
    },

    
    convertShrtStrNominal: function(nominalStr) {

        // 5m
        var shortNomStr = nominalStr;
        shortNomStr = shortNomStr.replace("m","");
        var shortNom = "";
        var newnom = parseFloat(shortNomStr)*1000000;
        return newnom;
        
    },

    lookupQuoteTicket(tradeSet,ticket) {

        console.log("tradeSet"+tradeSet);
        console.log("tradeSet"+JSON.stringify(tradeSet));
        //tradeSet.filter(function(trade){ return tradeSet.keyid == ticket });
        console.log("tradeSetSize:"+tradeSet.size);
        console.log("ticket:"+ticket);
        var output = []
        var output = tradeSet.filter(function(value){ return value.keyid == ticket;})
        return output[0];
       

    },

    quoteCheckPriceTarget(ourTrade,custPrice) {

        var intCustPrice = parseFloat(custPrice);
        console.log("Customer Price:"+intCustPrice);
        console.log("Our Price Highest:"+ourTrade.HigherLimit );
        console.log("Our Price Lowest:"+ourTrade.LowerLimit );

        if ( intCustPrice > ourTrade.HigherLimit ) {
            return -1;
        } else if ( intCustPrice < ourTrade.LowerLimit) {
            return -1;
        } else {
            return 1;
        };
    

    },
    

    displayDateFmt(indate) {
        // YYYYMMDD



    },

    buildResponseArticle(message,custTrade,msgstatus) {

        var iconName = "";
        var status_display = "";
        var card_header = "";

        if ( msgstatus.status == "DONE" ) {
            // http://rugbyfc.com/favicon.ico"
            iconName = "http://rugbyfc.com/symphonyimg/done.png";
        } else  {
            iconName = "http://rugbyfc.com/symphonyimg/nodeal.png";
        }

        if ( msgstatus.status == "DONE" ) {
            status_display='<span class="tempo-text-color--green"> DONE </span>';
        } else if  ( msgstatus.status == "NO DEAL" ) {
            status_display='<span class="tempo-text-color--orange"> NO DEAL </span>';
        } else {
            status_display='<span class="tempo-text-color--red"> FAIL </span>';
        }

        var msg_table = ""
        if ( msgstatus.status == "DONE" ) {
            msg_table = '<b>Our Trader:</b>' + 'West Bank' + '<br/> ' +
            '<b>Your Trader:</b>' + message.user.firstName + ' ' + message.user.lastName + '<br/> ' +
            '<b>messageId:</b>' + message.messageId + '<br/> ' +
            "<b>timestamp:</b>" + message.timestamp +  '<br/> ' +
            "<b>Date time Transaction:</b>" + dateTime +  '<br/> ';
            card_header =   '<b>posn:</b>' + custTrade.Position + ' <b>tenor:</b>' + custTrade.Tenor + ' <b>start:</b>' + custTrade.Start + ' <b>end:</b>' + custTrade.End + " <b>quoteTicket:</b>" + custTrade.keyid + ' <b>Ticker:</b>' + custTrade.Ticker + ' <b>ISIN:</b>' + custTrade.ISIN +            '</div> ';
        } else {
            msg_table = msgstatus.errorMsg;
            card_header =  msgstatus.errorMsg + '</div>';
        };

        // header
        //posn:custTrade.Position tenor:Tenor start:Start end:End quoteTicket:keyid Ticker:ticker ISIN:ISIN
        var dateTime = Date(message.timestamp);
        var fmtMessage = '<div><h3>' +  status_display + " " + msgstatus.dealdesc +'</h3> \
<div class="card" data-accent-color="tempo-bg-color--blue" data-icon-src="' + iconName + '"> \
  <div class="cardHeader">' + card_header + ' \
  <div class="cardBody">' +  msg_table + ' \
   </div> \
</div> \
</div>';
      console.log("fmtmsg:"+fmtMessage);
      return fmtMessage;

    },

    convertSide(side) {

        var switchSide = "";
        if ( side == "Lend" ) {
            switchSide = "Borrow";
        } else {
            switchSide = "Lend";
        };
        return switchSide;

    },

    convertPosition(position) {

        var switchPosition = position * -1;
        return switchPosition;
    },

    lookupShortDesc(tradeSet,ShortDesc,Side) {

        //console.log("tradeSet"+tradeSet);
        //console.log("tradeSet"+JSON.stringify(tradeSet));
        //tradeSet.filter(function(trade){ return tradeSet.keyid == ticket });
        console.log("tradeSetSize:"+tradeSet.length);
        console.log("ShortDesc:"+ShortDesc+"....");
        console.log("side:"+Side+"...");
        var output = [];
        /*
        for ( no=0; no<21; no++) {
            console.log("ShortDesc:"+tradeSet[no].ShortDesc+"...");
            console.log("side:"+tradeSet[no].Side+"...");
        }
        */
        var output = tradeSet.filter(function(value){ return ( (value.ShortDesc == ShortDesc &&  value.Side == Side)) ;})
        console.log("output:"+JSON.stringify(output[0]));
        return output[0];
       

    },


    validateRecastAI: function(res,nplAI,custTrade) {

        missingList = '';
        missingExample = '';
        cntEntities = 0;
      
        value_side = '';
        value_tradetype = '';
        value_quantity = '';
        value_ccy = '';
        value_price = 0.0
        value_ticker = '';
        var value_start_date = "";
        var value_end_date = "";
        value_ticker = '';
        var comma = "";
      
      
        if (res.sentiment != "vnegative") {
            console.log("Good Healthy ticket");
        };
      
        // check what entities are missing
        if (res.raw.entities.hasOwnProperty('side')) {
          found_side = true;
          value_side = res.raw.entities.side[0].value;
          cntEntities = cntEntities + 1;
          if ( value_side == "lend") {
              value_side = "Lend";
          } else {
              value_side = "Borrow";
          }

        } else {
          missingList = missingList + comma + 'side';
          comma=",";
          missingExample = missingExample + 'Example Side: Lend/Borrow </br>';
        };
      
        if (res.raw.entities.hasOwnProperty('tradetype')) {
          found_tradetype = true;
          value_tradetype = res.raw.entities.tradetype[0].value;
          cntEntities = cntEntities + 1;
        } else {
          missingList = missingList + comma + 'tradetype';
          comma=",";
          missingExample = missingExample + 'Example tradetype: Repo </br>';
        };
      
      
        if (res.raw.entities.hasOwnProperty('quantity')) {
          found_quantity = true;
          value_quantity = res.raw.entities.quantity[0].value;
          cntEntities = cntEntities + 1;
        } else {
          missingList = missingList + comma + 'quantity';
          comma=",";
          missingExample = missingExample + 'Example Quantity 3 million: 3m </br>';
        };
      
        if (res.raw.entities.hasOwnProperty('ccy')) {
          found_ccy = true;
          value_ccy = res.raw.entities.ccy[0].value;
          value_ccy = value_ccy.toUpperCase();
          cntEntities = cntEntities + 1;
        } else {
          missingList = missingList + comma + 'ccy';
          comma=",";
          missingExample = missingExample + 'Example ccy: USD </br>';
        };
      
        if (res.raw.entities.hasOwnProperty('price')) {
          found_price = true;
          value_price = res.raw.entities.price[0].value;
          cntEntities = cntEntities + 1;
        } else {
          missingList = missingList + comma + 'price';
          comma=",";
          missingExample = missingExample + 'Example Repo price: 1.65 </br>';
        };
      
        if (res.raw.entities.hasOwnProperty('ticker')) {
          found_ticker = true;
          value_ticker = res.raw.entities.ticker[0].value;
          value_ticker = value_ticker.toUpperCase();
          cntEntities = cntEntities + 1;
        } else {
          missingList = missingList + comma + 'ticker';
          comma=",";
          missingExample = missingExample + 'Example ticker USD Treasury Bond: T 1.25 19  </br>';
        }
      
        if (res.raw.entities.hasOwnProperty('start_date')) {
          found_start_date = true;
          value_start_date = res.raw.entities.start_date[0].value;
          cntEntities = cntEntities + 1;
        } else {
          missingList = missingList + comma + 'startdate';
          comma=",";
          missingExample = missingExample + "Example Start Date must be this format 'start:YYYYMMDD': start:20180604  </br>";
        }
      
        if (res.raw.entities.hasOwnProperty('end_date')) {
          found_end_date = true;
          value_end_date = res.raw.entities.end_date[0].value;
          cntEntities = cntEntities + 1;
        } else {
          missingList = missingList + comma + 'enddate';
          comma=",";
          missingExample = missingExample + "Example End Date must be this format 'end:YYYYMMDD': end:20180620  </br>";
        };
      
        nplAI.missingList = missingList;
        nplAI.missingExample = missingExample;
        nplAI.cntEntities = cntEntities;
        nplAI.totalEntities = 8;

        console.log("value_start_date:"+ value_start_date);
        a_start = value_start_date.split("start:");
        value_start_date = a_start[1];
      
        a_end = value_end_date.split("end:");
        value_end_date = a_end[1];
      
        var custPositionAbs = this.convertShrtStrNominal(value_quantity);
        var custPosition = custPositionAbs;
        if ( (custTrade.Side === "Sell" || custTrade.Side === "Lend" ) ) {
            custPosition = custPositionAbs * -1
        } else {
            custPosition = custPositionAbs;
        }
      
        /*
        custTrade = {
          "Side": value_side,
          "Price": value_price,
          "quoteTicket": "DBS BANK LTD2",
          "Position": custPosition,
          "PositionAbs": custPositionAbs,
          "Start": value_start_date,
          "End": value_end_date,
          "Tenor": "14d",
          "keyid": "DBS BANK LTD2",
          "Ticker": value_ticker,
          "ISIN": "BBG0000CRMR5"
        }
        */

       
       custTrade.Side = value_side;
       custTrade.CCY = value_ccy;
       custTrade.Price =  value_price;
       custTrade.posnDisplay =  value_quantity;
       custTrade.Position = custPosition;
       custTrade.PositionAbs = custPositionAbs;
       custTrade.Start = value_start_date;
       custTrade.End = value_end_date;
       custTrade.Ticker = value_ticker;
       custTrade.ShortDesc =  value_ticker;
       
 
      if ( nplAI.totalEntities != nplAI.cntEntities ) {
          return false;
      } else {
          return true;
      }
      
    },

    //
    // tradeSet should be the repos.
    //
    matchFreeTextTrade(tradeSet,custTrade,msgstatus) {

        var  status_start = false;
        var  status_end = false;
        var  part_fill = 0;
        var  part_fill_remain = 0;
        var  part_fill_fg = false;

        var Price = custTrade.Price;
        var bankSide = this.convertSide(custTrade.Side);
        console.log("custTrade.Position:"+custTrade.Position);
        console.log("custTrade.PositionAbs:"+custTrade.PositionAbs);
        //var bankPosition = UtilFunc.convertPosition(custTrade.Position);
        
        var findOurTrade = this.lookupShortDesc(tradeSet,custTrade.ShortDesc,bankSide);
        //console.log("Found our Trade Position:"+findOurTrade.Position);
        //console.log("findOurTrade:"+JSON.stringify(findOurTrade));

        if ( findOurTrade == null ) {
            msgstatus.status = "NO DEAL";
            msgstatus.dealdesc = "We Do not have this Repo Bond Available for Trading";
            msgstatus.errorMsg = "";
            return -1;
          
        };

        custTrade.ISIN =  findOurTrade.ISIN;

        ourPositionAbs = Math.abs(findOurTrade.Position);
        
        if ( custTrade.PositionAbs >  ourPositionAbs   ) {
            // partial fill.
            console.log("Customer Position is Larger:" + custTrade.PositionAbs + " ours:" + ourPositionAbs);
            part_fill =  ourPositionAbs;
            part_fill_remain = 0;
        
        } else if ( custTrade.PositionAbs ==  ourPositionAbs ) {
            part_fill = custTrade.PositionAbs ;
            part_fill_remain = 0;
        } else {
            part_fill = custTrade.PositionAbs;
            part_fill_remain =  ourPositionAbs -  custTrade.PositionAbs;
            console.log("Customer Position is smaller:" + custTrade.PositionAbs + " ours:" +  ourPositionAbs + " partial remain:" +  part_fill_remain);
        };

        custTrade.posnDisplay = this.convertNominal(part_fill);
        
        if ( custTrade.start_date == findOurTrade.start_date ) {
            status_start = true;
        } else {
            msgstatus.status = "NO DEAL";
            msgstatus.dealdesc = "We could look at coverage between " + findOurTrade.start_date + " and " +  findOurTrade.end_date ;
            msgstatus.errorMsg = "";
            return -2;
        };

        if ( custTrade.end_date == findOurTrade.end_date ) {
            status_end = true;
        } else {
            msgstatus.status = "NO DEAL";
            msgstatus.dealdesc = "We could look at coverage between " + findOurTrade.start_date + " and " +  findOurTrade.end_date ;
            msgstatus.errorMsg = "";
            return -2;
        };

        var quoteTicket =  findOurTrade.quoteTicket;
        //
        // check Lastly Price
        //
        //
        // check price range
        //
        var priceCheck = this.quoteCheckPriceTarget(findOurTrade,custTrade.Price);
        if ( priceCheck == -1 ) {
            console.log("Not a good price");
            msgstatus.status = "NO DEAL";
            msgstatus.dealdesc = custTrade.Side + " Repo " + custTrade.CCY + ' ' + '<span class="tempo-text-color--red">' +  custTrade.posnDisplay + "@" +   custTrade.Price + '</span><span style="background-color: #ffffff;"> ' +  findOurTrade.ShortDesc + '</span>';
            msgstatus.keyid = quoteTicket;
            msgstatus.errorMsg = "Not a good Deal. Price not right!";
            return -2; 

        }
        msgstatus.status = "DONE";
        msgstatus.dealdesc = custTrade.Side + " Repo " + custTrade.CCY + ' ' + '<span class="tempo-text-color--blue">' +  custTrade.posnDisplay + "@" +   custTrade.Price + '</span><span style="background-color: #fffffff;"> ' +  findOurTrade.ShortDesc + '</span>';
        msgstatus.keyid = quoteTicket;
        msgstatus.errorMsg = "";
        console.log("match Free Trade return");
        return 1;
        

    }

}