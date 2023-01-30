import React, { useContext, useEffect, useState } from "react";
import { myContext } from "../App";

export default function Elements({ inputValues, statesClone }) {
  const context = useContext(myContext);
  const [list, setList] = useState([]);
  useEffect(() => {
    let elements = Array(context?.inputValues?.length).fill("fill", 0);
    if (inputValues && !!Object.keys(inputValues).length) {
      Object.keys(inputValues).map((key) => {
        if (inputValues[key]) {
          let i = Object.keys(inputValues[key])[0];
          let inputs = i.split(",");
          let inputsTrimmed = inputs.map((input) => input.trim());
          inputsTrimmed.forEach((input) => {
            context?.inputValues?.forEach((inputValue, index) => {
              if (input === inputValue) {
                elements[index] = {
                  el: (
                    <td
                      key={inputValues[key][i].id.toString() + input}
                      id={inputValues[key][i].id.toString() + input}
                    >
                      {statesClone[inputValues[key][i]?.nextStateId]?.label}
                    </td>
                  ),
                };
              }
            });
          });
        }
        return null;
      });
    }

    setList(elements);
  }, [context, inputValues, statesClone]);

  return (
    <>
      {list.map((data) => {
        if (data === "fill") {
          return <td></td>;
        } else {
          return data.el;
        }
      })}
    </>
  );
}
