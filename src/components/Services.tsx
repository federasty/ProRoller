'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

const services = [
    {
        title: "Confección",
        description: "Confeccionamos cortinas roller y tradicionales con los más altos estándares de calidad artesanal.",
        image: "/confeccion.png",
    },
    {
        title: "Instalación",
        description: "Instalamos cortinas de todo tipo de manera rápida, segura y con acabados perfectos.",
        image: "/instalacion.png",
    },
    {
        title: "Automatismos",
        description: "Automatizamos tus espacios para que controles la luz con la mayor comodidad tecnológica.",
        image: "/automatismos.png",
    },
    {
        title: "A medida",
        description: "Diseños personalizados que se adaptan milimétricamente a tus aberturas y estilo.",
        image: "/amedida.png",
    },
    {
        title: "Variedad",
        description: "La mayor selección de materiales, texturas y colores del mercado uruguayo.",
        image: "/variedad.png",
    },
    {
        title: "Asesoramiento",
        description: "Te brindamos la mejor solución personalizada para cada uno de tus ambientes.",
        image: "/vamos.png",
    },
];

const Services = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // En móvil la cortina necesita más scroll para levantarse (más lenta)
    const curtainY = useTransform(scrollYProgress, [0, isMobile ? 1 : 0.9], ["0%", "-100%"]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.25], [0.85, 1]);
    const contentScale = useTransform(scrollYProgress, [0, 0.25], [0.97, 1]);

    return (
        <section
            id="servicios"
            ref={containerRef}
            className="relative pb-2 md:py-0 min-h-[85vh] md:h-[120vh] bg-gradient-to-b from-[#fcf9f2] via-[#fcf9f2] to-white !pt-0"
        >
            {/* Fondo de transición mejorado */}
            <div className="absolute top-0 left-0 w-full h-[60vh] z-0 overflow-hidden pointer-events-none">
                <Image
                    src="/Cortina-roller.jpg"
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover opacity-30 grayscale blur-[1px]"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fcf9f2]/80 to-[#fcf9f2]"></div>
            </div>

            <div className="relative md:sticky top-0 min-h-screen md:h-screen w-full overflow-visible md:overflow-hidden z-30 flex flex-col items-center">

                {/* CONTENIDO PRINCIPAL */}
                <motion.div
                    style={{ opacity: contentOpacity, scale: contentScale }}
                    className="w-full h-full flex flex-col items-center pt-24 md:pt-36 pb-6 md:pb-10 z-10"
                >
                    <div className="container mx-auto px-4 md:px-8 flex flex-col items-center h-full max-w-7xl">
                        <header className="text-center mt-6 md:mt-[12vh] mb-4 md:mb-8 flex-shrink-0">
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] md:text-sm mb-2 md:mb-3 block"
                            >
                                Excelencia en Cada Detalle
                            </motion.span>
                            <h2 className="text-3xl md:text-5xl font-black text-primary mb-2 md:mb-4 tracking-tight uppercase">
                                Nuestros Servicios
                            </h2>
                            <div className="w-16 md:w-32 h-1.5 bg-primary mx-auto rounded-full shadow-sm shadow-primary/20"></div>
                        </header>

                        {/* Contenedor scrolleable con indicador visual */}
                        <div className="relative w-full flex-grow flex flex-col max-w-5xl mx-auto h-[54vh] sm:h-[58vh] md:h-[60vh] bg-white/40 backdrop-blur-md rounded-3xl p-2 md:p-4 border border-white/60 shadow-xl shadow-primary/5">
                            {/* Gradiente superior para sugerir contenido previo */}
                            <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#fcf9f2]/90 to-transparent pointer-events-none z-20 rounded-t-3xl"></div>

                            {/* Contenedor scrolleable independiente para las cards */}
                            <div
                                className="w-full h-full overflow-y-auto overscroll-contain px-2 md:px-4 pt-4 pb-8 custom-scrollbar scroll-smooth touch-pan-y"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                                    {services.map((service, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            whileHover={{
                                                y: -6,
                                                scale: 1.02,
                                                transition: { duration: 0.3, ease: "easeOut" }
                                            }}
                                            transition={{ duration: 0.4, delay: index * 0.08 }}
                                            viewport={{ once: true }}
                                            className="group relative bg-white/95 backdrop-blur-xl rounded-[2rem] p-5 md:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,123,94,0.16)] transition-all duration-300 border border-white flex flex-col items-center text-center overflow-hidden min-h-[190px] md:min-h-[230px] cursor-pointer select-none"
                                        >
                                            {/* Glow superior dinámico */}
                                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                            {/* Círculo de luz ambiental */}
                                            <div className="absolute -right-12 -top-12 w-36 h-36 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/25 group-hover:scale-125 transition-all duration-700"></div>

                                            <div className="w-14 h-14 md:w-20 md:h-20 relative mb-3 md:mb-5 flex-shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                                                <Image
                                                    src={service.image}
                                                    alt={service.title}
                                                    fill
                                                    sizes="(max-width: 768px) 56px, 80px"
                                                    className="object-contain drop-shadow-2xl"
                                                />
                                            </div>

                                            <div className="relative z-10">
                                                <h3 className="text-lg md:text-2xl font-black text-gray-900 mb-1.5 md:mb-3 group-hover:text-primary transition-colors duration-300 tracking-tight leading-none">
                                                    {service.title}
                                                </h3>
                                                <p className="text-gray-600 text-xs md:text-sm leading-relaxed font-medium italic">
                                                    {service.description}
                                                </p>
                                            </div>

                                            {/* Zócalo de acento activo */}
                                            <div className="absolute bottom-0 left-0 w-0 h-1.5 bg-primary group-hover:w-full transition-all duration-500 ease-in-out shadow-[0_-5px_20px_rgba(0,123,94,0.4)]"></div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Gradiente inferior de suavizado */}
                            <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-20 rounded-b-3xl"></div>
                        </div>
                    </div>
                </motion.div>

                {/* CORTINA ROLLER ANIMADA */}
                <motion.div
                    style={{ y: curtainY }}
                    className="absolute inset-0 z-40 pointer-events-auto"
                >
                    <div className="relative w-full h-full flex flex-col">
                        {/* Cabezal de la cortina (Soporte) */}
                        <div className="absolute top-0 left-0 w-full h-12 md:h-16 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200 z-[60] shadow-lg border-b border-gray-400/30 flex items-center justify-center">
                            <div className="w-full h-[2px] bg-white/20 absolute top-1/2 -translate-y-1/2"></div>
                        </div>

                        {/* Tela de la cortina */}
                        <div className="relative flex-1 w-full bg-white shadow-[0_20px_80px_rgba(0,0,0,0.15)] overflow-hidden">
                            {/* Textura de tela sutil */}
                            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>

                            {/* Marcado de branding tenue */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] p-12">
                                <div className="relative w-full max-w-[300px] md:max-w-[600px] aspect-video">
                                    <Image
                                        src="/logo_proroller.png"
                                        alt="Branding"
                                        fill
                                        sizes="(max-width: 768px) 300px, 600px"
                                        className="grayscale object-contain"
                                    />
                                </div>
                            </div>

                            {/* Zócalo inferior de la cortina */}
                            <div className="absolute bottom-0 left-0 w-full h-8 md:h-12 bg-gradient-to-b from-gray-100 to-gray-200 border-t border-gray-300 shadow-inner flex items-center justify-center">
                                <div className="w-24 md:w-64 h-1.5 bg-white/50 rounded-full shadow-sm"></div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Sombras laterales para profundidad */}
                <div className="absolute inset-y-0 left-0 w-8 md:w-32 bg-gradient-to-r from-black/5 to-transparent z-[35] pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-8 md:w-32 bg-gradient-to-l from-black/5 to-transparent z-[35] pointer-events-none"></div>
            </div>
        </section>
    );
};

export default Services;
