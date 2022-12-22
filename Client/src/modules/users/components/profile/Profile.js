import React from "react";
import imageProfile from "../../../../assets/img/user-img.png";
let Profile = () => {
  return (
    <React.Fragment>
      <section class="p-3 bg-warning">
        <div className="container">
          <div className="row animated flipInY">
            <div className="col">
              <div className="h3">
                <p>
                  <i className="fa fa-user-circle" />
                  Profile
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col-md-4 text-center">
              <img src={imageProfile} alt="" className="img-fluid" />
            </div>
            <div className="col-md-8">
              <div className="card">
                <div className="card-header bg-dark">
                  <p className="h4"> Your Info</p>
                </div>
                <div className="card-body">
                  <ul className="list-group">
                    <li className="list-group-item"> Name:</li>
                    <li className="list-group-item">Email:</li>
                    <li className="list-group-item"> Phone Number:</li>
                  </ul>
                </div>
              </div>
              <div className="card mt-3">
                <div className="card-header">
                  <p className="h4"> Update Address </p>
                </div>
                <div className="card-body">
                  <ul className="list-group">
                    <li className="list-group-item">flat:</li>
                    <li className="list-group-item">Street No:</li>
                    <li className="list-group-item">City:</li>
                    <li className="list-group-item">State:</li>
                    <li className="list-group-item">PinCode:</li>
                    <li className="list-group-item">Mobile No:</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
export default Profile;
