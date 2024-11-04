import React from "react";
import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import "./lead.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { NavLink, useLocation } from "react-router-dom";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";
const MeetLead = ({ setAlert, pop, setPop }) => {
  const {
    user } = useMain();

  const location = useLocation();

  const { state } = location;

  console.log("staete ", state);

  const user1 = JSON.parse(localStorage.getItem("hrms_user"));



  return (
    <div className="imprtleadCont">
      <div className="employee-dash h-full">
        {/* <AdminSidebar pop={pop} setPop={setPop} /> */}

        {
          user1?.role === "ADMIN" || user1?.role === "HR" ? <AdminSidebar pop={pop} setPop={setPop} /> :
            <EmployeeSidebar pop={pop} setPop={setPop} />
        }

        <div className="tm">
          {/* <AdminNavbar user={user} setAlert={setAlert} /> */}

          {
            user1?.role === "ADMIN" || user1?.role === "HR" ? <AdminNavbar user={user} setAlert={setAlert} /> : <EmployeeNavbar user={user} />
          }


          <div className="em">

            {/* first  */}

            <section className="firsSec">
              {/* /left side  */}
              <div className="leadLe">
                <div className="lTITL">
                  <h2>Webinar</h2>
                </div>
              </div>

              {/* right side  */}
              <div className="laedRight">
                <NavLink to={`${user1?.designation === "CEO" || user1?.designation === "Manager" ? "/adminDash/leadDash" : "/employeeDash/leadDash"}`}><button
                  id="dropdownDefaultButton"
                  data-dropdown-toggle="dropdown"
                  className="text-white silo   px-5 py-2.5 text-center inline-flex items-center"
                  type="button"
                >
                  Back
                </button></NavLink>

                <button
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm me-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 sendBtn2"
                >
                  Close Meeting
                </button>
              </div>
            </section>

            {/* second sect */}

            {/* third secttion  */}
            <div className="leadWRAP">

              {/* first ka first  part  */}
              <div className="leadFirs">


                <div className="lleaiFOlEFT">


                  <div className="subPart">
                    <h3>Date :</h3>
                    <p>{state?.meetDateFrom}</p>
                  </div>

                  <div className="subPart">
                    <h3>Time :</h3>
                    <p>{state?.meetTimeFrom} - {state?.meetTimeTo}</p>
                  </div>

                  <div className="subPart">
                    <h3>Status :</h3>
                    <p>{state?.Status}</p>
                  </div>

                  <div className="subPart">
                    <h3>Related To :</h3>
                    <p>{state?.RelatedTo}</p>
                  </div>

                  <div className="subPart">
                    <h3>Host :</h3>
                    <p>{state?.Host}</p>
                  </div>

                </div>


              </div>

              {/* first second part  */}
              <div className="leadFirs">

                <div className="leadInfowrap">
                  <h2 className="ehading">Participants</h2>

                  <button className="addNew"><span>Add New</span></button>
                </div>

                <hr />

                <div className="eladinfoWrap">
                  <p>No records found</p>
                </div>

              </div>

              {/* third third  */}
              <div className="leadFirs">

                <div className="LEADSsTunav">
                  <h2 className="ehading">Note</h2>

                </div>

                <hr />

                <div className="noteInpuCont">

                  <textarea name="" id="" placeholder="Add a note..."> </textarea>

                  <div className="noBtns">

                    <button className="ccnel"><span>Cancel</span></button>
                    <button className="ssave"><span>Save</span></button>

                  </div>
                </div>

              </div>

              {/* fourth  */}
              <div className="leadFirs">

                <div className="attachment">
                  <h2 className="ehading">Attachment</h2>
                  <div className="saya">
                    <p>Upload File</p>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13 19V15H16L12 10L8 15H11V19H13Z"
                        fill="#0B56E4"
                      />
                      <path
                        d="M7 19H9V17H7C5.346 17 4 15.654 4 14C4 12.596 5.199 11.244 6.673 10.985L7.254 10.883L7.446 10.325C8.149 8.274 9.895 7 12 7C14.757 7 17 9.243 17 12V13H18C19.103 13 20 13.897 20 15C20 16.103 19.103 17 18 17H15V19H18C20.206 19 22 17.206 22 15C21.9985 14.1036 21.6966 13.2336 21.1427 12.5288C20.5888 11.8241 19.8147 11.3253 18.944 11.112C18.507 7.67 15.56 5 12 5C9.244 5 6.85 6.611 5.757 9.15C3.609 9.792 2 11.82 2 14C2 16.757 4.243 19 7 19Z"
                        fill="#0B56E4"
                      />
                    </svg>
                  </div>
                </div>

                <hr />

                <div className="attcont">
                  <p className="toyotoyo">No Attachment</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default MeetLead;
