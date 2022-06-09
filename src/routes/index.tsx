import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Home from "../pages/home";

export default function SwitchRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={""} />
      </Routes>
    </BrowserRouter>
  );
}
