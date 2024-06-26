import { Container, Text, VStack, Heading, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaRocket } from "react-icons/fa";

const Index = () => {
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading as="h1" size="2xl">Welcome to Your New App</Heading>
        <Text fontSize="lg">This is a bare-bones application. Start building your amazing features here!</Text>
        <Button as={Link} to="/events" leftIcon={<FaRocket />} colorScheme="teal" size="lg">
          Manage Events
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;