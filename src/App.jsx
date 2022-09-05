import {useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import {Layout} from 'antd';
import React from 'react';

import 'antd/dist/antd.css';
import './App.css';

import Home from './pages/Home/Home'
import MenuComponent from './components/NenuComponets/MenuComponents';



const { Sider } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
      >
   
      <MenuComponent />
      </Sider>
      
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

    </Layout>

  );
}

export default App;