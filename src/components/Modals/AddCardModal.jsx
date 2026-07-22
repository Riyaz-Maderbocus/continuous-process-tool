import Button from "../Utilities/Button";

import AddUnitForm from "../Forms/AddUnitForm";
import { useUnitOperations } from "../../context/UnitOperationContext";

const AddCardModal = ({isShown, closeModal}) => {

    // const handleAddSubmit = (e)=> {
    //     e.preventDefault();
    //     alert("form submitted)")
    // }

    const closeModalFromOverlay = (e)=> {
        e.stopPropagation()
        closeModal()
    }

    const preventModalClose = (e)=> {
        e.stopPropagation()
    }

    if (!isShown) return
    return (  
        <div className="modal-overlay"
        onClick={closeModalFromOverlay}>
            <div className="modal"
            onClick={preventModalClose}>
                <div className="modal-container">
                    <h2>Add Unit Operation</h2>

                    <div className="help-instructions">
                        <ul className="help-list">
                            <li className="help-item">Put an Entry for the name of the Unit Operation</li>
                            <li className="help-item">Select the Type of Unit Operation from the dropdown list</li>
                            
                        </ul>
                        
                    </div>

                    <AddUnitForm closeModal={closeModal}/>

                    <div className="multi-button-container">
                        <Button classes="btn full-width-btn" clickFunction={closeModal}>❌ Cancel </Button>
                    </div>

                    
                </div>
            </div>
        </div>
    );
}
 
export default AddCardModal;