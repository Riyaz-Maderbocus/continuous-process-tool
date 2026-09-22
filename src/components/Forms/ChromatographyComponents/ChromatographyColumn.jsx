const ChromatographyColumn = ({column}) => {
    return ( 
        <div className="chromatography-column">
            <h3>{column.name}</h3>

            <div>
                {column.steps.map((step) => (
                    <div key={step.id}>
                        {step.step}
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default ChromatographyColumn;