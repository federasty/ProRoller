'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Sparkles, Play, Volume2, VolumeX } from 'lucide-react';

interface VideoCardProps {
    title: string;
    description: string;
    videoSrc: string;
    posterSrc: string;
    badgeText: string;
    badgeIcon: React.ReactNode;
    delay?: number;
}

const VideoCard = ({
    title,
    description,
    videoSrc,
    posterSrc,
    badgeText,
    badgeIcon,
    delay = 0,
}: VideoCardProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.25,
        };

        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting && video && !video.paused) {
                    video.pause();
                    setIsPlaying(false);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, observerOptions);
        observer.observe(video);

        return () => {
            observer.disconnect();
        };
    }, []);

    const togglePlay = () => {
        const video = videoRef.current;
        if (!video) return;

        if (isPlaying) {
            video.pause();
            setIsPlaying(false);
        } else {
            setHasStarted(true);
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        setIsPlaying(true);
                    })
                    .catch((err) => {
                        console.log('Playback error:', err);
                        setIsPlaying(false);
                    });
            }
        }
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        const video = videoRef.current;
        if (!video) return;
        video.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            className="flex flex-col group bg-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-100/80 hover:shadow-[0_30px_70px_rgba(0,123,94,0.08)] transition-all duration-500 p-4 md:p-6"
        >
            <div
                className="relative aspect-[9/16] md:aspect-auto md:h-[580px] w-full rounded-2xl overflow-hidden mb-6 bg-slate-900 group/player cursor-pointer select-none"
                onClick={togglePlay}
            >
                <video
                    ref={videoRef}
                    src={videoSrc}
                    poster={posterSrc}
                    className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                    playsInline
                    // @ts-ignore
                    webkit-playsinline="true"
                    loop
                    muted={isMuted}
                    preload="metadata"
                    controls={hasStarted}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => setIsPlaying(false)}
                />

                {/* Overlay con Portada y Botón Play animado */}
                <AnimatePresence>
                    {!isPlaying && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="absolute inset-0 z-10 flex flex-col items-center justify-between p-6 bg-gradient-to-t from-black/80 via-black/20 to-black/30 backdrop-blur-[2px]"
                        >
                            {/* Insignia superior */}
                            <div className="w-full flex justify-between items-center">
                                <span className="text-[10px] uppercase font-bold tracking-widest bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full border border-white/20">
                                    ProRoller® HD
                                </span>
                            </div>

                            {/* Botón de Reproducción Central */}
                            <div className="flex flex-col items-center gap-3">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/95 text-white shadow-[0_0_50px_rgba(0,123,94,0.6)] backdrop-blur-md border-2 border-white/40 group-hover/player:scale-110 transition-transform duration-300"
                                >
                                    <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30"></div>
                                    <Play size={36} className="ml-1 fill-white text-white" />
                                </motion.div>
                                <span className="text-white text-xs md:text-sm font-semibold tracking-wide drop-shadow-md bg-black/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
                                    Tocar para reproducir
                                </span>
                            </div>

                            {/* Footer informativo */}
                            <div className="w-full text-white/90 text-xs font-medium flex justify-between items-end">
                                <span>Demostración en vivo</span>
                                <span className="text-emerald-300 font-bold">100% HD</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Botón Flotante de Audio (Silenciar/Activar) */}
                {hasStarted && (
                    <button
                        onClick={toggleMute}
                        className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-black/80 text-white p-2.5 rounded-full backdrop-blur-md transition-all border border-white/20 shadow-lg hover:scale-105 active:scale-95"
                        title={isMuted ? "Activar sonido" : "Silenciar"}
                    >
                        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                )}
            </div>

            <div className="px-2 pb-2">
                <div className="flex items-center gap-2 mb-3">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                        {badgeIcon}
                        {badgeText}
                    </span>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-2 leading-snug">
                    {title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {description}
                </p>
            </div>
        </motion.div>
    );
};

const VideoShowcase = () => {
    return (
        <section id="videos-muestra" className="relative py-24 bg-gradient-to-b from-[#fcf9f2] via-white to-[#fcf9f2] overflow-hidden">
            {/* Elementos decorativos de fondo */}
            <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <header className="text-center mb-16 md:mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] md:text-sm mb-3 block"
                    >
                        Nuestras Cortinas en Acción
                    </motion.span>
                    <h2 className="text-4xl md:text-6xl font-black text-primary mb-6 tracking-tight uppercase">
                        Calidad en Movimiento
                    </h2>
                    <div className="w-24 md:w-40 h-1.5 bg-primary mx-auto rounded-full shadow-sm shadow-primary/20 mb-6"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-medium">
                        Observá el deslizamiento suave, la precisión de los automatismos y los acabados artesanales que hacen únicas a nuestras cortinas.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 max-w-6xl mx-auto">
                    {/* VIDEO 1 */}
                    <VideoCard
                        title="Confección e Instalación a Medida"
                        description="Mirá de cerca la textura de nuestras telas seleccionadas y la precisión en la caída y alineación perfecta de cada paño."
                        videoSrc="/video%20muestra%201.mp4"
                        posterSrc="/IMG-20250726-WA0050.jpg"
                        badgeText="Detalle Artesanal"
                        badgeIcon={<Sparkles size={12} />}
                        delay={0.1}
                    />

                    {/* VIDEO 2 */}
                    <VideoCard
                        title="Suavidad y Control Térmico"
                        description="Observá el mecanismo premium de enrollado y cómo la tela blackout aísla completamente la luz externa, brindando absoluta privacidad y control térmico."
                        videoSrc="/video%20muestra%202.mp4"
                        posterSrc="/IMG-20250726-WA0052.jpg"
                        badgeText="Tecnología de Vanguardia"
                        badgeIcon={<ShieldCheck size={12} />}
                        delay={0.2}
                    />
                </div>
            </div>
        </section>
    );
};

export default VideoShowcase;

