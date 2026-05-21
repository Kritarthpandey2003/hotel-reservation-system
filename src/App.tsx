import { useState, useEffect } from 'react';
import HotelGrid from './components/HotelGrid';
import Controls from './components/Controls';
import Reservations from './views/Reservations';
import GuestProfiles from './views/GuestProfiles';
import Maintenance from './views/Maintenance';
import { generateInitialRooms, generateRandomOccupancy, findOptimalRooms } from './utils/bookingLogic';
import type { Room } from './types';
import './index.css';

function App() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [lastBookedRooms, setLastBookedRooms] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('allocation');

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
      <aside className="w-[220px] bg-sidebar border-r border-border hidden lg:flex flex-col flex-shrink-0 z-20">
        <div className="h-16 flex items-center px-5 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 relative flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full text-primary" fill="currentColor">
                 <path d="M10,20 L90,20 L50,90 Z" opacity="0.2"></path>
                 <path d="M20,20 L80,20 L50,80 Z" fill="none" stroke="currentColor" strokeWidth="8"></path>
                 <path d="M35,20 L65,20 L50,55 Z"></path>
              </svg>
            </div>
            <div>
              <div className="font-bold text-sm tracking-widest uppercase leading-tight text-text-main">System</div>
              <div className="text-[9px] text-text-muted uppercase tracking-widest font-semibold">Dashboard</div>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 py-4">
          <ul className="space-y-1">
            <li>
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center px-5 py-2.5 text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-[#e6f7f6] text-primary border-r-2 border-primary' : 'text-text-muted hover:bg-gray-50 hover:text-text-main'}`}
              >
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg> Dashboard
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('allocation')}
                className={`w-full flex items-center px-5 py-2.5 text-sm font-medium transition-colors ${activeTab === 'allocation' ? 'bg-[#e6f7f6] text-primary border-r-2 border-primary' : 'text-text-muted hover:bg-gray-50 hover:text-text-main'}`}
              >
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg> Real-Time Allocation
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('reservations')}
                className={`w-full flex items-center px-5 py-2.5 text-sm font-medium transition-colors ${activeTab === 'reservations' ? 'bg-[#e6f7f6] text-primary border-r-2 border-primary' : 'text-text-muted hover:bg-gray-50 hover:text-text-main'}`}
              >
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> Reservations
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('profiles')}
                className={`w-full flex items-center px-5 py-2.5 text-sm font-medium transition-colors ${activeTab === 'profiles' ? 'bg-[#e6f7f6] text-primary border-r-2 border-primary' : 'text-text-muted hover:bg-gray-50 hover:text-text-main'}`}
              >
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg> Guest Profiles
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('maintenance')}
                className={`w-full flex items-center px-5 py-2.5 text-sm font-medium transition-colors ${activeTab === 'maintenance' ? 'bg-[#e6f7f6] text-primary border-r-2 border-primary' : 'text-text-muted hover:bg-gray-50 hover:text-text-main'}`}
              >
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> Maintenance
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-5 flex-shrink-0 z-10">
          <h1 className="text-xl font-bold text-text-main">Hotel Allocation System</h1>
          
          <div className="flex items-center gap-5">
            <div className="relative hidden md:block w-64">
              <input type="text" placeholder="Search Guest or Room..." className="w-full bg-white border border-border rounded-full pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:border-primary text-text-main placeholder-text-muted" />
              <svg className="w-3.5 h-3.5 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="text-text-muted hover:text-text-main relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                <span className="absolute top-0 right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
              </button>
              
              <div className="flex items-center gap-2 border-l border-border pl-4 cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-border flex-shrink-0 flex items-center justify-center text-text-muted">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </div>
                <div className="hidden sm:block text-left mr-1">
                  <div className="text-xs font-bold leading-tight">Admin User</div>
                  <div className="text-[9px] font-semibold text-text-muted">System Manager</div>
                </div>
                <svg className="w-3.5 h-3.5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-hidden flex p-4 gap-4 bg-background">
          
          {activeTab === 'allocation' && (
            <>
              {/* Column 1: Main Grid Area (Scrollable) */}
              <div className="flex-[3.5] flex flex-col h-full overflow-y-auto pr-1 custom-scrollbar">
                <HotelGrid rooms={rooms} lastBookedRooms={lastBookedRooms} />
              </div>

              {/* Column 2: Floor Overview (Fixed/Scrollable) */}
              <div className="w-44 flex-shrink-0 flex flex-col h-full overflow-y-auto pr-1 custom-scrollbar">
                <div className="dashboard-card p-4 h-full">
                  <h3 className="text-sm font-bold text-text-main mb-4">Floor Overview</h3>
                  
                  <div className="flex flex-col gap-4">
                    {Array.from({ length: 10 }, (_, i) => 10 - i).map(floor => {
                      const floorRooms = rooms.filter(r => r.floor === floor);
                      const total = floorRooms.length;
                      const available = floorRooms.filter(r => !r.isBooked).length;
                      const pct = total === 0 ? 0 : Math.round((available / total) * 100);

                      return (
                        <div key={floor} className="flex flex-col gap-1.5">
                          <div className="text-xs font-bold text-text-main">Floor {floor}</div>
                          <div className="flex gap-1 h-3 bg-gray-200 rounded-sm overflow-hidden">
                            <div 
                              className="h-full bg-status-available rounded-sm transition-all duration-500"
                              style={{ width: `${pct}%` }}
                            ></div>
                          </div>
                          <div className="text-[9px] font-semibold text-text-muted">{available}/{total} Available</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Column 3: Right Panel (Fixed/Scrollable) */}
              <div className="w-64 flex-shrink-0 flex flex-col h-full overflow-y-auto pr-1 custom-scrollbar">
                <Controls
                  rooms={rooms}
                  lastBookedRooms={lastBookedRooms}
                  onBook={handleBook}
                  onRandom={handleRandom}
                  onReset={handleReset}
                  error={error}
                />
              </div>
            </>
          )}

          {activeTab === 'reservations' && <Reservations />}
          {activeTab === 'profiles' && <GuestProfiles />}
          {activeTab === 'maintenance' && <Maintenance />}
          
          {(activeTab === 'dashboard' || activeTab === 'reports' || activeTab === 'settings' || activeTab === 'housekeeping') && (
            <div className="flex-1 flex flex-col items-center justify-center bg-surface border border-border rounded-md shadow-sm">
               <svg className="w-16 h-16 text-primary/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
               <h2 className="text-xl font-bold text-text-main">Feature Under Development</h2>
               <p className="text-sm text-text-muted mt-2">The {activeTab} view will be available in the next release.</p>
               <button onClick={() => setActiveTab('allocation')} className="mt-6 px-6 py-2 bg-primary hover:bg-[#319795] text-white text-sm font-bold rounded shadow-sm transition-colors">
                 Back to Allocation
               </button>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}

export default App;
