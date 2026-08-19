import { useState } from "react";
import { useUnitOperations } from "../../context/UnitOperationContext";
import FormTextInput from "./FormComponents/FormTextInput";
import FormNumberInput from "./FormComponents/FormNumberInput";
import FormNumberInputSmall from "./FormComponents/FormNumberInputSmall";
import FormSelectInput from "./FormComponents/FormSelectInput";
import Button from "../Utilities/Button";
const FTChromUpdateForm = ({unitOperation, closeModal, totalTime}) => {
    const {updateUnitOperationData} = useUnitOperations();
    const {data, title} = unitOperation;
    const [ftcFormData, setFtcFormData] = useState({
        title,
        ...data,
        // calculationMode: "columnVolume"
    });
    const [colSizeCalculationMode, setColSizeCalculationMode] = useState("columnVolume")

    // Single form change like title
    const handleFormChange = (e) => {
        // old code
    // setFtcFormData((prev) => ({
    //     ...prev,
    //     [e.target.name]: e.target.value
    // })) 
    const next = {
        ...ftcFormData,
        [e.target.name]: e.target.value
    };

    setFtcFormData(calculateFTChromProcess(next));
    }


    // Handle nested values
    const updateNestedValue = (object, path, value) => {
    const keys = path.split(".");

    const result = { ...object };
    let current = result;

    for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;

    return result;
    };

    // Handle all UI changes
    const handleAllChanges = (e) => {

        // Start using NEXT
        // make next object which is a copy of ftc
        const next = updateNestedValue(
            ftcFormData,
            e.target.name,
            Number(e.target.value)
        );

        setFtcFormData(
            calculateFTChromProcess(next, colSizeCalculationMode)
        );
        // setFtcFormData(calculateFTChromProcess(next));
        // End using NEXT
    }

    // helper function to round numbers
    const roundNumbers = (value, decimals = 3) => {
    if (typeof value === "number") {
        return Number(value.toFixed(decimals));
    }

    if (Array.isArray(value)) {
        return value.map(item => roundNumbers(item, decimals));
    }

    if (value !== null && typeof value === "object") {
        return Object.fromEntries(
            Object.entries(value).map(([key, val]) => [
                key,
                roundNumbers(val, decimals)
            ])
        );
    }

    return value;
    };
    
    // mode select function
    const handleCalculationModeChange = (e) => {

        const next = {
            ...ftcFormData,
            calculationMode: e.target.value
        };

        setFtcFormData(calculateFTChromProcess(next));
    };

    const calculateFTChromProcess = (data, mode) => {
        const next = {
            ...data,
            columnSizeRecommendation: {
                ...data.columnSizeRecommendation
            }
        };

        const rec = next.columnSizeRecommendation;
    
        // Start calculating things here

          // --------------------------------
        // Calculate the selected variable
        // --------------------------------

        if (mode === "columnVolume") {

            // Column Volume = Flow Rate × Residence Time
            rec.requiredColumnVol =
                rec.inputFlowRate * rec.residenceTime;

        } else if (mode === "flowRate") {

            // Flow Rate = Column Volume / Residence Time
            rec.inputFlowRate =
                rec.requiredColumnVol / rec.residenceTime;

        } else if (mode === "residenceTime") {

            // Residence Time = Column Volume / Flow Rate
            rec.residenceTime =
                rec.requiredColumnVol / rec.inputFlowRate;
        }

        // --------------------------------
        // Other calculations
        // --------------------------------

        // Load rate
        rec.loadRate =
            rec.inputFlowRate *
            rec.inputConc;


        // Maximum load volume
        rec.maxLoadVol =
            rec.maxLoadChallenge *
            rec.requiredColumnVol /
            rec.inputConc;


        // Maximum loop time for one column
        rec.maxLoopTimeOneColumn =
            rec.maxLoadVol /
            rec.inputFlowRate;


        // Maximum cycle time for all columns
        rec.maxCycleTimeAllColumns =
            rec.maxLoopTimeOneColumn *
            rec.noColumns;


        // Old set of next calculations
        // col rec load rate
        // next.columnSizeRecommendation.loadRate = next.columnSizeRecommendation.inputFlowRate * next.columnSizeRecommendation.inputConc;

        // residence time
        // next.columnSizeRecommendation.residenceTime = next.columnSizeRecommendation.requiredColumnVol / next.columnSizeRecommendation.inputFlowRate;

        // max load volume
        // next.columnSizeRecommendation.maxLoadVol = next.columnSizeRecommendation.maxLoadChallenge * next.columnSizeRecommendation.requiredColumnVol / next.columnSizeRecommendation.inputConc;

        // max loop time one column
        // next.columnSizeRecommendation.maxLoopTimeOneColumn = next.columnSizeRecommendation.maxLoadVol / next.columnSizeRecommendation.inputFlowRate;

        // max cycle time all cols
        // next.columnSizeRecommendation.maxCycleTimeAllColumns = next.columnSizeRecommendation.maxLoopTimeOneColumn * next.columnSizeRecommendation.noColumns;
        return roundNumbers(next, 3)
    }

    const handleSave = (e) => {
        e.preventDefault()
        const {title, ...data} = ftcFormData;
        updateUnitOperationData(
            unitOperation.id,
            title,
            data
        )
        closeModal()
    }


    return (
        <form className="form-container">

            <FormTextInput label="Title" name="title" value={ftcFormData.title}
            onChange={handleFormChange}
            />

            {/* Column size recommendations */}
            <p className="form-separator">Column Size Recommendations</p>
            {/* <div className="form-input-cols">

                
            </div> */}

            <div className="form-input-cols">

                {/* Choose mode */}
                <div className="form-input-column-center">
                    <FormSelectInput label="Choose calculation mode" name="calculationMode"
                    value={ftcFormData.colSizeCalculationMode}
                    // onChange={handleCalculationModeChange}
                    onChange={(e) => {
                        const newMode = e.target.value;

                        setColSizeCalculationMode(newMode);

                        setFtcFormData(
                            calculateFTChromProcess(
                                ftcFormData,
                                newMode
                            )
                        );
                    }}
                    options={[
                        {value: "columnVolume", label: "Column Volume"},
                        {value: "flowRate", label: "Flow Rate"},
                        {value: "residenceTime", label: "Residence Time"},
                        ]}/>
                </div>

                {/* input flow rate */}
                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Input Flow Rate mL/min" name="columnSizeRecommendation.inputFlowRate"
                    value={ftcFormData.columnSizeRecommendation.inputFlowRate}
                    onChange={handleAllChanges}
                    disabled={colSizeCalculationMode === "flowRate"}
                    />
                </div>

                {/* input concentration */}
                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Input Concentration mg/mL" name="columnSizeRecommendation.inputConc"
                    value={ftcFormData.columnSizeRecommendation.inputConc}
                    onChange={handleAllChanges}
                    />
                </div>

                {/* load rate */}
                <div className="form-input-column-center">
                    <p className="form-input-column-text-label">Load rate mg/min</p>
                    <p className="form-input-column-text-output">{ftcFormData.columnSizeRecommendation.loadRate}</p>
                </div>
                
            </div>

            <div className="form-input-cols">
                {/* Number of columns */}
                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Number of columns" name="columnSizeRecommendation.noColumns"
                    value={ftcFormData.columnSizeRecommendation.noColumns}
                    onChange={handleAllChanges}
                    />
                </div>
                {/* Residence time */}
                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Residence Time min" name="columnSizeRecommendation.residenceTime"
                    value={ftcFormData.columnSizeRecommendation.residenceTime}
                    onChange={handleAllChanges}
                    disabled={colSizeCalculationMode === "residenceTime"}
                    />
                </div>

                {/* Max Load Challenge */}
                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Max Load Challenge mg/mL" name="columnSizeRecommendation.maxLoadChallenge"
                    value={ftcFormData.columnSizeRecommendation.maxLoadChallenge}
                    onChange={handleAllChanges}
                    />
                </div>

                {/* Required Column vol */}
                <div className="form-input-column-center">
                    <FormNumberInputSmall label="Required Col Volume mL" name="columnSizeRecommendation.requiredColumnVol"
                    value={ftcFormData.columnSizeRecommendation.requiredColumnVol}
                    onChange={handleAllChanges}
                    disabled={colSizeCalculationMode === "columnVolume"}
                    />
                </div>
            </div>

            {/* Column recommendations final calcs */}
            <div className="form-input-cols">
                {/* max load vol */}
                <div className="form-input-column-center">
                    <p className="form-input-column-text-label">Max Load Volume</p>
                    <p className="form-input-column-text-output">{ftcFormData.columnSizeRecommendation.maxLoadVol}</p>
                </div>
                {/* max loop time 1 col */}
                <div className="form-input-column-center">
                    <p className="form-input-column-text-label">Max loop time (1 col)</p>
                    <p className="form-input-column-text-output">{ftcFormData.columnSizeRecommendation.maxLoopTimeOneColumn}</p>
                </div>
                {/* max cycle time all columns */}
                <div className="form-input-column-center">
                    <p className="form-input-column-text-label">Max cycle time (all cols)</p>
                    <p className="form-input-column-text-output">{ftcFormData.columnSizeRecommendation.maxCycleTimeAllColumns}</p>
                </div>
            </div>


            
            <p className="form-separator"></p>
            <Button  classes="btn btn-primary full-width-btn" 
            clickFunction={handleSave}> 💾 Save Updated Data</Button>
        </form>
     );
}
 
export default FTChromUpdateForm;