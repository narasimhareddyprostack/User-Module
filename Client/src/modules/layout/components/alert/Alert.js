import React from "react";

import { useSelector } from "react-redux";
let Alert = () => {
  let alertInfo = useSelector((state) => {
    return state.alert;
  });
  console.log(alertInfo.length);
  return (
    <React.Fragment>
      {alertInfo.length > 0 ? (
        <React.Fragment>
          {alertInfo.map((alert) => {
            return (
              <div
                key={alert.id}
                className={`alert alert-${alert.color} alert-dismissible animated slideInDown fixed-middle mx-5`}
              >
                <button type="button" className="close">
                  <i className="fa fa-times-circle" />
                </button>
                <small> {alert.message}</small>
              </div>
            );
          })}
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

export default Alert;
