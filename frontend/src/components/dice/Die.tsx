import { motion } from "framer-motion";

interface DieProps {
  value: number;
  environment: string;
}

const animationVariants = {
  table: {
    initial: { y: -200, scale: 0.2, rotate: 0 },
    animate: { y: 0, scale: 1, rotate: 720 },
  },
  tower: {
    initial: { y: -400, scale: 0.2, rotate: 1080 },
    animate: { y: 0, scale: 1, rotate: 0 },
  },
};

const Die = ({ value, environment }: DieProps) => (
  <motion.div
    key={value}
    className="w-28 h-28 bg-parchment border-4 border-mana rounded-xl shadow-xl flex items-center justify-center text-5xl font-display text-ink"
    initial={animationVariants[environment].initial}
    animate={animationVariants[environment].animate}
    exit={{ scale: 0, opacity: 0 }}
    transition={{ type: "spring", stiffness: 120, damping: 20, duration: 1.5 }}
  >
    {value}
  </motion.div>
);

export default Die;
