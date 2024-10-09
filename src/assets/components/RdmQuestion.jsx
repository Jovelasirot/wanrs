import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import bgOne from "../paper/paper.svg";
import bgTwo from "../paper/paper2.svg";
import bgThree from "../paper/paper3.svg";
import bgFour from "../paper/paper4.svg";

const RdmQuestion = () => {
  const [questions, setQuestions] = useState({});
  const [randomQuestion, setRandomQuestion] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [usedQuestions, setUsedQuestions] = useState(new Set());
  const [showModalF, setShowModalF] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [background, setBackgroundImage] = useState("");

  useEffect(() => {
    fetch("/questions.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setQuestions(data);
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  const getRandomQuestion = (category) => {
    const categoryQuestions = questions[category];

    if (categoryQuestions) {
      const availableQuestions = categoryQuestions.filter(
        (question) => !usedQuestions.has(question)
      );
      if (availableQuestions.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * availableQuestions.length
        );
        const selectedQuestion = availableQuestions[randomIndex];

        setRandomQuestion(selectedQuestion);
        setSelectedCategory(category);
        setShowModal(true);
        setRandomBackground();
        setUsedQuestions((prev) => new Set(prev).add(selectedQuestion));
      } else {
        setRandomQuestion("No more questions available in this category.");
      }
    } else {
      console.error("Category not found!");
      setRandomQuestion("No questions available in this category.");
    }
  };

  const generateAnotherQuestion = () => {
    if (selectedCategory) {
      getRandomQuestion(selectedCategory);
      setRandomBackground();
    } else {
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
    if (randomCategory === "FHTG") {
      setShowModalF(true);
    } else {
      getRandomQuestion(randomCategory);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setShowModalF(false);
    setUsedQuestions(new Set());
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const paperImages = [bgOne, bgTwo, bgThree, bgFour];

  const setRandomBackground = () => {
    const randomIndex = Math.floor(Math.random() * paperImages.length);
    setBackgroundImage(paperImages[randomIndex]);
  };

  return (
    <Container
      fluid
      className={`d-flex ${
        darkMode ? "bg-dark text-light" : "bg-white text-dark"
      } text-center vh-100 align-items-center`}
    >
      <Container className="d-flex flex-column">
        <h4 className="fw-bold">ARE WE REALLY STRANGERS</h4>
        <Container>
          <p>Categories</p>
          <Row xl={4} xs={2} className="justify-content-center g-3">
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
            <Col>
              <Button
                variant="warning w-100 shadow fw-bold"
                onClick={() => setShowModalF(true)}
              >
                FHTG
              </Button>
            </Col>
            <Col>
              <Button variant="danger w-100 shadow fw-bold" onClick={handleRdm}>
                Random
              </Button>
            </Col>
          </Row>
        </Container>

        <Row className="mt-3">
          <Col>
            <Button variant="secondary" onClick={toggleDarkMode}>
              {darkMode ? (
                <i className="bi bi-brightness-high"></i>
              ) : (
                <i className="bi bi-moon"></i>
              )}
            </Button>
          </Col>
        </Row>

        <Modal
          show={showModal}
          onHide={handleClose}
          centered
          className={`custom-modal ${
            darkMode ? "bg-dark text-light" : "bg-white text-dark"
          }`}
        >
          <Modal.Title className={darkMode ? "bg-dark" : "bg-white "}>
            <Button variant="secondary " onClick={handleClose}>
              <i className="bi bi-arrow-left "></i>
            </Button>
          </Modal.Title>

          <Modal.Body
            className={`d-flex flex-column align-items-center ${
              darkMode ? "bg-dark" : "bg-white"
            }`}
          >
            <Container>
              <div className="d-flex justify-content-center fw-bold">
                Random <p className="mx-2 text-primary">{selectedCategory} </p>
                question
              </div>
              <Row xs={1} className="justify-content-center">
                <Col className="p-0">
                  <Card
                    style={{
                      height: "13rem",
                      backgroundImage: `url(${background})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    className="border border-bottom myShadow w-100 bg-success"
                  >
                    <Card.Body className="d-flex align-items-center justify-content-center text-center ">
                      <Card.Text className="capital text-primary fw-bold ">
                        {randomQuestion.split("\n").map((line, index) => (
                          <React.Fragment key={index}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}
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

        <Modal
          show={showModalF}
          onHide={handleClose}
          centered
          className={`custom-modal ${
            darkMode ? "bg-dark text-light" : "bg-white text-dark"
          }`}
        >
          <Modal.Title className={darkMode ? "bg-dark" : "bg-white "}>
            <Button variant="secondary" onClick={handleClose}>
              <i className="bi bi-arrow-left"></i>
            </Button>
          </Modal.Title>

          <Modal.Body
            className={`d-flex flex-column align-items-center ${
              darkMode ? "bg-dark" : "bg-white"
            }`}
          >
            <Container>
              <Row xs={1} className="justify-content-center">
                <Col className="p-0">
                  <Card
                    style={{
                      height: "13rem",
                    }}
                    className="border border-bottom myShadow w-100 bg-success"
                  >
                    <Card.Body className="d-flex align-items-center justify-content-center text-center">
                      <Card.Text className="capital text-primary fw-bold ">
                        Questions between two people, the others choose the
                        pair.
                        <br></br>
                        (Five questions each)
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Container className="mt-5 text-center">
                <Button
                  variant="primary fw-bold"
                  onClick={() => getRandomQuestion("FHTG")}
                >
                  CONTINUE
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
