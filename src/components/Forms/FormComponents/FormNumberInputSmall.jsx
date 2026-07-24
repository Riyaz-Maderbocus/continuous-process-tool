const FormNumberInputSmall = ({name, label="", value, onChange, required=false}) => {
    return ( 
            <>
                <label htmlFor={name} className="">{label}</label>
                <input type="number" className="form-input-cols-input" 
                value={value}
                onChange={onChange}
                required={required}
                name={name}
                id={name}/>
            </>


     );
}
 
export default FormNumberInputSmall;