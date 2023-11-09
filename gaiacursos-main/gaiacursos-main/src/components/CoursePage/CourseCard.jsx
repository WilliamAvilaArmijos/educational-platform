import React from 'react'
import { Row, Col, Avatar, Typography, Rate } from 'antd'
import { StarTwoTone } from '@ant-design/icons'

const { Text, Title, Paragraph } = Typography

function CourseCard({ course }) {
  return (
    <Row justify='center' align='top'>
      <Col span={12} flex={2}>
        <Title level={2} style={{ color: 'white' }}>
          {course.title}
        </Title>
        <Paragraph style={{ fontSize: 20, justifyContent: 'center', color: 'white' }}>
          <StarTwoTone twoToneColor='#FFFF00' />
          <StarTwoTone twoToneColor='#FFFF00' />
          <StarTwoTone twoToneColor='#FFFF00' />
          <StarTwoTone twoToneColor='#FFFF00' />
          <StarTwoTone twoToneColor='#FFFF00' /> <strong>100 Opiniones</strong>
        </Paragraph>
        <Paragraph style={{ fontSize: 20, color: 'white' }}>
          <strong>Instructor:</strong> {course.instructor.name}
        </Paragraph>
        <Paragraph style={{ fontSize: 20, justifyContent: 'center', color: 'white' }}>{course.description}</Paragraph>
        <Paragraph style={{ fontSize: 18, justifyContent: 'center', color: 'white' }}>
          <ul>
            <li>Hacer estructuras de datos</li>
            <li>Crear Bucles</li>
            <li>Conocer herramientas para programar</li>
            <li>Aprender conceptos básicos de programación en React </li>
          </ul>
        </Paragraph>
      </Col>
      <Col span={12} flex={3}>
        <Avatar shape='square' size={400} src={course.instructor.avatar} />
      </Col>
      <Col span={12}></Col>
    </Row>
  )
}

export default CourseCard
