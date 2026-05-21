import React from 'react';
import type { GuestProfile } from '../types';

interface GuestProfilesProps {
  guests: GuestProfile[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

const GuestProfiles: React.FC<GuestProfilesProps> = ({ guests, onRemove, onClear }) => {

  const getTierColor = (tier: string) => {
    switch(tier) {
      case 'Platinum': return 'bg-slate-800 text-white border-slate-700';
      case 'Gold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Silver': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-white text-text-muted border-border';
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-surface border border-border p-6 rounded-md shadow-sm">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-xl font-bold text-text-main">Guest Profiles</h2>
          <p className="text-sm text-text-muted mt-1">Manage guest information, loyalty tiers, and stay history</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input type="text" placeholder="Search by name, email, or ID..." className="w-64 border border-border rounded pl-8 pr-3 py-1.5 text-xs text-text-main focus:outline-none focus:border-primary" />
            <svg className="w-3.5 h-3.5 text-text-muted absolute left-2.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          {guests.length > 0 && (
            <button onClick={onClear} className="px-4 py-1.5 border border-red-200 text-red-500 hover:bg-red-50 text-xs font-bold rounded shadow-sm transition-colors">
              Clear All
            </button>
          )}
          <button className="px-4 py-1.5 bg-primary hover:bg-[#319795] text-white text-xs font-bold rounded shadow-sm transition-colors flex items-center gap-2">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            Add Profile
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto custom-scrollbar">
        {guests.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-text-muted">
            <svg className="w-12 h-12 mb-3 text-border" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            <p>No guest profiles found.</p>
            <p className="text-xs">Profiles are automatically generated when bookings are made.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {guests.map((guest) => (
              <div key={guest.id} className="group border border-border rounded-md p-4 hover:shadow-md transition-shadow bg-white flex flex-col relative">
                
                <div className="flex justify-between items-start mb-3 pr-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                      {guest.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-text-main">{guest.name}</h3>
                      <div className="text-[10px] text-text-muted">{guest.id}</div>
                    </div>
                  </div>
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getTierColor(guest.tier)}`}>
                    {guest.tier}
                  </span>
                </div>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => onRemove(guest.id)} className="text-text-muted hover:text-red-500 bg-white shadow-sm border border-border rounded-full p-1.5 transition-colors" title="Remove Profile">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </div>

                <div className="space-y-2 mt-2 border-t border-border pt-3">
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    {guest.email}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    {guest.phone}
                  </div>
                </div>

                <div className="mt-4 bg-gray-50 rounded p-2 flex justify-between items-center border border-border/50">
                  <div className="text-center flex-1">
                    <div className="text-[9px] font-bold text-text-muted uppercase tracking-wider mb-0.5">Total Stays</div>
                    <div className="text-sm font-black text-text-main">{guest.stays}</div>
                  </div>
                  <div className="w-px h-6 bg-border"></div>
                  <div className="text-center flex-1">
                    <div className="text-[9px] font-bold text-text-muted uppercase tracking-wider mb-0.5">Reward Pts</div>
                    <div className="text-sm font-black text-primary">{guest.points}</div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GuestProfiles;
