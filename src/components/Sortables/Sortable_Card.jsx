import { useSortable } from "@dnd-kit/react/sortable";

const SortableCard = ({id, index}) => {
    const {ref} = useSortable({
        id,
        index
    })

    return ( 
        <div className="card"
        ref={ref}>
            Card: {id}
        </div>
     );
}
 
export default SortableCard;