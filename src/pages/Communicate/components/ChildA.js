import React, { Component } from 'react'

export default class ChildA extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
    this.props.onRef(this)
  }

  callA = name => {
    this.setState({
      name
    })
  }

  render() {
    return (
      <div>
        name: {this.state.name}
      </div>
    )
  }
}