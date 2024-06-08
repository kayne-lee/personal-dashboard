import { useDrop } from 'react-dnd';

export default function DropArea({ position, onDrop, isEditing }) {
  const [{ isOver }, drop] = useDrop({
    accept: 'WIDGET',
    drop: () => ({ position }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`relative w-full h-full ${isOver ? 'bg-blue-100' : 'bg-transparent'} ${
        isEditing ? 'border-dashed border-2 border-gray-400' : ''
      }`}
    >
      {isOver && <div className="absolute inset-0 bg-blue-100 opacity-50" />}
    </div>
  );
}
