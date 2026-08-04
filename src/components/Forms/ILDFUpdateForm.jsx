import { useState } from "react";
import { useUnitOperations } from "../../context/UnitOperationContext";
import FormTextInput from "./FormComponents/FormTextInput";
import FormNumberInput from "./FormComponents/FormNumberInput";
import FormNumberInputSmall from "./FormComponents/FormNumberInputSmall";
import Button from "../Utilities/Button";

const ILDFUpdateForm = ({unitOperation, closeModal, totalTime}) => {
    const {updateUnitOperationData} = useUnitOperations();
    const {data, title} = unitOperation;
    const {singleFilterArea, noFilters, totalFilterArea, feedFlowRate,
        bufferFlowRatemlmin, bufferFlowRateLh, bufferFlowRateLday,
        permeateFlux, inputConc, predictedYield, outputConc, totalBufferVolume
    } = data;

    // Form state
    const [ildfFormData, setIldfFormData] = useState({
        title,
        singleFilterArea, 
        noFilters, 
        totalFilterArea, 
        feedFlowRate,
        bufferFlowRatemlmin, 
        bufferFlowRateLh, 
        bufferFlowRateLday,
        permeateFlux, 
        inputConc, 
        predictedYield, 
        outputConc, 
        totalBufferVolume
    })

        // Single form change like title
    const handleFormChange = (e) => {
    setIlcFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
    }))
    }

    // handle all changes
    const handleAllChanges = (e)=> {
        const newSingleFilterArea = e.target.name === "singleFilterArea" ? parseFloat(e.target.value) : ildfFormData.singleFilterArea;
        const newNoFilters = e.target.name === "noFilters" ? parseFloat(e.target.value) : ildfFormData.noFilters;
        const newTotalFilterArea = (newSingleFilterArea * newNoFilters).toFixed(3)

        const newFeedFlowRate = e.target.name === "feedFlowRate" ? parseFloat(e.target.value) : ildfFormData.feedFlowRate;
        const newBufferFlowRatemlmin = e.target.name === "bufferFlowRatemlmin" ? parseFloat(e.target.value) : ildfFormData.bufferFlowRatemlmin;

        const newBufferFlowRateLh = (newBufferFlowRatemlmin/1000* 60).toFixed(3)
        const newBufferFlowRateLday = (newBufferFlowRateLh * 24).toFixed(3)
        const newPermeateFlux = (newBufferFlowRateLh/(newTotalFilterArea/10000)).toFixed(3)

        const newInputConc = e.target.name === "inputConc" ? parseFloat(e.target.value) : ildfFormData.inputConc;
        const newPredictedYield = e.target.name === "predictedYield" ? parseFloat(e.target.value) : ildfFormData.predictedYield;
        const newOutputConc = (newInputConc/100 * newPredictedYield).toFixed(3)

        const newTotalBufferVolume = (newBufferFlowRateLh * 24 * totalTime.totalDays).toFixed(3)


        setIldfFormData((prev)=> ( {
            ...prev,
            singleFilterArea: newSingleFilterArea, 
            noFilters: newNoFilters, 
            totalFilterArea: newTotalFilterArea, 
            feedFlowRate: newFeedFlowRate,
            bufferFlowRatemlmin : newBufferFlowRatemlmin, 
            bufferFlowRateLh : newBufferFlowRateLh, 
            bufferFlowRateLday : newBufferFlowRateLday,
            permeateFlux: newPermeateFlux, 
            inputConc: newInputConc, 
            predictedYield: newPredictedYield, 
            outputConc: newOutputConc, 
            totalBufferVolume: newTotalBufferVolume
        }))
    }
    return ( 
        <form className="form-container">
            <FormTextInput label="Title" name="title" value={ildfFormData.title}
            onChange={handleFormChange}
            />
            <p className="form-separator">Filter Area Details</p>
            <div className="form-input-cols">
                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Single Filter Area cm2" name="singleFilterArea"
                    value={ildfFormData.singleFilterArea}
                    onChange={handleAllChanges}
                    />
                </div>
                <div className="form-input-column-center">
                    <FormNumberInputSmall label="No of filters" name="noFilters"
                    value={ildfFormData.noFilters}
                    onChange={handleAllChanges}
                    />
                </div>
                <div className="form-input-column-center">
                    <p className="form-input-column-text-label">Total filter area cm2</p>
                    <p className="form-input-column-text-output">{ildfFormData.totalFilterArea}</p>
                </div>
            </div>

            <p className="form-separator">Flow Rate Details</p>
            <div className="form-input-cols">
                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Feed/Retentate Flow Rate mL/min" name="feedFlowRate"
                    value={ildfFormData.feedFlowRate}
                    onChange={handleAllChanges}
                    />
                </div>
                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Buffer Flow Rate (Total) mL/min" name="bufferFlowRatemlmin"
                    value={ildfFormData.bufferFlowRatemlmin}
                    onChange={handleAllChanges}
                    />
                </div>
                {/* <div className="form-input-column-center">
                    
                    <FormNumberInputSmall label="Buffer Flow Rate (Total) L/h" name="bufferFlowRateLh"
                    value={ildfFormData.bufferFlowRateLh}
                    onChange={handleAllChanges}
                    />
                </div> */}

            </div>

            <div className="form-input-cols">
                <div className="form-input-column-center">
                    <p className="form-input-column-text-label">Buffer Flow Rate (Total) L/h</p>
                    <p className="form-input-column-text-output">{ildfFormData.bufferFlowRateLh}</p>
                    {/* <FormNumberInputSmall label="Buffer Flow Rate (Total) L/h" name="bufferFlowRateLh"
                    value={ildfFormData.bufferFlowRateLh}
                    onChange={handleAllChanges}
                    /> */}
                </div>
                <div className="form-input-column-center">
                    <p className="form-input-column-text-label">Buffer Flow Rate (Total) L/day</p>
                    <p className="form-input-column-text-output">{ildfFormData.bufferFlowRateLday}</p>
                </div>
                <div className="form-input-column-center">
                    <p className="form-input-column-text-label">Permeate Flux L/m2/h</p>
                    <p className="form-input-column-text-output">{ildfFormData.permeateFlux}</p>
                </div>
            </div>
            <p className="form-separator">Mass Balance</p>

            <div className="form-input-cols">
                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Input Concentration mg/mL" name="inputConc"
                    value={ildfFormData.inputConc}
                    onChange={handleAllChanges}
                    />
                </div>
                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Predicted Yield %" name="predictedYield"
                    value={ildfFormData.predictedYield}
                    onChange={handleAllChanges}
                    />
                </div>
                <div className="form-input-column-center">
                    <p className="form-input-column-text-label">Output Concentration mg/mL</p>
                    <p className="form-input-column-text-output">{ildfFormData.outputConc}</p>
                </div>
            </div>
            <p className="form-separator"></p>
            <div className="form-input-cols">
                <div className="form-input-column-center">
                    <p className="form-input-column-text-label">Total Buffer Volume L</p>
                    <p className="form-input-column-text-output">{ildfFormData.totalBufferVolume}</p>
                </div>
            </div>



        </form>
     );
}
 
export default ILDFUpdateForm;