import React, {useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import bdata from '../data/building';

const useStyles = makeStyles((theme) => ({
  searchBar: {
	marginTop: "15px",
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
	height: "30%",
	marginTop:"15px"
  },
}));



function SearchComponent(props){
	
	const [searchVal, setSearchVal] = React.useState("");
	const inputRef = useRef();
	const classes = useStyles();
	
	const onChangeHandler = (e, val) => {
		setSearchVal(val);
		if(e._reactName === "onClick"){
			props.toParent(val);
			inputRef.current.blur();

		}
	}
	
	const onSubmitHandler = e => {
		e.preventDefault();
		inputRef.current.blur();

		var found = false;
		
		if(typeof searchVal === "string"){
			bdata.forEach(b => {
				if(b.name === searchVal){
					props.toParent(b);
					found = true;
				}
			})
			if(!found){
				window.alert("일치하는 대상물 없음");
				setSearchVal(null)
			}
		}
		else {
			props.toParent(searchVal);
		}

			
	}
	
	
	return(
		<Container maxWidth="sm" className={classes.searchContainer}>
				<a href='.' className={classes.title}>
					<div style={{width:"100%", textAlign:'center'}}>
						<img src='/logo.png' alt="logo" style={{verticalAlign:'bottom', maxWidth:"120px", width:"100%"}}></img>
						<h2 style={{margin:"7px 0 7px 0", fontSize:"min(3.5vw, 14px)"}}>
							  노후 소방시설 안전관리 플랫폼
						</h2>
						<h2 style={{margin:"0 0 7px 0", fontSize:"min(7vw, 28px)", fontFamily:"Vitro_core"}}> GO! 치유(治癒)</h2>
					</div>
				</a>

				<Paper component="form" className={classes.searchBar} onSubmit={onSubmitHandler}>

					<SearchIcon style={{padding:"10px"}}/>
					<Autocomplete
					  id="combo-box"
					  options={bdata}
					  freeSolo
					  getOptionLabel={(option) => (typeof option) === "string" ? option : `${option.name} (${option.year}년)`}
					  groupBy={(option) => option.location}
					  style={{ width: "100%" }}
					  onChange={(e, val) => onChangeHandler(e, val)}
					  renderInput={(params) => 
						<TextField {...params} inputRef={inputRef} placeholder="대상물 검색"/>}
					/>

				</Paper>
			</Container>);
};

export default SearchComponent;