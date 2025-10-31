import { motion } from 'framer-motion';

export const LoadingAnimation = () => {
  const text = "Solving...";

  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-8">
      <div className="text-2xl font-semibold text-gray-700 h-8">
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: index * 0.1,
              repeat: Infinity,
              repeatDelay: 1,
              duration: 0.3,
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>

      <div className="flex space-x-2">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-3 h-3 bg-blue-500 rounded-full"
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: index * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
};
