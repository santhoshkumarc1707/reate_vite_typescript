import React, { useState } from 'react';

type NotificationProps = {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
};

type Notification = {
  id: number;
  message: string;
  type: 'success' | 'error';
};

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded shadow-lg ${
        type === 'success'
          ? 'bg-green-100 text-green-800'
          : 'bg-red-100 text-red-800'
      }`}
    >
      <span>{message}</span>
      <button className="ml-4" onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

const NotificationSystem: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (message: string, type: 'success' | 'error') => {
    setNotifications([...notifications, { id: Date.now(), message, type }]);
  };

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <div>
      <button
        onClick={() => addNotification('New data available!', 'success')}
      >
        Trigger Notification
      </button>
      {notifications.map((n) => (
        <Notification
          key={n.id}
          message={n.message}
          type={n.type}
          onClose={() => removeNotification(n.id)}
        />
      ))}
    </div>
  );
};

export default NotificationSystem;
