import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

export default class Scroll extends Component {
  renderThumb({ style, ...props }) {
    const thumbStyle = {
      width: '4px',
      backgroundColor: 'red',
      opacity: '0.7',
      borderRadius: '2px',
      right: '-1px',
    }

    return (
      <div style={{ ...style, ...thumbStyle }} {...props} />
    )
  }
  
  render() {
    return (
      <>
        <Scrollbars 
          style={{ width: 300, height: 300 }} 
          autoHide
          autoHideTimeout={800}
          autoHideDuration={200}
          renderThumbVertical={this.renderThumb}
          universal
        >
          <img src="https://source.unsplash.com/random/400x600" alt="" style={{ width: '100%', height: 'auto' }} />
        </Scrollbars>
      </>
    )
  }
}