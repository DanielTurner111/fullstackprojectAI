import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.scss'
import Table from './components/TableComponents/Table/Table.jsx';
import AddForm from './components/FormComponents/AddForm/AddForm.jsx';
import EditForm from './components/FormComponents/EditForm/EditForm.jsx';

const App = props => {

  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({})

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

  return(
    <div className='App'>
      {
        editing ? (
          <EditForm onUpdateCategory={ _updateCategory } category={ selectedCategory } />
        ) : (
          <AddForm onAddCategory={ _addCategory } />
        )
      }
      
      <Table categories={categories} onEditCategory={ _editCategory } onDeleteCategory={ _deleteCategory } />
    </div>
  )

}

export default App;
