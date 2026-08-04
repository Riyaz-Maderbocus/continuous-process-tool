import CardCanvas from "./CardCanvas";
import { useUnitOperations } from "../../context/UnitOperationContext";
const MainArea = () => {
    const {time} = useUnitOperations()
    return ( 
        <div className="main-area">
            <div className="main-stats-container">
                {/* These are the main stats */}
                Total days: {time.totalDays}
            </div>
            
            <CardCanvas />
            
        </div>
     );
}
 
export default MainArea;