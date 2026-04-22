import "./App.css";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Banner } from "./components/Banner";
import { Resume } from "./components/Resume";
import { SelectedWork } from "./components/SelectedWork";
import { WorkSnapshots } from "./components/WorkSnapshots";

//Main function
function App() {
  return (
    <>
      <Banner />
      <SelectedWork />
      <WorkSnapshots />
      <About />
      <Resume />
      <Contact />
    </>
  );
}

export default App;
