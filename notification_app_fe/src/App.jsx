import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import Layout from './components/Layout';
import Home from './pages/Home';
import AllNotifications from './pages/AllNotifications';
import PriorityNotifications from './pages/PriorityNotifications';
import { Log } from './middleware/logging';

const AUTH_ENDPOINT = '/evaluation-service/auth';
const AUTH_PAYLOAD = {
  clientID: '87c032a7-a1c5-4d67-a36d-31c55314ebab',
  clientSecret: 'vwrmpKVsffMQvfuc',
  email: 'rahul_mahasheth@srmap.edu.in',
  name: 'Rahul Mahaseth',
  rollNo: 'AP23110011538',
  accessCode: 'QkbpxH',
};

function App() {
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      try {
        Log('frontend', 'info', 'auth', 'Initialising — fetching fresh access token');
        const res = await fetch(AUTH_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(AUTH_PAYLOAD),
        });

        if (!res.ok) {
          throw new Error(`Auth failed: ${res.status}`);
        }

        const data = await res.json();
        const token = data.access_token;

        // save new token for api calls
        localStorage.setItem('token', token);
        Log('frontend', 'info', 'auth', 'Access token obtained and stored successfully');
      } catch (err) {
        // if auth fails, we'll try to use the hardcoded one just in case
        Log('frontend', 'warn', 'auth', `Auto-auth failed, using fallback token: ${err.message}`);
      } finally {
        setAuthReady(true);
      }
    };

    // clean up old tokens first
    localStorage.removeItem('token');
    initAuth();
  }, []);

  if (!authReady) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          gap: 2,
        }}
      >
        <CircularProgress size={48} />
        <Typography variant="body1" color="text.secondary">
          Connecting to Campus Hub…
        </Typography>
      </Box>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notifications" element={<AllNotifications />} />
        <Route path="/priority" element={<PriorityNotifications />} />
      </Routes>
    </Layout>
  );
}

export default App;
