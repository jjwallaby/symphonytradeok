import React, { Component } from 'react';
import ReactTable from 'react-table';
import { fromJS} from 'immutable';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import SliderBar from '../component/SliderBar';
//import 'react-rangeslider/lib/index.css'
//import '../component/rangeslider.min.css';
import '../component/custom_bar_index.css';
import "react-table/react-table.css";
import RctExample   from '../component/rct/RctExample';
var GLOBAL = require('../config/global');
import queryString from 'query-string';
// Toast and Promise
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import TimeAgo from 'react-timeago';
import cancelable from 'react-promise-cancelable';
import { Promise } from 'bluebird';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Moment from 'react-moment';
import 'moment-timezone';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { Container as RCContainer } from 'reactstrap';
import { Row as RCRow } from 'reactstrap';
import { Col as RCCol, Table as RCTable } from 'reactstrap';
//import { Grid, Row, Col } from 'react-simplebox';
import 'react-simplebox/build/styles.css';
import './lineUp.css';

import {
  Button,
  ButtonGroup,
  ListGroupItem,
  ListGroup,
  Carousel,
  Glyphicon,
  Panel,
  Image,
  Grid,
  Col,
  Table,
  Row,
  Text,
  Badge,
} from 'react-bootstrap';


//
// Stats pack
//
var sk = require("statkit/statkit.js");

var timedifference = new Date().getTimezoneOffset();
//var tz = Moment.tz.guess();
var tz = process.env.TZ;
const options = [
 { value: 'one', label: 'One' },
 { value: 'two', label: 'Two' },
 {
  type: 'group', name: 'group1', items: [
    { value: 'three', label: 'Three' },
    { value: 'four', label: 'Four' }
  ]
 },
 {
  type: 'group', name: 'group2', items: [
    { value: 'five', label: 'Five' },
    { value: 'six', label: 'Six' }
  ]
 }
];

const defaultOption = options[0];

const lineUpOrder = [
    "Losehead",
    "Hooker",
    "Tighthead",
    "Lock4",
    "Lock5",
    "BlindSide-flanker",
    "OpenSide-flanker",
    "Number8",
    "scrum-half",
    "fly-half",
    "left-wing",
    "inside-center",
    "outside-center",
    "right-wing",
    "fullback",
    "reserve1",
    "reserve1",
    "reserve1",
    "reserve1",
    "reserve1",
    "reserve1",
    "reserve1",
    "reserve1"
]

Promise.config({
    // Enable warnings
    warnings: true,
    // Enable long stack trace
    longStackTraces: false,
    // Enable cancellation
    cancellation: true,
    // Enable monitoring
    monitoring: false
});

//Bluebird promise cancellation
const promise = new Promise((resolve, reject, onCancel) => {
  const id = setTimeout(resolve,10000);
  onCancel(() => clearTimeout(id));

});

var utilFunc = require('../util/utilFunc');
const cellEditProp = {
  mode: 'click',
  afterSaveCell: onAfterSaveCell  // a hook for after saving cell
};

var current_cell = null;
var current_row = null;


var products = [{
      id: 1,
      playerhome: "JC van Rensburg",
      perctmargin: 0,
      winbar: 10,
      playeraway: "Nahuel Tetaz Chaparro"

  }, {
      id: 2,
      playerhome: "Mbongeni Mbonami",
      perctmargin: 0,
      winbar: 10,
      playeraway: "Agustin Creevy"
  }, {
      id: 3,
      playerhome: "Frans Malherbe",
      perctmargin: 0,
      winbar: 10,
      playeraway: "Enrique Pieretto Heilan"

  }
];

function onAfterSaveCell(row, cellName, cellValue) {
  alert(`Save cell ${cellName} with value ${cellValue}`);

  let rowStr = '';
  for (const prop in row) {
    rowStr += prop + ': ' + row[prop] + '\n';
  }

  alert('The whole row :\n' + rowStr);
}

