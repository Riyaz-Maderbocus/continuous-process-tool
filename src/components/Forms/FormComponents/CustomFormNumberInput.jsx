const CustomFormNumberInput = ({name, containerClasses = "",label="", labelClasses = "", classes = "", value, onChange, required=false}) => {
    return ( 
        <div className={containerClasses}>

                {label && 
                <label htmlFor={name} className={labelClasses}>{label}</label>
                }
                
                <input type="number" className={classes} 
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
 
export default CustomFormNumberInput;