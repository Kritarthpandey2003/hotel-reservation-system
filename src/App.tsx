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
    <div className="flex h-screen w-full bg-background font-sans text-text-main overflow-hidden">
      
      {/* Left Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-border hidden lg:flex flex-col flex-shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-text-main text-white flex items-center justify-center font-bold text-lg rounded">V</div>
            <div>
              <div className="font-bold text-sm tracking-widest uppercase leading-tight">Vertex</div>
              <div className="text-[10px] text-text-muted uppercase tracking-widest">Grand Hotel</div>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 py-4">
          <ul className="space-y-1">
            <li><a href="#" className="flex items-center px-6 py-2.5 text-sm font-medium text-text-muted hover:bg-gray-100 hover:text-text-main transition-colors"><svg className="w-5 h-5 mr-3 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg> Dashboard</a></li>
            <li><a href="#" className="flex items-center px-6 py-2.5 text-sm font-medium bg-blue-50 text-primary border-r-2 border-primary"><svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"></path></svg> Real-Time Allocation</a></li>
            <li><a href="#" className="flex items-center px-6 py-2.5 text-sm font-medium text-text-muted hover:bg-gray-100 hover:text-text-main transition-colors"><svg className="w-5 h-5 mr-3 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> Reservations</a></li>
            <li><a href="#" className="flex items-center px-6 py-2.5 text-sm font-medium text-text-muted hover:bg-gray-100 hover:text-text-main transition-colors"><svg className="w-5 h-5 mr-3 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg> Guest Profiles</a></li>
            <li><a href="#" className="flex items-center px-6 py-2.5 text-sm font-medium text-text-muted hover:bg-gray-100 hover:text-text-main transition-colors"><svg className="w-5 h-5 mr-3 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg> Housekeeping</a></li>
            <li><a href="#" className="flex items-center px-6 py-2.5 text-sm font-medium text-text-muted hover:bg-gray-100 hover:text-text-main transition-colors"><svg className="w-5 h-5 mr-3 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> Maintenance</a></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-6 flex-shrink-0">
          <h1 className="text-lg font-bold text-text-main">Room Allocation & Operations System</h1>
          
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block w-64">
              <input type="text" placeholder="Search Guest or Room..." className="w-full bg-background border border-border rounded-md pl-9 pr-3 py-1.5 text-sm focus:outline-none focus:border-primary" />
              <svg className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="text-text-muted hover:text-text-main relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              
              <div className="flex items-center gap-2 border-l border-border pl-4">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs">AJ</div>
                <div className="hidden sm:block">
                  <div className="text-xs font-bold leading-tight">Alice Johnson</div>
                  <div className="text-[10px] text-text-muted">Front Desk Manager</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-hidden flex flex-col xl:flex-row p-6 gap-6">
          
          {/* Left Grid Area (Scrollable) */}
          <div className="flex-[2.5] flex flex-col h-full overflow-y-auto pr-2 custom-scrollbar">
            <HotelGrid rooms={rooms} lastBookedRooms={lastBookedRooms} />
          </div>

          {/* Right Sidebar Area (Fixed/Scrollable) */}
          <div className="flex-1 w-full xl:max-w-sm flex flex-col h-full overflow-y-auto pr-2 custom-scrollbar">
            <Controls
              onBook={handleBook}
              onRandom={handleRandom}
              onReset={handleReset}
              error={error}
            />
          </div>

        </main>
      </div>

    </div>
  );
}

export default App;
