const ILDFSummary = ({unitOperation}) => {
    const {data} = unitOperation;
    return (  
        <div>
            <p className="data-paragraph"><span>Single Filter Area:</span> <span>{data.singleFilterArea} cm2</span></p>
            <p className="data-paragraph"><span>No Filters:</span><span>{data.noFilters} </span></p>
            <p className="data-paragraph"><span>Total Filter Area: </span><span>{data.totalFilterArea} cm2</span></p>
            <p className="data-paragraph"><span>Feed Flow Rate: </span><span>{data.feedFlowRate} mL/min</span></p>
            <p className="data-paragraph"><span>Buffer Flow Rate: </span><span>{data.bufferFlowRatemlmin} mL/min</span></p>
            <p className="data-paragraph"><span>Buffer Flow Rate: </span><span>{data.bufferFlowRateLh} L/h</span></p>
            <p className="data-paragraph"><span>Buffer Flow Rate: </span><span>{data.bufferFlowRateLday} L/day</span></p>
            <p className="data-paragraph"><span>Peremeate Flux: </span><span>{data.permeateFlux} L/m2/h</span></p>
        </div>
    );
}
 
export default ILDFSummary;