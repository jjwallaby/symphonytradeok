var expect = require('chai').expect;
var UtilFunc = require('../src/utils/UtilFunc');

var tradeOpenRepos = {
	"repos": [{
		"Name": "KT CORP",
		"Ticker": "KOREAT 2 5/8 04/22/19",
		"SecType": "EURO-DOLLAR",
		"Sector": "Corp",
		"ShortDesc": "KOREAT 2.625 19",
		"ISIN": "BBG006BJKKY8",
		"CCY": "USD",
		"Position": "5000000",
		"Side": "Lend",
		"Start": "20180604",
		"End": "20180611",
		"Tenor": "7d",
		"TargetRate": 1.65,
		"UpperTolerance": 0.5,
		"LowerTolerance": 0.05,
		"HigherLimit": 2.15,
		"LowerLimit": 1.6,
		"no": "1",
		"keyid": "KT CORP1"
	},
	{
		"Name": "DBS BANK LTD",
		"Ticker": "DBSSP 0 07/15/21",
		"SecType": "EURO-DOLLAR",
		"Sector": "Corp",
		"ShortDesc": "DBSSP 0 7/15/21",
		"ISIN": "BBG0000CRMR5",
		"CCY": "USD",
		"Position": "15000000",
		"Side": "Lend",
		"Start": "20180604",
		"End": "20180618",
		"Tenor": "14d",
		"TargetRate": 1.675,
		"UpperTolerance": 0.5,
		"LowerTolerance": 0.05,
		"HigherLimit": 2.175,
		"LowerLimit": 1.625,
		"no": "2",
		"keyid": "DBS BANK LTD2"
	},
	{
		"Name": "GS CALTEX CORP",
		"Ticker": "GSCCOR 3 06/18/19",
		"SecType": "EURO-DOLLAR",
		"Sector": "Corp",
		"ShortDesc": "GSCCOR 3 19",
		"ISIN": "BBG006MLZGY4",
		"CCY": "USD",
		"Position": "12000000",
		"Side": "Lend",
		"Start": "20180604",
		"End": "20180618",
		"Tenor": "14d",
		"TargetRate": 1.675,
		"UpperTolerance": 0.5,
		"LowerTolerance": 0.05,
		"HigherLimit": 2.175,
		"LowerLimit": 1.625,
		"no": "3",
		"keyid": "GS CALTEX CORP3"
	},
	{
		"Name": "KOREA EAST-WEST POWER CO",
		"Ticker": "KOEWPW 2 5/8 11/27/18",
		"SecType": "EURO-DOLLAR",
		"Sector": "Corp",
		"ShortDesc": "KOEWPW 2.625 18",
		"ISIN": "BBG005MPK489",
		"CCY": "USD",
		"Position": "8000000",
		"Side": "Lend",
		"Start": "20180604",
		"End": "20180618",
		"Tenor": "14d",
		"TargetRate": 1.675,
		"UpperTolerance": 0.5,
		"LowerTolerance": 0.05,
		"HigherLimit": 2.175,
		"LowerLimit": 1.625,
		"no": "4",
		"keyid": "KOREA EAST-WEST POWER CO4"
	},
	{
		"Name": "KIA MOTORS CORP",
		"Ticker": "KIAMTR 3 1/4 04/21/26",
		"SecType": "EURO-DOLLAR",
		"Sector": "Corp",
		"ShortDesc": "KIAMTR 3.25 26",
		"ISIN": "BBG00CP54ZJ2",
		"CCY": "USD",
		"Position": "-15000000",
		"Side": "Borrow",
		"Start": "20180604",
		"End": "20180618",
		"Tenor": "14d",
		"TargetRate": 1.6,
		"UpperTolerance": 0.05,
		"LowerTolerance": 0.5,
		"HigherLimit": 1.65,
		"LowerLimit": 1.1,
		"no": "5",
		"keyid": "KIA MOTORS CORP5"
	},
	{
		"Name": "KOOKMIN BANK",
		"Ticker": "CITNAT 2 1/4 02/03/21",
		"SecType": "EURO-DOLLAR",
		"Sector": "Corp",
		"ShortDesc": "CITNAT 2.25 21",
		"ISIN": "BBG00C180X83",
		"CCY": "USD",
		"Position": "2000000",
		"Side": "Lend",
		"Start": "20180604",
		"End": "20180618",
		"Tenor": "14d",
		"TargetRate": 1.675,
		"UpperTolerance": 0.5,
		"LowerTolerance": 0.05,
		"HigherLimit": 2.175,
		"LowerLimit": 1.625,
		"no": "6",
		"keyid": "KOOKMIN BANK6"
	},
	{
		"Name": "INDUSTRIAL BANK OF KOREA",
		"Ticker": "INDKOR 2 1/4 02/06/20",
		"SecType": "EURO-DOLLAR",
		"Sector": "Corp",
		"ShortDesc": "INDKOR 2.25 20",
		"ISIN": "BBG00FV8YTS3",
		"CCY": "USD",
		"Position": "3000000",
		"Side": "Lend",
		"Start": "20180604",
		"End": "20180618",
		"Tenor": "14d",
		"TargetRate": 1.675,
		"UpperTolerance": 0.5,
		"LowerTolerance": 0.05,
		"HigherLimit": 2.175,
		"LowerLimit": 1.625,
		"no": "7",
		"keyid": "INDUSTRIAL BANK OF KOREA7"
	},
	{
		"Name": "KOREA EAST-WEST POWER CO",
		"Ticker": "KOEWPW 2 1/2 06/02/20",
		"SecType": "EURO-DOLLAR",
		"Sector": "Corp",
		"ShortDesc": "KOEWPW 2.5 20",
		"ISIN": "BBG007LSQTM3",
		"CCY": "USD",
		"Position": "-10000000",
		"Side": "Borrow",
		"Start": "20180604",
		"End": "20180618",
		"Tenor": "14d",
		"TargetRate": 1.6,
		"UpperTolerance": 0.05,
		"LowerTolerance": 0.5,
		"HigherLimit": 1.65,
		"LowerLimit": 1.1,
		"no": "8",
		"keyid": "KOREA EAST-WEST POWER CO8"
	},
	{
		"Name": "CAPITALAND LTD",
		"Ticker": "CAPLSP 2.95 06/20/22",
		"SecType": "EURO NON-DOLLAR",
		"Sector": "Corp",
		"ShortDesc": "CAPLSP 2.95 22",
		"ISIN": "BBG0000HYWQ5",
		"CCY": "SGD",
		"Position": "2500000",
		"Side": "Lend",
		"Start": "20180604",
		"End": "20180611",
		"Tenor": "7d",
		"TargetRate": 1.675,
		"UpperTolerance": 0.5,
		"LowerTolerance": 0.05,
		"HigherLimit": 2.175,
		"LowerLimit": 1.625,
		"no": "9",
		"keyid": "CAPITALAND LTD9"
	},
	{
		"Name": "OUE LTD",
		"Ticker": "OUESP 3 04/13/23",
		"SecType": "EURO NON-DOLLAR",
		"Sector": "Corp",
		"ShortDesc": "OUESP 3 23",
		"ISIN": "BBG00K9YK2S4",
		"CCY": "SGD",
		"Position": "3500000",
		"Side": "Lend",
		"Start": "20180604",
		"End": "20180611",
		"Tenor": "7d",
		"TargetRate": 1.675,
		"UpperTolerance": 0.5,
		"LowerTolerance": 0.05,
		"HigherLimit": 2.175,
		"LowerLimit": 1.625,
		"no": "10",
		"keyid": "OUE LTD10"
	},
	{
		"Name": "US TREASURY N/B",
		"Ticker": "T 1 1/4 04/30/19",
		"SecType": "US GOVERNMENT",
		"Sector": "Govt",
		"ShortDesc": "T 1.25 19",
		"ISIN": "BBG002WRBNQ9",
		"CCY": "USD",
		"Position": "-5000000",
		"Side": "Borrow",
		"Start": "20180604",
		"End": "20180605",
		"Tenor": "Open",
		"TargetRate": 1.575,
		"UpperTolerance": 0.05,
		"LowerTolerance": 0.5,
		"HigherLimit": 1.625,
		"LowerLimit": 1.075,
		"no": "11",
		"keyid": "US TREASURY N/B11"
	},
	{
		"Name": "US TREASURY N/B",
		"Ticker": "T 1 1/8 08/31/21",
		"SecType": "US GOVERNMENT",
		"Sector": "Govt",
		"ShortDesc": "T 1.125 21",
		"ISIN": "BBG00DM1BYY0",
		"CCY": "USD",
		"Position": "-15000000",
		"Side": "Borrow",
		"Start": "20180604",
		"End": "20180618",
		"Tenor": "14d",
		"TargetRate": 1.6,
		"UpperTolerance": 0.05,
		"LowerTolerance": 0.5,
		"HigherLimit": 1.65,
		"LowerLimit": 1.1,
		"no": "12",
		"keyid": "US TREASURY N/B12"
	},
	{
		"Name": "US TREASURY N/B",
		"Ticker": "T 1 1/4 06/30/19",
		"SecType": "US GOVERNMENT",
		"Sector": "Govt",
		"ShortDesc": "T 1.25 19",
		"ISIN": "BBG00H15B079",
		"CCY": "USD",
		"Position": "-13000000",
		"Side": "Borrow",
		"Start": "20180604",
		"End": "20180618",
		"Tenor": "14d",
		"TargetRate": 1.6,
		"UpperTolerance": 0.05,
		"LowerTolerance": 0.5,
		"HigherLimit": 1.65,
		"LowerLimit": 1.1,
		"no": "13",
		"keyid": "US TREASURY N/B13"
	},
	{
		"Name": "US TREASURY N/B",
		"Ticker": "T 1 3/8 12/31/18",
		"SecType": "US GOVERNMENT",
		"Sector": "Govt",
		"ShortDesc": "T 1.375 18",
		"ISIN": "BBG002BHSVJ6",
		"CCY": "USD",
		"Position": "-8000000",
		"Side": "Borrow",
		"Start": "20180604",
		"End": "20180605",
		"Tenor": "Open",
		"TargetRate": 1.575,
		"UpperTolerance": 0.05,
		"LowerTolerance": 0.5,
		"HigherLimit": 1.625,
		"LowerLimit": 1.075,
		"no": "14",
		"keyid": "US TREASURY N/B14"
	},
	{
		"Name": "US TREASURY N/B",
		"Ticker": "T 2 11/15/26",
		"SecType": "US GOVERNMENT",
		"Sector": "Govt",
		"ShortDesc": "T 2 26",
		"ISIN": "BBG00F5RQC97",
		"CCY": "USD",
		"Position": "15000000",
		"Side": "Lend",
		"Start": "20180604",
		"End": "20180618",
		"Tenor": "14d",
		"TargetRate": 1.6,
		"UpperTolerance": 0.5,
		"LowerTolerance": 0.05,
		"HigherLimit": 2.1,
		"LowerLimit": 1.55,
		"no": "15",
		"keyid": "US TREASURY N/B15"
	},
	{
		"Name": "US TREASURY N/B",
		"Ticker": "T 1 1/8 06/30/21",
		"SecType": "US GOVERNMENT",
		"Sector": "Govt",
		"ShortDesc": "T 1.125 21",
		"ISIN": "BBG00D3CKM73",
		"CCY": "USD",
		"Position": "-2000000",
		"Side": "Borrow",
		"Start": "20180604",
		"End": "20180605",
		"Tenor": "Open",
		"TargetRate": 1.575,
		"UpperTolerance": 0.05,
		"LowerTolerance": 0.5,
		"HigherLimit": 1.625,
		"LowerLimit": 1.075,
		"no": "16",
		"keyid": "US TREASURY N/B16"
	},
	{
		"Name": "US TREASURY N/B",
		"Ticker": "T 1 3/8 10/31/20",
		"SecType": "US GOVERNMENT",
		"Sector": "Govt",
		"ShortDesc": "T 1.375 20",
		"ISIN": "BBG00B9C7Y34",
		"CCY": "USD",
		"Position": "-3000000",
		"Side": "Borrow",
		"Start": "20180604",
		"End": "20180618",
		"Tenor": "14d",
		"TargetRate": 1.6,
		"UpperTolerance": 0.05,
		"LowerTolerance": 0.5,
		"HigherLimit": 1.65,
		"LowerLimit": 1.1,
		"no": "17",
		"keyid": "US TREASURY N/B17"
	},
	{
		"Name": "US TREASURY N/B",
		"Ticker": "T 1 3/8 05/31/20",
		"SecType": "US GOVERNMENT",
		"Sector": "Govt",
		"ShortDesc": "T 1.375 20",
		"ISIN": "BBG004M9QYH6",
		"CCY": "USD",
		"Position": "10000000",
		"Side": "Lend",
		"Start": "20180604",
		"End": "20180618",
		"Tenor": "14d",
		"TargetRate": 1.675,
		"UpperTolerance": 0.5,
		"LowerTolerance": 0.05,
		"HigherLimit": 2.175,
		"LowerLimit": 1.625,
		"no": "18",
		"keyid": "US TREASURY N/B18"
	},
	{
		"Name": "US TREASURY N/B",
		"Ticker": "T 1 7/8 03/31/22",
		"SecType": "US GOVERNMENT",
		"Sector": "Govt",
		"ShortDesc": "T 1.875 22",
		"ISIN": "BBG00GB9ZD23",
		"CCY": "USD",
		"Position": "1000000",
		"Side": "Lend",
		"Start": "20180604",
		"End": "20180618",
		"Tenor": "14d",
		"TargetRate": 1.65,
		"UpperTolerance": 0.5,
		"LowerTolerance": 0.05,
		"HigherLimit": 2.15,
		"LowerLimit": 1.6,
		"no": "19",
		"keyid": "US TREASURY N/B19"
	},
	{
		"Name": "SINGAPORE GOVERNMENT",
		"Ticker": "SIGB 3 1/8 09/01/22",
		"SecType": "DOMESTIC",
		"Sector": "Govt",
		"ShortDesc": "SIGB 3.125 22",
		"ISIN": "8521217458302",
		"CCY": "SGD",
		"Position": "-2500000",
		"Side": "Borrow",
		"Start": "20180604",
		"End": "20180618",
		"Tenor": "14d",
		"TargetRate": 0.5,
		"UpperTolerance": 0.05,
		"LowerTolerance": 0.4,
		"HigherLimit": 0.55,
		"LowerLimit": 0.1,
		"no": "20",
		"keyid": "SINGAPORE GOVERNMENT20"
	},
	{
		"Name": "SINGAPORE GOVERNMENT",
		"Ticker": "SIGB 2 3/4 07/01/23",
		"SecType": "DOMESTIC",
		"Sector": "Govt",
		"ShortDesc": "SIGB 2.75 23",
		"ISIN": "8521250283296",
		"CCY": "SGD",
		"Position": "-3500000",
		"Side": "Borrow",
		"Start": "20180604",
		"End": "20180618",
		"Tenor": "14d",
		"TargetRate": 0.5,
		"UpperTolerance": 0.05,
		"LowerTolerance": 0.4,
		"HigherLimit": 0.55,
		"LowerLimit": 0.1,
		"no": "21",
		"keyid": "SINGAPORE GOVERNMENT21"
	}]
}


