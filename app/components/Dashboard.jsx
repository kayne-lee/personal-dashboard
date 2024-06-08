"use client"
import { useState } from 'react';
import DragAndDropContext from './DragAndDropContext';
import DraggableWidget from './DraggableWidget';
import DropArea from './DropArea';

export default function Dashboard() {
  const [widgets, setWidgets] = useState([]);
  const [positions, setPositions] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const addWidget = (size) => {
    const id = widgets.length;
    setWidgets([...widgets, { id, size }]);
  };

  const handleDrop = (id, dropResult) => {
    setPositions({
      ...positions,
      [id]: dropResult.position,
    });
  };

  const handleRemove = (id) => {
    setWidgets(widgets.filter(widget => widget.id !== id));
    const updatedPositions = { ...positions };
    delete updatedPositions[id];
    setPositions(updatedPositions);
  };

  const gridTemplateColumns = 'repeat(4, 1fr)';
  const gridTemplateRows = 'repeat(4, 1fr)';
  const gap = '1rem'; // Space between grid cells

  return (
    <DragAndDropContext>
      <div className="relative p-4">
        <div className="mb-4">
          <button className="mr-2 p-2 bg-blue-500 text-white" onClick={() => addWidget('small')}>Add Small</button>
          <button className="mr-2 p-2 bg-blue-500 text-white" onClick={() => addWidget('medium')}>Add Medium</button>
          <button className="mr-2 p-2 bg-blue-500 text-white" onClick={() => addWidget('large')}>Add Large</button>
          <button className="ml-4 p-2 bg-green-500 text-white" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Stop Editing' : 'Edit'}
          </button>
        </div>
        <div
          className="grid"
          style={{ gridTemplateColumns, gridTemplateRows, gap }}
        >
          {Array.from({ length: 16 }).map((_, index) => (
            <DropArea key={index} position={index} onDrop={handleDrop} isEditing={isEditing} />
          ))}
          {widgets.map((widget) => (
            <div
              key={widget.id}
              className={`absolute ${positions[widget.id] ? `col-start-${positions[widget.id].col + 1} row-start-${positions[widget.id].row + 1}` : ''}`}
              style={{
                gridColumn: `span ${widget.size === 'large' ? 2 : widget.size === 'medium' ? 2 : 1}`,
                gridRow: `span ${widget.size === 'large' ? 2 : 1}`,
              }}
            >
              <DraggableWidget
                id={widget.id}
                size={widget.size}
                isEditing={isEditing}
                onDrop={handleDrop}
                onRemove={handleRemove}
              />
            </div>
          ))}
        </div>
      </div>
    </DragAndDropContext>
  );
}
