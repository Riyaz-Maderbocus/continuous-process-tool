import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import { useState } from "react";
import { useUnitOperations } from "../../context/UnitOperationContext";
import { isSortable } from "@dnd-kit/react/sortable";
import SortableCard from "../Sortables/SortableCard";
import CardOverlay from "../Sortables/CardOverlay";


const CardCanvas = () => {
    const {unitOperations, setUnitOperations} = useUnitOperations()

    const [activeId, setActiveId] = useState(null)
    // const [unitOperations, setUnitOperations] = useState([1,2,3,4])



    return ( 
        <DragDropProvider
            onDragStart={({operation})=> {
                setActiveId(operation.source?.id)
            }}

            onDragEnd={(event)=> {
                if (event.canceled) return;
                const {source} = event.operation;

                if(isSortable(source)) {
                    const {initialIndex, index} = source;
                    if (initialIndex !== index) {
                        setUnitOperations((unitOperations) => {
                            const newUnitOperations = [...unitOperations]
                            const [removed] = newUnitOperations.splice(initialIndex, 1)
                            newUnitOperations.splice(index, 0, removed);
                            return newUnitOperations

                        })
                    }
                }

            }}
        >
        <div className="card-canvas">
            {/* <SortableCard /> */}
            {unitOperations.map((unitOperation, index)=> (
                <SortableCard id={unitOperation.id} key={unitOperation.id} index={index} unitOperation={unitOperation}/>
            ))}
           
        </div>
        
        {/* <DragOverlay>
            {activeId !== null ? <CardOverlay id={activeId} />  : null}
        </DragOverlay> */}
        </DragDropProvider>
     );
}
 
export default CardCanvas;