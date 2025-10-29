import React from 'react';
import './TeamPanel.css';

function TeamPanel({ team, isEditing, onEdit, onSave, onCancel, editData, setEditData }) {
  return (
    <div className="team-panel">
      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            value={editData.name}
            onChange={(e) => setEditData({...editData, name: e.target.value})}
            placeholder="Team Name"
            className="team-input"
          />
          <input
            type="number"
            value={editData.budget}
            onChange={(e) => setEditData({...editData, budget: e.target.value})}
            placeholder="Budget"
            className="team-input"
          />
          <div className="button-group">
            <button onClick={onSave} className="btn-save">Save</button>
            <button onClick={onCancel} className="btn-cancel">Cancel</button>
          </div>
        </div>
      ) : (
        <div className="team-content">
          <div className="team-header">
            <h3 className="team-name">{team.name}</h3>
            <button onClick={onEdit} className="btn-edit">✏️ Edit</button>
          </div>
          <div className="team-stats">
            <p className="stat-item">
              <span className="stat-label">Budget:</span>
              <span className="stat-value">${team.budget}</span>
            </p>
            <p className="stat-item">
              <span className="stat-label">Players:</span>
              <span className="stat-value">{team.players?.length || 0}</span>
            </p>
            {team.players && team.players.length > 0 && (
              <>
                <p className="stat-item">
                  <span className="stat-label">Used Points:</span>
                  <span className="stat-value spent">
                    ${team.players.reduce((sum, p) => sum + (p.points_spent || 0), 0)}
                  </span>
                </p>
                <p className="stat-item">
                  <span className="stat-label">Remaining:</span>
				  <span className="stat-value">${team.budget}</span>
					  {/*<span className="stat-value remaining">
                    ${team.budget - team.players.reduce((sum, p) => sum + (p.points_spent || 0), 0)}
					  </span>*/}
                </p>
              </>
            )}
          </div>
          {team.players && team.players.length > 0 && (
            <div className="players-list">
              <h4>Players:</h4>
              <ul>
                {team.players.map((player) => (
                  <li key={player.id} className="player-item">
                    {player.name} - {player.role} ({player.points_spent} pts)
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TeamPanel;

