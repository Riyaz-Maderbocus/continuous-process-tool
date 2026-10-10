import { useSortable } from "@dnd-kit/react/sortable";
import ChromatographyStepNumberInput from "./ChromatographyFormComponents/ChromatographyStepNumberInput";
import ChromatographyStepTextInput from "./ChromatographyFormComponents/ChromatographyStepTextInput";

const SortableStep = ({ step, index, updateStep, columnId, removeStep }) => {
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

    const handleChange = (field, value) => {
        updateStep(columnId, step.id, field, value);
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
            
            {/* Residence time min 200px or 10% */}
            <ChromatographyStepNumberInput name={step.id} value={step.residenceTime} 
            onChange={(value)=> handleChange("residenceTime", value)} 
            width={9.9}/>
            
            {/* Vol CV 200px or 10% */}
            <ChromatographyStepNumberInput name={step.volCV} value={step.volCV} 
            onChange={(value)=> handleChange("volCV", value)} 
            width={9.9}/>
            
            {/* Vol ml 200px or 10% */}
            <ChromatographyStepNumberInput name={step.volML} value={step.volML} 
            onChange={(value)=> handleChange("volML", value)}  
            width={9.9}/>
            
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