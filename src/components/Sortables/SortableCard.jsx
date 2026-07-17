import { useSortable } from "@dnd-kit/react/sortable";

const SortableCard = ({id, index, unitOperation}) => {
    const {title} = unitOperation

    const {ref, isDragSource} = useSortable({
        id,
        index
    })

    return ( 
        <div className={`card ${isDragSource && "card-opacity"}`}
        ref={ref}
        onClick={()=> {
            alert(`This is card: ${id}`)
        }}>
            Card: {title}
        </div>
     );
}
 
export default SortableCard;