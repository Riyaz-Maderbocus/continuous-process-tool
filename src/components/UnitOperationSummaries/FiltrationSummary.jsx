const FiltrationSummary = ({unitOperation}) => {
    const {data} = unitOperation
    return (         
    <div>
            {/* <h4>{data.vesselVolume} vol</h4> */}
            <p className="data-paragraph"><span>Filter Type:</span> <span>{data.filterType} </span></p>
            <p className="data-paragraph"><span>Filter Area:</span><span>{data.flowRatemlmin} m2</span></p>
            <p className="data-paragraph"><span>Flow rate: </span><span>{data.flowRate} ml/min</span></p>
            <p className="data-paragraph"><span>Flux: </span><span>{data.flux} L/m2/h</span></p>
            <p className="data-paragraph"><span>Filter capacity: </span><span>{data.filterCapacity} L/m2</span></p>
            <p className="data-paragraph"><span>Lifetime: </span><span>{data.lifetime} h</span></p>

    </div> );
}
 
export default FiltrationSummary;