function myCallback(value,row) {

    //dataFromChild - value
    //console.log("PARENTdataFromChild:"+value+" "+ JSON.stringify(row));
    utilFunc.updateJsonPerctMargin(products,row.id,value);
    //console.log("PARENTdata"+products[0].perctmargin);
    //console.log("PARENTdata:"+JSON.stringify(products));

    //LineUp.setState({ data : products  });
}

function newBarValue(cell,row,value)  {
    //console.log("new value:"+value);
}

function barFormatter(cell,row)  {
    //debugger;
    //console.log("PARENTcell:"+cell);
    //console.log("PARENTrow:"+row)
    //this.cowMounted.bind(this)
    return (<div className='slider'><SliderBar value={10} value={10} row={row} callbackFromParent={myCallback} ></SliderBar></div>);


}



class LineUp extends React.Component {

    toastId = null;

    constructor(props) {

        super(props);
        this.refreshData = this.refreshData.bind(this);
        this.onChangeOptions = this.onChangeOptions.bind(this);
        this.myCallback2 = this.myCallback2.bind(this);
        this.generatePlayerRotate  = this.generatePlayerRotate.bind(this);
        this.state = {
            gamesData: props.gamesData,
            gamesDataSum: props.gamesDataSum,
            listChoices : [{}],
            defaultGame : {},
            selectedOption: '',
            modelBaseProb : 0,
            clickCnt : 0,
            modelNettTeamWLProb : 0,
            modelMargin: 0,
            myMargin : 0,
            gamePickedFlag : false,
            myBaseProb : 0,
            overAllProb : 0,
            selectedGame : {},
            BASEURL: GLOBAL.BASEURL,
            url : GLOBAL.BASEURL + "seasongames",
            urlsum :  GLOBAL.BASEURL + "seasongamessum",
            error : null,
            request_counter : 0,
            dataLoadedFlag : false,
            urlparams : { businessdate: "20171005", env: "qa" },


              data : products,
              data2 : [{}],

         columns : [{
            Header: 'No',
            maxWidth: 35,
            width: 35,
            accessor: 'playerPosition' // String-based value accessors!
        },{
            Header: 'Home Player',
            accessor: 'homePlayer' // String-based value accessors!
        }, {
            Header:    'Caps',
            maxWidth: 40,
            width: 40,
            accessor:  'homePlayerSR_Caps'

        },
        {
            Header: 'Player Performance',
            accessor: 'ExpNettPerf',

           // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
           Cell: props => this.barFormatter2(props.value,props.row)
          }, {
            Header: props => <span>Value</span>, // Custom header components!
            Cell: props => this.getMargin(props.row)
        },{
            id: 'awayPlayer', // Required because our accessor is not a string
            Header: 'Away Player',
            accessor: d => d.awayPlayer // Custom value accessors!
        },
        {
            Header:    'Caps',
            maxWidth: 40,
            width: 40,
            accessor:  'awayPlayerSR_Caps'

        },],
        }
    }

    state = {
          //data: fromJS({
        //      error: null,
        //      loading: 'loading...'
        //  }),
          gamesData : null,
          listChoices : [{}],
          defaultGame : {},
          selectedOption: '',
          modelNettTeamWLProb : 0,
          clickCnt : 0,
          keySlider : 1,
          modelMargin: 0,
          modelCals : "",
          myMargin : 0,
          gamePickedFlag : false,
          selectedGame : {},
          overAllProb : 0,
          myCals : "",
          BASEURL: GLOBAL.BASEURL,
          url :  GLOBAL.BASEURL + "seasongames",
          urlsum :  GLOBAL.BASEURL + "seasongamessum",
          error : null,
          request_counter : 0,
          urlparams : { businessdate: "20171005", env: "qa" },
          dataLoadedFlag : false,

          data : products,
          data2 : [{}],



          columns : [{  }],
    }

    dismiss = () => toast.dismiss(this.toastId);
    dismissAll = () => toast.dismiss();

    // toast notify
    notify = (msg,...params) => {
          this.dismissAll();
          this.toastId = toast.info(msg,...params);
    }

    //
    // for unmount
    //
    cancel = () => {
          if (this.cancelable) {
              //stop the progress of an ongoing asynchromous task.
              this.cancelable.cancel();
              promise.cancel();
          }

          //Bluebird
          promise.cancel();
    }

