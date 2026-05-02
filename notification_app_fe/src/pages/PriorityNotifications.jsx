import React, { useState, useMemo, useEffect } from 'react';
import {
  Typography, Box, Grid, FormControl, InputLabel,
  Select, MenuItem, CircularProgress, Alert,
  ToggleButton, ToggleButtonGroup, Chip
} from '@mui/material';
import { useNotifications } from '../hooks/useNotifications';
import NotificationCard from '../components/NotificationCard';
import { Log } from '../middleware/logging';

const TYPE_WEIGHTS = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

const PriorityNotifications = () => {
  const [topN, setTopN] = useState(10);
  const [typeFilter, setTypeFilter] = useState('');

  // getting enough items to sort locally since API limit is 10 max
  const { notifications, loading, error } = useNotifications({ limit: 10 });

  useEffect(() => {
    Log('frontend', 'info', 'page', `Priority page viewed — top ${topN}, filter: ${typeFilter || 'All'}`);
  }, [topN, typeFilter]);

  const priorityList = useMemo(() => {
    if (!notifications || notifications.length === 0) return [];

    let filtered = [...notifications];

    // filter by type first
    if (typeFilter) {
      filtered = filtered.filter(n => n.Type === typeFilter);
    }

    // sort based on weight, fallback to timestamp
    filtered.sort((a, b) => {
      const weightA = TYPE_WEIGHTS[a.Type] || 0;
      const weightB = TYPE_WEIGHTS[b.Type] || 0;
      if (weightA !== weightB) return weightB - weightA;
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    return filtered.slice(0, topN);
  }, [notifications, topN, typeFilter]);

  const handleTypeChange = (event, newType) => {
    Log('frontend', 'info', 'page', `Priority filter changed to: ${newType || 'All'}`);
    setTypeFilter(newType);
  };

  const handleTopNChange = (e) => {
    Log('frontend', 'info', 'page', `Top N changed to: ${e.target.value}`);
    setTopN(e.target.value);
  };

  return (
    <Box>
      {/* Header row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Priority Inbox
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Top notifications ranked by importance (Placement &gt; Result &gt; Event) and recency
          </Typography>
        </Box>

        <FormControl size="small" sx={{ minWidth: 130 }}>
          <InputLabel>Show Top</InputLabel>
          <Select value={topN} label="Show Top" onChange={handleTopNChange} sx={{ backgroundColor: 'background.paper' }}>
            <MenuItem value={3}>Top 3</MenuItem>
            <MenuItem value={5}>Top 5</MenuItem>
            <MenuItem value={10}>Top 10</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* category filters */}
      <Box sx={{ mb: 3 }}>
        <ToggleButtonGroup
          value={typeFilter}
          exclusive
          onChange={handleTypeChange}
          aria-label="notification type filter"
          size="small"
          sx={{ backgroundColor: 'background.paper' }}
        >
          <ToggleButton value="" aria-label="all">All Types</ToggleButton>
          <ToggleButton value="Placement" aria-label="placement">Placements</ToggleButton>
          <ToggleButton value="Result" aria-label="result">Results</ToggleButton>
          <ToggleButton value="Event" aria-label="event">Events</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* weights info */}
      <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
        <Chip label="Placement — Weight 3" size="small" sx={{ backgroundColor: '#4caf5020', color: '#4caf50', fontWeight: 600 }} />
        <Chip label="Result — Weight 2" size="small" sx={{ backgroundColor: '#ff980020', color: '#ff9800', fontWeight: 600 }} />
        <Chip label="Event — Weight 1" size="small" sx={{ backgroundColor: '#2196f320', color: '#2196f3', fontWeight: 600 }} />
      </Box>

      {error && <Alert severity="warning" sx={{ mb: 2 }}>{error}</Alert>}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
          <CircularProgress />
        </Box>
      ) : priorityList.length === 0 ? (
        <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mt: 5 }}>
          No notifications found for the selected criteria.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {priorityList.map((n, index) => (
            <Grid item xs={12} key={n.ID}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Typography
                  variant="h3"
                  sx={{
                    mr: 2,
                    fontWeight: 800,
                    color: 'divider',
                    minWidth: '48px',
                    lineHeight: 1,
                    mt: 2,
                    display: { xs: 'none', sm: 'block' }
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </Typography>
                <Box sx={{ flexGrow: 1 }}>
                  <NotificationCard notification={n} />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default PriorityNotifications;
