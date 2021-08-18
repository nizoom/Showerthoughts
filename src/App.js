import './App.css';

import LandingPage from './components/Previewpage/landing';
import Dashboard from './components/dashboard/dashboard';
import { AuthProvider } from './contexts/authcontext';
import LoginUI from './components/Previewpage/login/loginUI';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/login" component={LoginUI} />
            <Route path="/dashboard" component={Dashboard} />

          </Switch>

        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;

