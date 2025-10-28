import React, { useState, useEffect } from 'react';
import { teamsAPI } from '../api/api';
import Header from '../components/Header';
import TeamPanel from '../components/TeamPanel';
import './TeamsPage.css';

function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [editingTeam, setEditingTeam] = useState(null);
  const [editData, setEditData] = useState({ name: '', budget: '' });

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await teamsAPI.getTeams();
      setTeams(response.data);
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  const handleEdit = (team) => {
    setEditingTeam(team.id);
    setEditData({ name: team.name, budget: team.budget.toString() });
  };

  const handleSave = async () => {
    try {
      await teamsAPI.updateTeam(editingTeam, {
        name: editData.name,
        budget: parseInt(editData.budget)
      });
      setEditingTeam(null);
      fetchTeams();
    } catch (error) {
      console.error('Error updating team:', error);
      alert('Failed to update team: ' + (error.response?.data?.detail || error.message));
    }
  };

  const handleCancel = () => {
    setEditingTeam(null);
    setEditData({ name: '', budget: '' });
  };

  return (
    <div className="teams-page">
      <Header />
      <div className="teams-container">
        <h1>Teams Overview</h1>
        
        {teams.length === 0 ? (
          <div className="no-teams">
            <p>No teams found. Teams will be created automatically when you start the app.</p>
          </div>
        ) : (
          <div className="teams-grid">
            {teams.map((team) => (
              <TeamPanel
                key={team.id}
                team={team}
                isEditing={editingTeam === team.id}
                onEdit={() => handleEdit(team)}
                onSave={handleSave}
                onCancel={handleCancel}
                editData={editData}
                setEditData={setEditData}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamsPage;
