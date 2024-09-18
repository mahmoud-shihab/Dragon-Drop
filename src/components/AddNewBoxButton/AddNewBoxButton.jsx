import "./AddNewBoxButton.scss"

function AddNewBoxButton( {handleAddBox} ) {
    return (
        <button className="add-button" type="button" title="Add new element" onClick={handleAddBox}>
            +
        </button>
    );
}

export default AddNewBoxButton;
