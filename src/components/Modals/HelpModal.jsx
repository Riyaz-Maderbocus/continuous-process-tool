import Button from "../Utilities/Button";
const HelpModal = ({isShown, closeModal}) => {
    if (!isShown) return 
    return ( 
        <div className="modal-overlay">
            <div className="modal">

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