const FormNumberInputSmall = ({name, label="", value, onChange, required=false, disabled=false}) => {
    return ( 
            <>
                <label htmlFor={name} className="">{label}</label>
                <input type="number" className="form-input-cols-input" 
                value={value}
                onChange={onChange}
                required={required}
                name={name}
                id={name}
                disabled={disabled}/>
            </>


     );
}
 
export default FormNumberInputSmall;