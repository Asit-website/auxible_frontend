import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import "./HRMsystem.css";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";
import "./quote.css";
import { useNavigate } from "react-router-dom";

const UploadITRForm = ({ setAlert, pop, setPop }) => {
  const { user } = useMain();
  const navigate = useNavigate();


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
              <h2 className="heading">UPLOAD FORM 16 </h2>

               <div className="uploaForms2">

                <div className="itrpara">
                    <p>Income Tax Return Filing is easy with Tax2win and the smartest way to online file your taxes return is to just upload your form 16 and get your ITR prepared automatically.
                    </p>
                </div>

                <div className="continwiform">
                    <button onClick={()=>navigate("/adminDash/HRM/ITRReturn")}>CONTINUE  WITHOUT FORM 16</button>
                    <span>OR</span>
                    <button>UPLOAD FORM 16</button>
                </div>

               </div>


            </div>

          </div>
        </div>
      </div>
    </>
  );
};
export default UploadITRForm;
