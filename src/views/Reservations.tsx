import React from 'react';
import type { Reservation } from '../types';

interface ReservationsProps {
  reservations: Reservation[];
}

const Reservations: React.FC<ReservationsProps> = ({ reservations }) => {

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
      <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
        <div>
          <h2 className="text-lg font-bold text-text-main">Reservations</h2>
          <p className="text-xs text-text-muted mt-1">Manage current and upcoming bookings</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <input type="text" placeholder="Search reservations..." className="border border-border rounded pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:border-primary w-64" />
            <svg className="w-3.5 h-3.5 text-text-muted absolute left-2.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <button className="bg-primary hover:bg-[#319795] text-white text-xs font-bold py-1.5 px-4 rounded transition-colors shadow-sm">
            + New Booking
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border text-xs text-text-muted uppercase tracking-wider">
              <th className="py-3 font-semibold">Booking ID</th>
              <th className="py-3 font-semibold">Guest</th>
              <th className="py-3 font-semibold">Loyalty</th>
              <th className="py-3 font-semibold">Room</th>
              <th className="py-3 font-semibold">Check In</th>
              <th className="py-3 font-semibold">Check Out</th>
              <th className="py-3 font-semibold text-right">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {reservations.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-text-muted">
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