    logerror = (errMsg) => {
          this.dismissAll();
          toast.error(errMsg);
          this.cancel();
    }

    componentDidCatch(error,info) {
          //Display fallback UI
          //console.log("did catch");
          this.setState({ hasError: true});
          // you can also log the error to an error reporting service
          // JJW to do
          toast.err("Error -" + error + " info" + info, { autoClose : 3000});
          //LogErrortoMyService(error,info)
    }

    buildTeamData(matchNo,json) {

        //console.log("Total1:");
        var totalPlayers=json[matchNo].Home.length;
        console.log("Total players:",totalPlayers);
        var newjson = {};
        var data2 = [];
        try {
            for(var no=0;no<totalPlayers;no++) {
                newjson = {};
                newjson.Team =  json[matchNo].Team;
                newjson.Opponent =  json[matchNo].Opponent;
                newjson.lineUpOrder = lineUpOrder[no];
                newjson.playerPosition =  json[matchNo].Home[no].PlayerPosition;
                newjson.homePlayer = json[matchNo].Home[no].PlayerName;
                newjson.homeposn =  json[matchNo].Home[no].PlayerRegularPosition;
                newjson.homePlayerSR_Caps = json[matchNo].Home[no].PlayerSR_Caps;
                newjson.homeRating = Math.round(json[matchNo].Home[no].PlayerRating);
                newjson.homeRank = json[matchNo].Home[no].PlayerRank;
                newjson.orgprob =  (parseFloat(json[matchNo].Home[no].PlayerExpELONett)*100).toFixed(0);
                newjson.ExpNettPerf = (parseFloat(json[matchNo].Home[no].PlayerExpELONett)*100).toFixed(0);
                newjson.awayPlayer = json[matchNo].Away[no].PlayerName;
                newjson.awayposn =  json[matchNo].Away[no].PlayerRegularPosition;
                newjson.awayPlayerSR_Caps = json[matchNo].Away[no].PlayerSR_Caps;
                newjson.awayRating = Math.round(json[matchNo].Away[no].PlayerRating);
                newjson.awayRank = json[matchNo].Away[no].PlayerRank;
                newjson.matchNo = matchNo;
                data2.push(newjson);
            }
        } catch(err) {
            console.log("ERROR parsing...",err);
        }

        //console.log(JSON.stringify(data2));

        this.setState( {data2: data2});
        this.setState( {dataLoadedFlag : true });

    }

    buildListChoice(json) {

        //debugger;
        var totalGames = json.games.length;
        var game = {};
        var listGame = [];
        for(var no=0;no<totalGames;no++) {

            var desc="Round " + json.games[no].Round.toString().substring(2) + " " + json.games[no].Team + " v " + json.games[no].Opponent + " " + json.games[no].Location;
            game = { value: json.games[no].MatchNum, label : desc};
            listGame.push(game);
        }
        //console.log("totalgames:"+totalGames + JSON.stringify(listGame));
        this.setState( { listChoices: listGame});
    }

