
import Button from "../Utilities/Button";
const CardModal = ({unitOperation, isShown, closeModal}) => {
    if(!isShown) return null

    
    return ( 
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-container">
                    {/* <h2>{unitOperation.title}</h2> */}

                    <Button classes="btn full-width-btn" clickFunction={(e)=> {
                        e.stopPropagation();
                        closeModal()
                    }}
                    >❌ Close Card</Button>
                </div>
            </div>
        </div>
     );
}
 
export default CardModal;