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
    setRooms(generateInitialRooms());
  }, []);

  const handleBook = (count: number) => {
    setError(null);
    const bookedRoomNumbers = findOptimalRooms(rooms, count);

    if (!bookedRoomNumbers) {
      setError(`Cannot find ${count} suitable rooms matching the criteria.`);
      return;
    }

    setRooms(prev => prev.map(r => {
      if (bookedRoomNumbers.includes(r.number)) {
        return { ...r, isBooked: true };
      }
      return r;
    }));
    setLastBookedRooms(bookedRoomNumbers);
  };

  const handleRandom = () => {
    setRooms(generateRandomOccupancy(generateInitialRooms()));
    setLastBookedRooms([]);
    setError(null);
  };

  const handleReset = () => {
    setRooms(generateInitialRooms());
    setLastBookedRooms([]);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col xl:flex-row items-center justify-center p-4 md:p-8 font-sans text-white overflow-hidden relative selection:bg-primary/30">
      
      {/* Background Deep Space Particles / Glow */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-accent-purple/10 rounded-full blur-[120px] animate-spin-slow mix-blend-screen"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-primary/10 rounded-full blur-[100px] animate-spin-slow mix-blend-screen" style={{ animationDirection: 'reverse' }}></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBmaWxsPSJub25lIj48cGF0aCBkPSJNMCA0MGw0MC00MCIvPjxwYXRoIGQ9Ik00MCA0MEwwIDAiLz48L2c+PC9zdmc+')] opacity-20"></div>
      </div>

      {/* Floating HUD Controls */}
      <div className="w-full xl:w-[450px] flex-shrink-0 z-20 xl:mr-10 animate-slide-up">
        
        <div className="mb-10 text-center xl:text-left relative">
          <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full opacity-50"></div>
          <h1 className="relative font-display text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-primary to-accent-cyan tracking-tighter uppercase drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
            Holo-Grid
          </h1>
          <p className="relative text-primary font-bold tracking-widest uppercase mt-2 text-sm drop-shadow-md">
            Allocation System v3.0
          </p>
        </div>

        <div className="mb-8 glass-panel p-5 rounded-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary shadow-glow-primary"></div>
            <p className="flex items-center gap-3 mb-2 font-display text-sm font-bold tracking-widest uppercase text-gray-300">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Directives
            </p>
            <ul className="text-gray-400 space-y-1.5 ml-7 text-xs font-medium tracking-wide">
              <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-accent-purple shadow-glow-primary"></div> Floor clustering priority.</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-primary shadow-glow-primary"></div> Traversal distance minimized.</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-white shadow-glow-primary"></div> Max occupancy: 5 units.</li>
            </ul>
        </div>

        <Controls
          onBook={handleBook}
          onRandom={handleRandom}
          onReset={handleReset}
          error={error}
        />

        {/* HUD Booking Success */}
        {lastBookedRooms.length > 0 && (
          <div className="mt-8 bg-emerald-950/40 border border-emerald-500/50 p-5 rounded-xl backdrop-blur-md animate-slide-up shadow-glow-emerald relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-[40px] -mr-16 -mt-16 pointer-events-none"></div>
            <h3 className="text-emerald-400 font-bold text-sm tracking-widest uppercase mb-3 flex items-center gap-2 font-display">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Allocation Confirmed
            </h3>
            <div className="flex flex-wrap gap-2">
              {lastBookedRooms.map((num, i) => (
                <div
                  key={num}
                  className="w-10 h-10 flex items-center justify-center text-emerald-100 font-black text-sm rounded bg-emerald-600/30 border border-emerald-400/50 shadow-[inset_0_0_10px_rgba(16,185,129,0.5)] animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {num}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Panel: 3D Visualization */}
      <div className="flex-1 w-full max-w-[800px] mt-12 xl:mt-0 z-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <HotelGrid rooms={rooms} lastBookedRooms={lastBookedRooms} />
      </div>

    </div>
  );
}

export default App;
