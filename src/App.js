import './App.css';

import LandingPage from './components/Previewpage/landing';
import NavMenu from './components/navmenu/nav';
import { AuthProvider } from './contexts/authcontext';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <LandingPage />
        <NavMenu />
      </AuthProvider>
    </div>
  );
}

export default App;
