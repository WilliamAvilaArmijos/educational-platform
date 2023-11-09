import { Image } from 'antd'
import React from 'react'
import logo from '../assets/logo.png'
import CourseContainer from '../components/CourseContainer'
import FooterComponent from '../components/Footer'

import Navbar from '../components/Navbar'
import './styles.scss'
const HomePage = () => {
  const COURSE_DATA = [
    {
      title: 'AI for beginners:',
      subTitle: 'Introduction to AI agents',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem consequuntur voluptate maiores aliquam quam dolore quis fuga porro corporis eos obcaecati assumenda perspiciatis molestiae culpa ex ut, esse perferendis! Veniam?',
      gradeRange: '5-8',
      happyStudents: '5600',
      hours: '12',
      sessions: '6',
      isWeekend: false,
      isWeekday: true,
      price: '10000',
      discount: '50',
      learnMoreLink: 'http://127.0.0.1:5173/course',
      videos: [
        {
          title: 'Video 1',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem consequuntur voluptate maiores aliquam quam dolore quis fuga porro corporis eos obcaecati assumenda perspiciatis molestiae culpa ex ut, esse perferendis! Veniam?',
          videoLink: 'https://www.youtube.com/watch?v=2g811Eo7K8U',
          seccion: 'Introducción',
        },
        {
          title: 'Video 2',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem consequuntur voluptate maiores aliquam quam dolore quis fuga porro corporis eos obcaecati assumenda perspiciatis molestiae culpa ex ut, esse perferendis! Veniam?',
          videoLink: 'https://www.youtube.com/watch?v=2g811Eo7K8U',
          seccion: 'Introducción',
        },
      ],
    },
    {
      title: 'AI & Machine Learning:',
      subTitle: 'Code intelligent Bots',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem consequuntur voluptate maiores aliquam quam dolore quis fuga porro corporis eos obcaecati assumenda perspiciatis molestiae culpa ex ut, esse perferendis! Veniam?',
      gradeRange: '5-8',
      happyStudents: '56000',
      hours: '12',
      sessions: '6',
      isWeekend: true,
      isWeekday: false,
      price: '12000',
      discount: '16',
      learnMoreLink: 'http://127.0.0.1:5173/course',
    },
    {
      title: 'AI & Machine Learning:',
      subTitle: 'Code intelligent Bots',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem consequuntur voluptate maiores aliquam quam dolore quis fuga porro corporis eos obcaecati assumenda perspiciatis molestiae culpa ex ut, esse perferendis! Veniam?',

      gradeRange: '5-8',
      happyStudents: '5600',
      hours: '12',
      sessions: '6',
      isWeekend: true,
      isWeekday: true,
      price: '16000',
      discount: '16',
      learnMoreLink: 'http://127.0.0.1:5173/course',
    },
    {
      title: 'AI & Machine Learning:',
      subTitle: 'Code intelligent Bots',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem consequuntur voluptate maiores aliquam quam dolore quis fuga porro corporis eos obcaecati assumenda perspiciatis molestiae culpa ex ut, esse perferendis! Veniam?',

      gradeRange: '5-8',
      happyStudents: '5600',
      hours: '12',
      sessions: '6',
      isWeekend: true,
      isWeekday: true,
      price: '12000',
      discount: '16',
      learnMoreLink: 'http://127.0.0.1:5173/course',
    },
    {
      title: 'AI & Machine Learning:',
      subTitle: 'Code intelligent Bots',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem consequuntur voluptate maiores aliquam quam dolore quis fuga porro corporis eos obcaecati assumenda perspiciatis molestiae culpa ex ut, esse perferendis! Veniam?',

      gradeRange: '5-8',
      happyStudents: '56000',
      hours: '12',
      sessions: '6',
      isWeekend: true,
      isWeekday: true,
      price: '12000',
      discount: '16',
      learnMoreLink: 'http://127.0.0.1:5173/course',
    },
    {
      title: 'Introduction to Data Science',
      subTitle: 'Become a data scientist',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem consequuntur voluptate maiores aliquam quam dolore quis fuga porro corporis eos obcaecati assumenda perspiciatis molestiae culpa ex ut, esse perferendis! Veniam?',

      gradeRange: '9-12',
      happyStudents: '56000',
      hours: '12',
      sessions: '6',
      isWeekend: true,
      isWeekday: true,
      price: '12000',
      discount: '16',
      learnMoreLink: 'http://127.0.0.1:5173/course',
    },
    {
      title: 'AI & Machine Learning:',
      subTitle: 'Code intelligent Bots',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem consequuntur voluptate maiores aliquam quam dolore quis fuga porro corporis eos obcaecati assumenda perspiciatis molestiae culpa ex ut, esse perferendis! Veniam?',

      gradeRange: '9-12',
      happyStudents: '56000',
      hours: '12',
      sessions: '6',
      isWeekend: true,
      isWeekday: true,
      price: '12000',
      discount: '16',
      learnMoreLink: 'http://127.0.0.1:5173/course',
    },
    {
      title: 'AI & Machine Learning:',
      subTitle: 'Code intelligent Bots',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem consequuntur voluptate maiores aliquam quam dolore quis fuga porro corporis eos obcaecati assumenda perspiciatis molestiae culpa ex ut, esse perferendis! Veniam?',

      gradeRange: '9-12',
      happyStudents: '56000',
      hours: '12',
      sessions: '6',
      isWeekend: true,
      isWeekday: true,
      price: '12000',
      discount: '16',
      learnMoreLink: 'http://127.0.0.1:5173/course',
    },
    {
      title: 'AI & Machine Learning:',
      subTitle: 'Code intelligent Bots',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem consequuntur voluptate maiores aliquam quam dolore quis fuga porro corporis eos obcaecati assumenda perspiciatis molestiae culpa ex ut, esse perferendis! Veniam?',

      gradeRange: '9-12',
      happyStudents: '56000',
      hours: '12',
      sessions: '6',
      isWeekend: true,
      isWeekday: true,
      price: '12000',
      discount: '16',
      learnMoreLink: 'http://127.0.0.1:5173/course',
    },
    {
      title: 'AI & Machine Learning:',
      subTitle: 'Code intelligent Bots',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem consequuntur voluptate maiores aliquam quam dolore quis fuga porro corporis eos obcaecati assumenda perspiciatis molestiae culpa ex ut, esse perferendis! Veniam?',

      gradeRange: '5-8',
      happyStudents: '56000',
      hours: '12',
      sessions: '6',
      isWeekend: true,
      isWeekday: true,
      price: '12000',
      discount: '16',
      learnMoreLink: 'http://127.0.0.1:5173/course',
    },
    {
      title: 'Introduction to web development',
      subTitle: 'Learn to make websites',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem consequuntur voluptate maiores aliquam quam dolore quis fuga porro corporis eos obcaecati assumenda perspiciatis molestiae culpa ex ut, esse perferendis! Veniam?',

      gradeRange: '1-4',
      happyStudents: '56000',
      hours: '12',
      sessions: '6',
      isWeekend: true,
      isWeekday: true,
      price: '12000',
      discount: '16',
      learnMoreLink: 'http://127.0.0.1:5173/course',
    },
    {
      title: 'React Js',
      subTitle: 'Ecommerce website',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem consequuntur voluptate maiores aliquam quam dolore quis fuga porro corporis eos obcaecati assumenda perspiciatis molestiae culpa ex ut, esse perferendis! Veniam?',

      gradeRange: '1-4',
      happyStudents: '56000',
      hours: '12',
      sessions: '6',
      isWeekend: true,
      isWeekday: true,
      price: '12000',
      discount: '16',
      learnMoreLink: 'http://127.0.0.1:5173/course',
    },
    {
      title: 'HTML',
      subTitle: 'Emailer template',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem consequuntur voluptate maiores aliquam quam dolore quis fuga porro corporis eos obcaecati assumenda perspiciatis molestiae culpa ex ut, esse perferendis! Veniam?',

      gradeRange: '1-4',
      happyStudents: '56000',
      hours: '12',
      sessions: '6',
      isWeekend: true,
      isWeekday: true,
      price: '12000',
      discount: '16',
      learnMoreLink: 'http://127.0.0.1:5173/course',
    },
    {
      title: 'AI & Machine Learning:',
      subTitle: 'Code intelligent Bots',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem consequuntur voluptate maiores aliquam quam dolore quis fuga porro corporis eos obcaecati assumenda perspiciatis molestiae culpa ex ut, esse perferendis! Veniam?',

      gradeRange: '1-4',
      happyStudents: '56000',
      hours: '12',
      sessions: '6',
      isWeekend: true,
      isWeekday: true,
      price: '12000',
      discount: '16',
      learnMoreLink: '/course',
    },
  ]
  return (
    <>
      <Navbar />
      <div className='online-courses container'>
        <Image
          src={logo}
          width={300}
          style={{ marginLeft: '150%', marginTop: '20%', marginBottom: '20%' }}
          preview={false}
        />
        <div className='banner-cards'></div>

        <CourseContainer gradeRanges={['', '5-8', '9-12']} coursesData={COURSE_DATA} />
      </div>
      <FooterComponent />
    </>
  )
}

export default HomePage
