// Framer Motion animation variants for consistent animations across the app

export const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
};

export const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
};

export const slideInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
};

export const slideInDown = {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
};

export const slideInLeft = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
};

export const slideInRight = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
};

export const scaleIn = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
};

export const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

export const staggerItem = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

export const hoverScale = {
    rest: { scale: 1 },
    hover: {
        scale: 1.05,
        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
    },
    tap: { scale: 0.98 }
};

export const hoverGlow = {
    rest: {
        boxShadow: "0 0 20px rgba(124, 58, 237, 0.5)"
    },
    hover: {
        boxShadow: "0 0 40px rgba(124, 58, 237, 0.8)",
        transition: { duration: 0.3 }
    }
};

export const floatAnimation = {
    animate: {
        y: [0, -20, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

export const pulseAnimation = {
    animate: {
        scale: [1, 1.05, 1],
        opacity: [1, 0.8, 1],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

export const rotateAnimation = {
    animate: {
        rotate: 360,
        transition: {
            duration: 20,
            repeat: Infinity,
            ease: "linear"
        }
    }
};

export const shimmerAnimation = {
    animate: {
        backgroundPosition: ["0% 0%", "100% 0%"],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "linear"
        }
    }
};

// AR-specific animations
export const arBadgeFloat = {
    animate: {
        y: [0, -10, 0],
        scale: [1, 1.02, 1],
        transition: {
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

export const arDirectionalPulse = {
    animate: {
        scale: [1, 1.2, 1],
        opacity: [0.7, 1, 0.7],
        transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

// Modal/Popup animations
export const modalBackdrop = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 }
};

export const modalContent = {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 20 },
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
};

// Chat animations
export const chatBubbleLeft = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
};

export const chatBubbleRight = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
};

export const typingIndicator = {
    animate: {
        opacity: [0.4, 1, 0.4],
        transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};
