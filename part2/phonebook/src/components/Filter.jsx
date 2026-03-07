const Filter = ({onChange}) =>{
    return(
        <div>
            filter by name: <input onChange={onChange}/>
        </div>
    )
}

export default Filter;