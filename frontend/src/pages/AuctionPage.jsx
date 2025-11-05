import React, { useState, useEffect } from 'react';
import { auctionAPI, teamsAPI } from '../api/api';
import Header from '../components/Header';
import PlayerCard from '../components/PlayerCard';
import AuctionControls from '../components/AuctionControls';
import './AuctionPage.css';

function AuctionPage() {
  const [player, setPlayer] = useState(null);
  const [teams, setTeams] = useState([]);
  const [bidIncrement, setBidIncrement] = useState(100);
  const [bids, setBids] = useState({});
  const [loading, setLoading] = useState(false);
  const [playerResolved, setPlayerResolved] = useState(true); // ✅ Track if player is sold/unsold

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await teamsAPI.getTeams();
      setTeams(response.data);

      // Initialize bids for each team
      const initialBids = {};
      response.data.forEach(team => {
        initialBids[team.name] = 0;
      });
      setBids(initialBids);
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  const fetchNextPlayer = async () => {
    setLoading(true);
    try {
      const response = await auctionAPI.getNextPlayer();
      setPlayer(response.data);

      // Reset bids for new player
      const resetBids = {};
      teams.forEach(team => {
        resetBids[team.name] = 0;
      });
      setBids(resetBids);
      setPlayerResolved(false); // ✅ Now we have a new active player
    } catch (error) {
      console.error('Error fetching player:', error);
      alert(error.response?.data?.detail || 'No more players available');
    } finally {
      setLoading(false);
    }
  };

  const handleBid = (teamName) => {
    setBids((prev) => ({
      ...prev,
      [teamName]: prev[teamName] + bidIncrement,
    }));
  };

  const handleSold = async () => {
    const highestTeam = Object.entries(bids).reduce((a, b) =>
      a[1] > b[1] ? a : b
    )[0];
    const points = bids[highestTeam];

    if (points === 0) {
      alert('Please place at least one bid before selling');
      return;
    }

    try {
      await auctionAPI.sellPlayer({
        playerId: player.id,
        team: highestTeam,
        points: points,
      });
      alert(`✅ ${player.name} sold to ${highestTeam} for ${points} points!`);
      setPlayerResolved(true); // ✅ Player round completed
    } catch (error) {
      console.error('Error selling player:', error);
      alert(error.response?.data?.detail || 'Failed to sell player');
    }
  };

  const handleUndo = async () => {
    try {
      await auctionAPI.undoLastAction();
      alert('Last action undone successfully');
      fetchNextPlayer();
      fetchTeams(); // Refresh teams to show updated budget
    } catch (error) {
      console.error('Error undoing action:', error);
      alert(error.response?.data?.detail || 'Failed to undo');
    }
  };

  const handleUnsold = async () => {
    try {
      await auctionAPI.markPlayerUnsold(player.id);
      alert(`⚠️ ${player.name} marked as unsold!`);
      setPlayerResolved(true); // ✅ Allow generating next player
    } catch (error) {
      console.error('Error marking player as unsold:', error);
      alert(error.response?.data?.detail || 'Failed to mark player as unsold');
    }
  };

  // Initial state: before any player is generated
  if (!player) {
    return (
      <div className="auction-page">
        <Header />
        <div className="auction-container">
          <div className="no-player-state">
            <h2>Ready to start the auction?</h2>
            <button onClick={fetchNextPlayer} className="btn-start" disabled={loading}>
              {loading ? 'Loading...' : 'Start Auction'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active auction view
  return (
    <div className="auction-page">
      <Header />
      <div className="auction-container">
        <div className="auction-layout">
          <div className="left-panel">
            <PlayerCard player={player} showDetails={true} />
          </div>

          <div className="right-panel">
            <div className="teams-bidding">
              {teams.map((team) => (
                <div key={team.id} className="team-bid-box">
                  <h3 className="team-name">{team.name}</h3>
                  <p className="current-bid">Current Bid: {bids[team.name]}</p>
                  <p className="budget-remaining">Budget: {team.budget}</p>
                  <button
                    onClick={() => handleBid(team.name)}
                    className="btn-bid"
                    disabled={team.budget < bids[team.name] + bidIncrement || playerResolved}
                  >
                    +{bidIncrement}
                  </button>
                </div>
              ))}
            </div>

            <AuctionControls
              bidIncrement={bidIncrement}
              setBidIncrement={setBidIncrement}
              onSold={handleSold}
              onUndo={handleUndo}
              disabled={loading || playerResolved}
            />

            <button
              onClick={handleUnsold}
              className="btn-unsold"
              disabled={loading || playerResolved}
            >
              Unsold
            </button>

            {/* 🟩 New: Manual Generate Button */}
            <button
              onClick={fetchNextPlayer}
              className="btn-generate"
              disabled={!playerResolved || loading}
            >
              🎲 Generate Next Player
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuctionPage;
