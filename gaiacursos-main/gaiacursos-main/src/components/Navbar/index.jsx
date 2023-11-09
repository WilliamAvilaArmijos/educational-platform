import React, { useState } from 'react'

import './styles.scss'
import { NavLink, useNavigate } from 'react-router-dom'
import profile from '../../assets/profile.jpg'
import favicon from '../../assets/favicon.png'

import { CaretDownOutlined, UserOutlined } from '@ant-design/icons'
import { Dropdown } from 'antd'
const Navbar = () => {
  const navigate = useNavigate()
  const [isShowMobileNav, setIsShowMobileNav] = useState(false)
  const handleButtonClick = e => {
    message.info('Click on left button.')
    console.log('click left button', e)
  }
  const handleMenuClick = e => {
    navigate('/profile')
  }
  const items = [
    {
      label: 'Mi Perfil',
      key: '1',
      icon: <UserOutlined />,
    },
  ]
  const menuProps = {
    items,
    onClick: handleMenuClick,
  }
  return (
    <nav className='container nav'>
      <div className={isShowMobileNav ? 'nav-items-mobile' : 'nav-items'}>
        <a href='/home'>
          <img src={favicon} alt='gaia academic' width={60} />
        </a>

        <div>
          <button onClick={() => navigate('/home')}>
            <span style={{ padding: 10, fontSize: 12 }}>Cursos</span>
          </button>
          <img
            alt=''
            src={profile}
            style={{
              width: 40,
              borderRadius: '50%',
              backgroundColor: 'transparent',
              padding: 10,
            }}
          />

          <Dropdown.Button menu={menuProps} onClick={handleButtonClick} icon={<CaretDownOutlined />}>
            <span>Hola Juan</span>
          </Dropdown.Button>

          <button onClick={() => navigate('/')}>Cerrar sesión</button>
        </div>
      </div>
      <button className='mobile-nav-button' onClick={() => setIsShowMobileNav(!isShowMobileNav)}>
        {isShowMobileNav ? '🞩' : '☰'}
      </button>
    </nav>
  )
}

export default Navbar
