import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Heading } from '@chakra-ui/react';
import { SupabaseAuthUI, useSupabaseAuth } from '../integrations/supabase/auth.jsx';

const Login = () => {
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate('/');
    }
  }, [session, navigate]);

  return (
    <Container centerContent>
      <Box width="100%" maxWidth="md" mt={8}>
        <Heading as="h1" size="xl" mb={4}>Login</Heading>
        <SupabaseAuthUI />
      </Box>
    </Container>
  );
};

export default Login;