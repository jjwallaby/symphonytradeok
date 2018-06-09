import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import {
  LinkContainer,
  IndexLinkContainer,
} from 'react-router-bootstrap';
import {
  Navbar,
  Image,
  Nav,
  NavItem,
  MenuItem,
  FormGroup,
  ControlLabel,
  HelpBlock,
  ButtonToolbar,
  ToggleButton,
  ToggleButtonGroup,
  FormControl,
  Button,
  Grid,
  Row,
  View,
  Col,
} from 'react-bootstrap';

import './public/themeroller-3.3.7/bootstrap.css';
import './App.css';
import DatePicker from 'react-bootstrap-date-picker';
var GLOBAL = require('./components/src/config/global');

//
//
function detectmob() {
  //console.log("JJW:"+window.innerWidth+" "+window.innerHeight);
  if(window.innerWidth <= 800 && window.innerHeight <= 700) {
    return true;
  } else {
    return false;
  }
}

var mobil_flag = detectmob();

// "App" is the parent component of other components that are
// rendered when the route changes. It's job is to render the
// shell of a Bootstrap UI.
//var App = React.createClass({ children }) => ({
class App extends React.Component {



    static propTypes = {
       chgBusDate_FETCHING: PropTypes.func.isRequired,
       chgBusDate_FETCH: PropTypes.func.isRequired,
       params: PropTypes.shape({
         id: PropTypes.string.isRequired,
       }),
     }



    constructor(props) {
        super(props);
        //console.log("contstructor callled props are app: jjw" + props.jjw);

        this.state = {

        businessdate: new Date("2017-10-27").toISOString(),
        date: new Date("2017-10-27").toISOString().slice(0,10),
        env: "qa",
        previousDate: null,
        minDate: null,
        maxDate: null,
        focused: false,
        invalid: false,
        mobil_flag: mobil_flag,
        gurlparams : { businessdate: new Date("2017-10-27").toISOString().slice(0,10).replace(/-/g,"") , env: "qa" }

        }


        this.handleChange = this.handleChange.bind(this);
        this.handleChangeEnv= this.handleChangeEnv.bind(this);
        this.chgBusDate_FETCHING = this.chgBusDate_FETCHING.bind(this);
        this.chgBusDate_FETCH = this.chgBusDate_FETCH.bind(this);
    }


    componentWillMount() {
      // console.log("YES WE ARE MOUNTING...");
      this.props.chgBusDate_FETCHING();
      //this.props.chgBusDate_FETCH(
        //this.props.params.id
      //);
    }

    handleChange(value) {
      GLOBAL.BUSINESSDATE = value;
      this.setState({

        date: value.slice(0,10),
        gurlparams : { businessdate: value.slice(0,10).replace(/-/g,"") }
    }

);


    }

    handleChangeEnv(e) {

      this.setState({
        env: e.target.value,
        gurlparams : {  env: e.target.value }
      });

    }


    chgBusDate_FETCHING(value) {

    }

    chgBusDate_FETCH(value) {

    }
    render() {
        //console.log("render new date :" + this.state.date);
        //console.log("THIS Props" + props.params);
        //this.setState({props.params.jjw : "1111111"});
        //debugger;
        return(

  <main>
    { /* The "NavBar" is statically-placed across the
         top of every page. It contains things like the
         title of the application, and menu items. */ }

    <Navbar className="navbar-top" fluid>
      <Navbar.Header>
        <Navbar.Brand>

          <Row>
              <Col xs="1"><img height="30" width="50" src="./img/TradeOk.png"/></Col>
              <Col xs="10">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Bond Repo Blotter</Col>
          </Row>    
          
        </Navbar.Brand>

        { /* The "<Navbar.Taggle>" coponent is used to replace any
             navigation links with a drop-down menu for smaller
             screens. */ }
        <Navbar.Toggle />
      </Navbar.Header>

      { /* The actual menu with links to makes. It's wrapped
           in the "<Navbar.Collapse>"" component so that it
           work properly when the links have been collapsed. */ }
      <Navbar.Collapse>
        <Nav pullRight>
          <IndexLinkContainer to="/">
            <MenuItem>Repos</MenuItem>
          </IndexLinkContainer>
          <LinkContainer to="home"  {...this.state} params={{jjwdate : this.props.businessdate}}>
            <MenuItem  {... this.props.businessdate}>About</MenuItem>
          </LinkContainer>
          <LinkContainer to="BondCardMenu"  {...this.state} params={{jjwdate : this.props.businessdate}}>
            <MenuItem  {... this.props.businessdate}>BondRepos</MenuItem>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <Grid fluid>
      <Row>
        { /* This navigation menu has the same links
             as the top navbar. The difference is that
             this navigation is a sidebar. It's completely
             hidden on smaller screens. */}
        <Col sm={3} md={2} className="sidebar">
          <Nav stacked>
            <IndexLinkContainer to="/">
              <NavItem>Repos</NavItem>
            </IndexLinkContainer>
            <LinkContainer to="BondCardMenu"  {...this.state} params={{jjwdate : this.props.businessdate}}>
              <NavItem  {... this.props.businessdate}>BondRepo</NavItem>
            </LinkContainer>
            <LinkContainer to="home"  {...this.state} params={{jjwdate : this.props.businessdate}}>
              <NavItem  {... this.props.businessdate}>About</NavItem>
            </LinkContainer>
          </Nav>
        </Col>

        <Col sm={9} smOffset={3} md={10} mdOffset={2} className="content" mydate={this.state.date} >
           <div>{React.cloneElement(this.props.children, this.state )}</div>

        </Col>
      </Row>

    </Grid>
  </main>);
  }
};

App.propTypes = {
  GLOBALBUSDATE: PropTypes.string,
  businessdate: PropTypes.string,
  children: PropTypes.node,
  chgBusDate_FETCHING: PropTypes.func,
  chgBusDate_FETCH: PropTypes.func,
};

App.defaultProps = {  GLOBALBUSDATE: new Date("2017-10-27").toISOString(), businessdate: new Date("2017-10-27").toISOString(), }

const mapStateToProps = state => {
  return {
    GLOBALBUSDATE : state.GLOBALBUSDATE,
    businessdate : state.businessdate
  }
}

export default connect(
  mapStateToProps,
  dispatch => ({
    chgBusDate_FETCHING: () => dispatch({
      type: 'FETCHING_GLOBAL',
    })
    //chgBusDate_FETCH: (id) => {
     //  console.log("CALLED chgBusDate_FETCH");

     //  dispatch({
    //      type: 'FETCH_GLOBAL',
    //      payload: {  GLOBALBUSDATE : "2017-10-30T02:44:46.036Z"  },
     //})
      //const headers = new Headers();
      //headers.append('Accept', 'application/json');

      //fetch(`/api/articles/${id}`, { headers })
        //.then(resp => resp.json())
    //    .then(json => dispatch({
    //      type: 'FETCH_ARTICLE',
    //      payload: json,
//        }));
    }
  )
)(App);
