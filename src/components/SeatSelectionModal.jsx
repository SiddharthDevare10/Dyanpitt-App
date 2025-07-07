import React, { useState, useEffect } from 'react';

const SeatSelectionModal = ({ isOpen, onClose, onSeatSelect, selectedSeats = [], maxSeats = 1 }) => {
  const [seats, setSeats] = useState([]);
  const [currentSelection, setCurrentSelection] = useState(selectedSeats);

  // Generate seat layout (example: 10 rows, 10 seats per row)
  useEffect(() => {
    const seatLayout = [];
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    
    rows.forEach(row => {
      for (let i = 1; i <= 10; i++) {
        const seatId = `${row}${i}`;
        seatLayout.push({
          id: seatId,
          row: row,
          number: i,
          isAvailable: Math.random() > 0.3, // Random availability for demo
          isSelected: selectedSeats.includes(seatId),
          price: row <= 'C' ? 150 : row <= 'F' ? 120 : 100 // Premium, standard, economy
        });
      }
    });
    
    setSeats(seatLayout);
  }, [selectedSeats]);

  const handleSeatClick = (seatId) => {
    const seat = seats.find(s => s.id === seatId);
    if (!seat.isAvailable) return;

    let newSelection = [...currentSelection];
    
    if (newSelection.includes(seatId)) {
      // Remove seat
      newSelection = newSelection.filter(id => id !== seatId);
    } else {
      // Add seat (check max limit)
      if (newSelection.length < maxSeats) {
        newSelection.push(seatId);
      } else {
        // Replace first seat if at max capacity
        newSelection = [seatId];
      }
    }
    
    setCurrentSelection(newSelection);
  };

  const handleConfirm = () => {
    const selectedSeatDetails = seats.filter(seat => currentSelection.includes(seat.id));
    onSeatSelect(selectedSeatDetails);
    onClose();
  };

  const getTotalPrice = () => {
    return seats
      .filter(seat => currentSelection.includes(seat.id))
      .reduce((total, seat) => total + seat.price, 0);
  };

  if (!isOpen) return null;

  return (
    <div className="seat-modal-overlay">
      <div className="seat-modal">
        <div className="seat-modal-header">
          <h3>Select Your Seats</h3>
          <button onClick={onClose} className="close-btn">×</button>
        </div>
        
        <div className="seat-legend">
          <div className="legend-item">
            <div className="seat available"></div>
            <span>Available</span>
          </div>
          <div className="legend-item">
            <div className="seat selected"></div>
            <span>Selected</span>
          </div>
          <div className="legend-item">
            <div className="seat occupied"></div>
            <span>Occupied</span>
          </div>
        </div>

        <div className="screen">SCREEN</div>
        
        <div className="seat-map">
          {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map(row => (
            <div key={row} className="seat-row">
              <span className="row-label">{row}</span>
              {seats
                .filter(seat => seat.row === row)
                .map(seat => (
                  <button
                    key={seat.id}
                    className={`seat ${
                      !seat.isAvailable ? 'occupied' : 
                      currentSelection.includes(seat.id) ? 'selected' : 'available'
                    }`}
                    onClick={() => handleSeatClick(seat.id)}
                    disabled={!seat.isAvailable}
                    title={`${seat.id} - ₹${seat.price}`}
                  >
                    {seat.number}
                  </button>
                ))}
            </div>
          ))}
        </div>

        <div className="seat-modal-footer">
          <div className="selection-info">
            <p>Selected: {currentSelection.join(', ')}</p>
            <p>Total: ₹{getTotalPrice()}</p>
          </div>
          <div className="modal-actions">
            <button onClick={onClose} className="btn-secondary">Cancel</button>
            <button 
              onClick={handleConfirm} 
              className="btn-primary"
              disabled={currentSelection.length === 0}
            >
              Confirm Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelectionModal;