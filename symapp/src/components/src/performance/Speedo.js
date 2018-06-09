import React, { Component } from 'react';
import ReactSpeedometer from "react-d3-speedometer";
import {
  Button,
  ButtonGroup,
  ListGroupItem,
  ListGroup,
  Glyphicon,
  Panel,
  Image,
  Grid,
  Col,
  Row,
  Text,
  Badge,
} from 'react-bootstrap';


class Speedo extends Component {


    constructor(props) {
        super(props);
    }

    render() {

        return(


            <Panel bsStyle="primary" header={<h3> {this.props.diskname} GB </h3>}>


            <div   style={{
                       width: "250px",
                       height: "150px",

                   }}>


                <ReactSpeedometer
                fluidWidth={true}
                maxValue={this.props.disksizeGB}
                value={this.props.usedGB}
                needleColor="black"
                startColor="green"
                segements="10"
                endColor="red"
                />
   </div>
               </Panel>
        )
    }
}

export default Speedo;
