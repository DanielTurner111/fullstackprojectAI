import './TableRow.scss'


const TableRowItem = props => {

   const _editRowEntry = () => {
        props.onEditCategory(props.entry)
    }

    const _deleteRowEntry = () => {
        props.onDeleteCategory(props.entry)
    } 

    return(
        <tr>
            <td>{props.entry.id}</td>
            <td>{props.entry.category_id}</td>
            <td>{props.entry.title}</td>
            <td>{props.entry.description}</td>
            <td>{props.entry.price}</td>
            <td>{props.entry.quantity}</td>
            <td>{props.entry.sku}</td>
            <td><button onClick={ _editRowEntry }>Edit</button></td>
            <td><button onClick={ _deleteRowEntry }>Delete</button></td>
        </tr>
    )

}

export default TableRowItem