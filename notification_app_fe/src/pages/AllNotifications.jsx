import React, { useState } from 'react';
import { 
  Typography, Box, Grid, Pagination, Select, MenuItem, 
  FormControl, InputLabel, CircularProgress, Alert, ToggleButton, ToggleButtonGroup 
} from '@mui/material';
import { useNotifications } from '../hooks/useNotifications';
import NotificationCard from '../components/NotificationCard';
import { Log } from '../middleware/logging';
import { useEffect } from 'react';

const AllNotifications = () => {
  const [page, setPage] = useState(1);
  const [type, setType] = useState('');
  const limit = 6;

  const { notifications, loading, error, total } = useNotifications({
    page,
    limit,
    notification_type: type || undefined
  });

  useEffect(() => {
    Log('frontend', 'info', 'page', `Viewing notifications page ${page}`);
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleTypeChange = (event, newType) => {
    Log('frontend', 'info', 'page', `Filtering by type: ${newType || 'All'}`);
    setType(newType);
    setPage(1);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          All Notifications
        </Typography>

        <ToggleButtonGroup
          value={type}
          exclusive
          onChange={handleTypeChange}
          aria-label="notification type"
          size="small"
          sx={{ backgroundColor: 'background.paper' }}
        >
          <ToggleButton value="" aria-label="all">All</ToggleButton>
          <ToggleButton value="Placement" aria-label="placement">Placements</ToggleButton>
          <ToggleButton value="Result" aria-label="result">Results</ToggleButton>
          <ToggleButton value="Event" aria-label="event">Events</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {error && <Alert severity="warning" sx={{ mb: 2 }}>{error}</Alert>}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {notifications.length > 0 ? (
              notifications.map(n => (
                <Grid item xs={12} sm={6} key={n.ID}>
                  <NotificationCard notification={n} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mt: 5 }}>
                  No notifications found for the selected criteria.
                </Typography>
              </Grid>
            )}
          </Grid>

          {total > limit && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
              <Pagination 
                count={Math.ceil(total / limit)} 
                page={page} 
                onChange={handlePageChange} 
                color="primary" 
                size="large"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default AllNotifications;
