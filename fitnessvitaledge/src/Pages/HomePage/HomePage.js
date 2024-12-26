import React from 'react';
import './HomePage.css';

function HomePage() {
  return (
    <div className="dashboard">
      <div className="dashboard-grid">
        <div className="stats-cards1">
          <h6>Weight</h6>
          <p>Details about weight metrics</p>
        </div>
        <div className="stats-cards2">
          <h6>Calories</h6>
          <p>Details about calorie metrics</p>
        </div>
        <div className="stats-cards3">
          <h6>Sleep</h6>
          <p>Details about sleep metrics</p>
        </div>
        <div className="stats-cards4">
          <h6>Water</h6>
          <p>Details about water intake</p>
        </div>
        <div className="schedule">
        <h6>Schedule</h6>
        <p>Upcoming events or workout plans</p>
      </div>
      <div className="activity">
        <h6>Workout</h6>
        <p>Details about workout activities</p>
        <h6>Calories</h6>
        <p>Details about calorie burn</p>
        <h6>Steps</h6>
        <p>Details about steps taken</p>
      </div>
      <div className="progress1">
        <h6>Progress</h6>
        <p>Overall fitness progress summary</p>
      </div>
      <div className="progress2">
        <h6>Progress</h6>
        <p>Overall fitness progress summary</p>
      </div>
      </div>

     </div>
  );
}

export default HomePage;
