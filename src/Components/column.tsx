// Column.tsx
import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { CardProps } from './Card';
import Card from './Card';

interface ColumnProps {
  id: string;
  title: string;
  cards: CardProps[];
  onDrop: (cardId: string, targetColumnId: string) => void;
}

const Column: React.FC<ColumnProps> = ({ id, title, cards, onDrop }) => {
  // Initialize the drop target using the ref
  const ref = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop({
    accept: 'CARD', // Accept draggable cards
    drop: (item: { id: string; status: string }) => {
      onDrop(item.id, id); // Handle drop logic
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(), // Detect if a card is hovering over the column
    }),
  });

  // Connect the drop target to the ref
  drop(ref);

  return (
    <div
      ref={ref} // Correctly set the ref to the drop target
      className={`column ${isOver ? 'bg-gray-200' : 'bg-white'}`}
      style={{
        width: '200px',
        minHeight: '300px',
        border: '1px solid gray',
        padding: '8px',
        transition: 'background-color 0.3s ease',
      }}
    >
      <h3>{title}</h3>
      {cards.map((card) => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  );
};

export default Column;
