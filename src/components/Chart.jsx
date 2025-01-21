import { useEffect, useState } from "react";
import { LineChart } from '@mui/x-charts/LineChart';
import { Chart as GChart } from 'react-google-charts'
import axios from "axios";
import '../view.css'
import 'font-awesome/css/font-awesome.min.css';
import dummyData from '../dummydata.json';
import { useNavigate } from "react-router-dom";
import logo from '../assets/eth-logo.png';

const Chart = () => {
    const navigate = useNavigate();
    const pointsCount = 7 //7 as the example image
    const [days, setDays] = useState(7) //defaults to 7 days
    const numberOfChunks = Math.ceil(dummyData.prices.length / pointsCount)
    const [currentPrice, setCurrentPrice] = useState(0)
    const [data, setData] = useState(0)
    const [change, setChange] = useState(0)
    const [marketCap, setMarketCap] = useState(0)
    const [changeDir, setChangeDir] = useState('tomato')
    const options = {
        curveType: "linear",
        legend: "none",
        backgroundColor: "#1a1a1a",
        hAxis:{
            textStyle: {color:"transparent"},
            titleTextStyle: {color:"transparent"},
            gridlines: {color: "transparent"},
        },
        vAxis:{
            textStyle: {color:"transparent"},
            titleTextStyle: {color:"transparent"},
            gridlines: {color: "transparent"},
        },
        chartArea: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            height: "100%",
        },
        title: "",
        series:{
            0: { color: "#ff7e5f"},
        }
      };

    const every_nth = (arr, nth) => {
        let filtered = arr.filter((e, i) => i % nth === nth - 1);
        const latest = arr.reverse()[0]
        filtered.push(latest)
        setCurrentPrice(latest[1])
        return filtered
    }

    const calculateChange = (dataChunks) => {
        console.log("last", dataChunks[dataChunks.length-1][1])
        console.log("first", dataChunks[1][1])
        if (currentPrice > dataChunks[1][1]) {
            setChange(currentPrice / dataChunks[1][1])
            setChangeDir('green')
        } else {
            setChange(dataChunks[1][1] / currentPrice )
            setChangeDir('tomato')
        }
    }

    useEffect(() => {
        axios
        .get(`https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=${days}`, {
            headers: {
                'Access-Control-Allow-Origin' : '*',
            }
        })
        .then(response => {
            const prices = response.data.prices
            let dataChunks = every_nth(prices,numberOfChunks) //get numberOfChunks slices every nth element
            dataChunks.unshift(['date','price'])
            dataChunks.map(item => item[0] = new Date(item[0]))
            setData(dataChunks)
            setMarketCap(response.data.market_caps[0][1])
            calculateChange(dataChunks)
        })
        .catch(error => {
            console.error(error)
        })
    },[days])
    return (
        <div>
            <div className="main-div">
                <div className="main-div-title">
                    <h2>ETH <img src={logo} width={25} height={25} alt="eth"/> </h2>
                    <i className="fa fa-calculator" style={{'color':'white','cursor':'pointer'}} onClick={() => navigate('/convert')}></i>
                </div>
                <div className="chart-div">
                    <div className="chart-div-top">
                        <div className="change" style={{ 'backgroundColor': changeDir }}>
                            {changeDir === 'green' ? <i className="fa fa-angle-up" style={{'color':'white'}}></i> : <i className="fa fa-angle-down" style={{'color':'white'}}></i>}
                            {change.toFixed(2) + '%'}
                        </div>
                        <div className="chart-div-title">
                            <h2>{data? '$' + currentPrice.toLocaleString(undefined, {maximumFractionDigits:2}) + ' USD': 0 + ' USD'}</h2>
                        </div>
                    </div>
                    <h6>Last {days} days changes</h6>
                    <GChart className="line-chart"
                        loading={!data? true : false}
                        chartType="LineChart"
                        width="100%"
                        height="100%"
                        margin={{left:8,right:8}}
                        data={data}
                        options={options}
                        legendToggle
                    />
                    <div className="days-selector">
                        <h6 className="selected" onClick={(e) => setDays(7)}>7D</h6>
                        <h6 onClick={(e) => setDays(30)}>30D</h6>
                        <h6 onClick={(e) => setDays(180)}>180D</h6>
                        <h6 onClick={(e) => setDays(365)}>1Y</h6>
                    </div>
                </div>
                <div className="volume">
                    <h6>24HR MARKET CAP</h6>
                    <h5>{marketCap.toLocaleString(undefined, {maximumFractionDigits:2}) + '$'}</h5>
                </div>
            </div>
        </div>
    )
}
export default Chart