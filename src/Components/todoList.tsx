// TodoList.tsx
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Column from './column';
import { CardProps } from './Card';

const TodoList: React.FC = () => {
  const [columns, setColumns] = useState<Record<string, CardProps[]>>({
    initial: [
      { id: '1', content: 'Task 1', status: 'Initial' },
      { id: '2', content: 'Task 2', status: 'Initial' },
    ],
    doing: [{ id: '3', content: 'Task 3', status: 'Doing' }],
    final: [],
  });

  // Handle drop event when a card is moved
  const handleDrop = (cardId: string, targetColumnId: string) => {
    setColumns((prev) => {
      const sourceColumnId = Object.keys(prev).find((key) =>
        prev[key].some((card) => card.id === cardId)
      );

      if (!sourceColumnId) return prev;

      const draggedCard = prev[sourceColumnId].find((card) => card.id === cardId);

      if (!draggedCard) return prev;

      // Move the card to the target column and update its status
      return {
        ...prev,
        [sourceColumnId]: prev[sourceColumnId].filter((card) => card.id !== cardId),
        [targetColumnId]: [
          ...prev[targetColumnId],
          { ...draggedCard, status: capitalizeFirstLetter(targetColumnId) }, // Update the status here
        ],
      };
    });
  };

  // Capitalize the first letter of a string
  const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex gap-6 p-6">
        {Object.entries(columns).map(([id, cards]) => (
          <Column
            key={id}
            id={id}
            title={capitalizeFirstLetter(id)}
            cards={cards}
            onDrop={handleDrop}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default TodoList;
