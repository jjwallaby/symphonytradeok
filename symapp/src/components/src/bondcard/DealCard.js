import React, { Component } from 'react';
 // Bundled component import
// JJW Added Card
//import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Row, Col, Button, Thumbnail } from  'react-bootstrap';
//import style from './style.css';
const dummyText = "Dummy data";


import { convertNominal, cpySide, getIconName } from '../utils/Helpers';
import NumericInput  from 'react-numeric-input';

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



class DealCard extends React.Component {

    

    state = {
        cardDetail  : null,
        dataload : false,
        request_counter : 0,
        price : 0,
        side : "",
        amt : ""
    }

    
    constructor(props) {

        super(props);
        this.changeRepoPrice = this.changeRepoPrice.bind(this);
        this.onClick = this.onClick.bind(this);
        this.state = {
            cardDetail : props.cardDetail,
            request_counter : 0,
            dataload : true,
            price : props.cardDetail.TargetRate,
            side : cpySide(props.cardDetail.Side),
            amt : convertNominal(props.cardDetail.Position)
        }

    }

    buildblurb() {
        return  this.state.amt + "m start:" + this.state.cardDetail.Start + " end:" + this.state.cardDetail.End + " QuoteTicket:" + this.state.cardDetail.keyid + " ISIN:" + this.state.cardDetail.ISIN;    
    }

    changeRepoPrice(newRepo) {
        console.log("Repo price"+newRepo);
        this.setState( { price : newRepo });
        
    }

    onClick() {
        console.log("jjw22");
        let custSide = cpySide(this.state.cardDetail.Side);
        let iconName = getIconName(custSide);
        //debugger;
        //var articleUnixTimestamp = (new Date("2018-06-01").getTime())/1000;
        var articleUnixTimestamp = (new Date(Date.now()).getTime())/1000;
        var articleOptions = {
            "title":  "Repo " + this.state.side + "@" + this.state.price,
            "subTitle": this.state.cardDetail.ShortDesc,
            "blurb": this.buildblurb(),
            "date": articleUnixTimestamp,
            "publisher": "West Bank",
            "author": "TraderA",
            "thumbnail": iconName,
            // In this case, the shared article has an ID, which is used to deeplink back into our application
            "id": this.state.cardDetail.keyid               
        };
       
        window.shareService.share(
                "article",
                articleOptions
            );
       

    }

    componentDidMount() {

    }


    render() {

        let iconName = "";
        let dataDisplay = null;
        if ( this.state.dataload === false ) {
            dataDisplay = "";
        }
        else {
            let custSide = cpySide(this.state.cardDetail.Side);
            iconName = getIconName(custSide);
            console.log("state:" + this.state.cardDetail.End);
            console.log("state:" + convertNominal(this.state.cardDetail.Position));
            console.log("state: " + this.state.cardDetail.Name);
            console.log("state: " + this.state.cardDetail.ISIN);
            dataDisplay = 
             <div tag="div">
                <div className="view gradient-card-header blue-gradient">
                    <div style={styles}>
        
         <p><h1 style={stylespanleft}>
                  <span style={stylespanwhite}>
                  <strong>{this.state.cardDetail.ShortDesc}</strong></span></h1></p>
                  <p><span style={stylespanwhite}>{this.state.cardDetail.Name}</span></p>
                  <p><span style={stylespanwhite}>{this.state.cardDetail.CCY} Nominal:&nbsp;&nbsp;</span><span style={stylespanwhite}>{convertNominal(this.state.cardDetail.Position)} </span>
                  <span style={stylespanwhite}>
            
                  &nbsp;{cpySide(this.state.cardDetail.Side)}&nbsp;&nbsp;</span>
                  <span>Repo&nbsp;</span>
                  </p>
                  <p><span style={stylespanwhite}><span>{this.state.cardDetail.Tenor}&nbsp;&nbsp;start&nbsp;{this.state.cardDetail.Start}&nbsp;&nbsp;end&nbsp;{this.state.cardDetail.End}</span></span></p>
                  <p><span></span></p>
                  <p><span style={stylespanwhite}><strong>ISIN</strong>:{this.state.cardDetail.ISIN}</span></p>
                  <p><span style={stylespanwhite}><strong>Ticker</strong>:{this.state.cardDetail.Ticker}</span></p>
                  <p><span></span></p>
                  <p></p>
                </div>
              </div>
        
         <div>
          
         <Row>
              <Col xs="2"> <Button src={iconName} onClick={this.onClick}  ><img height="30" width="50" src={iconName} /></Button></Col>
              <Col xs="2"> <img height="40" width="70" src="http://rugbyfc.com/symphonyimg/price.png" /> </Col>
              <Col xs="4">
           <NumericInput size="small"
            style={{
                wrap: {
                    background: '#E2E2E2',
                    boxShadow: '0 0 1px 1px #fff inset, 1px 1px 4px 1px #000',
                    padding: '2px 2.26ex 2px 2px',
                    borderRadius: '2px 2px 2px 2px',
                    fontSize: 32
                },
                input: {
                    borderRadius: '2px 2px 2px 2px',
                    color: '#988869',
                    padding: '0.1ex 1ex',
                    border: '1px solid #ccc',
                    marginRight: 2,
                    display: 'block',
                    fontWeight: 100,
                    textShadow: '1px 1px 1px rgba(0, 0, 0, 0.1)',
                    width: '130px'
                },
                'input:focus' : {
                    border: '1px inset #69C',
                    outline: 'none'
                },
                arrowUp: {
                    borderBottomColor: 'rgba(66, 54, 0, 0.63)'
                },
                arrowDown: {
                    borderTopColor: 'rgba(66, 54, 0, 0.63)'
                }
            }}
                      key={this.state.cardDetail.no}aa step={0.005} precision={3}  value={this.state.price} onChange={this.changeRepoPrice}/>
              </Col>
              <Col xs="4">&nbsp;&nbsp;</Col>
              </Row>        
            </div>
            </div>
        }

       return(
        <div>

        {dataDisplay}   

  </div>


       );
    }
}


export default DealCard;