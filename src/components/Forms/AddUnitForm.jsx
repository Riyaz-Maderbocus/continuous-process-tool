import { useState } from "react";
import { useUnitOperations } from "../../context/UnitOperationContext";

const AddUnitForm = ({closeModal}) => {
    const {unitOperations, setUnitOperations, addUnitOperation} = useUnitOperations()

    const [addFormData, setAddFormData] = useState({
        title: "",
        type: "chromatography"
    })

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
        if (!addFormData["title"]) return

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
            
            <div className="form-input-container">
                <label htmlFor="title" className="form-input-label-full">Title</label>
                <input type="text" className="form-text-input-full" 
                value={addFormData.title}
                onChange={handleChange}
                name="title"
                id="title"/>
            </div>

            <div className="form-input-container">
                <label htmlFor="type" className="form-input-label-full">Unit Operation Type</label>
                <select name="" id="" className="form-select-input-full" value={addFormData.type}
                onChange={handleChange}
                name="type"
                id="type">
                    <option value="chromatography" className="form-select-option">Chromatography</option>
                    <option value="buffer" className="form-select-option">Buffer Tank</option>
                </select>
            </div>

            <button type="submit" className="btn full-width-btn btn-primary">✚ Add Unit Operation</button>
        </form>
     );
}
 
export default AddUnitForm;