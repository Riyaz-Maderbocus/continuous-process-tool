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

    // const oldValueChecker = (nameCheck, checkAgainst, trueValue, fasleValue)=> {
    //     if (nameCheck === checkAgainst){

    //     }
    // }

    const handleFlowRateChange = (e) => {
        let newVesselVolume = 0
        // Update new vessel volumes
        if (e.target.name === "vesselVolume"){
            newVesselVolume = parseFloat(e.target.value)
        } else {
            newVesselVolume = bioreactorFormData.vesselVolume
        }
        // console.log("")

        // Updated VVD
        let newVvd = 0
        if (e.target.name === "vvd"){
            newVvd = parseFloat(e.target.value)
        } else {
            newVvd = bioreactorFormData.vvd
        }

        const newFlowRateLh = parseFloat((newVvd * (newVesselVolume /24)).toFixed(3))
        const newFlowRatemlmin = parseFloat((newFlowRateLh * 1000 / 60).toFixed(3))
        const newTitremgmin = parseFloat((newFlowRatemlmin * bioreactorFormData.titremgml).toFixed(3))
        setBioreactorFormData({
            ...bioreactorFormData,
            [e.target.name]: parseFloat(e.target.value),
            flowRatemlmin: newFlowRatemlmin,
            flowRatelh: newFlowRateLh,
            titremgmin: newTitremgmin
        })

    }

    const handleTitreChange = (e) => {
        const newTitremgml = parseFloat(e.target.value);
        const newTitremgmin = parseFloat((newTitremgml * bioreactorFormData.flowRatemlmin).toFixed(3))
        setBioreactorFormData({
            ...bioreactorFormData,
            [e.target.name]: parseFloat(e.target.value),
            titremgmin: newTitremgmin
        })
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
                    onChange={handleFlowRateChange}/>
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
                    onChange={handleFlowRateChange}/>
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
                    onChange={handleTitreChange}/>
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