    buildHeaders(gameJson) {


        var homeTeam = "Home Team " + gameJson.Team;
        var awayTeam = "Away Team " + gameJson.Opponent;

        var columns=[
          { Header: "",
          columns: [ {

                 Header: 'No',
                 maxWidth: 35,
                 width: 35,
                 accessor: 'playerPosition' // String-based value accessors!
              },

          ]},
          {
            Header: homeTeam,
            columns: [ {
                maxWidth: 200,
                width: 200,
               Header: 'Player',
               accessor: 'homePlayer' // String-based value accessors!
           }, {
               maxWidth: 90,
               width: 90,
               Header: 'Reg. Posn',
               accessor: 'homeposn'

           },
             {
               Header:    'Caps',
               maxWidth: 45,
               width: 45,
               accessor:  'homePlayerSR_Caps'

            },
            {
              Header:    'Rating',
              maxWidth: 90,
              width:90,
              show: false,
              'text-align':'left',
              accessor:  'homeRating'

           },
           {
             Header:    'Rank',
             maxWidth: 60,
             width: 60,

             'text-align': 'left',
             accessor:  'homeRank'

          },
          {
            Header:    'M.Prob',
            maxWidth: 80,
            width: 80,
            accessor:  'orgprob'

         },
            {
                maxWidth: 150,
                width: 150,
                Header: 'Player Performance',
                accessor: 'ExpNettPerf',

                // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
                Cell: props => this.barFormatter2(props.value,props.row)
            },
            {
                maxWidth: 60,
                width: 60,
                Header: props => <span>Prob</span>, // Custom header components!
                Cell: props => this.getMargin(props.row)
            }
            ]
            },
            { Header: awayTeam,
            columns: [ {
                maxWidth: 200,
                width: 200,
                id: 'awayPlayer', // Required because our accessor is not a string
                Header: 'Away Player',
                accessor: d => d.awayPlayer // Custom value accessors!
            }, {
                maxWidth: 90,
                width: 90,
                Header: 'Reg. Posn',
                accessor: 'awayposn'

            },
            {
                Header:    'Caps',
                maxWidth: 45,
                width: 45,
                accessor:  'awayPlayerSR_Caps'

            },    {
                  Header:    'Rating',
                  maxWidth: 90,
                  width:90,
                  show: false,
                  accessor:  'awayRating'

               },
               {
                 Header:    'Rank',
                 maxWidth: 60,
                 width: 60,
                 accessor:  'awayRank'

              }]
        }];


        this.setState( { columns : columns});


    }



    refreshData = (dataGame) => {

          var game = dataGame.value;

          this.setState({ defaultGame : dataGame });
          //console.log("calling :" + this.state.url);
          this.notify("Loading..." +  { autoClose : false});

          promise.then( () => {
              // this.props.date.slice(0,10).replace(/-/g,"")  queryString.stringify(this.state.urlparams);
              var urlmodify = this.state.url + "?" +  queryString.stringify(this.props.gurlparams);
              fetch(urlmodify, {})
              .then(response => {
                  //console.log("Response:" + response.status + " " + JSON.stringify(response));
                  if (response.status == 200 ) {
                      response.json().then(json => {
                          this.notify("Loading data");
                          this.setState({gamesData: json});
                          //console.log("json:" + json);
                          //console.log("gamesData:" + json[game].Season + " " + json[game].Home[0].PlayerName) ;
                          this.buildTeamData(game,json);

                          this.dismissAll();
                          toast.success("Done", { autoClose: 500, position: "bottom-center"});

                      }).catch(err => {
                          console.log("Cannot convert json parse error:" + err);
                          toast.error("Error", {autoClose: 3000});
                          this.logerror("Json parsed Error:"+ err);
                      });
                      var newurl =  GLOBAL.BASEURL + "seasongames";
                      this.setState({url : newurl });
                      this.setState({ defaultGame : dataGame  });
                  }
                  else {
                      this.setState({gamesData: null});
                      this.dismissAll();
                      toast.warn("No Data",{autoClose : 3000});
                  }

                  //console.log("done promise " + (this.state.request_counter-1));
                  this.setState({request_counter : (this.state.request_counter-1)});
              }).catch( err => {
                  //console.log("Fetch backend error:" + err);
                  toast.error("Fetch Error", { autoClose: 3000});
                  this.logerror("Fetch Error - " + err);
                  this.setState({request_counter : (this.state.request_counter-1)});
              })
              }).catch ( err => {
                  //console.log("Fetch Error 2:" + err);
                  toast.error("Fetch Error 2", { autoClose: 3000});
                  this.logError("Fetch Error 2 - " + err)

              }).done( () => {
                  //console.log("start promise:" + this.state.request_counter + " " + (this.state.request_counter+1));
                  this.setState({request_counter: this.state.request_counter+1});
              });
    }


