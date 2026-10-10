import StepTableHeaderItem from "./StepTableHeaderItem";

const StepTableHeaders = () => {
    return ( 
        <div className="step-table-header-container">
            <StepTableHeaderItem width={1}></StepTableHeaderItem>
            <StepTableHeaderItem width={20}>Step</StepTableHeaderItem>
            <StepTableHeaderItem width={30}>Buffer</StepTableHeaderItem>
            <StepTableHeaderItem width={10}>Flow Rate (mL/min)</StepTableHeaderItem>
            <StepTableHeaderItem width={10}>Residence Time (min)</StepTableHeaderItem>
            <StepTableHeaderItem width={10}>Vol (CV)</StepTableHeaderItem>
            <StepTableHeaderItem width={10}>Vol (mL)</StepTableHeaderItem>
            <StepTableHeaderItem width={7}>Time (min)</StepTableHeaderItem>
        </div>
     );
}
 
export default StepTableHeaders;