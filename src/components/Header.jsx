import styled, {keyframes} from "styled-components";

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
    background-color: #2d3436;
    background-image: linear-gradient(315deg, #2d3436 0%, #000000 74%);
	color: white;
	padding: 10px;
	margin-top: 0;

    @media (max-width: 850px) {
        width: 100vw;
    }
`
const shineAnimation = keyframes`
  0% {
      background-position: 0;
  }
  60% {
      background-position: 180px;
  }
  100% {
      background-position: 180px;
  }

`

const Title = styled.h1`
    background: linear-gradient(to right, #757575 0, white 10%, #807f7f 20%);
    background-position: 0;
    //font-weight: 600;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shine 3s infinite linear;
    animation-fill-mode: forwards;
    animation-name: ${shineAnimation};
    font-weight: bold;
`

const Header = () => {
    return (
        <Container>
            <Title>Crypto-View</Title>
        </Container>
    )
}

export default Header