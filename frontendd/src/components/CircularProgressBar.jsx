import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const CircularProgressBar = ({ percentage, color }) => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <CircularProgress
        variant="determinate"
        value={percentage}
        size={100}
        thickness={5}
        sx={{
          color: color,
          position: 'relative',
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
          },
        }}
      />
      <Typography variant="h6" sx={{ position: 'absolute', fontWeight: 'bold' }}>
        {percentage}%
      </Typography>
    </Box>
  );
};

export default CircularProgressBar;
