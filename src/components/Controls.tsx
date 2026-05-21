import React, { useState } from 'react';
import type { Room } from '../types';

interface ControlsProps {
    rooms: Room[];
    lastBookedRooms: number[];
    onBook: (count: number) => void;
    onRandom: () => void;
    onReset: () => void;
    error: string | null;
}

const Controls: React.FC<ControlsProps> = ({ rooms, lastBookedRooms, onBook, onRandom, onReset, error }) => {
    const [count, setCount] = useState<number | string>('');

    const handleBookClick = () => {
        const num = typeof count === 'string' ? parseInt(count) || 1 : count;
        onBook(Math.max(1, Math.min(5, num)));
    };

    // Calculate dynamic stats
    const totalRooms = rooms.length;
    const occupiedRooms = rooms.filter(r => r.isBooked).length;
    const occupancyPct = totalRooms === 0 ? 0 : Math.round((occupiedRooms / totalRooms) * 100);

    return (
        <div className="flex flex-col gap-4 h-full">
            {/* Quick Allocation Form */}
            <div className="dashboard-card p-4">
                <h3 className="text-sm font-bold text-text-main mb-4">Quick Allocation Form</h3>
                
                <div className="space-y-3">
                    <div>
                        <label className="block text-[10px] font-bold text-text-muted mb-1 uppercase tracking-wider">
                            Rooms Required (Max 5)
                        </label>
                        <div className="relative">
                            <input 
                                type="number" 
                                min="1" 
                                max="5" 
                                value={count}
                                onChange={(e) => setCount(parseInt(e.target.value) || '')}
                                className="w-full border border-border rounded pl-8 pr-3 py-1.5 text-xs text-text-main focus:outline-none focus:border-primary"
                                placeholder="Number of Rooms"
                            />
                            <svg className="w-3.5 h-3.5 text-text-muted absolute left-2.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                        </div>
                    </div>

                    {error && (
                        <div className="text-[10px] text-red-500 font-medium">
                            {error}
                        </div>
                    )}

                    {!error && lastBookedRooms.length > 0 && (
                        <div className="text-[10px] text-primary font-bold bg-primary/10 p-2 rounded border border-primary/20">
                            Successfully allocated: {lastBookedRooms.join(', ')}
                        </div>
                    )}
                    
                    <button 
                        onClick={handleBookClick}
                        className="w-full bg-primary hover:bg-[#319795] text-white text-xs font-bold py-2 rounded transition-colors shadow-sm mt-2"
                    >
                        Allocate Rooms
                    </button>
                    
                    <div className="flex gap-2 mt-2">
                        <button 
                            onClick={onRandom}
                            className="flex-1 bg-white border border-border hover:bg-gray-50 text-text-main text-xs font-bold py-1.5 rounded transition-colors shadow-sm"
                        >
                            Randomize
                        </button>
                        <button 
                            onClick={onReset}
                            className="flex-1 bg-white border border-border hover:bg-gray-50 text-text-main text-xs font-bold py-1.5 rounded transition-colors shadow-sm"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            {/* Current Allocation Status */}
            <div className="dashboard-card p-4">
                <h3 className="text-sm font-bold text-text-main mb-4">Current Allocation Status</h3>
                
                <div className="flex justify-center mb-6 mt-2 relative">
                    <div className="w-24 h-24 rounded-full border-[10px] border-primary/20 relative flex items-center justify-center">
                        <div 
                            className="absolute inset-0 border-[10px] border-primary rounded-full transition-all duration-700" 
                            style={{ clipPath: `polygon(0 0, 100% 0, 100% ${occupancyPct}%, 0 ${occupancyPct}%)` }}
                        ></div>
                        <div className="text-center">
                            <div className="text-xl font-black text-text-main leading-none">{occupancyPct}%</div>
                            <div className="text-[8px] font-bold text-text-muted leading-tight mt-0.5">Occupied</div>
                            <div className="text-[7px] font-bold text-text-muted mt-0.5">{occupiedRooms} / {totalRooms} Rooms</div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between border-t border-border pt-4">
                    <div className="text-center">
                        <div className="text-[9px] font-bold text-text-muted uppercase tracking-wider mb-1">Today's<br/>Check-Ins</div>
                        <div className="text-sm font-black text-text-main">{occupiedRooms > 0 ? Math.floor(occupiedRooms * 0.4) : 0}</div>
                    </div>
                    <div className="text-center">
                        <div className="text-[9px] font-bold text-text-muted uppercase tracking-wider mb-1">Today's<br/>Check-Outs</div>
                        <div className="text-sm font-black text-text-main">{occupiedRooms > 0 ? Math.floor(occupiedRooms * 0.2) : 0}</div>
                    </div>
                    <div className="text-center">
                        <div className="text-[9px] font-bold text-text-muted uppercase tracking-wider mb-1">Maintenance<br/>Tasks</div>
                        <div className="text-sm font-black text-text-main">{occupiedRooms > 0 ? Math.floor(occupiedRooms * 0.1) : 0}</div>
                    </div>
                </div>
            </div>

            {/* Recent Activity Feed */}
            <div className="dashboard-card p-4 flex-1 flex flex-col">
                <h3 className="text-sm font-bold text-text-main mb-3">Recent Activity Feed</h3>
                <div className="flex flex-col gap-3 overflow-y-auto custom-scrollbar flex-1 pr-1">
                    <div className="text-[10px] text-text-main"><span className="font-bold text-text-muted w-10 inline-block">15:32</span> - Guest checked in to Room 205 (Ava M.)</div>
                    <div className="text-[10px] text-text-main"><span className="font-bold text-text-muted w-10 inline-block">15:28</span> - Room 310 marked for cleaning</div>
                    <div className="text-[10px] text-text-main"><span className="font-bold text-text-muted w-10 inline-block">15:28</span> - Guest checked in to Room 205 (Ava M.)</div>
                    <div className="text-[10px] text-text-main"><span className="font-bold text-text-muted w-10 inline-block">15:32</span> - Guest checked in to Room 205 (Ava M.)</div>
                    <div className="text-[10px] text-text-main"><span className="font-bold text-text-muted w-10 inline-block">15:28</span> - Room 310 marked for cleaning</div>
                </div>
            </div>
        </div>
    );
};

export default Controls;
