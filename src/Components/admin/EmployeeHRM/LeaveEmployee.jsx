import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import HrSidebar from "../../Hr/Sidebar/HrSidebar";
import HrNavbar from "../../Hr/Navbar/HrNavbar";
import chevron from "../../images/chevron_right.png";
import emplyee from "../../images/emplyProfile.png";
import mail from "../../images/mail.png";
import "./hrm.css";
import "./leaveEmp.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";

const LeaveEmployee = ({
  pop1,
  setPop1,
  pop,
  setPop,
  setAlert,
  isHr = false,
}) => {
  const { user, fetchTodayLeave } = useMain();
  const [data, setData] = useState([]);
  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const { role } = hrms_user;

  const getLeavesEmp = async () => {
    const ans = await fetchTodayLeave();

    if (ans?.status) {
      setData(ans?.data);
    }
  };

  useEffect(() => {
    getLeavesEmp();
  }, []);

  return (
    <>
      <div className="employee-dash h-full">
        {isHr ? (
          <HrSidebar />
        ) : role === "EMPLOYEE" ? (
          <EmployeeSidebar pop={pop} setPop={setPop} />
        ) : (
          <AdminSidebar pop={pop} setPop={setPop} />
        )}
        <div className="tm">
          {isHr ? (
            <HrNavbar
              user={user}
              setAlert={setAlert}
              pop1={pop1}
              setPop1={setPop1}
            />
          ) : role === "EMPLOYEE" ? (
            <EmployeeNavbar user={user} setAlert={setAlert} />
          ) : (
            <AdminNavbar user={user} setAlert={setAlert} />
          )}
          <div className="em">
            <div className="flex-col">
              {/* First */}
              <div className="hrmDasTxtFir">
                <p className="hrmHed">Dashboard</p>
                <div className="hrDsPa">
                  <p className="hrFirDs">Dashboard</p>{" "}
                  <span>
                    <img src={chevron} alt="" />
                  </span>{" "}
                  <NavLink to={`/adminDash/HRM`}>
                    <span className="hrFirDs">HRM</span>
                  </NavLink>
                  <span>
                    <img src={chevron} alt="" />
                  </span>{" "}
                  <span className="thml">Employees on Leave</span>
                </div>
              </div>

              {/* Second */}
              <main className="laveEmplyWrap">
                {data?.map((employ, index) => (
                  <div key={index} className="singl_EmplyL">
                    <div className="singEmp_profileL">
                      <img
                        src={
                          employ?.user?.profileImage
                            ? employ?.user?.profileImage
                            : emplyee
                        }
                        alt=""
                      />
                      <h2>{employ?.user?.fullName}</h2>
                      <p>{employ?.user?.department}</p>

                      <button className="inactBtn55">
                        <span>Inactive</span>
                      </button>
                    </div>

                    <div className="empEmail_phnL">
                      <p>
                        <img src={mail} alt="" />{" "}
                        <span>{employ?.user?.email}</span>
                      </p>
                    </div>

                    <div className="empDep_joinL">
                      <p>
                        <span>Department</span>
                        <span className="snsL">{employ?.user?.department}</span>
                      </p>
                      <p>
                        <span>Date of Joining</span>
                        <span className="snsL">{employ?.user?.joiningDate}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaveEmployee;
