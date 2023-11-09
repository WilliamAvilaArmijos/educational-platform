import { AndroidOutlined, AppleOutlined } from '@ant-design/icons'
import { Steps, Tabs } from 'antd'

import React from 'react'
import VideoList from '../components/CoursePage/VideoList'
import FooterComponent from '../components/Footer'
import Navbar from '../components/Navbar'
import CommentList from './../components/CommentList/index'
import { Typography } from 'antd'
const { Paragraph } = Typography
const Comment = () => {
  return (
    <>
      {/* <Paragraph style={{ fontSize: 20, justifyContent: 'center', color: 'white' }}></Paragraph> */}
      <Paragraph style={{ fontSize: 18, justifyContent: 'center', color: 'white' }}>
        <ul>
          <li>Hacer estructuras de datos</li>
          <li>Crear Bucles</li>
          <li>Conocer herramientas para programar</li>
          <li>Aprender conceptos básicos de programación en React </li>
        </ul>
      </Paragraph>
    </>
  )
}

const VideoPage = () => {
  const tabs = [
    {
      label: 'Recursos 1',
      key: '1',
      icon: <AppleOutlined />,
      children: <Comment />,
    },
    {
      label: 'Recursos 2',
      key: '2',
      icon: <AndroidOutlined />,
      children: <Comment />,
    },
  ]
  return (
    <>
      <Navbar />
      <div className='video-container'>
        <div className='container-listvideo'>
          <h2 style={{ textAlign: 'center' }}>Introducción a la programación</h2>
          <VideoList
            wv='10vw'
            hv='10vh'
            videos={[
              {
                id: 'PBpl04hW-Ew',
                title: 'React Js',
                description: 'Ecommerce website',
                wasVisited: true,
              },
              {
                id: 'O1CLgdMF45A',
                title: 'React Js',
                description: 'Ecommerce website',
                wasVisited: true,
              },
              {
                id: 'c4gupcuViFQ',
                title: 'React Js',
                description: 'Ecommerce website',
                wasVisited: true,
              },
            ]}
          />
          <h2 style={{ textAlign: 'center' }}>Herramientas para programar</h2>
          <VideoList
            wv='10vw'
            hv='10vh'
            videos={[
              {
                id: 'PBpl04hW-Ew',
                title: 'React Js',
                description: 'Ecommerce website',
                wasVisited: true,
              },
              {
                id: 'O1CLgdMF45A',
                title: 'React Js',
                description: 'Ecommerce website',
                wasVisited: true,
              },
              {
                id: 'c4gupcuViFQ',
                title: 'React Js',
                description: 'Ecommerce website',
                wasVisited: true,
              },
              {
                id: 'd9QumoK2io4',
                title: 'React Js',
                description: 'Ecommerce website',
                wasVisited: false,
              },
            ]}
          />
        </div>
        <div className='video'>
          <iframe
            width={'100%'}
            height={'680'}
            src='https://www.youtube.com/embed/d9QumoK2io4'
            title='YouTube video player'
            frameborder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowfullscreen
          ></iframe>
          <div className='info-video'>
            <h1 style={{ color: 'white' }}>React Js</h1>
            <p style={{ color: 'white' }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
              of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
          <Tabs
            style={{
              color: 'white',
            }}
            defaultActiveKey='2'
            items={tabs.map((tab, i) => {
              const id = String(i + 1)
              return {
                label: (
                  <span>
                    {tab.icon}
                    {tab.label}
                  </span>
                ),
                key: id,
                children: <Comment />,
              }
            })}
          />
        </div>
      </div>
      <FooterComponent />
    </>
  )
}

export default VideoPage
