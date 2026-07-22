import { useUnitOperations } from "../../context/UnitOperationContext";
import Button from "../Utilities/Button";
const CardModal = ({unitOperation, isShown, closeModal}) => {
    if(!isShown) return null

    const closeModalFromOverlay = (e)=> {
        e.stopPropagation()
        closeModal()
    }

    const preventModalClose = (e)=> {
        e.stopPropagation()
    }
    
    const {removeUnitOperation} = useUnitOperations()
    return ( 
        <div className="modal-overlay"
        onClick={closeModalFromOverlay}>
            <div className="modal"
            onClick={preventModalClose}>
                <div className="modal-container">
                    <h2>{unitOperation.title}</h2>
                    <h3>{unitOperation.id}</h3>

                    <Button classes="btn full-width-btn"
                    stopPropagation={true}
                    clickFunction={()=>removeUnitOperation(unitOperation.id)} 
                    >🗑️ Delete Card</Button>

                    <Button classes="btn full-width-btn" 
                    clickFunction={closeModal}
                    stopPropagation={true}
                    >❌ Close Card</Button>
                </div>
            </div>
        </div>
     );
}
 
export default CardModal;