import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './Components/Sidebar/Sidebar';
import Topbar from './Components/Topbar/Topbar';

// Pages
import HomePage from './Pages/HomePage/HomePage';
import MealPlan from './Pages/MealPlanPage/MealPlanPage';
import Progress from './Pages/ProgressPage/ProgressPage';
import Workout from './Pages/WorkoutsPage/WorkoutsPage';
import CalendarPage from './Pages/Calendar/Calendar'

function App() {
  return (
    <Router>
      <div className="App">
        <Container fluid className="h-100">
          <Row className="h-100">
            <Col md={3} className="sidebar-container">
              <Sidebar />
            </Col>

            <Col className="main-content">
              <Topbar />
              <div className="page-content">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/mealplan" element={<MealPlan />} />
                  <Route path="/mealplan/calendar" element={<CalendarPage />} />
                  <Route path="/progress" element={<Progress />} />
                  <Route path="/workout" element={<Workout />} />
                  <Route path="*" element={<h1>404 - Page Not Found</h1>} />
                </Routes>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
}

export default App;
