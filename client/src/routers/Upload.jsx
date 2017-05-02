import React, { Component } from 'react';
import {
  Upload,
  Button,
  Icon,
  Alert,
  message,
} from 'antd';
import { prefix } from './../config';

const UPLOAD_URL = `${prefix}/upload`;


class App extends Component {

  constructor(props) {
    super(props);
    this.message = {
      error: '上传失败，请重试!',
      success: '上传成功, 请到 "成绩查询" 菜单查看上传详情!',
    };
    this.state = {
      list: [],
    };
    this.onUploadChange = this.onUploadChange.bind(this);
  }


  onUploadChange(info) {
    // eslint-disable-next-line
    console.log('info: ', info);
    if (info.file.status === 'error') {
      return message.error(`${this.message.error} [${new Date().toLocaleString()}]`, 15);
    }
    if (info.file.status === 'done') {
      if (info.file.response.success) {
        return message.success(`${this.message.success} [${new Date().toLocaleString()}]}`, 15);
      }
      return message.error(`${this.message.error} [${new Date().toLocaleString()}]`, 15);
    }
    return true;
  }

  render() {
    return (
      <div>
        <Alert
          message="上传 Excel"
          description="上传 Excel 文件, 文件格式请参考示例文件"
          type="info"
        />
        <div style={{ width: 250 }}>
          <Upload
            action={UPLOAD_URL}
            onChange={this.onUploadChange}
            accept="application/vnd.ms-excel"
            onRemove={false}
          >
            <Button>
              <Icon type="upload" /> 上传 Excel
            </Button>
          </Upload>
        </div>
      </div>
    );
  }
}


export default App;
