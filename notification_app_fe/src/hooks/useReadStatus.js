import { useState, useEffect } from 'react';

export const useReadStatus = () => {
  const [readIds, setReadIds] = useState(() => {
    const saved = localStorage.getItem('read_notifications');
    return saved ? JSON.parse(saved) : [];
  });

  const markAsRead = (id) => {
    setReadIds((prev) => {
      if (prev.includes(id)) return prev;
      const updated = [...prev, id];
      localStorage.setItem('read_notifications', JSON.stringify(updated));
      return updated;
    });
  };

  const isRead = (id) => readIds.includes(id);

  return { markAsRead, isRead };
};
