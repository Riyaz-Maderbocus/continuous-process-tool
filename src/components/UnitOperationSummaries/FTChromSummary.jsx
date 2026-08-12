const FTChromSummary = ({unitOperation}) => {
    const {data} = unitOperation;
    return ( 
        <div>
            
            <p className="data-paragraph"><span>Input Flow Rate:</span> <span>{data.columnSizeRecommendation.inputFlowRate} mL/min</span></p>
            <p className="data-paragraph"><span>Required Column Volume:</span> <span>{data.columnSizeRecommendation.requiredColumnVol} mL</span></p>
            <p className="data-paragraph"><span>Max Load Volume:</span> <span>{data.columnSizeRecommendation.maxLoadVol} mL</span></p>
            
        </div>
     );
}
 
export default FTChromSummary;