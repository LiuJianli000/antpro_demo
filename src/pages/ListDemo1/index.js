import React, { Component } from 'react'
import { Table, Card } from 'antd'
import ColSetting from './components/ColSetting'

// 默认的 表头列数据
const initColumns = [
  {
    title: '名字',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    key: 'age'
  },
]

class ListDemo1 extends Component {
  state = {
    columns: [],  // 渲染到 Table 的列，初始为空
    data: [
      {
        id: 1,
        name: 'liu',
        age: 23,
        sex: 'man'
      }
    ]
  }

  handleColChange = (val) => {
    const columns = []

    initColumns.forEach(item => {
      val.forEach(item2 => {
        if (item.dataIndex === item2) {
          columns.push(item)
        }
      })
    })

    this.setState({
      columns,
    })
  }

  render() {
    const { data, columns } = this.state
    return (
      <Card>
        <div style={{ textAlign: 'right', marginBottom: '5px' }}>
          {/* 引用列设置组件：参数：默认的列数据（initColumns），回调函数（当组件中的列发生变化时调用，设置列） */}
          <ColSetting columns={initColumns} colChange={(val) => this.handleColChange(val)}/>          
        </div>
        <Table
          rowKey='id'
          columns={columns}
          dataSource={data}
        />
      </Card>
    )
  }
}

export default ListDemo1