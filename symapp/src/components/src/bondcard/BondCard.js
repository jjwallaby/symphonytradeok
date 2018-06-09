import React, { Component } from 'react';
import io from "socket.io-client";
 // Bundled component import
// JJW Added Card
//import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
//import { Button, Card, CardBody, CardImage, CardTitle, CardText  } from 'mdbreact';

const dummyText = "Dummy data";

import { ToastContainer, toast } from 'react-toastify';
import TimeAgo from 'react-timeago';
import cancelable from 'react-promise-cancelable';
import { Promise } from 'bluebird';
import  DealCard  from './DealCard';
import Autosuggest from 'react-bootstrap-autosuggest';


import {
  Button,
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
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} from 'react-bootstrap';

import './bondCard.css';

var styles = {
    'background-color' : 'blue'

};

var stylespanwhite = {
    'color' : '#ffffff'
}

var stylespanleft = {
    'textalign' : 'left'
}

var stylespanlargeFnt = {
    'font-size' : '25px'
}

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
  const id = setTimeout(resolve,1);
  onCancel(() => clearTimeout(id));

});

var socket =null;

class BondCard extends React.Component {

    toastId = null;

    constructor(props) {
        super(props);
        //debugger;
        console.log("window1:"+window.shareService);
        this.refreshData = this.refreshData.bind(this);
        this.refreshDataHttp = this.refreshDataHttp.bind(this);
        this.generateCardRotate  = this.generateCardRotate.bind(this);
        this.onBrowserChange  = this.onBrowserChange.bind(this);
        this.refreshDataSocket = this.refreshDataSocket.bind(this);


        this.state = {
            openData : { repos : [] },
            filterOpenData : { repos : [] },
            defaultOpen : {},
            url : "http://localhost:8080",
            dataload : false,
            request_counter : 0,
            activeItem: 1,
            maxLength: 3,
            browser: '',
            bsSize: 'large',
            validationState: 'error',
            datalist : [],
            totalSearch : null,
            dataDisplay : null,
            globalkeyno : 0,
            sourceData : "other"
        }


        socket = io("http://localhost:5000");

        
        socket.on('connect', () => {
            console.log('user connected');
        });

        const addMessage = data => {
            console.log(data);
            this.setState({ openData : data });
            this.refreshDataSocket(data);
        };

        socket.on('RECEIVE_MESSAGE_CUST', function (data) {
            console.log("Got new trades Cust...");
            console.log("Here..");
            console.log("Total trades loaded :" + data.repos.length);
            addMessage(data);
            //refreshDataSocket(data);


        });
        
        socket.on('disconnect', () => {
            console.log('user disconnected')
        })

        function sendMessage()  {
          //ev.preventDefault();
          console.log("Get trades...");
          socket.emit('SEND_MESSAGE_CUST', {
              user: "owner",
              message: "gettrades"
          });

        };

        sendMessage();

    }



    state = {
        openData : { repos : [] },
        defaultOpen :{},
        filterOpenData : { repos : [] },
        dataload : false,
        url : "http://localhost:8080",
        request_counter : 0,
        activeItem: 1,
        maxLength: 3,
        browser: '',
        bsSize: 'large',
        validationState: 'error',
        datalist : [],
        totalSearch : null,
        dataDisplay : null,
        globalkeyno : 0,
        sourceData : "other"
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
          //this.setState({ hasError: true});
          // you can also log the error to an error reporting service
          // JJW to do
          toast.err("Error -" + error + " info" + info, { autoClose : 3000});
          //LogErrortoMyService(error,info)
    }

    componentDidMount() {

        console.log("did mount");

        //this.refreshData();
    }

    componentWillUnmount() {


        console.log("did unmount");
    }

    // autobind
    onBrowserChange(value) {
       console.log("jjw2:"+window.shareService); 
       console.log("Setting browser:"+value);
       this.setState({ browser: value })
       this.filterData(value);
    }

    carousel(datajson, index) {
        var keyid = 'c' +  + datajson.keyid  + index;
        var keyida = 'a' +  + datajson.keyid  + index;
        var picdiag = "/carousel_" + index + ".png";
       
        return (
        
            <Carousel.Item key={keyida}>
                   <Carousel.Caption>
                   <DealCard key={keyid} cardDetail={datajson} > </DealCard>
                   </Carousel.Caption>
            </Carousel.Item>
    
        )
    
      }  
    
      generateCardRotate(jsondata,cnt) {

        if ( this.state.totalSearch > 2 ) {
            return (
                <div key={`{this.state.globalkeyno}`+"a"} >
                <Grid>
                <Row classname="show-grid">
                <Col sm={6} md={6}>
                <Panel header={<h5>Repos&nbsp;&nbsp;&nbsp;&nbsp;<Badge>{cnt}</Badge></h5>} bsStyle="primary">
                <Carousel indicators={false} interval={false}>
                 {jsondata.repos.map(this.carousel, this)}
                  </Carousel>
                                 
                </Panel>
                </Col>
                </Row>
               </Grid>        
               </div>
                  
        
            )
        } else if  ( this.state.totalSearch > 0 )  {
            return (
                <div key={this.state.globalkeyno} >
                <Grid>
                <Row classname="show-grid">
                <Col sm={6} md={6}>
                <Panel header={<h5>Repos&nbsp;&nbsp;&nbsp;&nbsp;<Badge>{this.state.totalSearch}</Badge></h5>} bsStyle="primary">
             
                 {jsondata.repos.map( (data,index) => {
                        var keyid = 'd' +  + data.keyid  + index;
                        return <DealCard key={keyid} cardDetail={data} > </DealCard>
                                 
                 })}  
                </Panel>
                </Col>
                </Row>
               </Grid>        
               </div>
                  
        
            )

        }
      
        
    
    }

