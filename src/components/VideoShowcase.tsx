'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles } from 'lucide-react';

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
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="flex flex-col group bg-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-100/80 hover:shadow-[0_30px_70px_rgba(0,123,94,0.08)] transition-all duration-500 p-4 md:p-6"
                    >
                        <div className="relative aspect-[9/16] md:aspect-auto md:h-[580px] w-full rounded-2xl overflow-hidden mb-6 bg-transparent">
                            <video
                                src="/video%20muestra%201.mp4"
                                className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                                playsInline
                                loop
                                controls
                                preload="metadata"
                            />
                        </div>
                        <div className="px-2 pb-2">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                                    <Sparkles size={12} />
                                    Detalle Artesanal
                                </span>
                            </div>
                            <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-2 leading-snug">
                                Confección e Instalación a Medida
                            </h3>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                Mirá de cerca la textura de nuestras telas seleccionadas y la precisión en la caída y alineación perfecta de cada paño.
                            </p>
                        </div>
                    </motion.div>

                    {/* VIDEO 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col group bg-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-100/80 hover:shadow-[0_30px_70px_rgba(0,123,94,0.08)] transition-all duration-500 p-4 md:p-6"
                    >
                        <div className="relative aspect-[9/16] md:aspect-auto md:h-[580px] w-full rounded-2xl overflow-hidden mb-6 bg-transparent">
                            <video
                                src="/video%20muestra%202.mp4"
                                className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                                playsInline
                                loop
                                controls
                                preload="metadata"
                            />
                        </div>
                        <div className="px-2 pb-2">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                                    <ShieldCheck size={12} />
                                    Tecnología de Vanguardia
                                </span>
                            </div>
                            <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-2 leading-snug">
                                Suavidad y Control Térmico
                            </h3>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                Observá el mecanismo premium de enrollado y cómo la tela blackout aísla completamente la luz externa, brindando absoluta privacidad y control térmico.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default VideoShowcase;
