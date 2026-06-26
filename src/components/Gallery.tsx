'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useAnimationFrame, useScroll, useSpring, useTransform } from 'framer-motion';
import { X, Maximize2 } from 'lucide-react';

const works = [
    { img: "/IMG-20250726-WA0053.jpg", title: "Roller Screen", description: "Cortina roller screen en un amplio ventanal.", size: "large" },
    { img: "/IMG-20250726-WA0056.jpg", title: "Pinza Italiana", description: "Cortina tradicional en pinza italiana con blackout.", size: "large" },
    { img: "/roller-translucida.jpeg", title: "Tela Screen", description: "Filtra el sol directo, protegiendo tus espacios.", size: "large" },
    { img: "/IMG-20250721-WA0006.jpg", title: "Elegancia Lino", description: "Pinza italiana en tela Lino.", size: "large" },
    { img: "/cortina-tipo-antigua-translucida.jpeg", title: "Voile Suave", description: "Pinza italiana en tela Voile.", size: "large" },
    { img: "/IMG-20250726-WA0061.jpg", title: "En Voile", description: "Cortinas en voile.", size: "giant" },
    { img: "/IMG-20250726-WA0059.jpg", title: "Texturizada", description: "Cortina con textura sutil y elegante.", size: "normal" },
    { img: "/IMG-20250726-WA0057.jpg", title: "Tradicional en Blackout", description: "Cortina tradicional en blackout.", size: "normal" },
    { img: "/IMG-20250726-WA0052.jpg", title: "Roller Blackout Beige", description: "Cortina roller blackout de color beige.", size: "giant" },
    { img: "/IMG-20250726-WA0050.jpg", title: "Screen 5%", description: "Tela Screen 5% para control de luz.", size: "large" },
    { img: "/IMG-20250726-WA0060.jpg", title: "Cortina Clásica", description: "Elegancia y privacidad para tu espacio.", size: "normal" },
    { img: "/roller-blackout.jpeg", title: "Black Out", description: "Aislante térmico y sonoro totalmente opaca.", size: "normal" },
    { img: "/IMG-20250726-WA0055.jpg", title: "Cortinas Screen", description: "Cortinas que garantizan privacidad y control.", size: "wide" },
    { img: "/IMG-20250726-WA0062.jpg", title: "Cortina tradicional en Voile", description: "Dormitorio con cortina roller que asegura el descanso.", size: "large" },
    { img: "/IMG-20250726-WA0058.jpg", title: "Sala de Estar", description: "Cortinas que complementan la decoración.", size: "wide" },
    { img: "/roller-rayada.jpeg", title: "Bambú", description: "Ideal para ambientes con estilo natural.", size: "large" },
    { img: "/IMG-20250726-WA0051.jpg", title: "Cortina Roller", description: "Tela Screen 5%.", size: "large" },
    { img: "/cortina-tipo-antigua.jpeg", title: "Tradicional", description: "Cortina tradicional doble en Pinza Americana.", size: "giant" }
];

