import React from 'react';
import type { Reservation } from '../types';

interface ReservationsProps {
  reservations: Reservation[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

const Reservations: React.FC<ReservationsProps> = ({ reservations, onRemove, onClear }) => {

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Checked In': return <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-[10px] font-bold uppercase tracking-wider">{status}</span>;
      case 'Confirmed': return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-[10px] font-bold uppercase tracking-wider">{status}</span>;
      case 'Checking Out': return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-[10px] font-bold uppercase tracking-wider">{status}</span>;
      default: return <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-[10px] font-bold uppercase tracking-wider">{status}</span>;
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-surface border border-border p-6 rounded-md shadow-sm">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-xl font-bold text-text-main">Reservations</h2>
          <p className="text-sm text-text-muted mt-1">Manage current and upcoming bookings</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input type="text" placeholder="Search reservations..." className="w-64 border border-border rounded pl-8 pr-3 py-1.5 text-xs text-text-main focus:outline-none focus:border-primary" />
            <svg className="w-3.5 h-3.5 text-text-muted absolute left-2.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          {reservations.length > 0 && (
            <button onClick={onClear} className="px-4 py-1.5 border border-red-200 text-red-500 hover:bg-red-50 text-xs font-bold rounded shadow-sm transition-colors">
              Clear All
            </button>
          )}
          <button className="px-4 py-1.5 bg-primary hover:bg-[#319795] text-white text-xs font-bold rounded shadow-sm transition-colors flex items-center gap-2">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            New Booking
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
              <tr className="text-left text-[10px] font-bold text-text-muted uppercase tracking-wider border-b border-border">
                <th className="pb-3 font-bold">Booking ID</th>
                <th className="pb-3 font-bold">Guest</th>
                <th className="pb-3 font-bold">Loyalty</th>
                <th className="pb-3 font-bold">Room</th>
                <th className="pb-3 font-bold">Check In</th>
                <th className="pb-3 font-bold">Check Out</th>
                <th className="pb-3 font-bold text-right">Status</th>
                <th className="pb-3 font-bold text-right w-16">Action</th>
              </tr>
          </thead>
          <tbody className="text-sm">
            {reservations.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-text-muted">
                  No reservations found. Book rooms in the Allocation dashboard to generate reservations.
                </td>
              </tr>
            ) : (
              reservations.map((res) => (
                <tr key={res.id} className="border-b border-border hover:bg-gray-50 transition-colors">
                  <td className="py-4 font-semibold text-primary">{res.id}</td>
                  <td className="py-4 font-medium text-text-main">{res.guestName}</td>
                  <td className="py-4"><span className="text-[10px] font-bold text-text-muted border border-border px-1.5 py-0.5 rounded uppercase">{res.tier}</span></td>
                  <td className="py-4 font-medium">{res.rooms.join(', ')}</td>
                  <td className="py-4 text-text-muted">{res.checkIn}</td>
                  <td className="py-4 text-text-muted">{res.checkOut}</td>
                  <td className="py-4 text-right">{getStatusBadge(res.status)}</td>
                  <td className="py-4 text-right">
                    <button onClick={() => onRemove(res.id)} className="text-text-muted hover:text-red-500 transition-colors" title="Remove Reservation">
                      <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 pt-4 border-t border-border flex justify-between items-center text-xs text-text-muted">
        <span>Showing {reservations.length} of {reservations.length} reservations</span>
        <div className="flex gap-1">
          <button className="px-2 py-1 border border-border rounded hover:bg-gray-50">Prev</button>
          <button className="px-2 py-1 border border-primary bg-primary text-white rounded">1</button>
          <button className="px-2 py-1 border border-border rounded hover:bg-gray-50">2</button>
          <button className="px-2 py-1 border border-border rounded hover:bg-gray-50">3</button>
          <button className="px-2 py-1 border border-border rounded hover:bg-gray-50">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
