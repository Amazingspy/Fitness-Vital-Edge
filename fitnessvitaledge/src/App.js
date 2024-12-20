import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar';
import Topbar from './Components/Topbar/Topbar';

// Pages
import HomePage from './Pages/HomePage/HomePage';
import MealPlan from './Pages/MealPlanPage/MealPlanPage';
import Progress from './Pages/ProgressPage/ProgressPage';
import Workout from './Pages/WorkoutsPage/WorkoutsPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="main-content">
          <Topbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/meal-plan" element={<MealPlan />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/workout" element={<Workout />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
