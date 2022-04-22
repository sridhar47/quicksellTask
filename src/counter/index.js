import React, { useCallback, useEffect, useState } from 'react';
import { GET, PUT } from '../axios';
import { counterName } from '../helpers/config';
import { debounce } from '../helpers/utils';
import CounterValue from './counterValue';

function Counter() {
  const defaultCounter = 1;
  const MAX_VALUE = Number.MAX_VALUE || 1000;
  const [count, setCounter] = useState(defaultCounter);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getCounter();
  },[])

  const getCounter = async () => {
    const counter = await GET(`${counterName}.json`);
    setCounter(counter || defaultCounter);
  }

  const dispatchPutCounter = useCallback(debounce(value => putCounter(value)),[])

  const putCounter = async (value) => {
    const res = await PUT(`front-end.json`, {[counterName]: value});
    setCounter(res[counterName]);
    setLoader(false);
  }

  const handleOnChangeCounterValue = (e) => {
    setLoader(true);
    const value = e?.target?.value;
    setCounter(value);
    dispatchPutCounter(Number(value));
  }

  const increaseDecreaseCounter = (type) => {
    setLoader(true);
    let value = count;
    if(type === `+`) {
      value++;
    } else if(type === `-`) {
      value--;
    }
    value = value > MAX_VALUE ? MAX_VALUE : value;
    setCounter(value);
    dispatchPutCounter(value);
  }

  return (
    <div className="counter">
        <div className={`savingLoader ${loader ? `visibility-visible` : ``}`}>
            <span className='loader'></span>
            <span className='savingLoader_text'>Saving counter value</span>
        </div>
      <div className='buttonGroup'>
        <button className='buttonGroup_btn minus' onClick={() => increaseDecreaseCounter(`-`)}>-</button>
        <input className='buttonGroup_btn value' type="number" onChange={handleOnChangeCounterValue} value={count || defaultCounter} />
        <button className='buttonGroup_btn plus' onClick={() => increaseDecreaseCounter(`+`)}>+</button>
      </div>
      <CounterValue value={count} />
    </div>
  );
}

export default Counter;
