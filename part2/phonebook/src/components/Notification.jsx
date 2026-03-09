const Notification = ({msg, isError}) => {

    const style = {
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        color: isError ? 'red' : 'green'
    }

    if(msg !== null){
        return (
        <div style={style}>
            {msg}
        </div>
    )}
}

export default Notification;