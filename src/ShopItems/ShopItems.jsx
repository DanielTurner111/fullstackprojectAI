import './ShopItems.scss'
import { useState, useEffect } from 'react'


const ShopItems = props => {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);

    //I want to grab the information about items like I did in the addItemForm to get the category

    useEffect(()=>{
        const grabCategories = async () => {

            try {
               const res = await fetch("http://127.0.0.1:3001/categories")
               const json = await res.json();
               console.log(json);
               setCategories(json.categories)
            } catch (err) {
                console.log("error categories")
            }
            
        }
        grabCategories();
    }, [])

    //pull items json merge on category_id
    useEffect(()=>{
        if (categories.length === 0) {
            return;
        }
        const grabItems = async () => {
            try {
                const res = await fetch("http://127.0.0.1:3001/items")
                const json = await res.json();            
                console.log(json);
                
                const merged = (json.items).map(item => {
                    const matched = categories.find(cat => cat.category_id === item.category_id)
                    return {
                        item, matched
                    }
                })

                setItems(merged)
                
            } catch (err){
                console.log("error items")
            }
        }
        grabItems();
    }, [categories])

    return (
        <div className='item-shop'>
            {items.map((item, index)=> (
                <div key={index} className='shop-item'>
                    <h1 className='h1-item'>{item.item.title}</h1>
                    <p className='item-p'>{item.matched.categoryName}</p>
                    <p className='item-p'>{item.item.description}</p>
                    <p className='item-p'>{item.item.price}</p>
                 
                </div>
            ))}
        </div>
        

    )


}

export default ShopItems;