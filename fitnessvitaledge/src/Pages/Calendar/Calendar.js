import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Modal, Button, Form } from 'react-bootstrap';
import './Calendar.css';

function Calendar() {
  const [events, setEvents] = useState([
    { id: '1', title: 'Breakfast - Oatmeal', start: new Date() },
    { id: '2', title: 'Lunch - Grilled Chicken', start: new Date() },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [newEventTitle, setNewEventTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Open Add Event Modal
  const handleDateClick = (dateClickInfo) => {
    setSelectedDate(dateClickInfo.date);
    setShowAddModal(true);
  };


  const handleAddEvent = () => {
    if (newEventTitle && selectedDate) {
      const newEvent = {
        id: String(events.length + 1),
        title: newEventTitle,
        start: selectedDate,
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
      setShowAddModal(false);
      setNewEventTitle('');
      setSelectedDate(null);
    }
  };

 
  const handleEventClick = (eventClickInfo) => {
    setSelectedEvent(eventClickInfo.event);
    setNewEventTitle(eventClickInfo.event._def.title);
    setShowEditModal(true);
    console.log(eventClickInfo)
  };

  const handleEditEvent = () => {
    if (newEventTitle && selectedEvent) {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === selectedEvent.id
            ? { ...event, title: newEventTitle }
            : event
        )
      );
      setShowEditModal(false);
      setNewEventTitle('');
      setSelectedEvent(null);
    }
  };


  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== selectedEvent.id)
      );
      setShowEditModal(false);
      setSelectedEvent(null);
    }
  };

  const handleEventDrop = (eventDropInfo) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventDropInfo.event.id
          ? { ...event, start: eventDropInfo.event.start }
          : event
      )
    );
  };

  const handleEventResize = (eventResizeInfo) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventResizeInfo.event.id
          ? {
              ...event,
              start: eventResizeInfo.event.start,
              end: eventResizeInfo.event.end,
            }
          : event
      )
    );
  };

  return (
    <div className="calendar-container">
      <h3>Meal Plan Scheduler</h3>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev today next',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        editable={true}
        droppable={true}
        selectable={true}
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        eventResize={handleEventResize}
      />

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Meal Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Meal/Event Title</Form.Label>
              <Form.Control
                type="text"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                placeholder="Enter meal name"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddEvent}>
            Add Event
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Meal Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Meal/Event Title</Form.Label>
              <Form.Control
                type="text"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                placeholder="Edit meal name"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDeleteEvent}>
            Delete
          </Button>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditEvent}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Calendar;
