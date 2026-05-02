import React from 'react';
import { Typography, Grid, Paper, Box, CircularProgress, Alert } from '@mui/material';
import { 
  TrendingUp as TrendingUpIcon, 
  Group as GroupIcon, 
  NotificationsActive as NotificationsActiveIcon 
} from '@mui/icons-material';
import { useNotifications } from '../hooks/useNotifications';
import NotificationCard from '../components/NotificationCard';
import { Log } from '../middleware/logging';
import { useEffect } from 'react';
import { useReadStatus } from '../hooks/useReadStatus';

const StatCard = ({ title, value, icon, color }) => (
  <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', height: '100%' }}>
    <Box sx={{ 
      p: 1.5, 
      borderRadius: 2, 
      backgroundColor: `${color}15`, 
      color: color, 
      mr: 2,
      display: 'flex'
    }}>
      {icon}
    </Box>
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        {value}
      </Typography>
    </Box>
  </Paper>
);

const Home = () => {
  const { notifications, loading, error } = useNotifications({ limit: 10 });
  const { isRead } = useReadStatus();

  const unreadCount = notifications.filter(n => !isRead(n.ID)).length;

  useEffect(() => {
    // just log that dashboard was opened
    if (!loading && notifications.length > 0) {
      Log('frontend', 'info', 'page', 'Dashboard loaded with recent notifications');
    }
  }, [loading, notifications]);

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
      <CircularProgress />
    </Box>
  );

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} sm={4}>
          <StatCard title="Active Placements" value="12" icon={<TrendingUpIcon />} color="#4caf50" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard title="Unread Alerts" value={unreadCount} icon={<NotificationsActiveIcon />} color="#f50057" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard title="Total Notifications" value={notifications.length} icon={<GroupIcon />} color="#2196f3" />
        </Grid>
      </Grid>

      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Recent Notifications
          </Typography>
        </Box>
        
        {error && <Alert severity="warning" sx={{ mb: 2 }}>{error}</Alert>}
        
        <Grid container spacing={2}>
          {notifications.slice(0, 3).map(n => (
            <Grid item xs={12} md={4} key={n.ID}>
              <NotificationCard notification={n} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
