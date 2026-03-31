import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.scss'
import Table from './components/TableComponents/Table/Table.jsx';
import AddForm from './components/FormComponents/AddForm/AddForm.jsx';
import EditForm from './components/FormComponents/EditForm/EditForm.jsx';
import AddItemForm from './components/FormComponents/AddForm/AddItemForm.jsx';
import EditItemForm from './components/FormComponents/EditForm/EditItemForm.jsx';
import TableItem from './components/TableComponents/Table/TableItem.jsx';

const App = props => {

  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({})
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({})
  const [editingItem, setEditingItem] = useState(false);

  useEffect(()=>{
    console.log(`App component has loaded`)



    const url = "http://127.0.0.1:3001/categories"
    axios.get(url)
         .then( response => {
            console.log(response) 

            setCategories(response.data.categories)
            
         })
         .catch( error => {
            console.log(error);
        })


  },[])

  const _addCategory = category => {

    const url = "http://127.0.0.1:3001/categories"
    axios.post(url, { 
      item : category
    })
    .then( response => {
      setCategories(response.data.categories)
    })
    .catch( error => {
          console.log(error);
      })

  }

  const _editCategory = category => {
   
    console.log(`_editcategory fired`)
    console.log(category)

    setEditing(true)
    setSelectedCategory(category)
  }

  const _updateCategory = category => {
    console.log(`_updateCategory fired`)
   console.log(category)

    const url = `http://127.0.0.1:3001/categories/${category.category_id}`
    axios.patch(url, {
      item: category
    }).then( response => {
      setCategories(response.data.categories)
      setEditing(false)
      setSelectedCategory({})
    }).catch( error => {
        console.log(error);
    })

  }

  const _deleteCategory = category => {
    console.log(`_deleteCategory fired`)
    console.log(category)

    const url = `http://127.0.0.1:3001/categories/${category.category_id}`
    axios.delete(url).then( response => {
      setCategories(response.data.categories)
    }).catch( error => {
        console.log(error);
    })
  }

   useEffect(()=>{
    console.log(`App component has loaded`)



    const url = "http://127.0.0.1:3001/items"
    axios.get(url)
         .then( response => {
            console.log(response) 

            setItems(response.data.items)
            

         })
         .catch( error => {
            console.log(error);
        })


  },[])

  const _addItem = item => {

    const url = "http://127.0.0.1:3001/items"
    axios.post(url, { 
      item : item
    })
    .then( response => {
      setItems(response.data.items)
    })
    .catch( error => {
          console.log(error);
      })

  }

  const _editItem = item => {
   
    console.log(`_editItem fired`)
    console.log(item)

    setEditingItem(true)
    setSelectedItem(item)
  }

  const _updateItem = item => {
    console.log(`_updateItem fired`)
   console.log(item)

    const url = `http://127.0.0.1:3001/items/${item.id}`
    axios.patch(url, {
      item: item
    }).then( response => {
      setItems(response.data.items)
      setEditingItem(false)
      setSelectedItem({})
    }).catch( error => {
        console.log(error);
    })

  }

  const _deleteItem = item => {
    console.log(`_deleteCategory fired`)
    console.log(item)

    const url = `http://127.0.0.1:3001/items/${item.id}`
    axios.delete(url).then( response => {
      setItems(response.data.items)
    }).catch( error => {
        console.log(error);
    })
  }

  return(
    <div className='App'>
      {
        editing ? (
          <EditForm onUpdateCategory={ _updateCategory } category={ selectedCategory } />
        ) :  
        (
        
          <AddForm onAddCategory={ _addCategory } />
        
        )
      }

      <Table categories={categories} onEditCategory={ _editCategory } onDeleteCategory={ _deleteCategory } />

      {
        editingItem? (
          <EditItemForm onUpdateItem={_updateItem} item={selectedItem}/>
        ) : (
          
          <AddItemForm onAddItem={_addItem}/>
          
          
        )
      }
      
      
    </div>
  )

}

export default App;