describe('UtilFunc.utilMsgCheckArticle()', function () {
  it('should validate a good article from symphony', function () {
    
    // 1. ARRANGE

        
    message = {
        "messageId":"o5EC3D9h7EoNsvndju4U2n___pxEE2DQdA",
        "timestamp":1527866236726,
        "message":"<div data-format=\"PresentationML\" data-version=\"2.0\"><i>Shared from TradeOK - TradeBlotter V2.</i><br/><b>Repo Borrow@1.675</b><br/>15m start:20180531 end:20180614QuoteTicket:DBS BANK LTD2 ISIN:BBG0000CRMR5<br/><i>View this article in the TradeOK - TradeBlotter V2 application on the Symphony web or desktop client.</i></div>",
        "data":"{}",
        "user":{"userId":349026222342245,
                "firstName":"Justin",
                "lastName":"Woodhead",
                "displayName":"Justin Woodhead",
                "email":"justin_woodhead@hotmail.com",
                "username":"justin_woodhead@hotmail.com"},
        "stream":{"streamId":"RlYKHue-ABWJpXptd2S7QX___px89kUAdA",
                  "streamType":"IM"},
        "externalRecipients":false,
        "originalFormat":"com.symphony.markdown",
        "messageText":"Shared from TradeOK - TradeBlotter V2.<br/>Repo Borrow@1.675<br/>15m start:20180531 end:20180614 QuoteTicket:DBS BANK LTD2 ISIN:BBG0000CRMR5<br/>View this article in the TradeOK - TradeBlotter V2 application on the Symphony web or desktop client."};
    tradeSet = tradeOpenRepos.repos;

    custTrade = {};
	msgstatus = {};
	ourTrade = {};

    ourTradeAnswer = 	{
		"Name": "DBS BANK LTD",
		"Ticker": "DBSSP 0 07/15/21",
		"SecType": "EURO-DOLLAR",
		"Sector": "Corp",
		"ShortDesc": "DBSSP 0 7/15/21",
		"ISIN": "BBG0000CRMR5",
		"CCY": "USD",
		"Position": "15000000",
		"Side": "Lend",
		"Start": "20180604",
		"End": "20180618",
		"Tenor": "14d",
		"TargetRate": 1.675,
		"UpperTolerance": 0.5,
		"LowerTolerance": 0.05,
		"HigherLimit": 2.175,
		"LowerLimit": 1.625,
		"no": "2",
		"keyid": "DBS BANK LTD2"
    };
    
         
    var statusOK1 = 1;

    // 2. ACT
    var statusOK2 = UtilFunc.utilMsgCheckArticle(message,tradeSet,custTrade,msgstatus);

	// 3. ASSERT
	
	expect(statusOK2).to.be.equal(statusOK1);
	console.log("msgstatus:"+JSON.stringify(msgstatus));
	console.log("custTrade:"+JSON.stringify(custTrade));

	
    //expect(ourTradeAnswer.keyid).to.be.equal(ourTrade.keyid);


   });

});



