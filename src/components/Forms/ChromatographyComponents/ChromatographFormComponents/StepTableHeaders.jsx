import StepTableHeaderItem from "./StepTableHeaderItem";

const StepTableHeaders = () => {
    return ( 
        <div className="step-table-header-container">
            <StepTableHeaderItem width={15}></StepTableHeaderItem>
            <StepTableHeaderItem width={300}>Step</StepTableHeaderItem>
            <StepTableHeaderItem width={500}>Buffer</StepTableHeaderItem>
            <StepTableHeaderItem width={200}>Flow Rate (mL/min)</StepTableHeaderItem>
            <StepTableHeaderItem width={200}>Residence Time (min)</StepTableHeaderItem>
            <StepTableHeaderItem width={200}>Vol (CV)</StepTableHeaderItem>
            <StepTableHeaderItem width={200}>Vol (mL)</StepTableHeaderItem>
            <StepTableHeaderItem width={200}>Time (min)</StepTableHeaderItem>
        </div>
     );
}
 
export default StepTableHeaders;