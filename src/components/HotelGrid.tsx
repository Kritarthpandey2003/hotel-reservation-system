import React from 'react';
import type { Room } from '../types';

interface HotelGridProps {
    rooms: Room[];
    lastBookedRooms: number[]; // For highlighting recent booking
}

const HotelGrid: React.FC<HotelGridProps> = ({ rooms, lastBookedRooms }) => {
    // Group rooms by floor (descending order 10 -> 1)
    const floors = Array.from({ length: 10 }, (_, i) => 10 - i);

    return (
        <div className="flex flex-col gap-2 p-8 glass-panel rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
            <h2 className="text-3xl font-extrabold text-white mb-6 text-center tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">
                    Hotel Layout
                </span>
            </h2>
            <div className="flex flex-col gap-3">
                {floors.map((floorNum) => (
                    <div key={floorNum} className="flex items-center gap-6 group hover:bg-white/5 p-2 rounded-lg transition-colors">
                        {/* Floor Label / Lift Shaft */}
                        <div className="w-16 h-12 flex items-center justify-center bg-gray-800/80 text-gray-300 rounded-lg font-mono text-sm border-l-4 border-yellow-500 shadow-lg relative group-hover:scale-105 transition-transform">
                            <span className="text-xs absolute -top-2 left-1 text-gray-500">Lift</span>
                            Fl {floorNum}
                        </div>

                        {/* Rooms */}
                        <div className="flex gap-2">
                            {rooms
                                .filter(r => r.floor === floorNum)
                                .sort((a, b) => a.number - b.number) // Ensure sorted left (stairs) to right
                                .map((room) => {
                                    const isRecentlyBooked = lastBookedRooms.includes(room.number);

                                    // Robust coloring logic
                                    const bgColor = room.isBooked
                                        ? (isRecentlyBooked ? '#fbbf24' : '#dc2626') // Amber or Red
                                        : '#16a34a'; // Green

                                    const borderColor = room.isBooked
                                        ? (isRecentlyBooked ? '#f59e0b' : '#b91c1c')
                                        : '#15803d';

                                    return (
                                        <div
                                            key={room.number}
                                            className={`
                                              w-12 h-12 flex items-center justify-center 
                                              text-sm font-extrabold transition-all duration-300
                                              text-white cursor-default
                                              hover:scale-105 hover:z-10 shadow-lg
                                            `}
                                            style={{
                                                backgroundColor: bgColor,
                                                border: `3px solid ${borderColor}`,
                                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)'
                                            }}
                                            title={`Room ${room.number} ${room.isBooked ? '(Booked)' : '(Available)'}`}
                                        >
                                            {room.number}
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-6 mt-6 text-sm text-gray-300 bg-black/40 p-3 rounded-full border border-white/10 w-fit mx-auto backdrop-blur-md">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-600 border border-green-400 rounded shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div> Available
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-600 border border-red-400 rounded shadow-[0_0_5px_rgba(239,68,68,0.5)]"></div> Booked
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-500 border border-yellow-300 rounded animate-pulse shadow-[0_0_5px_rgba(234,179,8,0.5)]"></div> Just Booked
                </div>
            </div>
        </div>
    );
};

export default HotelGrid;
