import MainLayout from "./components/layout/MainLayout";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="mt-app">
      <Router>
        <MainLayout />
      </Router>
    </div>
  );
}

export default App;
