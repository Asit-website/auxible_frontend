import React from "react";
import EmployeeNavbar from "../Navbar/EmployeeNavbar";
import EmployeeSidebar from "../Sidebar/EmployeeSidebar";
import { useMain } from "../../../hooks/useMain";
import search from "../../images/search.png";
import dist from "../../images/dist.png";
import asit from "../../images/asit.png";
import chirag from "../../images/chirag.png";
const Request = ({ setAlert, pop1, setPop1 }) => {
  const { user, postActivity, getStatisticsByUser } = useMain();
  return (
    <>
      <div className="employee-dash h-full">
        <EmployeeSidebar />
        <div className="tm">
          <EmployeeNavbar
            user={user}
            setAlert={setAlert}
            postActivity={postActivity}
            getStatisticsByUser={getStatisticsByUser}
            pop1={pop1} setPop1={setPop1}
          />
          <div className="em em1">
            <div className="flex-col">
              <div className="request-bar flex">
                <div className="first-request-bar">
                  <div className="request-search flex items-center justify-between">
                    <h2>SHOW : ALL CATEGORY</h2>
                    <img src={search} alt="search1" />
                  </div>
                  <div className="request-sir">
                    <div className="request-by">
                      <p>Leave request for Asit Mandal (#KDS430)</p>
                      <p className="from">26/05/2023 to 26/05/2023</p>
                      <p className="datr">23/05/2023.6:30 PM</p>
                      <p className="blue">WITH : Chirag Negi (#KDS03)</p>
                    </div>
                    <div className="request-by">
                      <p>Leave request for Asit Mandal (#KDS430)</p>
                      <p className="from">26/05/2023 to 26/05/2023</p>
                      <p className="datr">23/05/2023.6:30 PM</p>
                      <p className="blue">WITH : Chirag Negi (#KDS03)</p>
                    </div>
                    <div className="request-by">
                      <p>Leave request for Asit Mandal (#KDS430)</p>
                      <p className="from">26/05/2023 to 26/05/2023</p>
                      <p className="datr">23/05/2023.6:30 PM</p>
                      <p className="blue">WITH : Chirag Negi (#KDS03)</p>
                    </div>
                    <div className="request-by">
                      <p>Leave request for Asit Mandal (#KDS430)</p>
                      <p className="from">26/05/2023 to 26/05/2023</p>
                      <p className="datr">23/05/2023.6:30 PM</p>
                      <p className="blue">WITH : Chirag Negi (#KDS03)</p>
                    </div>
                    <div className="request-by">
                      <p>Leave request for Asit Mandal (#KDS430)</p>
                      <p className="from">26/05/2023 to 26/05/2023</p>
                      <p className="datr">23/05/2023.6:30 PM</p>
                      <p className="blue">WITH : Chirag Negi (#KDS03)</p>
                    </div>
                  </div>
                </div>
                <div className="second-request-bar">
                  <div className="pending">
                    <div className="pending1"></div>
                    <button>PENDING</button>
                    <div className="pending1"></div>
                  </div>
                  <div className="request-flow mt-5">
                    <h3>Your request workflow -</h3>
                    <div className="request-flows mt-4">
                      <div className="requests-flow1">
                        <img src={asit} alt="asit" />
                        <div className="image-line"></div>
                        {/* <hr /> */}
                        <img src={chirag} alt="chirag" />
                        <div className="image-line1"></div>
                        <img src={dist} alt="dist" />
                      </div>
                      <div className="requests-flow2">
                        <div className="view-form">
                          <div className="view-form1">
                            <h3>Asit Mandal (#KDS430)</h3>
                            <h5>26/05/2023</h5>
                            <p>Leave request for Asit Mandal (#KDS430)</p>
                          </div>
                          <div className="view-form2">
                            <h3>View Form</h3>
                          </div>
                        </div>
                        <div className="view-form mt-6">
                          <div className="view-form1">
                            <h3>Chirag Negi (#KDS03)</h3>
                            <p>Pending....</p>
                          </div>
                          <div className="view-form2">
                            <h3>Send Reminder</h3>
                          </div>
                        </div>
                        <div className="view-form view-form2 mt-6">
                          <div className="view-form1">
                            <h3>HR DEPARTMENT (#HR)</h3>
                          </div>
                          <div className="view-form2">
                            {/* <h3>Send Reminder</h3> */}
                          </div>
                        </div>
                      </div>
                    </div>

                    <button className="undo">Undo</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Request;
