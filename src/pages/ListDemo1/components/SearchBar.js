import React, { Component } from 'react';
import { Form, Row, Col, Input, Button, DatePicker, Select } from 'antd';
import { connect } from 'umi';
import moment from 'moment';
import styles from './searchBar.less';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;

@connect(() => ({}))
class SearchBar extends Component {
  state = {
    inType: false,
  };

  handleQuery = (fieldsValue) => {
    const { select_date } = fieldsValue;
    const values = { ...fieldsValue };

    if (select_date && select_date.length > 0) {
      values.select_date = [
        select_date[0].format('YYYY-MM-DD'),
        select_date[1].format('YYYY-MM-DD'),
      ];
    }
  };

  initDateRange = () => {
    return {
      今天: [moment(), moment()],
      本周: [moment().startOf('week'), moment().endOf('week')],
      本月: [moment().startOf('month'), moment().endOf('month')],
      今年: [moment().startOf('year'), moment().endOf('year')],
      上周: [
        moment().startOf('week').subtract(1, 'week'),
        moment().startOf('week').subtract(1, 'day'),
      ],
      上个月: [
        moment().startOf('month').subtract(1, 'month'),
        moment().startOf('month').subtract(1, 'day'),
      ],
      去年: [
        moment().startOf('year').subtract(1, 'year'),
        moment().startOf('year').subtract(1, 'day'),
      ],
    };
  };

  render() {
    const { inType } = this.state;
    const { loading, selectDate } = this.props;
    // 如果搜索栏 FormItem 不确定，搜索按钮布局不同
    const searchBtnLayout = inType ? { xl: 12, sm: 24, xs: 24 } : { xl: 18, sm: 8, xs: 12 };

    return (
      <Form
        onFinish={this.handleQuery}
        className={styles.form}
        initialValues={{
          in_type: 'ALL',
          select_date: selectDate && [
            moment(selectDate, 'YYYY-MM-DD'),
            moment(selectDate, 'YYYY-MM-DD'),
          ],
          sort: 'one_data',
        }}
      >
        <Row gutter={16}>
          <Col xl={6} sm={8} xs={12}>
            <FormItem label="关键字" name="keyword">
              <Input placeholder="请输入关键字" style={{ width: '100%' }} allowClear />
            </FormItem>
          </Col>
          <Col xl={6} sm={8} xs={12}>
            <FormItem label="域名" name="domain">
              <Input placeholder="请输入域名" style={{ width: '100%' }} allowClear />
            </FormItem>
          </Col>
          <Col xl={6} sm={8} xs={12}>
            <FormItem label="时间" name="select_date">
              <RangePicker style={{ width: '100%' }} ranges={this.initDateRange()} />
            </FormItem>
          </Col>
          <Col xl={6} sm={8} xs={12}>
            <FormItem label="平台" name="platform">
              <Select placeholder="请选择平台" style={{ width: '100%' }} allowClear>
                <Option value="shopify">shopify</Option>
                <Option value="xshoppy">xshoppy</Option>
                <Option value="other">other</Option>
              </Select>
            </FormItem>
          </Col>
          <Col xl={6} sm={8} xs={12}>
            <FormItem label="排序" name="sort">
              <Select placeholder="请选择排序方式" style={{ width: '100%' }} allowClear>
                <Option value="one_data">一天数据</Option>
                <Option value="seven_data">七天数据</Option>
              </Select>
            </FormItem>
          </Col>
          {inType && (
            <Col xl={6} sm={8} xs={12}>
              <FormItem label="类型" name="in_type">
                <Select placeholder="请选择类型" style={{ width: '100%' }} allowClear>
                  <Option value="ALL">ALL</Option>
                  <Option value="EC">EC</Option>
                </Select>
              </FormItem>
            </Col>
          )}
          <Col {...searchBtnLayout}>
            <FormItem style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit" loading={loading}>
                搜索
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default SearchBar;
