import SortableCard from "../Sortables/Sortable_Card";
const CardCanvas = () => {

    const items = [1,2,3,4]
    return ( 
        <div className="card-canvas">
            {/* <SortableCard /> */}
            {items.map((item, index)=> (
                <SortableCard id={item} key={item} index={index}/>
            ))}
        </div>
     );
}
 
export default CardCanvas;