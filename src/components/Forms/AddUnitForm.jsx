const AddUnitForm = () => {

    const data = "hi"
    return ( 
        <form  className="form-container"
        >
            
            <div className="form-input-container">
                <label htmlFor="" className="form-input-label-full">Title</label>
                <input type="text" className="form-text-input-full"/>
            </div>

            <div className="form-input-container">
                <label htmlFor="" className="form-input-label-full">Unit Operation Type</label>
                {/* <input type="text" className="form-text-input-full"/> */}
                <select name="" id="" className="form-select-input-full">
                    <option value="chromatography" className="form-select-option">Chromatography</option>
                    <option value="bufferTank" className="form-select-option">Buffer Tank</option>
                </select>
            </div>

            <button type="submit" className="btn full-width-btn btn-primary">✚ Add Unit Operation</button>
        </form>
     );
}
 
export default AddUnitForm;