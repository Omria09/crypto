
import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import '../view.css'
import 'font-awesome/css/font-awesome.min.css';
import logo from '../assets/eth-logo.png';
import logoUsd from '../assets/usd.png';
import CurrencyInput from "./CurrencyInput";

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
                <div className="dynamic-background"></div>
                <div className="main-div-title">
                    <h2>Convert</h2>
                    <i className="fa fa-arrow-left" style={{'color':'white','cursor':'pointer'}} onClick={() => navigate('/chart')}></i>
                </div>
                <div className="centered">
                    <CurrencyInput
                        logo={logoUsd}
                        currency={'usd'}
                        value={usdValue}
                        multiplier={multiplier}
                        otherValue={ethValue}/>
                    <CurrencyInput
                        logo={logo}
                        currency={'eth'}
                        value={ethValue}
                        multiplier={multiplier}
                        otherValue={usdValue} 
                    />
                    <a style={{'color':'red', 'marginTop':'1vh'}}>{errorMsg}</a>
                </div>
            </div>
        </div>
    )
}
export default Convert