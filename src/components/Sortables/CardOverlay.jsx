const CardOverlay = ({id, unitOperation}) => {
    return ( 
        <div className="card-overlay"
        onClick={alert(`Id is ${id}`)}
        >
            {/* Card: {id} */}
            {/* Title: {unitOperation.title} */}
        </div>
     );
}
 
export default CardOverlay;