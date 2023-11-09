import React from 'react'

import TimerImage from '../../static/timer.svg'
import GrowthImage from '../../static/growth.svg'
import CommunityImage from '../../static/community.svg'
import RupeesImage from '../../static/rupees.svg'
import OfferImage from '../../static/offer.svg'

import './styles.scss'
import { Link } from 'react-router-dom'

const CourseCard = ({
  title,
  subTitle,
  description,
  gradeRange,
  happyStudents,
  hours,
  sessions,
  discount,
  learnMoreLink,
}) => (
  <div className='course-card'>
    <div className='card-image' />
    <div className='card-body'>
      <div className='title'>
        <h6>{title}</h6>
        <h6>{subTitle}</h6>
      </div>

      <div className='sub-heading'>{description}</div>

      <div className='details'>
        <div className='detail'>
          <img alt='' src={GrowthImage} />
          <p>
            <b>{parseFloat(happyStudents / 1000)}k</b> Estudiantes inscritos
          </p>
        </div>
        <div className='detail'>
          <img alt='' src={TimerImage} />
          <p>
            <b>{hours} Horas</b> en <span>{sessions}</span> sesiones
          </p>
        </div>
      </div>

      <div className='price-offer'>
        {discount && parseInt(discount) && (
          <div className='offer'>
            {/* <img alt='' src={OfferImage} /> */}
            {`${discount}% avanzado`}
          </div>
        )}
      </div>

      <div className='link'>
        <Link  to={learnMoreLink}>
          INGRESAR AL CURSO
        </Link>
      </div>
    </div>
  </div>
)

export default CourseCard
