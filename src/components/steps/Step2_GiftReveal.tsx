import React, { useState, useRef, useEffect } from 'react';
import { Gift, Camera, Music, Type, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound } from '../../utils/audio';

interface Props {
    onNext: () => void;
}

export default function Step2_GiftReveal({ onNext }: Props) {
    const [openGift, setOpenGift] = useState<number | null>(null);
    const [scratchPercent, setScratchPercent] = useState(0);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [lyricsRevealed, setLyricsRevealed] = useState(false);
    const [typedText, setTypedText] = useState('');
    const fullMessage = "Every moment with you is a gift I cherish forever. Happy Anniversary, my love! ❤️";

    // Typewriter effect
    useEffect(() => {
        if (openGift === 1) {
            setTypedText('');
            let i = 0;
            const interval = setInterval(() => {
                setTypedText(fullMessage.slice(0, i + 1));
                i++;
                if (i === fullMessage.length) clearInterval(interval);
            }, 50);
            return () => clearInterval(interval);
        }
    }, [openGift]);

    // Scratch Effect Initialization
    useEffect(() => {
        if (openGift === 2 && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Fill with silver overlay
            ctx.fillStyle = '#cbd5e1'; // slate-300
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = '20px Inter, sans-serif';
            ctx.fillStyle = '#64748b';
            ctx.fillText('Scratch Me!', 80, 150);

            // Scratch logic
            let isDrawing = false;
            const scratch = (e: MouseEvent | TouchEvent) => {
                if (!isDrawing) return;
                const rect = canvas.getBoundingClientRect();
                const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
                const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
                const x = clientX - rect.left;
                const y = clientY - rect.top;

                ctx.globalCompositeOperation = 'destination-out';
                ctx.beginPath();
                ctx.arc(x, y, 20, 0, Math.PI * 2);
                ctx.fill();

                // Check percentage cleared (simplified)
                // In real app, we check pixel data. Here we assume after some moves it's done or user clicks button.
            };

            canvas.addEventListener('mousedown', () => isDrawing = true);
            canvas.addEventListener('mouseup', () => isDrawing = false);
            canvas.addEventListener('mousemove', scratch as any);
            canvas.addEventListener('touchstart', () => isDrawing = true);
            canvas.addEventListener('touchend', () => isDrawing = false);
            canvas.addEventListener('touchmove', scratch as any);
        }
    }, [openGift]);

    return (
        <div className="flex flex-col items-center gap-6 w-full">
            <h2 className="font-script text-4xl text-rose-800 mb-4">Unwrap Your Gifts</h2>

            <div className="grid grid-cols-3 gap-4 w-full">
                {[1, 2, 3].map((num) => (
                    <motion.button
                        key={num}
                        onClick={() => {
                            setOpenGift(num);
                            playSound('sparkle');
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-4 rounded-xl shadow-lg flex flex-col items-center gap-2 transition ${openGift === num ? 'bg-rose-500 text-white' : 'bg-white text-rose-500'
                            }`}
                    >
                        <div className="text-3xl">
                            {num === 1 && <Type size={24} />}
                            {num === 2 && <Camera size={24} />}
                            {num === 3 && <Music size={24} />}
                        </div>
                        <span className="font-bold text-sm">Gift {num}</span>
                    </motion.button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {openGift === 1 && (
                    <motion.div
                        key="gift1"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="w-full bg-white/60 p-6 rounded-lg shadow-inner min-h-[100px] flex items-center justify-center"
                    >
                        <p className="font-script text-2xl text-rose-900 leading-relaxed">
                            {typedText}
                        </p>
                    </motion.div>
                )}

                {openGift === 2 && (
                    <motion.div
                        key="gift2"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative w-64 h-80 bg-white p-2 shadow-2xl rotate-2"
                    >
                        {/* Underlying Image */}
                        <div className="absolute inset-2 z-0">
                            <img src="/images/uploaded_media_0_1770156721896.jpg" alt="Memory" className="w-full h-full object-cover" />
                        </div>
                        {/* Canvas Overlay */}
                        <canvas
                            ref={canvasRef}
                            width={240}
                            height={300} // Approximate inner size
                            className="absolute inset-2 z-10 cursor-pointer touch-none"
                        />
                    </motion.div>
                )}

                {openGift === 3 && (
                    <motion.div
                        key="gift3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-full bg-rose-50 p-6 rounded-lg text-center"
                    >
                        <p className="text-xl text-rose-800 mb-4 italic">"Tere haath mein mera haath ho, saari jannatein mere saath hon..."</p>

                        {!lyricsRevealed ? (
                            <button
                                onClick={() => setLyricsRevealed(true)}
                                className="bg-rose-500 text-white px-6 py-2 rounded-full font-bold hover:bg-rose-600 transition"
                            >
                                Complete the Lyric
                            </button>
                        ) : (
                            <motion.p
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="font-script text-3xl text-rose-600 mt-4 font-bold"
                            >
                                "Tu jo paas ho..."
                            </motion.p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={onNext}
                className="mt-8 bg-gray-800 hover:bg-black text-white px-8 py-3 rounded-full font-bold shadow-xl mx-auto block"
            >
                Claim Your Certificate
            </button>
        </div>
    );
}
