import React from 'react';
import type { Room } from '../types';

interface HotelGridProps {
    rooms: Room[];
    lastBookedRooms: number[];
}

const HotelGrid: React.FC<HotelGridProps> = ({ rooms, lastBookedRooms }) => {
    // Group rooms by floor (descending order 10 -> 1)
    const floors = Array.from({ length: 10 }, (_, i) => 10 - i);

    return (
        <div className="flex flex-col items-center justify-center p-4 sm:p-8 w-full h-[600px] relative preserve-3d">
            
            {/* Holographic Header */}
            <div className="absolute top-0 left-0 w-full flex justify-between items-start z-50">
                <h2 className="text-3xl font-extrabold font-display tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-white drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] uppercase">
                    Sector Grid
                </h2>
                
                {/* Neon Legend */}
                <div className="hidden sm:flex flex-col gap-3 text-xs font-bold tracking-widest text-gray-400 uppercase bg-black/50 p-4 rounded-xl border border-white/10 backdrop-blur-md">
                    <div className="flex items-center gap-3 group">
                        <div className="w-4 h-4 bg-primary border border-cyan-300 shadow-glow-primary"></div> 
                        <span className="group-hover:text-cyan-400 transition-colors">Available</span>
                    </div>
                    <div className="flex items-center gap-3 group">
                        <div className="w-4 h-4 bg-accent-rose border border-rose-300 shadow-glow-rose"></div> 
                        <span className="group-hover:text-rose-400 transition-colors">Occupied</span>
                    </div>
                    <div className="flex items-center gap-3 group">
                        <div className="w-4 h-4 bg-accent-amber border border-amber-300 animate-pulse shadow-glow-amber"></div> 
                        <span className="group-hover:text-amber-400 transition-colors">New Alloc</span>
                    </div>
                </div>
            </div>

            {/* 3D Isometric Container */}
            <div className="isometric-grid mt-16 scale-75 md:scale-90 lg:scale-100">
                
                {/* The 3D Base/Pedestal */}
                <div className="absolute -inset-10 bg-surface-glass border border-white/5 shadow-3d-base rounded-3xl -z-10 translate-z-[-20px]"></div>
                
                {/* Decorative Grid Lines on Base */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] -z-10 translate-z-[-10px] pointer-events-none opacity-50"></div>

                <div className="flex flex-col gap-4">
                    {floors.map((floorNum) => (
                        <div key={floorNum} className="flex items-center gap-6 preserve-3d group">
                            
                            {/* Elevator Shaft (3D Pillar) */}
                            <div className="cube-3d w-16 h-12 flex flex-col items-center justify-center bg-gray-900 text-gray-300 font-display text-sm border border-gray-700 shadow-lg translate-z-[10px] group-hover:translate-z-[15px] transition-transform duration-500">
                                <span className="font-bold text-accent-amber">F{floorNum}</span>
                            </div>

                            {/* Rooms (3D Voxels) */}
                            <div className="flex gap-4 preserve-3d">
                                {rooms
                                    .filter(r => r.floor === floorNum)
                                    .sort((a, b) => a.number - b.number)
                                    .map((room) => {
                                        const isRecentlyBooked = lastBookedRooms.includes(room.number);

                                        let materialClasses = "";
                                        let animationClass = "";

                                        if (room.isBooked) {
                                            if (isRecentlyBooked) {
                                                // New Booking - Electric Gold Bouncing
                                                materialClasses = "bg-accent-amber border-amber-300 text-amber-950 shadow-glow-amber";
                                                animationClass = "animate-bounce-3d";
                                            } else {
                                                // Booked - Neon Crimson Elevated
                                                materialClasses = "bg-accent-rose border-rose-400 text-white shadow-[0_10px_20px_rgba(225,29,72,0.6)]";
                                                animationClass = "translate-z-[20px]";
                                            }
                                        } else {
                                            // Available - Holographic Cyan Flat
                                            materialClasses = "bg-primary/80 border-cyan-400 text-white hover:bg-primary hover:shadow-glow-primary hover:translate-z-[5px]";
                                            animationClass = "translate-z-[0px]";
                                        }

                                        return (
                                            <div
                                                key={room.number}
                                                className={`
                                                  cube-3d w-12 h-12 flex items-center justify-center 
                                                  text-xs font-extrabold font-display border
                                                  transition-all duration-500 cursor-default
                                                  ${materialClasses} ${animationClass}
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
            
            {/* Mobile Legend (Fallback) */}
            <div className="flex sm:hidden absolute bottom-4 w-full justify-center gap-4 text-[10px] font-bold text-gray-300 uppercase bg-black/50 py-2 px-4 rounded-full border border-white/10 backdrop-blur-md">
                 <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-primary shadow-glow-primary"></div> Avail</div>
                 <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-accent-rose shadow-glow-rose"></div> Booked</div>
                 <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-accent-amber animate-pulse shadow-glow-amber"></div> New</div>
            </div>
        </div>
    );
};

export default HotelGrid;
