'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
    ShoppingCart, X, Plus, Minus, Trash2, Send, Package,
    Link as LinkIcon, Settings, Zap, Ruler, Wifi, Radio,
    CircleDot, Wrench, Layers, EyeOff, Sun
} from 'lucide-react';

// ── Product Data ──────────────────────────────────────────────────────────────

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    icon: React.ReactNode;
    image: string;
    category: string;
}

const products: Product[] = [
    {
        id: 1,
        name: 'Cadena de Repuesto',
        description: 'Cadena plástica resistente, precio por metro lineal.',
        price: 120,
        icon: <LinkIcon size={28} />,
        image: '/products/cadena-repuesto.png',
        category: 'Repuestos',
    },
    {
        id: 2,
        name: 'Soporte de Pared',
        description: 'Soporte metálico universal para tubo de enrolle.',
        price: 180,
        icon: <Settings size={28} />,
        image: '/products/soporte-pared.png',
        category: 'Soportes',
    },
    {
        id: 3,
        name: 'Freno de Cadena',
        description: 'Freno de seguridad para cadena de cortina roller.',
        price: 150,
        icon: <CircleDot size={28} />,
        image: '/products/freno-cadena.png',
        category: 'Seguridad',
    },
    {
        id: 4,
        name: 'Contrapeso Inferior',
        description: 'Barra de contrapeso de aluminio para tensión uniforme.',
        price: 200,
        icon: <Ruler size={28} />,
        image: '/products/contrapeso-inferior.png',
        category: 'Repuestos',
    },
    {
        id: 5,
        name: 'Tubo de Enrolle 38mm',
        description: 'Tubo de aluminio de 38mm, precio por metro lineal.',
        price: 350,
        icon: <Package size={28} />,
        image: '/products/tubo-enrolle.png',
        category: 'Estructura',
    },
    {
        id: 6,
        name: 'Motor Tubular WiFi',
        description: 'Motor inteligente con control por app y voz.',
        price: 4500,
        icon: <Wifi size={28} />,
        image: '/products/motor-wifi.png',
        category: 'Automatización',
    },
    {
        id: 7,
        name: 'Control Remoto',
        description: 'Control remoto multicanal para motores tubulares.',
        price: 1200,
        icon: <Radio size={28} />,
        image: '/products/control-remoto.png',
        category: 'Automatización',
    },
    {
        id: 8,
        name: 'Tapas Laterales (Par)',
        description: 'Tapas decorativas de cierre lateral, set de 2 unidades.',
        price: 160,
        icon: <CircleDot size={28} />,
        image: '/products/tapas-laterales.png',
        category: 'Terminaciones',
    },
    {
        id: 9,
        name: 'Kit de Instalación',
        description: 'Kit completo con tornillos, tarugos y accesorios.',
        price: 450,
        icon: <Wrench size={28} />,
        image: '/products/kit-instalacion.png',
        category: 'Kits',
    },
    {
        id: 10,
        name: 'Tela Screen 5%',
        description: 'Tela screen con 5% de apertura, precio por metro.',
        price: 890,
        icon: <Sun size={28} />,
        image: '/products/tela-screen.png',
        category: 'Telas',
    },
    {
        id: 11,
        name: 'Tela Blackout',
        description: 'Tela blackout total, oscurecimiento al 100%.',
        price: 750,
        icon: <EyeOff size={28} />,
        image: '/products/tela-blackout.png',
        category: 'Telas',
    },
    {
        id: 12,
        name: 'Cenefa Decorativa',
        description: 'Cenefa de aluminio para acabado profesional, por metro.',
        price: 580,
        icon: <Layers size={28} />,
        image: '/products/cenefa-decorativa.png',
        category: 'Terminaciones',
    },
];

// ── Cart Types ────────────────────────────────────────────────────────────────

interface CartItem {
    product: Product;
    quantity: number;
}

// ── Format currency ───────────────────────────────────────────────────────────

const formatPrice = (price: number) => {
    return '$' + price.toLocaleString('es-UY');
};

// ── Product Card Component ────────────────────────────────────────────────────

