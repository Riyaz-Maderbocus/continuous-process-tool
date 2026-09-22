import { useSortable } from "@dnd-kit/react/sortable";


import FormTextInput from "../FormComponents/FormTextInput";
import FormNumberInputSmall from "../FormComponents/FormNumberInputSmall";

const ChromatographyStep = ({
    step,
    index,
    columnId
}) => {

    const sortable = useSortable({
        id: step.id,
        index: index,
        data: {
            columnId
        }
    });

    return (
        <div
            ref={sortable.ref}
            className={
                sortable.isDragSource
                    ? "chromatography-step card-lift"
                    : "chromatography-step"
            }
        >

            {/* Drag handle / header */}
            <div className="chromatography-step-header">
                <span className="drag-handle">
                    ⋮⋮
                </span>

                
            </div>

            {/* Step inputs */}
            <div className="chromatography-step-form">

                <FormTextInput
                    label="Step name"
                    name="step"
                    value={step.step}
                />
                
                <FormTextInput
                    label="Buffer"
                    name="buffer"
                    value={step.buffer}
                />

                <FormNumberInputSmall
                    label="Flow rate"
                    name="flowRate"
                    value={step.flowRate}
                />

                <FormNumberInputSmall
                    label="Residence time"
                    name="residenceTime"
                    value={step.residenceTime}
                />

                <FormNumberInputSmall
                    label="Volume (CV)"
                    name="volCV"
                    value={step.volCV}
                />

                <FormNumberInputSmall
                    label="Volume (mL)"
                    name="volML"
                    value={step.volML}
                />

                <FormNumberInputSmall
                    label="Time (min)"
                    name="timeMin"
                    value={step.timeMin}
                />

            </div>

        </div>
    );
};

export default ChromatographyStep;