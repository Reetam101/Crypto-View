import Currencies from "./components/Currencies";
import Header from "./components/Header";

import styled from "styled-components";

const Container = styled.div`
	background-color: #f5d9ed;
	background-image: linear-gradient(315deg, #ebd2e4 0%, #c9b3fa 74%);
`
const App = () => {
	return (
		<Container>
			<Header />
			<Currencies />
		</Container>
	)
};

export default App;