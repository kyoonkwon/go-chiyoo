import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import bdata from '../data/building';

const useStyles = makeStyles((theme) => ({
  searchBar: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  title: {
	color:'black',
	textDecoration: 'none',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  searchContainer:{
	display: "flex",
	justifyContent: "center",
	flexDirection: "column",
	height: "30vh"
  }
}));



function SearchComponent(props){
	
	const [searchVal, setSearchVal] = React.useState("");
	const classes = useStyles();
	
	const onChangeHandler = (e, val) => {
		setSearchVal(val);
		if(e._reactName === "onClick"){
			props.toParent(val);
		}
	}
	
	const onSubmitHandler = e => {
		e.preventDefault();
		if(searchVal)
			props.toParent(searchVal);
	}
	
	return(
		<Container maxWidth="sm" className={classes.searchContainer}>
				<a href='.' className={classes.title}>
					<div style={{width:"100%", textAlign:'center'}}>
						<img src='/logo.png' alt="logo" style={{verticalAlign:'bottom', maxWidth:"120px", width:"100%"}}></img>
						<h2 style={{margin:"7px 0", fontSize:"min(6vw, 24px)"}}>
							 노후소방시설 안전컨설팅 플랫폼
						</h2>
					</div>
				</a>

				<Paper component="form" className={classes.searchBar} onSubmit={onSubmitHandler}>

					<SearchIcon style={{padding:"10px"}}/>
					<Autocomplete
					  id="combo-box"
					  options={bdata}
					  freeSolo
					  getOptionLabel={(option) => option.name}
					  groupBy={(option) => option.location}
					  style={{ width: "100%" }}
					  onChange={(e, val) => onChangeHandler(e, val)}
					  renderInput={(params) => 
						<TextField {...params} placeholder="대상물 검색"/>}
					/>

				</Paper>
			</Container>);
};

export default SearchComponent;