import { useSortable } from "@dnd-kit/react/sortable";
import { useState } from "react";
import CardModal from "../Modals/CardModal";
import BioreactorSummary from "../UnitOperationSummaries/BioreactorSummary";

const SortableCard = ({id, index, unitOperation}) => {
    const { title, type, data, typeFormatted} = unitOperation

    const {ref, isDragSource} = useSortable({
        id,
        index
    })

        // Card modal state and functions
    const [showCardModal, setShowCardModal] = useState(false)

    const openCardModal = () => {
        setShowCardModal(true)
    }

    const closeCardModal = ()=> {
        setShowCardModal(false)
    }

    return ( 

        <>
        <div className={`card ${isDragSource && "card-lift"}`}
        ref={ref}
        onClick={openCardModal}
        >
            <div className="card-header">
                <h4>{title}</h4>
            </div>

            {/* <button onClick={closeCardModal}>Close stuff</button> */}
            {/* <button onClick={openCardModal}>Open stuff</button> */}
            <div className="card-meta-details">
             {/* <p className="card-type">{`${type[0].toUpperCase()}${type.slice(1)}`}</p> */}
             <p className="card-type">{typeFormatted}</p>
            </div>
            
            <div className="data-container">
                {type === "bioreactor" && (
                    <BioreactorSummary unitOperation={unitOperation}/>
                )}
            </div>
       
            
        </div>
        {showCardModal && <CardModal isShown={showCardModal} closeModal={closeCardModal} unitOperation={unitOperation}/>}
        </>
     );
}
 
export default SortableCard;