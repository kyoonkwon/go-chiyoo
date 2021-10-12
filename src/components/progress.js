import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  progress: {
	backgroundColor: "#d8d8d8",
	borderRadius: "20px",
	position: "relative",
	margin: "10px 0 10px 0",
	height: "30px",
	width: "100%",
	},

 progressPercent: {
  borderRadius: "20px",
  color: "#000",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  opacity: "0", /* dynamic - controlled by js */
  height:"100%",
  width: "0", /* dynamic - controlled by js */
  transition: "1s ease",
  padding: "0 5px",
  /* animation: takes (1 second), type=ease, delay=0.1s */
  },
  
  progressLabel:{
	  fontSize: '15px' 
  }
}));

const Progress = (props) => {
	const [style, setStyle] = React.useState({});
	const classes = useStyles();

	const red = "#F2909C";
	const orange = "#FAC898";
	const green = "#CFF0CC";
	var color = red;

	if(props.step === 2)
		color = red;
	else if(props.step=== 1)
		color = orange;
	else
		color = green;

	React.useEffect(() => {
		
		setStyle({
			width: `0`,
		});
		
		setTimeout(() => {
		setStyle({
			opacity: 1,
			width: `min(98%, ${props.percent}%)`,
			background: `${color}`,
			boxShadow: `0 3px 3px -5px ${color}, 0 2px 5px ${color}`,
		});
		}, 1000);
	}, [props.percent, color]);


	return (
	<React.Fragment>
	<div className={classes.progressLabel}><h3>{props.label}</h3></div>
	<div className={classes.progress}>
	  <div className={classes.progressPercent} style={style}>
		{Math.min(100, props.percent)}%
	  </div>
	</div>
	</React.Fragment>
	)
};

export default Progress;