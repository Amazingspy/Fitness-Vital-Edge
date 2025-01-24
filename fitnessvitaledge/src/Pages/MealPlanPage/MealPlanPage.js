import React, { useState, useEffect } from 'react';
import './MealPlanPage.css';
// import DatePicker from 'react-datepicker'
import { Container, Row, Col, Button, Dropdown, DropdownButton, Form, InputGroup, Card, Modal } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight, FaSearch, FaFilter, FaEdit, FaPlus, FaCalendarAlt } from 'react-icons/fa';

function getCurrentMonthYear(offset = 0) {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() + offset);
  return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function getcurrentweekofthecurrentmonth(date) {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const startDay = firstDayOfMonth.getDay();
  const dayOfMonth = date.getDate();

  return Math.ceil((dayOfMonth + startDay) / 7);
  // console.log(Math.ceil((dayOfMonth + startDay) / 7))
}



function MealPlanPage() {

  const [currentweek, setcurrentweek] = useState(getcurrentweekofthecurrentmonth(new Date()))

  const handlePreviousWeek = () => {
    setcurrentweek((prev) => (prev > 1 ? prev - 1 : 1));
  };
  
  const handleNextWeek = () => {
    const totalWeeks = Math.ceil(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() / 7);
    setcurrentweek((prev) => (prev < totalWeeks ? prev + 1 : totalWeeks));
  };
  

  const MealData = [
    { day: 'Sunday', meals: { Breakfast: '', Lunch: '', Snack: '', Dinner: '' } },
    { day: 'Monday', meals: { Breakfast: '', Lunch: '', Snack: '', Dinner: '' } },
    { day: 'Tuesday', meals: { Breakfast: '', Lunch: '', Snack: '', Dinner: '' } },
    { day: 'Wednesday', meals: { Breakfast: '', Lunch: '', Snack: '', Dinner: '' } },
    { day: 'Thursday', meals: { Breakfast: '', Lunch: '', Snack: '', Dinner: '' } },
    { day: 'Friday', meals: { Breakfast: '', Lunch: '', Snack: '', Dinner: '' } },
    { day: 'Saturday', meals: { Breakfast: '', Lunch: '', Snack: '', Dinner: '' } },
  ];

  const [monthOffset, setMonthOffset] = useState(0);
  const [currentMonthYear, setCurrentMonthYear] = useState('');
  const [mealData, setMealData] = useState(MealData);
  const [editingMeal, setEditingMeal] = useState(null);
  const [mealInput, setMealInput] = useState('');
  const [selectedDate, setselectedDate] = useState(new Date())
  const [showCalendar, setshowCalendar] = useState(false)

  useEffect(() => {
    setCurrentMonthYear(selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }));
  }, [selectedDate]);

  const handlePreviousMonth = () => setMonthOffset((prev) => prev - 1);
  const handleNextMonth = () => setMonthOffset((prev) => prev + 1);

  const handleMealAction = (dayIndex, mealType, currentMealName) => {
    setEditingMeal({ dayIndex, mealType, isEdit: !!currentMealName });
    setMealInput(currentMealName || '');
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
{/* 
          <div className="calendar-picker">
            <Button variant='light' onClick={()=> setshowCalendar(true)}>
              {currentMonthYear}
            </Button>
            {showCalendar && (
              <DatePicker
              selected = {selectedDate}
              onChange = {(date)=>{
                setselectedDate(date)
                setshowCalendar(false)
              }}
              />
             )}
          </div> */}

          <div className="week-box">
            {/* <Button variant="light" onClick={handlePreviousWeek}>
              <FaChevronLeft />
            </Button>
            <Button variant="light" onClick={handleNextWeek}>
              <FaChevronRight />
            </Button> */}
            <div className='currentweek'>Week {currentweek}</div>
          </div>
        </Container>
      </div>

      <Container fluid className="meal-plan-container">
        <div className="header" style={{ gridArea: 'header-day' }}>Day</div>
        <div className="header" style={{ gridArea: 'header-breakfast' }}>Breakfast</div>
        <div className="header" style={{ gridArea: 'header-lunch' }}>Lunch</div>
        <div className="header" style={{ gridArea: 'header-snack' }}>Snack</div>
        <div className="header" style={{ gridArea: 'header-dinner' }}>Dinner</div>

        {mealData.map((dayData, dayIndex) => (
          <React.Fragment key={dayIndex}>
            <div className="day" style={{ gridArea: dayData.day.toLowerCase() }}>
              {dayData.day}
            </div>

            {Object.entries(dayData.meals).map(([mealType, mealName], mealIndex) => (
              <div
                key={mealIndex}
                className="meal-cell"
                style={{
                  gridArea: `${mealType.toLowerCase()}-${dayData.day.toLowerCase()}`,
                }}
              >
                {/* <img src="https://via.placeholder.com/60" alt={mealType} /> */}
                <p><strong>{mealType}</strong></p>
                {mealName ? (
                  <>
                    <p>{mealName}</p>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleMealAction(dayIndex, mealType, mealName)}
                    >
                      <FaEdit /> Edit
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={() => handleMealAction(dayIndex, mealType, '')}
                  >
                    <FaPlus /> Add Meal
                  </Button>
                )}
              </div>
            ))}
          </React.Fragment>
        ))}
      </Container>

      <Modal show={editingMeal !== null} onHide={handleCloseModal} aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingMeal?.isEdit ? 'Edit Meal' : 'Add Meal'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="mealInput">
            <Form.Label>Meal Name</Form.Label>
            <Form.Control
              type="text"
              value={mealInput}
              onChange={(e) => setMealInput(e.target.value)}
              placeholder="Enter meal name"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveMeal}>
            {editingMeal?.isEdit ? 'Save Changes' : 'Add Meal'}
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default MealPlanPage;
