'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const FloatingWhatsApp = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        // Mostrar después de un breve delay para no ser intrusivo al inicio
        const timer = setTimeout(() => setIsVisible(true), 2000);
        const tooltipTimer = setTimeout(() => setShowTooltip(true), 5000);
        return () => {
            clearTimeout(timer);
            clearTimeout(tooltipTimer);
        };
    }, []);

    return (
        <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-3">
            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: 20 }}
                        className="relative group bg-white p-4 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.15)] border border-gray-100 mb-2 max-w-[220px]"
                    >
                        <button
                            onClick={() => setShowTooltip(false)}
                            className="absolute -top-2 -right-2 bg-gray-100 hover:bg-gray-200 p-1 rounded-full text-gray-400 transition-colors"
                        >
                            <X size={12} />
                        </button>
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1.5">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
                                </span>
                                En línea ahora
                            </span>
                            <p className="text-sm font-bold text-gray-800 leading-snug">
                                ¿Buscando el presupuesto ideal? Te asesoramos por WhatsApp.
                            </p>
                        </div>
                        {/* Triángulo del tooltip */}
                        <div className="absolute top-full right-6 w-3 h-3 bg-white border-r border-b border-gray-100 rotate-45 transform -translate-y-1/2"></div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isVisible && (
                    <motion.a
                        href="https://wa.me/59895113560?text=Hola%20ProRoller!%20Me%20gustar%C3%ADa%20hacer%20una%20consulta."
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.5, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative flex items-center justify-center"
                    >
                        {/* Efecto de pulso premium de fondo */}
                        <div className="absolute inset-0 bg-[#25D366] rounded-full blur-[20px] opacity-20 animate-pulse"></div>

                        {/* Círculo de fondo con gloss */}
                        <div className="relative w-16 h-16 bg-[#25D366] rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] flex items-center justify-center group overflow-hidden border-4 border-white">
                            {/* Reflexo de brillo pasando por el botón */}
                            <motion.div
                                animate={{ x: ['-200%', '200%'] }}
                                transition={{ repeat: Infinity, duration: 3, ease: 'linear', repeatDelay: 2 }}
                                className="absolute top-0 bottom-0 w-8 bg-white/30 -skew-x-12"
                            />

                            <MessageCircle size={32} color="white" fill="white" className="relative z-10" />

                            {/* Overlay interactivo */}
                            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>

                    </motion.a>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FloatingWhatsApp;
