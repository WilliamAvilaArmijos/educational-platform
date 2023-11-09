import { Typography, Row, Col, List, Divider, Space } from "antd";
const { Title, Text, Paragraph } = Typography;
import { ClockCircleFilled, CheckCircleFilled } from "@ant-design/icons";
import ListVideo from "./ListVideo";

function CourseOutline({ courseInfo, videos }) {
  return (
    <>
      <Row justify="center" align="top">
        <Col flex="300px"></Col>
        <Col flex="auto">
          <Title level={2} style={{ color: "white" }}>
            Temario y recursos del {courseInfo.title}
          </Title>
        </Col>
      </Row>
      <Row justify="center" align="top">
        <Col flex="300px">
          <Title level={5} style={{ color: "white" }}>
            Para este curso vas a necesitar:
          </Title>
          <Space direction="horizontal" style={{ color: "white" }}>
            <Title level={5} style={{ color: "white" }}>
              <ClockCircleFilled />{" "}
              <strong>{courseInfo.horasContenido} </strong> horas de contenido
              <br></br>
              <CheckCircleFilled />{" "}
              <strong>{courseInfo.horasPracticas} </strong> horas de práctica
            </Title>
          </Space>

          <Title level={4} style={{ color: "white" }}>
            Software para este Curso:
          </Title>
          <Space direction="horizontal" style={{ color: "white" }}>
            <Title level={5} style={{ color: "white" }}>
              <ul>
                <li>Visual Studio Code</li>
                <li>Node.js</li>
                <li>Git</li>
              </ul>
            </Title>
          </Space>
        </Col>
        <Col flex="auto">
          <Title level={3} style={{ color: "white" }}>
            Introducción a la programación:
          </Title>
          <ListVideo videos={videos} />
        </Col>
      </Row>
      <Row justify="center" align="top">
        <Col flex="300px"></Col>
        <Col flex="auto">
          <Title level={3} style={{ color: "white" }}>
            Herramientas para programar:
          </Title>
          <ListVideo videos={videos} />
        </Col>
      </Row>
    </>
  );
}

export default CourseOutline;