    refreshDataSum = (e) => {
          console.log("calling :" + this.state.urlsum);
          this.notify("Loading..." , { autoClose : false});
          console.time("get summary games");
          promise.then( () => {
              console.time("promise");
              var urlmodify = this.state.urlsum + "?" +  queryString.stringify(this.props.gurlparams);
              console.time("get summary games fetch");
              fetch(urlmodify, {})
              .then(response => {
                  console.timeEnd("get summary games fetch");
                  //console.log("Response:" + response.status + " " + JSON.stringify(response));
                  if (response.status == 200 ) {
                      console.time("get summary games responsetime 2");
                      response.json().then(json => {
                          console.time("get summary games parse json 3");
                          this.notify("Loading data");
                          this.setState({gamesDataSum: json});
                          //console.log("json:" + json);
                          this.buildListChoice(json);
                          console.timeEnd("get summary games parse json 3");
                          console.timeEnd("get summary games");
                          this.dismissAll();
                      
                          toast.success("Done", { autoClose: 500, position: "bottom-center"});

                      }).catch(err => {
                          //console.log("Cannot convert json parse error:" + err);
                          toast.error("Error", {autoClose: 4000});
                          this.logerror("Json parsed Error:"+ err);
                      });
                      var newurl =  GLOBAL.BASEURL + "seasongames";
                      this.setState({url : newurl });
                      console.timeEnd("get summary games responsetime 2");
                  }
                  else {
                      this.setState({gamesData: null});
                      this.dismissAll();
                      toast.warn("No Data",{autoClose : 3000});
                  }

                  //console.log("done promise " + (this.state.request_counter-1));
                  this.setState({request_counter : (this.state.request_counter-1)});
              }).catch( err => {
                  console.log("Fetch backend error:" + err);
                  toast.error("Fetch Error", { autoClose: 4000});
                  this.logerror("Fetch Error - " + err);
                  this.setState({request_counter : (this.state.request_counter-1)});
              });  console.timeEnd("promise");
              }
               ).catch ( err => {
                  console.log("Fetch Error 2:" + err);
                  toast.error("Fetch Error 2", { autoClose: 4000});
                  this.logError("Fetch Error 2 - " + err)

              }).done( () => {
                  //console.log("start promise:" + this.state.request_counter + " " + (this.state.request_counter+1));
                  this.setState({request_counter: this.state.request_counter+1});
              });
    }

    componentDidMount() {
            //console.log("did mount");
            this.setState( { urlparams: { businessdate : this.props.date.slice(0,10).replace(/-/g,"") } } );
            //this.refreshData();
            this.refreshDataSum();
    }

    componentWillReceiveProps()  {
            //console.log("change props...");
            this.setState( { urlparams: { businessdate : this.props.date.slice(0,10).replace(/-/g,"") } } );
            //this.refreshData();
            //this.refreshDataSum();

    }




    myCallback2 = (value,row) => {
        //debugger;
        var clickCnt = this.state.clickCnt + 1;
        this.setState({clickCnt : clickCnt });
        //console.log("JJJJ2222"+JSON.stringify(value)+"   " + row);
        let data3 = this.state.data2;

        if ( row.hasOwnProperty('_index')) {
            data3[parseInt(row._index)].ExpNettPerf = value;
        } else {
            data3[parseInt(row)].ExpNettPerf = value;
        }

        //debugger;
        var baseProb = utilFunc.calBaseProbPlayer(data3);
        var nettTeamWLProb = baseProb + this.state.selectedGame.ProbAdj;

        var stdDev = this.state.selectedGame.TeamMgnSD + this.state.selectedGame.SDAdj;
        var netMargin = utilFunc.calMargin(nettTeamWLProb,stdDev);
        this.setState({ myBaseProb : Math.round(baseProb * 100)});
        this.setState({ overAllProb : Math.round(nettTeamWLProb * 100)});
        this.setState({myMargin:  netMargin });
        this.setState({ data2 : data3  });
        var newkey =  this.state.keySlider + 1;
        this.setState( {  keySlider : newkey});

        //this.forceUpdate();
    }

