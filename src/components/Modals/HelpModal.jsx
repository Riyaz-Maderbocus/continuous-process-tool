
const HelpModal = ({isShown, closeModal}) => {
    if (!isShown) return 
    return ( 
        <div className="modal-overlay">
            <div className="modal">

                <div className="help-modal-container">
                    <h2>Help and things</h2>

                    <div className="help-instructions">
                        This is what you need to do
                    </div>

                    <button className="btn full-width-btn"
                    onClick={closeModal}
                    > ❌ Close Help</button>
                </div>


            </div>
        </div>
     );
}
 
export default HelpModal;