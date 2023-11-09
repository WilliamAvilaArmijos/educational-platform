import React from "react";
import CourseCard from "../components/CoursePage/CourseCard";
import CourseOutline from "../components/CoursePage/CourseOutline";
import FooterComponent from "../components/Footer";
import Navbar from "../components/Navbar";

const courses = [
  {
    title: "Curso de React",
    description:
      "Aprende a crear aplicaciones con React desde cero en 6 meses con el mejor instructor de la industria de la tecnología en español",
    instructor: {
      name: "Juan Pérez",
      avatar:
        "https://yt3.googleusercontent.com/ytc/AL5GRJVxK1_cenEzPSlLfI3qa2SjNoVYV9kBfUab0zuDNg=s900-c-k-c0x00ffffff-no-rj",
    },
  },
];
const coursesInfo = [
  {
    title: "Curso de React",
    horasContenido: 30,
    horasPracticas: 20,
    description:
      "Aprende a crear aplicaciones con React desde cero en 6 meses con el mejor instructor de la industria de la tecnología en español",
    instructor: {
      name: "Juan Pérez",
      avatar:
        "https://img.freepik.com/foto-gratis/profesor-mayor-sexo-masculino-que-explica-que-escribe-pizarra-verde_23-2148200956.jpg",
    },
  },
];

const videos = [
  {
    title: "Introducción al curso",
    description: "En este video se presenta el objetivo del curso",
    id: "nN0DrXR893M",
    duracion: "5:00",
  },
  {
    title: "Configuración del entorno de desarrollo",
    description:
      "En este video se explica cómo configurar el entorno de desarrollo",
    id: "1nh2XVXy3L8",
    duracion: "2:00",
  },
];
const CoursePage = () => {
  return (
    <>
      <Navbar />
      <div className="online-courses container">
        <div style={{ marginTop: "10%" }}>
          {courses.map((course) => (
            <CourseCard key={course.title} course={course} />
          ))}
        </div>
        <div style={{ marginTop: "15%" }}>
          {coursesInfo.map((courseInfo) => (
            <CourseOutline
              key={courseInfo.title}
              courseInfo={courseInfo}
              videos={videos}
            />
          ))}
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default CoursePage;
