
import ChromatographyStep from "./ChromatographyStep";

const ChromatographyColumn = ({
    column,
    onStepsChange
}) => {

    return (
        <div className="chromatography-column">

            <div className="chromatography-column-header">
                <h3>{column.name}</h3>
            </div>

            <div className="chromatography-column-steps">

                {/* {column.steps.map((step, index) => (
                    <ChromatographyStep
                        key={step.id}
                        step={step}
                        index={index}
                        columnId={column.id}
                    />
                ))} */}

            {column.steps.map((step, index) => (
                <ChromatographyStep
                    key={step.id}
                    step={step}
                    index={index}
                    columnId={column.id}
                    onStepChange={onStepsChange}
                />
            ))}

            </div>

        </div>
    );
};

export default ChromatographyColumn;