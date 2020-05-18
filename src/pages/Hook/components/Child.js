import React, { useState, useImperativeHandle } from 'react'

function Child({ cRef }) {
  const [name2, setName2] = useState('---')

  useImperativeHandle(cRef, () => ({
    showName2: (val) => {
      setName2(val)
    }
  }))
  
  return (
    <h1>这是子元素中的内容：{name2}</h1>
  )
}

export default Child