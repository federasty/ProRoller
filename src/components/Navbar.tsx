'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const event = new CustomEvent('menuToggle', { detail: { isOpen } });
        window.dispatchEvent(event);
    }, [isOpen]);

    const navLinks = [
        { name: 'Servicios', href: '#servicios' },
        { name: 'Nosotros', href: '#nuestrosTrabajos' },
        { name: 'Contacto', href: '#contacto' },
    ];

    const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsOpen(false);
        const targetId = href.replace('#', '');
        const elem = document.getElementById(targetId);
        if (elem) {
            const offset = 80; // Offset for fixed header
            const elementPosition = elem.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    // Variantes para el menú mobile premium (efecto cortina)
    const curtainLeftVariants = {
        closed: {
            x: "-100%",
            transition: {
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1] as any
            }
        },
        open: {
            x: 0,
            transition: {
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1] as any
            }
        }
    };

    const curtainRightVariants = {
        closed: {
            x: "100%",
            transition: {
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1] as any
            }
        },
        open: {
            x: 0,
            transition: {
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1] as any
            }
        }
    };

    const contentVariants = {
        closed: {
            opacity: 0,
            y: 20,
            transition: {
                duration: 0.3,
                ease: "easeIn" as any
            }
        },
        open: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.25, // Esperar a que las cortinas cierren el centro
                duration: 0.4,
                ease: "easeOut" as any
            }
        }
    };

    const linkVariants = {
        closed: { opacity: 0, x: 30 },
        open: (i: number) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: 0.35 + (i * 0.08), // Sincronizado con el cierre de las cortinas
                duration: 0.4,
                ease: "easeOut" as any
            }
        })
    };

    return (
        <nav className={`fixed w-full z-[100] transition-all duration-500 ${scrolled ? 'bg-white/95 border-b border-gray-100 shadow-sm py-2' : 'bg-transparent py-4'}`}>
            <div className="w-full px-4 md:px-10 flex justify-between items-center relative z-[110]">
                {/* Logo */}
                <Link
                    href="/"
                    onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setIsOpen(false);
                    }}
                    className="relative h-9 w-28 md:h-16 md:w-56 transition-transform duration-300 hover:scale-105"
                >
                    <Image
                        src="/logo_proroller.png"
                        alt="ProRoller Logo"
                        fill
                        className="object-contain object-left"
                        priority
                    />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-10">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleNavLinkClick(e, link.href)}
                            className="relative group py-2"
                        >
                            <span className={`font-bold transition-colors text-lg ${scrolled ? 'text-gray-700' : 'text-gray-800'} group-hover:text-primary`}>
                                {link.name}
                            </span>
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    ))}
                    <a
                        href="https://wa.me/59895113560?text=Hola%20ProRoller!%20Me%20gustar%C3%ADa%20solicitar%20un%20presupuesto%20gratis%20para%20unas%20cortinas."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary py-2.5 px-7 text-sm font-bold tracking-wide"
                    >
                        Presupuesto Gratis
                    </a>
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden relative z-[120] w-12 h-12 flex items-center justify-center focus:outline-none bg-white/10 rounded-full"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Menu"
                >
                    <div className="flex flex-col gap-1.5 w-6">
                        <motion.span
                            animate={{
                                rotate: isOpen ? 45 : 0,
                                y: isOpen ? 8 : 0,
                            }}
                            className={`h-0.5 w-full rounded-full origin-center transition-colors duration-300 bg-gray-800`}
                        />
                        <motion.span
                            animate={{
                                opacity: isOpen ? 0 : 1,
                                x: isOpen ? 10 : 0,
                            }}
                            className={`h-0.5 w-full rounded-full transition-colors duration-300 bg-gray-800`}
                        />
                        <motion.span
                            animate={{
                                rotate: isOpen ? -45 : 0,
                                y: isOpen ? -8 : 0,
                            }}
                            className={`h-0.5 w-full rounded-full origin-center transition-colors duration-300 bg-gray-800`}
                        />
                    </div>
                </button>
            </div>

            {/* Premium Mobile Menu Overlay con Efecto Cortina */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 1, transition: { delay: 0.5 } }} // Esperar a que las cortinas se deslicen hacia afuera
                        className="fixed inset-0 h-[100dvh] w-full z-[100] overflow-hidden pointer-events-none"
                    >
                        {/* Cortina Izquierda */}
                        <motion.div
                            variants={curtainLeftVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="absolute top-0 left-0 w-1/2 h-full bg-white pointer-events-auto border-r border-gray-100/80"
                        />

                        {/* Cortina Derecha */}
                        <motion.div
                            variants={curtainRightVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="absolute top-0 right-0 w-1/2 h-full bg-white pointer-events-auto"
                        />

                        {/* Contenido del Menú */}
                        <motion.div
                            variants={contentVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="absolute inset-0 h-full w-full flex flex-col pt-32 pb-12 pointer-events-auto z-10"
                        >
                            {/* Elegant background gradients */}
                            <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
                                <div className="absolute top-[-10%] right-[-10%] w-[80%] aspect-square bg-primary/10 rounded-full blur-[120px]"></div>
                                <div className="absolute bottom-[-10%] left-[-10%] w-[60%] aspect-square bg-primary/10 rounded-full blur-[100px]"></div>
                            </div>

                            <div className="flex-1 flex flex-col justify-center px-8 relative z-10">
                                <div className="space-y-6">
                                    {navLinks.map((link, i) => (
                                        <motion.div
                                            key={link.name}
                                            custom={i}
                                            variants={linkVariants}
                                            className="border-b border-gray-50 pb-4"
                                        >
                                            <a
                                                href={link.href}
                                                onClick={(e) => handleNavLinkClick(e, link.href)}
                                                className="group flex items-center justify-between"
                                            >
                                                <span className="text-4xl font-extrabold text-gray-900 group-active:text-primary transition-colors tracking-tight">
                                                    {link.name}
                                                </span>
                                                <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center group-active:bg-primary group-active:border-primary transition-all">
                                                    <svg className="w-5 h-5 text-primary group-active:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </a>
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.div
                                    custom={navLinks.length}
                                    variants={linkVariants}
                                    className="mt-12"
                                >
                                    <a
                                        href="https://wa.me/59895113560?text=Hola%20ProRoller!%20Me%20gustar%C3%ADa%20solicitar%20un%20presupuesto%20gratis%20para%20unas%20cortinas."
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-primary w-full py-5 text-xl font-black shadow-2xl shadow-primary/20 flex items-center justify-center gap-3"
                                    >
                                        Pedir Presupuesto
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 12h8m-4-4l4 4-4 4" />
                                        </svg>
                                    </a>
                                </motion.div>
                            </div>

                            {/* Social Footer Revamped */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.65 }}
                                className="px-8 mt-auto flex flex-col items-center gap-4 text-center relative z-10"
                            >
                                <div className="h-px w-20 bg-gray-100 mb-2"></div>
                                <div className="space-y-1">
                                    <p className="font-black text-gray-900 tracking-[0.2em] text-xs uppercase">Pro Roller Uruguay</p>
                                    <p className="text-gray-400 text-sm font-medium">Seguinos en nuestras redes sociales</p>
                                </div>

                                <div className="flex gap-6 pt-2">
                                    <a
                                        href="https://www.instagram.com/proroller.uy/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 bg-gray-50 rounded-xl text-gray-600 active:bg-primary active:text-white transition-all shadow-sm"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412.56.216.96.475 1.382.897.422.422.681.822.897 1.382.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.013 3.584-.07 4.85c-.054 1.17-.249 1.805-.413 2.227-.216.56-.475.96-.897 1.382-.422.422-.822.681-1.382.897-.422.164-1.057.36-2.227.413-1.266.057-1.646.07-4.85.07s-3.584-.013-4.85-.07c-1.17-.054-1.805-.249-2.227-.412-.56-.216-.96-.475-1.382-.897-.422-.422-.681-.822-.897-1.382-.422-.422-.36-1.057-.413-2.227-.057-1.266-.07-1.646-.07-4.85s.013-3.584.07-4.85c.054-1.17.249-1.805.412-2.227.216-.56.475-.96.897-1.382.422-.422.822-.681 1.382-.897.422-.164 1.057-.36 2.227-.413 1.266-.057 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.277.057-2.15.26-2.914.557-.79.307-1.459.72-2.126 1.387-.668.667-1.08 1.336-1.387 2.126-.297.764-.5 1.637-.557 2.914-.059 1.28-.073 1.688-.073 4.947s.014 3.667.072 4.947c.057 1.277.26 2.15.557 2.914.307.79.72 1.459 1.387 2.126.667.668 1.336 1.08 2.126 1.387.764.297 1.637.5 2.914.557 1.28.059 1.688.073 4.947.073s3.667-.014 4.947-.072c1.277-.057 2.15-.26 2.914-.557.79-.307 1.459-.72 2.126-1.387.667-.667 1.08-1.336 1.387-2.126.297-.764.5-1.637.557-2.914.059-1.28.073-1.688.073-4.947s-.014-3.667-.072-4.947c-.057-1.277-.26-2.15-.557-2.914-.307-.79-.72-1.459-1.387-2.126-.667-.668-1.336-1.08-2.126-1.387-.764-.297-1.637-.5-2.914-.557-1.28-.059-1.688-.073-4.947-.073z" /><path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                    </a>
                                    <a
                                        href="https://www.facebook.com/people/Proroller/100071763105055/?ref=NONE_xav_ig_profile_page_web#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 bg-gray-50 rounded-xl text-gray-600 active:bg-primary active:text-white transition-all shadow-sm"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.248h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                    </a>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
