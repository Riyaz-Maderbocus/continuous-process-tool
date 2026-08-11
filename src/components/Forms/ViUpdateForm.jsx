import { useState } from "react";
import { useUnitOperations } from "../../context/UnitOperationContext";
import FormTextInput from "./FormComponents/FormTextInput";
import FormNumberInput from "./FormComponents/FormNumberInput";
import FormNumberInputSmall from "./FormComponents/FormNumberInputSmall";
import Button from "../Utilities/Button";
const ViUpdateForm = ({unitOperation, closeModal, totalTime}) => {
    const {updateUnitOperationData} = useUnitOperations();
    const {data, title} = unitOperation;
    const {                    
            feedAverageFlowRate,
            feedFlowRateSetpoint,
            feedVolume,
            feedTime,
            acidFlowRate,
            acidVolume,
            acidTime,
            holdTime,
            baseFlowRate,
            baseVolume,
            baseTime,
            tankFlowRate,
            tankTime,
            tankAverageFlowRate,
            totalTankVolume,
            totalCycleTime,
            bufferAcidVolPerLoop,
            bufferAcidVolPerDay,
            bufferAcidTotalVol,
            bufferBaseVolPerLoop,
            bufferBaseVolPerDay,
            bufferBaseTotalVol,
            inputConc,
            predictedYield,
            outputConc
        } = data
    


    const [viFormData, setViFormData] = useState({
            title,                    
            feedAverageFlowRate,
            feedFlowRateSetpoint,
            feedVolume,
            feedTime,
            acidFlowRate,
            acidVolume,
            acidTime,
            holdTime,
            baseFlowRate,
            baseVolume,
            baseTime,
            tankFlowRate,
            tankTime,
            tankAverageFlowRate,
            totalTankVolume,
            totalCycleTime,
            bufferAcidVolPerLoop,
            bufferAcidVolPerDay,
            bufferAcidTotalVol,
            bufferBaseVolPerLoop,
            bufferBaseVolPerDay,
            bufferBaseTotalVol,
            inputConc,
            predictedYield,
            outputConc
        })
    


    // Single form change like title
    const handleFormChange = (e) => {
    setViFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
    }))
    }

    // Handle all UI changes
    const handleAllChanges = (e) => {

        // Start using NEXT
        // make next object which is a copy of VI
        const next = {
            ...viFormData,
            [e.target.name]: Number(e.target.value)
        };


        setViFormData(calculateViProcess(next));
        // End using NEXT


    }

    // Using a calculate function
    const calculateViProcess = (data)=> {
        const next = {...data}
        // Start calculating things from here

        // Calculate tank volume
        next.totalTankVolume = next.feedVolume + next.acidVolume + next.baseVolume;

        // Calculate times

        // feed time
        next.feedTime = next.feedVolume / next.feedFlowRateSetpoint;

        // acid time
        next.acidTime = next.acidVolume / next.acidFlowRate;

        // base time
        next.baseTime = next.baseVolume /next.baseFlowRate;

        next.tankTime = next.totalTankVolume / next.tankFlowRate;

        // CALCULATE TOTAL CYCLE TIME
        next.totalCycleTime =
            next.feedTime +
            next.acidTime +
            next.holdTime +
            next.baseTime +
            next.tankTime;

        //Calculate averages
        next.feedAverageFlowRate =
            next.feedVolume /
            next.totalCycleTime;

        next.tankAverageFlowRate =
            next.totalTankVolume /
            next.totalCycleTime;

        // Mass balance bits

        next.outputConc = ((next.inputConc * next.feedVolume)/100 * next.predictedYield)/next.totalTankVolume;
        
        // Round to 3 dp
        Object.keys(next).forEach(key => {
            if (typeof next[key] === "number") {
                next[key] = Number(next[key].toFixed(3));
            }
        });
        return next
    }

    const handleSave = (e) => {
        e.preventDefault()
        const {title, ...data} = viFormData;
        updateUnitOperationData(
            unitOperation.id,
            title,
            data
        )
        closeModal()
    }
    return ( 
        <form className="form-container">
            <FormTextInput label="Title" name="title" value={viFormData.title}
            onChange={handleFormChange}
            />

            {/* Total bits */}
            <p className="form-separator">Total Values</p>
            <div className="form-input-cols">
                <div className="form-input-column-center">
                    <p className="form-input-column-text-label">Full tank volume mL</p>
                    <p className="form-input-column-text-output">{viFormData.totalTankVolume}</p>
                </div>
                
                <div className="form-input-column-center">
                    <p className="form-input-column-text-label">Cycle time min</p>
                    <p className="form-input-column-text-output">{viFormData.totalCycleTime}</p>
                </div>

            </div>

            {/* Feed bits */}
            <p className="form-separator">Feed Details</p>
            <div className="form-input-cols">

                <div className="form-input-column-center">
                    <p className="form-input-column-text-label">Average flow rate mL/min</p>
                    <p className="form-input-column-text-output">{viFormData.feedAverageFlowRate}</p>
                </div>

                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Flow rate setpoint mL/min" name="feedFlowRateSetpoint"
                    value={viFormData.feedFlowRateSetpoint}
                    onChange={handleAllChanges}
                    />
                </div>

                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Volume mL" name="feedVolume"
                    value={viFormData.feedVolume}
                    onChange={handleAllChanges}
                    />
                </div>
                
                <div className="form-input-column-center">
                    <p className="form-input-column-text-label">Time min</p>
                    <p className="form-input-column-text-output">{viFormData.feedTime}</p>
                </div>

                
            </div>

            {/* Acid bits */}
            <p className="form-separator">Acid addition</p>
            <div className="form-input-cols">
                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Flow Rate mL/min" name="acidFlowRate"
                    value={viFormData.acidFlowRate}
                    onChange={handleAllChanges}
                    />
                </div>

                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Volume mL" name="acidVolume"
                    value={viFormData.acidVolume}
                    onChange={handleAllChanges}
                    />
                </div>

                <div className="form-input-column-center">
                    <p className="form-input-column-text-label">Time min</p>
                    <p className="form-input-column-text-output">{viFormData.acidTime}</p>
                </div>
            </div>

            {/* Hold time bit */}
            <p className="form-separator">Hold Time</p>
            <div className="form-input-cols">
                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Time min" name="holdTime"
                    value={viFormData.holdTime}
                    onChange={handleAllChanges}
                    />
                </div>
                <div className="form-input-column-center"></div>
                <div className="form-input-column-center"></div>
            </div>

            {/* Base addition */}
            <p className="form-separator">Base Addition</p>
            <div className="form-input-cols">
                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Flow Rate mL/min" name="baseFlowRate"
                    value={viFormData.baseFlowRate}
                    onChange={handleAllChanges}
                    />
                </div>

                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Volume mL" name="baseVolume"
                    value={viFormData.baseVolume}
                    onChange={handleAllChanges}
                    />
                </div>

                <div className="form-input-column-center">
                    <p className="form-input-column-text-label">Time min</p>
                    <p className="form-input-column-text-output">{viFormData.baseTime}</p>
                </div>

            </div>

            {/* Tank empty */}
            <p className="form-separator">Tank Empty</p>

            <div className="form-input-cols">
                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Flow Rate mL/min" name="tankFlowRate"
                    value={viFormData.tankFlowRate}
                    onChange={handleAllChanges}
                    />
                </div>


                <div className="form-input-column-center">
                    <p className="form-input-column-text-label">Time min</p>
                    <p className="form-input-column-text-output">{viFormData.tankTime}</p>
                </div>

                <div className="form-input-column-center">
                    <p className="form-input-column-text-label">Average Flow Rate mL/min</p>
                    <p className="form-input-column-text-output">{viFormData.tankAverageFlowRate}</p>
                </div>

            </div>

            {/* buffer volumes */}

            <p className="form-separator">Buffer volumes</p>
            <table className="vi-buffer-table">
                <thead>
                    <tr>
                        <th>Buffer</th>
                        <th>Vol. per loop /mL</th>
                        <th>Vol. per day /L</th>
                        <th>Total vol. /L</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1 M Acetic acid</td>
                        <td>{viFormData.bufferAcidVolPerLoop}</td>
                        <td>{viFormData.bufferAcidVolPerDay}</td>
                        <td>{viFormData.bufferAcidTotalVol}</td>    
                    </tr>
                    <tr>
                        <td>1 M Tris Base</td>
                        <td>{viFormData.bufferBaseVolPerLoop}</td>
                        <td>{viFormData.bufferBaseVolPerDay}</td>
                        <td>{viFormData.bufferBaseTotalVol}</td>    
                    </tr>
                </tbody>

            </table>
            {/* mass balance */}
            <p className="form-separator">Mass Balance</p>
             <div className="form-input-cols">
                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Input Concentration mg/mL" name="inputConc"
                    value={viFormData.inputConc}
                    onChange={handleAllChanges}
                    />
                </div>
                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Predicted Yield %" name="predictedYield"
                    value={viFormData.predictedYield}
                    onChange={handleAllChanges}
                    />
                </div>
                <div className="form-input-column-center">
                    <p className="form-input-column-text-label">Output Concentration mg/mL</p>
                    <p className="form-input-column-text-output">{viFormData.outputConc}</p>
                </div>
            </div>

            <p className="form-separator"></p>
            <Button  classes="btn btn-primary full-width-btn" 
            clickFunction={handleSave}> 💾 Save Updated Data</Button>

        </form>
     );
}
 
export default ViUpdateForm;