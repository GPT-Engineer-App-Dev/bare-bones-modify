import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Container, Heading, Text, VStack, FormControl, FormLabel, Input, Textarea, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useEvent, useVenue, useComments, useAddComment } from '../integrations/supabase/index.js';

const EventDetails = () => {
  const { id } = useParams();
  const { data: event, isLoading: eventLoading, isError: eventError } = useEvent(id);
  const { data: venue, isLoading: venueLoading, isError: venueError } = useVenue(event?.venue);
  const { data: comments, isLoading: commentsLoading, isError: commentsError } = useComments(id);
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

  if (eventLoading || venueLoading) return <div>Loading event or venue...</div>;
  if (eventError || venueError) return <div>Error loading event or venue data</div>;
  if (commentsLoading) return <div>Loading comments...</div>;
  if (commentsError) return <div>Error loading comments</div>;

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
          {comments.length > 0 ? (
            comments.filter(comment => comment.event_id === id).map((comment) => (
              <Box key={comment.id} p={4} borderWidth="1px" borderRadius="lg">
                <Text>{comment.content}</Text>
              </Box>
            ))
          ) : (
            <Text>No comments yet. Be the first to comment!</Text>
          )}
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
      <Box width="100%">
          <Link as={RouterLink} to="/events" color="teal.500" fontWeight="bold">
            Back to Events List
          </Link>
        </Box>
      </VStack>
    </Container>
  );
};

export default EventDetails;