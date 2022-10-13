import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CharaPage from "./Pages/CharaPage";
import CharaDetails from "./Pages/CharaDetails";
import BCSPage from "./Pages/BCSPage";
import QuotePage from "./Pages/QuotePage";
import BCSDetails from "./Pages/BCSDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CharaPage />} />
        <Route path="/better+call+saul" element={<BCSPage />} />
        <Route path="/character/:id" element={<CharaDetails />} />
        <Route path="/bettercallsaul/:id" element={<BCSDetails />} />
        <Route path="/quote" element={<QuotePage />} />
      </Routes>
    </Router>
  );
}

export default App;
