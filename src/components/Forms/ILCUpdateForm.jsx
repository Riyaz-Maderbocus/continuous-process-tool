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


    const handleAllChanges = (e)=> {
        const next = {
            ...ilcFormData,
            [e.target.name]: Number(e.target.value)
        }


        setIlcFormData(calculateILCProcess(next))

    }

    const calculateILCProcess = (data) => {
        const next = {...data}
                // Calculations
        // total filter area
        next.totalFilterArea = next.singleFilterArea * next.noFilters;

        // permeate flow rate mlmin
        next.permeateFlowRatemlmin = next.feedFlowRate - next.retentateFlowRate;

        // permeate flow rate lh
        next.permeateFlowRateLh = next.permeateFlowRatemlmin / 1000 * 60;

        // permeate flow flux
        next.permeateFlux = next.permeateFlowRateLh / (next.totalFilterArea/10000)

        // mass balance
        next.outputConc = ((next.inputConc * next.feedFlowRate) /100 * next.predictedYield) / next.retentateFlowRate

        // Round to 3 dp
        Object.keys(next).forEach(key => {
            if (typeof next[key] === "number") {
                next[key] = Number(next[key].toFixed(3));
            }
        });

        return next
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