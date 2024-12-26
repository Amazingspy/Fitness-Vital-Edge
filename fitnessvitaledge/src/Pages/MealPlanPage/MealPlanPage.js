import React, { useState, useEffect } from 'react';
import './MealPlanPage.css';
import { Container, Row, Col, Button, Dropdown, DropdownButton, Form, InputGroup, Card, Modal } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight, FaSearch, FaFilter, FaEdit } from 'react-icons/fa';

function getCurrentMonthYear(offset = 0) {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() + offset);
  return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function MealPlanPage() {

  const MealData = [
    {
      day: 'Sunday',
      meals: {
        Breakfast: 'Scrambled Eggs with Spinach & Whole Grain Toast',
        Lunch: 'Grilled Chicken Wrap with Avocado and Spinach',
        Snack: 'Greek Yogurt with Mixed Berries and Almonds',
        Dinner: 'Baked Salmon with Steamed Broccoli and Sweet Potatoes'
      }
    },
    {
      day: 'Monday',
      meals: {
        Breakfast: 'Avocado Toast with Poached Egg',
        Lunch: 'Quinoa Salad with Roasted Vegetables and Feta',
        Snack: 'Apple Slices with Peanut Butter',
        Dinner: 'Grilled Turkey Breast with Steamed Asparagus and Brown Rice'
      }
    },
    {
      day: 'Tuesday',
      meals: {
        Breakfast: 'Blueberry Protein Smoothie',
        Lunch: 'Greek Salad with Feta and Olives',
        Snack: 'Hummus with Carrot Sticks',
        Dinner: 'Baked Sweet Potato with Black Beans and Avocado'
      }
    },
    {
      day: 'Wednesday',
      meals: {
        Breakfast: 'Oatmeal with Almond Butter and Berries',
        Lunch: 'Veggie Stir-Fry with Tofu and Brown Rice',
        Snack: 'Almonds and a Banana',
        Dinner: 'Grilled Shrimp Tacos with Mango Salsa'
      }
    },
    {
      day: 'Thursday',
      meals: {
        Breakfast: 'Greek Yogurt with Granola and Honey',
        Lunch: 'Baked Chicken Breast with Quinoa and Kale',
        Snack: 'Cottage Cheese with Pineapple',
        Dinner: 'Lemon Garlic Tilapia with Roasted Brussels Sprouts'
      }
    },
    {
      day: 'Friday',
      meals: {
        Breakfast: 'Smoothie Bowl with Mixed Fruits and Chia Seeds',
        Lunch: 'Tuna Salad with Spinach and Chickpeas',
        Snack: 'Dark Chocolate and Walnuts',
        Dinner: 'Grilled Chicken with Sweet Potato and Green Beans'
      }
    },
    {
      day: 'Saturday',
      meals: {
        Breakfast: 'Chia Pudding with Strawberries',
        Lunch: 'Mediterranean Couscous Salad with Grilled Vegetables',
        Snack: 'Trail Mix with Dried Fruit and Seeds',
        Dinner: 'Roasted Veggie Bowl with Lentils and Avocado'
      }
    }
  ];

  const [monthOffset, setMonthOffset] = useState(0);
  const [currentMonthYear, setCurrentMonthYear] = useState('');
  const [mealData, setMealData] = useState(MealData);
  const [editingMeal, setEditingMeal] = useState(null);
  const [mealInput, setMealInput] = useState('');

  useEffect(() => {
    setCurrentMonthYear(getCurrentMonthYear(monthOffset));
  }, [monthOffset]);

  const handlePreviousMonth = () => setMonthOffset((prev) => prev - 1);
  const handleNextMonth = () => setMonthOffset((prev) => prev + 1);

  const handleEditMeal = (dayIndex, mealType, currentMealName) => {
    setEditingMeal({ dayIndex, mealType });
    setMealInput(currentMealName);
  };

  const handleSaveMeal = () => {
    if (editingMeal && mealInput.trim()) {
      const updatedMeals = [...mealData];
      updatedMeals[editingMeal.dayIndex].meals[editingMeal.mealType] = mealInput;
      setMealData(updatedMeals);
      setEditingMeal(null);
      setMealInput('');
    }
  };

  const handleCloseModal = () => {
    setEditingMeal(null);
    setMealInput('');
  };

  return (

    <div>
      <div className="meal-plan-page">
        <Container fluid className="meal-plan-header">
          <Button variant="light" className="nav-btn" onClick={handlePreviousMonth}>
            <FaChevronLeft />
          </Button>
          <Button variant="light" className="nav-btn" onClick={handleNextMonth}>
            <FaChevronRight />
          </Button>
          <DropdownButton id="dropdown-month" title={currentMonthYear} variant="light">
            <Dropdown.Item onClick={() => setMonthOffset(0)}>Current Month</Dropdown.Item>
            <Dropdown.Item onClick={() => setMonthOffset(-1)}>Previous Month</Dropdown.Item>
            <Dropdown.Item onClick={() => setMonthOffset(1)}>Next Month</Dropdown.Item>
          </DropdownButton>
        </Container>
      </div>

      <Container fluid className="meal-plan-container">

        <div className="header" style={{ gridArea: "header-day" }}>Day</div>
        <div className="header" style={{ gridArea: "header-breakfast" }}>Breakfast</div>
        <div className="header" style={{ gridArea: "header-lunch" }}>Lunch</div>
        <div className="header" style={{ gridArea: "header-snack" }}>Snack</div>
        <div className="header" style={{ gridArea: "header-dinner" }}>Dinner</div>

        {mealData.map((dayData, dayIndex) => (
          <React.Fragment key={dayIndex}>
            {/* Day Name */}
            <div className="day" style={{ gridArea: dayData.day.toLowerCase() }}>
              {dayData.day}
            </div>

            {/* Meals for the Day */}
            {Object.entries(dayData.meals).map(([mealType, mealName], mealIndex) => (
              <div
                key={mealIndex}
                className="meal-cell"
                style={{
                  gridArea: `${mealType.toLowerCase()}-${dayData.day.toLowerCase()}`,
                }}
              >
                <img src="https://via.placeholder.com/60" alt={mealType} />
                <p><strong>{mealType}</strong></p>
                <p>{mealName}</p>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => handleEditMeal(dayIndex, mealType, mealName)}
                >
                  Edit
                </Button>
              </div>
            ))}
          </React.Fragment>
        ))}
      </Container>





      <Modal show={editingMeal !== null} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Meal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="mealInput">
            <Form.Label>Meal Name</Form.Label>
            <Form.Control
              type="text"
              value={mealInput}
              onChange={(e) => setMealInput(e.target.value)}
              placeholder="Enter new meal name"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveMeal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default MealPlanPage;
