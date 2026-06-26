'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const AnimatedLogo = () => {
    return (
        <div className="relative w-full h-full flex items-center justify-center scale-110 group select-none">

            {/* 
              1. CAPA ROTATORIA: EL ANILLO DE DIENTES (Limpio y Uniforme)
              Usamos una máscara radial que crea un ANILLO perfecto.
              Esto corta CUALQUIER rastro de los picos/extremos (los marcados en rojo)
              haciendo que solo giren los dientes pequeños por detrás.
            */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 z-0 flex items-center justify-center"
            >
                <div
                    className="w-full h-full relative"
                    style={{
                        // Definimos un anillo muy estricto:
                        // - Transparente del 0 al 38% (centro)
                        // - Negro del 39% al 44% (el área exacta de los dientes pequeños)
                        // - Transparente del 45 al 100% (esto corta los picos externos de una vez por todas)
                        WebkitMaskImage: 'radial-gradient(circle, transparent 38%, black 39%, black 43%, transparent 44%)',
                        maskImage: 'radial-gradient(circle, transparent 38%, black 39%, black 43%, transparent 44%)',
                    }}
                >
                    <Image
                        src="/logo_proroller.png"
                        alt=""
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </motion.div>

            {/* 
              2. CAPA FRONTAL ESTÁTICA: El Banner y el Centro (Sin los picos)
              Mostramos el logo original pero cortamos los extremos superior e inferior 
              para que quede una pieza limpia y horizontal.
            */}
            <div
                className="absolute inset-0 z-10 flex items-center justify-center"
                style={{
                    // Máscara combinada:
                    // - El círculo central (ProRoller)
                    // - La franja horizontal del banner (entre 42% y 58% de altura)
                    // Con esto ELIMINAMOS los extremos de arriba y abajo que marcaste en rojo.
                    WebkitMaskImage: `
                        radial-gradient(circle, black 38.5%, transparent 39%), 
                        linear-gradient(to bottom, transparent 41.5%, black 42%, black 58%, transparent 58.5%)
                    `,
                    maskImage: `
                        radial-gradient(circle, black 38.5%, transparent 39%), 
                        linear-gradient(to bottom, transparent 41.5%, black 42%, black 58%, transparent 58.5%)
                    `,
                    WebkitMaskComposite: 'source-over',
                    maskComposite: 'add',
                }}
            >
                <div className="w-full h-full relative">
                    <Image
                        src="/logo_proroller.png"
                        alt="ProRoller Logo Static"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>

            {/* Aura sutil premium */}
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-[90px] opacity-10 pointer-events-none"></div>
        </div>
    );
};

export default AnimatedLogo;
