import { useSortable } from "@dnd-kit/react/sortable";
import ChromatographyStepNumberInput from "./ChromatographyFormComponents/ChromatographyStepNumberInput";
import ChromatographyStepTextInput from "./ChromatographyFormComponents/ChromatographyStepTextInput";

const SortableStep = ({ step, index }) => {
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
            <ChromatographyStepTextInput name={step.id} value={step.step} onChange={doSomething} width={19.8}/>

            {/* Buffer name 500px or 30%*/}
            <ChromatographyStepTextInput name={step.id} value={step.buffer} onChange={doSomething} width={29.9}/>

            {/* Flow rate mL/min 200px or 10%*/}
            <ChromatographyStepNumberInput name={step.id} value={step.flowRate} onChange={doSomething} width={9.9}/>
            
            {/* Residence time min 200px or 10% */}
            <ChromatographyStepNumberInput name={step.id} value={step.residenceTime} onChange={doSomething} width={9.9}/>
            
            {/* Vol CV 200px or 10% */}
            <ChromatographyStepNumberInput name={step.volCV} value={step.residenceTime} onChange={doSomething} width={9.9}/>
            
            {/* Vol ml 200px or 10% */}
            <ChromatographyStepNumberInput name={step.volML} value={step.residenceTime} onChange={doSomething} width={9.9}/>
            
            {/* Time Min 200px or 7%*/}
            <ChromatographyStepNumberInput name={step.volML} value={step.timeMin} onChange={doSomething} width={6.9}/>
        </div>
    );
};
 
export default SortableStep;