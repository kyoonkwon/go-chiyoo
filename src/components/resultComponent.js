/* global kakao */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Alert from '@material-ui/lab/Alert';


import Progress from './progress';
import geometry from '../data/geometry';
import consultData from '../data/consultData';

const curYear = new Date().getFullYear();


const useStyle = makeStyles((theme) => ({
	
	paperTab:{
		paddingLeft: "10px",
		height: "100%",
		border: "1px solid #808080"
	},
	
	
	circle:{
		height:"30px",
		width:"30px",
		border:"2px solid",
		borderRadius:"50%",
		margin:"10px auto 10px auto",
		lineHeight:"30px",
		textAlign:'center',
		fontSize:'12px'
	},
	
	consult: {
		['@media (max-width:960px)']: { // eslint-disable-line no-useless-computed-key
		  height: '100%'
		}
  	},
	
	facilityClass:{
		['@media (max-width:960px)']: { // eslint-disable-line no-useless-computed-key
		  marginBottom: '0'
		}
	}
	
}))

const calcSP = (year => Math.min(100, Math.round(0.7407 * Math.pow(curYear - year, 1.4053))));
const calcAlarm = (year => Math.min(100, Math.round(((curYear-year) * 25.73) / 9.08 )));
const calcBalcony = (year => Math.min(100, Math.round(15.917 * Math.pow(curYear - year, 0.5622))));


function FacilityComponent(props){
	const classes = useStyle();
	const facilityName = ["스트레이너(SP설비)", "화재감지시간 (자동화재탐지설비)", "부식진행상태 (다중이용업소 발코니)"]
	const facilityEng = ["sp", 'alarm', 'balcony'];
	const imgext = ["JPG", "PNG", "JPG"];
	
	const cdata = consultData[props.facility];
	
	const status = ["안심", "경고", "위험"];	
	const colors = ['green', 'orange', 'red'];
		
	var step;
	for (step = 0; step < 3; step++) {
		if(props.percent < cdata[step].level){
			break;
		}
	}	
	
	return(
	<Paper style={{height:"100%", width:"95%", padding:'5px', marginBottom:"20px"}}>
		<Grid container direction='row' spacing={2}>
			<Grid item xs={12} sm={12} md={4} style={{textAlign:"center", paddingRight:"0"}}> 
				<h4 className={classes.facilityClass}>{facilityName[props.facility]}</h4>
			</Grid>
			<Grid container item xs={12} sm={12} md={8}>
				<Grid item xs={3} style={{textAlign:'center', paddingTop:'5px'}}>
					<div className={classes.circle} style={{color:colors[step], borderColor:colors[step]}}>
						<b>{status[step]}</b>
					</div>
				</Grid>
				<Grid item xs={8}>
					<div style={{display:'flex', alignItems:'center', height:"100%"}}>
						<Progress percent={props.percent} step={step}/>
					</div>
				</Grid>
			</Grid>
		</Grid>
		<Grid item container spacing={1} direction="row" justifyContent="center" alignItems="stretch">
				<Grid item xs={12} sm={12} md={4} style={{textAlign:"center"}}>
					<Paper variant='outlined' className={classes.paperTab}>
						<img src={`/images/${facilityEng[props.facility]}/level${step+1}.${imgext[props.facility]}`}
							alt={`${facilityEng[props.facility]}_level${step+1}`} style={{width:"100%", maxWidth:"300px"}}></img>
						{props.facility === 0 ? 
							<img src={`/images/sp/level${step+1}_2.JPG`}
							alt={`sp_level${step+1}_2`} style={{width:"100%", maxWidth:"300px"}}></img> :
						<React.Fragment></React.Fragment>}
					</Paper>
				</Grid>
				<Grid item container spacing={1} direction="column" xs={12} sm={12} md={8} className={classes.consult}>
					<Grid item style={{height:"50%"}}>
						<Paper variant='outlined' className={classes.paperTab}>
							<div style={{padding:'10px'}}>
								<h4 style={{margin:"5px 0"}}>[증상 및 위험성]</h4>
								<ul style={{paddingLeft:'15px', fontSize:'min(16px, 4vw)'}}>
									{cdata[step].symptom.map((x, idx) => <li key={idx}>{x}</li>)}
								</ul>
							</div>
						</Paper>
					</Grid>
					<Grid item style={{height:"50%"}}>
						<Paper variant='outlined' className={classes.paperTab}>
							<div style={{padding:'10px'}}>
								<h4 style={{margin:"5px 0"}}>[조치사항]</h4>
								<ul style={{paddingLeft:'15px', fontSize:'min(16px, 4vw)'}}>
									{cdata[step].consult.map((x, idx) => <li key={idx}>{x}</li>)}
								</ul>
							</div>
						</Paper>
					</Grid>
				</Grid>
		</Grid>	
	</Paper>

	);
}


