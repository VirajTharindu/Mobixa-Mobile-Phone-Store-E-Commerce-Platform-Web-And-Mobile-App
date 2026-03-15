import { motion } from 'framer-motion';

export default function AnimatedSVGLoader() {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
            <div className="relative w-24 h-24">
                {/* Outer Ring */}
                <motion.svg
                    viewBox="0 0 100 100"
                    className="w-full h-full"
                >
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="transparent"
                        className="text-primary/20"
                    />
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="transparent"
                        strokeDasharray="283"
                        className="text-primary"
                        initial={{ strokeDashoffset: 283 }}
                        animate={{
                            strokeDashoffset: [283, 0, 283],
                            rotate: 360
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </motion.svg>

                {/* Center Logo Zap */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: [0.5, 1.2, 1], opacity: 1 }}
                    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                >
                    <svg className="w-8 h-8 text-primary fill-current" viewBox="0 0 24 24">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-20"
            >
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground animate-pulse">
                    Initializing Mobixa
                </span>
            </motion.div>
        </div>
    );
}
