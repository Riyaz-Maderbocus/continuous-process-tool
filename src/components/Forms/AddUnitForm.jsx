import { useState } from "react";
import { useUnitOperations } from "../../context/UnitOperationContext";
import FormTextInput from "./FormComponents/FormTextInput";
import FormSelectInput from "./FormComponents/FormSelectInput";
import Button from "../Utilities/Button";

const AddUnitForm = ({closeModal}) => {
    const {unitOperations, setUnitOperations, addUnitOperation} = useUnitOperations()

    const [addFormData, setAddFormData] = useState({
        title: "",
        type: "chromatography"
    })

    // const [titleError, setTitleError] = useState(false)

    // if (addFormData.title.length > 0){
    //     setTitleError(false)
    // }

    const handleChange = (e)=> {
        setAddFormData({
            ...addFormData,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e)=> {
        e.preventDefault();
        // alert("form submitted")
        // console.log("form submitted", addFormData)
        if (!addFormData["title"]) {
            // setTitleError(true)
            return
        }
        

        // Create new unit operation
        // Add unit operation from the context
        addUnitOperation(addFormData["title"], addFormData["type"])

        // reset original form values

        setAddFormData({
            title: "",
            type: "chromatography"
        })
        // escape modal
        closeModal()
    }
    return ( 
        <form  className="form-container"
        onSubmit={handleSubmit}
        >
            
            {/* <div className="form-input-container">
                <label htmlFor="title" className="form-input-label-full">Title</label>
                <input type="text" className={`form-text-input-full ${!titleError ? "" : "form-input-error"}`} 
                value={addFormData.title}
                onChange={handleChange}
                name="title"
                id="title"/>
                {(titleError || (addFormData.title.length === 0)) && (
                    <p className="form-error-text">Title can't be empty</p>
                )}
            </div> */}

            <FormTextInput label="Title" name="title" value={addFormData.title}
            onChange={handleChange} required={true}  />

            {/* <div className="form-input-container">
                <label htmlFor="type" className="form-input-label-full">Unit Operation Type</label>
                <select name="" id="" className="form-select-input-full" value={addFormData.type}
                onChange={handleChange}
                name="type"
                id="type">
                    <option value="chromatography" className="form-select-option">Chromatography</option>
                    <option value="buffer" className="form-select-option">Buffer Tank</option>
                </select>
            </div> */}

            <FormSelectInput name="type" label="Unit Operation Type"
            value={addFormData.type}
            onChange={handleChange}
            options={[{value: "chromatography", label: "Chromatography"},
                {value: "buffer", label: "Buffer Tank"}
            ]}/>

            {/* <button type="submit" className="btn full-width-btn btn-primary">✚ Add Unit Operation</button> */}
            <Button type="submit" classes="btn full-width-btn btn-primary" clickFunction={handleSubmit}>✚ Add Unit Operation</Button>

        </form>
     );
}
 
export default AddUnitForm;