function KakaoMapComponent(props){
	
	React.useEffect(()=>{
		var container = document.getElementById('map');
		var options = {
		  center: new kakao.maps.LatLng(37.3798877, 126.8031025),
		  level: 8
		};
		// eslint-disable-next-line
		var map = new kakao.maps.Map(container, options);

		var polygonPath = []

		var cy=0, cx=0;
		var n_poly = 0;
		var centerLoc;
		
		geometry["features"].forEach(f => {
			if(f["properties"]["EMD_KOR_NM"] === props.dong){
				f["geometry"]['coordinates'].forEach(area =>{

					if(area.length === 1){
						polygonPath.push(area[0].map(xy => new kakao.maps.LatLng(xy[1], xy[0])));
						area[0].forEach(xy => {
							cy += xy[1];
							cx += xy[0];
							n_poly += 1;
						})
					}
					else{
						polygonPath.push(area.map(xy => new kakao.maps.LatLng(xy[1], xy[0])));
						area.forEach(xy => {
							cy += xy[1];
							cx += xy[0];
							n_poly += 1;
						})
					}
				})
			}
		})
	
		if(n_poly >0){
			centerLoc = new kakao.maps.LatLng(cy/n_poly, cx/n_poly); 
			map.setCenter(centerLoc);


			var customOverlay = new kakao.maps.CustomOverlay({
				position : centerLoc, 
				content : '<h4>' + props.dong + '</h4>',
			});

			customOverlay.setMap(map);
		}
		else{
			// nfsa
			var y = 36.52280965835811,
				x = 127.05432936729997;
			
			centerLoc = new kakao.maps.LatLng(y, x); 
			map.setCenter(centerLoc);


			var markerPosition = centerLoc; 

			var marker = new kakao.maps.Marker({
				position: markerPosition
			});

			marker.setMap(map); 
			map.setLevel(5);
			
		}


		var polygon = new kakao.maps.Polygon({
			path:polygonPath, // 그려질 다각형의 좌표 배열입니다
			strokeWeight: 3, // 선의 두께입니다
			strokeColor: '#39DE2A', // 선의 색깔입니다
			strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
			strokeStyle: 'solid', // 선의 스타일입니다
			fillColor: '#A2FF99', // 채우기 색깔입니다
			fillOpacity: 0.7 // 채우기 불투명도 입니다
		});

		polygon.setMap(map);

	
    }, [props.dong])
	


    return (
        <div>
        	<div id="map" style={{width:"100%", height:"300px"}}></div>
       
        </div>
    )

}

function ResultComponent(props){
	const classes = useStyle();
	
	function createData(name, level1, level2, level3) {
	  return { name, level1, level2, level3 };
	}
	
	const Item = ({ text }) => {
	  return text;
	};

	const rows = [
	  createData(<Item text={["스트레이너", <wbr/>, " (SP설비)"]}/>, "~30%", '30~60%', "60%~"),
	  createData(<Item text={["화재감지시간", <wbr/>,  " (자동화재", <wbr/>,"탐지설비)"]}/>, "~20%", "20~40%", "40%~"),
	  createData(<Item text={["부식진행상태", <wbr/>, " (다중이용업소", <wbr/>," 발코니)"]}/>, "~40%", "40~75%", "75%~"),
	];
	
		
	return(
		<Container maxWidth="md" style={{marginTop:"20px"}}>
			{props.value ?
			<Grid container direction="column" spacing={3} style={{alignItems:'center'}}>
				<Paper style={{height:"100%", width:"95%", padding:'5px', marginBottom:"20px"}}>
					<Grid item container spacing={1} direction="row" justifyContent="center" alignItems="stretch">
						<Grid item xs={12} sm={12} md={12}>
							<Paper variant='outlined' className={classes.paperTab}>
								<KakaoMapComponent dong={props.value.location}/>
							</Paper>
						</Grid>
					</Grid>
				</Paper>
				<FacilityComponent facility={0} percent={calcSP(props.value.year)}/>
				<FacilityComponent facility={1} percent={calcAlarm(props.value.year)}/>
				<FacilityComponent facility={2} percent={calcBalcony(props.value.year)}/>
			</Grid> :
			<React.Fragment>
			<TableContainer component={Paper} style={{maxWidth:"550px", margin:"0 auto"}}>
			  <Table aria-label="simple table">
				<TableHead>
				  <TableRow>
					<TableCell align="right" style={{padding:"0"}}></TableCell>
					<TableCell align="right" style={{padding:"0"}}>
						<div className={classes.circle} style={{color:'green', borderColor:'green'}}>
							<b>안심</b>
						</div>
					</TableCell>
					<TableCell align="right" style={{padding:"0"}}>
						<div className={classes.circle} style={{color:'orange', borderColor:'orange'}}>
							<b>경고</b>
						</div>					  
					</TableCell>
					<TableCell align="right" style={{padding:"0"}}>
						<div className={classes.circle} style={{color:'red', borderColor:'red'}}>
							<b>위험</b>
						</div>					
				    </TableCell>
				  </TableRow>
				</TableHead>
				<TableBody>
				  {rows.map((row) => (
					<TableRow key={row.name}>
					  <TableCell align="right">
						<b><p style={{whiteSpace:"pre"}}>{row.name}</p></b>
					  </TableCell>
					  <TableCell align="center">{row.level1}</TableCell>
					  <TableCell align="center">{row.level2}</TableCell>
					  <TableCell align="center">{row.level3}</TableCell>
					</TableRow>
				  ))}
				</TableBody>
			  </Table>
			</TableContainer>
			<br />
			<Alert severity="info" style={{maxWidth:"540px", margin:"0 auto"}}>
				소방관, 건물관리자, 소방시설관리업체 등 누구나 안전관리플랫폼에 접속(go)하여 건물 소방시설의 노후도를 인지해 적극적인 소방시설 개선(治癒)을 유도,안전한 대한민국을 조성하는 민관 안전공유 플랫폼임. <br /> 
				플랫폼 네이밍에는 오래되어 아픈 소방시설을 '고치러 가자'라는 직관적이고 중의적 의미를 내포
			</Alert>
			<br />
			<Alert severity="warning" style={{maxWidth:"540px", margin:"0 auto"}}>
				<b>인터넷 익스플로러</b>에서는 본 웹사이트가 정상적으로 동작하지 않습니다. <b>구글 크롬</b>이나 <b>마이크로소프트 엣지</b> 등의 인터넷 브라우저를 이용해주시기 바랍니다.
			</Alert>

			</React.Fragment>}	
		</Container>
	
	)
};

export default ResultComponent;