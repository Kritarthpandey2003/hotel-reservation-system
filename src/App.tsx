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
    setRooms(generateRandomOccupancy(generateInitialRooms())); // Reset and randomize
    setLastBookedRooms([]);
    setError(null);
  };

  const handleReset = () => {
    setRooms(generateInitialRooms());
    setLastBookedRooms([]);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-8 font-sans text-white overflow-hidden relative selection:bg-accent-cyan/30">
      {/* Background Elements - Deep glowing orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[10%] -left-[5%] w-[40vw] h-[40vw] max-w-2xl max-h-2xl bg-accent-purple/20 rounded-full blur-[120px] mix-blend-screen animate-float"></div>
        <div className="absolute bottom-[5%] right-[0%] w-[35vw] h-[35vw] max-w-xl max-h-xl bg-accent-cyan/15 rounded-full blur-[100px] mix-blend-screen animate-float" style={{ animationDelay: '2s', animationDuration: '8s' }}></div>
        <div className="absolute top-[40%] left-[30%] w-[20vw] h-[20vw] max-w-md max-h-md bg-primary-glow rounded-full blur-[80px] mix-blend-screen animate-pulse-slow"></div>
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBmaWxsPSJub25lIj48cGF0aCBkPSJNMCA0MGw0MC00MCIvPjxwYXRoIGQ9Ik00MCA0MEwwIDAiLz48L2c+PC9zdmc+')] opacity-50 z-0"></div>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 xl:gap-12 items-start relative z-10 max-w-7xl w-full mx-auto">
        {/* Left Panel: Description & Controls */}
        <div className="flex flex-col gap-8 flex-1 w-full animate-slide-up">
          <div className="text-left">
            <h1 className="font-display text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-blue-400 to-accent-purple mb-3 tracking-tight pb-2">
              Hotel Allocation
            </h1>
            <p className="text-gray-400 text-lg md:text-xl font-light">
              Smart room assignment with minimal travel time.
            </p>
            <div className="h-1.5 w-24 bg-gradient-to-r from-accent-cyan to-transparent rounded-full mt-6 shadow-glow-primary"></div>
          </div>

          <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:border-white/20 transition-colors duration-500">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent-cyan/10 to-accent-purple/10 blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative z-10">
              <p className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <strong className="text-white font-display text-lg tracking-wide">Allocation Rules</strong>
              </p>
              <ul className="text-gray-300 space-y-2 ml-7">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-purple"></div> Single floor priority.</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-cyan"></div> Minimize travel time (horizontal + vertical).</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary"></div> Maximum 5 rooms per booking.</li>
              </ul>
            </div>
          </div>

          <Controls
            onBook={handleBook}
            onRandom={handleRandom}
            onReset={handleReset}
            error={error}
          />

          {/* Booking Result Feedback */}
          {lastBookedRooms.length > 0 && (
            <div className="bg-emerald-900/20 border border-emerald-500/30 p-6 rounded-2xl backdrop-blur-md animate-slide-up shadow-glow-emerald relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[40px] -mr-16 -mt-16 pointer-events-none"></div>
              <h3 className="text-accent-emerald font-bold text-xl mb-3 flex items-center gap-2 font-display">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Booking Successful!
              </h3>
              <p className="text-gray-300 text-sm mb-4">Allocated Rooms:</p>
              <div className="flex flex-wrap gap-3">
                {lastBookedRooms.map((num, i) => (
                  <div
                    key={num}
                    className="w-14 h-14 flex items-center justify-center text-white font-extrabold text-lg rounded-xl shadow-lg animate-pulse"
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.4), 0 4px 6px -4px rgba(16, 185, 129, 0.4)',
                      animationDelay: `${i * 0.1}s`
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
        <div className="flex-[1.5] w-full animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <HotelGrid rooms={rooms} lastBookedRooms={lastBookedRooms} />
        </div>
      </div>
    </div>
  );
}

export default App;
