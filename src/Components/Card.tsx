// Card.tsx
import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';

export interface CardProps {
  id: string;
  content: string;
  status: string; // Ensure status is included
}

const Card: React.FC<CardProps> = ({ id, content, status }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { id, status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(ref);

  return (
    <div
      ref={ref}
      className={`card ${isDragging ? 'opacity-50' : ''}`}
      style={{
        border: '1px solid black',
        padding: '8px',
        margin: '4px',
        cursor: 'move',
        backgroundColor: isDragging ? '#f0f0f0' : '#fff',
      }}
    >
      {/* Display the status along with the content */}
      <div>{content}</div>
      <div style={{ fontSize: '0.8rem', color: '#777' }}>{status}</div> {/* Show the status */}
    </div>
  );
};

export default Card;
