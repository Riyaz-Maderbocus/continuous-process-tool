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
        const newfeedFlowRateSetpoint = e.target.name === "feedFlowRateSetpoint" ? parseFloat(e.target.value) : viFormData.feedFlowRateSetpoint;
        const newFeedVolume = e.target.name === "feedVolume" ? parseFloat(e.target.value) : viFormData.feedVolume;
        // Come back to this one later
        // const newFeedAverageFlowRate = 
        const newFeedTime = (newFeedVolume / newfeedFlowRateSetpoint).toFixed(3)

        setViFormData((prev)=> ({
            ...prev,
            feedFlowRateSetpoint: newfeedFlowRateSetpoint,
            feedVolume: newFeedVolume,
            feedTime: newFeedTime,

        }))
    }
    return ( 
        <form className="form-container">
            <FormTextInput label="Title" name="title" value={viFormData.title}
            onChange={handleFormChange}
            />
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

        </form>
     );
}
 
export default ViUpdateForm;