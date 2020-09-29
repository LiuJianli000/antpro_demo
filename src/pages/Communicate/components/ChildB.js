import React, { Component } from 'react'
import { Button } from 'antd'

export default class ChildB extends Component {
  render() {
    return (
      <div>
        <Button onClick={() => this.props.speakToA('bro')}>ChildB -- ChildA</Button>
      </div>
    )
  }
}