const ProductCard = ({
    product,
    onAdd,
    onUpdateQuantity,
    cartQuantity,
    onViewImage,
}: {
    product: Product;
    onAdd: (product: Product) => void;
    onUpdateQuantity: (productId: number, delta: number) => void;
    cartQuantity: number;
    onViewImage: (product: Product) => void;
}) => {
    const handleAdd = () => {
        onAdd(product);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: 'easeOut' },
            }}
            className="group relative bg-white rounded-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,123,94,0.14)] transition-all duration-500 border border-gray-100 hover:border-primary/25 flex flex-col overflow-hidden"
        >
            {/* Top accent glow line */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>

            {/* Shine sweep reflection */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none z-10" />

            {/* ── Image Section ── */}
            <div 
                onClick={() => onViewImage(product)}
                className="relative w-full aspect-square bg-gradient-to-br from-gray-50 via-white to-gray-100/50 overflow-hidden cursor-pointer"
            >
                {/* Decorative ambient glow behind product */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-3/4 h-3/4 bg-primary/[0.04] rounded-full blur-3xl group-hover:bg-primary/[0.08] group-hover:scale-110 transition-all duration-700"></div>
                </div>

                {/* Product image */}
                <div className="relative w-full h-full p-6 md:p-8 flex items-center justify-center">
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={280}
                        height={280}
                        className="object-contain w-full h-full drop-shadow-lg group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                </div>

                {/* Category badge (floating on image) */}
                <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center text-[9px] md:text-[10px] font-bold text-primary bg-white/90 backdrop-blur-md px-3 py-1 rounded-full uppercase tracking-wider border border-primary/10 shadow-sm">
                        {product.category}
                    </span>
                </div>

                {/* Cart quantity badge on image */}
                <AnimatePresence>
                    {cartQuantity > 0 && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="absolute top-3 right-3 z-10 w-8 h-8 bg-primary text-white rounded-full text-xs font-black flex items-center justify-center shadow-lg shadow-primary/30 border-2 border-white"
                        >
                            {cartQuantity}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* ── Content Section ── */}
            <div className="flex flex-col flex-grow p-4 md:p-5">
                {/* Text content */}
                <h3 className="text-sm md:text-base font-black text-gray-900 mb-1 group-hover:text-primary transition-colors duration-300 tracking-tight leading-snug line-clamp-1">
                    {product.name}
                </h3>
                <p className="text-gray-400 text-[11px] md:text-xs leading-relaxed mb-4 font-medium line-clamp-2 flex-grow">
                    {product.description}
                </p>

                {/* Price & Action */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100/80">
                    <div>
                        <span className="text-[8px] md:text-[9px] text-gray-400 uppercase tracking-[0.15em] font-extrabold block mb-0.5">Precio</span>
                        <span className="text-lg md:text-xl font-black text-gray-900 tracking-tight">
                            {formatPrice(product.price)}
                        </span>
                    </div>

                    <div className="relative h-9 md:h-10 flex items-center justify-end">
                        <AnimatePresence mode="wait">
                            {cartQuantity === 0 ? (
                                <motion.button
                                    key="add"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    onClick={handleAdd}
                                    whileTap={{ scale: 0.9 }}
                                    className="h-9 md:h-10 px-4 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs md:text-sm font-bold flex items-center justify-center gap-1.5 transition-all duration-300 shadow-md shadow-primary/20 hover:shadow-primary/30"
                                >
                                    <Plus size={16} strokeWidth={3} />
                                    <span className="hidden sm:inline">Agregar</span>
                                </motion.button>
                            ) : (
                                <motion.div
                                    key="qty"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="flex items-center bg-primary text-white rounded-xl p-0.5 shadow-md shadow-primary/20 gap-1 h-9 md:h-10"
                                >
                                    <button
                                        onClick={() => onUpdateQuantity(product.id, -1)}
                                        className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-white/15 hover:bg-white text-white hover:text-primary flex items-center justify-center transition-all duration-200"
                                    >
                                        <Minus size={12} strokeWidth={3} />
                                    </button>
                                    <span className="w-6 text-center text-xs md:text-sm font-black select-none">
                                        {cartQuantity}
                                    </span>
                                    <button
                                        onClick={() => onUpdateQuantity(product.id, 1)}
                                        className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-white hover:bg-white/90 text-primary flex items-center justify-center transition-all duration-200"
                                    >
                                        <Plus size={12} strokeWidth={3} />
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// ── Product Detail Modal (Lightbox) ───────────────────────────────────────────

const ProductDetailModal = ({
    product,
    onClose,
    onAdd,
    cartQuantity,
    onUpdateQuantity,
}: {
    product: Product;
    onClose: () => void;
    onAdd: (product: Product) => void;
    cartQuantity: number;
    onUpdateQuantity: (productId: number, delta: number) => void;
}) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    // Close on Escape
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <>
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-md z-[250] pointer-events-auto"
            />

            {/* Modal Container */}
            <div className="fixed inset-0 flex items-center justify-center p-4 md:p-6 z-[251] pointer-events-none">
                <motion.div
                    ref={modalRef}
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                    className="w-full max-w-3xl bg-white rounded-[24px] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.3)] border border-gray-100 flex flex-col md:flex-row pointer-events-auto relative max-h-[90vh] md:max-h-[80vh]"
                >
                    {/* Close Button */}
                    <motion.button
                        onClick={onClose}
                        whileTap={{ scale: 0.95 }}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md shadow-md border border-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors z-30 pointer-events-auto"
                    >
                        <X size={20} />
                    </motion.button>

                    {/* Left Side: Large Product Image */}
                    <div className="w-full md:w-1/2 aspect-square md:aspect-auto md:h-full bg-gradient-to-br from-gray-50 via-white to-gray-100/50 flex items-center justify-center p-8 md:p-12 relative border-b md:border-b-0 md:border-r border-gray-100 shrink-0">
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-3/4 h-3/4 bg-primary/[0.03] rounded-full blur-3xl"></div>
                        </div>
                        <div className="relative w-full h-full min-h-[220px] md:min-h-[300px]">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-contain drop-shadow-xl"
                                priority
                            />
                        </div>
                    </div>

                    {/* Right Side: Details */}
                    <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
                        <div>
                            {/* Category badge */}
                            <span className="inline-flex items-center text-[9px] md:text-[10px] font-bold text-primary bg-primary/[0.04] px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-primary/10 mb-4">
                                {product.category}
                            </span>

                            {/* Title */}
                            <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-3 tracking-tight leading-tight">
                                {product.name}
                            </h2>

                            {/* Divider */}
                            <div className="w-12 h-1 bg-primary/20 rounded-full mb-4"></div>

                            {/* Description */}
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 font-medium">
                                {product.description}
                            </p>
                        </div>

                        {/* Price and CTA */}
                        <div className="pt-6 border-t border-gray-100">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <span className="text-[10px] text-gray-400 uppercase tracking-widest font-extrabold block mb-0.5">Precio Unitario</span>
                                    <span className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                                        {formatPrice(product.price)}
                                    </span>
                                </div>

                                <div className="relative h-10 md:h-12 flex items-center justify-end">
                                    <AnimatePresence mode="wait">
                                        {cartQuantity === 0 ? (
                                            <motion.button
                                                key="add-modal"
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                onClick={() => onAdd(product)}
                                                whileTap={{ scale: 0.95 }}
                                                className="h-10 md:h-12 px-6 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-md shadow-primary/20 hover:shadow-primary/30"
                                            >
                                                <Plus size={18} strokeWidth={3} />
                                                <span>Agregar al Pedido</span>
                                            </motion.button>
                                        ) : (
                                            <motion.div
                                                key="qty-modal"
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                className="flex items-center bg-primary text-white rounded-xl p-1 shadow-md shadow-primary/20 gap-2 h-10 md:h-12"
                                            >
                                                <button
                                                    onClick={() => onUpdateQuantity(product.id, -1)}
                                                    className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-white/15 hover:bg-white text-white hover:text-primary flex items-center justify-center transition-all duration-200"
                                                >
                                                    <Minus size={14} strokeWidth={3} />
                                                </button>
                                                <span className="w-8 text-center text-sm md:text-base font-black select-none">
                                                    {cartQuantity}
                                                </span>
                                                <button
                                                    onClick={() => onUpdateQuantity(product.id, 1)}
                                                    className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-white hover:bg-white/90 text-primary flex items-center justify-center transition-all duration-200"
                                                >
                                                    <Plus size={14} strokeWidth={3} />
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

// ── Cart Slide-in Panel ───────────────────────────────────────────────────────

const CartPanel = ({
    items,
    isOpen,
    onClose,
    onUpdateQuantity,
    onRemove,
    onCheckout,
}: {
    items: CartItem[];
    isOpen: boolean;
    onClose: () => void;
    onUpdateQuantity: (productId: number, delta: number) => void;
    onRemove: (productId: number) => void;
    onCheckout: () => void;
}) => {
    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const panelRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (isOpen && panelRef.current && !panelRef.current.contains(e.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose]);

    // Close on Escape
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]"
                    />

                    {/* Panel */}
                    <motion.div
                        ref={panelRef}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-[-20px_0_60px_rgba(0,0,0,0.15)] z-[201] flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                    <ShoppingCart size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-gray-900 tracking-tight">Tu Carrito</h3>
                                    <span className="text-xs text-gray-400 font-bold">
                                        {totalItems} {totalItems === 1 ? 'artículo' : 'artículos'}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="relative h-10 w-28 md:h-12 md:w-32">
                                    <Image
                                        src="/logo_proroller.png"
                                        alt="ProRoller Logo"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <motion.button
                                    onClick={onClose}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
                                >
                                    <X size={18} />
                                </motion.button>
                            </div>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-20">
                                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                                        <ShoppingCart size={32} className="text-gray-300" />
                                    </div>
                                    <p className="text-gray-400 font-bold text-lg">Tu carrito está vacío</p>
                                    <p className="text-gray-300 text-sm max-w-[200px]">Agregá accesorios del catálogo para empezar.</p>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <motion.div
                                        key={item.product.id}
                                        layout
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -30 }}
                                        className="bg-gray-50 rounded-2xl p-4 flex gap-4 group/item"
                                    >
                                        {/* Image */}
                                        <div className="relative w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
                                            <Image
                                                src={item.product.image}
                                                alt={item.product.name}
                                                fill
                                                className="object-contain p-1"
                                            />
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-gray-900 text-sm truncate">{item.product.name}</h4>
                                            <span className="text-xs text-gray-400 font-semibold">
                                                {formatPrice(item.product.price)} c/u
                                            </span>

                                            {/* Quantity controls */}
                                            <div className="flex items-center gap-2 mt-2">
                                                <button
                                                    onClick={() => onUpdateQuantity(item.product.id, -1)}
                                                    className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors"
                                                >
                                                    <Minus size={12} strokeWidth={3} />
                                                </button>
                                                <span className="w-8 text-center text-sm font-black text-gray-900">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => onUpdateQuantity(item.product.id, 1)}
                                                    className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors"
                                                >
                                                    <Plus size={12} strokeWidth={3} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Subtotal & Remove */}
                                        <div className="flex flex-col items-end justify-between shrink-0">
                                            <button
                                                onClick={() => onRemove(item.product.id)}
                                                className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-300 hover:bg-red-50 hover:text-red-500 transition-all opacity-0 group-hover/item:opacity-100"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                            <span className="text-sm font-black text-gray-900">
                                                {formatPrice(item.product.price * item.quantity)}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer with total and checkout */}
                        {items.length > 0 && (
                            <div className="border-t border-gray-100 p-6 space-y-4 bg-white">
                                {/* Total */}
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500 font-bold text-sm uppercase tracking-widest">Total</span>
                                    <span className="text-3xl font-black text-gray-900 tracking-tight">
                                        {formatPrice(total)}
                                    </span>
                                </div>

                                {/* Checkout button */}
                                <motion.button
                                    onClick={onCheckout}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 px-6 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-lg shadow-[#25D366]/30 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    Confirmar por WhatsApp
                                </motion.button>

                                <p className="text-[10px] text-center text-gray-400 font-medium">
                                    Se abrirá WhatsApp con el detalle de tu pedido
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

// ── Main Component ────────────────────────────────────────────────────────────

const AccessoriesShop = () => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    // Cargar carrito desde localStorage en el cliente
    useEffect(() => {
        const savedCart = localStorage.getItem('proroller-cart');
        if (savedCart) {
            try {
                const parsed = JSON.parse(savedCart) as { id: number; quantity: number }[];
                const reconstructedCart: CartItem[] = parsed
                    .map(savedItem => {
                        const product = products.find(p => p.id === savedItem.id);
                        if (product) {
                            return { product, quantity: savedItem.quantity };
                        }
                        return null;
                    })
                    .filter((item): item is CartItem => item !== null);
                setCart(reconstructedCart);
            } catch (e) {
                console.error('Failed to parse cart from localStorage:', e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Guardar carrito en localStorage y despachar evento de actualización
    useEffect(() => {
        if (!isLoaded) return;
        const serializableCart = cart.map(item => ({
            id: item.product.id,
            quantity: item.quantity
        }));
        localStorage.setItem('proroller-cart', JSON.stringify(serializableCart));
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        window.dispatchEvent(new CustomEvent('cartUpdate', { detail: { totalItems } }));
    }, [cart, isLoaded]);

    // Escuchar evento para abrir el carrito desde la Navbar
    useEffect(() => {
        const handleOpenCart = () => setIsCartOpen(true);
        window.addEventListener('openCart', handleOpenCart);
        return () => window.removeEventListener('openCart', handleOpenCart);
    }, []);

    useEffect(() => {
        console.log('AccessoriesShop cartToggle dispatching:', isCartOpen);
        const event = new CustomEvent('cartToggle', { detail: { isOpen: isCartOpen } });
        window.dispatchEvent(event);
    }, [isCartOpen]);

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    const addToCart = useCallback((product: Product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.product.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { product, quantity: 1 }];
        });
    }, []);

    const updateQuantity = useCallback((productId: number, delta: number) => {
        setCart((prev) =>
            prev
                .map((item) =>
                    item.product.id === productId
                        ? { ...item, quantity: Math.max(0, item.quantity + delta) }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    }, []);

    const removeFromCart = useCallback((productId: number) => {
        setCart((prev) => prev.filter((item) => item.product.id !== productId));
    }, []);

    const getCartQuantity = useCallback(
        (productId: number) => {
            const item = cart.find((i) => i.product.id === productId);
            return item ? item.quantity : 0;
        },
        [cart]
    );

    const handleCheckout = useCallback(() => {
        if (cart.length === 0) return;

        const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

        let message = '🛒 *Pedido ProRoller - Accesorios*\n\n';
        cart.forEach((item) => {
            const subtotal = item.product.price * item.quantity;
            message += `• ${item.product.name} x${item.quantity} — ${formatPrice(subtotal)}\n`;
        });
        message += `\n*Total: ${formatPrice(total)}*\n\n`;
        message += '¡Hola! Quiero confirmar este pedido de accesorios.';

        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/59895113560?text=${encoded}`, '_blank');
    }, [cart]);

    return (
        <section id="accesorios" className="relative py-20 md:py-28 bg-gradient-to-b from-white via-[#fcf9f2] to-white overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

            <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
                {/* Section Header */}
                <header className="text-center mb-12 md:mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] md:text-sm mb-3 block"
                    >
                        Todo lo que Necesitás
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-primary mb-4 tracking-tight uppercase"
                    >
                        Accesorios
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="w-16 md:w-32 h-1.5 bg-primary mx-auto rounded-full shadow-sm shadow-primary/20"
                    ></motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-500 text-sm md:text-lg font-medium mt-6 max-w-2xl mx-auto leading-relaxed"
                    >
                        Repuestos, automatismos y materiales para tus cortinas.
                        Armá tu pedido mediante nuestro carrito y confirmalo directamente por WhatsApp.
                    </motion.p>
                </header>

                {/* Product Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAdd={addToCart}
                            onUpdateQuantity={updateQuantity}
                            cartQuantity={getCartQuantity(product.id)}
                            onViewImage={setSelectedProduct}
                        />
                    ))}
                </div>
            </div>

            {/* Cart Panel */}
            <CartPanel
                items={cart}
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
                onCheckout={handleCheckout}
            />

            {/* Product Detail Modal */}
            <AnimatePresence>
                {selectedProduct && (
                    <ProductDetailModal
                        product={selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                        onAdd={addToCart}
                        onUpdateQuantity={updateQuantity}
                        cartQuantity={getCartQuantity(selectedProduct.id)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default AccessoriesShop;
