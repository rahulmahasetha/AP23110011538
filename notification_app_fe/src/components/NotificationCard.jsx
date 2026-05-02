import React from 'react';
import { Card, CardContent, Typography, Box, Chip, IconButton } from '@mui/material';
import { 
  Work as WorkIcon, 
  Assessment as ResultIcon, 
  Event as EventIcon,
  PushPin as PinIcon,
  Done as DoneIcon
} from '@mui/icons-material';
import { useReadStatus } from '../hooks/useReadStatus';

const typeConfig = {
  Placement: { color: '#4caf50', icon: <WorkIcon fontSize="small" />, weight: 3 },
  Result: { color: '#ff9800', icon: <ResultIcon fontSize="small" />, weight: 2 },
  Event: { color: '#2196f3', icon: <EventIcon fontSize="small" />, weight: 1 },
};

const NotificationCard = ({ notification }) => {
  const { ID, Type, Message, Timestamp, important } = notification;
  const config = typeConfig[Type] || typeConfig.Event;
  const { isRead, markAsRead } = useReadStatus();
  const read = isRead(ID);

  return (
    <Card 
      sx={{ 
        mb: 2, 
        borderLeft: `6px solid ${config.color}`,
        transition: 'all 0.2s',
        backgroundColor: read ? 'background.paper' : 'rgba(63, 81, 181, 0.02)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        },
        position: 'relative',
        overflow: 'visible'
      }}
    >
      <Box sx={{ position: 'absolute', top: -10, right: 30, display: 'flex', gap: 1 }}>
        {important && (
          <Box 
            sx={{ 
              backgroundColor: 'secondary.main', 
              color: 'white', 
              borderRadius: '50%', 
              p: 0.5,
              display: 'flex',
              boxShadow: 2
            }}
          >
            <PinIcon fontSize="small" />
          </Box>
        )}
        {!read && (
          <Chip 
            label="NEW" 
            size="small" 
            color="primary" 
            sx={{ fontWeight: 800, fontSize: '0.65rem', height: 20 }} 
          />
        )}
      </Box>

      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Chip 
            icon={config.icon} 
            label={Type} 
            size="small" 
            sx={{ 
              backgroundColor: `${config.color}15`, 
              color: config.color, 
              fontWeight: 700,
              border: `1px solid ${config.color}30`
            }} 
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="caption" color="text.secondary">
              {new Date(Timestamp).toLocaleDateString()}
            </Typography>
            {!read && (
              <IconButton 
                size="small" 
                onClick={() => markAsRead(ID)}
                sx={{ color: 'primary.main', p: 0.5 }}
                title="Mark as read"
              >
                <DoneIcon fontSize="inherit" />
              </IconButton>
            )}
          </Box>
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: read ? 'text.secondary' : 'text.primary' }}>
          {Message}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
