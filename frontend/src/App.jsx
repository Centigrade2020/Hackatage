import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pages from "./Pages";
import Components from "./Components";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Components.Navbar />
        <Routes>
          <Route exact path="/" element={<Pages.Home />} />
          <Route exact path="/auth" element={<Pages.Auth />} />
          <Route exact path="/test" element={<Pages.Test />} />
          <Route exact path="/dashboard" element={<Pages.Dashboard />} />
        </Routes>
        <Components.Footer />
      </Router>
    </div>
  );
}

export default App;
