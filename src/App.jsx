import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.scss'
import Items from './Items';
import Categories from './Categories';


const App = props => {

  


  return(
    <div className='App'>
      
      <Categories/>

      <Items/>
      
    </div>
  )

}

export default App;
