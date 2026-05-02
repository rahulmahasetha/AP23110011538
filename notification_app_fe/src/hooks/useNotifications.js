import { useState, useEffect } from 'react';
import { fetchNotifications } from '../services/api';
import { Log } from '../middleware/logging';

// Mock data in case API is not available or fails
const MOCK_NOTIFICATIONS = [
  { ID: 1, Message: 'Google Placement Drive', Type: 'Placement', Timestamp: '2024-05-01', important: true },
  { ID: 2, Message: 'Semester Results Declared', Type: 'Result', Timestamp: '2024-04-30', important: false },
  { ID: 3, Message: 'Annual Tech Fest', Type: 'Event', Timestamp: '2024-04-28', important: true },
  { ID: 4, Message: 'Microsoft Internship', Type: 'Placement', Timestamp: '2024-04-25', important: true },
  { ID: 5, Message: 'Placement Workshop', Type: 'Placement', Timestamp: '2024-04-22', important: false },
];

export const useNotifications = (params = {}) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const data = await fetchNotifications(params);
        // extract the list depending on API format
        const list = Array.isArray(data) ? data : (data.notifications || []);
        setNotifications(list);
        setTotal(list.length); // fallback to array length if total isn't provided
        setError(null);
      } catch (err) {
        Log('frontend', 'warn', 'hook', 'API failed, using mock data');
        let filtered = [...MOCK_NOTIFICATIONS];
        if (params.notification_type) {
            filtered = filtered.filter(n => n.Type === params.notification_type);
        }
        
        const page = params.page || 1;
        const limit = params.limit || 10;
        const start = (page - 1) * limit;
        const end = start + limit;
        
        setNotifications(filtered.slice(start, end));
        setTotal(filtered.length);
        setError('Failed to fetch from API. Showing demo data.');
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [JSON.stringify(params)]);

  return { notifications, loading, error, total };
};
