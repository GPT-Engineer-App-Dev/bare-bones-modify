import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Index from "./pages/Index.jsx";
import EventManagement from "./pages/EventManagement.jsx";
import VenueManagement from "./pages/VenueManagement.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/events" element={<EventManagement />} />
        <Route path="/venues" element={<VenueManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
