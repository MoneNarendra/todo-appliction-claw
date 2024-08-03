import { Switch, Route } from "react-router-dom";

// import Cookies from "js-cookie";

import ProtectedRoute from "./components/ProtectedRoute";
import AuthButtons from "./components/AuthButtons";
import Home from "./components/Home";

import "./App.css";

function App() {
  return (
    <Switch>
      <Route exact path="/authorize" component={(props) => <AuthButtons />} />
      <ProtectedRoute exact path="/" component={(props) => <Home />} />
    </Switch>
  );
}

export default App;
