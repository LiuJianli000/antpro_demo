import React, { Component } from 'react'
import { Tooltip, Popover, Checkbox, Row, Col } from 'antd'
import { SettingOutlined } from '@ant-design/icons'

class ColSetting extends Component {
  state = {
    allList: [],
    isSelectAll: false,
    indeterminate: false,
    selectedList: [],
  }

  componentDidMount() {
    const { columns } = this.props
    const initSelect = []

    if (columns.length) {
      columns.map(item => {
        initSelect.push(item.dataIndex)
        return item
      })
    }
    
    this.setState({
      allList: initSelect,
      isSelectAll: true,
      selectedList: initSelect,
    })
  }

  componentDidUpdate(prevProps, prevStates) {
    if (prevStates.selectedList.length !== this.state.selectedList.length) {
      this.props.colChange(this.state.selectedList)
    }
  }

  showAll = e => {
    const { isSelectAll, allList } = this.state
    const val = e.target.checked
    
    if (isSelectAll) {
      this.setState({
        isSelectAll: val,
        indeterminate: false,
        selectedList: [],
      })
    } else {
      this.setState({
        isSelectAll: val,
        indeterminate: false,
        selectedList: allList
      })
    }
  }

  handleSelect = async val => {
    await this.setState({
      selectedList: val
    })

    const { selectedList, allList } = this.state
    if (selectedList.length > 0 && selectedList.length < allList.length) {
      this.setState({
        isSelectAll: false,
        indeterminate: true
      })
    }
    if (selectedList.length === allList.length) {
      this.setState({
        isSelectAll: true,
        indeterminate: false
      })
    }
    if (selectedList.length === 0) {
      this.setState({
        isSelectAll: false,
        indeterminate: false,
      })
    }
  }
  
  render() {
    const { columns } = this.props
    const { selectedList, isSelectAll, indeterminate } = this.state

    return (
      <>
        <Tooltip title='列设置'>
          <Popover
            placement="bottomRight"
            arrowPointAtCenter="true"
            overlayStyle={{ width: '150px' }}
            trigger="click"
            title={
              <div>
                <Checkbox onChange={this.showAll} checked={isSelectAll} indeterminate={indeterminate}>列展示</Checkbox>
              </div>
            }
            content={
              <div>
                <Checkbox.Group
                  value={selectedList}
                  onChange={this.handleSelect}
                  >
                  <Row gutter={ 16 }>
                    {columns.length &&
                      columns.map(item =>
                        <Col key={item.dataIndex} span={ 24 } >
                          <Checkbox value={item.dataIndex}>{item.title}</Checkbox>
                        </Col>
                      )
                    }
                  </Row>
                </Checkbox.Group>
              </div>
            }
            >
            <SettingOutlined style={{ fontSize: '18px' }} />
          </Popover>
        </Tooltip>
      </>
    )
  }
}

export default ColSetting