describe('UtilFunc.lookupQuoteTicket()', function () {

	it('check basic ticket lookup', function () {
	  
	  // 1. ARRANGE lookupQuoteTicket(tradeSet,ticket)
  
      ticket =    "DBS BANK LTD2";
	  tradeSet = tradeOpenRepos.repos;
      
  
	  ourTradeAnswer = 	{
		  "Name": "DBS BANK LTD",
		  "Ticker": "DBSSP 0 07/15/21",
		  "SecType": "EURO-DOLLAR",
		  "Sector": "Corp",
		  "ShortDesc": "DBSSP 0 7/15/21",
		  "ISIN": "BBG0000CRMR5",
		  "CCY": "USD",
		  "Position": "15000000",
		  "Side": "Lend",
		  "Start": "20180604",
		  "End": "20180618",
		  "Tenor": "14d",
		  "TargetRate": 1.675,
		  "UpperTolerance": 0.5,
		  "LowerTolerance": 0.05,
		  "HigherLimit": 2.175,
		  "LowerLimit": 1.625,
		  "no": "2",
		  "keyid": "DBS BANK LTD2"
	  };
	  
		   
	  var statusOK1 = 1;
  
	  // 2. ACT
	  var  ourTrade  = UtilFunc.lookupQuoteTicket(tradeSet,ticket);
  
	  // 3. ASSERT
	  
	  expect(ourTradeAnswer.Ticker).to.be.equal(ourTrade.Ticker);
	  console.log("msgstatus:"+JSON.stringify(msgstatus));
	  console.log("custTrade:"+JSON.stringify(custTrade));
	  //expect(ourTradeAnswer.keyid).to.be.equal(ourTrade.keyid);
  
  
	 });
  
  });

  

