import React from 'react';
import './AuctionControls.css';

function AuctionControls({ bidIncrement, setBidIncrement, onSold, onUndo, disabled }) {
  return (
    <div className="auction-controls">
      <div className="bid-increment-control">
        <label htmlFor="bid-increment">Bid Increment:</label>
        <input
          id="bid-increment"
          type="number"
          min="10"
          value={bidIncrement}
          onChange={(e) => setBidIncrement(Number(e.target.value))}
          disabled={disabled}
        />
      </div>
      <div className="action-buttons">
        <button
          onClick={onSold}
          disabled={disabled}
          className="btn-sold"
        >
          ✅ SOLD
        </button>
        <button
          onClick={onUndo}
          disabled={disabled}
          className="btn-undo"
        >
          ↶ Undo
        </button>
      </div>
    </div>
  );
}

export default AuctionControls;

