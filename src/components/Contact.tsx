'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, MessageCircle, Clock } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contacto" className="relative py-24 bg-gradient-to-b from-[#fcf9f2] to-white overflow-hidden">
            {/* Elementos decorativos de fondo */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <header className="text-center mb-16 md:mb-24">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] md:text-sm mb-3 block"
                    >
                        ¿Hablamos?
                    </motion.span>
                    <h2 className="text-4xl md:text-6xl font-black text-primary mb-6 tracking-tight uppercase">
                        Contacto
                    </h2>
                    <div className="w-24 md:w-40 h-1.5 bg-primary mx-auto rounded-full shadow-sm shadow-primary/20"></div>
                </header>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start max-w-7xl mx-auto">
                    {/* INFO DE CONTACTO */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="w-full lg:w-5/12 space-y-8"
                    >
                        <div className="space-y-4">
                            <h3 className="text-3xl md:text-4xl font-black text-primary leading-tight">
                                Transformemos tus espacios juntos.
                            </h3>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Estamos para asesorarte en cada paso. Solicitá tu presupuesto sin cargo o dejanos tu consulta y te responderemos a la brevedad.
                            </p>
                        </div>

                        <div className="grid gap-6">
                            {[
                                {
                                    icon: <Phone className="w-6 h-6" />,
                                    label: "Teléfono / WhatsApp",
                                    value: "+598 95 113 560",
                                    href: "https://wa.me/59895113560?text=Hola%20ProRoller!%20Me%20gustar%C3%ADa%20solicitar%20un%20presupuesto%20para%20unas%20cortinas."
                                },
                                {
                                    icon: <Mail className="w-6 h-6" />,
                                    label: "Correo Electrónico",
                                    value: "proroller.uy@gmail.com",
                                    href: "mailto:proroller.uy@gmail.com"
                                },
                                {
                                    icon: <Clock className="w-6 h-6" />,
                                    label: "Atención al Cliente",
                                    value: "9:00 hs a 18:00 hs",
                                    href: "#"
                                },
                            ].map((item, index) => (
                                <motion.a
                                    key={index}
                                    href={item.href || "#"}
                                    whileHover={{ x: 10 }}
                                    className={`flex items-start gap-5 p-6 rounded-2xl border border-gray-100 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 group ${!item.href ? "cursor-default" : ""}`}
                                >
                                    <div className="bg-primary/10 text-primary p-4 rounded-xl group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                                        {item.icon}
                                    </div>
                                    <div className="pt-1">
                                        <p className="text-[10px] text-primary font-black uppercase tracking-[0.2em] mb-1">{item.label}</p>
                                        <p className="text-lg font-bold text-gray-800">{item.value}</p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        <div className="pt-8">
                            <motion.a
                                href="https://wa.me/59895113560?text=Hola%20ProRoller!%20Quiero%20transformar%20mis%20espacios.%20%C2%BFC%C3%B3mo%20podemos%20empezar%3F"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-5 rounded-2xl font-black uppercase tracking-wider shadow-lg shadow-[#25D366]/20 hover:shadow-[#25D366]/40 transition-all text-sm"
                            >
                                <MessageCircle fill="currentColor" className="w-6 h-6" />
                                Chat directo por WhatsApp
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* FORMULARIO */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-full lg:w-7/12"
                    >
                        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,123,94,0.08)] border border-gray-50 relative overflow-hidden group">
                            {/* Decoración del formulario */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>

                            <form className="space-y-6 relative z-10">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Nombre Completo</label>
                                        <input
                                            type="text"
                                            placeholder="Tu nombre..."
                                            className="w-full p-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white transition-all outline-none font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Teléfono</label>
                                        <input
                                            type="tel"
                                            placeholder="Ej: +598 9x xxx xxx"
                                            className="w-full p-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white transition-all outline-none font-medium"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Tipo de Servicio</label>
                                    <select className="w-full p-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white transition-all outline-none font-medium appearance-none">
                                        <option>Cortinas Roller</option>
                                        <option>Cortinas Tradicionales</option>
                                        <option>Automatización</option>
                                        <option>Presupuesto Integral</option>
                                        <option>Otros</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Tu Mensaje</label>
                                    <textarea
                                        placeholder="Contanos sobre tu proyecto..."
                                        className="w-full p-4 bg-gray-50/50 border border-gray-200 rounded-2xl h-40 focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white transition-all outline-none resize-none font-medium"
                                    ></textarea>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all flex items-center justify-center gap-3"
                                >
                                    Enviar solicitud
                                    <Send className="w-5 h-5" />
                                </motion.button>

                                <p className="text-center text-gray-400 text-[10px] font-medium uppercase tracking-widest pt-4">
                                    Te responderemos en menos de 24 horas hábiles
                                </p>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
