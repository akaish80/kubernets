import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PodDetailsPage from './pages/PodDetailsPage';
import './App.css';
import './components/styles.css';
import './pages/styles.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/cluster/:clusterId/pods" element={<PodDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App