describe('UtilFunc.buildResponseArticle()', function () {
	it('should validate a good response of a done deal', function () {
	  
	  // 1. ARRANGE
  
		  
	  message = {
		  "messageId":"o5EC3D9h7EoNsvndju4U2n___pxEE2DQdA",
		  "timestamp":1527866236726,
		  "message":"<div data-format=\"PresentationML\" data-version=\"2.0\"><i>Shared from TradeOK - TradeBlotter V2.</i><br/><b>Repo Borrow@1.675</b><br/>15m start:20180531 end:20180614QuoteTicket:DBS BANK LTD2 ISIN:BBG0000CRMR5<br/><i>View this article in the TradeOK - TradeBlotter V2 application on the Symphony web or desktop client.</i></div>",
		  "data":"{}",
		  "user":{"userId":349026222342245,
				  "firstName":"Justin",
				  "lastName":"Woodhead",
				  "displayName":"Justin Woodhead",
				  "email":"justin_woodhead@hotmail.com",
				  "username":"justin_woodhead@hotmail.com"},
		  "stream":{"streamId":"RlYKHue-ABWJpXptd2S7QX___px89kUAdA",
					"streamType":"IM"},
		  "externalRecipients":false,
		  "originalFormat":"com.symphony.markdown",
		  "messageText":"Shared from TradeOK - TradeBlotter V2.<br/>Repo Borrow@1.675<br/>15m start:20180531 end:20180614 QuoteTicket:DBS BANK LTD2 ISIN:BBG0000CRMR5<br/>View this article in the TradeOK - TradeBlotter V2 application on the Symphony web or desktop client."};
	  tradeSet = tradeOpenRepos.repos;

	  msgstatus = { 
		  "status": "DONE",
		  "dealdesc":  "Borrow Repo  15m@1.675 DBSSP 0 7/15/21",
		  "keyid":"DBS BANK LTD2",
		  "errorMsg":"Can deal:DBS BANK LTD2"
		}

	  custTrade = {
		"Side":"Borrow",
		"Price":"1.675",
		"quoteTicket":"DBS BANK LTD2",
		"Position":15000000,
		"PositionAbs":15000000,
		"Start":"20180604",
		"End":"20180618",
		"Tenor":"14d",
		"keyid":"DBS BANK LTD2",
		"Ticker":"DBSSP 0 07/15/21",
		"ISIN":"BBG0000CRMR5"
	  }
  
	  
		   
	  var statusOK1 = 1;
	  var statusOK2 = 1;

	  // 2. ACT
	  var responseMsg = UtilFunc.buildResponseArticle(message,custTrade,msgstatus);
  
	  // 3. ASSERT
	  
	  expect(statusOK2).to.be.equal(statusOK1);
	  console.log("responseMsg:"+JSON.stringify(responseMsg));

  
  
	 });
  
  });



  describe('UtilFunc.validateRecastAI()', function () {
	it('test NPL RecastAI free text parsing', function () {
	  
	  // 1. ARRANGE
  
    var res = {
      "uuid": "8683311a-5f05-44c1-98fd-bc23209c1171",
      "source": "Lend Repo 13m USD 1.6 T 1.25 19 start:20180604 end:20180620",
      "intents": [{
        "slug": "trade",
        "confidence": 0.99,
        "description": "Trade"
      }],
      "act": "assert",
      "type": null,
      "sentiment": "neutral",
      "entities": {
        "side": [{
          "value": "lend",
          "raw": "Lend",
          "confidence": 0.9
        }],
        "tradetype": [{
          "value": "repo",
          "raw": "Repo",
          "confidence": 0.59
        }],
        "quantity": [{
          "value": "13m",
          "raw": "13m",
          "confidence": 0.95
        }],
        "ccy": [{
          "value": "usd",
          "raw": "USD",
          "confidence": 0.94
        }],
        "price": [{
          "value": "1.6",
          "raw": "1.6",
          "confidence": 0.92
        }],
        "ticker": [{
          "value": "t 1.25 19",
          "raw": "T 1.25 19",
          "confidence": 0.94
        }],
        "start_date": [{
          "value": "start:20180604",
          "raw": "start:20180604",
          "confidence": 0.97
        }],
        "end_date": [{
          "value": "end:20180620",
          "raw": "end:20180620",
          "confidence": 0.96
        }]
      },
      "language": "en",
      "processing_language": "en",
      "version": "2.12.0",
      "timestamp": "2018-06-04T13:30:48.292183+00:00",
      "status": 200,
      "raw": {
        "uuid": "8683311a-5f05-44c1-98fd-bc23209c1171",
        "source": "Lend Repo 13m USD 1.6 T 1.25 19 start:20180604 end:20180620",
        "intents": [{
          "slug": "trade",
          "confidence": 0.99,
          "description": "Trade"
        }],
        "act": "assert",
        "type": null,
        "sentiment": "neutral",
        "entities": {
          "side": [{
            "value": "lend",
            "raw": "Lend",
            "confidence": 0.9
          }],
          "tradetype": [{
            "value": "repo",
            "raw": "Repo",
            "confidence": 0.59
          }],
          "quantity": [{
            "value": "13m",
            "raw": "13m",
            "confidence": 0.95
          }],
          "ccy": [{
            "value": "usd",
            "raw": "USD",
            "confidence": 0.94
          }],
          "price": [{
            "value": "1.6",
            "raw": "1.6",
            "confidence": 0.92
          }],
          "ticker": [{
            "value": "t 1.25 19",
            "raw": "T 1.25 19",
            "confidence": 0.94
          }],
          "start_date": [{
            "value": "start:20180604",
            "raw": "start:20180604",
            "confidence": 0.97
          }],
          "end_date": [{
            "value": "end:20180620",
            "raw": "end:20180620",
            "confidence": 0.96
          }]
        },
        "language": "en",
        "processing_language": "en",
        "version": "2.12.0",
        "timestamp": "2018-06-04T13:30:48.292183+00:00",
        "status": 200
      }
    };

	custTradeExspect = {};
	custTradeExspect.Side = "Lend";
	custTradeExspect.CCY = "USD";
	custTradeExspect.Price = 1.6;
	custTradeExspect.posnDisplay = "13m";
	custTradeExspect.Position = 13000000;
	custTradeExspect.PositionAbs = 13000000;
	custTradeExspect.Start = "20180604";
	custTradeExspect.Ticker = "T 1.25 19";

			   
	var statusOK1 = true;
	var nplAI = {};
	var custTrade = {};


	// 2. ACT
	statusOK2 = UtilFunc.validateRecastAI(res,nplAI,custTrade);


	// 3. ASSERT
	
	expect(statusOK2).to.be.equal(statusOK1);
	expect(custTradeExspect.Ticker).to.be.equal(custTrade.Ticker);
	expect(custTradeExspect.CCY).to.be.equal(custTrade.CCY);
	console.log("custTrade:"+JSON.stringify(custTrade));
	console.log("nplAI:"+JSON.stringify(nplAI));


  
	});
  
});



