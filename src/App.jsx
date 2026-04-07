import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.scss'
import Items from './Items';
import Categories from './Categories';
import Storefront from './Storefront';


const App = props => {

  const [modeStore, setModeStore] = useState(true)
  const [modeCategories, setModeCategories] = useState(false)
  const [modeItems, setModeItems] = useState(false)

  
  const store = () => {
    setModeStore(true)
    setModeCategories(false)
    setModeItems(false)
  }

  const categories = () => {
    setModeStore(false)
    setModeCategories(true)
    setModeItems(false)
  }

  const items = () => {
    setModeStore(false)
    setModeCategories(false)
    setModeItems(true)
  }


  return(
    <div className='App'>

      <header className='header'>
      <h1 className='h1'>Store</h1>
      <button className='buttonHeader' onClick={store}>Store</button>
      <button className='buttonHeader' onClick={categories}>Categories</button>
      <button className='buttonHeader' onClick={items}>Items</button>
      </header>

      {
        modeStore? (
          <Storefront/>
        ) : modeCategories? (
          <Categories/>
        ) : modeItems? (
          <Items/>
        )   : null 
      }    


    </div>
  )

}

export default App;
