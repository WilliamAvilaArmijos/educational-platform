import { Breadcrumb, Layout as Layout, Menu, theme } from 'antd'
import Header from '../Header'
import './styles.scss'

function Layout({ children }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <div className='online-courses container'>
      <Header />
      {children}
    </div>
  )
}

export default Layout
