import React, { Component } from 'react'
import { Table, Card } from 'antd'
import ColSetting from './components/ColSetting'
import SearchBar from './components/SearchBar'

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
    page: 1,
    pageSize: 10,
    total: [],
    data: [
      {
        id: 1,
        name: 'liu',
        age: 23,
        sex: 'man'
      },
    ]
  }

  // 选择列
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

  // 表格参数变化
  handleTableChange = (pagination) => {
    const { current, pageSize } = pagination
    this.setState({
      page: current,
      pageSize,
    })
  }

  render() {
    const { data, columns, total, page, pageSize } = this.state
    return (
      <>
        <Card>
          <SearchBar />
        </Card>
        <Card style={{ marginTop: '15px' }}>
          <div style={{ textAlign: 'right' }}>
            {/* 引用列设置组件：参数：默认的列数据（initColumns），回调函数（当组件中的列发生变化时调用，设置列） */}
            <ColSetting columns={initColumns} colChange={(val) => this.handleColChange(val)} />
          </div>
          <Table
            rowKey='id'
            columns={columns}
            dataSource={data}
            onChange={this.handleTableChange}
            bordered
            style={{ marginTop: 20 }}
            pagination={{
              total,
              current: page,
              pageSize,
              pageSizeOptions: ['5', '10', '15', '20'],
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: totals => (
                <p style={{ position: 'absolute', left: 0 }}>总共有 {totals} 条记录</p>
              ),
            }}
          />
        </Card>
      </>
    )
  }
}

export default ListDemo1