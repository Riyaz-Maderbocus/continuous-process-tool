import { useState } from "react";
import FormTextInput from "./FormComponents/FormTextInput";
import FormNumberInput from "./FormComponents/FormNumberInput";
import FormNumberInputSmall from "./FormComponents/FormNumberInputSmall";
import Button from "../Utilities/Button";
const BioreactorUpdateForm = ({unitOperation, closeModal}) => {

    const {data, title} = unitOperation
    const {vesselVolume, vvd, flowRatemlmin, flowRatelh, titremgml, titremgmin} = data
        const [updateBioreactorFormData, setUpdateBioreactorFormData] = useState({
        title,
        vesselVolume,
        vvd,
        flowRatemlmin,
        flowRatelh,
        titremgml,
        titremgmin

    })
    return ( 
        <form className="form-container">
            <FormTextInput label="Title" value={title}/>

            <p className="form-separator">Flow rates</p>

            <div className="form-input-cols">
                <div className="form-input-column">
                    <FormNumberInputSmall label="VVD" />
                </div>
                <div className="form-input-column-center">
                    <p className="form-input-column-text-label">ml/min</p>
                    <p className="form-input-column-text-label">{flowRatemlmin}</p>
                    
                </div>
                <div className="form-input-column-center">
                    <p className="form-input-column-text-label">l/h</p>
                    <p className="form-input-column-text-label">{flowRatelh}</p>
                </div>
                
            </div>

            <p className="form-separator">Titres</p>
            <div className="form-input-cols">
                <div className="form-input-column">
                    <FormNumberInputSmall label="Titre mg/ml" />
                </div>

                <div className="form-input-column-center">
                    <p className="form-input-column-text-label">mg/min</p>
                    <p className="form-input-column-text-label">{titremgmin}</p>
                </div>
            </div>
            <p className="form-separator"></p>
            
            <Button classes="btn btn-primary full-width-btn"> 🖩 Calculate</Button>
        </form>
    );
}
 
export default BioreactorUpdateForm;