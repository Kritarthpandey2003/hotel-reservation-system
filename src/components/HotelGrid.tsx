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
        <div className="flex flex-col gap-3 p-6 sm:p-8 glass-panel rounded-2xl relative overflow-hidden h-full">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-cyan via-primary to-accent-purple"></div>
            
            <div className="flex items-center justify-between mb-6 relative z-10">
                <h2 className="text-3xl font-extrabold font-display tracking-tight text-white flex items-center gap-3">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 drop-shadow-sm">
                        Hotel Layout
                    </span>
                </h2>
                
                {/* Legend moved to top for better visibility */}
                <div className="hidden sm:flex items-center gap-5 text-sm font-medium text-gray-300 bg-black/30 py-2 px-5 rounded-full border border-white/5 backdrop-blur-sm">
                    <div className="flex items-center gap-2 group">
                        <div className="w-3.5 h-3.5 bg-emerald-500 rounded-full shadow-glow-emerald group-hover:scale-110 transition-transform"></div> 
                        <span className="group-hover:text-white transition-colors">Available</span>
                    </div>
                    <div className="flex items-center gap-2 group">
                        <div className="w-3.5 h-3.5 bg-rose-500 rounded-full shadow-glow-rose group-hover:scale-110 transition-transform"></div> 
                        <span className="group-hover:text-white transition-colors">Booked</span>
                    </div>
                    <div className="flex items-center gap-2 group">
                        <div className="w-3.5 h-3.5 bg-amber-500 rounded-full animate-pulse shadow-glow-amber group-hover:scale-110 transition-transform"></div> 
                        <span className="group-hover:text-white transition-colors">Just Booked</span>
                    </div>
                </div>
            </div>

            {/* Mobile Legend */}
            <div className="flex sm:hidden justify-center gap-4 text-xs font-medium text-gray-300 mb-4 bg-black/30 py-2 px-4 rounded-full border border-white/5 backdrop-blur-sm mx-auto">
                 <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-emerald-500 rounded-full shadow-glow-emerald"></div> Avail</div>
                 <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-rose-500 rounded-full shadow-glow-rose"></div> Booked</div>
                 <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse shadow-glow-amber"></div> New</div>
            </div>

            <div className="flex flex-col gap-3 relative z-10 w-full overflow-x-auto pb-4">
                <div className="min-w-max pr-4">
                    {floors.map((floorNum) => (
                        <div key={floorNum} className="flex items-center gap-4 group hover:bg-white/5 p-2 -mx-2 rounded-xl transition-all duration-300">
                            {/* Floor Label / Lift Shaft */}
                            <div className="w-16 h-12 flex flex-col items-center justify-center bg-gray-900/80 text-gray-300 rounded-xl font-display text-sm border-l-[3px] border-accent-amber shadow-lg relative group-hover:scale-105 group-hover:bg-gray-800 transition-all duration-300 group-hover:shadow-glow-amber">
                                <span className="text-[0.6rem] font-bold text-gray-500 uppercase tracking-widest absolute -top-1.5 bg-background px-1 rounded">Lift</span>
                                <span className="font-bold">F{floorNum}</span>
                            </div>

                            {/* Rooms */}
                            <div className="flex gap-2">
                                {rooms
                                    .filter(r => r.floor === floorNum)
                                    .sort((a, b) => a.number - b.number)
                                    .map((room) => {
                                        const isRecentlyBooked = lastBookedRooms.includes(room.number);

                                        let stateClasses = "";
                                        if (room.isBooked) {
                                            if (isRecentlyBooked) {
                                                // Just Booked - Glowing Amber
                                                stateClasses = "bg-gradient-to-br from-amber-400 to-amber-600 border-amber-300 text-white shadow-glow-amber ring-2 ring-amber-500/50 z-20 scale-105";
                                            } else {
                                                // Booked - Deep Rose
                                                stateClasses = "bg-gradient-to-br from-rose-900 to-rose-950 border-rose-800/50 text-rose-200 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] opacity-80";
                                            }
                                        } else {
                                            // Available - Emerald
                                            stateClasses = "bg-gradient-to-br from-emerald-500 to-emerald-700 border-emerald-400 text-white shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_2px_5px_rgba(0,0,0,0.3)] hover:shadow-glow-emerald";
                                        }

                                        return (
                                            <div
                                                key={room.number}
                                                className={`
                                                  w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center 
                                                  text-sm sm:text-base font-extrabold font-display rounded-xl border-t border-l
                                                  transition-all duration-300 cursor-default
                                                  hover:-translate-y-1 hover:z-30 
                                                  ${stateClasses}
                                                `}
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
            </div>
            
            {/* Architectural decorative element */}
            <div className="absolute right-8 bottom-0 w-32 h-64 border-r border-white/5 pointer-events-none"></div>
            <div className="absolute right-24 bottom-0 w-16 h-32 border-r border-white/5 pointer-events-none"></div>
        </div>
    );
};

export default HotelGrid;
