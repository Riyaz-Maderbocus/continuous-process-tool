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
    setIldfFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
    }))
    }
    return ( 
        <form className="form-container">
            testheckle

        </form>
     );
}
 
export default ViUpdateForm;