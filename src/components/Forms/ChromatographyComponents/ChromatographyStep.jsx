import { useSortable } from "@dnd-kit/react/sortable";


import FormTextInput from "../FormComponents/FormTextInput";
import FormNumberInputSmall from "../FormComponents/FormNumberInputSmall";

const ChromatographyStep = ({
    step,
    index,
    columnId,
    onStepChange
}) => {

    const sortable = useSortable({
        id: step.id,
        index: index,
        data: {
            columnId
        }
    });

    const handleChange = (e) => {

    const { name, value } = e.target;

    const numericFields = [
        "flowRate",
        "residenceTime",
        "volCV",
        "volML",
        "timeMin"
    ];

    const newValue = numericFields.includes(name)
        ? Number(value)
        : value;

    onStepChange(
        columnId,
        step.id,
        name,
        newValue
    );
};

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
                    onChange={handleChange}
                />
                
                <FormTextInput
                    label="Buffer"
                    name="buffer"
                    value={step.buffer}
                    onChange={handleChange}
                />

                <FormNumberInputSmall
                    label="Flow rate"
                    name="flowRate"
                    value={step.flowRate}
                    onChange={handleChange}
                />

                <FormNumberInputSmall
                    label="Residence time"
                    name="residenceTime"
                    value={step.residenceTime}
                    onChange={handleChange}
                />

                <FormNumberInputSmall
                    label="Volume (CV)"
                    name="volCV"
                    value={step.volCV}
                    onChange={handleChange}
                />

                <FormNumberInputSmall
                    label="Volume (mL)"
                    name="volML"
                    value={step.volML}
                    onChange={handleChange}
                />

                <FormNumberInputSmall
                    label="Time (min)"
                    name="timeMin"
                    value={step.timeMin}
                    onChange={handleChange}
                />

            </div>

        </div>
    );
};

export default ChromatographyStep;