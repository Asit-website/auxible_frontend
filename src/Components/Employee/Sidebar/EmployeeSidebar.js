import React, { useState } from "react";
import chakka from "../../images/chakka.png";
import { NavLink, useNavigate } from "react-router-dom";
import chart from "../../images/ChartPieSlice.png"
import userP from "../../images/userProfile.png"
import employee from '../../images/employee.svg';
import perty from '../../images/perty.svg';
import shop from "../../images/ShoppingBagOpen-d.png"
import leaderboard from '../../images/leaderboard.svg';
import leaderboard1 from '../../images/leaderboard1.svg';
import anal from '../../images/anal.svg';
import vect from '../../images/vect.svg';
import tyming from '../../images/tyming.svg';
import fiber from '../../images/fiber.svg';
import cel from '../../images/cal.svg';
import cel1 from '../../images/cal1.svg';
import webAsseting from '../../images/webAsseting.svg';
import reading from '../../images/reading.svg';
import "../../admin/Sidebar/sidebar.css"


const LeaveManItem = [
  {
    title: "Manage Leave",
    link: "/employeeDash/HRM/LeaveEmployee"
  },
  {
    title: "Leave Request",
    link: "/employeeDash/HRM/leaveRequest"
  },


]

const trainingItems = [
  {
    title: "Training list",
    link: "/training/TrainingList"
  },
  {
    title: "Trainer",
    link: "/training/TrainerHRM"
  },

]

const payrols = [
  {
    title: "Set Salary",
    link: "/employeeDash/setSallary"
  },
  {
    title: "Payslip",
    link: "/employeeDash/payslip"
  },
]

const performances = [
  {
    title: "Indicator",
    link: "/performance/indicator"
  },
  {
    title: "Appraisal",
    link: "/performance/appraisal"
  }, {
    title: "Goal Tracking",
    link: "/performance/goalTracking"
  }
]

const payrols2 = [
  
  {
    title:"My Projects",
    link:"/employeeDash/HRM/myProjects"
  },

 
]

const hrAdminItems = [
  {
    title: "Award",
    link: "/employeeDash/HRM/AwardHRM"
  },
  {
    title: "Transfer",
    link: "/employeeDash/HRM/TransferHRM"
  },
  {
    title: "Regisnation",
    link: "/employeeDash/HRM/ResignationHRM"
  },
  {
    title: "Promotion",
    link: "/employeeDash/HRM/PromotionHRM"
  },
  {
    title: "Complaints",
    link: "/employeeDash/HRM/ComplaintsHRM"
  },
  {
    title: "Warning",
    link: "/employeeDash/HRM/WarningHRM"
  },
  {
    title: "Termination",
    link: "/employeeDash/HRM/TerminationHRM"
  },
  {
    title: "Holiday",
    link: "/employeeDash/HRM/holiday" 
  },
  {
    title:"Announcement",
    link:"/employeeDash/announcement"
  }
]

