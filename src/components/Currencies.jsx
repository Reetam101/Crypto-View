import styled from "styled-components"
import { useState, useEffect } from "react";
import axios from "axios";
import { PER_PAGE } from "./constants";
import InfiniteScroll from "react-infinite-scroller";
import CurrencyItem from "./CurrencyItem";

const Container = styled.div`
    width: 850px;
    display: flex;
    flex-direction: column;
	align-items: center;
	justify-content: center;
    margin: auto;
    color: #ebebeb;
    background-color: #000000;
    background-image: linear-gradient(147deg, #000000 0%, #2c3e50 74%);
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px; 
    @media (max-width: 850px) {
        width: 100vw;
        display: flex;
        align-items: center;
	    justify-content: center;
        margin: auto;
    }   
`

const LoadingContainer = styled.div`
    display: flex;
	align-items: center;
	justify-content: center;
    font-weight: 700;
`
const HeaderContainer = styled.div`
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    background-color: #3bb78f;
    background-image: linear-gradient(315deg, #3bb78f 0%, #04663a 74%);
`    

const HeaderLabel = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: center;
    flex: 1;
    padding: 20px;
    //background-color: green;
    border-bottom: 1px solid #b3aeaef7;
    font-weight: bold;
    font-size: 19px;
    color: #fff;
    text-shadow:
    0 0 5px #fff,
    0 0 10px #fff,
    0 0 20px #fff,
    0 0 40px #0ff,
    0 0 80px #0ff,
    0 0 90px #0ff;
`


const Currencies = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [totalCount, setTotalCount] = useState(200)
    const [offset, setOffset] = useState(-PER_PAGE)

    const isEmptyCoins = !coins || coins.length === 0

    const getCoinImageUrl = (symbol) =>
    `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`;

    
    const fetchCoins = async () => {
        setLoading(true)

        const newOffset = offset + PER_PAGE;



        const response = await axios.get("https://api.coincap.io/v2/assets", {
            params: {limit: PER_PAGE, offset: newOffset}
        }).catch(err => console.log(err))

        if(response && response.data) {
            const newCoins = [...coins, ...response.data.data]

            if(newCoins.length >= totalCount) {
                setHasMore(false)
            }

            setCoins(newCoins)
            console.log(coins)
            setOffset(newOffset)
        }

        setLoading(false)

    }

    useEffect(() => {
        fetchCoins();
    }, [])

    return (
        <Container>
            <InfiniteScroll 
            pageStart={0} 
            loadMore={fetchCoins} 
            hasMore={hasMore} 
            loader={<LoadingContainer>Loading...</LoadingContainer>}
            threshold={350}
            initialLoad={true}
            style={{ width: '100%' }}>
                <HeaderContainer>
                    <HeaderLabel>Rank</HeaderLabel>
                    <HeaderLabel>Name</HeaderLabel>
                    <HeaderLabel>Supply</HeaderLabel>
                    <HeaderLabel>24h %</HeaderLabel>
                    <HeaderLabel>Price(USD$)</HeaderLabel>
                </HeaderContainer>
                {!isEmptyCoins && coins.map((coin, idx) => (
                    <CurrencyItem coin={coin} index={idx} getCoinImageUrl={getCoinImageUrl}/>
                ))}
            </InfiniteScroll>
        </Container>
    )
}

export default Currencies
