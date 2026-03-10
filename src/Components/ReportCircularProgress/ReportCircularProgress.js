import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { colors } from '@mui/material';

const useStylesFacebook = makeStyles((theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height:'250px',
    width:"250px",
  },
  bottom: {
    position:'absolute',
    left: 0,
    // color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    color:'#ccc',
  },
  top: {
    // color: '#EB8413',
    // color: ({ progressColor }) => progressColor || '#EB8413', // Default color is orange,
    color: ({progressColor}) => progressColor,
    animationDuration: '',
    position: 'absolute',
    left: 0,
    top:-5
  },
  circle: {
    strokeLinecap: 'round',
  },
  text: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));

function ReportCircularProgress(props) {
    const classes = useStylesFacebook({
      progressColor:
      props.value >= 70
        ? '#4CAF50 !important' // Green for good progress
        : props.value >= 40
        ? '#FF9800 !important' // Orange for average progress
        : '#FF0000 !important', // Red for below average progress
    });

    
  return (
    <div className={classes.root}>
      <CircularProgress
        variant="determinate"
        className={classes.bottom}
        size={40}
        thickness={3}
        {...props}
        value={100}
        style={{ width: "250px", height: "250px" }}
      />
      <CircularProgress
        // disableShrink
        className={classes.top}
        classes={{
          circle: classes.circle,
        }}
        size={40}
        thickness={5}
        {...props}
        style={{ width: "260px", height: "260px" }}
      />
      <Typography className={classes.text} variant="caption" component="div" color="textSecondary" style={{fontSize:"40px", }}>
        {`${Math.round(props.value)}%`}
      </Typography>
    </div>
  )
}

export default ReportCircularProgress