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

    return ( 
        <form className="form-container">

            <FormTextInput label="Title" name="title" value={filtrationFormData.title}
            />

            <FormTextInput label="Filter Type" name="filterType" value={filtrationFormData.filterType}/>

            <div className="form-input-cols">

                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Filter Area m2" name="filterArea" 
                    value={filtrationFormData.filterArea} 
                    />
                </div>
                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Flow Rate ml/min" name="flowRate" 
                    value={filtrationFormData.flowRate} 
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
            </div>


        </form>
     );
}
 
export default FiltrationUpdateForm;