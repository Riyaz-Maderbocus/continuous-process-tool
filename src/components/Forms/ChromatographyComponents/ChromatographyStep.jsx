import { useSortable } from "@dnd-kit/react/sortable";

const ChromatographyStep = ({
    step,
    index,
    columnId
}) => {

    const sortable = useSortable({
        id: step.id,
        index: index,
        data: {
            columnId: columnId
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
            {step.step}
        </div>
    );
};

export default ChromatographyStep;