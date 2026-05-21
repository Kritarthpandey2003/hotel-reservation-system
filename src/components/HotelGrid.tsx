import React from 'react';
import type { Room } from '../types';

interface HotelGridProps {
    rooms: Room[];
}

const HotelGrid: React.FC<HotelGridProps> = ({ rooms }) => {
    // The mockup uses 5 floors
    const floors = [5, 4, 3, 2, 1];

    const getFloorName = (floor: number) => {
        if (floor === 5) return "Penthouse & Suites";
        if (floor === 4) return "Executive";
        return "Deluxe";
    };

    return (
        <div className="flex flex-col gap-5 w-full bg-surface border border-border p-5 rounded-md shadow-sm">
            
            {/* Filter Bar */}
            <div className="flex flex-wrap gap-4 items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-4 text-xs text-text-main font-semibold">
                    <div className="flex items-center gap-2">
                        <span>Floors:</span>
                        <select className="border border-border rounded px-2 py-1 bg-white outline-none focus:border-primary">
                            <option>All [1-5]</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>Room Types:</span>
                        <select className="border border-border rounded px-2 py-1 bg-white outline-none focus:border-primary">
                            <option>All</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>View Status:</span>
                        <select className="border border-border rounded px-2 py-1 bg-white outline-none focus:border-primary">
                            <option>All Available/Occupied/Maintenance</option>
                        </select>
                    </div>
                </div>
                <button className="btn-dashboard">New Reservation</button>
            </div>

            {/* Room Grid */}
            <div className="flex flex-col gap-6">
                {floors.map((floorNum) => {
                    // For UI match, we take some specific rooms
                    const floorRooms = rooms.filter(r => r.floor === floorNum).sort((a, b) => a.number - b.number).slice(0, 10);
                    if (floorRooms.length === 0) return null;

                    return (
                        <div key={floorNum}>
                            <h4 className="text-sm font-bold text-text-main mb-2">Floor {floorNum}: {getFloorName(floorNum)}</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 relative">
                                {floorRooms.map((room) => {
                                    // MOCK DATA for exact UI match
                                    let bgClass = "bg-status-available"; 
                                    let typeText = "Available";
                                    let icon = <svg className="w-3.5 h-3.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>;
                                    let guestText = null;
                                    const isTargetRoom = room.number === 308;

                                    if (room.number === 302 || room.number === 304 || room.number === 308) {
                                        bgClass = "bg-status-occupied";
                                        typeText = "Occupied";
                                        guestText = <><div className="font-bold">Liam W.</div><div>Oct 26 - Oct 29</div></>;
                                        icon = <svg className="w-3.5 h-3.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>;
                                    } else if (room.number === 307 || room.number === 310 && floorNum === 4) {
                                        bgClass = "bg-status-cleaning";
                                        typeText = "Cleaning";
                                        icon = <svg className="w-3.5 h-3.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.121 14.121L19 19m-7-7l-7-7m7 7l-3.536 3.536a2 2 0 01-2.828 0l-1.414-1.414a2 2 0 010-2.828L7.757 7.757m7.071 7.071l3.536-3.536a2 2 0 000-2.828l-1.414-1.414a2 2 0 00-2.828 0l-3.536 3.536"></path></svg>; // mock broom
                                    } else if (room.number === 354) {
                                        bgClass = "bg-status-maintenance";
                                        typeText = "Maintenance";
                                        icon = <svg className="w-3.5 h-3.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path></svg>;
                                    } else if (room.number === 309 || room.number === 310 || room.number === 319) {
                                        bgClass = "bg-status-checkout";
                                        typeText = "Check-Out";
                                        icon = <svg className="w-3.5 h-3.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;
                                    }

                                    return (
                                        <div
                                            key={room.number}
                                            className={`h-24 p-2 rounded flex flex-col justify-between border border-black/5 hover:shadow-md transition-shadow relative ${bgClass} text-text-main`}
                                        >
                                            <div className="flex justify-between items-start">
                                                <span className="font-bold text-xs">{room.number}</span>
                                                {icon}
                                            </div>
                                            
                                            <div className="mt-auto">
                                                <div className="text-[10px] font-bold leading-tight opacity-90 mb-0.5">
                                                    {room.number >= 350 ? "Penthouse" : "Deluxe"}
                                                </div>
                                                <div className="text-[9px] font-medium opacity-80 leading-tight">
                                                    {!guestText && typeText}
                                                    {guestText && guestText}
                                                </div>
                                            </div>

                                            {/* Mock Popover exactly as shown in screenshot on Room 308 */}
                                            {isTargetRoom && (
                                                <div className="absolute top-1/2 left-3/4 bg-white border border-border shadow-popover rounded-md py-1 z-10 w-40 text-xs font-medium">
                                                    <button className="w-full text-left px-3 py-1.5 hover:bg-gray-50 flex items-center gap-2">
                                                        <svg className="w-3.5 h-3.5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg> Guest Details
                                                    </button>
                                                    <button className="w-full text-left px-3 py-1.5 hover:bg-gray-50 flex items-center gap-2">
                                                        <svg className="w-3.5 h-3.5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg> Check-Out
                                                    </button>
                                                    <button className="w-full text-left px-3 py-1.5 hover:bg-gray-50 flex items-center gap-2">
                                                        <svg className="w-3.5 h-3.5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg> Move Room
                                                    </button>
                                                    <button className="w-full text-left px-3 py-1.5 hover:bg-gray-50 flex items-center gap-2">
                                                        <svg className="w-3.5 h-3.5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.121 14.121L19 19m-7-7l-7-7m7 7l-3.536 3.536a2 2 0 01-2.828 0l-1.414-1.414a2 2 0 010-2.828L7.757 7.757m7.071 7.071l3.536-3.536a2 2 0 000-2.828l-1.414-1.414a2 2 0 00-2.828 0l-3.536 3.536"></path></svg> Maintenance Request
                                                    </button>
                                                </div>
                                            )}
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
                 <div className="flex items-center gap-1.5"><div className="w-4 h-4 rounded bg-status-cleaning border border-black/10"></div> Cleaning In Progress</div>
                 <div className="flex items-center gap-1.5"><div className="w-4 h-4 rounded bg-status-maintenance border border-black/10"></div> Maintenance Required</div>
                 <div className="flex items-center gap-1.5"><div className="w-4 h-4 rounded bg-status-checkout border border-black/10"></div> Upcoming Check-Out</div>
            </div>
        </div>
    );
};

export default HotelGrid;
