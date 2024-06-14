import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Index from "./pages/Index.jsx";
import EventManagement from "./pages/EventManagement.jsx";
import VenueManagement from "./pages/VenueManagement.jsx";
import EventDetails from "./pages/EventDetails.jsx";
import Login from "./pages/Login.jsx";
import { useSupabaseAuth } from "./integrations/supabase/auth.jsx";

function App() {
  const { session, logout } = useSupabaseAuth();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/events" element={<EventManagement />} />
        <Route path="/venues" element={<VenueManagement />} />
        <Route path="/events/:id" element={<EventDetails />} />
      </Routes>
      {session ? (
        <Button onClick={logout} colorScheme="teal" variant="solid" size="sm" ml={4}>
          Logout
        </Button>
      ) : (
        <Button as={RouterLink} to="/login" colorScheme="teal" variant="solid" size="sm" ml={4}>
          Login
        </Button>
      )}
    </Router>
  );
}

export default App;