import React, { useState, useEffect } from 'react';
import { differenceInDays, differenceInHours, differenceInSeconds } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';

interface Props {
    onNext: () => void;
}

export default function Step1_TimeMachine({ onNext }: Props) {
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [timeStats, setTimeStats] = useState({ days: 0, hours: 0, seconds: 0 });
    const [showStats, setShowStats] = useState(false);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;

        if (selectedDate) {
            const calculateTime = () => {
                const start = new Date(selectedDate);
                const now = new Date();

                // Basic difference logic (not perfect overlapping, but gives the stats requested)
                const days = differenceInDays(now, start);
                const hours = differenceInHours(now, start) % 24;
                const seconds = differenceInSeconds(now, start) % 60;

                setTimeStats({ days, hours, seconds });
                setShowStats(true);
            };

            calculateTime();
            interval = setInterval(calculateTime, 1000);
        }

        return () => clearInterval(interval);
    }, [selectedDate]);

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="text-rose-500">
                <Clock size={48} />
            </div>

            <h2 className="font-script text-4xl text-rose-800">The Time Machine</h2>
            <p className="text-gray-600">When did our magic begin?</p>

            <div className="relative">
                <input
                    type="date"
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="bg-white/50 border border-rose-200 rounded-lg px-4 py-2 text-rose-800 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
                <Calendar className="absolute right-3 top-2.5 text-rose-400 pointer-events-none" size={20} />
            </div>

            {showStats && (
                <div className="mt-4 animate-fade-in space-y-4">
                    <p className="text-lg text-gray-700">
                        We've shared <br />
                        <span className="font-bold text-2xl text-rose-600">{timeStats.days.toLocaleString()} days</span>, <br />
                        <span className="font-bold text-xl text-rose-500">{timeStats.hours} hours</span>, and <br />
                        <span className="font-bold text-xl text-rose-500">{timeStats.seconds} seconds</span> <br />
                        of magic.
                    </p>

                    <button
                        onClick={onNext}
                        className="mt-6 bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition transform hover:scale-105"
                    >
                        Discover Your Gifts
                    </button>
                </div>
            )}
        </div>
    );
}
