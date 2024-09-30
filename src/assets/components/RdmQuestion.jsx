import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

const RdmQuestion = () => {
  const [questions, setQuestions] = useState({});
  const [randomQuestion, setRandomQuestion] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("/questions.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // console.log("Fetched Questions:", data);
        setQuestions(data);
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  const getRandomQuestion = (category) => {
    const categoryQuestions = questions[category];
    if (categoryQuestions) {
      const randomIndex = Math.floor(Math.random() * categoryQuestions.length);
      setRandomQuestion(categoryQuestions[randomIndex]);
      setSelectedCategory(category);
      setShowModal(true);
    } else {
      console.error("Category not found!");
      setRandomQuestion("No questions available in this category.");
    }
  };

  const generateAnotherQuestion = () => {
    if (selectedCategory) {
      getRandomQuestion(selectedCategory);
    } else {
      console.log("No category selected to generate another question.");
      setRandomQuestion("Please select a category first.");
    }
  };

  const handleRdm = () => {
    const availableCategories = Object.keys(questions);
    if (availableCategories.length === 0) {
      setRandomQuestion("No categories available.");
      return;
    }
    const randomCategory =
      availableCategories[
        Math.floor(Math.random() * availableCategories.length)
      ];
    getRandomQuestion(randomCategory);
  };

  const handleClose = () => setShowModal(false);
  return (
    <Container
      fluid
      className="d-flex bg-white text-center vh-100 align-items-center text-dark"
    >
      <Container className="d-flex flex-column">
        <h4 className="fw-bold">ARE WE REALLY STRANGER</h4>
        <Container>
          <p>Categories</p>
          <Row xl={4} xs={2} className="justify-content-center">
            <Col>
              <Button
                variant="danger shadow w-100 fw-bold"
                onClick={() => getRandomQuestion("Perception")}
              >
                Perception
              </Button>
            </Col>
            <Col>
              <Button
                variant="danger shadow w-100 fw-bold"
                onClick={() => getRandomQuestion("Connection")}
              >
                Connection
              </Button>
            </Col>
          </Row>

          <Container>
            <Row className="m-3">
              <Col>
                <Button variant="danger shadow fw-bold" onClick={handleRdm}>
                  Random
                </Button>
              </Col>
            </Row>
          </Container>

          <Row xl={4} xs={2} className="justify-content-center">
            <Col>
              <Button
                variant="danger shadow w-100 fw-bold"
                onClick={() => getRandomQuestion("Reflection")}
              >
                Reflection
              </Button>
            </Col>
            <Col>
              <Button
                variant="danger shadow w-100 fw-bold"
                onClick={() => getRandomQuestion("Wildcards")}
              >
                Wildcards
              </Button>
            </Col>
          </Row>
        </Container>
        <Modal
          show={showModal}
          onHide={handleClose}
          centered
          className="custom-modal bg-white"
        >
          <Modal.Header className="border border-0">
            <Modal.Title>
              <Button variant="secondary" onClick={handleClose}>
                <i className="bi bi-arrow-left"></i>
              </Button>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="d-flex flex-column align-items-center bg-white">
            <Container>
              <div className="d-flex justify-content-center fw-bold">
                Random <p className="mx-2 text-primary">{selectedCategory} </p>{" "}
                question
              </div>
              <Row xs={1} className="justify-content-center">
                <Col className="p-0">
                  <Card
                    style={{ height: "13rem" }}
                    className="border border-bottom myShadow bg-info w-100"
                  >
                    <Card.Body className="d-flex align-items-center justify-content-center text-center">
                      <Card.Text className="capital text-primary fw-bold ">
                        {randomQuestion ||
                          "No question available yet. Please select a category."}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Container className="mt-5 text-center">
                <Button variant="primary " onClick={generateAnotherQuestion}>
                  <i className="bi bi-shuffle"></i>
                </Button>
              </Container>
            </Container>
          </Modal.Body>
        </Modal>
      </Container>
    </Container>
  );
};

export default RdmQuestion;
