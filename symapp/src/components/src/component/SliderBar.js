import React, { Component } from 'react'
import Slider from 'react-rangeslider'

class SliderBar extends Component {
  constructor(props, context) {
    //debugger;
    //console.log("jjwfunc:"+ JSON.stringify(props));
    //debugger;
    super(props, context)
    //this.props.myfunc.bind(this)
    //console.log("jjwfunc2:"+ JSON.stringify(props));
    this.state = {
      value: props.value,
      row: props.row
    }
    //debugger;
  }

  componentWillReceiveProps()  {
          //console.log("JJW change props...");
          //this.setState( { value : this.props.value } );
          //this.refreshData();
          //this.props.callbackFromParent(this.state.value,this.state.row);

  }
  handleOnChangeComplete = (value) => {
    //console.log("CALLLING....");
    //debugger;
    //this.props.myfunc(this.state.value,this.state.row);
    this.props.callbackFromParent(this.state.value,this.state.row);
 }

  handleOnChange = (value) => {
    this.setState({
      value: value
    })

  }

  render() {
    let { value } = this.state
    return (
      <Slider
        value={value}
        min={0}
        max={100}
        orientation="horizontal"
        onChange={this.handleOnChange}
        onChangeComplete={this.handleOnChangeComplete}
      />
    )
  }
}

export default SliderBar;
