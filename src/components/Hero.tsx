'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden !pb-0">
            {/* Background Image - Clean and Tenue */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/Cortina-roller.jpg"
                    alt="ProRoller Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]"></div>
            </div>

            <div className="container mx-auto px-6 text-center z-10 flex flex-col items-center justify-center h-full">
                <h1 className="hidden">ProRoller - Cortinas de Excelencia</h1>

                {/* Eslogan ahora arriba con animación de entrada suave */}
                <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-2xl md:text-3xl text-gray-800 font-bold mb-8 md:mb-10 leading-tight italic px-4 md:px-0 max-w-4xl"
                >
                    "Transformamos la luz en confort para tu hogar"
                </motion.p>

                {/* Logo en el centro */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    className="flex justify-center mb-8 md:mb-14 w-full max-w-[420px] md:max-w-[700px]"
                >
                    <div className="relative group w-full">
                        <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div className="relative aspect-[2/1] w-full">
                            <Image
                                src="/logo_proroller.png"
                                alt="ProRoller Logo"
                                fill
                                className="object-contain transition-transform duration-700 hover:scale-105"
                                priority
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Descripción debajo del logo */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-base md:text-xl text-gray-800 max-w-2xl mx-auto leading-relaxed px-4 md:px-0 font-medium"
                >
                    Confección e instalación artesanal de cortinas roller con tecnología de vanguardia y materiales premium.
                </motion.p>
            </div>

            {/* Animated Scroll Down Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scale-75 md:scale-100"
            >
                <span className="text-primary font-bold text-[10px] md:text-xs uppercase tracking-widest opacity-60">Descubrir</span>
                <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-primary/30 rounded-full flex justify-center p-1">
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-1 md:w-1.5 h-1 md:h-1.5 bg-primary rounded-full"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
