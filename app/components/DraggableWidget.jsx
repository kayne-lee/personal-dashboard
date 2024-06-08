import { useDrag } from 'react-dnd';
import Widget from './Widget';

export default function DraggableWidget({ id, size, isEditing, onDrop, onRemove }) {
  const [{ isDragging }, drag] = useDrag({
    type: 'WIDGET',
    item: { id, size },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        onDrop(item.id, dropResult);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={isEditing ? drag : null} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Widget id={id} size={size} isEditing={isEditing} onRemove={onRemove} />
    </div>
  );
}
