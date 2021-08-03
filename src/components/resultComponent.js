/* global kakao */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import Progress from './progress';
import geometry from '../data/geometry';
import cityRank from '../data/cityRank';
import consultData from '../data/consultData';

const curYear = new Date().getFullYear();


const useStyle = makeStyles((theme) => ({
	
	paperTab:{
		paddingLeft: "10px",
		height: "100%",
		border: "1px solid #808080"
	},
	
	resultContainer:{
		display: "flex",
		justifyContent: "flex-start",
		flexDirection: "column",
		height: "55vh"
	}
	
}))

const calcSP = (year => Math.min(100, Math.round(0.7407 * Math.pow(curYear - year, 1.4053))));
const calcAlarm = (year => Math.min(100, Math.round(((curYear-year) * 25.73) / 9.08 )));
const calcBalcony = (year => Math.min(100, Math.round(15.917 * Math.pow(curYear - year, 0.5622))));


function FacilityComponent(props){
	const classes = useStyle();
	const facilittName = ["스트레이너(SP설비)", "화재감지시간 (자동화재탐지설비)", "부식진행상태 (다중이용업소 발코니)"]
		const cdata = consultData[props.facility];
		
	var step;
	for (step = 0; step < 3; step++) {
		if(props.percent < cdata[step].level){
			break;
		}
	}	
	
	return(
	<Paper style={{height:"100%", width:"95%", padding:'5px', marginBottom:"20px"}}>
		<Grid container direction='row' spacing={3}>
			<Grid item xs={4} style={{textAlign:"center", paddingRight:"0"}}> 
				<h4>{facilittName[props.facility]}</h4>
			</Grid>
			<Grid item xs={8}>
				<div style={{display:'flex', alignItems:'center', height:"100%"}}>
					<Progress percent={props.percent} step={step}/>
				</div>
			</Grid>
		</Grid>
		<Grid item container spacing={1} direction="row" justifyContent="center" alignItems="stretch">
				<Grid item xs={12} sm={12} md={4} style={{textAlign:"center"}}>
					<Paper variant='outlined' className={classes.paperTab}>
						<img src={props.imgsrc} alt="img" style={{width:"100%"}}></img>
					</Paper>
				</Grid>
				<Grid item container spacing={1} direction="column" xs={12} sm={12} md={8}>
					<Grid item style={{height:"50%"}}>
						<Paper variant='outlined' className={classes.paperTab}>
							<h3>증상 및 위험성</h3>
							<ul style={{paddingLeft:'15px'}}>
								{cdata[step].symptom.map((x, idx) => <li key={idx}>{x}</li>)}
							</ul>
						</Paper>
					</Grid>
					<Grid item style={{height:"50%"}}>
						<Paper variant='outlined' className={classes.paperTab}>
							<h3>조치사항</h3>
							<ul style={{paddingLeft:'15px'}}>
								{cdata[step].consult.map((x, idx) => <li key={idx}>{x}</li>)}
							</ul>
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
		var centerLoc = new kakao.maps.LatLng(cy/n_poly, cx/n_poly); 
		map.setCenter(centerLoc);
		
		
		var customOverlay = new kakao.maps.CustomOverlay({
			position : centerLoc, 
			content : '<h4>' + props.dong + '</h4>',
		});
		
		customOverlay.setMap(map);
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
        	<div id="map" style={{width:"100%", height:"250px"}}></div>
       
        </div>
    )

}

function ResultComponent(props){
	const classes = useStyle();
	var rank = undefined;
	
	if(props.value){
		cityRank.forEach((city, idx) => {
			if(city === props.value.location){
				rank = idx+1;
			}
		})
	}
	
		
	return(
		<Container maxWidth="md">
			{props.value ?
			<Grid container direction="column" spacing={3} style={{alignItems:'center'}}>
				<Paper style={{height:"100%", width:"95%", padding:'5px', marginBottom:"20px"}}>
					<Grid item container spacing={1} direction="row" justifyContent="center" alignItems="stretch">
						<Grid item xs={12} sm={12} md={4}>
							<Paper variant='outlined' className={classes.paperTab}>
								<KakaoMapComponent dong={props.value.location}/>
							</Paper>
						</Grid>
						<Grid item xs={12} sm={12} md={8}>
							<Paper variant='outlined' className={classes.paperTab} style={{height:"100%"}}>
								<div style={{display:'flex', alignItems:'center', height:"100%", padding:'5px', fontSize:'min(18px, 5vw)'}}>
									<h3 style={{textAlign:'center', width:"100%"}}><p>2020년 기준 시흥시 행정구역 중 </p>
										<p><span style={{color:'red'}}>{props.value.name}</span>이(가) 위치한</p>
										<span style={{color:'red'}}>{props.value.location}</span>의 위험도 순위는 {cityRank.length}개 법정동 중 
										<span style={{color:'red'}}> {rank}</span>위</h3>
								</div>
							</Paper>
						</Grid>
					</Grid>
				</Paper>
				<FacilityComponent facility={0} percent={calcSP(props.value.year)}
					imgsrc="https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile3.uf.tistory.com%2Fimage%2F1250F5334D8ABA17037EE6"/>
				<FacilityComponent facility={1} percent={calcAlarm(props.value.year)}
					imgsrc="https://m.able119.co.kr/web/product/big/shop1_da4e5fa126c2d2d24a24bbc31c5a498b.jpg"/>
				<FacilityComponent facility={2} percent={calcBalcony(props.value.year)}
					imgsrc="https://post-phinf.pstatic.net/MjAxODAyMDVfMTIw/MDAxNTE3Nzk0MDY5OTc4.Rvj71byY93QRAwtv4j8HYK6sPRp0kX9riGs6lM8pmNsg.LNI85MA3USo0ARxuB9Gjun5o4ELx2uciX1q1c4_tn3cg.PNG/%EB%B0%9C%EC%BD%94%EB%8B%88%C2%B7%ED%85%8C%EB%9D%BC%EC%8A%A4_%EA%B0%80%EA%B2%A9%2C_%EB%B6%84%EC%96%91%EA%B0%80%EC%97%90_%EC%82%AC%EC%8B%A4%EC%83%81_%ED%8F%AC%ED%95%A8_1.png?type=w1200"/>
			</Grid> : <React.Fragment></React.Fragment>}	
		</Container>
	
	)
};

export default ResultComponent;