import React from 'react';

import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';


import ResultComponent from './components/resultComponent'
import SearchComponent from './components/searchComponent'


function App() {

	const [searchedValue, setSearchedValue] = React.useState(null);
	
	return (
		<React.Fragment>
			<div style={{display:"flex", minHeight:"93vh", flexDirection:"column"}}>
				<SearchComponent toParent={setSearchedValue}/>
				<ResultComponent value={searchedValue}/>
			</div>
			<Footer />
		</React.Fragment>
	);
}

function Footer() {
	return (
		<footer>
			  <Container maxWidth="md">
				<div style={{
						display: 'flex',
						alignItems: 'center',
						flexWrap: 'wrap',
						textAlign:'right',
						fontSize:"15px"
					}}>
					<span> Developed By Kihoon Kwon </span>
					<IconButton href="https://www.github.com/kyoonkwon">
						<GitHubIcon />
					</IconButton>
				</div> 
			  </Container>
		</footer>
	);
}

export default App;