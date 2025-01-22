
const CurrencyInput = ({logo, currency, value, otherValue, multiplier}) => {
    return (
        <div>
            <img src={logo} width={25} height={25} alt={currency}/>
            <label>{currency.toUpperCase()}</label>
            <input 
                className={currency}
                value={value.value} 
                onChange={
                    (e) => value.onChange(e,otherValue,multiplier)
                }>
            </input>
        </div>
    )
}
export default CurrencyInput