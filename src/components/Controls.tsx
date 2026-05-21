import React, { useState } from 'react';

interface ControlsProps {
    onBook: (count: number) => void;
    onRandom: () => void;
    onReset: () => void;
    error: string | null;
}

const Controls: React.FC<ControlsProps> = ({ onBook, onRandom, onReset, error }) => {
    const [count, setCount] = useState<number | string>('');

    const handleBook = () => {
        const num = typeof count === 'string' ? parseInt(count) || 1 : count;
        onBook(Math.max(1, Math.min(5, num)));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (val === '') {
            setCount('');
            return;
        }
        const parsed = parseInt(val);
        if (!isNaN(parsed)) {
            if (parsed > 5) setCount(5);
            else if (parsed < 1) setCount(parsed);
            else setCount(parsed);
        }
    };

    const handleBlur = () => {
        if (count === '') return;
        let num = typeof count === 'string' ? parseInt(count) || 1 : count;
        num = Math.max(1, Math.min(5, num));
        setCount(num);
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Quick Allocation Form Card */}
            <div className="dashboard-card p-4">
                <h3 className="text-sm font-bold text-text-main mb-3">Quick Allocation Form</h3>
                
                <div className="flex flex-col gap-3">
                    <div>
                        <label className="block text-xs font-semibold text-text-main mb-1">Guest Name</label>
                        <div className="relative">
                            <input type="text" placeholder="Guest Name..." className="dashboard-input text-xs pl-2.5 pr-8" disabled />
                            <svg className="w-3.5 h-3.5 text-text-muted absolute right-2.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <div className="flex-1">
                            <label className="block text-xs font-semibold text-text-main mb-1">Check-In Date</label>
                            <div className="relative">
                                <input type="text" placeholder="Oct 26" className="dashboard-input text-xs pl-7" disabled />
                                <svg className="w-3.5 h-3.5 text-text-muted absolute left-2 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            </div>
                        </div>
                        <div className="flex-1">
                            <label className="block text-xs font-semibold text-text-main mb-1">Check-Out Date</label>
                            <div className="relative">
                                <input type="text" placeholder="Oct 29" className="dashboard-input text-xs pl-7" disabled />
                                <svg className="w-3.5 h-3.5 text-text-muted absolute left-2 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-text-main mb-1">Room Type Preference</label>
                        <select className="dashboard-input text-xs appearance-none">
                            <option>Room Preference</option>
                        </select>
                    </div>

                    <div>
                        <select className="dashboard-input text-xs appearance-none">
                            <option>Floor Preference</option>
                        </select>
                    </div>

                    {/* Hidden input used for actual functionality */}
                    <div className="hidden">
                         <input type="number" min="1" max="5" value={count} onChange={handleChange} onBlur={handleBlur} />
                    </div>

                    <button onClick={handleBook} className="btn-dashboard w-full mt-1">
                        Find Room
                    </button>
                    
                    {error && (
                        <div className="mt-2 text-red-600 bg-red-50 text-xs p-2 rounded border border-red-200 font-medium">
                            {error}
                        </div>
                    )}
                </div>
            </div>

            {/* Current Allocation Status */}
            <div className="dashboard-card p-4">
                <h3 className="text-sm font-bold text-text-main mb-4">Current Allocation Status</h3>
                <div className="flex justify-center mb-5">
                    {/* CSS Donut Chart */}
                    <div className="relative w-24 h-24 rounded-full border-[8px] border-border border-t-primary border-r-primary border-b-primary flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-xl font-bold text-text-main leading-tight">78%</div>
                            <div className="text-[9px] font-semibold text-text-main">Occupied</div>
                            <div className="text-[8px] font-medium text-text-muted">136 / 200 Rooms</div>
                        </div>
                    </div>
                </div>
                
                <div className="flex justify-between gap-1 text-center divide-x divide-border border-t border-border pt-3">
                    <div className="flex-1">
                        <div className="text-[10px] font-bold text-text-main mb-1 leading-tight">Today's<br/>Check-Ins</div>
                        <div className="text-lg font-bold text-text-main">12</div>
                    </div>
                    <div className="flex-1">
                        <div className="text-[10px] font-bold text-text-main mb-1 leading-tight">Today's<br/>Check-Outs</div>
                        <div className="text-lg font-bold text-text-main">18</div>
                    </div>
                    <div className="flex-1">
                        <div className="text-[10px] font-bold text-text-main mb-1 leading-tight">Maintenance<br/>Tasks</div>
                        <div className="text-lg font-bold text-text-main">5</div>
                    </div>
                </div>
            </div>

            {/* Recent Activity Feed */}
            <div className="dashboard-card p-4 flex-1">
                <h3 className="text-sm font-bold text-text-main mb-3">Recent Activity Feed</h3>
                <div className="flex flex-col gap-2.5 text-[10px] text-text-main font-semibold">
                    <div className="flex gap-2">
                        <span className="text-text-muted w-10">15:32</span>
                        <span>- Guest checked in to Room 205 (Ava M.)</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-text-muted w-10">15:28</span>
                        <span>- Room 310 marked for cleaning</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-text-muted w-10">15:28</span>
                        <span>- Guest checked in to Room 205 (Ava M.)</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-text-muted w-10">15:32</span>
                        <span>- Guest checked in to Room 205 (Ava M.)</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-text-muted w-10">15:28</span>
                        <span>- Room 310 marked for cleaning</span>
                    </div>
                </div>
            </div>
            
            {/* Hidden Controls for testing without cluttering UI */}
            <div className="hidden gap-2">
                <button onClick={onRandom} className="btn-outline">Rand</button>
                <button onClick={onReset} className="btn-outline">Reset</button>
            </div>
        </div>
    );
};

export default Controls;