describe('UtilFunc.lookupShortDesc()', function () {
	it('test if customer request trade from translated RecastAI exists', function () {
	  
		// 1. ARRANGE

		var tradeSet = tradeOpenRepos;
		console.log("tradeset:"+tradeSet);
		console.log("size:"+tradeSet.repos.length);

		custTradeExspect = {};
		custTradeExspect.Side = "Lend";
		custTradeExspect.CCY = "USD";
		custTradeExspect.Price = 1.6;
		custTradeExspect.posnDisplay = "13m";
		custTradeExspect.Position = 13000000;
		custTradeExspect.PositionAbs = 13000000;
		custTradeExspect.Start = "20180604";
		custTradeExspect.Ticker = "T 1.25 19";
		custTradeExspect.ShortDesc = "T 1.25 19";

		var side = UtilFunc.convertSide(custTradeExspect.Side);
       
		var statusOK1 = 1;
		var statusOK2 = 1;
        var cntTrade = 1;
		// 2. ACT
		var findOurTrade = UtilFunc.lookupShortDesc(tradeSet.repos,custTradeExspect.ShortDesc,side);
		console.log("Found our Trade:"+findOurTrade.Position);

  
		
		// 3. ASSERT
		
		expect("T 1.25 19").to.be.equal(custTradeExspect.ShortDesc);
		
	});
  
}); 




	
describe('UtilFunc.matchFreeTextTrade()', function () {
	it('test if we can match trade from translated RecastAI exists', function () {
	  
		// 1. ARRANGE

		var tradeSet = tradeOpenRepos;
		console.log("tradeset:"+tradeSet);
		console.log("size:"+tradeSet.repos.length);

		custTrade = {};
		custTrade.Side = "Lend";
		custTrade.CCY = "USD";
		custTrade.Price = 1.6;
		custTrade.posnDisplay = "13m";
		custTrade.Position = 13000000;
		custTrade.PositionAbs = 13000000;
		custTrade.Start = "20180604";
		custTrade.Ticker = "T 1.25 19";
		custTrade.ShortDesc = "T 1.25 19";

		var msgstatus = {};
       
		var statusOK1 = 1;
		// 2. ACT
		var statusOK = UtilFunc.matchFreeTextTrade(tradeSet.repos,custTrade,msgstatus);
        console.log(JSON.stringify(msgstatus));

  
		
		// 3. ASSERT
		
		expect(statusOK).to.be.equal(statusOK1);
		
	});
  
}); 