    myCallbackOverAll = (value,gameIn) => {


        var game = {};
        var clickCnt = this.state.clickCnt + 1;
        this.setState({clickCnt : clickCnt });
        //this.forceUpdate();
        if (typeof gameIn === "undefined") {
            game = this.state.selectedGame;
        } else {
            game = gameIn;
        }
        var netMargin = 0;
        var baseProb = value / 100;
        var nettTeamWLProb = baseProb + game.ProbAdj;

        var stdDev = game.TeamMgnSD + game.SDAdj;
        //var myCals = game.Team + " ProbAdj:" + game.ProbAdj + " " +   "nettTeamWLPRob:" + nettTeamWLProb.toString() + " stdDev:" + stdDev.toString() + " TeamMgnSD:" + game.TeamMgnSD.toString() + " " + game.SDAdj.toString();
        var myCals = game.Team + " " + "baseprob:" + baseProb.toString() + "ProbAdj:" + game.ProbAdj + " " +   "nettTeamWLPRob:" + nettTeamWLProb.toString() + " stdDev:" + stdDev.toString() + " TeamMgnSD:" + game.TeamMgnSD.toString() + " " + game.SDAdj.toString();
        netMargin = utilFunc.calMargin(nettTeamWLProb,stdDev);
        this.setState({ myMargin : netMargin});
        this.setState({ myBaseProb : Math.round(baseProb * 100)});
        this.setState({ overAllProb :   Math.round(nettTeamWLProb * 100) });
        this.setState({ myCals: myCals});

    };


    barFormatter2(value,row)  {
        var x,y;
        //debugger;
        //console.log("J1cell: "+value);
        //console.log("J1row: "+row);
        //this.cowMounted.bind(this)

        //this.state.data2[0].friend.age = value;

        var keyplayer = 'a' +  + this.state.selectedGame.MatchNum  + row.playerPosition;
        return (<div key={keyplayer} className='slider'><SliderBar callbackFromParent={this.myCallback2} value={row.ExpNettPerf} row={row}   ></SliderBar></div>);
        //this.getMargin(row);

    }

    getMargin(row) {
        //debugger;
        //console.log(row.ExpNettPerf + " " + JSON.stringify(row));
        return(<div>{row._original.ExpNettPerf}%</div>);

    }

    onChangeOptions(selectedOption) {
        // data
        // {value: 518012, label: "Round 01 Lions v Sharks Emirates Airlines Park"}
        // value  518012
        // label  Round 01 Lions v Sharks Emirates Airlines Park"
        //debugger;
        this.setState({ selectedOption  });


        //0.4305
        var prob = 0.4305;
        // add 20.53198069
        // TeamMgnSD + SDAdj
        var stdDev = 20.5319806;

        var netMargin = 0;
        var newMargin = 0;
        var nettTeamWLProb = 0;
        var game = {};

        var totalGames = this.state.gamesDataSum.games.length;
        for(var no=0;no<totalGames;no++) {
            if ( selectedOption.value ===  this.state.gamesDataSum.games[no].MatchNum) {
                this.setState({ selectedGame : this.state.gamesDataSum.games[no]});
                game =  this.state.gamesDataSum.games[no];
            };
        }

        this.buildHeaders(game);
        this.refreshData(selectedOption);

        var baseProb = utilFunc.calBaseProb(game);
        nettTeamWLProb = baseProb + game.ProbAdj;

        stdDev = game.TeamMgnSD + game.SDAdj;
        //var modelCals = "stdDev:" + stdDev.toString() + " TeamMgnSD:" + game.TeamMgnSD.toString() + " " + game.SDAdj.toString();
        //var modelCals = "nettTeamWLPRob:" + nettTeamWLProb.toString() + " stdDev:" + stdDev.toString() + " TeamMgnSD:" + game.TeamMgnSD.toString() + " " + game.SDAdj.toString();
        var modelCals = game.Team + " " + "baseprob:" + baseProb.toString() + "ProbAdj:" + game.ProbAdj + " " +   "nettTeamWLPRob:" + nettTeamWLProb.toString() + " stdDev:" + stdDev.toString() + " TeamMgnSD:" + game.TeamMgnSD.toString() + " " + game.SDAdj.toString();
        netMargin = utilFunc.calMargin(nettTeamWLProb,stdDev);
        this.setState({ modelMargin : netMargin});
        this.setState({ modelNettTeamWLProb :  Math.round(nettTeamWLProb * 100) });
        this.setState({ modelBaseProb : Math.round(baseProb * 100)});
        this.myCallbackOverAll(baseProb*100,game);
        this.setState({ gamePickedFlag : true } );
        this.setState({ modelCals : modelCals});












        console.log()
        //fncRefresh(value);

    }

