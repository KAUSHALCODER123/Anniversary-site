import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';
import { playSound } from '../../utils/audio';

interface Props {
    onNext: () => void;
}

export default function Step0_Proposal({ onNext }: Props) {
    const [noButtonPos, setNoButtonPos] = useState<{ top: string; left: string; position: 'relative' | 'absolute' }>({ top: '0px', left: '0px', position: 'relative' });
    const [isMoved, setIsMoved] = useState(false);

    const moveButton = () => {
        playSound('pop');
        const x = Math.random() * 200 - 100; // -100 to 100
        const y = Math.random() * 200 - 100; // -100 to 100
        setNoButtonPos({
            position: 'absolute',
            top: `${y}px`,
            left: `${x}px`,
        });
        setIsMoved(true);
    };

    const handleYes = () => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#fb7185', '#be123c', '#fff1f2'],
        });
        setTimeout(onNext, 1000);
    };

    return (
        <div className="flex flex-col items-center gap-8 relative">
            <div className="text-rose-500 animate-pulse">
                <Heart size={64} fill="currentColor" />
            </div>

            <h1 className="font-script text-4xl md:text-5xl font-bold text-rose-800 leading-tight">
                6 Years Later...
                <br />
                <span className="text-3xl md:text-4xl text-rose-600">Do you still love me?</span>
            </h1>

            <div className="flex gap-4 mt-8 justify-center w-full relative h-20 items-center">
                <button
                    onClick={handleYes}
                    className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-110 active:scale-95 z-10"
                >
                    Yes, Always!
                </button>

                <button
                    onMouseEnter={moveButton}
                    onClick={moveButton} // Fallback for mobile tap
                    style={{
                        ...noButtonPos,
                        transition: 'all 0.2s ease',
                    }}
                    className={`bg-gray-200 text-gray-500 font-medium py-3 px-8 rounded-full shadow-sm hover:bg-gray-300 ${isMoved ? 'absolute' : 'relative'}`}
                >
                    No
                </button>
            </div>
        </div>
    );
}
