import React, { useEffect, useRef, useState } from 'react';
import { Block } from './Block';
import './index.scss';

function App() {

  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('RUB');
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);
   
  
  const ratesRef = useRef({});



  useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/daily_json.js')
    .then(res => res.json())
    .then((json) => {
      ratesRef.current = json.Valute;
      ratesRef.current = {...ratesRef.current,  "RUB": {
        "ID": "R01000",
        "NumCode": "000",
        "CharCode": "RUB",
        "Nominal": 1,
        "Name": "Российский Рубль",
        "Value": 1,
        "Previous": 1
    },}
    onChangePrice(1)
    })
    .catch(err => {
      console.warn(err);
      alert('Ошибка получения информации от сервера');
    });
  }, [])


  const onChangePrice = (value) => {
    const price = value * ratesRef.current[fromCurrency]?.Value;
    const result = price / ratesRef.current[toCurrency]?.Value; 
    
    setFromPrice(value);
    setToPrice(result.toFixed(3));

  }

  useEffect(() => {
    onChangePrice(fromPrice);
  }, [fromCurrency, toCurrency]);


  return (
    <div className="App">
      <Block 
        value={fromPrice} 
        currency={fromCurrency} 
        onChangeCurrency={setFromCurrency} 
        onChangeValue={onChangePrice} 
      />
      <Block 
        value={toPrice} 
        currency={toCurrency} 
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangePrice}  
      />
    </div>
  );
}

export default App;
