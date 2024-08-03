import React from 'react'
import Hero from '../../../components/USER/HomeHero/Hero'
import { useDispatch, useSelector } from 'react-redux'
import { Increament,Decreament } from '../../../slices/couterSlice';
function Homepage() {

  const {counter} = useSelector(state=>state.counter);
  const dispatch = useDispatch();


 return (<>
    <Hero/>

    {/* <h1>{counter}</h1>
    <button onClick={()=>dispatch(Increament())}>+</button>
    <button onClick={()=>dispatch(Decreament())}>-</button> */}
  </>

  )
}

export default Homepage