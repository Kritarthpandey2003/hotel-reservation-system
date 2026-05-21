import React from 'react';
import type { Room } from '../types';

interface HotelGridProps {
    rooms: Room[];
    lastBookedRooms: number[];
}

const HotelGrid: React.FC<HotelGridProps> = ({ rooms, lastBookedRooms }) => {
    // Group rooms by floor (descending order 5 -> 1 to match mockup)
    // The mockup only shows 5 floors. Let's adjust to 5 floors for display or show all 10 grouped.
    const floors = Array.from({ length: 10 }, (_, i) => 10 - i);

    const getFloorName = (floor: number) => {
        if (floor >= 9) return "Penthouse & Suites";
        if (floor >= 7) return "Executive";
        return "Deluxe";
    };

    return (
        <div className="flex flex-col gap-6">
            
            {/* Filter Bar Mockup */}
            <div className="dashboard-card p-3 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-text-main font-medium">
                    <div className="flex items-center gap-2">
                        <span>Floors:</span>
                        <select className="border border-border rounded px-2 py-1 bg-white outline-none"><option>All [1-10]</option></select>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>Room Types:</span>
                        <select className="border border-border rounded px-2 py-1 bg-white outline-none"><option>All</option></select>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>View Status:</span>
                        <select className="border border-border rounded px-2 py-1 bg-white outline-none"><option>All Available/Occupied</option></select>
                    </div>
                </div>
                <button className="btn-dashboard">New Reservation</button>
            </div>

            {/* Room Grid */}
            <div className="flex flex-col gap-6">
                {floors.map((floorNum) => {
                    const floorRooms = rooms.filter(r => r.floor === floorNum).sort((a, b) => a.number - b.number);
                    if (floorRooms.length === 0) return null;

                    return (
                        <div key={floorNum}>
                            <h4 className="text-sm font-bold text-text-main mb-3">Floor {floorNum}: {getFloorName(floorNum)}</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-10 gap-2">
                                {floorRooms.map((room) => {
                                    const isRecentlyBooked = lastBookedRooms.includes(room.number);

                                    let bgClass = "bg-status-available text-text-main"; // Default Available (Green)
                                    let typeText = "Available";
                                    let icon = <svg className="w-3.5 h-3.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>;

                                    if (room.isBooked) {
                                        if (isRecentlyBooked) {
                                            bgClass = "bg-status-checkout text-text-main ring-2 ring-purple-400"; // Just Booked -> Purple
                                            typeText = "Just Booked";
                                            icon = <svg className="w-3.5 h-3.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;
                                        } else {
                                            bgClass = "bg-status-occupied text-text-main"; // Occupied -> Red
                                            typeText = "Occupied";
                                            icon = <svg className="w-3.5 h-3.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>;
                                        }
                                    }

                                    return (
                                        <div
                                            key={room.number}
                                            className={`h-20 p-2 rounded-md flex flex-col justify-between border border-black/5 hover:shadow-md transition-shadow cursor-pointer ${bgClass}`}
                                            title={`Room ${room.number} - ${typeText}`}
                                        >
                                            <div className="flex justify-between items-start">
                                                <span className="font-bold text-sm">{room.number}</span>
                                                {icon}
                                            </div>
                                            <div className="text-[10px] font-semibold leading-tight mt-1 opacity-80">
                                                {getFloorName(floorNum).split(' ')[0]}
                                                <br/>
                                                {typeText}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-border text-xs font-semibold text-text-main">
                 <div className="flex items-center gap-1.5"><div className="w-4 h-4 rounded bg-status-available border border-black/10"></div> Available</div>
                 <div className="flex items-center gap-1.5"><div className="w-4 h-4 rounded bg-status-occupied border border-black/10"></div> Occupied</div>
                 <div className="flex items-center gap-1.5"><div className="w-4 h-4 rounded bg-status-checkout border border-black/10"></div> Just Allocated</div>
                 <div className="flex items-center gap-1.5 opacity-50"><div className="w-4 h-4 rounded bg-status-cleaning border border-black/10"></div> Cleaning (N/A)</div>
                 <div className="flex items-center gap-1.5 opacity-50"><div className="w-4 h-4 rounded bg-status-maintenance border border-black/10"></div> Maintenance (N/A)</div>
            </div>
        </div>
    );
};

export default HotelGrid;
