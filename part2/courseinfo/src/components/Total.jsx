const Total = ({parts}) => {
    return(
        <b>
            Total number of exercises: {parts.reduce((sum, curPart) => sum + curPart.exercises, 0)}
        </b>
    )
}

export default Total