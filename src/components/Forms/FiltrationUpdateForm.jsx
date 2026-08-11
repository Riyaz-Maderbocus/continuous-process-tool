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

    const handleFormChange = (e) => {
        setFiltrationFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }


    const handleAllChanges = (e) => {
        const next = {...filtrationFormData,
            [e.target.name] : Number(e.target.value)
        }
        setFiltrationFormData(calculateFiltrationProcess(next))
    }

    const calculateFiltrationProcess = (data) => {
        const next = {...data}
        // Calculations
        // flux
        next.flux = ((next.flowRate / next.filterArea) /1000) * 60

        // filter lifetime
        next.lifetime = (next.filterCapacity * next.filterArea) * 1000 /next.flowRate/60

        // filters required
        next.noFilters = Math.ceil(totalTime.totalDays * 24 / next.lifetime)

        // mass balance
        next.outputConc = next.inputConc / 100 * next.predictedYield

        // Round to 3 dp
        Object.keys(next).forEach(key => {
            if (typeof next[key] === "number") {
                next[key] = Number(next[key].toFixed(3));
            }
        });

        return next;
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
                    onChange={handleAllChanges}
                    />
                </div>
                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Predicted Yield %" name="predictedYield" 
                    value={filtrationFormData.predictedYield} 
                    // onChange={handleFluxChange}
                    onChange={handleAllChanges}
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