
import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import '../view.css'
import 'font-awesome/css/font-awesome.min.css';
import logo from '../assets/eth-logo.png';
import logoUsd from '../assets/usd.png';

const Convert = () => {
    const usdValue = useInput('text','usd')
    const ethValue = useInput('text','eth')
    const [multiplier, setMultiplier] = useState(0)
    const [errorMsg, setErrorMsg] = useState('')
    const navigate = useNavigate();


    useEffect(() => {
        axios
        .get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum`, {
            headers: {
                'Access-Control-Allow-Origin' : '*',
            }
        })
        .then(response => {
            setErrorMsg('')
            setMultiplier(response.data[0].current_price)
        })
        .catch(error => {
            setErrorMsg(error.message)
            console.error(error)
        })
    },[])

    return (
        <div>
            <div className="main-div">
                    <div className="main-div-title">
                        <h2>Convert</h2>
                        <i className="fa fa-arrow-left" style={{'color':'white','cursor':'pointer'}} onClick={() => navigate('/chart')}></i>
                    </div>
                <div className="centered">
                    <div>
                        <img src={logoUsd} width={25} height={25} alt="eth"/>
                        <label>USD</label>
                        <input className="usd" value={usdValue.value} 
                            onChange={
                                (e) => usdValue.onChange(e,ethValue,multiplier)}>
                        </input>
                    </div>
                    <div>
                        <img src={logo} width={25} height={25} alt="eth"/>
                        <label>ETH <i className="fa-brands fa-ethereum"></i> </label>
                        <input className="eth" value={ethValue.value} 
                            onChange={
                                (e) => ethValue.onChange(e,usdValue,multiplier)}>
                        </input>
                    </div>
                    <a style={{'color':'red', 'marginTop':'1vh'}}>{errorMsg}</a>
                </div>
            </div>
        </div>
    )
}
export default Convert