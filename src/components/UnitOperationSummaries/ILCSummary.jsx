const ILCSummary = ({unitOperation}) => {
    const {data} = unitOperation
    return (         
    <div>
            {/* <h4>{data.vesselVolume} vol</h4> */}
            <p className="data-paragraph"><span>Single Filter Area:</span> <span>{data.singleFilterArea} cm2</span></p>
            <p className="data-paragraph"><span>No Filters:</span><span>{data.noFilters} </span></p>
            <p className="data-paragraph"><span>Total Filter Area: </span><span>{data.totalFilterArea} cm2</span></p>
            <p className="data-paragraph"><span>Feed Flow Rate: </span><span>{data.feedFlowRate} mL/min</span></p>
            <p className="data-paragraph"><span>Retentate Flow Rate: </span><span>{data.retentateFlowRate} mL/min</span></p>
            <p className="data-paragraph"><span>Peremeate Flow Rate: </span><span>{data.permeateFlowRatemlmin} ml/min</span></p>
            <p className="data-paragraph"><span>Peremeate Flow Rate: </span><span>{data.permeateFlowRateLh} L/h</span></p>
            <p className="data-paragraph"><span>Premeate Flux: </span><span>{data.permeateFlux} L/m2/h</span></p>

    </div> );
}
 
export default ILCSummary;