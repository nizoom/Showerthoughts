import './App.css';

import LandingPage from './components/Previewpage/landing';
import Dashboard from './components/dashboard/dashboard';
import LoginUI from './components/Previewpage/login/loginUI';
import ProfilePage from './components/profile/profile';
import NewPostPage from './components/newpost/newpost';


import { AuthProvider } from './contexts/authcontext';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import PrivateRoute from './components/privateroutes/privateroute';


function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/login" component={LoginUI} />



            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/profile" component={ProfilePage} />
            <PrivateRoute exact path="/newpost" component={NewPostPage} />

          </Switch>


        </AuthProvider>

      </Router>
    </div>
  );
}

export default App;

