import { useEffect, useState } from "react";
import { LineChart } from '@mui/x-charts/LineChart';
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
    const every_nth = (arr, nth) => {
        let temp = arr.filter((e, i) => i % nth === nth - 1);
        temp.unshift(arr.reverse()[0])
        console.log(temp)
        return temp
    }
    const [data, setData] = useState(0)
    const [change, setChange] = useState(0)
    const [marketCap, setMarketCap] = useState(0)
    const [changeDir, setChangeDir] = useState('tomato')
    

    useEffect(() => {
        axios
        .get(`https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=${days}`, {
            headers: {
                'Access-Control-Allow-Origin' : '*',
            }
        })
        .then(response => {
            const prices = response.data.prices
            console.log(prices)
            const dataChunks = every_nth(prices,numberOfChunks) //get numberOfChunks slices every nth element
            setData(dataChunks)
            setMarketCap(response.data.market_caps[0][1])
            // setChange()
            // setChangeDir()
            // const dataReversed = response.data.prices.reverse()
            // const resData = response.data.prices
            // console.log(response.data)
            // const numberOfChunks = Math.ceil(resData.length / pointsCount)
            // console.log(numberOfChunks, resData)
            // setData(every_nth(resData,numberOfChunks))
            // setMarketCap(response.data.market_caps[0][1])

            // if (dataReversed.slice(0, 2)[0][1] > resData[1][1])
            //     setChangeDir('green')
            // else
            //     setChangeDir('tomato')

            // setChange(dataReversed.slice(0, 2)[0][1] / resData[1][1] )
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
                            <h2>{data? '$' + data[0][1].toLocaleString(undefined, {maximumFractionDigits:2}) + ' USD': 0 + ' USD'}</h2>
                        </div>
                    </div>
                    <h6>Last {days} days changes</h6>
                    <LineChart className="line-chart"
                        loading={!data? true : false}
                        height={150}
                        margin={{left:8,right:8}}
                        rightAxis={null}
                        leftAxis={null}
                        bottomAxis={null}
                        colors={["white"]}
                        xAxis={[{
                            data: data?
                                data.map(item => new Date(item[1])*1000) 
                                : [null] }
                        ]}
                        series={[
                            {curve: "linear", data: data?
                                                    data.map(item => item[1]) 
                                                    : [null] }
                        ]}
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