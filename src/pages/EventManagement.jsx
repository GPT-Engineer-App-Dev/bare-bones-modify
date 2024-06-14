import React, { useState } from 'react';
import { Box, Button, Container, Heading, Table, Tbody, Td, Th, Thead, Tr, VStack, Input, FormControl, FormLabel, Select, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent, useVenues } from '../integrations/supabase/index.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EventManagement = () => {
  const { data: events, isLoading, isError } = useEvents();
  const { data: venues } = useVenues();
  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();

  const [newEvent, setNewEvent] = useState({ name: '', date: new Date(), venue: '' });
  const [editingEvent, setEditingEvent] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleDateChange = (date) => {
    setNewEvent({ ...newEvent, date });
  };

  const handleAddEvent = () => {
    addEvent.mutate(newEvent);
    setNewEvent({ name: '', date: new Date(), venue: '' });
  };

  const handleUpdateEvent = () => {
    updateEvent.mutate(editingEvent);
    setEditingEvent(null);
  };

  const handleDeleteEvent = (id) => {
    deleteEvent.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading events</div>;

  return (
    <Container maxW="container.lg">
      <VStack spacing={4}>
        <Heading as="h1" size="xl">Event Management</Heading>
        <Box width="100%">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Date</Th>
                <Th>Venue</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {events.map((event) => (
                <Tr key={event.id}>
                  <Td>
                    <Link as={RouterLink} to={`/events/${event.id}`} color="teal.500">
                      {event.name}
                    </Link>
                  </Td>
                  <Td>{event.date}</Td>
                  <Td>{event.venue}</Td>
                  <Td>
                    <Button size="sm" onClick={() => setEditingEvent(event)}>Edit</Button>
                    <Button size="sm" colorScheme="red" onClick={() => handleDeleteEvent(event.id)}>Delete</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        <Box width="100%">
          <Heading as="h2" size="lg">{editingEvent ? 'Edit Event' : 'Add New Event'}</Heading>
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input name="name" value={editingEvent ? editingEvent.name : newEvent.name} onChange={handleInputChange} />
          </FormControl>
          <FormControl id="date" isRequired>
            <FormLabel>Date</FormLabel>
            <DatePicker selected={editingEvent ? new Date(editingEvent.date) : newEvent.date} onChange={handleDateChange} />
          </FormControl>
          <FormControl id="venue" isRequired>
            <FormLabel>Venue</FormLabel>
            <Select name="venue" value={editingEvent ? editingEvent.venue : newEvent.venue} onChange={handleInputChange}>
              {venues && venues.map((venue) => (
                <option key={venue.id} value={venue.id}>{venue.name}</option>
              ))}
            </Select>
          </FormControl>
          <Button mt={4} colorScheme="teal" onClick={editingEvent ? handleUpdateEvent : handleAddEvent}>
            {editingEvent ? 'Update Event' : 'Add Event'}
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default EventManagement;