const EmployeeSidebar = () => {

  let hrms_permission = JSON.parse(localStorage.getItem("hrms_permission"));


  const { leadPermission, hrmsSetUpPermission, payrollPermission, leadSystemPermission, attendencePermission, assetsPermission, documentPermission, leaveManagePermission, performancePermission, employeeManagePermission, hrAdminSetupPermission, trainingSetupPermission , permissionPagePermission } = hrms_permission;

  console.log("permissionPagePermission " ,permissionPagePermission);

  const [openPayroll, setOpenPayroll] = useState(false);

  const [payrollItem, setPayrollItem] = useState(0);
  const [trainingItem, setTrainingItem] = useState(0);

  const [openTraining, setOpenTraining] = useState(false);

  const [hrItem,setHrItem] = useState(0);

  const [openLeaveMan, setOpenLeaveMan] = useState(false);
  const [openPerform, setOpenPerform] = useState(false);
  const [openPayroll2,setOpenPayroll2] = useState(false);

  const [leveItem, setLeveItem] = useState(0);

  const [performanceItem, setPerformanceItem] = useState(0);

  const [openHr,setOpenHr] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <button
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="sidebar-multi-level-sidebar"
        className="fixed top-0 olo left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 sidebars"
        aria-label="Sidebar"
      >

        <div className="h-full px-3 py-4 overflow-y-auto  sidebars sidebars1">

          <ul className="allNavItem">

            <NavLink to="/employeeDash"><li className="dashNW">
              <img src={chart} alt="" />
              <a
                href="#"
                className=" "
              >
                <span className="">Dashboard</span>
              </a>

            </li>
            </NavLink>

          
            {
              hrmsSetUpPermission &&
              <NavLink to="/employeeDash/HRM/HRMsystemSetup"><div className={`${window.location.pathname === "/employeeDash/HRM/HRMsystemSetup" ? "hh" : ""} setWrap`}>
                <div className="systSset">
                  <img src={`${window.location.pathname === "/employeeDash/HRM/HRMsystemSetup" ? perty : employee}`} alt="" />
                  <span className={`${window.location.pathname === "/employeeDash/HRM/HRMsystemSetup" ? "fan" : ""}`}>Hrm System Setup</span>
                </div>
              </div></NavLink>

            }

            {
              leadPermission &&

              <NavLink to="/employeeDash/leadDash"><div className={`${window.location.pathname === "/employeeDash/leadDash" || window.location.pathname === "/employeeDash/myLead" || window.location.pathname === "/employeeDash/editLead" || window.location.pathname === "/employeeDash/createLead" || window.location.pathname === "/employeeDash/importLead/:id" || window.location.pathname === "/employeeDash/createQuotation" || window.location.pathname === "/employeeDash/editQuotation" ? "hh" : ""} setWrap`}>
                <div className="systSset">
                  <img src={`${window.location.pathname === "/employeeDash/leadDash" || window.location.pathname === "/employeeDash/myLead" || window.location.pathname === "/employeeDash/editLead" || window.location.pathname === "/employeeDash/createLead" || window.location.pathname === "/employeeDash/importLead/:id" || window.location.pathname === "/employeeDash/createQuotation" || window.location.pathname === "/employeeDash/editQuotation" ? leaderboard1 : leaderboard}`} alt="" />
                  <span className={`${window.location.pathname === "/employeeDash/leadDash" || window.location.pathname === "/employeeDash/myLead" || window.location.pathname === "/employeeDash/editLead" || window.location.pathname === "/employeeDash/createLead" || window.location.pathname === "/employeeDash/importLead/:id" || window.location.pathname === "/employeeDash/createQuotation" || window.location.pathname === "/employeeDash/editQuotation" ? "fan" : ""}`}>Lead Management</span>
                </div>
              </div></NavLink>

            }


{
              permissionPagePermission &&

              <NavLink to="/employeeDash/Permission"><div className={`${window.location.pathname === "/employeeDash/Permission" || window.location.pathname === "/employeeDash/myLead" || window.location.pathname === "/employeeDash/editLead" || window.location.pathname === "/employeeDash/createLead" || window.location.pathname === "/employeeDash/importLead/:id" || window.location.pathname === "/employeeDash/createQuotation" || window.location.pathname === "/employeeDash/editQuotation" ? "hh" : ""} setWrap`}>
                <div className="systSset">
                  <img src={`${window.location.pathname === "/employeeDash/Permission" || window.location.pathname === "/employeeDash/myLead" || window.location.pathname === "/employeeDash/editLead" || window.location.pathname === "/employeeDash/createLead" || window.location.pathname === "/employeeDash/importLead/:id" || window.location.pathname === "/employeeDash/createQuotation" || window.location.pathname === "/employeeDash/editQuotation" ? leaderboard1 : leaderboard}`} alt="" />
                  <span className={`${window.location.pathname === "/employeeDash/Permission" || window.location.pathname === "/employeeDash/myLead" || window.location.pathname === "/employeeDash/editLead" || window.location.pathname === "/employeeDash/createLead" || window.location.pathname === "/employeeDash/importLead/:id" || window.location.pathname === "/employeeDash/createQuotation" || window.location.pathname === "/employeeDash/editQuotation" ? "fan" : ""}`}>Permission</span>
                </div>
              </div></NavLink>

            }

            
            {
              payrollPermission &&
              <>
                {/* =================payroll management start============ */}

                <div
                  onClick={() => setOpenPayroll((prev) => !prev)}
                  className="side-dash-box sidemargin"
                >
                  <div className="dash-wrap">
                    <img src={anal} alt="dasg" />
                    <p>Payroll Management</p>
                  </div>

                  <img src={vect} alt="" />
                </div>

                {openPayroll && (
                  <div className="allemployeeDash-item">
                    {payrols?.map((item, index) => (
                      <div
                        onClick={() => {
                          setPayrollItem(index);
                          navigate(item?.link);
                          setOpenPayroll(true);
                        }

                        }
                        className="sinADDasItem"
                        key={index}
                      >
                        {payrollItem == index ? (
                          <img src={`${window.location.pathname === `${item?.link}` ? fiber : tyming}`} alt="" />
                        ) : (
                          <img src={`${window.location.pathname === `${item?.link}` ? fiber : tyming}`} alt="" />
                        )}
                        <p
                          className={` ${payrollItem === index ? "dashItemp" : "dITitl"
                            } ${window.location.pathname === `${item?.link}` ? "fan" : ""}`}
                        >
                          {item?.title}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* =================payroll management end============ */}

              </>

            }

            {
              leadSystemPermission &&
              <>
                <NavLink to="/employeeDash/LeadSystemSetting"><div className={`${window.location.pathname === "/employeeDash/LeadSystemSetting" ? "hh" : ""} setWrap`}>

                  <div className="systSset">
                    <img src={`${window.location.pathname === "/employeeDash/LeadSystemSetting" ? perty : employee}`} alt="" />
                    <span className={`${window.location.pathname === "/employeeDash/LeadSystemSetting" ? "fan" : ""}`}>Lead System Setting</span>
                  </div>
                </div></NavLink>
              </>
            }


            {
              attendencePermission &&
              <>
                <NavLink to="/employeeDash/HRM/markAttendance"><div className={`${window.location.pathname === "/employeeDash/HRM/markAttendance" ? "hh" : ""} setWrap`}>
                  {/* <p>Setting</p> */}
                  <div className="systSset">
                    <img src={`${window.location.pathname === "/employeeDash/HRM/markAttendance" ? cel1 : cel}`} alt="" />
                    <span className={`${window.location.pathname === "/employeeDash/HRM/markAttendance" ? "fan" : ""}`}>Attendance Management</span>
                  </div>
                </div></NavLink>
              </>
            }

            {
              assetsPermission &&
              <>
                <NavLink to="/performance/Assets"><div className={`${window.location.pathname === "/performance/Assets" ? "hh" : ""} setWrap`}>
                  {/* <p>Setting</p> */}
                  <div className="systSset">
                    <img src={`${window.location.pathname === "/performance/Assets" ? webAsseting : webAsseting}`} alt="" />
                    <span className={`${window.location.pathname === "/performance/Assets" ? "fan" : ""}`}>Assets Management</span>
                  </div>
                </div></NavLink>
              </>
            }

            {
              documentPermission &&
              <>
                <NavLink to="/employeeDash/documentManagement"><div className={`${window.location.pathname === "/employeeDash/documentManagement" ? "hh" : ""} setWrap`}>
                  {/* <p>Setting</p> */}
                  <div className="systSset">
                    <img src={window.location.pathname === "/employeeDash/documentManagement" ? "fan" : ""} alt="" />
                    <span className={`${window.location.pathname === "/employeeDash/documentManagement" ? "fan" : ""}`}>Document Management</span>
                  </div>
                </div></NavLink>
              </>

            }

            {
              leaveManagePermission &&
              <>
                <div
                  onClick={() => setOpenLeaveMan((prev) => !prev)}
                  className="side-dash-box sidemargin"
                >
                  <div className="dash-wrap">
                    <img src={reading} alt="dasg" />
                    <p>Leave Management Setup</p>
                  </div>

                  <img src={vect} alt="vect" />
                </div>

                {openLeaveMan && (
                  <div className="allemployeeDash-item">
                    {LeaveManItem?.map((item, index) => (
                      <div
                        onClick={() => {
                          setLeveItem(index);
                          navigate(item?.link);
                          setOpenLeaveMan(true);
                        }

                        }
                        className="sinADDasItem"
                        key={index}
                      >
                        {leveItem == index ? (
                          <img src={`${window.location.pathname === `${item?.link}` ? fiber : tyming}`} alt="" />
                        ) : (
                          <img src={`${window.location.pathname === `${item?.link}` ? fiber : tyming}`} alt="" />
                        )}
                        <p
                          className={` ${leveItem === index ? "dashItemp" : "dITitl"
                            } ${window.location.pathname === `${item?.link}` ? "fan" : ""}`}
                        >
                          {item?.title}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            }


            {
              performancePermission &&
              <>
                <div
                  onClick={() => setOpenPerform((prev) => !prev)}
                  className="side-dash-box sidemargin"
                >
                  <div className="dash-wrap">
                    <img src={reading} alt="dasg" />
                    <p>Performance Setup</p>
                  </div>

                  <img src={vect} alt="vect" />
                </div>

                {openPerform && (
                  <div className="allemployeeDash-item">
                    {performances?.map((item, index) => (
                      <div
                        onClick={() => {
                          setPerformanceItem(index);
                          navigate(item?.link);
                          setOpenPerform(true);
                        }

                        }
                        className="sinADDasItem"
                        key={index}
                      >
                        {performanceItem == index ? (
                          <img src={`${window.location.pathname === `${item?.link}` ? fiber : tyming}`} alt="" />
                        ) : (
                          <img src={`${window.location.pathname === `${item?.link}` ? fiber : tyming}`} alt="" />
                        )}
                        <p
                          className={` ${performanceItem === index ? "dashItemp" : "dITitl"
                            } ${window.location.pathname === `${item?.link}` ? "fan" : ""}`}
                        >
                          {item?.title}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            }

            {
              employeeManagePermission &&
              <>
                <NavLink to="/employeeDash/HRM/employeeManagement"><div className={`${window.location.pathname === "/employeeDash/HRM/employeeManagement" || window.location.pathname === "/employeeDash/EmployeeDetails" || window.location.pathname === "/employeeDash/EmployeeMan" || window.location.pathname === "/employeeDash/EmployeeMan/:id" ? "hh" : ""} setWrap`}>
                  {/* <p>Setting</p> */}
                  <div className="systSset">
                    <img src={`${window.location.pathname === "/employeeDash/HRM/employeeManagement" || window.location.pathname === "/employeeDash/EmployeeDetails" || window.location.pathname === "/employeeDash/EmployeeMan" || window.location.pathname === "/employeeDash/EmployeeMan/:id" ? perty : employee}`} alt="" />
                    <span className={`${window.location.pathname === "/employeeDash/HRM/employeeManagement" || window.location.pathname === "/employeeDash/EmployeeDetails" || window.location.pathname === "/employeeDash/EmployeeMan" || window.location.pathname === "/employeeDash/EmployeeMan/:id" ? "fan" : ""}`}>Employee Management</span>
                  </div>
                </div></NavLink>
              </>
            }

            {
              trainingSetupPermission &&
              <>

                <div
                  onClick={() => setOpenTraining((prev) => !prev)}
                  className="side-dash-box sidemargin"
                >
                  <div className="dash-wrap">
                    <img src={reading} alt="dasg" />
                    <p>Training Setup</p>
                  </div>

                  <img src={vect} alt="vect" />
                </div>

                {openTraining && (
                  <div className="alladminDash-item">
                    {trainingItems?.map((item, index) => (
                      <div
                        onClick={() => {
                          setTrainingItem(index);
                          navigate(item?.link);
                          setOpenTraining(true);
                        }

                        }
                        className="sinADDasItem"
                        key={index}
                      >
                        {trainingItem == index ? (
                          <img src={`${window.location.pathname === `${item?.link}` ? fiber : tyming}`} alt="" />
                        ) : (
                          <img src={`${window.location.pathname === `${item?.link}` ? fiber : tyming}`} alt="" />
                        )}
                        <p
                          className={` ${performanceItem === index ? "dashItemp" : "dITitl"
                            } ${window.location.pathname === `${item?.link}` ? "fan" : ""}`}
                        >
                          {item?.title}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            }

            {
              hrAdminSetupPermission && 
              <>
                 {/* ===============hr admin setup start============ */}

                 <div
                onClick={() => setOpenHr((prev) => !prev)}
                className="side-dash-box sidemargin"
              >
                <div className="dash-wrap">
                  <img src={reading} alt="dasg" />
                  <p>Hr Admin Setup</p>
                </div>

                <img src={vect} alt="vect" />
              </div>

              {openHr && (
                <div className="alladminDash-item">
                  {hrAdminItems?.map((item, index) => (
                    <div
                      onClick={() => {
                        setHrItem(index);
                        navigate(item?.link);
                      }

                      }
                      className="sinADDasItem"
                      key={index}
                    >
                      {hrItem == index ? (
                        <img src={`${window.location.pathname === `${item?.link}` ? fiber : tyming}`} alt="" />
                      ) : (
                        <img src={`${window.location.pathname === `${item?.link}` ? fiber : tyming}`} alt="" />
                      )}
                      <p
                        className={` ${hrItem === index ? "dashItemp" : "dITitl"
                          } ${window.location.pathname === `${item?.link}` ? "fan" : ""}`}
                      >
                        {item?.title}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* =================hr admin setup end================= */}
              </>
            }

 {/* =================task start============ */}

 <div
                onClick={() => setOpenPayroll2((prev) => !prev)}
                className="side-dash-box sidemargin"
              >
                <div className="dash-wrap">
                  <img src={anal} alt="dasg" />
                  <p>Task Management</p>
                </div>

                <img src={vect} alt="" />
              </div>

              {openPayroll2 && (
                <div className="alladminDash-item">
                  {payrols2?.map((item, index) => (
                    <div
                      onClick={() => {
                        setPayrollItem(index);
                        navigate(item?.link);
                        setOpenPayroll2(true);
                      }

                      }
                      className="sinADDasItem"
                      key={index}
                    >
                      {payrollItem == index ? (
                        <img src={`${window.location.pathname === `${item?.link}` ? fiber : tyming}`} alt="" />
                      ) : (
                        <img src={`${window.location.pathname === `${item?.link}` ? fiber : tyming}`} alt="" />
                      )}
                      <p
                        className={` ${payrollItem === index ? "dashItemp" : "dITitl"
                          } ${window.location.pathname === `${item?.link}` ? "fan" : ""}`}
                      >
                        {item?.title}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* ================= tak end============ */}

            <NavLink to="/employeeDash/mySelf"><li className="indefy">
              <img src={shop} alt="" />
              <a
                href="#"
                className=" "
              >
                <span className="">My Self</span>
              </a>

            </li>
            </NavLink>


            <NavLink to="/employeeDash/update"><li className="indefy">
              <img src={userP} alt="" />
              <a
                href="#"
                className=" "
              >
                <span className="">User Profile</span>
              </a>

            </li>
            </NavLink>



            <div className="red-box">
              <div className="white-box">
                <img src={chakka} alt="chakka" />
                <div className="black-box">
                  <h3>Need Help?</h3>
                  <p>Our support team is ready for you</p>
                  <button>Get Help</button>
                </div>
              </div>
            </div>

          </ul>

        </div>

      </aside>

      <div className="p-0 sm:ml-64">

      </div>
    </>
  );
};

export default EmployeeSidebar;
