import React, { useState } from 'react';
import type { Room } from '../types';

interface HotelGridProps {
    rooms: Room[];
    lastBookedRooms: number[];
}

const HotelGrid: React.FC<HotelGridProps> = ({ rooms, lastBookedRooms }) => {
    const [filterFloor, setFilterFloor] = useState<string>('All');
    const [filterStatus, setFilterStatus] = useState<string>('All');

    // Original logic: 10 floors
    const floors = Array.from({ length: 10 }, (_, i) => 10 - i);

    const getFloorName = (floor: number) => {
        if (floor >= 9) return "Penthouse & Suites";
        if (floor >= 7) return "Executive";
        return "Deluxe";
    };

    return (
        <div className="flex flex-col gap-5 w-full bg-surface border border-border p-5 rounded-md shadow-sm">
            
            {/* Filter Bar */}
            <div className="flex flex-wrap gap-4 items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-4 text-xs text-text-main font-semibold">
                    <div className="flex items-center gap-2">
                        <span>Floors:</span>
                        <select 
                            value={filterFloor}
                            onChange={(e) => setFilterFloor(e.target.value)}
                            className="border border-border rounded px-2 py-1 bg-white outline-none focus:border-primary"
                        >
                            <option value="All">All [1-10]</option>
                            {floors.map(f => <option key={f} value={f.toString()}>Floor {f}</option>)}
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>View Status:</span>
                        <select 
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="border border-border rounded px-2 py-1 bg-white outline-none focus:border-primary"
                        >
                            <option value="All">All Available/Occupied</option>
                            <option value="Available">Available Only</option>
                            <option value="Occupied">Occupied Only</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Room Grid */}
            <div className="flex flex-col gap-6">
                {floors.map((floorNum) => {
                    // Apply Floor Filter
                    if (filterFloor !== 'All' && filterFloor !== floorNum.toString()) return null;

                    let floorRooms = rooms.filter(r => r.floor === floorNum).sort((a, b) => a.number - b.number);
                    
                    // Apply Status Filter
                    if (filterStatus === 'Available') floorRooms = floorRooms.filter(r => !r.isBooked);
                    if (filterStatus === 'Occupied') floorRooms = floorRooms.filter(r => r.isBooked);

                    if (floorRooms.length === 0) return null;

                    return (
                        <div key={floorNum}>
                            <h4 className="text-sm font-bold text-text-main mb-2">Floor {floorNum}: {getFloorName(floorNum)}</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-2 relative">
                                {floorRooms.map((room) => {
                                    // Dynamic Logic
                                    let bgClass = "bg-status-available"; 
                                    let typeText = "Available";
                                    let icon = <svg className="w-3.5 h-3.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>;

                                    if (lastBookedRooms.includes(room.number)) {
                                        bgClass = "bg-primary text-white"; // Special Highlight
                                        typeText = "Just Allocated";
                                        icon = <svg className="w-3.5 h-3.5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>;
                                    } else if (room.isBooked) {
                                        bgClass = "bg-status-occupied";
                                        typeText = "Occupied";
                                        icon = <svg className="w-3.5 h-3.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>;
                                    } 

                                    return (
                                        <div
                                            key={room.number}
                                            className={`h-20 p-2 rounded flex flex-col justify-between border border-black/5 hover:shadow-md transition-shadow relative ${bgClass} text-text-main`}
                                        >
                                            <div className="flex justify-between items-start">
                                                <span className="font-bold text-xs">{room.number}</span>
                                                {icon}
                                            </div>
                                            
                                            <div className="mt-auto">
                                                <div className="text-[10px] font-bold leading-tight opacity-90 mb-0.5">
                                                    {getFloorName(floorNum).split(' ')[0]}
                                                </div>
                                                <div className="text-[9px] font-medium opacity-80 leading-tight">
                                                    {typeText}
                                                </div>
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
            <div className="flex flex-wrap gap-4 mt-2 pt-4 text-xs font-semibold text-text-main">
                 <div className="flex items-center gap-1.5"><div className="w-4 h-4 rounded bg-status-available border border-black/10"></div> Available</div>
                 <div className="flex items-center gap-1.5"><div className="w-4 h-4 rounded bg-status-occupied border border-black/10"></div> Occupied</div>
                 <div className="flex items-center gap-1.5"><div className="w-4 h-4 rounded bg-primary border border-black/10"></div> Just Allocated</div>
            </div>
        </div>
    );
};

export default HotelGrid;
