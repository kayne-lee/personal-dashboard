import { motion } from 'framer-motion';

export default function Widget({ id, size, isEditing, onRemove }) {
  const sizes = {
    small: 'col-span-1 row-span-1',
    medium: 'col-span-2 row-span-1',
    large: 'col-span-2 row-span-2',
  };

  const vibrate = {
    initial: { rotate: 0 },
    animate: { rotate: [0, 1, -1, 1, -1, 1, 0] },
  };

  return (
    <motion.div
      className={`relative bg-gray-300 p-4 ${sizes[size]}`}
      variants={vibrate}
      initial="initial"
      animate={isEditing ? "animate" : ""}
      transition={{ duration: 0.2, repeat: Infinity }}
    >
      <p>{size.charAt(0).toUpperCase() + size.slice(1)} Widget</p>
      {isEditing && (
        <button
          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full"
          onClick={() => onRemove(id)}
        >
          -
        </button>
      )}
    </motion.div>
  );
}
