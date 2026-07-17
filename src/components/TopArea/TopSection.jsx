import { useUnitOperations } from "../../context/UnitOperationContext";
import HelpModal from "../Modals/HelpModal";
import { useState } from "react";

const TopSection = () => {

    const [showHelpModal, setShowHelpModal] = useState(false);
    
    const {addUnitOperation} = useUnitOperations()

    const openShowHelpModal = ()=> {
        setShowHelpModal(true)
    }

    const closeShowHelpModal = ()=> {
        setShowHelpModal(false)
    }
    return ( 
        <div className="top-section">
            <h1>Continuous Processing Tool</h1>

            <div className="top-controls">
                {/* <button className="btn btn-primary">Help</button> */}
                <button className="btn btn-primary"
                onClick={openShowHelpModal}>Help</button>

                {showHelpModal && (
                    <HelpModal isShown={showHelpModal} closeModal={closeShowHelpModal} />
                )}
                <button className="btn btn-primary" onClick={addUnitOperation}>✚ Add Card</button>
                <button className="btn btn-primary">󠀫 Calculate All</button>
                <button className="btn btn-primary">Write to Excel</button>
               
            </div>
        </div>
     );
}
 
export default TopSection;