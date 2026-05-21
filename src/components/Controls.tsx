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
        <div className="flex flex-col gap-6 p-8 glass-panel rounded-2xl w-full relative overflow-hidden group transition-all duration-500 hover:shadow-glow-primary">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px] -mr-16 -mt-16 pointer-events-none group-hover:bg-primary/20 transition-colors duration-500"></div>

            <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 font-display">
                    <span className="w-1.5 h-8 bg-gradient-to-b from-accent-cyan to-primary rounded-full shadow-glow-primary"></span>
                    Reservation
                </h3>

                <div className="flex flex-col gap-4 relative z-20">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Number of Rooms</label>
                    <div className="flex flex-col sm:flex-row items-stretch gap-4">
                        <div className="relative flex-1 sm:max-w-[150px]">
                            <input
                                type="number"
                                min="1"
                                max="5"
                                value={count}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="glass-input w-full rounded-xl px-4 py-3.5 text-xl font-bold text-center relative z-20"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-500 pointer-events-none z-30">MAX 5</div>
                        </div>
                        <button
                            onClick={handleBook}
                            className="btn-primary py-3.5 px-8 rounded-xl text-lg flex-1 cursor-pointer font-display tracking-wide relative overflow-hidden group/book"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Book Now
                                <svg className="w-5 h-5 group-hover/book:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/book:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="mt-5 text-accent-rose text-sm bg-rose-900/20 p-4 rounded-xl border border-rose-500/30 animate-shake flex items-center gap-3 backdrop-blur-md relative z-20 shadow-glow-rose">
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span className="font-medium">{error}</span>
                    </div>
                )}

                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-8"></div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-20">
                    <button
                        onClick={onRandom}
                        className="group/random relative overflow-hidden bg-accent-purple/10 hover:bg-accent-purple/20 border border-accent-purple/30 text-accent-purple font-semibold py-3.5 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] active:scale-95 cursor-pointer z-30"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2 pointer-events-none">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                            Randomize
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/0 via-accent-purple/20 to-accent-purple/0 translate-x-[-100%] group-hover/random:translate-x-[100%] transition-transform duration-700 pointer-events-none"></div>
                    </button>
                    <button
                        onClick={onReset}
                        className="bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-semibold py-3.5 rounded-xl transition-colors hover:text-white active:scale-95 cursor-pointer z-30"
                    >
                        Reset System
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Controls;
