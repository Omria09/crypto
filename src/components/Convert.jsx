
import { useEffect, useState } from "react"
import axios from "axios";
import '../view.css'
import 'font-awesome/css/font-awesome.min.css';
import { useNavigate } from "react-router-dom";

const Convert = () => {
    const [usdValue, setUsdValue] = useState('')
    const [ethValue, setEthValue] = useState('')
    const [multiplier, setMultiplier] = useState(0)
    const [errorMsg, setErrorMsg] = useState('')
    const navigate = useNavigate();

    const handleChangeUSD = (e) => {
        const value = e.target.value
        setUsdValue(value)
        multiplier != 0 ? setEthValue(value / multiplier) : null

    }
    
    const handleChangeETH = (e) => {
        const value = e.target.value
        setEthValue(value)
        setUsdValue(value * multiplier)
    }


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
            <i className="fa fa-arrow-left" style={{'color':'white','cursor':'pointer'}} onClick={() => navigate('/chart')}></i>
            <div className="main-div">
                <div className="centered">
                    <h1>Convert</h1>
                    <div>
                        <label>USD</label>
                        <input name="usd" value={usdValue} onChange={handleChangeUSD}></input>
                    </div>
                    <div>
                        <label>ETH <i className="fa-brands fa-ethereum"></i> </label>
                        <input name="eth" value={ethValue} onChange={handleChangeETH}></input>
                    </div>
                    <a style={{'color':'red', 'marginTop':'1vh'}}>{errorMsg}</a>
                </div>
            </div>
        </div>
    )
}
export default Convert