import React, { Component } from 'react'
import debounce from 'lodash/debounce'
import { connect } from 'dva';
import { Select, Spin, Icon } from 'antd';

const { Option } = Select

@connect(({ loading }) => ({
  fetching: loading.effects['custronSkus/filterSkus'],
}))
export default class MySelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      skuList: []
    }
    this.fetchSku = debounce(this.filterSkus, 1000)
  }
  
  filterSkus = val => {
    const { dispatch } = this.props
    
    if (val.length === 0) {
      this.setState({
        skuList: [],
      })
    } else {
      dispatch({
        type: 'customSkus/filterSkus',
        payload: {
          keyword: val,
        },
        callback: res => {
          this.setState({
            skuList: res,
          })
        },
      })
    }
  }
  
  render() {
    const { skuList } = this.state
    const { fetching } = this.props
    
    return (
      <Select
        showSearch  // 单选搜索模式
        allowClear
        filterOption={false}  // 是否根据输入项进行筛选
        showArrow={false}
        placeholder={
          <span>
            <Icon type="search" /> 请输入sku进行搜索
          </span>
        }
        notFoundContent={fetching ? <Spin size="small" /> : null}  // 无下拉内容时显示
        onSearch={this.fetchSku}  // 触发搜索
        size="small"
        style={{ width: '100%' }}
      >
        {skuList.map((item) => <Option key={item.id}>item.name</Option>)}
      </Select>
    )
  }
}