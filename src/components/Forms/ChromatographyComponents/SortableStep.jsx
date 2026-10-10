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
            <button
                type="button"
                ref={handleRef}
                className="step-drag-handle"
                aria-label={`Reorder ${step.step}`}
            >
                ⠿
            </button>



            {/* Input fields for all parts of the step*/}

            {/* Step name 300px */}
            <ChromatographyStepTextInput name={step.id} value={step.step} onChange={doSomething} width={288}/>

            {/* Buffer name 500px */}
            <ChromatographyStepTextInput name={step.id} value={step.buffer} onChange={doSomething} width={485}/>

            {/* Flow rate mL/min 200px */}
            <ChromatographyStepNumberInput name={step.id} value={step.flowRate} onChange={doSomething} width={192}/>
            
            {/* Residence time min 200px */}
            <ChromatographyStepNumberInput name={step.id} value={step.residenceTime} onChange={doSomething} width={192}/>
            
            {/* Vol CV 200px */}
            <ChromatographyStepNumberInput name={step.volCV} value={step.residenceTime} onChange={doSomething} width={192}/>
            
            {/* Vol ml 200px */}
            <ChromatographyStepNumberInput name={step.volML} value={step.residenceTime} onChange={doSomething} width={192}/>
            
            {/* Time Min 200px */}
            <ChromatographyStepNumberInput name={step.volML} value={step.timeMin} onChange={doSomething} width={192}/>
        </div>
    );
};
 
export default SortableStep;