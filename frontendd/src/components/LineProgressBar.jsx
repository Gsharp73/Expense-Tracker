import React from 'react';
import { LinearProgress, Box, Typography } from '@mui/material';

const LineProgressBar = ({ label, percentage, lineColor }) => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography>{label}</Typography>
        <Typography>{percentage}%</Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{
          height: 24,
          backgroundColor: '#e0e0e0',
          '& .MuiLinearProgress-bar': {
            backgroundColor: lineColor,
            transition: 'width 1s ease-in-out',
          },
        }}
      />
    </Box>
  );
};

export default LineProgressBar;
