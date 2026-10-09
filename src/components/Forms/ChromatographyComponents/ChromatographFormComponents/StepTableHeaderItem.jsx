const StepTableHeaderItem = ({children, width=100}) => {
    return ( 
        <p className="step-table-header"
            style={{
                width: `${width}px`
            }}
        >{children}</p>
     );
}
 
export default StepTableHeaderItem;