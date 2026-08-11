import { useState } from "react";
import { useUnitOperations } from "../../context/UnitOperationContext";
import FormTextInput from "./FormComponents/FormTextInput";
import FormNumberInput from "./FormComponents/FormNumberInput";
import FormNumberInputSmall from "./FormComponents/FormNumberInputSmall";
import Button from "../Utilities/Button";
const ViUpdateForm = ({unitOperation, closeModal, totalTime}) => {
    const {updateUnitOperationData} = useUnitOperations();
    const {data, title} = unitOperation;
    const {                    
            feedAverageFlowRate,
            feedFlowRateSetpoint,
            feedVolume,
            feedTime,
            acidFlowRate,
            acidVolume,
            acidTime,
            holdTime,
            baseFlowRate,
            baseVolume,
            baseTime,
            tankFlowRate,
            tankTime,
            tankAverageFlowRate,
            totalTankVolume,
            totalCycleTime,
            bufferAcidVolPerLoop,
            bufferAcidVolPerDay,
            bufferAcidTotalVol,
            bufferBaseVolPerLoop,
            bufferBaseVolPerDay,
            bufferBaseTotalVol,
            inputConc,
            predictedYield,
            outputConc
        } = data
    


    const [viFormData, setViFormData] = useState({
            title,                    
            feedAverageFlowRate,
            feedFlowRateSetpoint,
            feedVolume,
            feedTime,
            acidFlowRate,
            acidVolume,
            acidTime,
            holdTime,
            baseFlowRate,
            baseVolume,
            baseTime,
            tankFlowRate,
            tankTime,
            tankAverageFlowRate,
            totalTankVolume,
            totalCycleTime,
            bufferAcidVolPerLoop,
            bufferAcidVolPerDay,
            bufferAcidTotalVol,
            bufferBaseVolPerLoop,
            bufferBaseVolPerDay,
            bufferBaseTotalVol,
            inputConc,
            predictedYield,
            outputConc
        })

    // Single form change like title
    const handleFormChange = (e) => {
    setViFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
    }))
    }

    // Handle all UI changes
    const handleAllChanges = (e) => {

        // Start using NEXT
        // make next object which is a copy of VI
        const next = {
            ...viFormData,
            [e.target.name]: Number(e.target.value)
        };

        // Start calculating things from here

        // Calculate tank volume
        next.totalTankVolume = next.feedVolume + next.acidVolume + next.baseVolume;

        // Calculate times

        // feed time
        next.feedTime = next.feedVolume / next.feedFlowRateSetpoint;

        // acid time
        next.acidTime = next.acidVolume / next.acidFlowRate;

        // base time
        next.baseTime = next.baseVolume /next.baseFlowRate;

        next.tankTime = next.totalTankVolume / next.tankFlowRate;

        // CALCULATE TOTAL CYCLE TIME
        next.totalCycleTime =
            next.feedTime +
            next.acidTime +
            next.holdTime +
            next.baseTime +
            next.tankTime;

        //Calculate averages
        next.feedAverageFlowRate =
            next.feedVolume /
            next.totalCycleTime;

        next.tankAverageFlowRate =
            next.totalTankVolume /
            next.totalCycleTime;

        // Round to 3 dp
        Object.keys(next).forEach(key => {
            if (typeof next[key] === "number") {
                next[key] = Number(next[key].toFixed(3));
            }
        });
        setViFormData(next);
        // End using NEXT


        // let newTotalTankVolume = viFormData.totalTankVolume
        // let newTotalCycleTime = viFormData.totalCycleTime

        

        // Feed data
        // const newfeedFlowRateSetpoint = e.target.name === "feedFlowRateSetpoint" ? parseFloat(e.target.value) : viFormData.feedFlowRateSetpoint;
        // const newFeedVolume = e.target.name === "feedVolume" ? parseFloat(e.target.value) : viFormData.feedVolume;
        

        // const newFeedTime = (newFeedVolume / newfeedFlowRateSetpoint)

        // Come back to this one later as it needs to be done last
        // const newFeedAverageFlowRate = (newFeedVolume / newTotalCycleTime);
        // Acid data
        // const newAcidFlowRate = e.target.name === "acidFlowRate" ? parseFloat(e.target.value) : viFormData.acidFlowRate;
        // const newAcidVolume = e.target.name === "acidVolume" ? parseFloat(e.target.value) : viFormData.acidVolume;
        // const newAcidTime = (newAcidVolume / newAcidFlowRate)

        // Hold Time
        //  const newHoldTime = e.target.name === "holdTime" ? parseFloat(e.target.value) : viFormData.holdTime;

        // Base addition
        // const newBaseFlowRate = e.target.name === "baseFlowRate" ? parseFloat(e.target.value) : viFormData.baseFlowRate;
        // const newBaseVolume = e.target.name === "baseVolume" ? parseFloat(e.target.value) : viFormData.baseVolume;
        // const newBaseTime = (newBaseVolume / newBaseFlowRate);

        // Tank empty
        // const newTankFlowRate = e.target.name === "tankFlowRate" ? parseFloat(e.target.value) : viFormData.tankFlowRate;

        // Tank time do later as it requires all values
        // const newTankTime = (newTotalTankVolume / newTankFlowRate)

        // Tank average flow rate as well
        // const newTankAverageFlowRate = (newTotalTankVolume / newTotalCycleTime)

         // Totals
        // newTotalTankVolume = parseFloat(newFeedVolume + newAcidVolume + newBaseVolume);

        // newTotalCycleTime = parseFloat(newFeedTime + newAcidTime + newHoldTime + newBaseTime + newTankTime);
       

        // setViFormData((prev)=> ({
        //     ...prev,
        //     feedFlowRateSetpoint: newfeedFlowRateSetpoint,
        //     feedVolume: newFeedVolume,
        //     feedTime: newFeedTime,
        //     feedAverageFlowRate: newFeedAverageFlowRate,
        //     acidFlowRate: newAcidFlowRate,
        //     acidVolume: newAcidVolume,
        //     acidTime: newAcidTime,
        //     holdTime: newHoldTime,
        //     baseFlowRate: newBaseFlowRate,
        //     baseVolume: newBaseVolume,
        //     baseTime: newBaseTime,
        //     tankFlowRate: newTankFlowRate,
        //     tankTime: newTankTime,
        //     totalTankVolume: newTotalTankVolume,
        //     totalCycleTime: newTotalCycleTime

        // }))
    }
    return ( 
        <form className="form-container">
            <FormTextInput label="Title" name="title" value={viFormData.title}
            onChange={handleFormChange}
            />

            {/* Total bits */}
            <p className="form-separator">Total Values</p>
            <div className="form-input-cols">
                <div className="form-input-column-center">
                    <p className="form-input-column-text-label">Full tank volume mL</p>
                    <p className="form-input-column-text-output">{viFormData.totalTankVolume}</p>
                </div>
                
                <div className="form-input-column-center">
                    <p className="form-input-column-text-label">Cycle time min</p>
                    <p className="form-input-column-text-output">{viFormData.totalCycleTime}</p>
                </div>

            </div>

            {/* Feed bits */}
            <p className="form-separator">Feed Details</p>
            <div className="form-input-cols">

                <div className="form-input-column-center">
                    <p className="form-input-column-text-label">Average flow rate mL/min</p>
                    <p className="form-input-column-text-output">{viFormData.feedAverageFlowRate}</p>
                </div>

                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Flow rate setpoint mL/min" name="feedFlowRateSetpoint"
                    value={viFormData.feedFlowRateSetpoint}
                    onChange={handleAllChanges}
                    />
                </div>

                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Volume mL" name="feedVolume"
                    value={viFormData.feedVolume}
                    onChange={handleAllChanges}
                    />
                </div>
                
                <div className="form-input-column-center">
                    <p className="form-input-column-text-label">Time min</p>
                    <p className="form-input-column-text-output">{viFormData.feedTime}</p>
                </div>

                
            </div>

            {/* Acid bits */}
            <p className="form-separator">Acid addition</p>
            <div className="form-input-cols">
                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Flow Rate mL/min" name="acidFlowRate"
                    value={viFormData.acidFlowRate}
                    onChange={handleAllChanges}
                    />
                </div>

                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Volume mL" name="acidVolume"
                    value={viFormData.acidVolume}
                    onChange={handleAllChanges}
                    />
                </div>

                <div className="form-input-column-center">
                    <p className="form-input-column-text-label">Time min</p>
                    <p className="form-input-column-text-output">{viFormData.acidTime}</p>
                </div>
            </div>

            {/* Hold time bit */}
            <p className="form-separator">Hold Time</p>
            <div className="form-input-cols">
                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Time min" name="holdTime"
                    value={viFormData.holdTime}
                    onChange={handleAllChanges}
                    />
                </div>
                <div className="form-input-column-center"></div>
                <div className="form-input-column-center"></div>
            </div>

            {/* Base addition */}
            <p className="form-separator">Base Addition</p>
            <div className="form-input-cols">
                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Flow Rate mL/min" name="baseFlowRate"
                    value={viFormData.baseFlowRate}
                    onChange={handleAllChanges}
                    />
                </div>

                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Volume mL" name="baseVolume"
                    value={viFormData.baseVolume}
                    onChange={handleAllChanges}
                    />
                </div>

                <div className="form-input-column-center">
                    <p className="form-input-column-text-label">Time min</p>
                    <p className="form-input-column-text-output">{viFormData.baseTime}</p>
                </div>

            </div>

            {/* Tank empty */}
            <p className="form-separator">Tank Empty</p>

            <div className="form-input-cols">
                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Flow Rate mL/min" name="tankFlowRate"
                    value={viFormData.tankFlowRate}
                    onChange={handleAllChanges}
                    />
                </div>


                <div className="form-input-column-center">
                    <p className="form-input-column-text-label">Time min</p>
                    <p className="form-input-column-text-output">{viFormData.tankTime}</p>
                </div>

                <div className="form-input-column-center">
                    <p className="form-input-column-text-label">Average Flow Rate mL/min</p>
                    <p className="form-input-column-text-output">{viFormData.tankAverageFlowRate}</p>
                </div>

            </div>

        </form>
     );
}
 
export default ViUpdateForm;