import './App.css';

import LandingPage from './components/Previewpage/landing';
import Dashboard from './components/dashboard/dashboard';
import { AuthProvider } from './contexts/authcontext';
import LoginUI from './components/Previewpage/login/loginUI';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import PrivateRoute from './components/privateroutes/privateroute';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <Route path="/login" component={LoginUI} />
            <Route path="/" component={LandingPage} />

          </Switch>

        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;

