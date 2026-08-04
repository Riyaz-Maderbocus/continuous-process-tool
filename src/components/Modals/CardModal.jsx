import { useUnitOperations } from "../../context/UnitOperationContext";
import { useRef, useEffect } from "react";
import Button from "../Utilities/Button";
import { createPortal } from "react-dom";
import BioreactorUpdateForm from "../Forms/BioreactorUpdateForm";
import FiltrationUpdateForm from "../Forms/FiltrationUpdateForm";
import ILCUpdateForm from "../Forms/ILCUpdateForm";

const CardModal = ({unitOperation, isShown, closeModal, totalTime}) => {

    // modal prevent background scroll
    useEffect(()=> {
        if(isShown) {
            document.body.classList.add("modal-open")
        } else {
            document.body.classList.remove("modal-open")
        }
    }, [isShown])
    
    // const mouseDownPosition = useRef(null);
    if (!isShown) return null



    // const handleOverlayMouseDown = (e) => {
    //     mouseDownPosition.current = {
    //         x: e.clientX,
    //         y: e.clientY
    //     }
    //     // console.log(mouseDownPosition)
    // }

    // const handleOverlayClick = (e) => {
    //     if (!mouseDownPosition.current) return;

    //     const distanceMoved = Math.sqrt(
    //         Math.pow(e.clientX - mouseDownPosition.current.x, 2) +
    //         Math.pow(e.clientY - mouseDownPosition.current.y, 2)
    //     )

    //     // Ignore drag movements
    //     if(distanceMoved > 5) {
    //         mouseDownPosition.current = null;
    //         return;
    //     }

    //     if (e.target === e.currentTarget) {
    //         closeModal()
    //     }

    //     mouseDownPosition.current = null
    // }

    const closeModalFromOverlay = (e)=> {
        e.stopPropagation()
        closeModal()
    }

    const preventModalClose = (e)=> {
        e.stopPropagation()
    }
    
    const {removeUnitOperation} = useUnitOperations()
    return createPortal( 
        <div className="modal-overlay"
        // onClick={closeModalFromOverlay} Disabled close as it is too risky
        // onMouseDown={handleOverlayMouseDown}
        // onClick={handleOverlayClick}
        >
            <div className="modal"
            onClick={preventModalClose}
            >
                <div className="modal-container">
                    <h2>{unitOperation.title}</h2>
                    <h3>{unitOperation.id}</h3>

                    {/* ADD UNIT OPERATION FORMS HERE */}
                    {unitOperation.type === "bioreactor" && (
                        <BioreactorUpdateForm unitOperation={unitOperation} closeModal={closeModal} totalTime={totalTime}/>
                    )}
                    {unitOperation.type === "filtration" && (
                        <FiltrationUpdateForm unitOperation={unitOperation} closeModal={closeModal} totalTime={totalTime}/>
                    )}
                    {unitOperation.type === "ilc" && (
                        <ILCUpdateForm unitOperation={unitOperation} closeModal={closeModal} totalTime={totalTime} />
                    )}

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
        </div>,
        document.body
     );
}
 
export default CardModal;