const infiniteWorks = [...works, ...works, ...works];

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState<typeof works[0] | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [width, setWidth] = useState(0);

    const sliderRef = useRef<HTMLUListElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const lastX = useRef<number>(0);
    const baseX = useRef<number>(0);
    const xTranslation = useMotionValue(0);
    const progress = useMotionValue(0);
    const [isDragBarDragging, setIsDragBarDragging] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);

    // Base scroll for reference (if needed in future), but removed displacement effect
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const calculateWidth = useCallback(() => {
        if (!sliderRef.current) return 0;
        const items = sliderRef.current.children;
        const itemsPerSet = works.length;
        if (items.length === 0) return 0;

        const firstSet = Array.from(items).slice(0, itemsPerSet);
        let maxRight = 0;
        firstSet.forEach((item) => {
            const rect = (item as HTMLElement).getBoundingClientRect();
            const containerRect = sliderRef.current!.getBoundingClientRect();
            const right = rect.right - containerRect.left + 15;
            maxRight = Math.max(maxRight, right);
        });
        return maxRight;
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const newWidth = calculateWidth();
            if (newWidth) setWidth(newWidth);
        };

        // Delay slightly to ensure layout and items are rendered
        const timer = setTimeout(handleResize, 500);
        window.addEventListener('resize', handleResize);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', handleResize);
        };
    }, [calculateWidth]);

    useAnimationFrame((_time, delta) => {
        if (isDragging || isDragBarDragging || !width) return;

        // 45 pixels per second - smooth and steady base
        const moveBy = (delta / 1000) * 45;
        baseX.current -= moveBy;

        // Combined position: Base Auto Scroll only
        let totalX = baseX.current;

        // Seamless loop reset with modulo
        if (totalX <= -width) {
            baseX.current += width;
            totalX = totalX % width;
        } else if (totalX > 0) {
            baseX.current -= width;
            totalX = (totalX % width) - width;
        }

        xTranslation.set(totalX);

        // Update progress for the drag bar (0 to 1)
        const p = ((-totalX % width) + width) % width / width;
        progress.set(p);
    });

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        lastX.current = e.clientX;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !width) return;
        const deltaX = lastX.current - e.clientX;
        lastX.current = e.clientX;

        // Update base according to drag
        baseX.current -= deltaX;

        // Force progress update during manual gallery drag
        const p = ((-baseX.current % width) + width) % width / width;
        progress.set(p);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        lastX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging || !width) return;
        const deltaX = lastX.current - e.touches[0].clientX;
        lastX.current = e.touches[0].clientX;

        baseX.current -= deltaX;

        const currentTotalX = baseX.current;
        const p = ((-currentTotalX % width) + width) % width / width;
        progress.set(p);
    };

    // Drag Bar Handlers
    const updateProgressFromClick = (clientX: number) => {
        if (!trackRef.current || !width) return;
        const rect = trackRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const newProgress = x / rect.width;

        // Update baseX to match the new progress
        baseX.current = -newProgress * width;
        progress.set(newProgress);

        // Update xTranslation immediately for visual feedback
        xTranslation.set(baseX.current);
    };

    const handleDragBarMouseDown = (e: React.MouseEvent) => {
        setIsDragBarDragging(true);
        updateProgressFromClick(e.clientX);
    };

    const handleDragBarMouseMove = (e: MouseEvent) => {
        if (!isDragBarDragging) return;
        updateProgressFromClick(e.clientX);
    };

    const handleDragBarTouchStart = (e: React.TouchEvent) => {
        setIsDragBarDragging(true);
        updateProgressFromClick(e.touches[0].clientX);
    };

    const handleDragBarTouchMove = (e: TouchEvent) => {
        if (!isDragBarDragging) return;
        updateProgressFromClick(e.touches[0].clientX);
    };

    const handleDragBarMouseUp = useCallback(() => {
        setIsDragBarDragging(false);
    }, []);

    useEffect(() => {
        if (isDragBarDragging) {
            window.addEventListener('mousemove', handleDragBarMouseMove);
            window.addEventListener('mouseup', handleDragBarMouseUp);
            window.addEventListener('touchmove', handleDragBarTouchMove, { passive: false });
            window.addEventListener('touchend', handleDragBarMouseUp);
        } else {
            window.removeEventListener('mousemove', handleDragBarMouseMove);
            window.removeEventListener('mouseup', handleDragBarMouseUp);
            window.removeEventListener('touchmove', handleDragBarTouchMove);
            window.removeEventListener('touchend', handleDragBarMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleDragBarMouseMove);
            window.removeEventListener('mouseup', handleDragBarMouseUp);
            window.removeEventListener('touchmove', handleDragBarTouchMove);
            window.removeEventListener('touchend', handleDragBarMouseUp);
        };
    }, [isDragBarDragging, handleDragBarMouseUp]);

    const getItemClass = (size: string) => {
        switch (size) {
            case 'large': return 'row-span-4 col-span-1 h-[480px]';
            case 'giant': return 'row-span-4 col-span-2 h-[480px]';
            case 'wide': return 'row-span-2 col-span-2 h-[240px]';
            default: return 'row-span-2 col-span-1 h-[240px]';
        }
    };

    return (
        <section
            id="nuestrosTrabajos"
            ref={sectionRef}
            className="relative py-24 bg-gradient-to-b from-white via-[#fcf9f2] to-[#fcf9f2] overflow-hidden"
        >
            <div className="container mx-auto px-6 relative z-10 mb-16">
                <header className="text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-primary font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-3 block"
                    >
                        Instalaciones Destacadas
                    </motion.span>
                    <h2 className="text-4xl md:text-6xl font-black text-primary mb-6 tracking-tight uppercase">
                        Nuestros Trabajos
                    </h2>
                    <div className="w-24 md:w-40 h-1.5 bg-primary mx-auto rounded-full shadow-sm shadow-primary/20"></div>
                </header>
            </div>

            <div
                ref={containerRef}
                className="relative w-screen left-1/2 -ml-[50vw] cursor-grab active:cursor-grabbing select-none overflow-hidden touch-pan-y"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseUp}
            >
                <motion.ul
                    ref={sliderRef}
                    className="grid grid-flow-col auto-cols-[200px] md:auto-cols-[280px] grid-rows-[repeat(8,80px)] md:grid-rows-[repeat(8,120px)] gap-[10px] md:gap-[15px] px-5 will-change-transform"
                    style={{ x: xTranslation }}
                >
                    {infiniteWorks.map((work, index) => (
                        <li
                            key={index}
                            className={`relative rounded-xl overflow-hidden shadow-md group cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:-translate-y-2 hover:z-10 hover:shadow-2xl ${getItemClass(work.size)}`}
                            onClick={() => setSelectedImage(work)}
                        >
                            <Image
                                src={work.img}
                                alt={work.title}
                                fill
                                className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75 group-hover:contrast-[1.1]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4 md:p-6 translate-y-5 group-hover:translate-y-0 backdrop-blur-[2px]">
                                <h4 className="text-white text-base md:text-xl font-bold mb-1 md:mb-2 drop-shadow-lg leading-tight">{work.title}</h4>
                                <p className="text-white/90 text-[10px] md:text-sm drop-shadow-md leading-relaxed line-clamp-2 md:line-clamp-none">{work.description}</p>
                            </div>

                            {/* Icono de expansión sutil */}
                            <div className="absolute top-4 right-4 w-8 h-8 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-white/20">
                                <Maximize2 className="text-white w-4 h-4" />
                            </div>
                        </li>
                    ))}
                </motion.ul>
            </div>

            {/* Barra de Arrastre (Slider) */}
            <div className="mt-16 flex flex-col items-center px-6">
                <div
                    ref={trackRef}
                    className="relative w-full max-w-2xl h-1.5 bg-gray-200 rounded-full cursor-pointer group touch-none"
                    onMouseDown={handleDragBarMouseDown}
                    onTouchStart={handleDragBarTouchStart}
                >
                    {/* Track Accent (Optional but looks premium) */}
                    <div className="absolute inset-0 bg-primary/5 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-primary/10"
                            style={{ width: useTransform(progress, p => `${p * 100}%`) }}
                        />
                    </div>

                    {/* Thumb (The handle) */}
                    <motion.div
                        className="absolute top-1/2 -translate-y-1/2 w-20 md:w-32 h-3 bg-primary rounded-full shadow-lg shadow-primary/40 flex items-center justify-center cursor-grab active:cursor-grabbing border border-white/50 transition-transform hover:scale-x-110"
                        style={{
                            left: useTransform(progress, p => `${p * 100}%`),
                            x: useTransform(progress, p => `${-p * 100}%`)
                        }}
                    >
                        <div className="flex gap-1.5">
                            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                            <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-6 text-center text-gray-400 text-[10px] md:text-xs font-bold tracking-[0.3em] flex items-center justify-center gap-4 uppercase"
                >
                    <span className="w-12 h-[1px] bg-gray-200/50"></span>
                    Explorar Trabajos
                    <span className="w-12 h-[1px] bg-gray-200/50"></span>
                </motion.div>
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-primary backdrop-blur-md rounded-full text-white transition-all"
                                onClick={() => setSelectedImage(null)}
                            >
                                <X size={24} />
                            </button>

                            <div className="relative w-full aspect-[4/3] md:aspect-[16/9]">
                                <Image
                                    src={selectedImage.img}
                                    alt={selectedImage.title}
                                    fill
                                    className="object-contain md:object-cover bg-gray-100"
                                />
                            </div>
                            <div className="p-6 md:p-8 bg-white">
                                <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-2 block">Trabajo Realizado</span>
                                <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">{selectedImage.title}</h3>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    {selectedImage.description}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;
