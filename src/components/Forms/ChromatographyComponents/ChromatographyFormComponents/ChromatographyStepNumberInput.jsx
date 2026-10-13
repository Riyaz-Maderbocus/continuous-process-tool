const ChromatographyStepNumberInput = ({name, value, onChange, width, required=false, disabled=false}) => {
    return (                  
        <input type="number" className="chromatography-step-input" 
        style={{
            width: `${width}%`
        }}
        value={value ?? ""}
        disabled={disabled}
        onChange={(e) => onChange(
        e.target.value === "" ? "" : Number(e.target.value)
        )}
        required={required}
        name={name}
        id={name}/>


    );
}
 
export default ChromatographyStepNumberInput;