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
        <div className="flex flex-col gap-6 p-6 sm:p-8 bg-black/60 rounded-2xl w-full relative overflow-hidden group transition-all duration-500 border border-white/10 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.8)]">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-[60px] -mr-24 -mt-24 pointer-events-none group-hover:bg-primary/20 transition-colors duration-500"></div>

            <div className="relative z-10">
                <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3 font-display tracking-widest uppercase">
                    <span className="w-1 h-6 bg-gradient-to-b from-accent-cyan to-primary shadow-glow-primary"></span>
                    Terminal Input
                </h3>

                <div className="flex flex-col gap-4 relative z-20">
                    <label className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
                        Required Units
                    </label>
                    <div className="flex flex-col sm:flex-row items-stretch gap-4">
                        <div className="relative flex-1 sm:max-w-[150px] group/input">
                            <input
                                type="number"
                                min="1"
                                max="5"
                                value={count}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="w-full bg-black/80 border border-white/20 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3.5 text-xl font-bold text-center relative z-20 transition-all text-cyan-50 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] outline-none"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold tracking-widest text-gray-600 pointer-events-none z-30 group-focus-within/input:text-primary transition-colors">MAX:5</div>
                        </div>
                        <button
                            onClick={handleBook}
                            className="bg-primary hover:bg-cyan-400 text-black py-3.5 px-8 rounded-lg text-sm flex-1 cursor-pointer font-black font-display tracking-widest uppercase relative overflow-hidden group/book shadow-glow-primary transition-colors"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Execute Allocation
                                <svg className="w-4 h-4 group-hover/book:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="mt-5 text-rose-300 text-xs font-bold tracking-widest uppercase bg-rose-950/50 p-4 rounded-lg border border-rose-500/50 animate-shake flex items-center gap-3 relative z-20 shadow-[0_0_15px_rgba(225,29,72,0.4)]">
                        <svg className="w-5 h-5 flex-shrink-0 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span>{error}</span>
                    </div>
                )}

                <div className="h-px bg-gradient-to-r from-primary/50 via-white/10 to-transparent my-8 opacity-50"></div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-20">
                    <button
                        onClick={onRandom}
                        className="group/random relative overflow-hidden bg-accent-purple/20 hover:bg-accent-purple/40 border border-accent-purple/50 text-accent-purple font-bold text-xs tracking-widest uppercase py-3.5 rounded-lg transition-all hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] active:scale-95 cursor-pointer z-30"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2 pointer-events-none">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                            Chaos Gen
                        </span>
                    </button>
                    <button
                        onClick={onReset}
                        className="bg-white/5 hover:bg-white/10 border border-white/20 text-gray-400 font-bold text-xs tracking-widest uppercase py-3.5 rounded-lg transition-colors hover:text-white active:scale-95 cursor-pointer z-30"
                    >
                        System Purge
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Controls;
