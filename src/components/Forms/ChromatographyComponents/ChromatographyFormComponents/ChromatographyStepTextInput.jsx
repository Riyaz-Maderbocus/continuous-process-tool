const ChromatographyStepTextInput = ({name, value, onChange, width, required=false, }) => {
    return (                 
        <input type="text" className="chromatography-step-input" 
        style={{
            width: `${width}%`
        }}
        value={value}
        onChange={onChange}
        required={required}
        name={name}
        id={name}/>
     );
}
 
export default ChromatographyStepTextInput;