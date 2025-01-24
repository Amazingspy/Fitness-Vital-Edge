import React from 'react';
import './WorkoutsPage.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';

// Images
import running from '../../Assets/f726876e44b77115_walk-jog-workout 2.png';
import yoga from '../../Assets/anastasia-hisel-tpivPdQgC20-unsplash 3.png';

function WorkoutsPage() {
  const navigate = useNavigate();

  const workouts = [
    { title: 'Running', image: running },
    { title: 'Squats', image: '' },
    { title: 'Yoga', image: yoga },
  ];

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: true,
    autoplayspeed: 100,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleWorkoutClick = (workout) => {
    navigate(`/workout/${workout.title.toLowerCase()}`, { state: { workout } });
  };

  return (
    <div className="workout-page">
      <div className="workout-grid">
        <div className="workout-card header-">
          Start Your Workout from Today
          <div className="intro">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
            Unde autem reprehenderit magni, voluptatibus quam.
          </div>
        </div>
        <div className="workout-card workouts">
          <h2>Workouts</h2>
          <Slider {...settings}>
            {workouts.map((workout, index) => (
              <div
                key={index}
                className="carousel-item"
                onClick={() => handleWorkoutClick(workout)}
                style={{ cursor: 'pointer' }}
              >
                <div className="workout-card-content">
                  {workout.image ? (
                    <img
                      src={workout.image}
                      alt={workout.title}
                      className="workout-image"
                    />
                  ) : (
                    <div className="workout-placeholder">No Image Available</div>
                  )}
                  <h3>{workout.title}</h3>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="workout-card stats">Stats</div>
        <div className="workout-card community">Community Board</div>
      </div>
    </div>
  );
}

export default WorkoutsPage;
