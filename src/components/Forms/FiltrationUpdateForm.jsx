import { useState } from "react";
import { useUnitOperations } from "../../context/UnitOperationContext";
import FormTextInput from "./FormComponents/FormTextInput";
import FormNumberInput from "./FormComponents/FormNumberInput";
import FormNumberInputSmall from "./FormComponents/FormNumberInputSmall";
import Button from "../Utilities/Button";

const FiltrationUpdateForm = ({unitOperation, closeModal}) => {
    const {updateUnitOperationData} = useUnitOperations();
    const {data, title} = unitOperation;
    const {filterType, filterArea, flowRate, flux, filterCapacity, lifetime} = data;
    const [filtrationFormData, setFiltrationFormData] = useState({
        title,
        filterType,
        filterArea,
        flowRate,
        flux,
        filterCapacity,
        lifetime
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

    const handleFluxChange = (e) => {
        // Update new filter area
        let newFilterArea = 0;

        newFilterArea = inputNameChecker(e.target.name, "filterArea", parseFloat(e.target.value), filtrationFormData.filterArea)

        // Updated flow rate

        let newFlowRate = inputNameChecker(e.target.name, "flowRate", parseFloat(e.target.value), filtrationFormData.flowRate)
        // if (e.target.name === "filterArea") {

        // }

        // Get new flux from the above values

        const newFlux = ((newFlowRate / newFilterArea)/1000 * 60).toFixed(3)

        setFiltrationFormData((prev)=> ({
            ...prev,
            [e.target.name] : parseFloat(e.target.value),
            flux: newFlux,

        }))
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
                    onChange={handleFluxChange}
                    />
                </div>
                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Flow Rate ml/min" name="flowRate" 
                    value={filtrationFormData.flowRate} 
                    onChange={handleFluxChange}
                    />
                </div>
                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Filter Capacity L/m2" name="filterCapacity" 
                    value={filtrationFormData.filterCapacity} 
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
                    
                </div>
            </div>


        </form>
     );
}
 
export default FiltrationUpdateForm;