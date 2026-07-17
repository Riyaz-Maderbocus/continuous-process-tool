import { useUnitOperations } from "../../context/UnitOperationContext";

const TopSection = () => {

    const {addUnitOperation} = useUnitOperations()
    return ( 
        <div className="top-section">
            <h1>Continuous Processing Tool</h1>

            <div className="top-controls">
                <button className="btn btn-primary">Help</button>
                <button className="btn btn-primary" onClick={addUnitOperation}>✚ Add Card</button>
                <button className="btn btn-primary">󠀫 Calculate All</button>
                <button className="btn btn-primary">Write to Excel</button>
               
            </div>
        </div>
     );
}
 
export default TopSection;