import { useState, useEffect } from 'react';
import HotelGrid from './components/HotelGrid';
import Controls from './components/Controls';
import { generateInitialRooms, generateRandomOccupancy, findOptimalRooms } from './utils/bookingLogic';
import type { Room } from './types';
import './index.css';

function App() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [lastBookedRooms, setLastBookedRooms] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize rooms
    setRooms(generateInitialRooms());
  }, []);

  const handleBook = (count: number) => {
    setError(null);
    const bookedRoomNumbers = findOptimalRooms(rooms, count);

    if (!bookedRoomNumbers) {
      setError(`Cannot find ${count} suitable rooms matching the criteria.`);
      return;
    }

    // Update rooms
    setRooms(prev => prev.map(r => {
      if (bookedRoomNumbers.includes(r.number)) {
        return { ...r, isBooked: true };
      }
      return r;
    }));

    setLastBookedRooms(bookedRoomNumbers);
  };

  const handleRandom = () => {
    setRooms(prev => generateRandomOccupancy(generateInitialRooms())); // Reset and randomize
    setLastBookedRooms([]);
    setError(null);
  };

  const handleReset = () => {
    setRooms(generateInitialRooms());
    setLastBookedRooms([]);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black flex items-center justify-center p-8 font-inter text-white overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-600/30 rounded-full blur-[100px] animate-float"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start relative z-50 max-w-6xl w-full">
        {/* Left Panel: Description & Controls */}
        <div className="flex flex-col gap-6 flex-1">
          <div className="text-left">
            <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
              Hotel Booking
            </h1>
            <p className="text-gray-400 text-lg">
              Optimized Room Allocation System
            </p>
            <div className="h-1 w-20 bg-blue-500 rounded mt-4"></div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 text-sm text-gray-300 space-y-2">
            <p><strong className="text-white">Rules:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Single floor priority.</li>
              <li>Minimize travel time (horizontal + vertical).</li>
              <li>Max 5 rooms per booking.</li>
            </ul>
          </div>

          <Controls
            onBook={handleBook}
            onRandom={handleRandom}
            onReset={handleReset}
            error={error}
          />

          {/* Booking Result Feedback */}
          {lastBookedRooms.length > 0 && (
            <div className="bg-green-500/10 border border-green-500/30 p-6 rounded-xl backdrop-blur-md animate-float">
              <h3 className="text-green-400 font-bold mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Booking Successful!
              </h3>
              <p className="text-gray-300 text-sm mb-3">Allocated Rooms:</p>
              <div className="flex flex-wrap gap-3">
                {lastBookedRooms.map(num => (
                  <div
                    key={num}
                    className="w-12 h-12 flex items-center justify-center text-white font-bold shadow-lg animate-pulse"
                    style={{
                      backgroundColor: '#16a34a', // Green
                      border: '3px solid #15803d',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)'
                    }}
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Panel: Visualization */}
        <div className="flex-2">
          <HotelGrid rooms={rooms} lastBookedRooms={lastBookedRooms} />
        </div>
      </div>
    </div>
  );
}

export default App;
