'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const VideoLogoCanvas = ({ src }: { src: string }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animFrameRef = useRef<number>(0);

    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) return;

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        const draw = () => {
            if (video.paused || video.ended) {
                animFrameRef.current = requestAnimationFrame(draw);
                return;
            }

            if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
            }

            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            // Make light pixels (white & grey checkerboard) transparent
            // Keep dark pixels (the logo) opaque
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];

                // Calculate brightness (0-255)
                const brightness = (r + g + b) / 3;

                if (brightness > 115) {
                    // Light/mid pixel (white & grey checkerboard) → make fully transparent
                    data[i + 3] = 0;
                } else if (brightness > 60) {
                    // Near-dark → partial transparency for smooth anti-aliased edges
                    const alpha = Math.round(255 * (1 - (brightness - 60) / 55));
                    data[i + 3] = alpha;
                }
                // Dark pixels (brightness <= 80) stay fully opaque
            }

            ctx.putImageData(imageData, 0, 0);
            animFrameRef.current = requestAnimationFrame(draw);
        };

        const handlePlay = () => {
            animFrameRef.current = requestAnimationFrame(draw);
        };

        video.addEventListener('play', handlePlay);
        // If video is already playing
        if (!video.paused) {
            animFrameRef.current = requestAnimationFrame(draw);
        }

        return () => {
            video.removeEventListener('play', handlePlay);
            cancelAnimationFrame(animFrameRef.current);
        };
    }, []);

    return (
        <div className="relative w-full aspect-video">
            <video
                ref={videoRef}
                src={src}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
            />
            <canvas
                ref={canvasRef}
                className="w-full h-full object-contain"
            />
        </div>
    );
};

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

                {/* Logo animado (Video con chroma-key via Canvas) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    className="flex justify-center mb-8 md:mb-14 w-full max-w-[420px] md:max-w-[700px]"
                >
                    <div className="relative group w-full">
                        <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <VideoLogoCanvas src="/quiero_que_la_ueda_de_atras_os_sin_logo.mp4" />
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
