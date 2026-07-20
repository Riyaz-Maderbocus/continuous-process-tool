const FormSelectInput = ({name, label, value, onChange, required=false, options}) => {
    return ( 
            <div className="form-input-container">
                <label htmlFor={name} className="form-input-label-full">{label}</label>
                <select name={name} id={name} className="form-select-input-full" value={value}
                onChange={onChange}
                >
                    {/* <option value="chromatography" className="form-select-option">Chromatography</option>
                    <option value="buffer" className="form-select-option">Buffer Tank</option> */}

                    {options.map((option)=> (
                        <option className="form-select-option" value={option.value} key={option.value}>{option.label}</option>))}
                </select>
            </div>
     );
}
 
export default FormSelectInput;