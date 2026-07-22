
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
    
    return ( 
        <div className="modal-overlay"
        onClick={closeModalFromOverlay}>
            <div className="modal"
            onClick={preventModalClose}>
                <div className="modal-container">
                    {/* <h2>{unitOperation.title}</h2> */}

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