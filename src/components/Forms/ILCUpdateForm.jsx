import { useState } from "react";
import { useUnitOperations } from "../../context/UnitOperationContext";
import FormTextInput from "./FormComponents/FormTextInput";
import FormNumberInput from "./FormComponents/FormNumberInput";
import FormNumberInputSmall from "./FormComponents/FormNumberInputSmall";
import Button from "../Utilities/Button";

const ILCUpdateForm = ({unitOperation, closeModal, totalTime}) => {
    const {updateUnitOperationData} = useUnitOperations();
    const {data, title} = unitOperation;
    const {singleFilterArea, noFilters, totalFilterArea, feedFlowRate,
        retentateFlowRate, permeateFlowRatemlmin, permeateFlowRateLh,
        permeateFlux, inputConc, predictedYield, outputConc
    } = data;

    // YOU ARE HERE. NEED TO MAKE FORM STATE
    const [ilcFormData, setIlcFormData] = useState(
        {title,
        singleFilterArea,
        noFilters,
        totalFilterArea,
        feedFlowRate,
        retentateFlowRate,
        permeateFlowRatemlmin,
        permeateFlowRateLh,
        permeateFlux,
        inputConc,
        predictedYield,
        outputConc
        }
    )

    // Single form change like title
    const handleFormChange = (e) => {
    setIlcFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
    }))
    }

    // Handle Flow changes
    const handleAllChanges = (e) => {
        const newSingleFilterArea = e.target.name === "singleFilterArea" ? parseFloat(e.target.value) : ilcFormData.singleFilterArea;
        const newNofilters = e.target.name === "noFilters" ? parseFloat(e.target.value) : ilcFormData.noFilters;
        const newTotalFilterArea = (newSingleFilterArea * newNofilters).toFixed(3)

        const newFeedFlowRate = e.target.name === "feedFlowRate" ? parseFloat(e.target.value) : ilcFormData.feedFlowRate;
        const newRetentateFlowRate = e.target.name === "retentateFlowRate" ? parseFloat(e.target.value) : ilcFormData.retentateFlowRate;

        const newPermeateFlowRatemlmin = (newFeedFlowRate - newRetentateFlowRate).toFixed(3);

        const newPermeateFlowRateLh = (newPermeateFlowRatemlmin / 1000 * 60).toFixed(3)

        const newPermeateFlux = (newPermeateFlowRateLh/(newTotalFilterArea / 10000)).toFixed(3)

        // mass balance bits

        const newInputConc = e.target.name === "inputConc" ? parseFloat(e.target.value) : ilcFormData.inputConc;
        const newPredictedYield = e.target.name === "predictedYield" ? parseFloat(e.target.value) : ilcFormData.predictedYield;

        const newOutputConc = (((newInputConc * newFeedFlowRate) / 100 * newPredictedYield) / newRetentateFlowRate).toFixed(3)


        setIlcFormData((prev)=> ({
            ...prev,
            singleFilterArea: newSingleFilterArea,
            noFilters: newNofilters,
            totalFilterArea: newTotalFilterArea,
            feedFlowRate: newFeedFlowRate,
            retentateFlowRate: newRetentateFlowRate,
            permeateFlowRatemlmin: newPermeateFlowRatemlmin,
            permeateFlowRateLh: newPermeateFlowRateLh,
            permeateFlux: newPermeateFlux,
            inputConc: newInputConc,
            predictedYield: newPredictedYield,
            outputConc: newOutputConc
        }))
        
    }

    const handleSave = (e) => {
        e.preventDefault()
        const {title, ...data} = ilcFormData;
        updateUnitOperationData(
            unitOperation.id,
            title,
            data
        )
        closeModal()
    }
    return ( 
        <form className="form-container">
            <FormTextInput label="Title" name="title" value={ilcFormData.title}
            onChange={handleFormChange}
            />
            <p className="form-separator">Filter Area Details</p>
            <div className="form-input-cols">
                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Single Filter Area cm2" name="singleFilterArea"
                    value={ilcFormData.singleFilterArea}
                    onChange={handleAllChanges}/>
                </div>
                <div className="form-input-column-center">
                    <FormNumberInputSmall label="No of filters" name="noFilters"
                    value={ilcFormData.noFilters}
                    onChange={handleAllChanges}/>
                </div>
                <div className="form-input-column-center">
                    <p className="form-input-column-text-label">Total filter area cm2</p>
                    <p className="form-input-column-text-output">{ilcFormData.totalFilterArea}</p>
                </div>
            </div>

            <p className="form-separator">Flow Rate Details</p>
            <div className="form-input-cols">
                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Feed Flow Rate mL/min" name="feedFlowRate"
                    value={ilcFormData.feedFlowRate}
                    onChange={handleAllChanges}/>
                </div>
                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Retentate Flow Rate mL/min" name="retentateFlowRate"
                    value={ilcFormData.retentateFlowRate}
                    onChange={handleAllChanges}/>
                </div>

                <div className="form-input-column-center">
                    
                </div>
            </div>

            <div className="form-input-cols">
                <div className="form-input-column-center">
                    <p className="form-input-column-text-label">Permeate flow rate mL/min</p>
                    <p className="form-input-column-text-output">{ilcFormData.permeateFlowRatemlmin}</p>
                </div>
                <div className="form-input-column-center">
                    <p className="form-input-column-text-label">Permeate flow rate L/h</p>
                    <p className="form-input-column-text-output">{ilcFormData.permeateFlowRateLh}</p>
                </div>
                <div className="form-input-column-center">
                     <p className="form-input-column-text-label">Permeate flux L/m2/h</p>
                    <p className="form-input-column-text-output">{ilcFormData.permeateFlux}</p>
                    {/* <FormNumberInputSmall label="Permeate Flux L/m2/h" name="permeateFlux"
                    value={ilcFormData.permeateFlux}
                    onChange={handleAllChanges}/> */}
                </div>
            </div>

            <p className="form-separator">Mass Balance</p>
            <div className="form-input-cols">
                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Input Concentration mg/mL" name="inputConc"
                    value={ilcFormData.inputConc}
                    onChange={handleAllChanges}
                    />
                </div>
                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Predicted Yield %" name="predictedYield"
                    value={ilcFormData.predictedYield}
                    onChange={handleAllChanges}
                    />
                </div>
                <div className="form-input-column-center">
                    <p className="form-input-column-text-label">Output Concentration mg/mL</p>
                    <p className="form-input-column-text-output">{ilcFormData.outputConc}</p>
                </div>
            </div>
            <p className="form-separator"></p>

            <Button  classes="btn btn-primary full-width-btn" 
            clickFunction={handleSave}> 💾 Save Updated Data</Button>
        </form>
     );
}
 
export default ILCUpdateForm;