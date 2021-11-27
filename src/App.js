import MainLayout from "./components/layout/MainLayout";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <div className="mt-app">
      <Provider store={store}>
        <Router>
          <MainLayout />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
