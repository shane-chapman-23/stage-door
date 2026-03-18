import { Routes, Route } from "react-router";

import Home from "./pages/Home";
import About from "./pages/About";
import Newsletters from "./pages/Newsletters";
import Contact from "./pages/Contact";
import Nav from "./components/Nav";

function App() {
  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/newsletters" element={<Newsletters />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
