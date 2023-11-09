import React from 'react'
import Footer from 'rc-footer'
import 'rc-footer/assets/index.css' // import 'rc-footer/asssets/index.less';
import favicon from '../assets/favicon.png'
const FooterComponent = () => {
  return (
    <Footer
      backgroundColor='#001529'
      columns={[
        {
          icon: <img src={favicon} />,
          title: 'Ayuda',
          url: '#',
          description: 'Ayuda',
          openExternal: true,
        },
        {
          icon: <img src={favicon} />,
          title: 'Cursos Recientes',
          url: '#',
          description: 'Cursos Recientes',
          openExternal: true,
        },
        {
          icon: <img src={favicon} />,
          title: 'Contacto',
          url: '#',
          description: 'Contacto',
          openExternal: true,
        },
      ]}
      bottom='Copyright ©2023 All rights reserved'
    />
  )
}

export default FooterComponent
