import { useState } from "react";
import { useUnitOperations } from "../../context/UnitOperationContext";
import FormTextInput from "./FormComponents/FormTextInput";
import FormNumberInput from "./FormComponents/FormNumberInput";
import FormNumberInputSmall from "./FormComponents/FormNumberInputSmall";
import Button from "../Utilities/Button";

const FiltrationUpdateForm = ({unitOperation, closeModal , totalTime}) => {
    const {updateUnitOperationData} = useUnitOperations();
    const {data, title} = unitOperation;
    const {filterType, filterArea, flowRate, flux, filterCapacity, lifetime, 
        noFilters, inputConc, predictedYield, outputConc} = data;
    const [filtrationFormData, setFiltrationFormData] = useState({
        title,
        filterType,
        filterArea,
        flowRate,
        flux,
        filterCapacity,
        lifetime,
        noFilters,
        inputConc,
        predictedYield,
        outputConc
    })

    const inputNameChecker = (inputName, checkedName, trueValue, falseValue) => {
        if (inputName === checkedName){
            return trueValue
        } else {
            return falseValue
        }
    }

    const handleFormChange = (e) => {
        setFiltrationFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleFormChangeNumber = (e) => {
        setFiltrationFormData(previousData =>({
            ...previousData,
            [e.target.name]: parseFloat(e.target.value)
        }))
    }

    // @TODO Combine all of these as they all read each other.
    // const handleFluxChange = (e) => {
    //     // Update new filter area
    //     const newFilterArea = inputNameChecker(e.target.name, "filterArea", parseFloat(e.target.value), filtrationFormData.filterArea)   
    //     // Updated flow rate
    //     const newFlowRate = inputNameChecker(e.target.name, "flowRate", parseFloat(e.target.value), filtrationFormData.flowRate)
    //     // Get new flux from the above values
    //     const newFlux = ((newFlowRate / newFilterArea)/1000 * 60).toFixed(3)

    //     setFiltrationFormData((prev)=> ({
    //         ...prev,
    //         [e.target.name] : parseFloat(e.target.value),
    //         flux: newFlux,

    //     }))
    // }

    // const handleLifeNoChange = (e) => {
    //     // Update Capacity
    //     const newCapacity = e.target.value 
    //     const newFilterLifetime = ((newCapacity * filtrationFormData.filterArea)*1000 / (filtrationFormData.flowRate) /60).toFixed(3)
    //     const newNoFiltersNeeded = Math.ceil(totalTime* 24 / newFilterLifetime)

    //     setFiltrationFormData((prev)=> ({
    //         ...prev,
    //         filterCapacity: newCapacity,
    //         lifetime: newFilterLifetime,
    //         noFilters: newNoFiltersNeeded
    //     }))
    // }

    const handleAllChanges = (e) => {
         // Update new filter area
        const newFilterArea = inputNameChecker(e.target.name, "filterArea", parseFloat(e.target.value), filtrationFormData.filterArea)   
        // Updated flow rate
        const newFlowRate = inputNameChecker(e.target.name, "flowRate", parseFloat(e.target.value), filtrationFormData.flowRate)
        // Get new flux from the above values
        const newFlux = ((newFlowRate / newFilterArea)/1000 * 60).toFixed(3)
        // Updated capacity
        // const newCapacity = inputNameChecker(e.target.name, "filterCapacity", paseFloat(e.target.value), filtrationFormData.filterCapacity)
        const newCapacity = e.target.name === "filterCapacity" ? parseFloat(e.target.value) : filtrationFormData.filterCapacity
        const newFilterLifetime = ((newCapacity * newFilterArea)*1000 / (newFlowRate) /60).toFixed(3)
        const newNoFiltersNeeded = Math.ceil(totalTime.totalDays* 24 / newFilterLifetime)

        setFiltrationFormData((prev)=> ({
            ...prev,
            filterArea: newFilterArea,
            flowRate: newFlowRate,
            flux: newFlux,
            filterCapacity: newCapacity,
            lifetime: newFilterLifetime,
            noFilters: newNoFiltersNeeded
        }))
    }

    const handleMassBalance = (e) => {
        const newInputConc = e.target.name === "inputConc" ? parseFloat(e.target.value) : filtrationFormData.inputConc;
        const newYield = e.target.name === "predictedYield" ? parseFloat(e.target.value) : filtrationFormData.predictedYield;
        const newOuptConcentration = (newInputConc * (newYield / 100)).toFixed(3)

        setFiltrationFormData((prev)=>({
            ...prev,
            inputConc: newInputConc,
            predictedYield: newYield,
            outputConc: newOuptConcentration
        }))
    }

    const handleSave = (e) => {
        e.preventDefault()
        const {title, ...data} = filtrationFormData;
        updateUnitOperationData(
            unitOperation.id,
            title,
            data
        )
        closeModal()
    }

    return ( 
        <form className="form-container">

            <FormTextInput label="Title" name="title" value={filtrationFormData.title}
            onChange={handleFormChange}/>

            <FormTextInput label="Filter Type" name="filterType" value={filtrationFormData.filterType}
            onChange={handleFormChange}/>

            <div className="form-input-cols">

                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Filter Area m2" name="filterArea" 
                    value={filtrationFormData.filterArea} 
                    // onChange={handleFluxChange}
                    onChange={handleAllChanges}
                    />
                </div>
                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Flow Rate ml/min" name="flowRate" 
                    value={filtrationFormData.flowRate} 
                    // onChange={handleFluxChange}
                    onChange={handleAllChanges}
                    />
                </div>
                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Filter Capacity L/m2" name="filterCapacity" 
                    value={filtrationFormData.filterCapacity}
                    // onChange={handleLifeNoChange} 
                    onChange={handleAllChanges}
                    />
                </div>

  

            </div>

            <div className="form-input-cols">
                <div className="form-input-column-center">
                    <p className="form-input-column-text-label">Flux L/m2/h</p>
                    <p className="form-input-column-text-label">{filtrationFormData.flux}</p>
                </div>
                <div className="form-input-column-center">
                    <p className="form-input-column-text-label">Filter Lifetime h</p>
                    <p className="form-input-column-text-label">{filtrationFormData.lifetime}</p>
                </div>

                <div className="form-input-column-center">
                    <p className="form-input-column-text-label">No Filters Needed</p>
                    <p className="form-input-column-text-label">{filtrationFormData.noFilters}</p>
                </div>
                <div className="form-input-column-center">
                    <p className="form-input-column-text-label">Total Time days</p>
                    <p className="form-input-column-text-label">{totalTime.totalDays}</p>
                </div>
            </div>

            <p className="form-separator">Mass Balance</p>
            <div className="form-input-cols">
                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Input concentration mg/ml" name="inputConc" 
                    value={filtrationFormData.inputConc} 
                    // onChange={handleFluxChange}
                    onChange={handleMassBalance}
                    />
                </div>
                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Predicted Yield %" name="predictedYield" 
                    value={filtrationFormData.predictedYield} 
                    // onChange={handleFluxChange}
                    onChange={handleMassBalance}
                    />
                </div>
                <div className="form-input-column-center">
                    <p className="form-input-column-text-label">Output concentration mg/ml</p>
                    <p className="form-input-column-text-label">{filtrationFormData.outputConc}</p>
                </div>
            </div>
            <p className="form-separator"></p>
            
            <Button  classes="btn btn-primary full-width-btn" 
            clickFunction={handleSave}> 💾 Save Updated Data</Button>

        </form>
     );
}
 
export default FiltrationUpdateForm;