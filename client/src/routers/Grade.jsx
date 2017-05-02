import React, { Component } from 'react';
import { Button, Table, Popconfirm, message } from 'antd';
import EditableCell from './../components/Grade/EditableCell';
import { getGrade } from './../models/grade';

class App extends Component {
  constructor(props) {
    super(props);
    this.message = {
      error: '获取成绩列表失败，请重试!',
    };
    this.columns = [{
      title: '学号',
      dataIndex: 'number',
      width: '25%',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'number', text),
    }, {
      title: '平均成绩',
      dataIndex: 'average_grade',
      width: '18%',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'average_grade', text),
    }, {
      title: '平均学分绩点',
      dataIndex: 'average_credit',
      width: '18%',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'average_credit', text),
    }, {
      title: '加权学分成绩',
      dataIndex: 'average_credit_grade',
      width: '18%',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'average_credit_grade', text),
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record, index) => {
        let editable = false;
        if (this.state.data.length > 0) {
          editable = this.state.data[index].number.editable;
        }
        return (
          <div className="editable-row-operations">
            {
              editable ?
                <span>
                  <Button type="primary" size="small" onClick={() => this.editDone(index, 'save')}>保存</Button>
                  <Popconfirm title="确认取消编辑?" onConfirm={() => this.editDone(index, 'cancel')}>
                    <a style={{ marginLeft: 15 }}>取消</a>
                  </Popconfirm>
                </span>
                :
                <span>
                  <Button type="primary" size="small" onClick={() => this.edit(index)}>编辑</Button>
                </span>
            }
          </div>
        );
      },
    }];
    this.state = {
      data: [],
    };
  }

  componentWillMount() {
    this.data();
  }

  async data() {
    try {
      const res = await getGrade();
      const data = res.list.map((item, index) => {
        const obj = {};
        Object.keys(item).forEach((key) => {
          obj[key] = {
            value: item[key].toString(),
            editable: false,
          };
        });
        obj.key = index;
        return obj;
      });
      // console.log('data: ', data);
      if (res.success) {
        return this.setState({
          data,
        });
      }
      return message.error(`${this.message.error}`, 10);
    } catch (e) {
      // console.log('e: ', e);
      return message.error(e.message || `${this.message.error}`, 10);
    }
  }

  handleChange(key, index, value) {
    const { data } = this.state;
    data[index][key].value = value;
    this.setState({ data });
  }
  edit(index) {
    const { data } = this.state;
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = true;
      }
    });
    this.setState({ data });
  }
  editDone(index, type) {
    const { data } = this.state;
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = false;
        data[index][item].status = type;
      }
    });
    this.setState({ data }, () => {
      Object.keys(data[index]).forEach((item) => {
        if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
          delete data[index][item].status;
        }
      });
    });
  }

  renderColumns(data, index, key, text) {
    const { editable, status } = data[index][key];
    if (typeof editable === 'undefined') {
      return text;
    }
    return (<EditableCell
      editable={editable}
      value={text}
      onChange={value => this.handleChange(key, index, value)}
      status={status}
    />);
  }


  render() {
    const { data } = this.state;
    const dataSource = data.map((item) => {
      const obj = {};
      Object.keys(item).forEach((key) => {
        obj[key] = key === 'key' ? item[key] : item[key].value;
      });
      return obj;
    });
    // console.log('dataSource: ', dataSource);
    const columns = this.columns;
    return (
      <Table
        bordered
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: 20,
        }}
      />
    );
  }
}


export default App;
