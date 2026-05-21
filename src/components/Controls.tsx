import React, { useState } from 'react';

interface ControlsProps {
    onBook: (count: number) => void;
    onRandom: () => void;
    onReset: () => void;
    error: string | null;
}

const Controls: React.FC<ControlsProps> = ({ onBook, onRandom, onReset, error }) => {
    const [count, setCount] = useState<number | string>(1);

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
            if (parsed > 5) {
                setCount(5);
            } else if (parsed < 1) {
                setCount(parsed);
            } else {
                setCount(parsed);
            }
        }
    };

    const handleBlur = () => {
        let num = typeof count === 'string' ? parseInt(count) || 1 : count;
        num = Math.max(1, Math.min(5, num));
        setCount(num);
    };

    return (
        <div className="flex flex-col gap-5">
            {/* Quick Allocation Form Card */}
            <div className="dashboard-card p-5">
                <h3 className="text-lg font-bold text-text-main mb-4">Quick Allocation Form</h3>
                
                <div className="flex flex-col gap-4">
                    {/* Mock Guest Name Input */}
                    <div>
                        <label className="block text-xs font-semibold text-text-main mb-1.5">Guest Name</label>
                        <div className="relative">
                            <input type="text" placeholder="Guest Name..." className="dashboard-input pl-3 pr-8 py-2 text-sm" disabled />
                            <svg className="w-4 h-4 text-text-muted absolute right-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                    </div>

                    {/* Mock Dates */}
                    <div className="flex gap-3">
                        <div className="flex-1">
                            <label className="block text-xs font-semibold text-text-main mb-1.5">Check-In Date</label>
                            <div className="relative">
                                <input type="text" placeholder="Oct 26" className="dashboard-input pl-8 py-2 text-sm" disabled />
                                <svg className="w-4 h-4 text-text-muted absolute left-2.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            </div>
                        </div>
                        <div className="flex-1">
                            <label className="block text-xs font-semibold text-text-main mb-1.5">Check-Out Date</label>
                            <div className="relative">
                                <input type="text" placeholder="Oct 29" className="dashboard-input pl-8 py-2 text-sm" disabled />
                                <svg className="w-4 h-4 text-text-muted absolute left-2.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            </div>
                        </div>
                    </div>

                    {/* Room Units (Actual functionality) */}
                    <div>
                         <label className="block text-xs font-semibold text-text-main mb-1.5">Rooms Required (Max 5)</label>
                         <input
                            type="number"
                            min="1"
                            max="5"
                            value={count}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="dashboard-input py-2 text-sm"
                        />
                    </div>

                    <button onClick={handleBook} className="btn-dashboard w-full mt-2 py-2.5">
                        Find Room
                    </button>
                    
                    {error && (
                        <div className="mt-2 text-red-600 bg-red-50 text-sm p-3 rounded-md border border-red-200 font-medium">
                            {error}
                        </div>
                    )}
                </div>
            </div>

            {/* Current Allocation Status Mockup */}
            <div className="dashboard-card p-5">
                <h3 className="text-sm font-bold text-text-main mb-4">Current Allocation Status</h3>
                <div className="flex justify-center mb-6">
                    {/* CSS Donut Chart Mockup */}
                    <div className="relative w-32 h-32 rounded-full border-[12px] border-border border-t-primary border-r-primary flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-text-main">78%</div>
                            <div className="text-[10px] font-semibold text-text-muted uppercase">Occupied</div>
                        </div>
                    </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center divide-x divide-border border-t border-border pt-4">
                    <div>
                        <div className="text-xs font-semibold text-text-muted mb-1 leading-tight">Today's<br/>Check-Ins</div>
                        <div className="text-lg font-bold text-text-main">12</div>
                    </div>
                    <div>
                        <div className="text-xs font-semibold text-text-muted mb-1 leading-tight">Today's<br/>Check-Outs</div>
                        <div className="text-lg font-bold text-text-main">18</div>
                    </div>
                    <div>
                        <div className="text-xs font-semibold text-text-muted mb-1 leading-tight">Maintenance<br/>Tasks</div>
                        <div className="text-lg font-bold text-text-main">5</div>
                    </div>
                </div>
            </div>

            {/* Test Controls (Random/Reset) */}
             <div className="dashboard-card p-5">
                <h3 className="text-sm font-bold text-text-main mb-3">System Actions</h3>
                <div className="flex gap-3">
                    <button onClick={onRandom} className="btn-outline flex-1 py-2 text-xs">Simulate Data</button>
                    <button onClick={onReset} className="btn-outline flex-1 py-2 text-xs text-red-600 hover:bg-red-50 hover:border-red-200">Reset Grid</button>
                </div>
            </div>
        </div>
    );
};

export default Controls;
