// QuestionsPage.js
import React, { useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import image from '../styles/astronaut3.png'; // Ensure the image path is correct
import { ThemeContext } from '../Component/ThemeContext';

const McqQuiz = () => {
  const { topicId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showConfirmExit, setShowConfirmExit] = useState(false); // State for confirmation modal
  const [timeLeft, setTimeLeft] = useState(600);
  const timerRef = useRef(null);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/app/topics/${topicId}/questions/`)
      .then((response) => setQuestions(response.data))
      .catch((error) => console.error('Error fetching questions:', error));
  }, [topicId]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          handleSubmit(true);
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const handleAnswerSelect = (questionId, optionId) => {
    const updatedAnswers = answers.filter((ans) => ans.question_id !== questionId);
    setAnswers([...updatedAnswers, { question_id: questionId, selected_option_id: optionId }]);
  };

  const handleSubmit = (timeUp = false) => {
    axios
      .post('http://127.0.0.1:8000/app/check-answers/', { answers })
      .then((response) => {
        setResult({
          ...response.data,
          timeUp,
        });
        setShowModal(true);
      })
      .catch((error) => console.error('Error checking answers:', error));
  };

  const handleCloseResultModal = () => {
    setShowModal(false);
    navigate('/'); // Redirect to homepage
  };

  const handleCloseIntroModal = () => {
    setShowIntro(false);
    startTimer();
  };

  const handleConfirmExit = () => {
    setShowConfirmExit(false);
    navigate(-1); // Go back to the previous page
  };

  const handleCancelExit = () => {
    setShowConfirmExit(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      style={{
        backgroundColor: theme === 'light' ? '#ffffff' : '#121212',
        color: theme === 'light' ? '#000' : '#fff',
        minHeight: '100vh',
        position: 'relative', // Ensure relative positioning for the timer
      }}
    >
      <div className="container pt-5">
        {/* Introductory Modal */}
        <Modal show={showIntro} onHide={handleCloseIntroModal} backdrop="static" keyboard={false} centered>
          <Modal.Body className="d-flex" style={{ padding: '0' }}>
            {/* Image Side */}
            <div
              style={{
                flex: '1',
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '400px',
              }}
            ></div>
            {/* Text Side */}
            <div
              style={{
                flex: '1',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor: theme === 'light' ? '#f8f9fa' : '#343a40',
              }}
            >
              <h4 className="text-center mb-3">Welcome to the Test</h4>
              <p>
                You have 10 minutes to complete the test. Make sure to read each question carefully and select the best answer.
              </p>
              <Button variant="primary" className="mt-3" onClick={handleCloseIntroModal}>
                Start Test
              </Button>
            </div>
          </Modal.Body>
        </Modal>

        {/* Confirmation Modal for Exit */}
        <Modal show={showConfirmExit} onHide={handleCancelExit} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Exit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to leave the test page? Your progress may be lost.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancelExit}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirmExit}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Timer */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            fontSize: '24px', // Adjusted font size for the timer
            fontWeight: 'bold',
            color: theme === 'light' ? '#007bff' : '#ffcc00',
            padding: '10px 20px',
            borderRadius: '8px',
            border: `2px solid ${theme === 'light' ? '#007bff' : '#ffcc00'}`,
            backgroundColor: theme === 'light' ? '#e7f0ff' : '#2d2d2d',
            textAlign: 'center',
            zIndex: 1000, // Ensure it is above other content
          }}
        >
          {formatTime(timeLeft)}
        </div>

        <h2 className="mb-4">Questions</h2>

        {questions.map((question, index) => (
          <div key={question.id} className="mb-3">
            <h5>
              {index + 1}. {question.text}
            </h5>
            <div className="d-flex flex-wrap">
              {question.options.map((option) => (
                <div key={option.id} className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`question-${question.id}`}
                    id={`option-${option.id}`}
                    onChange={() => handleAnswerSelect(question.id, option.id)}
                    checked={answers.some(
                      (ans) => ans.question_id === question.id && ans.selected_option_id === option.id
                    )}
                  />
                  <label className="form-check-label" htmlFor={`option-${option.id}`}>
                    {option.text}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
        <Button variant="success" className="mt-3" onClick={() => handleSubmit(false)}>
          Submit Answers
        </Button>

        {/* Result Modal */}
        <Modal show={showModal} onHide={handleCloseResultModal}>
          <Modal.Header closeButton>
            <Modal.Title>Result</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {result?.timeUp && <p className="text-danger">Time's up! Here are your results:</p>}
            <p>Total Questions: {result?.total_questions}</p>
            <p>Correct Answers: {result?.correct_answers}</p>
            <p>Incorrect Answers: {result?.incorrect_answers}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseResultModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default McqQuiz;