import React from "react";

const Alert = (props) => {
  const capitalizeMe = (word) =>{
    if (word==="danger"){
      return word = "Error";
    }
    return word.charAt(0).toUpperCase() +
    word.substr(1,);
  }
  return (
    <div style={{ height: "50px" }}>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>
            {capitalizeMe(props.alert.type)}{" "}
            :
          </strong>
           {" "}{props.alert.msg}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
    </div>
  );
};

export default Alert;
