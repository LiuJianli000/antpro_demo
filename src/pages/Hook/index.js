import React, { useRef } from 'react'
import { Button } from 'antd'
import Child from './components/Child'

function Test() {
  const childRef = useRef()
  const updateChildState = () => {
    childRef.current.showName2('child')
  }

  return (
    <div>
      <h1>这是父元素中的内容：parent</h1>
      <Button type="primary" onClick={updateChildState}>click</Button>
      <Child cRef={childRef} />
    </div>
  )
}

export default Test