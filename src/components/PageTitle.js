import { Row, Col, Container } from "react-bootstrap";
const PageTitle = ({ title, margin = 5 }) => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <div
            style={{
              fontSize: "1.7rem",
              color: "grey",
              fontWeight: "bold",
              marginTop: "3rem",
              marginBottom: `${margin}rem`,
            }}
          >
            {title}
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default PageTitle;
