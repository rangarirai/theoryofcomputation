import React from "react";

export default function LabelInput({
  context,
  usedLabelsProp,
  displaylabels = true,
}) {
  return (
    <div className="field has-addons is-horizontal">
      {displaylabels && (
        <div className="field-label is-normal">
          <label className="label">
            {context.SATModalProps?.type === "state"
              ? "State Label"
              : "Transition Input"}
          </label>
        </div>
      )}

      <div className="field-body">
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder={
              context.SATModalProps?.type === "state"
                ? "Enter Node (state) Label"
                : "Enter Transition Input Value"
            }
            value={context.label}
            onChange={(e) => {
              context.setLabel(e.target.value);
            }}
          />
        </div>
        <div className="control">
          <button
            className="button is-success"
            onClick={() => {
              if (context.SATModalProps?.type === "state") {
                let usedLabels = usedLabelsProp.filter(
                  (usedLabel) =>
                    usedLabel.toLowerCase() ===
                    context.label.toLowerCase().trim()
                );
                if (usedLabels.length > 0) {
                  alert("This Label Was Already Used");
                  return;
                }
                if (
                  context.inputValues.includes(
                    context.label.toLowerCase().trim()
                  )
                ) {
                  alert("states labels can not be a or b or ^");
                  return;
                }
                context.setUpdateStateLabel(true);
              }
              if (context.SATModalProps?.type === "transition") {
                let includes = false;
                let tempInputs = context.label.toLowerCase().trim().split(",");
                let tempInputsTrimmed = tempInputs.map((input) => input.trim());
                tempInputsTrimmed.forEach((element) => {
                  if (context.inputValues.includes(element)) {
                    includes = true;
                  }
                });
                if (!includes) {
                  alert("transition labels can only be a or b or ^");
                  return;
                }
                context.setUpdateTransitionLabel(true);
              }

              context.setSATModalValue(false);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
