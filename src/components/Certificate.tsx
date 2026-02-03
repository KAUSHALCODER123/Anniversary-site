import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { Download, Heart } from 'lucide-react';

export default function Certificate() {
    const certRef = useRef<HTMLDivElement>(null);

    const handleDownload = async () => {
        if (certRef.current) {
            const canvas = await html2canvas(certRef.current, {
                scale: 2,
                backgroundColor: null,
            });
            const link = document.createElement('a');
            link.download = 'Our-Love-Certificate.png';
            link.href = canvas.toDataURL();
            link.click();
        }
    };

    return (
        <div className="flex flex-col items-center gap-6">

            <div
                ref={certRef}
                className="relative bg-gradient-to-br from-rose-50 to-white border-8 border-double border-rose-200 p-8 md:p-12 rounded-lg text-center shadow-2xl max-w-md mx-auto"
                style={{ fontFamily: '"Inter", sans-serif' }}
            >
                <div className="absolute top-4 left-4 text-rose-300">
                    <Heart size={32} />
                </div>
                <div className="absolute bottom-4 right-4 text-rose-300">
                    <Heart size={32} />
                </div>

                <h1 className="font-script text-5xl text-rose-600 mb-2">Certificate of Love</h1>
                <p className="text-gray-500 uppercase tracking-widest text-xs mb-8">Official Document</p>

                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    This certifies that <br />
                    <span className="font-bold text-2xl text-rose-800">Us</span> <br />
                    have successfully completed another year of love, laughter, and beautiful memories.
                </p>

                <p className="font-script text-2xl text-rose-500">
                    Forever & Always
                </p>

                <div className="mt-8 pt-4 border-t border-rose-100 flex justify-center gap-12 w-full text-xs text-gray-400">
                    <div>Date: {new Date().toLocaleDateString()}</div>
                    <div>Signed with Love</div>
                </div>
            </div>

            <button
                onClick={handleDownload}
                className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105"
            >
                <Download size={20} />
                Save our Moment
            </button>

        </div>
    );
}
