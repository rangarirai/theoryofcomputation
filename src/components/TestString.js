import React, { useContext, useState } from "react";
import { myContext } from "../App";
function TestString({ testString }) {
  const [result, setResult] = useState("");
  const [string, setString] = useState("");
  const context = useContext(myContext);

  return (
    <>
      <div className="field has-addons has-addons-centered">
        <div className="control ">
          {/* <input className="input" type="text" placeholder="Enter String" /> */}
          Result :
        </div>
        <div className="control has-text-info">
          {/* <button className="button is-info">Test</button> */}
          {JSON.stringify(result || context.result)}
        </div>
      </div>
      <div className="field has-addons has-addons-centered">
        <div className="control ">
          <input
            className="input"
            type="text"
            placeholder="Enter String"
            value={string}
            onChange={(e) => {
              setString(e.target.value);
            }}
          />
        </div>
        <div className="control">
          <button
            className="button is-info"
            onClick={() => {
              context.setInputPos(-10);
              context.setString(string.trim().split(""));
              setResult(testString(string.trim()));
            }}
          >
            Test
          </button>
        </div>
      </div>
    </>
  );
}

export default TestString;
