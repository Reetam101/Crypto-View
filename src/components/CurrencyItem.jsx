import { AttachMoney, AttachMoneyOutlined } from "@material-ui/icons"
import styled from "styled-components"

const Container = styled.div`
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
`
const CoinItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: center;
    flex: 1;
    padding: 20px;
    border-bottom: 1px solid #b3aeaef7;
`
const CoinImg = styled.img`
    height: 40px;
    width: 40px;
    padding: 5px;
    
    &:hover {
        background-color: #c4c4ca;
        animation: 1s ease-in-out;
        transform: scale(1.2);
        border-radius: 20%;
    }
`

const Price = styled.p`
    color: #${(props) => props.color};
    text-shadow:
    0 0 5px #fff,
    0 0 40px #${(props) => props.color},
    0 0 80px #${(props) => props.color},
    0 0 90px #${(props) => props.color};
`

const CurrencyItem = ({ coin, index, getCoinImageUrl }) => {
    return (
        <Container key={index}>
            <CoinItem>
                {coin.rank}
            </CoinItem>
            <CoinImg src={getCoinImageUrl(coin.symbol)}/>
            <CoinItem>
                {coin.name}
            </CoinItem>
            <CoinItem>
                {Number(coin.supply).toFixed(2)}
            </CoinItem>
            <CoinItem>
                {Number(coin.changePercent24Hr).toFixed(2) < 0 ? <Price color="FF0000">{Number(coin.changePercent24Hr).toFixed(2)}</Price> : <Price color="32CD32">{Number(coin.changePercent24Hr).toFixed(2)}</Price>}
            </CoinItem>
            <CoinItem>
                <AttachMoneyOutlined />{parseFloat(coin.priceUsd).toFixed(2)}
            </CoinItem>
        </Container>
    )
}

export default CurrencyItem
