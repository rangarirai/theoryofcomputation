import React from "react";

export default function InitialStateInput({ context }) {
  return (
    <div className="field has-addons is-horizontal">
      <div className="field-body">
        <div className="control">
          <button
            className="button is-success"
            onClick={() => {
              context.setUpdateInitialState(true);
              context.setSATModalValue(false);
            }}
          >
            Set Initial State
          </button>
        </div>
      </div>
    </div>
  );
}
