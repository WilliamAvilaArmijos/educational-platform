import React, { useState } from 'react'
import CourseCard from '../CourseCard'

import './styles.scss'

const CourseContainer = ({ gradeRanges, coursesData }) => {
  const [grade, setGrade] = useState(gradeRanges[1])

  return (
    <div className='course-container'>
      <div className='buttons'>
        {/* {gradeRanges.map(type => (
          <button className={type === grade && 'active'} onClick={() => setGrade(type)}>
            {`Grade ${type}`}
          </button>
        ))} */}
        <button className='active'>{`Para ti`}</button>
        <button className=''>{`Populares `}</button>
        <button className=''>{`Nuevos `}</button>
      </div>
      <div className='header'>
        <p>
          Mostrando cursos{' '}
          <b>
            {`recomendados`} <b>{'PARA TI'}</b>
          </b>
        </p>
        {/* <select>
          <option>All Courses</option>
        </select> */}
      </div>
      <div className='course-cards'>
        {coursesData
          .filter(course => course.gradeRange === grade)
          .map(course => (
            <CourseCard
              title={course.title}
              subTitle={course.subTitle}
              description={course.description}
              gradeRange={course.gradeRange}
              happyStudents={course.happyStudents}
              hours={course.hours}
              sessions={course.sessions}
              isWeekday={course.isWeekday}
              isWeekend={course.isWeekend}
              batchInformation={course.batchInformation}
              price={course.price}
              discount={course.discount}
              learnMoreLink={course.learnMoreLink}
            />
          ))}
      </div>
    </div>
  )
}

export default CourseContainer
