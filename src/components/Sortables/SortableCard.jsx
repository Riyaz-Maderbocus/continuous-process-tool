import { useSortable } from "@dnd-kit/react/sortable";

const SortableCard = ({id, index, unitOperation}) => {
    const { title, type, data, typeFormatted} = unitOperation

    const {ref, isDragSource} = useSortable({
        id,
        index
    })

    return ( 
        <div className={`card ${isDragSource && "card-lift"}`}
        ref={ref}
        onClick={()=>alert("clicked")}
        >
            <div className="card-header">
                <h4>{title}</h4>
            </div>

            <div className="card-meta-details">
             {/* <p className="card-type">{`${type[0].toUpperCase()}${type.slice(1)}`}</p> */}
             <p className="card-type">{typeFormatted}</p>
            </div>
            
            <div className="data-container">
                
            </div>
       
        </div>
     );
}
 
export default SortableCard;