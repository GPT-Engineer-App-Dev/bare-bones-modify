import React, { useState } from 'react';
import { Box, Button, Container, Heading, Table, Tbody, Td, Th, Thead, Tr, VStack, Input, FormControl, FormLabel } from '@chakra-ui/react';
import { useVenues, useAddVenue, useUpdateVenue, useDeleteVenue } from '../integrations/supabase/index.js';

const VenueManagement = () => {
  const { data: venues, isLoading, isError } = useVenues();
  const addVenue = useAddVenue();
  const updateVenue = useUpdateVenue();
  const deleteVenue = useDeleteVenue();

  const [newVenue, setNewVenue] = useState({ name: '', capacity: '', type: '' });
  const [editingVenue, setEditingVenue] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVenue({ ...newVenue, [name]: value });
  };

  const handleAddVenue = () => {
    addVenue.mutate(newVenue);
    setNewVenue({ name: '', capacity: '', type: '' });
  };

  const handleUpdateVenue = () => {
    updateVenue.mutate(editingVenue);
    setEditingVenue(null);
  };

  const handleDeleteVenue = (id) => {
    deleteVenue.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading venues</div>;

  return (
    <Container maxW="container.lg">
      <VStack spacing={4}>
        <Heading as="h1" size="xl">Venue Management</Heading>
        <Box width="100%">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Capacity</Th>
                <Th>Type</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {venues.map((venue) => (
                <Tr key={venue.id}>
                  <Td>{venue.name}</Td>
                  <Td>{venue.capacity}</Td>
                  <Td>{venue.type}</Td>
                  <Td>
                    <Button size="sm" onClick={() => setEditingVenue(venue)}>Edit</Button>
                    <Button size="sm" colorScheme="red" onClick={() => handleDeleteVenue(venue.id)}>Delete</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        <Box width="100%">
          <Heading as="h2" size="lg">{editingVenue ? 'Edit Venue' : 'Add New Venue'}</Heading>
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input name="name" value={editingVenue ? editingVenue.name : newVenue.name} onChange={handleInputChange} />
          </FormControl>
          <FormControl id="capacity" isRequired>
            <FormLabel>Capacity</FormLabel>
            <Input name="capacity" value={editingVenue ? editingVenue.capacity : newVenue.capacity} onChange={handleInputChange} />
          </FormControl>
          <FormControl id="type" isRequired>
            <FormLabel>Type</FormLabel>
            <Input name="type" value={editingVenue ? editingVenue.type : newVenue.type} onChange={handleInputChange} />
          </FormControl>
          <Button mt={4} colorScheme="teal" onClick={editingVenue ? handleUpdateVenue : handleAddVenue}>
            {editingVenue ? 'Update Venue' : 'Add Venue'}
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default VenueManagement;