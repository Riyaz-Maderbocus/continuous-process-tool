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

        // Feed data
        const newfeedFlowRateSetpoint = e.target.name === "feedFlowRateSetpoint" ? parseFloat(e.target.value) : viFormData.feedFlowRateSetpoint;
        const newFeedVolume = e.target.name === "feedVolume" ? parseFloat(e.target.value) : viFormData.feedVolume;
        // Come back to this one later as it needs to be done last
        // const newFeedAverageFlowRate = 
        const newFeedTime = (newFeedVolume / newfeedFlowRateSetpoint).toFixed(3)

        // Acid data
        const newAcidFlowRate = e.target.name === "acidFlowRate" ? parseFloat(e.target.value) : viFormData.acidFlowRate;
        const newAcidVolume = e.target.name === "acidVolume" ? parseFloat(e.target.value) : viFormData.acidVolume;
        const newAcidTime = (newAcidVolume / newAcidFlowRate).toFixed(3)

        // Hold Time
         const newHoldTime = e.target.name === "holdTime" ? parseFloat(e.target.value) : viFormData.holdTime;

        // Base addition
        const newBaseFlowRate = e.target.name === "baseFlowRate" ? parseFloat(e.target.value) : viFormData.baseFlowRate;
        const newBaseVolume = e.target.name === "baseVolume" ? parseFloat(e.target.value) : viFormData.baseVolume;
        const newBaseTime = (newBaseVolume / newBaseFlowRate).toFixed(3)

        setViFormData((prev)=> ({
            ...prev,
            feedFlowRateSetpoint: newfeedFlowRateSetpoint,
            feedVolume: newFeedVolume,
            feedTime: newFeedTime,
            acidFlowRate: newAcidFlowRate,
            acidVolume: newAcidVolume,
            acidTime: newAcidTime,
            holdTime: newHoldTime,
            baseFlowRate: newBaseFlowRate,
            baseVolume: newBaseVolume,
            baseTime: newBaseTime,

        }))
    }
    return ( 
        <form className="form-container">
            <FormTextInput label="Title" name="title" value={viFormData.title}
            onChange={handleFormChange}
            />

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

        </form>
     );
}
 
export default ViUpdateForm;