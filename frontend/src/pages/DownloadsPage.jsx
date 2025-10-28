import React, { useState } from 'react';
import { downloadAPI } from '../api/api';
import Header from '../components/Header';
import './DownloadsPage.css';

function DownloadsPage() {
  const [teamData, setTeamData] = useState([]);
  const [unsoldData, setUnsoldData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTeamData = async () => {
    setLoading(true);
    try {
      const response = await downloadAPI.getTeamRosters();
      setTeamData(response.data);
    } catch (error) {
      console.error('Error fetching team data:', error);
      alert('Failed to fetch team rosters');
    } finally {
      setLoading(false);
    }
  };

  const fetchUnsoldData = async () => {
    setLoading(true);
    try {
      const response = await downloadAPI.getUnsoldPlayers();
      setUnsoldData(response.data);
    } catch (error) {
      console.error('Error fetching unsold data:', error);
      alert('Failed to fetch unsold players');
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = (data, filename) => {
    if (!data || data.length === 0) return;
    
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(','));
    const csv = [headers, ...rows].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="downloads-page">
      <Header />
      <div className="downloads-container">
        <h1>Download Auction Results</h1>
        
        <div className="downloads-section">
          <div className="action-buttons">
            <button onClick={fetchTeamData} className="btn-primary" disabled={loading}>
              View Team Rosters
            </button>
            <button onClick={fetchUnsoldData} className="btn-secondary" disabled={loading}>
              View Unsold Players
            </button>
          </div>

          {loading && <div className="loading">Loading...</div>}

          {teamData.length > 0 && (
            <div className="results-section">
              <div className="section-header">
                <h2>Team Rosters</h2>
                <button onClick={() => {
                  const flattened = teamData.flatMap(team => 
                    team.players.map(p => ({ Team: team.name, Player: p.name, Role: p.role, Points: p.points_spent }))
                  );
                  exportToCSV(flattened, 'team_rosters.csv');
                }} className="btn-export">
                  Export as CSV
                </button>
              </div>
              <div className="teams-display">
                {teamData.map((team) => (
                  <div key={team.name} className="team-card">
                    <div className="team-header">
                      <h3>{team.name}</h3>
                      <div className="team-stats">
                        <span className="stat">Used: ${team.used_points}</span>
                        <span className="stat">Remaining: ${team.remaining_points}</span>
                        <span className="stat">Players: {team.players.length}</span>
                      </div>
                    </div>
                    <div className="players-list">
                      {team.players.map((player, idx) => (
                        <div key={idx} className="player-item">
                          <span className="player-name">{player.name}</span>
                          <span className="player-role">{player.role}</span>
                          <span className="player-points">{player.points_spent} pts</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {unsoldData.length > 0 && (
            <div className="results-section">
              <div className="section-header">
                <h2>Unsold Players ({unsoldData.length})</h2>
                <button onClick={() => exportToCSV(unsoldData, 'unsold_players.csv')} className="btn-export">
                  Export as CSV
                </button>
              </div>
              <div className="unsold-list">
                {unsoldData.map((player, idx) => (
                  <div key={idx} className="unsold-item">
                    {player.name} - {player.role}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DownloadsPage;
