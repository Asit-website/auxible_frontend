import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import "./HRMsystem.css";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";
import "./quote.css";
import { useNavigate } from "react-router-dom";

const ITRReturn = ({ setAlert, pop, setPop }) => {
  const { user } = useMain();

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));
  const { role } = hrms_user;

  

  return (
    <>
      <div className="employee-dash h-full">
        {role === "EMPLOYEE" ? (
          <EmployeeSidebar pop={pop} setPop={setPop} />
        ) : (
          <AdminSidebar pop={pop} setPop={setPop} />
        )}

        <div className="tm">
          {role === "EMPLOYEE" ? (
            <EmployeeNavbar user={user} setAlert={setAlert} />
          ) : (
            <AdminNavbar user={user} setAlert={setAlert} />

          )}

          <div className="em">
            <div className="ITRWRAP">
              <h2 className="heading">START YOUR INCOME TAX RETURN FILING  </h2>

               <div className="uploaForms">

                 <label className="label" >
                    <p>Financial Year *</p>
                      <input type="date" />
                 </label>

                 <label  className="label" >
                    <p>PAN Number</p>
                      <input type="text" />
                 </label>

                 <label  className="label" >
                    <p>Date of Birth *</p>
                      <input type="text" />
                 </label>

                 <div className="optiondiv">
                    <span>Do you want to pre-fill data?</span>
                    <label className="radiolabel">
                          <input
                            type="radio"
                            value="yes"
                            name="prefill"
                          />
                          <span> Yes</span>
                        </label>
                        <label>
                          <input
                            type="radio"
                            value="no"
                            name="prefill"
                          />
                          <span> No</span>
                        </label>
                 </div>

               </div>

              <div className="">
                <button className="continueBtn"><span>CONTINUE</span></button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
};
export default ITRReturn;
