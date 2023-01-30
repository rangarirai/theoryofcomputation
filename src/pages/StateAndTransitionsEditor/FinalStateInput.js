import React from 'react'

export default function FinalStateInput({context}) {
  return (
    <div className="field has-addons is-horizontal">
      <div className="field-body">
        <div className="control">
          <button
            className="button is-success"
            onClick={() => {
              context.setUpdateFinalState(true);
              context.setSATModalValue(false);
            }}
          >
            Set Final State or Remove Node From Final State
          </button>
        </div>
      </div>
    </div>
  )
}
