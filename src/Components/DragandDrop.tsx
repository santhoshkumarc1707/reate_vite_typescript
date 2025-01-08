import React, { useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Define the drag item type
interface DragItem {
  id: string;
  content: string;
}

// Define props for DraggableItem
interface DraggableItemProps {
  id: string;
  content: string;
}

// Define props for DroppableArea
interface DroppableAreaProps {
  id: string;
  onDrop: (itemId: string, targetId: string) => void;
  children: React.ReactNode;
}

// DraggableItem Component
const DraggableItem: React.FC<DraggableItemProps> = ({ id, content }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [, dragRef] = useDrag<DragItem>({
    type: 'CARD',
    item: { id, content },
  });

  dragRef(ref);

  return (
    <div
      ref={ref}
      className="p-4 bg-blue-200 rounded-lg shadow-lg cursor-pointer text-center"
    >
      {content}
    </div>
  );
};

// DroppableArea Component
const DroppableArea: React.FC<DroppableAreaProps> = ({ id, onDrop, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [, dropRef] = useDrop<DragItem>({
    accept: 'CARD',
    drop: (item: DragItem) => {
      onDrop(item.id, id);
    },
  });

  dropRef(ref);

  return (
    <div
      ref={ref}
      className="p-6 border-2 border-dashed rounded-lg min-h-[300px] bg-gray-100 flex flex-col gap-4"
    >
      {children}
    </div>
  );
};

// Column Component
interface ColumnProps {
  columnId: string;
  items: { id: string; content: string }[];
  onDrop: (itemId: string, targetColumnId: string) => void;
}

const Column: React.FC<ColumnProps> = ({ columnId, items, onDrop }) => (
  <div className="w-1/3">
    <DroppableArea id={columnId} onDrop={onDrop}>
      {items.map((item) => (
        <DraggableItem key={item.id} id={item.id} content={item.content} />
      ))}
    </DroppableArea>
  </div>
);

// DragAndDrop Component
interface DragAndDropProps {
  initialColumns: {
    [columnId: string]: { id: string; content: string }[];
  };
}

const DragAndDrop: React.FC<DragAndDropProps> = ({ initialColumns }) => {
  const [columns, setColumns] = React.useState(initialColumns);

  const handleDrop = (itemId: string, targetColumnId: string) => {
    setColumns((prevColumns) => {
      const sourceColumnId = Object.keys(prevColumns).find((col) =>
        prevColumns[col].some((item) => item.id === itemId)
      );

      if (!sourceColumnId) return prevColumns;

      const draggedItem = prevColumns[sourceColumnId].find((item) => item.id === itemId);

      if (!draggedItem) return prevColumns;

      return {
        ...prevColumns,
        [sourceColumnId]: prevColumns[sourceColumnId].filter((item) => item.id !== itemId),
        [targetColumnId]: [...prevColumns[targetColumnId], draggedItem],
      };
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex gap-6 p-6">
        {Object.entries(columns).map(([columnId, items]) => (
          <Column
            key={columnId}
            columnId={columnId}
            items={items}
            onDrop={handleDrop}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default DragAndDrop;
