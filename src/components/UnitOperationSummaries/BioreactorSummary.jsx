const BioreactorSummary = ({unitOperation}) => {
    const {data} = unitOperation
    return ( 
        <div>
            {/* <h4>{data.vesselVolume} vol</h4> */}
            <p className="data-paragraph"><span>Vessel Volume:</span> <span>{data.vesselVolume} L</span></p>
            <p className="data-paragraph"><span>Flow rate:</span><span>{data.flowRatemlmin} ml/min</span></p>
            <p className="data-paragraph"><span>Flow rate: </span><span>{data.flowRatelh} l/h</span></p>
            <p className="data-paragraph"><span>Titre: </span><span>{data.titremgml} mg/ml</span></p>
            <p className="data-paragraph"><span>VVD: </span><span>{data.vvd} L</span></p>
            <p className="data-paragraph"><span>Titre: </span><span>{data.titremgmin} mg/min</span></p>

        </div>
     );
}
 
export default BioreactorSummary;