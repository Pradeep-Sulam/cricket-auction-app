import React, { useState } from 'react';
import { adminAPI } from '../api/api';
import Header from '../components/Header';
import './AdminPage.css';

function AdminPage() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [players, setPlayers] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadStatus('');
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus('Please select a file');
      return;
    }

    try {
      setUploadStatus('Uploading...');
      const response = await adminAPI.uploadPlayers(file);
      setPlayers(response.data);
      setUploadStatus(`Successfully uploaded ${response.data.length} players!`);
      setFile(null);
    } catch (error) {
      setUploadStatus(`Error: ${error.response?.data?.detail || error.message}`);
    }
  };

  const handleReset = async () => {
    if (!window.confirm('Are you sure you want to reset the entire auction? This will delete all data.')) {
      return;
    }

    try {
      setUploadStatus('Resetting...');
      await adminAPI.resetAuction();
      setPlayers([]);
      setUploadStatus('Auction reset successfully!');
    } catch (error) {
      setUploadStatus(`Error: ${error.response?.data?.detail || error.message}`);
    }
  };

  return (
    <div className="admin-page">
      <Header />
      <div className="admin-container">
        <h1>Admin Panel</h1>
        
        <div className="admin-section">
          <h2>Upload Player Data</h2>
          <div className="upload-section">
            <input
              type="file"
              accept=".xlsx,.csv"
              onChange={handleFileChange}
              className="file-input"
            />
            <button onClick={handleUpload} className="btn-primary">
              Upload Players
            </button>
          </div>
          
          {uploadStatus && (
            <div className={`status ${uploadStatus.includes('Error') ? 'error' : 'success'}`}>
              {uploadStatus}
            </div>
          )}

          {players.length > 0 && (
            <div className="players-preview">
              <h3>Uploaded Players ({players.length})</h3>
              <div className="players-list">
                {players.map((player) => (
                  <div key={player.id} className="player-row">
                    <span className="player-name">{player.name}</span>
                    <span className="player-role">{player.role}</span>
                    <span className="player-mobile">{player.mobile}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="admin-section">
          <h2>Reset Auction</h2>
          <p className="warning-text">
            ⚠️ This will delete all player data, team assignments, and auction history.
          </p>
          <button onClick={handleReset} className="btn-danger">
            Reset Auction
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
