import React, { useState } from 'react';
import { Box, Button, Container, Heading, Table, Tbody, Td, Th, Thead, Tr, VStack, Input, FormControl, FormLabel } from '@chakra-ui/react';
import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent } from '../integrations/supabase/index.js';

const EventManagement = () => {
  const { data: events, isLoading, isError } = useEvents();
  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();

  const [newEvent, setNewEvent] = useState({ name: '', date: '', venue: '' });
  const [editingEvent, setEditingEvent] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleAddEvent = () => {
    addEvent.mutate(newEvent);
    setNewEvent({ name: '', date: '', venue: '' });
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
                  <Td>{event.name}</Td>
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
            <Input name="date" value={editingEvent ? editingEvent.date : newEvent.date} onChange={handleInputChange} />
          </FormControl>
          <FormControl id="venue" isRequired>
            <FormLabel>Venue</FormLabel>
            <Input name="venue" value={editingEvent ? editingEvent.venue : newEvent.venue} onChange={handleInputChange} />
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