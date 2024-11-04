import React, { useEffect, useState } from "react";
import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import "./lead.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { NavLink, useLocation } from "react-router-dom";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";

const TaskLead = ({ setAlert, pop, setPop }) => {

  const { user, getLeadById } = useMain();

  const location = useLocation();

  const { state } = location;

  const user1 = JSON.parse(localStorage.getItem("hrms_user"));


  const [leadData, setLeadData] = useState();


  const fetchLead = async () => {
    const ans = await getLeadById(state?.LeadId);
    if (ans?.status) {
      setLeadData(ans?.data);
    }
  }

  useEffect(() => {
    fetchLead();
  }, [])


  return (
    <div className="imprtleadCont">
      <div className="employee-dash h-full">
        {
          user1?.role === "ADMIN" || user1?.role === "HR" ? <AdminSidebar pop={pop} setPop={setPop} /> :
            <EmployeeSidebar pop={pop} setPop={setPop} />
        }


        <div className="tm">
          {
            user1?.role === "ADMIN" || user1?.role === "HR" ? <AdminNavbar user={user} setAlert={setAlert} /> : <EmployeeNavbar user={user} />
          }


          <div className="em">

            {/* first  */}

            <section className="firsSec">
              {/* /left side  */}
              <div className="leadLe">
                <div className="lTITL">
                  <h2>Follow up WhatsApp Message</h2>
                </div>
              </div>

              {/* right side  */}
              <div className="laedRight">
                <NavLink to={`${user?.designation === "CEO" || user?.designation === "Manager" ? "/adminDash/leadDash" : "/employeeDash/leadDash"}`}><button
                  id="dropdownDefaultButton"
                  data-dropdown-toggle="dropdown"
                  className="text-white silo   px-5 py-2.5 text-center inline-flex items-center"
                  type="button"
                >
                  Back
                </button></NavLink>

                <button
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 sendBtn"
                >
                  Close Task
                </button>
              </div>
            </section>

            {/* second sect */}

            {/* third secttion  */}
            <div className="leadWRAP">

              {/* first ka first  part  */}
              <div className="leadFirs">

                <div className="eladinfoWrap">

                  <div className="lleaiFOlEFT">

                    <div className="subPart">
                      <h3>LeadName :</h3>
                      <p>{state?.LeadName}</p>
                    </div>

                    <div className="subPart">
    <h3>Date:</h3>
    <p>{new Date(state?.Date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
</div>


                    <div className="subPart">
                      <h3>FollowUpType :</h3>
                      <p>{state?.FollowUpType}</p>
                    </div>

                    <div className="subPart">
                      <h3>Remark :</h3>
                      <p>{state?.Remark}</p>
                    </div>

                    <div className="subPart">
    <h3>Time:</h3>
    <p>{new Date(`1970-01-01T${state?.Time}:00Z`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
</div>

                  </div>

                </div>

              </div>

              {/* first second part  */}
              <div className="leadFirs">

                <div className="leadInfowrap">
                  <h2 className="ehading">Lead Information</h2>

                  <p>Hide</p>
                </div>

                <hr />

                <div className="eladinfoWrap">

                  {/* left side  */}
                  <div className="lleaiFOlEFT">

                    <div className="subPart">
                      <h3>Lead Owner :</h3>
                      <p>{leadData?.LeadOwner?.fullName}</p>
                    </div>

                    <div className="subPart">
                      <h3>Title</h3>
                      <p>{leadData?.Title}</p>
                    </div>

                    <div className="subPart">
                      <h3>Phone :</h3>
                      <p>{leadData?.Phone}</p>
                    </div>

                    <div className="subPart">
                      <h3>Mobile :</h3>
                      <p>{leadData?.Mobile}</p>
                    </div>

                    <div className="subPart">
                      <h3>Industry :</h3>
                      <p>{leadData?.Industry}</p>
                    </div>

                    <div className="subPart">
                      <h3>Annual Revenue :</h3>
                      <p>{leadData?.AnnualRevenue}</p>
                    </div>


                  </div>

                  {/* right side  */}
                  <div className="lleaiFOlEFT">

                    <div className="subPart">
                      <h3>Company :</h3>
                      <p>{leadData?.Company}</p>
                    </div>

                    {/* <div className="subPart">
                      <h3>Lead Name :</h3>
                      <p>
                 
                      </p>
                    </div> */}

                    <div className="subPart">
                      <h3>Email :</h3>
                      <p>{leadData?.Email}</p>
                    </div>

                    <div className="subPart">
                      <h3>Fax :</h3>
                      <p>{leadData?.Fax}</p>
                    </div>

                    <div className="subPart">
                      <h3>No. of Employees :</h3>
                      <p>{leadData?.NoOfEmployee}</p>
                    </div>

                    <div className="subPart">
                      <h3>Lead Status :</h3>
                      <p>{leadData?.LeadStatus}</p>
                    </div>

                  </div>
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

export default TaskLead;
