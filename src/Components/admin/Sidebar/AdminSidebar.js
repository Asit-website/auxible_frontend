import React, { useEffect, useState } from "react";
import chakka from "../../images/chakka.png";
import Managment from "../Management/Managment";
import { NavLink, useNavigate } from "react-router-dom";
import gridDas from "../../images/gridDas.svg";
import saka from "../../images/saka.svg";
import adminSetting from "../../images/adminSetting.png";
import leaderboard from "../../images/leaderboard.svg";
import leaderboard1 from "../../images/leaderboard1.svg";
import employee from "../../images/employee.svg";
import perty from "../../images/perty.svg";
import anal from "../../images/anal.svg";
import vect from "../../images/vect.svg";
import tyming from "../../images/tyming.svg";
import fiber from "../../images/fiber.svg";
import reading from "../../images/reading.svg";
import cel from "../../images/cal.svg";
import cel1 from "../../images/cal1.svg";
import webAsseting from "../../images/webAsseting.svg";
import chart from "../../images/ChartPieSlice.png";
import shop from "../../images/ShoppingBagOpen-d.png";
import userP from "../../images/userProfile.png";
import "./sidebar.css";
import dock from "../../images/documenticon.png";
import analytics from "../../images/analytics.svg";
import readliness from "../../images/readlines.svg";


const trainingItems = [
  {
    title: "Training list",
    link: "/training/TrainingList",
  },
  {
    title: "Trainer",
    link: "/training/TrainerHRM",
  },
];

const LeaveManItem = [
  {
    title: "Manage Leave",
    link: "/adminDash/HRM/LeaveEmployee",
  },
  {
    title: "Leave Request",
    link: "/adminDash/HRM/leaveRequest",
  },

];

const hrAdminItems = [
  {
    title: "Award",
    link: "/adminDash/HRM/AwardHRM",
  },
  {
    title: "Transfer",
    link: "/adminDash/HRM/TransferHRM",
  },
  {
    title: "Regisnation",
    link: "/adminDash/HRM/ResignationHRM",
  },
  {
    title: "Promotion",
    link: "/adminDash/HRM/PromotionHRM",
  },
  {
    title: "Complaints",
    link: "/adminDash/HRM/ComplaintsHRM",
  },
  {
    title: "Warning",
    link: "/adminDash/HRM/WarningHRM",
  },
  {
    title: "Termination",
    link: "/adminDash/HRM/TerminationHRM",
  },
  {
    title: "Holiday",
    link: "/adminDash/HRM/holiday",
  },
  {
    title: "Announcement",
    link: "/adminDash/announcement",
  },
];

const payrols = [
  {
    title: "Set Salary",
    link: "/adminDash/setSallary",
  },
  {
    title: "Payslip",
    link: "/adminDash/payslip",
  },
];

const payrols2 = [
  {
    title: "Clients",
    link: "/adminDash/HRM/taskClients",
  },
  {
    title: "Projects",
    link: "/adminDash/HRM/taskProjects",
  },
];

const performances = [
  {
    title: "Indicator",
    link: "/performance/indicator",
  },
  {
    title: "Appraisal",
    link: "/performance/appraisal",
  },
  {
    title: "Goal Tracking",
    link: "/performance/goalTracking",
  },
];

