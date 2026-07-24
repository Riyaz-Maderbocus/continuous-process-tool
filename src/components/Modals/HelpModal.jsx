import { useRef, useEffect } from "react";

import Button from "../Utilities/Button";
const HelpModal = ({isShown, closeModal}) => {

    // modal prevent background scroll
    useEffect(()=> {
        if(isShown) {
            document.body.classList.add("modal-open")
        } else {
            document.body.classList.remove("modal-open")
        }
    }, [isShown])
    
    const mouseDownPosition = useRef(null);
    if (!isShown) return null

    const handleOverlayMouseDown = (e) => {
        mouseDownPosition.current = {
            x: e.clientX,
            y: e.clientY
        }
        // console.log(mouseDownPosition)
    }

    const handleOverlayClick = (e) => {
        if (!mouseDownPosition.current) return;

        const distanceMoved = Math.sqrt(
            Math.pow(e.clientX - mouseDownPosition.current.x, 2) +
            Math.pow(e.clientY - mouseDownPosition.current.y, 2)
        )

        // Ignore drag movements
        if(distanceMoved > 5) {
            mouseDownPosition.current = null;
            return;
        }

        if (e.target === e.currentTarget) {
            closeModal()
        }

        mouseDownPosition.current = null
    }

    const closeModalFromOverlay = (e)=> {
        e.stopPropagation()
        closeModal()
    }

    const preventModalClose = (e)=> {
        e.stopPropagation()
    }
    return ( 
        <div className="modal-overlay"
        // onClick={closeModalFromOverlay}
        // onClick={handleOverlayMouseDown}
        onMouseDown={handleOverlayMouseDown}
        onClick={handleOverlayClick}
        >
            <div className="modal"
            // onClick={preventModalClose}
            >

                <div className="modal-container">
                    <h2>Help and things</h2>

                    <div className="help-instructions">
                        <ul className="help-list">
                            <li className="help-item">Add a new Unit Operation with the "Add Card" button</li>
                            <li className="help-item">Select the Name of the Unit Operation and what type of unit operation with the form.</li>
                            
                        </ul>
                        
                    </div>

                    {/* <button className="btn full-width-btn"
                    onClick={closeModal}
                    > ❌ Close Help</button> */}
                    <Button classes="btn full-width-btn" clickFunction={closeModal}>❌ Close Help </Button>
                </div>


            </div>
        </div>
     );
}
 
export default HelpModal;