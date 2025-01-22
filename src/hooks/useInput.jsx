import { useEffect, useState } from "react"

const useInput = (type, currency) => {
    const [value, setValue] = useState('')
    const re = /^[0-9]*(\.|)?[0-9]*$/; //regex to only allow decimals and a dot (.)
  
    const onChange = (event, otherState,multiplier) => {
      currency === 'usd' ? handleChangeUSD(event,otherState,multiplier) : handleChangeETH(event,otherState,multiplier)
    }
    
    const handleChangeUSD = (e,otherState,multiplier) => {
        const value = e.target.value
        if (value === '' || re.test(value)) {
            setValue(value)
            multiplier != 0 ? otherState.setValue((value / multiplier)) : null
        }
    }
    
    const handleChangeETH = (e,otherState,multiplier) => {
        const value = e.target.value
        if (value === '' || re.test(value)){
            setValue(value)
            otherState.setValue(value * multiplier)
        }
    }

    return {
      setValue,
      type,
      value,
      onChange
    }
  }
export default useInput