const AdminSidebar = ({ pop, setPop }) => {
  const [payrollItem, setPayrollItem] = useState(0);

  let hrms_user = JSON?.parse(localStorage.getItem("hrms_user"));
  const { role } = hrms_user;

  let hrms_permission = JSON?.parse(localStorage.getItem("hrms_permission"));

  const {
    leadPermission,
    hrmsSetUpPermission,
    payrollPermission,
    leadSystemPermission,
    attendencePermission,
    assetsPermission,
    documentPermission,
    leaveManagePermission,
    performancePermission,
    employeeManagePermission,
    hrAdminSetupPermission,
    trainingSetupPermission,
  } = hrms_permission;

  const [performanceItem, setPerformanceItem] = useState(0);

  const [trainingItem, setTrainingItem] = useState(0);

  const [leveItem, setLeveItem] = useState(0);

  const [hrItem, setHrItem] = useState(0);

  const [start, setStart] = useState(false);

  const navigate = useNavigate();

  const [openDashItem, setOpenDashItem] = useState(false);
  const [openPayroll, setOpenPayroll] = useState(false);
  const [openPayroll2, setOpenPayroll2] = useState(false);

  const [openLeaveMan, setOpenLeaveMan] = useState(false);

  const [openPerform, setOpenPerform] = useState(false);
  const [openPerform2, setOpenPerform2] = useState(false);

  const [openTraining, setOpenTraining] = useState(false);

  const [openHr, setOpenHr] = useState(false);

  const [openLead, setOpenLead] = useState(false);

  console.log("openLead" , openLead);

  const stylepoo = {
    display: start ? "block" : "none",
  };

  useEffect(() => {
    if (sessionStorage.getItem("leadManagmentAdmin")) {
      setOpenLead(sessionStorage.getItem("leadManagmentAdmin"));
    }
    if (sessionStorage.getItem("adminTaskManagement")) {
      setOpenPayroll2(sessionStorage.getItem("adminTaskManagement"));
    }
    if (sessionStorage.getItem("adminHrManagement")) {
      setOpenPerform2(sessionStorage.getItem("adminHrManagement"));
    }
    if (sessionStorage.getItem("adminHRSetup")) {
      setOpenHr(sessionStorage.getItem("adminHRSetup"));
    }

    //  SECOND CONDITION

    if (
      !(
        window.location.pathname === "/adminDash/leadDash" ||
        window.location.pathname === "/adminDash/LeadSystemSetting"
      )
    ) {
      setOpenLead(false);
    }
    if (
      !(
        window.location.pathname === "/adminDash/HRM/AwardHRM" ||
        window.location.pathname === "/adminDash/HRM/TransferHRM" || 
        window.location.pathname === "/adminDash/HRM/ResignationHRM"  ||
        window.location.pathname === "/adminDash/HRM/PromotionHRM"  ||
        window.location.pathname === "/adminDash/HRM/ComplaintsHRM" ||
        window.location.pathname === "/adminDash/HRM/WarningHRM" ||
        window.location.pathname === "/adminDash/HRM/TerminationHRM"  ||
        window.location.pathname === "/adminDash/HRM/holiday" ||
        window.location.pathname === "/adminDash/announcement" 
      )
    ) {
      setOpenHr(false);
    }
    if (
      !(
        window.location.pathname === "/adminDash/HRM/taskClients" ||
        window.location.pathname === "/adminDash/HRM/taskProjects"
      )
    ) {
      setOpenPayroll2(false);
    }
    if (
      !(
        window.location.pathname === "/adminDash/HRM/employeeManagement" ||
        window.location.pathname === "/adminDash/HRM/markAttendance" ||
        window.location.pathname === "/adminDash/HRM/LeaveEmployee" ||
        window.location.pathname === "/adminDash/HRM/leaveRequest" ||
        window.location.pathname === "/adminDash/setSallary" ||
        window.location.pathname === "/adminDash/payslip" ||
        window.location.pathname === "/adminDash/documentManagement" ||
        window.location.pathname === "/performance/indicator" ||
        window.location.pathname === "/performance/appraisal" ||
        window.location.pathname === "/performance/goalTracking" ||
        window.location.pathname === "/adminDash/HRM/HRMsystemSetup" ||
        window.location.pathname === "/performance/indicator" ||
        window.location.pathname === "/performance/indicator" ||
        window.location.pathname === "/performance/indicator"
      )
    ) {
      setOpenPerform2(false);
    }
  }, []);

  return (
    <>
      <i onClick={() => setStart(!start)} class="fa-solid fa-bars same_bar"></i>

      {role === "ADMIN" && (
        <aside
          style={stylepoo}
          id="sidebar-multi-level-sidebar"
          className="fixed top-0 olo  left-0 z-40 w-64 h-screen transition-transform oppl  sidebars"
          aria-label="Sidebar"
        >
          <div className="h-full olo1 px-3 py-4 overflow-y-auto sidebars sidebars1">
            <div className="allDasCon">
              
              {/* <-------------dashboard----------------> */}
              <div className="adDasWrap">
                <NavLink to="/adminDash/HRM">
                  <div
                    onClick={() => setOpenDashItem((prev) => !prev)}
                    className={`${
                      window.location.pathname === "/adminDash/HRM" ? "hh" : ""
                    } side-dash-box silom`}
                  >
                    <div className="dash-wrap">
                      <img
                        src={`${
                          window.location.pathname === "/adminDash/HRM"
                            ? saka
                            : gridDas
                        }`}
                        alt="gridDas"
                      />
                      <p
                        className={`${
                          window.location.pathname === "/adminDash/HRM"
                            ? "fan"
                            : ""
                        }`}
                      >
                        Dashboard
                      </p>
                    </div>

                  </div>
                </NavLink>
              </div>

              {/* ================persmission  start============= */}
              <NavLink to="/adminDash/permission">
                <div
                  className={`${
                    window.location.pathname === "/adminDash/permission"
                      ? "hh"
                      : ""
                  } setWrap`}
                >
                  {/* <p>Setting</p> */}
                  <div className="systSset">
                    <img
                      src={`${
                        window.location.pathname === "/adminDash/permission"
                          ? leaderboard1
                          : leaderboard
                      }`}
                      alt=""
                    />
                    <span
                      className={`${
                        window.location.pathname === "/adminDash/permission"
                          ? "fan"
                          : ""
                      }`}
                    >
                      Permission{" "}
                    </span>
                  </div>
                </div>
              </NavLink>

              {/* ============== lead management start ================= */}
              <div
                onClick={() => {
                  setOpenLead((prev) => !prev);
                  sessionStorage.setItem("leadManagmentAdmin", !openLead);
                }}
                className="side-dash-box silom"
              >
                <div className="dash-wrap">
                  <img
                    src={`${
                      window.location.pathname === "/adminDash/leadDash" ||
                      window.location.pathname === "/adminDash/myLead" ||
                      window.location.pathname === "/adminDash/editLead" ||
                      window.location.pathname === "/adminDash/createLead" ||
                      window.location.pathname ===
                        "/adminDash/importLead/:id" ||
                      window.location.pathname ===
                        "/adminDash/createQuotation" ||
                      window.location.pathname === "/adminDash/editQuotation" ||
                      window.location.pathname ===
                        "/adminDash/LeadSystemSetting"
                        ? leaderboard1
                        : leaderboard
                    }`}
                    alt=""
                  />
                  <p
                    className={`${
                      window.location.pathname === "/adminDash/leadDash" ||
                      window.location.pathname === "/adminDash/myLead" ||
                      window.location.pathname === "/adminDash/editLead" ||
                      window.location.pathname === "/adminDash/createLead" ||
                      window.location.pathname ===
                        "/adminDash/importLead/:id" ||
                      window.location.pathname ===
                        "/adminDash/createQuotation" ||
                      window.location.pathname === "/adminDash/editQuotation" ||
                      window.location.pathname ===
                        "/adminDash/LeadSystemSetting"
                        ? "semo"
                        : "none"
                    }  ${openLead && "semo"} `}
                  >
                    Lead Management
                  </p>
                </div>

                <img src={vect} alt="" />
              </div>

              {openLead && (
                <div className="alladminDash-item">
                  <NavLink to="/adminDash/leadDash">
                    <div
                      className={`${
                        window.location.pathname === "/adminDash/leadDash" ||
                        window.location.pathname === "/adminDash/myLead" ||
                        window.location.pathname === "/adminDash/editLead" ||
                        window.location.pathname === "/adminDash/createLead" ||
                        window.location.pathname ===
                          "/adminDash/importLead/:id" ||
                        window.location.pathname ===
                          "/adminDash/createQuotation" ||
                        window.location.pathname === "/adminDash/editQuotation"
                          ? "hh"
                          : ""
                      } setWrap`}
                    >
                      <div className="systSset">
                        <img
                          src={`${
                            window.location.pathname ===
                              "/adminDash/leadDash" ||
                            window.location.pathname === "/adminDash/myLead" ||
                            window.location.pathname ===
                              "/adminDash/editLead" ||
                            window.location.pathname ===
                              "/adminDash/createLead" ||
                            window.location.pathname ===
                              "/adminDash/importLead/:id" ||
                            window.location.pathname ===
                              "/adminDash/createQuotation" ||
                            window.location.pathname ===
                              "/adminDash/editQuotation"
                              ? leaderboard1
                              : leaderboard
                          }`}
                          alt=""
                        />
                        <span
                          className={`${
                            window.location.pathname ===
                              "/adminDash/leadDash" ||
                            window.location.pathname === "/adminDash/myLead" ||
                            window.location.pathname ===
                              "/adminDash/editLead" ||
                            window.location.pathname ===
                              "/adminDash/createLead" ||
                            window.location.pathname ===
                              "/adminDash/importLead/:id" ||
                            window.location.pathname ===
                              "/adminDash/createQuotation" ||
                            window.location.pathname ===
                              "/adminDash/editQuotation"
                              ? "fan"
                              : ""
                          }  lessfontweight`}
                        >
                          Lead
                        </span>
                      </div>
                    </div>
                  </NavLink>

                  <NavLink to="/adminDash/LeadSystemSetting">
                    <div
                      className={`${
                        window.location.pathname ===
                        "/adminDash/LeadSystemSetting"
                          ? "hh"
                          : ""
                      } setWrap`}
                    >
                      <div className="systSset">
                        <img
                          src={`${
                            window.location.pathname ===
                            "/adminDash/LeadSystemSetting"
                              ? perty
                              : employee
                          }`}
                          alt=""
                        />
                        <span
                          className={`${
                            window.location.pathname ===
                            "/adminDash/LeadSystemSetting"
                              ? "fan"
                              : ""
                          }  lessfontweight`}
                        >
                          Lead System Setting
                        </span>
                      </div>
                    </div>
                  </NavLink>
                </div>
              )}

              {/* =========================lead management end================== */}

              {/* =================task start============ */}

              <div
                onClick={() => {
                  setOpenPayroll2((prev) => !prev);
                  sessionStorage.setItem("adminTaskManagement", !openPayroll2);
                }}
                className="side-dash-box silom"
              >
                <div className="dash-wrap">
                  <img
                    src={`${
                      window.location.pathname ===
                        "/adminDash/HRM/taskClients" ||
                      window.location.pathname === "/adminDash/HRM/taskProjects"
                        ? analytics
                        : anal
                    }`}
                    alt="dasg"
                  />
                  <p
                    className={`${
                      window.location.pathname ===
                        "/adminDash/HRM/taskClients" ||
                      window.location.pathname === "/adminDash/HRM/taskProjects"
                        ? "semo"
                        : "none"
                    }  ${openPayroll2 && "semo"}`}
                  >
                    Task Management
                  </p>
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
                      }}
                      className="sinADDasItem"
                      key={index}
                    >
                      {payrollItem == index ? (
                        <img
                          src={`${
                            window.location.pathname === `${item?.link}`
                              ? fiber
                              : tyming
                          }`}
                          alt=""
                        />
                      ) : (
                        <img
                          src={`${
                            window.location.pathname === `${item?.link}`
                              ? fiber
                              : tyming
                          }`}
                          alt=""
                        />
                      )}
                      <p
                        className={` ${
                          payrollItem === index ? "dashItemp" : "dITitl"
                        } ${
                          window.location.pathname === `${item?.link}`
                            ? "fan"
                            : ""
                        } lessfontweight`}
                      >
                        {item?.title}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* ================= tak end============ */}

              {/* ===================Hr manamgement start========= */}
              <div
                onClick={() => {
                  setOpenPerform2((prev) => !prev);
                  sessionStorage.setItem("adminHrManagement", !openPerform2);
                }}
                className="side-dash-box silom"
              >
                <div className="dash-wrap">
                  <img
                    src={`${
                      window.location.pathname ===
                        "/adminDash/HRM/employeeManagement" ||
                      window.location.pathname ===
                        "/adminDash/HRM/markAttendance" ||
                      window.location.pathname ===
                        "/adminDash/HRM/LeaveEmployee" ||
                      window.location.pathname ===
                        "/adminDash/HRM/leaveRequest" ||
                      window.location.pathname === "/adminDash/setSallary" ||
                      window.location.pathname === "/adminDash/payslip" ||
                      window.location.pathname ===
                        "/adminDash/documentManagement" ||
                      window.location.pathname === "/performance/indicator" ||
                      window.location.pathname === "/performance/appraisal" ||
                      window.location.pathname ===
                        "/performance/goalTracking" ||
                      window.location.pathname ===
                        "/adminDash/HRM/HRMsystemSetup"
                        ? readliness
                        : reading
                    }`}
                    alt="dasg"
                  />
                  <p
                    className={`${
                      window.location.pathname ===
                        "/adminDash/HRM/employeeManagement" ||
                      window.location.pathname ===
                        "/adminDash/HRM/markAttendance" ||
                      window.location.pathname ===
                        "/adminDash/HRM/LeaveEmployee" ||
                      window.location.pathname ===
                        "/adminDash/HRM/leaveRequest" ||
                      window.location.pathname === "/adminDash/setSallary" ||
                      window.location.pathname === "/adminDash/payslip" ||
                      window.location.pathname ===
                        "/adminDash/documentManagement" ||
                      window.location.pathname === "/performance/indicator" ||
                      window.location.pathname === "/performance/appraisal" ||
                      window.location.pathname ===
                        "/performance/goalTracking" ||
                      window.location.pathname ===
                        "/adminDash/HRM/HRMsystemSetup"
                        ? "semo"
                        : "none"
                    }  ${openPerform2 && "semo"}`}
                  >
                    Hr Management
                  </p>
                </div>

                <img src={vect} alt="vect" />
              </div>

              {openPerform2 && (
                <div className="alladminDash-item">
                  {/* =====================employee management================ */}
                  <NavLink to="/adminDash/HRM/employeeManagement">
                    <div
                      className={`${
                        window.location.pathname ===
                          "/adminDash/HRM/employeeManagement" ||
                        window.location.pathname ===
                          "/adminDash/EmployeeDetails" ||
                        window.location.pathname === "/adminDash/EmployeeMan" ||
                        window.location.pathname ===
                          "/adminDash/EmployeeMan/:id"
                          ? "hh"
                          : ""
                      } setWrap`}
                    >
                      {/* <p>Setting</p> */}
                      <div className="systSset">
                        <img
                          src={`${
                            window.location.pathname ===
                              "/adminDash/HRM/employeeManagement" ||
                            window.location.pathname ===
                              "/adminDash/EmployeeDetails" ||
                            window.location.pathname ===
                              "/adminDash/EmployeeMan" ||
                            window.location.pathname ===
                              "/adminDash/EmployeeMan/:id"
                              ? perty
                              : employee
                          }`}
                          alt=""
                        />
                        <span
                          className={`${
                            window.location.pathname ===
                              "/adminDash/HRM/employeeManagement" ||
                            window.location.pathname ===
                              "/adminDash/EmployeeDetails" ||
                            window.location.pathname ===
                              "/adminDash/EmployeeMan" ||
                            window.location.pathname ===
                              "/adminDash/EmployeeMan/:id"
                              ? "fan"
                              : ""
                          } lessfontweight `}
                        >
                          Employee Management
                        </span>
                      </div>
                    </div>
                  </NavLink>

                  {/* ================employee management end======================== */}

                  {/* ================attendence management start=========== */}
                  <NavLink to="/adminDash/HRM/markAttendance">
                    <div
                      className={`${
                        window.location.pathname ===
                        "/adminDash/HRM/markAttendance"
                          ? "hh"
                          : ""
                      } setWrap`}
                    >
                      <div className="systSset">
                        <img
                          src={`${
                            window.location.pathname ===
                            "/adminDash/HRM/markAttendance"
                              ? cel1
                              : cel
                          }`}
                          alt=""
                        />
                        <span
                          className={`${
                            window.location.pathname ===
                            "/adminDash/HRM/markAttendance"
                              ? "fan"
                              : ""
                          }  lessfontweight`}
                        >
                          Attendance Management
                        </span>
                      </div>
                    </div>
                  </NavLink>
                  {/* =====================attendence management end============ */}

                  {/* ==================leave Management start============= */}
                  <div
                    onClick={() => setOpenLeaveMan((prev) => !prev)}
                    className="side-dash-box silom"
                  >
                    <div className="dash-wrap">
                      <img src={reading} alt="dasg" />
                      <p className="lessfontparas">Leave Management Setup</p>
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
                          }}
                          className="sinADDasItem"
                          key={index}
                        >
                          {leveItem == index ? (
                            <img
                              src={`${
                                window.location.pathname === `${item?.link}`
                                  ? fiber
                                  : tyming
                              }`}
                              alt=""
                            />
                          ) : (
                            <img
                              src={`${
                                window.location.pathname === `${item?.link}`
                                  ? fiber
                                  : tyming
                              }`}
                              alt=""
                            />
                          )}
                          <p
                            className={` ${
                              leveItem === index ? "dashItemp" : "dITitl"
                            } ${
                              window.location.pathname === `${item?.link}`
                                ? "fan"
                                : ""
                            } lessfontweight`}
                          >
                            {item?.title}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                  {/* =================leave management end==================== */}

                  {/* =================payroll management start============ */}

                  <div
                    onClick={() => setOpenPayroll((prev) => !prev)}
                    className="side-dash-box silom"
                  >
                    <div className="dash-wrap">
                      <img src={anal} alt="dasg" />
                      <p className="lessfontparas">Payroll Management</p>
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
                          }}
                          className="sinADDasItem"
                          key={index}
                        >
                          {payrollItem == index ? (
                            <img
                              src={`${
                                window.location.pathname === `${item?.link}`
                                  ? fiber
                                  : tyming
                              }`}
                              alt=""
                            />
                          ) : (
                            <img
                              src={`${
                                window.location.pathname === `${item?.link}`
                                  ? fiber
                                  : tyming
                              }`}
                              alt=""
                            />
                          )}
                          <p
                            className={`lessfontweight ${
                              payrollItem === index ? "dashItemp" : "dITitl"
                            } ${
                              window.location.pathname === `${item?.link}`
                                ? "fan"
                                : ""
                            }`}
                          >
                            {item?.title}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* =================payroll management end============ */}

                  {/* ==================document  start================ */}
                  <NavLink to="/adminDash/documentManagement">
                    <div
                      className={`${
                        window.location.pathname ===
                        "/adminDash/documentManagement"
                          ? "hh"
                          : ""
                      } setWrap`}
                    >
                      {/* <p>Setting</p> */}
                      <div className="systSset">
                        {/* <img src={window.location.pathname==="/adminDash/documentManagement" ? "fan" : ""} alt="" /> */}
                        <img width="20" src={dock} alt="" />
                        {/* <HiDocumentText width={20} height={20} /> */}

                        <span
                          className={` lessfontweight ${
                            window.location.pathname ===
                            "/adminDash/documentManagement"
                              ? "fan"
                              : ""
                          }`}
                        >
                          Document Management
                        </span>
                      </div>
                    </div>
                  </NavLink>
                  {/* ====================document end==================== */}

                  {/* ===================performance setup start========= */}
                  <div
                    onClick={() => setOpenPerform((prev) => !prev)}
                    className="side-dash-box silom"
                  >
                    <div className="dash-wrap">
                      <img src={reading} alt="dasg" />
                      <p className="lessfontparas">Performance Setup</p>
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
                          }}
                          className="sinADDasItem"
                          key={index}
                        >
                          {performanceItem == index ? (
                            <img
                              src={`${
                                window.location.pathname === `${item?.link}`
                                  ? fiber
                                  : tyming
                              }`}
                              alt=""
                            />
                          ) : (
                            <img
                              src={`${
                                window.location.pathname === `${item?.link}`
                                  ? fiber
                                  : tyming
                              }`}
                              alt=""
                            />
                          )}
                          <p
                            className={`lessfontweight ${
                              performanceItem === index ? "dashItemp" : "dITitl"
                            } ${
                              window.location.pathname === `${item?.link}`
                                ? "fan"
                                : ""
                            }`}
                          >
                            {item?.title}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                  {/* ====================performance setup end============ */}

                  {/* ===============hrm system setup start================ */}
                  <NavLink to="/adminDash/HRM/HRMsystemSetup">
                    <div
                      className={`${
                        window.location.pathname ===
                        "/adminDash/HRM/HRMsystemSetup"
                          ? "hh"
                          : ""
                      } setWrap`}
                    >
                      {/* <p>Setting</p> */}
                      <div className="systSset">
                        <img
                          src={`${
                            window.location.pathname ===
                            "/adminDash/HRM/HRMsystemSetup"
                              ? perty
                              : employee
                          }`}
                          alt=""
                        />
                        <span
                          className={` lessfontweight ${
                            window.location.pathname ===
                            "/adminDash/HRM/HRMsystemSetup"
                              ? "fan"
                              : ""
                          }`}
                        >
                          Hrm System Setup
                        </span>
                      </div>
                    </div>
                  </NavLink>
                  {/* =====================hrm system setup end============= */}
                </div>
              )}
              {/* ====================Hr management end============ */}

              {/* ==================assets management start================ */}
              <NavLink to="/performance/Assets">
                <div
                  className={`${
                    window.location.pathname === "/performance/Assets"
                      ? "hh"
                      : ""
                  } setWrap`}
                >
                  {/* <p>Setting</p> */}
                  <div className="systSset">
                    <img
                      src={`${
                        window.location.pathname === "/performance/Assets"
                          ? webAsseting
                          : webAsseting
                      }`}
                      alt=""
                    />
                    <span
                      className={`${
                        window.location.pathname === "/performance/Assets"
                          ? "fan"
                          : ""
                      }`}
                    >
                      Assets Management
                    </span>
                  </div>
                </div>
              </NavLink>

              {/* ====================assets management end==================== */}

              <NavLink to="/adminDash/HRM/Expense">
                <div
                  className={`${
                    window.location.pathname === "/adminDash/HRM/Expense"
                      ? "hh"
                      : ""
                  } setWrap`}
                >
                  {/* <p>Setting</p> */}
                  <div className="systSset">
                    <img
                      src={`${
                        window.location.pathname === "/adminDash/HRM/Expense"
                          ? leaderboard1
                          : leaderboard
                      }`}
                      alt=""
                    />
                    <span 
                      className={` addonefont ${
                        window.location.pathname === "/adminDash/HRM/Expense"
                          ? "fan"
                          : ""
                      }`}
                    >
                      Items{" "}
                    </span>
                  </div>
                </div>
              </NavLink>

              {/* =================training setup start============= */}

              {/* ===================training setup end=============== */}

              {/* ===============hr admin setup start============ */}

              <div
                onClick={() => {
                  setOpenHr((prev) => !prev);
                  sessionStorage.setItem("adminHRSetup" , !openHr);
                }}
                className="side-dash-box silom"
              >
                <div className="dash-wrap">
                  <img src={reading} alt="dasg" />
                  <p className={` ${openHr && "fan"}`} >Hr Admin Setup</p>
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
                      }}
                      className="sinADDasItem"
                      key={index}
                    >
                      {hrItem == index ? (
                        <img
                          src={`${
                            window.location.pathname === `${item?.link}`
                              ? fiber
                              : tyming
                          }`}
                          alt=""
                        />
                      ) : (
                        <img
                          src={`${
                            window.location.pathname === `${item?.link}`
                              ? fiber
                              : tyming
                          }`}
                          alt=""
                        />
                      )}
                      <p
                        className={` ${
                          hrItem === index ? "dashItemp" : "dITitl"
                        } ${
                          window.location.pathname === `${item?.link}`
                            ? "fan"
                            : ""
                        } lessfontweight`}
                      >
                        {item?.title}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* =================hr admin setup end================= */}

           
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
      )}

      {role === "EMPLOYEE" && (
        <aside
          id="sidebar-multi-level-sidebar"
          className="fixed top-0 olo left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 sidebars"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto  sidebars sidebars1">
            <ul className="allNavItem">
              <NavLink to="/employeeDash">
                <li className="dashNW">
                  <img src={chart} alt="" />
                  <a href="#" className=" ">
                    <span className="">Dashboard</span>
                  </a>
                </li>
              </NavLink>

              {hrmsSetUpPermission && (
                <NavLink to="/employeeDash/HRM/HRMsystemSetup">
                  <div
                    className={`${
                      window.location.pathname ===
                      "/employeeDash/HRM/HRMsystemSetup"
                        ? "hh"
                        : ""
                    } setWrap`}
                  >
                    <div className="systSset">
                      <img
                        src={`${
                          window.location.pathname ===
                          "/employeeDash/HRM/HRMsystemSetup"
                            ? perty
                            : employee
                        }`}
                        alt=""
                      />
                      <span
                        className={`lessfontweight ${
                          window.location.pathname ===
                          "/employeeDash/HRM/HRMsystemSetup"
                            ? "fan"
                            : ""
                        }`}
                      >
                        Hrms System Setup
                      </span>
                    </div>
                  </div>
                </NavLink>
              )}

              {leadPermission && (
                <NavLink to="/employeeDash/leadDash">
                  <div
                    className={`${
                      window.location.pathname === "/employeeDash/leadDash" ||
                      window.location.pathname === "/employeeDash/myLead" ||
                      window.location.pathname === "/employeeDash/editLead" ||
                      window.location.pathname === "/employeeDash/createLead" ||
                      window.location.pathname ===
                        "/employeeDash/importLead/:id" ||
                      window.location.pathname ===
                        "/employeeDash/createQuotation" ||
                      window.location.pathname === "/employeeDash/editQuotation"
                        ? "hh"
                        : ""
                    } setWrap`}
                  >
                    {/* <p>Setting</p> */}
                    <div className="systSset">
                      <img
                        src={`${
                          window.location.pathname ===
                            "/employeeDash/leadDash" ||
                          window.location.pathname === "/employeeDash/myLead" ||
                          window.location.pathname ===
                            "/employeeDash/editLead" ||
                          window.location.pathname ===
                            "/employeeDash/createLead" ||
                          window.location.pathname ===
                            "/employeeDash/importLead/:id" ||
                          window.location.pathname ===
                            "/employeeDash/createQuotation" ||
                          window.location.pathname ===
                            "/employeeDash/editQuotation"
                            ? leaderboard1
                            : leaderboard
                        }`}
                        alt=""
                      />
                      <span
                        className={`${
                          window.location.pathname ===
                            "/employeeDash/leadDash" ||
                          window.location.pathname === "/employeeDash/myLead" ||
                          window.location.pathname ===
                            "/employeeDash/editLead" ||
                          window.location.pathname ===
                            "/employeeDash/createLead" ||
                          window.location.pathname ===
                            "/employeeDash/importLead/:id" ||
                          window.location.pathname ===
                            "/employeeDash/createQuotation" ||
                          window.location.pathname ===
                            "/employeeDash/editQuotation"
                            ? "fan"
                            : ""
                        }`}
                      >
                        Lead Management
                      </span>
                    </div>
                  </div>
                </NavLink>
              )}
              {payrollPermission && (
                <>
                  {/* =================payroll management start============ */}

                  <div
                    onClick={() => setOpenPayroll((prev) => !prev)}
                    className="side-dash-box silom"
                  >
                    <div className="dash-wrap">
                      <img src={anal} alt="dasg" />
                      <p className="lessfontparas">Payroll Management</p>
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
                          }}
                          className="sinADDasItem"
                          key={index}
                        >
                          {payrollItem == index ? (
                            <img
                              src={`${
                                window.location.pathname === `${item?.link}`
                                  ? fiber
                                  : tyming
                              }`}
                              alt=""
                            />
                          ) : (
                            <img
                              src={`${
                                window.location.pathname === `${item?.link}`
                                  ? fiber
                                  : tyming
                              }`}
                              alt=""
                            />
                          )}
                          <p
                            className={` ${
                              payrollItem === index ? "dashItemp" : "dITitl"
                            } ${
                              window.location.pathname === `${item?.link}`
                                ? "fan"
                                : ""
                            }`}
                          >
                            {item?.title}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* =================payroll management end============ */}
                </>
              )}

              {leadSystemPermission && (
                <>
                  <NavLink to="/employeeDash/LeadSystemSetting">
                    <div
                      className={`${
                        window.location.pathname ===
                        "/employeeDash/LeadSystemSetting"
                          ? "hh"
                          : ""
                      } setWrap`}
                    >
                      <div className="systSset">
                        <img
                          src={`${
                            window.location.pathname ===
                            "/employeeDash/LeadSystemSetting"
                              ? perty
                              : employee
                          }`}
                          alt=""
                        />
                        <span
                          className={`${
                            window.location.pathname ===
                            "/employeeDash/LeadSystemSetting"
                              ? "fan"
                              : ""
                          }`}
                        >
                          Lead System Setting
                        </span>
                      </div>
                    </div>
                  </NavLink>
                </>
              )}

              {attendencePermission && (
                <>
                  <NavLink to="/employeeDash/HRM/markAttendance">
                    <div
                      className={`${
                        window.location.pathname ===
                        "/employeeDash/HRM/markAttendance"
                          ? "hh"
                          : ""
                      } setWrap`}
                    >
                      {/* <p>Setting</p> */}
                      <div className="systSset">
                        <img
                          src={`${
                            window.location.pathname ===
                            "/employeeDash/HRM/markAttendance"
                              ? cel1
                              : cel
                          }`}
                          alt=""
                        />
                        <span
                          className={`${
                            window.location.pathname ===
                            "/employeeDash/HRM/markAttendance"
                              ? "fan"
                              : ""
                          }`}
                        >
                          Attendance Management
                        </span>
                      </div>
                    </div>
                  </NavLink>
                </>
              )}

              {assetsPermission && (
                <>
                  <NavLink to="/performance/Assets">
                    <div
                      className={`${
                        window.location.pathname === "/performance/Assets"
                          ? "hh"
                          : ""
                      } setWrap`}
                    >
                      {/* <p>Setting</p> */}
                      <div className="systSset">
                        <img
                          src={`${
                            window.location.pathname === "/performance/Assets"
                              ? webAsseting
                              : webAsseting
                          }`}
                          alt=""
                        />
                        <span
                          className={`${
                            window.location.pathname === "/performance/Assets"
                              ? "fan"
                              : ""
                          }`}
                        >
                          Assets Management
                        </span>
                      </div>
                    </div>
                  </NavLink>
                </>
              )}

              {documentPermission && (
                <>
                  <NavLink to="/employeeDash/documentManagement">
                    <div
                      className={`${
                        window.location.pathname ===
                        "/employeeDash/documentManagement"
                          ? "hh"
                          : ""
                      } setWrap`}
                    >
                      {/* <p>Setting</p> */}
                      <div className="systSset">
                        <img
                          src={
                            window.location.pathname ===
                            "/employeeDash/documentManagement"
                              ? "fan"
                              : ""
                          }
                          alt=""
                        />
                        <span
                          className={`${
                            window.location.pathname ===
                            "/employeeDash/documentManagement"
                              ? "fan"
                              : ""
                          }`}
                        >
                          Document Management
                        </span>
                      </div>
                    </div>
                  </NavLink>
                </>
              )}

              {leaveManagePermission && (
                <>
                  <div
                    onClick={() => setOpenLeaveMan((prev) => !prev)}
                    className="side-dash-box silom"
                  >
                    <div className="dash-wrap">
                      <img src={reading} alt="dasg" />
                      <p className="lessfontparas">Leave Management Setup</p>
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
                          }}
                          className="sinADDasItem"
                          key={index}
                        >
                          {leveItem == index ? (
                            <img
                              src={`${
                                window.location.pathname === `${item?.link}`
                                  ? fiber
                                  : tyming
                              }`}
                              alt=""
                            />
                          ) : (
                            <img
                              src={`${
                                window.location.pathname === `${item?.link}`
                                  ? fiber
                                  : tyming
                              }`}
                              alt=""
                            />
                          )}
                          <p
                            className={` ${
                              leveItem === index ? "dashItemp" : "dITitl"
                            } ${
                              window.location.pathname === `${item?.link}`
                                ? "fan"
                                : ""
                            }`}
                          >
                            {item?.title}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {performancePermission && (
                <>
                  <div
                    onClick={() => setOpenPerform((prev) => !prev)}
                    className="side-dash-box silom"
                  >
                    <div className="dash-wrap">
                      <img src={reading} alt="dasg" />
                      <p className="lessfontparas">Performance Setup</p>
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
                          }}
                          className="sinADDasItem"
                          key={index}
                        >
                          {performanceItem == index ? (
                            <img
                              src={`${
                                window.location.pathname === `${item?.link}`
                                  ? fiber
                                  : tyming
                              }`}
                              alt=""
                            />
                          ) : (
                            <img
                              src={`${
                                window.location.pathname === `${item?.link}`
                                  ? fiber
                                  : tyming
                              }`}
                              alt=""
                            />
                          )}
                          <p
                            className={` ${
                              performanceItem === index ? "dashItemp" : "dITitl"
                            } ${
                              window.location.pathname === `${item?.link}`
                                ? "fan"
                                : ""
                            }`}
                          >
                            {item?.title}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {employeeManagePermission && (
                <>
                  <NavLink to="/employeeDash/HRM/employeeManagement">
                    <div
                      className={`${
                        window.location.pathname ===
                          "/employeeDash/HRM/employeeManagement" ||
                        window.location.pathname ===
                          "/employeeDash/EmployeeDetails" ||
                        window.location.pathname ===
                          "/employeeDash/EmployeeMan" ||
                        window.location.pathname ===
                          "/employeeDash/EmployeeMan/:id"
                          ? "hh"
                          : ""
                      } setWrap`}
                    >
                      {/* <p>Setting</p> */}
                      <div className="systSset">
                        <img
                          src={`${
                            window.location.pathname ===
                              "/employeeDash/HRM/employeeManagement" ||
                            window.location.pathname ===
                              "/employeeDash/EmployeeDetails" ||
                            window.location.pathname ===
                              "/employeeDash/EmployeeMan" ||
                            window.location.pathname ===
                              "/employeeDash/EmployeeMan/:id"
                              ? perty
                              : employee
                          }`}
                          alt=""
                        />
                        <span
                          className={`${
                            window.location.pathname ===
                              "/employeeDash/HRM/employeeManagement" ||
                            window.location.pathname ===
                              "/employeeDash/EmployeeDetails" ||
                            window.location.pathname ===
                              "/employeeDash/EmployeeMan" ||
                            window.location.pathname ===
                              "/employeeDash/EmployeeMan/:id"
                              ? "fan"
                              : ""
                          }`}
                        >
                          Employee Management
                        </span>
                      </div>
                    </div>
                  </NavLink>
                </>
              )}

              {trainingSetupPermission && (
                <>
                  <div
                    onClick={() => setOpenTraining((prev) => !prev)}
                    className="side-dash-box silom"
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
                          }}
                          className="sinADDasItem"
                          key={index}
                        >
                          {trainingItem == index ? (
                            <img
                              src={`${
                                window.location.pathname === `${item?.link}`
                                  ? fiber
                                  : tyming
                              }`}
                              alt=""
                            />
                          ) : (
                            <img
                              src={`${
                                window.location.pathname === `${item?.link}`
                                  ? fiber
                                  : tyming
                              }`}
                              alt=""
                            />
                          )}
                          <p
                            className={` ${
                              performanceItem === index ? "dashItemp" : "dITitl"
                            } ${
                              window.location.pathname === `${item?.link}`
                                ? "fan"
                                : ""
                            }`}
                          >
                            {item?.title}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {hrAdminSetupPermission && (
                <>
                  <div
                    onClick={() => setOpenHr((prev) => !prev)}
                    className="side-dash-box silom"
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
                          }}
                          className="sinADDasItem"
                          key={index}
                        >
                          {hrItem == index ? (
                            <img
                              src={`${
                                window.location.pathname === `${item?.link}`
                                  ? fiber
                                  : tyming
                              }`}
                              alt=""
                            />
                          ) : (
                            <img
                              src={`${
                                window.location.pathname === `${item?.link}`
                                  ? fiber
                                  : tyming
                              }`}
                              alt=""
                            />
                          )}
                          <p
                            className={` ${
                              hrItem === index ? "dashItemp" : "dITitl"
                            } ${
                              window.location.pathname === `${item?.link}`
                                ? "fan"
                                : ""
                            }`}
                          >
                            {item?.title}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              <NavLink to="/employeeDash/mySelf">
                <li className="indefy">
                  <img src={shop} alt="" />
                  <a href="#" className=" ">
                    <span className="">My Self</span>
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
      )}

      <div style={stylepoo} className="p-0 sm:ml-64 oppl"></div>

      {pop && <Managment setPop={setPop} />}
    </>
  );
};

export default AdminSidebar;


{/* <NavLink to="/employeeDash/update">
<li className="indefy">
  <img src={userP} alt="" />
  <a href="#" className=" ">
    <span className="">User Profile</span>
  </a>
</li>
</NavLink> */}