    async setSelectedGame(value,callback) {

        var totalGames = this.state.gamesDataSum.games.length;
        for(var no=0;no<totalGames;no++) {
            if ( value ===  this.state.gamesDataSum.games[no].MatchNum) {
                this.setState({ selectedGame : this.state.gamesDataSum.games[no]});
                callback( this.state.gamesDataSum.games[no]);
            };
        }
    }

  carousel(json, index) {
    var keyplayer = 'c' +  + json.matchNo  + index;
    var picdiag = "/carousel_" + index + ".png";
    return (
    
        <Carousel.Item >
               <Carousel.Caption>
          <Table striped bordered condensed hover tablecas >
          <thead>
            <tr>
              <th>{index+1}</th>
              <th>{json.Team}</th>
              <th>{json.Opponent}</th>
    
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Player</td>
              <td>{json.homePlayer}</td>
              <td>{json.awayPlayer}</td>
            </tr>
            <tr>
              <td>Reg. Posn</td>
              <td>{json.homeposn}</td>
              <td>{json.awayposn}</td>
            </tr>
            <tr>
              <td>Caps</td>
              <td>{json.homePlayerSR_Caps}</td>
              <td>{json.awayPlayerSR_Caps}</td>
            </tr>
            <tr>
            <td>Rank</td>  
             <td>{json.homeRank}</td>
             <td>{json.awayRank}</td>
             </tr>
            <tr>
            <td colSpan="2">
            <div key={keyplayer} className='slider'><SliderBar callbackFromParent={this.myCallback2} value={json.ExpNettPerf} row={index}   ></SliderBar></div>
            </td>
            <td><b>{json.ExpNettPerf}%</b>

            </td>
            </tr>
            </tbody>
            </Table>
          </Carousel.Caption>
        </Carousel.Item>

    )

  }  

  generatePlayerRotate(matchNo) {



    return (

        <Grid>
        <Row classname="show-grid">
        <Col sm={6} md={3}>
        <Panel header={<h5>Players</h5>} bsStyle="primary2">
        <Carousel indicators={false} interval={10000}>
        {this.state.data2.map(this.carousel, this)}
        </Carousel>
                         
        </Panel>
        </Col>
        </Row>
       </Grid>        
          

    )

  }

