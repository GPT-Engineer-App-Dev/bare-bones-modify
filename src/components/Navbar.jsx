import { Box, Flex, Link, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Box bg="teal.500" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box>
          <Link as={RouterLink} to="/" color="white" fontSize="lg" fontWeight="bold">
            Home
          </Link>
        </Box>
        <Flex alignItems="center">
          <Button as={RouterLink} to="/events" colorScheme="teal" variant="solid" size="sm" ml={4}>
            Manage Events
          </Button>
          <Button as={RouterLink} to="/venues" colorScheme="teal" variant="solid" size="sm" ml={4}>
            Manage Venues
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;