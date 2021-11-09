import React, {useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'

import bloc from '../data/building';
import {storage} from '../firebase';


const useStyles = makeStyles((theme) => ({
  searchBar: {
	marginTop: "5px",
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
	marginTop:"30px"
  },
}));



function SearchComponent(props){
	
	const [searchVal, setSearchVal] = React.useState("");
	const [inputVal, setInputVal] = React.useState("");
	const [optionValue, setOptionValue] = React.useState(0);
	const [bdata, setBdata] = React.useState(bloc);
	const [loading, setLoading] = React.useState(true);
	const [open, setOpen] = React.useState(false);
	
	const inputRef = useRef();
	const classes = useStyles();
	
	
	React.useEffect(()=>{
		var storateRef = storage.ref();
		var buildingRef = storateRef.child("/building.csv");
        buildingRef.getDownloadURL().then((url) => {
			var xhr = new XMLHttpRequest();
			  xhr.responseType = 'text'; 
			  xhr.onload = function(event) {
				var csv= xhr.response;
				setBdata(csvJSON(csv));      // now you read the file content
				setLoading(false);
			  };
			  xhr.open('GET', url);
			  xhr.send();
		})
    }, []) // <-- empty dependency array
	
	const inputHandler = (e, val) => {
		setInputVal(val);
		
		if(val.length > 1){
			setOpen(true);
		}else{
			setOpen(false);
		}
	}
	
	
	const onChangeHandler = (e, val) => {
		setSearchVal(val);
		setOpen(false);
		
		if(e._reactName === "onClick"){
			props.toParent(val);
			inputRef.current.blur();
		}
		
		else if(e._reactName === "onKeyDown"){
			onSubmitHandler(e, val);
		}
	}

	
	const onSubmitHandler = (e, val) => {
		e.preventDefault();
		inputRef.current.blur();
		setOpen(false);

		var found = false;
		
		if(typeof val === "string"){
			bdata.forEach(b => {
				if(b["대상물명"] === val){
					props.toParent(b);
					found = true;
				}
			})
			if(!found){
				window.alert("일치하는 대상물 없음");
			}
		}
		else {
			props.toParent(val);
		}

			
	}
	
	function csvJSON(csv){

	  var lines=csv.split("\r\n");

	  var result = [];
	  var headers=lines[0].split(",");

	  for(var i=1;i<lines.length;i++){

		  var obj = {};
		  var currentline=lines[i].split(",");

		  for(var j=0;j<headers.length;j++){
			  obj[headers[j]] = currentline[j];
		  }

		  result.push(obj);

	  }

	  return result
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

				<Paper>
					{optionValue === 0 ? 
					<Paper component="form" className={classes.searchBar} onSubmit={(e) => onSubmitHandler(e, searchVal)} elevation={0}>
						<SearchIcon style={{padding:"10px"}}/>
						<Autocomplete
						  id="combo-box"
						  options={bdata}
						  freeSolo
						  getOptionLabel={(option) => (typeof option) === "string" ? option : option["대상물명"]}
						  style={{ width: "100%"}}
						  onChange={(e, val) => onChangeHandler(e, val)}
						  onInputChange={inputHandler}
						  inputValue={inputVal}
						  type="text"
						  loading={loading}
						  loadingText={"데이터 로딩 중..."}
						  noOptionsText={"검색결과 없음"}
						  open={open}
						  renderInput={(params) => 
							<TextField {...params} inputRef={inputRef} placeholder="대상물 검색(2글자 이상 검색)" style={{"imeMode":"active"}}/>}
						/>
					 </Paper>
					:
						 <Paper className={classes.searchBar}>
						 	<SearchIcon style={{padding:"10px"}}/>
						 	<TextField style={{ width: "100%"}} 
								inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
								placeholder="사용승인년도 검색"/>
						 </Paper>

					 }
					<Tabs value={optionValue} onChange={(e, val)=>setOptionValue(val)} variant="fullWidth">
						<Tab label="대상물명으로 검색"/>
						<Tab label="사용승인년도로 검색" disabled/>
					</Tabs>

				</Paper>
			
			</Container>);
};

export default SearchComponent;