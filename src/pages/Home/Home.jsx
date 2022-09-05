import React, {useState, useEffect} from 'react';
import 'antd/dist/antd.css'
import { Table, Modal, Button } from 'antd';

import {SearchOutlined} from '@ant-design/icons'
import { Spin } from 'antd';
import { Input } from 'antd';
import axios from 'axios';

import './Home.scss';

export const BASE_URL = 'https://api.sampleapis.com';

function Home() {
  const [loading, setLoading] = useState(false)
  const [activeItem, setActiveItem] = useState(null);
  const [dataSource, setDataSource] = useState([])
  const [data, setData] = useState([])


  useEffect(() => {
    fetchCoffee();
  }, [])

  const fetchCoffee = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${BASE_URL}/coffee/hot`);
      setDataSource(response.data)
      setData(response.data)
      setLoading(false)
    } catch (error) {
      console.error(error);
      setLoading(false)
    }
  }
  const filterData = (dataSource) =>
    dataSource.map((item) => ({
      key: item,
      value: item,
      text: item
  }));

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Coffee',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : (a.title === b.title ? 0 : -1)),
    },
    {
      title: 'Ingredients',
      dataIndex: 'ingredients',
      key: 'ingredients',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      sorter: (a, b) => {
        return a.description.length - b.description.length
      },

      render: (key, item) => {  
        const result = Array.isArray(item.description) 
          ? item.description.join(', ') 
          : item.description;
        return <div>{result}</div>
      },
      filterDropdown:({setSelectedKeys, selectedKeys, confirm, clearFilters}) => {
        return(
        <>  
        <Input 
            autoFocus 
            placeholder='Search' 
            value={selectedKeys[0]}
            onChange={(e) =>{
                setSelectedKeys(e.target.value?[e.target.value]:[])
                confirm({closeDropdown:false})
            }}
            onPressEnter={() => {
                confirm()
            }}
            onBlur={() => {
                confirm()
            }}
        ></Input>
        <Button
            onClick={()=>{
                confirm();
            }}
            type='primary'
            > 
            Search 
        </Button>

        <Button
            onClick={()=>{
                clearFilters();
            }}
            type='danger'
            className='reset'
            > 
            Reset 
        </Button>
        </> 
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },

      onFilter: (value, record) => {
        return record.description.toLowerCase().includes(value.toLowerCase())
      },
    },
    {
      title: 'Coffee`s',
      dataIndex: 'image',
      key: 'image',

      render: (key, item) => {  
        const result = Array.isArray(item.image) 
          ? item.image.join(', ') 
          : item.image;
        return  <img src={result} width="50" height="50"/>

      }
    }
    
  ];
  <Spin />

  return (
    <div className="home-container">
      <div className='home'>
        <Table 
          dataSource={data} 
          columns={columns} 
          loading={loading}
          size={'small'}
          width="100%"
          className="table"
          onRow={(record, rowIndex) => {
            return {
              onClick: () => setActiveItem(record)
            }
          }}
        />
        
        <Modal 
          title={activeItem?.title} 
          visible={!!activeItem}
          footer={null}
          onCancel={() => setActiveItem(null)}
        >
          {activeItem && <>
            <p>Id: <b>{activeItem.id}</b></p>
            <p><b><img src={activeItem.image} width="150" height="150"/></b></p>
            <p>Ingredients: <b>{activeItem.ingredients}</b></p>
            <p>Description: <b>{activeItem.description}</b></p>
          </>}
        </Modal>
      </div>
    </div>
  )
}

export default Home
