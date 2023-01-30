import React, { Children, useContext } from "react";
import { myContext } from "../App";
import Elements from "./Elements";

export default function TransitionTable({
  statesClone,
  usedLabels,
  setHandleAddXYPoints,
  children,
}) {
  const context = useContext(myContext);
  const result = Children.toArray(children);
  return (
    <section className="section">
      <div className="is-flex is-align-items-center">
        <span className="">TransitionTable</span>
        {result[0]}
        {result[2]}
        {result[3]}
      </div>

      <table className="table is-striped">
        <thead>
          <tr>
            <th>No.</th>
            <th>Node</th>
            {context.inputValues.map((inputValue) => (
              <th key={inputValue + "input"}>{inputValue}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(statesClone).map((key, index) => {
            const { label, inputValues, top, left, initialState, finalState } =
              statesClone[key];

            return (
              <tr key={key} id={key}>
                <td>{index + 1}</td>
                <td>
                  {initialState ? <span> &rarr;</span> : ""}
                  {finalState ? "*" : ""}
                  {label}
                </td>
                <Elements
                  context={context}
                  inputValues={inputValues}
                  statesClone={statesClone}
                />
                <td>
                  {result[1] &&
                    React.cloneElement(result[1], {
                      usedLabels,
                      id: key,
                      top,
                      left,
                      statesClone,
                      setHandleAddXYPoints,
                    })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
