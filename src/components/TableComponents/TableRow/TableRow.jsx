import './TableRow.scss'

const TableRow = props => {

    const _editRowEntry = () => {
        props.onEditCategory(props.entry)
    }

    const _deleteRowEntry = () => {
        props.onDeleteCategory(props.entry)
    }

    return(
        <tr>
            <td>{props.entry.category_id}</td>
            <td>{props.entry.categoryName}</td>
            <td><button onClick={ _editRowEntry }>Edit</button></td>
            <td><button onClick={ _deleteRowEntry }>Delete</button></td>
        </tr>
    )
}

export default TableRow