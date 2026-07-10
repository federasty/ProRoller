'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Mail, ArrowUpRight, ShieldCheck, Clock, Award } from 'lucide-react';

// Small floating canvas for the Uruguay map animation (removes Gemini logo + chroma-key)
const FloatingUruguayMap = () => {
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
                const brightness = (r + g + b) / 3;
                const saturation = maxC > 0 ? (maxC - minC) / maxC : 0;

                // If pixel has low saturation it's grey/white background → transparent
                if (saturation < 0.18) {
                    data[i + 3] = 0;
                } else if (saturation < 0.28) {
                    // Transition zone for smooth edges
                    const alpha = Math.round(255 * ((saturation - 0.18) / 0.10));
                    data[i + 3] = Math.max(0, Math.min(255, alpha));
                }
                // High saturation pixels (the green map) stay fully opaque
            }

            ctx.putImageData(imageData, 0, 0);
            animFrameRef.current = requestAnimationFrame(draw);
        };

        const handlePlay = () => {
            animFrameRef.current = requestAnimationFrame(draw);
        };

        video.addEventListener('play', handlePlay);
        if (!video.paused) {
            animFrameRef.current = requestAnimationFrame(draw);
        }

        return () => {
            video.removeEventListener('play', handlePlay);
            cancelAnimationFrame(animFrameRef.current);
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
            className="absolute bottom-6 left-6 z-20 flex flex-col items-center gap-1.5"
        >
            <span className="text-[8px] md:text-[10px] font-black text-gray-200 uppercase tracking-[0.15em] leading-tight text-center whitespace-nowrap">
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

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-[#0a1a16] pt-20 md:pt-32 pb-32 md:pb-10 overflow-hidden text-white/90">
            {/* Elementos decorativos de fondo - Más sutiles para fondo oscuro */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#fcf9f2]/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-20">

                    {/* COLUMNA 1: Branding & Social */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
                        <Link href="/" onClick={scrollToTop} className="inline-block transition-transform hover:scale-105">
                            <motion.div
                                animate={{
                                    filter: [
                                        "drop-shadow(0 0 5px rgba(255,255,255,0.1)) brightness(1.1)",
                                        "drop-shadow(0 0 15px rgba(0,123,94,0.5)) brightness(1.3)",
                                        "drop-shadow(0 0 5px rgba(255,255,255,0.1)) brightness(1.1)"
                                    ]
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 4,
                                    ease: "easeInOut"
                                }}
                                className="w-64 md:w-80 relative aspect-[3/1]"
                            >
                                <Image
                                    src="/logo_proroller.png"
                                    alt="ProRoller Logo"
                                    fill
                                    className="object-contain object-center lg:object-left"
                                />
                            </motion.div>
                        </Link>
                        <p className="text-gray-400 leading-relaxed text-lg max-w-md">
                            Expertos en transformar tus espacios con cortinas roller y tradicionales de la más alta calidad artesanal en Uruguay.
                        </p>
                        <div className="flex justify-center lg:justify-start gap-5">
                            {[
                                { icon: <Instagram size={24} />, href: "https://www.instagram.com/proroller.uy/" },
                                { icon: <Facebook size={24} />, href: "https://www.facebook.com/people/Proroller/100071763105055/?ref=NONE_xav_ig_profile_page_web#" }
                            ].map((social, idx) => (
                                <motion.a
                                    key={idx}
                                    href={social.href}
                                    target={social.href.startsWith('http') ? "_blank" : undefined}
                                    rel={social.href.startsWith('http') ? "noopener noreferrer" : undefined}
                                    whileHover={{ y: -8, color: '#007b5e' }}
                                    className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 transition-all border border-white/10 backdrop-blur-md"
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* COLUMNA 2: Navegación */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:pl-20">
                        <h4 className="text-primary font-black uppercase tracking-[0.3em] text-[11px] mb-10">Navegación</h4>
                        <ul className="space-y-5">
                            {[
                                { name: 'Nuestros Servicios', href: '#servicios' },
                                { name: 'Galería de Trabajos', href: '#nuestrosTrabajos' },
                                { name: 'Cortinas en Acción', href: '#videos-muestra' },
                                { name: 'Accesorios', href: '#accesorios' },
                                { name: 'Solicitar Presupuesto', href: '#contacto' },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="group text-gray-400 hover:text-white transition-all flex items-center gap-3 font-semibold text-lg"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors"></div>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                            <li className="pt-4 hidden lg:block">
                                <div className="inline-flex flex-col items-center lg:items-start bg-white/5 border border-white/10 p-4 rounded-2xl">
                                    <p className="text-primary font-black uppercase tracking-widest text-[10px] mb-1">Horario de Atención</p>
                                    <p className="text-white font-bold text-sm">9:00 hs a 18:00 hs</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom Refined */}
                <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        <p className="text-gray-500 text-sm font-medium">
                            © {currentYear} <span className="text-white font-bold">ProRoller Uruguay</span>
                        </p>
                        <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-white/10"></div>
                        <p className="text-gray-600 text-xs uppercase tracking-widest font-black">Excelencia en Cortinas</p>
                    </div>

                    <div className="flex items-center gap-10">
                        <motion.button
                            onClick={scrollToTop}
                            whileHover={{ scale: 1.1, backgroundColor: '#007b5e', borderColor: '#007b5e' }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-white/5 p-4 rounded-full border border-white/20 transition-all group flex items-center justify-center shadow-lg hover:shadow-primary/20"
                            aria-label="Volver arriba"
                        >
                            <svg
                                className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7" />
                            </svg>
                        </motion.button>
                    </div>
                </div>
            </div>
            {/* Floating Uruguay Map - bottom left */}
            <FloatingUruguayMap />
        </footer>
    );
};

export default Footer;
