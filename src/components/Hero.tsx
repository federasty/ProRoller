'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

// Canvas component for the main Hero logo animation (chroma-key transparency)
const VideoLogoCanvas = ({ src, isPaused }: { src: string; isPaused: boolean }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animFrameRef = useRef<number>(0);

    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) return;

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        let active = true;

        const draw = () => {
            if (!active) return;
            if (isPaused) return;

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
                    data[i + 3] = 0;
                } else if (brightness > 60) {
                    const alpha = Math.round(255 * (1 - (brightness - 60) / 55));
                    data[i + 3] = alpha;
                }
            }

            ctx.putImageData(imageData, 0, 0);
            animFrameRef.current = requestAnimationFrame(draw);
        };

        const handlePlay = () => {
            if (!isPaused) {
                animFrameRef.current = requestAnimationFrame(draw);
            }
        };

        video.addEventListener('play', handlePlay);

        if (!isPaused) {
            if (video.paused) {
                video.play().catch(() => {});
            } else {
                animFrameRef.current = requestAnimationFrame(draw);
            }
        } else {
            video.pause();
            cancelAnimationFrame(animFrameRef.current);
        }

        return () => {
            active = false;
            video.removeEventListener('play', handlePlay);
            cancelAnimationFrame(animFrameRef.current);
        };
    }, [isPaused]);

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

// Small floating canvas for the Uruguay map animation (removes Gemini logo + chroma-key)
const FloatingUruguayMap = ({ isPaused }: { isPaused: boolean }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animFrameRef = useRef<number>(0);

    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) return;

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        let active = true;

        const draw = () => {
            if (!active) return;
            if (isPaused) return;

            if (video.paused || video.ended) {
                animFrameRef.current = requestAnimationFrame(draw);
                return;
            }

            if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
            }

            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Patch out Gemini logo from bottom-right corner
            const patchWidth = Math.round(canvas.width * 0.12);
            const patchHeight = Math.round(canvas.height * 0.16);
            ctx.save();
            ctx.translate(canvas.width - patchWidth, canvas.height - patchHeight);
            ctx.translate(patchWidth, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(
                canvas,
                0, canvas.height - patchHeight, patchWidth, patchHeight,
                0, 0, patchWidth, patchHeight
            );
            ctx.restore();

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            // Chroma-key: remove grey/white checkerboard background, keep only colored (green) map pixels
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                const maxC = Math.max(r, g, b);
                const minC = Math.min(r, g, b);
                const saturation = maxC > 0 ? (maxC - minC) / maxC : 0;

                // If pixel has low saturation it's grey/white background → transparent
                if (saturation < 0.18) {
                    data[i + 3] = 0;
                } else if (saturation < 0.28) {
                    // Transition zone for smooth edges
                    const alpha = Math.round(255 * ((saturation - 0.18) / 0.10));
                    data[i + 3] = Math.max(0, Math.min(255, alpha));
                }
            }

            ctx.putImageData(imageData, 0, 0);
            animFrameRef.current = requestAnimationFrame(draw);
        };

        const handlePlay = () => {
            if (!isPaused) {
                animFrameRef.current = requestAnimationFrame(draw);
            }
        };

        video.addEventListener('play', handlePlay);

        if (!isPaused) {
            if (video.paused) {
                video.play().catch(() => {});
            } else {
                animFrameRef.current = requestAnimationFrame(draw);
            }
        } else {
            video.pause();
            cancelAnimationFrame(animFrameRef.current);
        }

        return () => {
            active = false;
            video.removeEventListener('play', handlePlay);
            cancelAnimationFrame(animFrameRef.current);
        };
    }, [isPaused]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
            className="absolute bottom-6 left-6 z-20 flex flex-col items-center gap-1.5"
        >
            <span className="text-[8px] md:text-[10px] font-black text-gray-800 uppercase tracking-[0.15em] leading-tight text-center whitespace-nowrap">
                Estamos en todo<br />el Uruguay
            </span>
            <div className="relative w-16 h-16 md:w-20 md:h-20">
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-[12px] animate-pulse"></div>
                <div className="relative w-full h-full overflow-hidden rounded-full bg-white/80 backdrop-blur-sm shadow-[0_8px_25px_rgba(0,0,0,0.15)] border-[3px] border-white flex items-center justify-center">
                    <video
                        ref={videoRef}
                        src="/quiero_hacer_una_animacion_con.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
                    />
                    <canvas
                        ref={canvasRef}
                        className="w-[140%] h-[140%] object-contain"
                    />
                </div>
            </div>
        </motion.div>
    );
};

const Hero = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isIntersecting, setIsIntersecting] = useState(true);

    useEffect(() => {
        const handleMenu = (e: Event) => setIsMenuOpen((e as CustomEvent).detail.isOpen);
        const handleCart = (e: Event) => setIsCartOpen((e as CustomEvent).detail.isOpen);
        const handleModal = (e: Event) => setIsModalOpen((e as CustomEvent).detail.isOpen);

        window.addEventListener('menuToggle', handleMenu);
        window.addEventListener('cartToggle', handleCart);
        window.addEventListener('productModalToggle', handleModal);

        return () => {
            window.removeEventListener('menuToggle', handleMenu);
            window.removeEventListener('cartToggle', handleCart);
            window.removeEventListener('productModalToggle', handleModal);
        };
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
            },
            { threshold: 0 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    const isPaused = isMenuOpen || isCartOpen || isModalOpen || !isIntersecting;

    return (
        <section ref={sectionRef} className="relative min-h-[100dvh] h-auto md:h-dvh flex items-center justify-center overflow-hidden !pb-0 pt-16 md:pt-0">
            {/* Background Image - Clean and Tenue */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/Cortina-roller.jpg"
                    alt="ProRoller Background"
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]"></div>
            </div>

            <div className="container mx-auto px-6 text-center flex flex-col items-center justify-center h-full relative z-[1] pb-20 sm:pb-0">
                <h1 className="hidden">ProRoller - Cortinas de Excelencia</h1>

                {/* Eslogan ahora arriba con animación de entrada suave */}
                <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-2xl md:text-3xl text-gray-800 font-bold mb-4 md:mb-10 leading-tight italic px-4 md:px-0 max-w-4xl"
                >
                    "Transformamos la luz en confort para tu hogar"
                </motion.p>

                {/* Logo animado (Video con chroma-key via Canvas) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1.15 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    className="flex justify-center mb-6 md:mb-16 w-full max-w-[480px] sm:max-w-[720px] md:max-w-[1200px] mix-blend-multiply"
                >
                    <div className="relative group w-full">
                        <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <VideoLogoCanvas src="/quiero_que_la_ueda_de_atras_os_sin_logo.mp4" isPaused={isPaused} />
                    </div>
                </motion.div>

                {/* Descripción debajo del logo */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-[13px] sm:text-base md:text-xl text-gray-800 max-w-[280px] sm:max-w-2xl mx-auto leading-relaxed px-4 md:px-0 font-medium"
                >
                    Confección e instalación artesanal de cortinas roller con tecnología de vanguardia y materiales premium.
                </motion.p>
            </div>

            {/* Floating Uruguay Map - bottom left */}
            <FloatingUruguayMap isPaused={isPaused} />

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
