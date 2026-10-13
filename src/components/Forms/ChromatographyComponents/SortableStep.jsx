import { useSortable } from "@dnd-kit/react/sortable";
import ChromatographyStepNumberInput from "./ChromatographyFormComponents/ChromatographyStepNumberInput";
import ChromatographyStepTextInput from "./ChromatographyFormComponents/ChromatographyStepTextInput";

const SortableStep = ({ 
    step, 
    index, 
    updateStep, 
    columnId, 
    removeStep,
    baseColVol }) => {
    const {
        ref,
        isDragSource,
        handleRef
    } = useSortable({
        id: step.id,
        index
    });

    const doSomething = ()=> {
        console.log("something done")
    }

    // Old handle change (this works)
    // const handleChange = (field, value) => {
    //     updateStep(columnId, step.id, field, value);
    // };

    // NEW HANDLE CHANGE FOR CALCS 13/10/26
    const handleChange = (field, rawValue) => {

    // Text fields: update directly, without doing calculations
    if (field === "step" || field === "buffer") {
        updateStep(columnId, step.id, field, rawValue);
        return;
    }
    
    const value = rawValue === "" ? "" : Number(rawValue);

    // Start with the field the user edited
    const updates = {
        [field]: value
    };

    const baseVol = Number(baseColVol);

    // Work out the values after the user's change
    let flowRate = Number(step.flowRate);
    let volCV = Number(step.volCV);
    let volML = Number(step.volML);

    if (field === "flowRate") {
        flowRate = value === "" ? NaN : value;
    }

    if (field === "volCV") {
        volCV = value === "" ? NaN : value;

        if (Number.isFinite(volCV) && Number.isFinite(baseVol) && baseVol > 0) {
            volML = baseVol * volCV;
            updates.volML = Number(volML.toFixed(3));
        } else {
            volML = NaN;
            updates.volML = "";
        }
    }

    if (field === "volML") {
        volML = value === "" ? NaN : value;

        if (Number.isFinite(volML) && Number.isFinite(baseVol) && baseVol > 0) {
            volCV = volML / baseVol;
            updates.volCV = Number(volCV.toFixed(3));
        } else {
            volCV = NaN;
            updates.volCV = "";
        }
    }

    // Residence time = column volume / flow rate
    if (field === "flowRate") {
        updates.residenceTime =
            Number.isFinite(flowRate) && flowRate > 0 &&
            Number.isFinite(baseVol) && baseVol > 0
                ? Number((baseVol / flowRate).toFixed(3))
                : "";
    }

    // Processing time = volume / flow rate
    if (["flowRate", "volCV", "volML"].includes(field)) {
        updates.timeMin =
            Number.isFinite(volML) && volML >= 0 &&
            Number.isFinite(flowRate) && flowRate > 0
                ? Number((volML / flowRate).toFixed(3))
                : "";
    }

    // Update every affected field in the main React state
    Object.entries(updates).forEach(([updatedField, updatedValue]) => {
        updateStep(columnId, step.id, updatedField, updatedValue);
    });
};
    return (
        <div
            ref={ref}
            className={`chromatography-step ${
                isDragSource ? "step-dragging" : ""
            }`}
        >
            {/* Button width set to 1% by css */}
            <button
                type="button"
                ref={handleRef}
                className="step-drag-handle"
                aria-label={`Reorder ${step.step}`}
            >
                ⠿
            </button>



            {/* Input fields for all parts of the step*/}

            {/* Step name 300px or 20%*/}
            <ChromatographyStepTextInput name={step.id} value={step.step} 
            onChange={(value)=> handleChange("step", value)} 
            width={19.8}/>

            {/* Buffer name 500px or 30%*/}
            <ChromatographyStepTextInput name={step.id} value={step.buffer} 
            onChange={(value)=> handleChange("buffer", value)} 
            width={29.9}/>

            {/* Flow rate mL/min 200px or 10%*/}
            <ChromatographyStepNumberInput name={step.id} value={step.flowRate} 
            onChange={(value)=> handleChange("flowRate", value)} 
            width={9.9}/>
            
            {/* Residence time min 200px or 10% disabled*/}
            <ChromatographyStepNumberInput name={step.id} value={step.residenceTime} 
            onChange={(value)=> handleChange("residenceTime", value)} 
            width={9.9}
            disabled={true}/>
            
            {/* Vol CV 200px or 10% */}
            <ChromatographyStepNumberInput name={step.volCV} value={step.volCV} 
            onChange={(value)=> handleChange("volCV", value)} 
            width={9.9}/>
            
            {/* Vol ml 200px or 10% disabled*/}
            <ChromatographyStepNumberInput name={step.volML} value={step.volML} 
            onChange={(value)=> handleChange("volML", value)}  
            width={9.9}
            disabled={true}/>
            
            {/* Time Min 200px or 7%*/}
            <ChromatographyStepNumberInput name={step.timeMin} value={step.timeMin} 
            onChange={(value)=> handleChange("timeMin", value)} 
            width={6.9}/>

            {/* Remove step */}
            <button
                type="button"
                onClick={() => removeStep(columnId, step.id)}
                aria-label={`Remove ${step.step}`}
            >
                ×
            </button>
        </div>
    );
};
 
export default SortableStep;