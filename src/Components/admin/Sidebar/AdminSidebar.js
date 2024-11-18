
import React, { useState } from "react";
import chakka from "../../images/chakka.png";
import Managment from "../Management/Managment";
import { NavLink, useNavigate } from "react-router-dom";
import gridDas from '../../images/gridDas.svg';  
import saka from '../../images/saka.svg';
import adminSetting from "../../images/adminSetting.png"
import leaderboard from '../../images/leaderboard.svg';
import leaderboard1 from '../../images/leaderboard1.svg';
import employee from '../../images/employee.svg';
import perty from '../../images/perty.svg';
import anal from '../../images/anal.svg';
import vect from '../../images/vect.svg';
import tyming from '../../images/tyming.svg';
import fiber from '../../images/fiber.svg';
import reading from '../../images/reading.svg';
import cel from '../../images/cal.svg';
import cel1 from '../../images/cal1.svg';
import webAsseting from '../../images/webAsseting.svg';
import chart from "../../images/ChartPieSlice.png"
import shop from "../../images/ShoppingBagOpen-d.png"
import shopping from "../../images/ShoppingBagOpen-d.png"
import userP from "../../images/userProfile.png"
import "./sidebar.css"
import dock from '../../images/dock.png';

const leadItem = [
  {
    title: "Lead Dashboard",
    link: "/employeeDash/leadDash",
  },
  {
    title: "My Lead",
    link: "/employeeDash/myLead",
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

const LeaveManItem = [
  {
    title: "Manage Leave",
    link: "/adminDash/HRM/LeaveEmployee"
  },
  {
    title: "Leave Request",
    link: "/adminDash/HRM/leaveRequest"
  },
  // {
  //   title: "Mark Attendence",
  //   link: "/adminDash/HRM/markAttendance"
  // },
 
]

const hrAdminItems = [
  {
    title: "Award",
    link: "/adminDash/HRM/AwardHRM"
  },
  {
    title: "Transfer",
    link: "/adminDash/HRM/TransferHRM"
  },
  {
    title: "Regisnation",
    link: "/adminDash/HRM/ResignationHRM"
  },
  {
    title: "Promotion",
    link: "/adminDash/HRM/PromotionHRM"
  },
  {
    title: "Complaints",
    link: "/adminDash/HRM/ComplaintsHRM"
  },
  {
    title: "Warning",
    link: "/adminDash/HRM/WarningHRM"
  },
  {
    title: "Termination",
    link: "/adminDash/HRM/TerminationHRM"
  },
  {
    title: "Holiday",
    link: "/adminDash/HRM/holiday" 
  },
  {
    title:"Announcement",
    link:"/adminDash/announcement"
  }
]

const payrols = [
  {
    title:"Set Salary",
    link:"/adminDash/setSallary"
  },
  {
    title:"Payslip",
    link:"/adminDash/payslip"
  },
]

const payrols2 = [
  {
    title:"Clients",
    link:"/adminDash/HRM/taskClients"
  },
  {
    title:"Projects",
    link:"/adminDash/HRM/taskProjects"
  },
  // {
  //   title:"Tasks",
  //   link:"/adminDash/HRM/Tasks"
  // },
]

const performances = [
  {
    title:"Indicator",
    link:"/performance/indicator"
  },
  {
    title:"Appraisal",
    link:"/performance/appraisal"
  },{
    title:"Goal Tracking",
    link:"/performance/goalTracking"
  }
]

const AdminSidebar = ({ pop, setPop }) => {

  const [payrollItem,setPayrollItem] = useState(0);

  let hrms_user = JSON?.parse(localStorage.getItem("hrms_user"));
  const { role } = hrms_user;

  let hrms_permission = JSON?.parse(localStorage.getItem("hrms_permission"));
   
  const { leadPermission, hrmsSetUpPermission, payrollPermission, leadSystemPermission, attendencePermission, assetsPermission, documentPermission, leaveManagePermission, performancePermission, employeeManagePermission , hrAdminSetupPermission , trainingSetupPermission } = hrms_permission;

  const [performanceItem,setPerformanceItem] = useState(0);

  const [trainingItem,setTrainingItem] = useState(0);

  const [leveItem,setLeveItem] = useState(0);

  const [hrItem,setHrItem] = useState(0);

  const [start,setStart] = useState(false);

  const navigate = useNavigate();

  const [openDashItem, setOpenDashItem] = useState(false);
  const [openPayroll,setOpenPayroll] = useState(false);
  const [openPayroll2,setOpenPayroll2] = useState(false);

  const [openLeaveMan, setOpenLeaveMan] = useState(false);

  const [openPerform,setOpenPerform] = useState(false);
  const [openPerform2,setOpenPerform2] = useState(false);

  const [openTraining,setOpenTraining] = useState(false);

  const [openHr,setOpenHr] = useState(false);

  const stylepoo = {
     display:start ? "block" : "none"
  }

  return (
    <>
     
      <i onClick={()=> setStart(!start)} class="fa-solid fa-bars same_bar"></i>
      {/* -translate-x-full sm:translate-x-0 */}

   

{
  role === "ADMIN" && 
  <aside
  style={stylepoo}
  id="sidebar-multi-level-sidebar"
  className="fixed top-0 olo left-0 z-40 w-64 h-screen transition-transform oppl  sidebars"
  aria-label="Sidebar"

>

  <div className="h-full olo1 px-3 py-4 overflow-y-auto sidebars sidebars1">

    <div className="allDasCon">

      {/* <-------------dashboard----------------> */}
      <div className="adDasWrap">

        {/* dashboard  */}
      <NavLink to="/adminDash/HRM"><div
          onClick={() => setOpenDashItem((prev) => !prev)}
          className={`${window.location.pathname === "/adminDash/HRM" ? "hh" : ""} side-dash-box`}
        >
          <div className="dash-wrap">
            <img src={`${window.location.pathname==="/adminDash/HRM" ? saka : gridDas}`} alt="gridDas" />
            <p className={`${window.location.pathname==="/adminDash/HRM" ? "fan" : ""}`}>Dashboard</p>
          </div>

          {/* <img src={`${window.location.pathname === "/adminDash/HRM" ? null : expand_more}`} alt="" /> */}
        </div></NavLink>
      </div>

     {/* ================persmission  start============= */}
    <NavLink to="/adminDash/permission"><div className={`${window.location.pathname === "/adminDash/permission"  ? "hh" : ""} setWrap`}>
        {/* <p>Setting</p> */}
        <div className="systSset">
          <img src={`${window.location.pathname === "/adminDash/permission" ? leaderboard1 : leaderboard}`} alt="" />
          <span className={`${window.location.pathname==="/adminDash/permission"  ? "fan" : ""}`}>Permission </span>
        </div>
      </div></NavLink>


{/* lead management start  */}

    <NavLink to="/adminDash/leadDash"><div className={`${window.location.pathname === "/adminDash/leadDash" || window.location.pathname === "/adminDash/myLead" || window.location.pathname === "/adminDash/editLead" || window.location.pathname === "/adminDash/createLead" || window.location.pathname === "/adminDash/importLead/:id" || window.location.pathname === "/adminDash/createQuotation" || window.location.pathname === "/adminDash/editQuotation" ? "hh" : ""} setWrap`}>
        {/* <p>Setting</p> */}
        <div className="systSset">
          <img src={`${window.location.pathname === "/adminDash/leadDash" || window.location.pathname === "/adminDash/myLead" || window.location.pathname === "/adminDash/editLead" || window.location.pathname === "/adminDash/createLead" || window.location.pathname === "/adminDash/importLead/:id" || window.location.pathname === "/adminDash/createQuotation" || window.location.pathname === "/adminDash/editQuotation" ? leaderboard1 : leaderboard}`} alt="" />
          <span className={`${window.location.pathname==="/adminDash/leadDash" || window.location.pathname === "/adminDash/myLead" || window.location.pathname === "/adminDash/editLead" || window.location.pathname === "/adminDash/createLead" || window.location.pathname === "/adminDash/importLead/:id" || window.location.pathname === "/adminDash/createQuotation" || window.location.pathname === "/adminDash/editQuotation" ? "fan" : ""}`}>Lead Management</span>
        </div>
      </div></NavLink>
    {/* =========================lead management end================== */}

  
           {/* =================task start============ */}

    <div
          onClick={() => setOpenPayroll2((prev) => !prev)}
          className="side-dash-box"
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

        {/*   lead system setting start */}

        <NavLink to="/adminDash/LeadSystemSetting"><div className={`${window.location.pathname === "/adminDash/LeadSystemSetting"  ? "hh" : ""} setWrap`}>
        {/* <p>Setting</p> */}
        <div className="systSset">
          <img src={`${window.location.pathname === "/adminDash/LeadSystemSetting"   ? perty : employee}`} alt="" />
          <span className={`${window.location.pathname==="/adminDash/LeadSystemSetting" ? "fan" : ""}`}>Lead System Setting</span>
        </div>
      </div></NavLink>

        {/*   lead system setting end */}


       {/* ===================Hr manamgement start========= */}
       <div
          onClick={() => setOpenPerform2((prev) => !prev)}
          className="side-dash-box"
        >
          <div className="dash-wrap">
            <img src={reading} alt="dasg" />
            <p>Hr Management</p>
          </div>

          <img src={vect} alt="vect" />
        </div>

        {openPerform2 && (
          <div className="alladminDash-item">

               {/* =====================employee management================ */}
    <NavLink to="/adminDash/HRM/employeeManagement"><div className={`${window.location.pathname === "/adminDash/HRM/employeeManagement" || window.location.pathname === "/adminDash/EmployeeDetails" || window.location.pathname === "/adminDash/EmployeeMan" || window.location.pathname === "/adminDash/EmployeeMan/:id"  ? "hh" : ""} setWrap`}>
        {/* <p>Setting</p> */}
        <div className="systSset">
          <img src={`${window.location.pathname === "/adminDash/HRM/employeeManagement" || window.location.pathname === "/adminDash/EmployeeDetails" || window.location.pathname === "/adminDash/EmployeeMan" || window.location.pathname === "/adminDash/EmployeeMan/:id"  ? perty : employee}`} alt="" />
          <span className={`${window.location.pathname==="/adminDash/HRM/employeeManagement" || window.location.pathname === "/adminDash/EmployeeDetails" || window.location.pathname === "/adminDash/EmployeeMan" || window.location.pathname === "/adminDash/EmployeeMan/:id"  ? "fan" : ""}`}>Employee Management</span>
        </div>
      </div></NavLink>

    {/* ================employee management end======================== */}

     {/* ===============hrm system setup start================ */}
     <NavLink to="/adminDash/HRM/HRMsystemSetup"><div className={`${window.location.pathname === "/adminDash/HRM/HRMsystemSetup"  ? "hh" : ""} setWrap`}>
        {/* <p>Setting</p> */}
        <div className="systSset">
          <img src={`${window.location.pathname === "/adminDash/HRM/HRMsystemSetup"   ? perty : employee}`} alt="" />
          <span className={`${window.location.pathname==="/adminDash/HRM/HRMsystemSetup" ? "fan" : ""}`}>Hrm System Setup</span>
        </div>
      </div></NavLink>
    {/* =====================hrm system setup end============= */}

      {/* =================payroll management start============ */}

      <div
          onClick={() => setOpenPayroll((prev) => !prev)}
          className="side-dash-box"
        >
          <div className="dash-wrap">
            <img src={anal} alt="dasg" />
            <p>Payroll Management</p>
          </div>

          <img src={vect} alt="" />
        </div>

        {openPayroll && (
          <div className="alladminDash-item">
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

            {/* ===================performance setup start========= */}
            <div
          onClick={() => setOpenPerform((prev) => !prev)}
          className="side-dash-box"
        >
          <div className="dash-wrap">
            <img src={reading} alt="dasg" />
            <p>Performance Setup</p>
          </div>

          <img src={vect} alt="vect" />
        </div>

        {openPerform && (
          <div className="alladminDash-item">
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
        {/* ====================performance setup end============ */}

{/* ================attendence management start=========== */}
<NavLink to="/adminDash/HRM/markAttendance"><div className={`${window.location.pathname === "/adminDash/HRM/markAttendance"  ? "hh" : ""} setWrap`}>
        <div className="systSset">
          <img src={`${window.location.pathname === "/adminDash/HRM/markAttendance"   ? cel1 : cel}`} alt="" />
          <span className={`${window.location.pathname==="/adminDash/HRM/markAttendance" ? "fan" : ""}`}>Attendance Management</span>
        </div>
      </div></NavLink>
        {/* =====================attendence management end============ */}

           {/* ==================document  start================ */}
           <NavLink to="/adminDash/documentManagement"><div className={`${window.location.pathname === "/adminDash/documentManagement"  ? "hh" : ""} setWrap`}>
        {/* <p>Setting</p> */}
        <div className="systSset">
          {/* <img src={window.location.pathname==="/adminDash/documentManagement" ? "fan" : ""} alt="" /> */}
          <img width="20" src={dock} alt=""/>
          <span className={`${window.location.pathname==="/adminDash/documentManagement" ? "fan" : ""}`}>Document Management</span>
        </div>
      </div></NavLink>
        {/* ====================document end==================== */}

         {/* ==================leave Management start============= */}
         <div
          onClick={() => setOpenLeaveMan((prev) => !prev)}
          className="side-dash-box"
        >
          <div className="dash-wrap">
            <img src={reading} alt="dasg" />
            <p>Leave Management Setup</p>
          </div>

          <img src={vect} alt="vect" />
        </div>

        {openLeaveMan && (
          <div className="alladminDash-item">
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
        {/* =================leave management end==================== */}

           
          </div>
        )}
        {/* ====================Hr management end============ */}

        {/* ==================assets management start================ */}
        <NavLink to="/performance/Assets"><div className={`${window.location.pathname === "/performance/Assets"  ? "hh" : ""} setWrap`}>
        {/* <p>Setting</p> */}
        <div className="systSset">
        <img src={`${window.location.pathname === "/performance/Assets"   ? webAsseting : webAsseting}`} alt="" />
          <span className={`${window.location.pathname==="/performance/Assets" ? "fan" : ""}`}>Assets Management</span>
        </div>
      </div></NavLink>

        {/* ====================assets management end==================== */}

        <NavLink to="/adminDash/HRM/Expense"><div className={`${window.location.pathname === "/adminDash/HRM/Expense"  ? "hh" : ""} setWrap`}>
        {/* <p>Setting</p> */}
        <div className="systSset">
          <img src={`${window.location.pathname === "/adminDash/HRM/Expense" ? leaderboard1 : leaderboard}`} alt="" />
          <span className={`${window.location.pathname==="/adminDash/HRM/Expense"  ? "fan" : ""}`}>Items </span>
        </div>
      </div></NavLink>
  

        {/* =================training setup start============= */}
        {/* <div
          onClick={() => setOpenTraining((prev) => !prev)}
          className="side-dash-box"
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
        )} */}
        {/* ===================training setup end=============== */}    

        {/* ===============hr admin setup start============ */}

        <div
          onClick={() => setOpenHr((prev) => !prev)}
          className="side-dash-box"
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
                  // setOpenLeaveMan(true);
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

      {/* <---------------System setting------------------> */}
      <div className="setWrap">
        {/* <p>Setting</p> */}
        <div className="systSset">
          <img src={adminSetting} alt="" />
          <span>System Settings</span>
        </div>
      </div>

    </div>

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

  </div>

</aside>

  }


            {
              role === "EMPLOYEE" && 

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
                      {/* <p>Setting</p> */}
                      <div className="systSset">
                        <img src={`${window.location.pathname === "/employeeDash/leadDash" || window.location.pathname === "/employeeDash/myLead" || window.location.pathname === "/employeeDash/editLead" || window.location.pathname === "/employeeDash/createLead" || window.location.pathname === "/employeeDash/importLead/:id" || window.location.pathname === "/employeeDash/createQuotation" || window.location.pathname === "/employeeDash/editQuotation" ? leaderboard1 : leaderboard}`} alt="" />
                        <span className={`${window.location.pathname === "/employeeDash/leadDash" || window.location.pathname === "/employeeDash/myLead" || window.location.pathname === "/employeeDash/editLead" || window.location.pathname === "/employeeDash/createLead" || window.location.pathname === "/employeeDash/importLead/:id" || window.location.pathname === "/employeeDash/createQuotation" || window.location.pathname === "/employeeDash/editQuotation" ? "fan" : ""}`}>Lead Management</span>
                      </div>
                    </div></NavLink>
      
                  }
                  {
                    payrollPermission &&
                    <>
                      {/* =================payroll management start============ */}
      
                      <div
                        onClick={() => setOpenPayroll((prev) => !prev)}
                        className="side-dash-box"
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
                        className="side-dash-box"
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
                        className="side-dash-box"
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
                className="side-dash-box"
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

<div
                onClick={() => setOpenHr((prev) => !prev)}
                className="side-dash-box"
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
                        // setOpenLeaveMan(true);
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
        
        </>
      }
      
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
      
      
                  {/* {
                    user?.designation === "Intern Digital Marketing" || user?.designation === "Business Development Manager" ? <li className="mostwrap">
      
                      <h2 onClick={() => setOpenLead((prev) => !prev)} className="leadHead"> <img src={shopping} alt="" /> <span> Lead Management</span></h2>
      
                      {
                        openLead &&
                        <div className="leadWrapp2">
                          {
      
                            leadItem?.map((item, index) => (
                              <p key={index} className="leadHead2" onClick={() => navigate(item?.link)}>{item.title}</p>
                            ))
      
                          }
      
                        </div>
      
                      }
      
                    </li> : ""
                  } */}
      
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
      
            }

      
      <div style={stylepoo}  className="p-0 sm:ml-64 oppl"></div>

      {pop && <Managment setPop={setPop} />}


    </>
  );
};

export default AdminSidebar;

{
  /* <NavLink to="/adminDash">
              <li className="most">
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <img width={16} src={dots} alt="dots" />
                  <span className="ml-3">Dashboard</span>
                </a>
              </li>
            </NavLink>

            <NavLink to="/adminDash/profile-management">
            <li className="most">
              <button
                type="button"
                className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <img width={16} src={lokia} alt="lokia" />
                <span
                  className="flex-1 ml-2 text-left whitespace-nowrap"
                  sidebar-toggle-item
                >
                  Employee Information
                </span>
                <svg
                  sidebar-toggle-item
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <ul id="dropdown-example" className="hidden py-2 space-y-2">
                <li>
                  <a
                    href="#"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Billing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Invoice
                  </a>
                </li>
              </ul>
            </li>
            </NavLink>


            <NavLink to="#!">
              {" "}
              <li className="most">
                <button
                  type="button"
                  className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  aria-controls="dropdown-example"
                  data-collapse-toggle="dropdown-example"
                >
                  <img width={16} src={calling} alt="lokia" />
                  <span
                    className="flex-1 ml-3 text-left whitespace-nowrap"
                    sidebar-toggle-item
                  >
                    Inbox
                  </span>
                  <svg
                    sidebar-toggle-item
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
                <ul id="dropdown-example" className="hidden py-2 space-y-2">
                  <li>
                    <a
                      href="#"
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Products
                    </a>
                  </li>
                </ul>
              </li>
            </NavLink> */
}




// ! old core ///////

// import React, { useState } from "react";
// import dots from "../../images/dots.png";
// import lokia from "../../images/lokia.png";
// import calling from "../../images/calling.png";
// import earth from "../../images/earth.png";
// import pdf from "../../images/pdf.png";
// import chakka from "../../images/chakka.png";
// import kushel1 from "../../images/kushel1.png";
// import Managment from "../Management/Managment";
// import { NavLink, useNavigate } from "react-router-dom";
// import dashboard from "../../images/dashboard.png";
// import expand_more from "../../images/expand_more.png";

// import chooseDash from "../../images/choosedash.png";
// import unchosedash from "../../images/unchosedash.png";

// import adminSetting from "../../images/adminSetting.png"
// import { IoIosArrowDown } from "react-icons/io";


// // import {user} from '../../../hooks/useMain'
// import "./sidebar.css"

// const dashboardItem = [
//   {
//     title: "HRM",
//     link: "/adminDash/HRM"
//   },
//   {
//     title: "Accounting",
//   },
//   {
//     title: "CRM",
//   },
//   {
//     title: "Projects",
//   },
// ];

// const HRMSItem = [
//   {
//     title: "Employee Management",
//     link: "/adminDash/HRM/employeeManagement"
//   },
//   {
//     title: "HRM System Setup",
//     link: "/adminDash/HRM/HRMsystemSetup"
//   },
//   {
//     title: "Performance Setup",
   
//   },
//   {
//     title: "Employees Asset Setup",
//     link: "/performance/Assets"
//   },
  
// ]

// const performanceItem = [
//   {
//     title: "Indicator",
//     link: "/performance/indicator"
//   },
//   {
//     title: "Appraisal",
//     link: "/performance/appraisal"
//   },
//   {
//     title: "Goal Tracking",
//     link: "/performance/goalTracking"
//   },
// ]

// const AdminSidebar = ({ pop, setPop }) => {
//   const [dashItem, setDashItem] = useState(0);

//   const [HRMS, setHRMS] = useState(null);

//   const navigate = useNavigate();

//   const [openDashItem, setOpenDashItem] = useState(false);
//   const [openHRMSItem, setOpenHRMSItem] = useState(false);

//   const [openPerfor , setOpenPer] = useState(false);

//   return (
//     <>
//       <button
//         data-drawer-target="sidebar-multi-level-sidebar"
//         data-drawer-toggle="sidebar-multi-level-sidebar"
//         aria-controls="sidebar-multi-level-sidebar"
//         type="button"
//         className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//       >
//         <span className="sr-only">Open sidebar</span>
//         <svg
//           className="w-6 h-6"
//           aria-hidden="true"
//           fill="currentColor"
//           viewBox="0 0 20 20"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             clipRule="evenodd"
//             fillRule="evenodd"
//             d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
//           ></path>
//         </svg>
//       </button>

//       <aside
//         id="sidebar-multi-level-sidebar"
//         className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 sidebars"
//         aria-label="Sidebar"
//       >
//         {/* <div className="logobar">
//           <img src={kushel1} alt="" />
//         </div> */}

//         <div className="h-full px-3 py-4 overflow-y-auto sidebars sidebars1">

//           <div className="allDasCon">

//             {/* <-------------dashboard----------------> */}
//             <div className="adDasWrap">

//               {/* dashboard  */}
//               <div
//                 onClick={() => setOpenDashItem((prev) => !prev)}
//                 className="side-dash-box"
//               >
//                 <div className="dash-wrap">
//                   <img src={dashboard} alt="" />
//                   <p>Dashboard</p>
//                 </div>

//                 <img src={expand_more} alt="" />
//               </div>

//               {openDashItem && (
//                 <div className="alladminDash-item">
//                   {dashboardItem?.map((item, index) => (
//                     <div
//                       onClick={() => {
//                         setDashItem(index)
//                         navigate(item?.link)
//                       }

//                       }
//                       className="sinADDasItem"
//                       key={index}
//                     >
//                       {dashItem == index ? (
//                         <img src={chooseDash} alt="" />
//                       ) : (
//                         <img src={unchosedash} alt="" />
//                       )}
//                       <p
//                         className={` ${dashItem === index ? "dashItemp" : "dITitl"
//                           }`}
//                       >
//                         {item?.title}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               )}

//             </div>


//            {/* <-----------HRMS--------------> */}
//             <div onClick={()=>setOpenHRMSItem((prev)=>!prev)}  className="HRMS-dash-box"
//             >
//               <div className="HRMS-wrap">
//                 <img src={unchosedash} alt="" />
//                 <p>HRMS</p>
//               </div>

//               <img src={expand_more} alt="" />
//             </div>

//             {openHRMSItem && (
//               <div className="alladminDash-item">
//                 {HRMSItem?.map((item, index) => (
//                    item.title === "Performance Setup"?

//                     <div className="performaceSetup ">
    
//                    <div key={index} onClick={()=>setOpenPer((prev)=>!prev)}  className="sinADDasItem relative">

//            {dashItem == index ? (
//                       <img src={chooseDash} alt="" />
//                     ) : (
//                       <img src={unchosedash} alt="" />
//                     )}
//                     <p
//                       className={` ${
//                         HRMS === index ? "dashItemp" : "dITitl"
//                       }`}
//                     >
//                       {item?.title}
//                     </p>

                   
//                          <p><IoIosArrowDown className="text-white absolute right-6 top-[30%] " /></p>
       
//                    </div>

//                    {
//                     openPerfor && 
//                     <div>

// {
//   performanceItem?.map((item ,index)=>(
//     <div
                  
//     onClick={()=>{
//       setHRMS(index)
//       navigate(item?.link)
//     }}
//     className="sinADDasItem"
//     key={index}
//   >
//     {dashItem == index ? (
//       <img src={chooseDash} alt="" />
//     ) : (
//       <img src={unchosedash} alt="" />
//     )}
//     <p
//       className={` ${
//         HRMS === index ? "dashItemp" : "dITitl"
//       }`}
//     >
//       {item?.title}
//     </p>
//   </div>
//   ))
// }
                 
//                     </div>
//                    }

//                    </div>

//                    :

//                   <div
                  
//                     onClick={()=>{
//                       setHRMS(index)
//                       navigate(item?.link)
//                     }}
//                     className="sinADDasItem"
//                     key={index}
//                   >
//                     {dashItem == index ? (
//                       <img src={chooseDash} alt="" />
//                     ) : (
//                       <img src={unchosedash} alt="" />
//                     )}
//                     <p
//                       className={` ${
//                         HRMS === index ? "dashItemp" : "dITitl"
//                       }`}
//                     >
//                       {item?.title}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}





//             {/* <---------------System setting------------------> */}
//             <div className="setWrap">
//               {/* <p>Setting</p> */}
//               <div className="systSset">
//                 <img src={adminSetting} alt="" />
//                 <span>System Settings</span>
//               </div>
//             </div>


//           </div>

//           <div className="red-box">
//             <div className="white-box">
//               <img src={chakka} alt="chakka" />
//               <div className="black-box">
//                 <h3>Need Help?</h3>
//                 <p>Our support team is ready for you</p>
//                 <button>Get Help</button>
//               </div>
//             </div>
//           </div>

//         </div>
//       </aside>

//       <div className="p-0 sm:ml-64"></div>

//       {pop && <Managment setPop={setPop} />}
//     </>
//   );
// };

// export default AdminSidebar;

// {
//   /* <NavLink to="/adminDash">
//               <li className="most">
//                 <a
//                   href="#"
//                   className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
//                 >
//                   <img width={16} src={dots} alt="dots" />
//                   <span className="ml-3">Dashboard</span>
//                 </a>
//               </li>
//             </NavLink>

//             <NavLink to="/adminDash/profile-management">
//             <li className="most">
//               <button
//                 type="button"
//                 className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
//                 aria-controls="dropdown-example"
//                 data-collapse-toggle="dropdown-example"
//               >
//                 <img width={16} src={lokia} alt="lokia" />
//                 <span
//                   className="flex-1 ml-2 text-left whitespace-nowrap"
//                   sidebar-toggle-item
//                 >
//                   Employee Information
//                 </span>
//                 <svg
//                   sidebar-toggle-item
//                   className="w-6 h-6"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                     clipRule="evenodd"
//                   ></path>
//                 </svg>
//               </button>
//               <ul id="dropdown-example" className="hidden py-2 space-y-2">
//                 <li>
//                   <a
//                     href="#"
//                     className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
//                   >
//                     Products
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
//                   >
//                     Billing
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
//                   >
//                     Invoice
//                   </a>
//                 </li>
//               </ul>
//             </li>
//             </NavLink>


//             <NavLink to="#!">
//               {" "}
//               <li className="most">
//                 <button
//                   type="button"
//                   className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
//                   aria-controls="dropdown-example"
//                   data-collapse-toggle="dropdown-example"
//                 >
//                   <img width={16} src={calling} alt="lokia" />
//                   <span
//                     className="flex-1 ml-3 text-left whitespace-nowrap"
//                     sidebar-toggle-item
//                   >
//                     Inbox
//                   </span>
//                   <svg
//                     sidebar-toggle-item
//                     className="w-6 h-6"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                       clipRule="evenodd"
//                     ></path>
//                   </svg>
//                 </button>
//                 <ul id="dropdown-example" className="hidden py-2 space-y-2">
//                   <li>
//                     <a
//                       href="#"
//                       className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
//                     >
//                       Products
//                     </a>
//                   </li>
//                 </ul>
//               </li>
//             </NavLink> */
// }
