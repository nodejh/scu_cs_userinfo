import React, { Component } from 'react';
import { Layout, Menu, Icon, message } from 'antd';
import {
  BrowserRouter,
  Route,
  Link,
} from 'react-router-dom';
import Home from './routers/Home';
import Grade from './routers/Grade';
import College from './routers/College';
import Questionnaire from './routers/Questionnaire';
import Upload from './routers/Upload';
import './App.css';

const { Header, Content, Footer, Sider } = Layout;


message.config({
  top: 75,
  duration: 3,
});


// eslint-disable-next-line
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout style={{ height: '100vh' }}>
          <Sider style={{ overflow: 'auto' }}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Link to="/" style={{ color: '#fff' }}>
                  <Icon type="home" />
                  <span className="nav-text"> 首页</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/grade" style={{ color: '#fff' }}>
                  <Icon type="user" />
                  <span className="nav-text">成绩管理</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to="/upload" style={{ color: '#fff' }}>
                  <Icon type="upload" />
                  <span className="nav-text">成绩上传</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/college" style={{ color: '#fff' }}>
                  <Icon type="idcard" />
                  <span className="nav-text">学院信息</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/questionnaire" style={{ color: '#fff' }}>
                  <Icon type="bar-chart" />
                  <span className="nav-text">问卷管理</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0, textAlign: 'center' }}>后台</Header>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
              <div style={{ padding: 24, background: '#fff', minHeight: 350 }}>
                <Route exact path="/" component={Home} />
                <Route exact path="/grade" component={Grade} />
                <Route exact path="/college" component={College} />
                <Route exact path="/questionnaire" component={Questionnaire} />
                <Route exact path="/upload" component={Upload} />
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              ©2016 Created
            </Footer>
          </Layout>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
