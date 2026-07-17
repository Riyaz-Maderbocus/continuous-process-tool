import { useSortable } from "@dnd-kit/react/sortable";

const SortableCard = ({id, index, unitOperation}) => {
    const { title, type, data} = unitOperation

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

            </div>
            
            Id: {id}
        </div>
     );
}
 
export default SortableCard;