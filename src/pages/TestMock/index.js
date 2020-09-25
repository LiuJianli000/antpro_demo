import { Button, Table } from 'antd'
import React, { Component } from 'react'
import { connect } from 'umi'
import MyIcon from './components/MyIcon'

@connect(() => ({}))
export default class TestMock extends Component {
  state = {
    data: [],
    page: 1,
    pageSize: 10,
    total: null,
  }
  
  componentDidMount() {
    this.fetch()
  }

  fetch = params => {
    const { dispatch } = this.props
    const { page, pageSize } = this.state

    dispatch({
      type: 'testMock/fetch',
      payload: {
        current: page,
        pageSize,
        ...params,
      }
    }).then(res => {
      console.log(res)
      this.setState({
        data: res.data,
        total: res.total
      })
    })
  }

  handleQuery = () => {
    this.fetch({
      name: '96'
    })
  }

  handleTableChange = async (pagination) => {
    const { current, pageSize } = pagination

    await this.setState({
      page: current,
      pageSize: pageSize,
    })

    this.fetch()
  }

  handleDelete = async id => {
    const { dispatch } = this.props

    await dispatch({
      type: 'testMock/delete',
      payload: {
        id,
      }
    })

    this.fetch()
  }

  handleUpdate = async id => {
    const { dispatch } = this.props

    await dispatch({
      type: 'testMock/update',
      payload: {
        id,
        name: '00000',
        desc: '11111'
      }
    })

    this.fetch()
  }

  handleAdd = async () => {
    const { dispatch } = this.props

    await dispatch({
      type: 'testMock/add',
      payload: {
        name: 'liu',
        desc: 'new new new'
      }
    })

    this.fetch()
  }
  
  render() {
    const { data, page, pageSize, total } = this.state

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: '名字',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '描述',
        dataIndex: 'desc',
        key: 'age'
      },
      {
        title: '时间',
        dataIndex: 'createdAt',
        key: 'createdAt'
      },
      {
        title: '操作',
        render: (v, r) => <>
          <Button size='small' onClick={() => this.handleDelete(r.id)} style={{ color: 'red' }}>delete</Button>
          <Button size='small' onClick={() => this.handleUpdate(r.id)} style={{ color: 'blue' }}>update</Button>
        </>
      }
    ]

    return (
      <>
        <Button type="primary" onClick={this.handleQuery}>query</Button>
        <MyIcon type="icon-chengzi" />
        <Button type="primary" onClick={this.handleAdd}>add</Button>
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
      </>
    )
  }
}