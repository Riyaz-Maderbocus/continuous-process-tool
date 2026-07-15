import { useSortable } from "@dnd-kit/react/sortable";

const SortableCard = ({id, index}) => {


    const {ref, isDragSource} = useSortable({
        id,
        index
    })

    return ( 
        <div className={`card ${isDragSource && "card-opacity"}`}
        ref={ref}>
            Card: {id}
        </div>
     );
}
 
export default SortableCard;