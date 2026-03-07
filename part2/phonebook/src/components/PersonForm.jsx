const PersonForm = ({addName, handleNameChange, handlePhoneChange, newName, newPhone}) =>{
    return(
        <form onSubmit={addName}>
        <div> 
            name: <input 
                    onChange={handleNameChange} 
                    value={newName}/>
        </div>
        <div>
            phone: <input 
                    onChange={handlePhoneChange} 
                    value={newPhone}/>          
        </div>
        <div>
            <button type="submit">add</button>
        </div>
        </form>
    )
}

export default PersonForm;