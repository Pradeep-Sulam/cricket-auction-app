import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import AdminPage from './pages/AdminPage';
import TeamsPage from './pages/TeamsPage';
import AuctionPage from './pages/AuctionPage';
import DownloadsPage from './pages/DownloadsPage';
import SupportPage from './pages/SupportPage';
import './App.css';

function Home() {
  return (
    <div className="home-page">
      <Header />
      <div className="home-container">
        <h1>🏏 Welcome to Cricket Auction</h1>
        <p>Manage your cricket players auction with ease</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/auction" element={<AuctionPage />} />
        <Route path="/download" element={<DownloadsPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;