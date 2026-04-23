import "./App.css";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { Resume } from "./pages/Resume";
import NavBar from "./components/NavBar";
import { useState } from "react";

//Main function
function App() {
  const [navPage, setNavPage] = useState(0);

  switch (window.location.pathname)
  {
    case "/":
      break;
    case "/contact":
      break;
    case "/about":
      break;
    case "/resume":
      break;
  }
  return (
    <>
      <NavBar />
      <Home />
      <About />
      <Contact />
      <Resume />
    </>
  );
}

export default App;
