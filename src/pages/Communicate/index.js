import React, { Component } from 'react'
import ChildA from './components/ChildA'
import ChildB from './components/ChildB'
import { Button } from 'antd'

export default class Father extends Component {
  render() {
    return (
      <>
        <ChildA onRef={ref => this.child = ref}/>
        <Button onClick={() => this.child.callA('son')}>Father -- ChildA</Button>
        <ChildB speakToA={(name) => this.child.callA(name)}/>
      </>
    )
  }
}