  render() {

    //debugger;
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;



    var matchNo =  this.state.selectedGame.MatchNum;
    var cntP = 23;


    //debugger;
    //console.log("here in lineup");
    let posnTable = null;
    if (this.state.dataLoadedFlag === false ) {
        posnTable = null;
    } else {
        posnTable =  <ReactTable  defaultPageSize={23} data={this.state.data2} columns={this.state.columns}   />;
    }

    var myMarginDisplay = null;
    let myMarginSliderDisplay = null;
    //debugger;
    if ( this.state.gamePickedFlag === true ) {
        //console.log("JJW7"+ this.state.myMargin + " " + (parseInt(this.state.myMargin)));
        if (parseInt(this.state.myMargin) == 0) {
            myMarginDisplay = "Draw"
        } else if ( parseInt(this.state.myMargin) < 0) {
            var newmarg = Math.abs(this.state.myMargin);
            myMarginDisplay =  <p>{this.state.selectedGame.Team}  to Lose by <b> {newmarg} </b></p>;
        } else {
             myMarginDisplay =   <p>{this.state.selectedGame.Team} to Win by <b> {this.state.myMargin} </b></p>;
        }

        var keys1 = "b" + this.state.selectedGame.MatchNum  +  this.state.clickCnt;
        //console.log("JJW3"+this.state.myBaseProb+" "+keys1);
        var prob =  parseInt(this.state.myBaseProb);
        myMarginSliderDisplay = <div key={keys1} className='slider'><SliderBar callbackFromParent={this.myCallbackOverAll} value={prob}    ></SliderBar></div>;
    } else {
        myMarginDisplay = "";
    }

    var modelMarginDisplay = null;
    //debugger;
    if ( this.state.gamePickedFlag === true ) {
        if ( this.state.modelMargin < 0) {
            var newmarg = Math.abs(this.state.modelMargin);
            modelMarginDisplay =  this.state.selectedGame.Team + " to Lose by " + newmarg;
        } else if ( parseInt(this.state.MyMargin) == 0) {
            modelMarginDisplay = "Draw"
        } else {
             modelMarginDisplay =  this.state.selectedGame.Team + " to Win by " + this.state.modelMargin;
        }
    } else {
        modelMarginDisplay = "";
    }

    let playerTable = null;
    if (this.state.dataLoadedFlag === true ) {
        playerTable =  this.generatePlayerRotate(this.state.selectedGame.MatchNum);
    }
    let summTable = null;

    let dataPlayerTable = posnTable;
    if ( this.props.mobil_flag === true) {
        dataPlayerTable = playerTable;
    
    };

    /*
         <div styles={{ 'text-align': 'left;'}}>
       {posnTable}
       </div>
    RugbyVision
    SportsBet
    FootyForecaster
    Rugby365 (SA)
    Bookies
    SportsTron

    "RV" : 8,
               "SB" : 13,
               "FF" : 10,
               "R365" : "",
               "Bookies" : 8.5,
               "SportsTron" : 14,
               "Bookies" : 8.5,
               "SportsTron" : 14

    */
    if ( this.state.gamePickedFlag === true ) {
        summTable = <Grid>
                   <Row classname="show-grid">
                   <Col  sm={4} md={4}>
                       <Panel header={<h5>External Forecasts Margin</h5>} bsStyle="success">
                           <RCTable>
                           <tbody>
                           <tr>
                           <td>RugbyVision</td>
                           <td>{this.state.selectedGame.RV}</td>
                           <td>SportsBet</td>
                           <td>{this.state.selectedGame.SB}</td>
                           </tr>
                           <tr>
                           <td>FootyForecaster</td>
                           <td>{this.state.selectedGame.FF}</td>
                           <td>Rugby365 (SA)</td>
                           <td>{this.state.selectedGame.R365}</td>
                           </tr>
                           <tr>
                           <td>SportsTron</td>
                           <td>{this.state.selectedGame.SportsTron}</td>
                           <td>Bookies</td>
                           <td>{this.state.selectedGame.Bookies}</td>
                           </tr>
                           </tbody>
                           </RCTable>
                       </Panel>
                   </Col>
                   <Col sm={6} md={3}>
                       <Panel header={<h5>Woodys Model Prediction</h5>} bsStyle="primary">
                           <b><h4>{modelMarginDisplay}</h4></b>
                           <p> Base Probability  {this.state.modelBaseProb}% </p>
                           <p> Net Team Probability  {this.state.modelNettTeamWLProb}% </p>
                   

                        </Panel>
                   </Col>
                   <Col sm={6} md={3}>
                       <Panel header={<h5>My Prediction</h5>} bsStyle="success">
                           <b><h4>{myMarginDisplay}</h4></b>
                           <p> Base Probability {this.state.myBaseProb}% </p>
                           <p> Net Team Probability {this.state.overAllProb}% </p>

                           <p>
                           {myMarginSliderDisplay}


                           </p>

                       </Panel>
                   </Col>

                   </Row>
             </Grid>;


    }
    //console.log("data2:"+JSON.stringify(this.state.data2));
    return (
      <div>
      <ToastContainer
          position="bottom-center"
          type="default"
          autoClose={100}
          hideProgressBar={false}
          newestOnTop={false}
          CloseOnClick
          pauseOnHover
          />

          <div>
          <Select name="games" options={this.state.listChoices} myEvent={this.refreshData} onChange={this.onChangeOptions} value={value} placeholder="Select Game" />
          </div>

          <div >
               {summTable}
              </div>
 
       <div styles={{ 'text-align':'left'}}>

                      {dataPlayerTable}
 

       </div>
      
  


      </div>
    );
  }
}

export default LineUp;
