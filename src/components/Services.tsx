'use client';

import { useRef } from 'react';
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
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const curtainY = useTransform(scrollYProgress, [0, 0.4], ["0%", "-100%"]);
    const contentOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
    const contentScale = useTransform(scrollYProgress, [0.1, 0.4], [0.95, 1]);

    return (
        <section
            id="servicios"
            ref={containerRef}
            className="relative h-[300vh] md:h-[250vh] bg-gradient-to-b from-[#fcf9f2] via-[#fcf9f2] to-white !pt-0"
        >
            {/* Fondo de transición mejorado */}
            <div className="absolute top-0 left-0 w-full h-[60vh] z-0 overflow-hidden pointer-events-none">
                <Image
                    src="/Cortina-roller.jpg"
                    alt=""
                    fill
                    className="object-cover opacity-30 grayscale blur-[1px]"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fcf9f2]/80 to-[#fcf9f2]"></div>
            </div>

            <div className="sticky top-0 h-screen w-full overflow-hidden z-30 flex flex-col items-center">

                {/* CONTENIDO PRINCIPAL */}
                <motion.div
                    style={{ opacity: contentOpacity, scale: contentScale }}
                    className="w-full h-full flex flex-col items-center pt-32 md:pt-44 pb-10 z-10"
                >
                    <div className="container mx-auto px-4 md:px-8 flex flex-col items-center h-full max-w-7xl">
                        <header className="text-center mb-10 md:mb-16 flex-shrink-0">
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] md:text-sm mb-3 block"
                            >
                                Excelencia en Cada Detalle
                            </motion.span>
                            <h2 className="text-4xl md:text-5xl font-black text-primary mb-4 tracking-tight uppercase">
                                Nuestros Servicios
                            </h2>
                            <div className="w-16 md:w-32 h-1.5 bg-primary mx-auto rounded-full shadow-sm shadow-primary/20"></div>
                        </header>

                        {/* Contenedor scrolleable con indicador visual */}
                        <div className="relative w-full flex-grow overflow-hidden flex flex-col pt-4">
                            <div className="w-full h-full overflow-y-auto px-4 pb-32 custom-scrollbar scroll-smooth">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                                    {services.map((service, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            whileHover={{
                                                y: -15,
                                                scale: 1.03,
                                                transition: { duration: 0.4, ease: "easeOut" }
                                            }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            viewport={{ once: true }}
                                            className="group relative bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_80px_rgba(0,123,94,0.18)] transition-all duration-500 border border-white flex flex-col items-center text-center overflow-hidden min-h-[260px] md:min-h-[320px] cursor-pointer"
                                        >
                                            {/* Glow superior dinámico */}
                                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                            {/* Círculo de luz ambiental */}
                                            <div className="absolute -right-12 -top-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/25 group-hover:scale-125 transition-all duration-700"></div>

                                            <div className="w-20 h-20 md:w-28 md:h-28 relative mb-6 md:mb-10 flex-shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                                                <Image
                                                    src={service.image}
                                                    alt={service.title}
                                                    fill
                                                    className="object-contain drop-shadow-2xl"
                                                />
                                            </div>

                                            <div className="relative z-10">
                                                <h3 className="text-xl md:text-3xl font-black text-gray-900 mb-3 md:mb-4 group-hover:text-primary transition-colors duration-300 tracking-tight leading-none">
                                                    {service.title}
                                                </h3>
                                                <p className="text-gray-600 text-sm md:text-lg leading-relaxed font-semibold italic">
                                                    {service.description}
                                                </p>
                                            </div>

                                            {/* Zócalo de acento activo */}
                                            <div className="absolute bottom-0 left-0 w-0 h-2 bg-primary group-hover:w-full transition-all duration-700 ease-in-out shadow-[0_-5px_20px_rgba(0,123,94,0.4)]"></div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                            {/* Gradiente de ayuda visual al final para indicar más contenido y transición a blanco */}
                            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-20"></div>
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
