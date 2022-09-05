import React from 'react'
import {useNavigate} from 'react-router-dom'
import { Menu } from 'antd';
import './MenuComponents.scss';

function MenuComponent(props) {
  const navigate = useNavigate();
  const items = [
    {label: 'Coffee', key: '/'}
  ]

  const handleMenuClick = (item) => {
    console.log('click', item)
    navigate(item.key)
  }

  return (
    <Menu
      defaultSelectedKeys={['/']}
      mode="inline"
      theme="light"
      items={items}
      onClick={handleMenuClick}
      className='menu'
    />
  )
}

export default MenuComponent
