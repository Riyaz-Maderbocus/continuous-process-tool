import { useState } from "react";
import { useUnitOperations } from "../../context/UnitOperationContext";
import FormTextInput from "./FormComponents/FormTextInput";
import FormNumberInput from "./FormComponents/FormNumberInput";
import FormNumberInputSmall from "./FormComponents/FormNumberInputSmall";
import Button from "../Utilities/Button";
const BioreactorUpdateForm = ({unitOperation, closeModal , totalTime}) => {

    const {updateUnitOperationData} = useUnitOperations()
    const {data, title} = unitOperation
    const {vesselVolume, vvd, flowRatemlmin, flowRatelh, titremgml, titremgmin} = data
        const [bioreactorFormData, setBioreactorFormData] = useState({
        title,
        vesselVolume,
        vvd,
        flowRatemlmin,
        flowRatelh,
        titremgml,
        titremgmin

    })

    const handleFormChange = (e) => {
        setBioreactorFormData({
            ...bioreactorFormData,
            [e.target.name]: e.target.value
        })
    }

    const handleFormChangeNumber = (e) => {
        setBioreactorFormData(previousData =>({
            ...previousData,
            [e.target.name]: parseFloat(e.target.value)
        }))
    }

    const handleSave = (e) => {
        e.preventDefault()
        const {title, ...data} = bioreactorFormData;
        updateUnitOperationData(
            unitOperation.id,
            title,
            data
        )
        closeModal()
    }

    const calculateBioreactorProcess = (data) => {
        const next = {...data};
        // Calculations
        // flow rate l/h
        next.flowRatelh = next.vvd * next.vesselVolume / 24;

        // flow rate ml/min
        next.flowRatemlmin = next.flowRatelh * 1000 / 60;

        // titre mg/min
        next.titremgmin = next.titremgml * next.flowRatemlmin;

        // Round to 3 dp
        Object.keys(next).forEach(key => {
            if (typeof next[key] === "number") {
                next[key] = Number(next[key].toFixed(3));
            }
        });

        return next
    }

    const handleAllChanges = (e) => {
        const next = {...bioreactorFormData,
            [e.target.name] : Number(e.target.value)
        }
        

        setBioreactorFormData(calculateBioreactorProcess(next))

    }

    return ( 
        <form className="form-container" action="#">
            <FormTextInput label="Title" name="title" value={bioreactorFormData.title}
            onChange={handleFormChange}/>

            {/* <p className="form-separator">Vessel Volume and VVD</p> */}

            <div className="form-input-cols">

                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Vessel Volume L" name="vesselVolume" 
                    value={bioreactorFormData.vesselVolume} 
                    onChange={handleAllChanges}/>
                </div>
  
                  <div className="form-input-column-center">
                    <p className="form-input-column-text-label">ml/min</p>
                    <p className="form-input-column-text-label">{bioreactorFormData.flowRatemlmin}</p>
                    
                </div>

            </div>

            {/* <p className="form-separator">Flow rates</p> */}

            <div className="form-input-cols">
  
               <div className="form-input-column-center">
                    <FormNumberInputSmall label="VVD" name="vvd" 
                    value={bioreactorFormData.vvd}
                    onChange={handleAllChanges}/>
                </div>

                <div className="form-input-column-center">
                    <p className="form-input-column-text-label">l/h</p>
                    <p className="form-input-column-text-label">{bioreactorFormData.flowRatelh}</p>
                </div>
                
            </div>

            {/* <p className="form-separator">Titres</p> */}
            <div className="form-input-cols">
                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Titre mg/ml"
                    name="titremgml"
                    value={bioreactorFormData.titremgml}
                    onChange={handleAllChanges}/>
                </div>

                <div className="form-input-column-center">
                    <p className="form-input-column-text-label">Titre mg/min</p>
                    <p className="form-input-column-text-label">{bioreactorFormData.titremgmin}</p>
                </div>
            </div>
            <p className="form-separator"></p>
            
            <Button  classes="btn btn-primary full-width-btn" 
            clickFunction={handleSave}> 💾 Save Updated Data</Button>
        </form>
    );
}
 
export default BioreactorUpdateForm;