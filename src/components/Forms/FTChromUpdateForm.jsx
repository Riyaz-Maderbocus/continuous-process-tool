import { useState } from "react";
import { useUnitOperations } from "../../context/UnitOperationContext";
import FormTextInput from "./FormComponents/FormTextInput";
import FormNumberInput from "./FormComponents/FormNumberInput";
import FormNumberInputSmall from "./FormComponents/FormNumberInputSmall";
import Button from "../Utilities/Button";
const FTChromUpdateForm = ({unitOperation, closeModal, totalTime}) => {
    const {updateUnitOperationData} = useUnitOperations();
    const {data, title} = unitOperation;
    const [ftcFormData, setFtcFormData] = useState({
        title,
        ...data
    });

    // Single form change like title
    const handleFormChange = (e) => {
    setFtcFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
    })) 
    }

        // Handle all UI changes
    const handleAllChanges = (e) => {

        // Start using NEXT
        // make next object which is a copy of ftc
            const next = {
                ...ftcFormData,
                [e.target.name]: Number(e.target.value)
            };

            setFtcFormData(calculateFTChromProcessProcess(next));
        // End using NEXT
    }
    
    
    const calculateFTChromProcess = (data) => {
        const next = {...data}
    
        // Start calculating things here
    }

    const handleSave = (e) => {
        e.preventDefault()
        const {title, ...data} = ftcFormData;
        updateUnitOperationData(
            unitOperation.id,
            title,
            data
        )
        closeModal()
    }


    return (
        <form className="form-container">

            <FormTextInput label="Title" name="title" value={ftcFormData.title}
            onChange={handleFormChange}
            />


            
            <p className="form-separator"></p>
            <Button  classes="btn btn-primary full-width-btn" 
            clickFunction={handleSave}> 💾 Save Updated Data</Button>
        </form>
     );
}
 
export default FTChromUpdateForm;