    filterData(filterString)  {
        this.setState( {globalkeyno  : this.state.globalkeyno+1});
        var newjson = { };
        var newrepos = { repos : [] };
        //this.state.filterOpenData =  { repos : [] };
        this.state.openData.repos.map( (data) => {
            if (data.ShortDesc.includes(filterString)) {
                newjson = data;
                newrepos.repos.push(newjson);
                console.log("Filter Added:" +  data.ShortDesc);
            } else if ( filterString === '') {
                this.state.filterOpenData.repos.push(data);
            }

        });

        this.setState( { filterOpenData : newrepos});
        this.setState( { totalSearch :  newrepos.repos.length });
        console.log("State dataloaded:" + this.state.dataload);
        if ( this.state.dataload === true ) {
            this.setState( { dataDisplay : this.generateCardRotate(newrepos,newrepos.repos.length) });
            //console.log(dataDisplay);
        }

    }

    buildData = () => {

        var json  = this.state.openData;

        this.state.datalist = [];
        json.repos.map( (data) => {
            //debugger;
            //console.log(JSON.stringify(data));
            console.log(JSON.stringify(data.ShortDesc));
            if (!this.state.datalist.includes(data.ShortDesc)) {
                this.state.datalist.push(data.ShortDesc);
            }
            //return <li key={i}>{user.name}</li>
        });
        

    }


    refreshData() {

        if (this.state.sourceData == "http") {
            this.refreshDataHttp();
        } else {
            console.log("other");
            this.refreshDataSocket();
        }
    }

    refreshDataSocket = (data) => {

        this.notify("Loading data");
        this.setState({openData: data});
        this.buildData();
        this.setState({dataload : true});
        this.filterData(this.state.browser);
        this.dismissAll();
        toast.success("Done", { autoClose: 500, position: "bottom-center"});


    }

    refreshDataHttp = (openDataInst) => {


        this.setState({ defaultOpen : openDataInst });
        //console.log("calling :" + this.state.url);
        this.notify("Loading..." +  { autoClose : false});

        promise.then( () => {
            // this.props.date.slice(0,10).replace(/-/g,"")  queryString.stringify(this.state.urlparams);
            var urlmodify = this.state.url + "/open_repos.json";
            fetch(urlmodify, {})
            .then(response => {
                //console.log("Response:" + response.status + " " + JSON.stringify(response));
                if (response.status == 200 ) {
                   // debugger;
                    response.json().then(json => {
                        this.notify("Loading data");
                        this.setState({openData: json});
                        //console.log("json:" + json);
                        this.buildData();
                        this.setState({dataload : true});
                        this.filterData(this.state.browser);
                        this.dismissAll();
                        toast.success("Done", { autoClose: 500, position: "bottom-center"});

                    }).catch(err => {
                        console.log("Cannot convert json parse error:" + err);
                        toast.error("Error", {autoClose: 90000});
                        this.logerror("Major Json parsed Error:"+ err);
                    });
                    //var newurl =  GLOBAL.BASEURL + "seasongames";
                    //this.setState({url : newurl });
                    this.setState({ defaultOpen : openDataInst  });
                }
                else {
                    this.setState({openData: null});
                    this.dismissAll();
                    toast.warn("No Data",{autoClose : 9000});
                }

                //console.log("done promise " + (this.state.request_counter-1));
                this.setState({request_counter : (this.state.request_counter-1)});
            }).catch( err => {
                //console.log("Fetch backend error:" + err);
                toast.error("Fetch Error 1", { autoClose: 90000});
                this.logerror("Fetch Error 1 - " + err);
                this.setState({request_counter : (this.state.request_counter-1)});
            })
            }).catch ( err => {
                //console.log("Fetch Error 2:" + err);
                toast.error("Fetch Error 2", { autoClose: 90000});
                this.logError("Fetch Error 2 - " + err)

            }).done( () => {
                //console.log("start promise:" + this.state.request_counter + " " + (this.state.request_counter+1));
                this.setState({request_counter: this.state.request_counter+1});
            });
    }

    render() {

       const { activeItem } = this.state;
       //let dataDisplay = null;

       return(
        <div>
      <ToastContainer
          position="bottom-center"
          type="default"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          CloseOnClick
          pauseOnHover
          />

           <div>
  <FormGroup controlId="browserInput"
    bsSize={this.state.bsSize} validationState={this.state.validationState}>
  <ControlLabel>Bond Search</ControlLabel>
  <Autosuggest
    datalist={this.state.datalist}
    placeholder="Search Bond?"
    value={this.state.browser}
    onChange={this.onBrowserChange}
    bsSize={this.state.bsSize} />
  {this.state.validationState && <FormControl.Feedback />}
  {this.state.validationState && <HelpBlock>Please select a Bond</HelpBlock>}
</FormGroup>
      </div>
                 <div styles={{ 'text-align':'left'}}>

 
   {this.state.dataDisplay}


</div>
     

 
        </div>


       );
    }
}

export default BondCard;