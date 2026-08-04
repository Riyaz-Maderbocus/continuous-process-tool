const ViSummary = ({unitOperation}) => {
    const {data} = unitOperation;
    return ( 
        <div>
            <p className="data-paragraph"><span>Total Tank Volume:</span> <span>{data.totalTankVolume} mL</span></p>
            <p className="data-paragraph"><span>Total Cycle Time:</span><span>{data.totalCycleTime} min</span></p>
        </div>
     );
}
 
export default ViSummary;