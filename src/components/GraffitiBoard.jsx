import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SprayCan, Eraser } from 'lucide-react';

export default function GraffitiBoard({ isOpen, onClose }) {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('#FF00FF');
    const [tool, setTool] = useState('spray'); // 'spray' | 'eraser'

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const ctx = canvas.getContext('2d');
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
        }
    }, [isOpen]);

    const startDrawing = (e) => {
        setIsDrawing(true);
        draw(e);
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        // Reset path
        const ctx = canvasRef.current.getContext('2d');
        ctx.beginPath();
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const x = e.clientX;
        const y = e.clientY;

        if (tool === 'spray') {
            // Spray Paint Effect
            ctx.fillStyle = color;

            // Draw multiple dots for spray effect
            const density = 40;
            const radius = 20;

            for (let i = 0; i < density; i++) {
                const angle = Math.random() * Math.PI * 2;
                const r = Math.random() * radius;
                const offsetX = Math.cos(angle) * r;
                const offsetY = Math.sin(angle) * r;

                ctx.fillRect(x + offsetX, y + offsetY, 1, 1);
            }
        } else {
            // Eraser
            ctx.globalCompositeOperation = 'destination-out';
            ctx.lineWidth = 40;
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.globalCompositeOperation = 'source-over';
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 cursor-crosshair"
                >
                    {/* Controls */}
                    <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md rounded-full p-2 flex gap-4 z-50 border border-white/20">
                        <button
                            onClick={() => setTool('spray')}
                            className={`p-3 rounded-full transition-all ${tool === 'spray' ? 'bg-indigo-600' : 'hover:bg-white/10'}`}
                        >
                            <SprayCan className="w-5 h-5 text-white" />
                        </button>
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="w-10 h-10 rounded-full border-none bg-transparent cursor-pointer"
                        />
                        <button
                            onClick={() => setTool('eraser')}
                            className={`p-3 rounded-full transition-all ${tool === 'eraser' ? 'bg-red-500' : 'hover:bg-white/10'}`}
                        >
                            <Eraser className="w-5 h-5 text-white" />
                        </button>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-white/10 rounded-full text-white font-bold text-sm hover:bg-white/20"
                        >
                            DONE
                        </button>
                    </div>

                    <canvas
                        ref={canvasRef}
                        onMouseDown={startDrawing}
                        onMouseUp={stopDrawing}
                        onMouseMove={draw}
                        onMouseLeave={stopDrawing}
                        className="w-full h-full"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
