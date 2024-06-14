import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Container, Heading, Text, VStack, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';
import { useEvent, useVenue, useComments, useAddComment } from '../integrations/supabase/index.js';

const EventDetails = () => {
  const { id } = useParams();
  const { data: event, isLoading: eventLoading, isError: eventError } = useEvent(id);
  const { data: venue, isLoading: venueLoading, isError: venueError } = useVenue(event?.venue);
  const { data: comments, isLoading: commentsLoading, isError: commentsError } = useComments();
  const addComment = useAddComment();

  const [newComment, setNewComment] = useState({ content: '', event_id: id });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComment({ ...newComment, [name]: value });
  };

  const handleAddComment = () => {
    addComment.mutate(newComment);
    setNewComment({ content: '', event_id: id });
  };

  if (eventLoading || venueLoading || commentsLoading) return <div>Loading...</div>;
  if (eventError || venueError || commentsError) return <div>Error loading data</div>;

  return (
    <Container maxW="container.lg">
      <VStack spacing={4}>
        <Heading as="h1" size="xl">{event.name}</Heading>
        <Text>Date: {event.date}</Text>
        <Text>Venue: {venue.name}</Text>
        <Text>Capacity: {venue.capacity}</Text>
        <Text>Type: {venue.type}</Text>
        <Box width="100%">
          <Heading as="h2" size="lg">Comments</Heading>
          {comments.filter(comment => comment.event_id === id).map((comment) => (
            <Box key={comment.id} p={4} borderWidth="1px" borderRadius="lg">
              <Text>{comment.content}</Text>
            </Box>
          ))}
        </Box>
        <Box width="100%">
          <Heading as="h2" size="lg">Add a Comment</Heading>
          <FormControl id="content" isRequired>
            <FormLabel>Comment</FormLabel>
            <Textarea name="content" value={newComment.content} onChange={handleInputChange} />
          </FormControl>
          <Button mt={4} colorScheme="teal" onClick={handleAddComment}>
            Add Comment
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default EventDetails;