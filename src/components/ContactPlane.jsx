import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Plane } from 'lucide-react';

export default function ContactPlane() {
    const [status, setStatus] = useState('idle'); // idle, folding, flying, sent

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('folding');

        // Sequence
        setTimeout(() => setStatus('flying'), 600);
        setTimeout(() => setStatus('sent'), 1600);
        setTimeout(() => setStatus('idle'), 4000);
    };

    // Variants for the Form Container
    const containerVariants = {
        idle: { scale: 1, rotate: 0, opacity: 1 },
        folding: { scale: 0.8, rotate: -5, opacity: 0.8 },
        flying: { x: 1000, y: -200, rotate: 20, opacity: 0 },
        sent: { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 } // Reset for 'Thank you'
    };

    return (
        <div className="relative w-full max-w-md mx-auto perspective-1000">

            {status === 'sent' ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center p-8 bg-green-500/20 border border-green-500/50 rounded-2xl"
                >
                    <h3 className="text-2xl font-bold text-green-400 mb-2">Message Sent! ✈️</h3>
                    <p className="text-zinc-400">The drone is on its way to my inbox.</p>
                </motion.div>
            ) : (
                <motion.div
                    variants={containerVariants}
                    initial="idle"
                    animate={status}
                    transition={{ duration: 0.5 }}
                    className="bg-zinc-900/50 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-xl"
                >
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        {status === 'flying' ? 'Sending...' : 'Get in Touch'}
                        <Plane className={`w-5 h-5 ${status === 'flying' ? 'animate-pulse' : ''}`} />
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Name</label>
                            <input
                                required
                                type="text"
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Message</label>
                            <textarea
                                required
                                rows="4"
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                placeholder="Let's build something crazy..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 group overflow-hidden"
                        >
                            <span className="relative z-10 group-hover:-translate-y-10 transition-transform duration-300">Send Message</span>
                            <div className="absolute translate-y-10 group-hover:translate-y-0 transition-transform duration-300">
                                <Plane className="w-5 h-5" />
                            </div>
                        </button>
                    </form>
                </motion.div>
            )}
        </div>
    );
}
