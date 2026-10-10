const ChromatographyStepNumberInput = ({name, value, onChange, width, required=false}) => {
    return (                  
        <input type="number" className="chromatography-step-input" 
        style={{
            width: `${width}px`
        }}
        value={value}
        onChange={onChange}
        required={required}
        name={name}
        id={name}/>


    );
}
 
export default ChromatographyStepNumberInput;