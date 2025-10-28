import React from 'react';
import './PlayerCard.css';

function PlayerCard({ player, showDetails = false }) {
  return (
    <div className="player-card">
      {player.photo_url && (
        <img src={player.photo_url} alt={player.name} className="player-photo" />
      )}
      <div className="player-info">
        <h3 className="player-name">{player.name}</h3>
        <p className="player-role">{player.role}</p>
        {showDetails && (
          <>
            <p className="player-mobile">📱 {player.mobile}</p>
            {player.stats_url && (
              <a href={player.stats_url} target="_blank" rel="noopener noreferrer" className="stats-link">
                View Stats
              </a>
            )}
            {player.points_spent > 0 && (
              <p className="points">💰 {player.points_spent} points</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default PlayerCard;

