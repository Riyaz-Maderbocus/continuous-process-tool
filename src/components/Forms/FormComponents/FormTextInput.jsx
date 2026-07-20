const FormTextInput = ({name, label, value, onChange, required=false}) => {
    return ( 
        <div className="form-input-container">
                <label htmlFor={name} className="form-input-label-full">{label}</label>
                <input type="text" className={`form-text-input-full`} 
                value={value}
                onChange={onChange}
                required={required}
                name={name}
                id={name}/>
                {/* Error bits, do this later */}
                {/* {(errorState || (value.length === 0)) && (
                    <p className="form-error-text">Title can't be empty</p>
                )} */}
        </div>
     );
}
 
export default FormTextInput;