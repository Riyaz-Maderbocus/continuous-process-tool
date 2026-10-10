const StepTableHeaderItem = ({children, width=10}) => {
    return ( 
        <p className="step-table-header"
            style={{
                width: `${width}%`
            }}
        >{children}</p>
     );
}
 
export default StepTableHeaderItem;