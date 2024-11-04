import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import HrSidebar from "../Sidebar/HrSidebar";
import HrNavbar from "../Navbar/HrNavbar";
import ac1 from "../../images/ac1.png";
import ac2 from "../../images/ac2.png";
import ac3 from "../../images/ac3.png";
import ac4 from "../../images/ac4.png";
import clock2 from '../../images/clock2.png';
import timeLog from '../../images/timeLog.png';
import sick2 from '../../images/sick2.png';
import cas from "../../images/cssual.png"
import leavimg from "../../images/leaveImg.png"
import "./hrm1.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import refresh from "../../images/bx-refresh.png"
import annouce from "../../images/annouce.png"
import holi from "../../images/holid.png"
import taskA from "../../images/taskAs.png"
import sites from '../../images/sites.svg';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import goals from '../../images/goals.png';
import meeting from "../../images/meeting.svg"
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";
import toast from "react-hot-toast";
import cutt from "../../images/cutt.png"
var tc3;
var tc4;

const HrDashboard = ({
  pop1,
  setPop1,
  pop,
  setPop,
  setAlert,
  isHr = false,
}) => {
  const { user, getUsers, getActiveUsersCount, postActivity, getTotalLeavesCount, fetchAnnoucement, getHoliday, postAttendence,  
    getStatisticsByUser,
    postLeave,
    getLeaveTypes,
    postNotification,
    } = useMain();

  const user2 = JSON.parse(localStorage.getItem("hrms_user"));

  const [star1, setStar1] = useState(false);

  const styleThing = {
    display: star1 ? "block" : "none",
  };

  const [formdata, setFormdata] = useState({
    employeeName: "",
    leaveType: "",
    start: "",
    end: "",
    reason: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

   const toastId =   toast.loading("Loading...");

    const startDate = new Date(formdata.start);
    const endDate = new Date(formdata.end);
    const timeDifference = Math.abs(endDate - startDate);
    const daysGap = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    const ans = await postLeave({
      type: formdata.leaveType,
      from: formdata.start,
      to: formdata.end,
      days: daysGap,
      reason: formdata.reason,
    });

    const notify = await postNotification(daysGap, formdata.employeeName);

    if (ans.success) {
      // alert("Successfuly applied");
      toast.success("Successfully applied");
      setStar1(false);

    }
    setFormdata({
      employeeName: "",
      leaveType: "",
      start: "",
      end: "",
      reason: "",
    });

toast.dismiss(toastId);

  };

  const [leaveType, setLeaveType] = useState([]);

  const fetchLeaveType = async () => {
    const resp = await getLeaveTypes();
    if (resp.success) {
      setLeaveType(resp?.data);
    }
  };

  useEffect(() => {
    fetchLeaveType();
  }, []);

  let userDetail = JSON.parse(localStorage.getItem("hrms_user"));

  // const [loading , setLoading] = useState(false);

  const [counts, setCounts] = useState({
    activeEmployees: 0,
    leaveRequest: 0,
    employeesLeaves: 0,
    totalEmployees: 0
  });

  const [value, onChange] = useState(new Date());

  const [loadFlag, setLoadFlag] = useState(true);

  const [loading , setLoading] = useState(false);
  const [clockoutLoading , setClockOutLoading] = useState(false);

  const [totalLeave, setTotalLeave] = useState(0);

  const [announce, setAnnounce] = useState([]);

  const [holiday, setHoliday] = useState([]);

  const [task, setTask] = useState([
    {
      name: "Chirag",
      assignDate: "31/05/2023",
      endDate: "31/05/2023",
      task: "Madfish"
    },
    {
      name: "Chirag",
      assignDate: "31/05/2023",
      endDate: "31/05/2023",
      task: "Madfish"
    },
    {
      name: "Chirag",
      assignDate: "31/05/2023",
      endDate: "31/05/2023",
      task: "Madfish"
    },
    {
      name: "Chirag",
      assignDate: "31/05/2023",
      endDate: "31/05/2023",
      task: "Madfish"
    },
  ])

  const getData = async () => {
    setLoadFlag(true);
    const ans = await getUsers();
    const ans1 = await getActiveUsersCount();

    const ans2 = await getTotalLeavesCount();
    setTotalLeave(ans2.totalLeave);

    setCounts({
      ...counts, totalEmployees: ans.data.length, activeEmployees: ans1.data
    });
    setLoadFlag(false);

  };

  var [clock, setClock] = useState(0);
  var [breakClock, setBreakClock] = useState(0);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleVisibilityChange = () => {
    if (!document.hidden) {
      initializeTimer();
    }
  };

  useEffect(() => {
    initializeTimer();
  }, []);

  const initializeTimer = () => {
    let t = localStorage.getItem('clock-in');
    let t1 = localStorage.getItem('clock-status');
    let t2 = localStorage.getItem('break-seconds');
    clearInterval(tc3);
    clearInterval(tc4);

    if (t1) {
      if (t2) {
        setBreakClock(t2);
      }

      if (t1 !== "out") {
        let t5 = Math.floor((new Date().getTime() - t) / 1000);
        setClock(t5);

        tc4 = setInterval(() => {
          setClock(++t5);
        }, 1000);

        if (t1 === 'resume') {
          tc3 = setInterval(() => {
            setBreakClock(++t2);
          }, 1000);
        }
      }
      else {
        let t7 = localStorage.getItem('clock-out-time');
        let t5 = Math.floor((t7 - t) / 1000);
        setClock(t5);
      }
    }
  };

  const clockIn = async () => {

    setLoading(true);

    let t = localStorage.getItem("clock-status");
    localStorage.setItem('clockInTime', new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true }));

    localStorage.setItem("date1", new Date().toLocaleDateString("en-GB"));


    if (!t) {
      let ans = await postActivity({
        clockIn: localStorage.getItem("clock-in") ? localStorage.getItem("clock-in") : new Date().getTime(),
        clockOut: 0,
        late: 0,
        date1: localStorage.getItem("date1"),
        overtime: 0,
        total: 0,
        message: "",
      });

      localStorage.setItem("clock-in", new Date().getTime());
      localStorage.setItem("clock-status", "break");

      // for setting todat date 
      //   const today = new Date();
      // const currentDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
      let currentDate = new Date().toLocaleDateString("en-GB")
      localStorage.setItem("clock-in-date", currentDate);

      localStorage.setItem('breakInTime', new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true }));


      tc4 = setInterval(() => {
        setClock(++clock);
      }, 1000);
    } else {
      if (t === "break") {
        localStorage.setItem("break-time", new Date().getTime());
        localStorage.setItem("clock-status", "resume");

        localStorage.setItem('breakOutTime', new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true }));

        let t3 = localStorage.getItem("break-seconds");

        tc3 = setInterval(() => {
          setBreakClock(++t3);
        }, 1000);
      } else if (t === "resume") {
        let t1 = localStorage.getItem("break-time");
        if (t1) {
          let t2 = localStorage.getItem("break-seconds");
          if (t2) {
            localStorage.setItem(
              "break-seconds",
              Math.floor((new Date() - t1) / 1000) + Number(t2)
            );
          } else {
            localStorage.setItem(
              "break-seconds",
              Math.floor((new Date() - t1) / 1000)
            );
          }
        }
        localStorage.setItem("clock-status", "break");
        clearInterval(tc3);
      } else if (t === "out") {
        let ans = await postActivity({
          clockIn: localStorage.getItem("clock-in"),
          clockOut: 0,
          late: 0,
          date1: new Date().toLocaleDateString("en-GB"),
          overtime: 0,
          total: 0,
          message: "",
        });

        localStorage.setItem("clock-in", new Date().getTime());
        localStorage.setItem("clock-status", "break");
        localStorage.removeItem("clock-out-time");
        localStorage.removeItem("break-seconds");
        localStorage.removeItem("break-time");

        let t8 = 0;
        tc4 = setInterval(() => {
          setClock(++t8);
        }, 1000);

      }
    }
    setMount(!mount);
    setLoading(false);
  };

  const clockOut = async () => {

    setClockOutLoading(true);

    localStorage.setItem("clock-status", "out");
    localStorage.setItem("clock-out-time", new Date().getTime());
    localStorage.setItem('clockOutTime', new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true }));

    clearInterval(tc3);
    clearInterval(tc4);
    setMount(!mount);
    setClock(0);

    const breakIn = localStorage.getItem("breakInTime");
    const breakOut = localStorage.getItem("breakOutTime");

    // Get the current year
    const currentYear = new Date().getFullYear();

    // Construct Date objects using the current year
    const date1 = new Date(`${currentYear} 01 01 ${breakIn}`);
    const date2 = new Date(`${currentYear} 01 01 ${breakOut}`);

    // Calculate the difference in milliseconds
    const differenceMs = date2.getTime() - date1.getTime();

    // Convert the difference to a readable format
    const hours = Math.floor(differenceMs / (1000 * 60 * 60));
    const minutes = Math.floor((differenceMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((differenceMs % (1000 * 60)) / 1000);

    const differenceText = `${hours}:${minutes}:${seconds}`;

    let ans = await postActivity({
      clockIn: localStorage.getItem("clock-in"),
      clockOut: localStorage.getItem("clock-out-time"),
      late: breakClock,
      date1: localStorage.getItem("date1"),
      overtime: clock - 32400 > 0 ? clock - 32400 : 0,
      total: clock,
      message: "",
    });

    const userDataString = localStorage.getItem("hrms_user");

    const userData = JSON.parse(userDataString);

    const clockInDate = localStorage.getItem('clock-in-date');

    const attendence = await postAttendence({
      clockInDetail: localStorage.getItem("clockInTime"), breakTime: differenceText, clockOutDetail: localStorage.getItem("clockOutTime"),
      id: userData?._id,
      clockInDate: clockInDate
    });

    localStorage.removeItem("clock-in");
    localStorage.removeItem("clock-status");
    localStorage.removeItem("clock-out-time");
    localStorage.removeItem("clockOutTime");
    localStorage.removeItem("clockInTime");
    localStorage.removeItem("breakInTime");
    localStorage.removeItem("breakOutTime");
    localStorage.removeItem("clock-in-date");

    setClockOutLoading(false);

  };

  useEffect(() => {
    getData();

  }, []);

  const getAnnoucement = async () => {
    const ans = await fetchAnnoucement();
    setAnnounce(ans?.data);
  }

  const getHolidays = async () => {
    const ans = await getHoliday();
    setHoliday(ans?.data);
  }

  useEffect(() => {
    getAnnoucement();
    getHolidays();
  }, []);


  return (
    <>
      <div className="employee-dash h-full">
        {isHr ? <HrSidebar /> : <HrSidebar pop={pop} setPop={setPop} />}

        <div className="tm">
          {isHr ? (
            <HrNavbar
              user={user}
              setAlert={setAlert}
              pop1={pop1}
              setPop1={setPop1}
            />
          ) : (
            <HrNavbar user={user} setAlert={setAlert} />
          )}

          {loadFlag ? 'Loading ..'
            :
            <div className="em emm">

              <div className="flex-col">

                <div className="firstD">

                  {/* left side */}
                  <div className="dFirLef">
                    <h2>Hi {user2?.fullName}</h2>
                    <p>Real-time insights and performance overview</p>
                  </div>

                  {/* right side  */}
                  <button onClick={() => {
                    window.location.href = "/hrDash";
                  }} className="refreBtn">Refresh <span><img src={refresh} alt="" /></span></button>

                </div>


                {/* second boxes  */}
                <div className="hrLefFir">

                  <NavLink className="skm" to={`/adminDash/HRM/activeEmployee`}>
                    <div className="sinActDat colorChange1 ">

                      <img className="firImg" src={ac1} alt="" />

                      <div className="titWrap">
                        <h3>Active Employee</h3>
                        <p className="hrmlRNu">{counts?.activeEmployees}</p>
                      </div>

                    </div>
                  </NavLink>

                  <NavLink className="skm" to={`/adminDash/HRM/leaveRequest`}>
                    <div className="sinActDat colorChange2">
                      <img className="firImg" src={ac2} alt="" />

                      <div className="titWrap">
                        <h3>Leave Request</h3>
                        <p className="hrmlRNu">{totalLeave}</p>

                      </div>

                    </div>
                  </NavLink>

                  <NavLink className="skm" to={`/adminDash/HRM/LeaveEmployee`}>
                    <div className="sinActDat colorChange3">
                      <img className="firImg" src={ac3} alt="" />

                      <div className="titWrap">
                        <h3>Employee on Leave</h3>

                        <p className="hrmlRNu">{counts?.employeesLeaves}</p>
                      </div>

                    </div>
                  </NavLink>

                  <NavLink className="skm" to={`/adminDash/HRM/totalEmployee`}>
                    <div className="sinActDat colorChange4">
                      <img className="firImg" src={ac4} alt="" />

                      <div className="titWrap">
                        <h3>Total Employee</h3>

                        <p className="hrmlRNu">{counts?.totalEmployees}</p>
                      </div>

                    </div>
                  </NavLink>

                </div>

                


                <main className="attend-ctiveWrap">

                  {/* left side */}
                  <div className="hrmActLeft">

                  <div className="second-bedge w-full ">
                        <div className="calend falend">
                          <div className="calend-head">
                            <div className="topWrapcel">
                          <img src={meeting} alt="" />
                            <h2>Meetings & more</h2>
                            </div>
                            <img src={goals} alt="goals" />
                          </div>
                          <hr />
                          <div className="cals-dent relative">
                            <NavLink to="/hrDash/atten1">
                              <Calendar onChange={onChange} value={value} />
                            </NavLink>
                          </div>
                        </div>
                      </div>

                    {/* second  */}
                    <NavLink to="/adminDash/announcement"><div className="hrLefThi">

                      <h2 className="headind"> <img src={annouce} alt="" /> <span>Announcement Lists</span></h2>

                      <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          <thead className="text-xs uppercase textALLtITL ">
                            <tr  >
                              <th scope="col" className="px-3  py-3 taskTitl">
                                TITLE
                              </th>
                              <th scope="col" className="px-3  py-3 taskTitl">
                                START DATE
                              </th>
                              <th scope="col" className="px-3 py-3 taskTitl">
                                END DATE
                              </th>

                              <th scope="col" className="px-3 py-3 taskTitl">
                                DESCRIPTION
                              </th>

                            </tr>
                          </thead>
                          <tbody>
                            {
                              announce?.map((val, index) => {
                                return (
                                  <tr key={index} className="bg-white border-b  ">
                                    <th scope="row" className="px-3 py-4 font-medium tasklo  whitespace-nowrap taskAns taskans11">
                                      {val?.title}
                                    </th>
                                    <td className="px-3 py-4 taskAns lolo taskans11">
                                      {val?.startDate}
                                    </td>
                                    <td className="px-3 py-4 taskAns lolo taskans11">
                                      {val?.endDate}
                                    </td>
                                    <td className="px-3 py-4 taskAns taskans11">
                                      {val?.description}
                                    </td>

                                  </tr>
                                )
                              })
                            }

                          </tbody>
                        </table>
                      </div>


                    </div></NavLink>

                    {/* third  */}
                    <NavLink to="/adminDash/announcement"><div className="hrLefThi">

                      <h2 className="headind"> <img src={taskA} alt="" /> <span>Task Assign</span></h2>

                      <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          <thead className="text-xs uppercase textALLtITL ">
                            <tr  >
                              <th scope="col" className="px-2  py-3 taskTitl">
                                Name
                              </th>
                              <th scope="col" className="px-3  py-3 taskTitl">
                                Assign Date
                              </th>
                              <th scope="col" className="px-3 py-3 taskTitl">
                                END DATE
                              </th>

                              <th scope="col" className="px-3 py-3 taskTitl">
                                Tasks
                              </th>

                            </tr>
                          </thead>
                          <tbody>
                            {
                              task?.map((val, index) => {
                                return (
                                  <tr key={index} className="bg-white border-b  ">
                                    <th scope="row" className="px-2 py-4 font-medium tasklo whitespace-nowrap taskAns ">
                                      {val?.name}
                                    </th>
                                    <td className="px-2 py-4 taskAns">
                                      {val?.assignDate}
                                    </td>
                                    <td className="px-2 py-4 taskAns">
                                      {val?.endDate}
                                    </td>
                                    <td className="px-2 py-4 taskAns">
                                      {val?.task}
                                    </td>

                                  </tr>
                                )
                              })
                            }

                          </tbody>
                        </table>
                      </div>


                    </div></NavLink>




                  </div>

                  {/* right side */}
                  <div className="hrmActRight">


                    {/* first  */}
                    <div className="markAttWrap">
                      {/* top */}
                      <div className="markAtt">
                        <img src={sites} alt="" />
                        <p>Mark Attandance</p>
                      </div>

                      <hr />

                      <div className="myOficeWrap">
                        {/* <p className="myOfText">My Office Time: 10:00 to 19:00</p> */}

                        <div className="oficTime">

                          {/* single */}
                          <div className="ofSin">
                            <div className="singlTime">
                              <p>{Math.floor(clock / 3600)}</p>
                            </div>

                            <p className="day">Hours</p>
                          </div>

                          {/* single */}
                          <div className="ofSin">
                            <div className="singlTime">
                              <p>{Math.floor((clock % 3600) / 60)}</p>
                            </div>

                            <p className="day">Minutes</p>
                          </div>

                          {/* single */}
                          <div className="ofSin">
                            <div className="singlTime">
                              <p>{clock % 60}</p>
                            </div>

                            <p className="day">Seconds</p>
                          </div>
                        </div>

                        <div className="clockINOUTBtn">
                          {(mount || !mount) && <button className="clockIN cursor-pointer" onClick={clockIn}>
                          <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6.5 1.5V0H12.5V1.5H6.5ZM8.75 12.675H10.25V6.925H8.75V12.675ZM9.5 20.975C8.26667 20.975 7.10417 20.7375 6.0125 20.2625C4.92083 19.7875 3.96667 19.1417 3.15 18.325C2.33333 17.5083 1.6875 16.5542 1.2125 15.4625C0.7375 14.3708 0.5 13.2083 0.5 11.975C0.5 10.7417 0.7375 9.57917 1.2125 8.4875C1.6875 7.39583 2.33333 6.44167 3.15 5.625C3.96667 4.80833 4.92083 4.1625 6.0125 3.6875C7.10417 3.2125 8.26667 2.975 9.5 2.975C10.6167 2.975 11.6667 3.1625 12.65 3.5375C13.6333 3.9125 14.5083 4.43333 15.275 5.1L16.55 3.825L17.6 4.875L16.325 6.15C16.925 6.81667 17.4375 7.625 17.8625 8.575C18.2875 9.525 18.5 10.6583 18.5 11.975C18.5 13.2083 18.2625 14.3708 17.7875 15.4625C17.3125 16.5542 16.6667 17.5083 15.85 18.325C15.0333 19.1417 14.0792 19.7875 12.9875 20.2625C11.8958 20.7375 10.7333 20.975 9.5 20.975ZM9.5 19.475C11.5833 19.475 13.3542 18.7458 14.8125 17.2875C16.2708 15.8292 17 14.0583 17 11.975C17 9.89167 16.2708 8.12083 14.8125 6.6625C13.3542 5.20417 11.5833 4.475 9.5 4.475C7.41667 4.475 5.64583 5.20417 4.1875 6.6625C2.72917 8.12083 2 9.89167 2 11.975C2 14.0583 2.72917 15.8292 4.1875 17.2875C5.64583 18.7458 7.41667 19.475 9.5 19.475Z" fill="white" />
                            </svg>
                            {
                              loading ?
                              <span class="loader"></span>
                              :
                            <span>{!localStorage.getItem('clock-status') ? 'Check-in' : localStorage.getItem('clock-status') === 'break' ? 'Break' : localStorage.getItem('clock-status') === 'resume' ? 'Resume' : localStorage.getItem('clock-status') === 'out' ? 'Check-in' : null}</span>

                            }
                          </button>}

                          {(mount || !mount) && <button className="clockOUT cursor-pointer" disabled={!localStorage.getItem('clock-status') || localStorage.getItem('clock-status') === 'out'} onClick={clockOut}>
                          <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6.5 1.5V0H12.5V1.5H6.5ZM8.75 12.675H10.25V6.925H8.75V12.675ZM9.5 20.975C8.26667 20.975 7.10417 20.7375 6.0125 20.2625C4.92083 19.7875 3.96667 19.1417 3.15 18.325C2.33333 17.5083 1.6875 16.5542 1.2125 15.4625C0.7375 14.3708 0.5 13.2083 0.5 11.975C0.5 10.7417 0.7375 9.57917 1.2125 8.4875C1.6875 7.39583 2.33333 6.44167 3.15 5.625C3.96667 4.80833 4.92083 4.1625 6.0125 3.6875C7.10417 3.2125 8.26667 2.975 9.5 2.975C10.6167 2.975 11.6667 3.1625 12.65 3.5375C13.6333 3.9125 14.5083 4.43333 15.275 5.1L16.55 3.825L17.6 4.875L16.325 6.15C16.925 6.81667 17.4375 7.625 17.8625 8.575C18.2875 9.525 18.5 10.6583 18.5 11.975C18.5 13.2083 18.2625 14.3708 17.7875 15.4625C17.3125 16.5542 16.6667 17.5083 15.85 18.325C15.0333 19.1417 14.0792 19.7875 12.9875 20.2625C11.8958 20.7375 10.7333 20.975 9.5 20.975ZM9.5 19.475C11.5833 19.475 13.3542 18.7458 14.8125 17.2875C16.2708 15.8292 17 14.0583 17 11.975C17 9.89167 16.2708 8.12083 14.8125 6.6625C13.3542 5.20417 11.5833 4.475 9.5 4.475C7.41667 4.475 5.64583 5.20417 4.1875 6.6625C2.72917 8.12083 2 9.89167 2 11.975C2 14.0583 2.72917 15.8292 4.1875 17.2875C5.64583 18.7458 7.41667 19.475 9.5 19.475Z" fill="white" />
                            </svg>
                            {
                              clockoutLoading?
                              <span class="loader2"></span>:
                            <span>Check-out</span>
                            }
                          </button>}
                        </div>
                      </div>
                    </div>

                    <div>
                        <a
                          href="#"
                          className="block serad max-w-2xl p-5 bg-white border timeWrap border-gray-200 rounded-lg shadow hover:bg-gray-100   "
                        >

                           <div className="timeLogWrap">
                            <img src={timeLog} alt="" />
                      <h5 className="mb-3 text-xl  text-gray-900 dark:text-white">   Time Log </h5>
                           </div>

                          <hr />

                          <h5 className="todayText">
                            Today
                          </h5>

                          <hr />

                          <div className="time_emp_desh_flex">

                            <div className="time_emp_desh">
                              <h5 className="mb-1 mt-3 text-xl  tracking-tight text-gray-900 -">{`${Math.floor(
                                clock / 3600
                              )
                                .toString()
                                .padStart(2, "0")}:${Math.floor(
                                (clock % 3600) / 60
                              )
                                .toString()
                                .padStart(2, "0")}`}</h5>
                              <p>Scheduled</p>
                            </div>

                            <div className="time_emp_desh">
                              <h5 className="mb-1 mt-3 text-xl  tracking-tight text-gray-900 ">{`${Math.floor(
                                (clock - breakClock) / 3600
                              )
                                .toString()
                                .padStart(2, "0")}:${Math.floor(
                                ((clock - breakClock) % 3600) / 60
                              )
                                .toString()
                                .padStart(2, "0")}`}</h5>
                              <p>Worked</p>
                            </div>

                            <div className="time_emp_desh">
                              <h5 className="mb-1 mt-3 text-xl  tracking-tight text-gray-900 ">{`${Math.floor(
                                breakClock / 3600
                              )
                                .toString()
                                .padStart(2, "0")}:${Math.floor(
                                (breakClock % 3600) / 60
                              )
                                .toString()
                                .padStart(2, "0")}`}</h5>
                              <p>Break</p>
                            </div>

                            <div className="time_emp_desh">
                              <h5 className="mb-1 mt-3 text-xl  tracking-tight text-gray-900 ">{`${Math.floor(
                                (32400 - clock) / 3600
                              )
                                .toString()
                                .padStart(2, "0")}:${Math.floor(
                                ((32400 - clock) % 3600) / 60
                              )
                                .toString()
                                .padStart(2, "0")}`}</h5>
                              <p>balance</p>
                            </div>
                          </div>

                          <hr />

                          <h5 className="thisMonText">
                            This month
                          </h5>

                          <hr />

                          <div className="time_emp_desh_flex2">
                            
                              <img src={clock2} alt="" />

                            <div className="time_emp_desh">
                              <h6 className="timeEmptext">
                                168 hrs
                              </h6>
                              {/* <p>{`${Math.floor((32400 - clock) / 3600)
                                .toString()
                                .padStart(2, "0")}:${Math.floor(
                                ((32400 - clock) % 3600) / 60
                              )
                                .toString()
                                .padStart(2, "0")}`}</p> */}
                            </div>
                            
                          </div>
                        </a>
                      </div>

                    {/* second  */}

                    <NavLink to="/adminDash/HRM/holiday"><div className="hrLefThi">

                      <h2 className="holiHead"> <img src={holi} alt="" /> <span>Holiday Lists</span></h2>

                      <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          <thead className="text-xs uppercase textALLtITL ">
                            <tr  >
                              <th scope="col" className="px-6 py-3 taskTitl">
                                OCCASION
                              </th>
                              <th scope="col" className="px-2 py-3 taskTitl">
                                START DATE
                              </th>
                              <th scope="col" className="px-6 py-3 taskTitl">
                                END DATE
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              holiday?.map((val, index) => {
                                return (
                                  <tr key={index} className="bg-white border-b  ">
                                    <th scope="row" className="px-6 py-4 font-medium tasklo whitespace-nowrap taskAns ">
                                      {val?.holidayName}
                                    </th>
                                    <td className="px-2 py-4 taskAns">
                                      {val?.startDate}
                                    </td>
                                    <td className="px-6 py-4 taskAns">
                                      {val?.endDate}
                                    </td>
                                  </tr>
                                )
                              })
                            }

                          </tbody>
                        </table>
                      </div>


                    </div>
                    </NavLink>
                  </div>

                </main>

                <div className="hrLefThi22">

<div className="leaves_request_emp mt-5">

   <div className="ladHead2">
<img src={leavimg} alt="" />
  <h3>Leaves</h3>
   </div>

  <button
    data-modal-target="authentication-modal"
    data-modal-toggle="authentication-modal"
    class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    type="button"
    onClick={() => {
      setStar1(!star1);
    }}
  >
   <span> Create Leave</span>
  </button>

</div>

<hr />

<div className="leave_setion_emp">

  <div className="totel_leave_allowance1">
    <div className="totalLeaText">
      <h5 >
        15
      </h5>
      <p>Total leave allowance</p>
    </div>

    <div>
      <p>
        <img src={cas} alt="" />
        <span className="cas"> casual - 07</span>
      </p>
      <p>
    <img src={sick2} alt="" />
        <span className="cas">Sick - 08</span>{" "}
      </p>
    </div>
  </div>

  <div className="totel_leave_allowance1">
    <div className="totalLeaText">
      <h5 >
        15
      </h5>
      <p>Total leave taken</p>
    </div>
    <div>
      <p>
<img src={cas} alt="" />
        <span className="cas"> casual - 07</span>
      </p>
      <p>
       <img src={sick2} alt="" />
        <span className="cas">Sick - 08</span>{" "}
      </p>
    </div>
  </div>

</div>

<div className="leave_setion_emp">

  <div className="totel_leave_allowance1">
    <div className="totalLeaText">
      <h5 >
        15
      </h5>
      <p>Total leave available</p>
    </div>
    <div>
      <p>
    <img src={cas} alt="" />
        <span className="cas"> casual - 07</span>
      </p>
      <p>
    <img src={sick2} alt="" />
        <span className="cas">Sick - 08</span>{" "}
      </p>
    </div>
  </div>

  <div className="totel_leave_allowance1">
    <div className="totalLeaText">
      <h5 >
        15
      </h5>
      <p>Total request pending</p>
    </div>
    <div>
      <p>
<img src={cas} alt="" />
        <span className="cas"> casual - 07</span>
      </p>
      <p>
        <img src={sick2} alt="" />
        <span className="cas">Sick - 08</span>{" "}
      </p>
    </div>
  </div>

</div>

</div>

              </div>
            </div>}
        </div>
      </div>

      <>
                  {/* <!-- Main modal --> */}
                  <div
                    style={styleThing}
                    id="authentication-modal"
                    tabindex="-1"
                    aria-hidden="true"
                    class="user_class  hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center mt-10 md:inset-0 h-[calc(100%-1rem)] max-h-full "
                  >
                    <div class="relative  p-4 w-full wrapping max-w-md max-h-full">
                      {/* <!-- Modal content --> */}
                      <div class="relative createLeaveWrap bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}

                        <div class="leaHEcUTwRAP">

                          <h3 class="leaveHead ">
                             Leave Request
                          </h3>

                          <img src={cutt}  onClick={() => setStar1(false)} alt="" />

                        </div>

                        <hr />

                        {/* <!-- Modal body --> */}
                        <div class="">
                          <form className=" mainModel" action="#">

                            {/* <div class=" user_class_input">

                              <label
                                for="name"
                                class="block mb-2 text-sm font-medium text-gray-900 employName"
                              >
                                Employee Name
                              </label>

                              <input
                                value={formdata.employeeName}
                                onChange={changeHandler}
                                type="text"
                                name="employeeName"
                                id="text"
                                class=" employeInput "
                                placeholder="Enter the name"
                                required
                              />
                            </div> */}

                            <div class="user_class_input2">

                              <label
                                for="text"
                                class="block mb-2 text-sm font-medium text-gray-900 employName"
                              >
                                Leave type
                              </label>

                              <select
                                name="leaveType"
                                onChange={changeHandler}
                                value={formdata.leaveType}
                                required
                              >
                                {leaveType.map((item, index) => (
                                  <option value={item?.name} key={index}>
                                    {item?.name}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="userClassWrap">

                              <div class="user_class_input3 w-full mt-2 ">
                                <label
                                  for="text"
                                  class="block mb-2 text-sm font-medium text-gray-900 employName"
                                >
                                  Start
                                </label>
                                <input
                                  value={formdata.start}
                                  onChange={changeHandler}
                                  type="date"
                                  name="start"
                                  id="text"
                                  class="startDate"
                                  required
                                />
                              </div>

                              <div class="user_class_input3 w-full ml-2  mt-2">
                                <label
                                  for="text"
                                  class="block mb-2 text-sm font-medium text-gray-900 employName"
                                >
                                  End
                                </label>
                                <input
                                  value={formdata.end}
                                  onChange={changeHandler}
                                  type="date"
                                  name="end"
                                  id="text"
                                  class="startDate"
                                  required
                                />
                              </div>

                            </div>

                            <div class="user_class_input4">
                              <label
                                for="message"
                                class="block mb-2 mt-2 text-sm font-medium text-gray-900 employName"
                              >
                                Reason
                              </label>
                              <textarea
                                required
                                name="reason"
                                onChange={changeHandler}
                                value={formdata.reason}
                                id="message"
                                rows="4"
                                class="reasonText2"
                                placeholder="Enter your reason..."
                              ></textarea>
                            </div>

                            {/*
                             <button
                              onClick={(e) => {
                                e.preventDefault();

                                submitHandler(e);
                              }}
                              type="button"
                              class="w-full mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              send
                            </button>

                            <button
                              onClick={() => setStar1(false)}
                              type="button"
                              class="w-full mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              Cancel
                            </button> */}


                            <div className="sendReBtn">

                            <button
                              onClick={(e) => {
                                e.preventDefault();

                                submitHandler(e);
                              }}
                              type="button"
                              class="reqSend"
                            >
                             <span>  Request send</span>
                            </button>

                            <button
                              onClick={() => setStar1(false)}
                              type="button"
                              class="canceBtn"
                            >
                              <span>Cancel</span>
                            </button> 

                            </div>

                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
    </>
  );
};

export default HrDashboard;


// THIS IS THE PREVIOUS CODE FOR TIMESHEET ACCORDING TO PREVIOUS FIGMA FILE 

{/* <div className="timeSheetWrap">
                    <div className="tScONT">
                      <p className="time">Timesheets</p>

                      <div className="caleMagnify">
                        <img src={calendarMonth} alt="" />
                        <img src={MagnifyingGlass} alt="" />
                        <span>Search..</span>
                      </div>
                    </div>

                    <div className="relative overflow-x-auto">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs uppercase textALLtITL ">
                          <tr >
                            <th scope="col" className="px-6 py-3 taskTitl">
                              NAME
                            </th>
                            <th scope="col" className="px-6 py-3 taskTitl">
                              DATE
                            </th>
                            <th scope="col" className="px-6 py-3 taskTitl">
                              TASKS
                            </th>

                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-white border-b  ">
                            <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap taskAns ">
                              Surbhi Rajwanshi
                            </th>
                            <td className="px-6 py-4 taskAns">
                              JAN 22,2024
                            </td>
                            <td className="px-6 py-4 taskAns">
                              Skimoil, Madfish
                            </td>

                          </tr>
                          <tr className="bg-white border-b  ">
                            <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap taskAns ">
                              Surbhi Rajwanshi
                            </th>
                            <td className="px-6 py-4 taskAns">
                              JAN 22,2024
                            </td>
                            <td className="px-6 py-4 taskAns">
                              Skimoil, Madfish
                            </td>

                          </tr>
                          <tr className="bg-white border-b  ">
                            <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap taskAns ">
                              Surbhi Rajwanshi
                            </th>
                            <td className="px-6 py-4 taskAns">
                              JAN 22,2024
                            </td>
                            <td className="px-6 py-4 taskAns">
                              Skimoil, Madfish
                            </td>

                          </tr>
                          <tr className="bg-white border-b  ">
                            <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap taskAns ">
                              Surbhi Rajwanshi
                            </th>
                            <td className="px-6 py-4 taskAns">
                              JAN 22,2024
                            </td>
                            <td className="px-6 py-4 taskAns">
                              Skimoil, Madfish
                            </td>

                          </tr>
                          <tr className="bg-white border-b  ">
                            <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap taskAns ">
                              Surbhi Rajwanshi
                            </th>
                            <td className="px-6 py-4 taskAns">
                              JAN 22,2024
                            </td>
                            <td className="px-6 py-4 taskAns">
                              Skimoil, Madfish
                            </td>

                          </tr>
                          <tr className="bg-white border-b  ">
                            <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap taskAns ">
                              Surbhi Rajwanshi
                            </th>
                            <td className="px-6 py-4 taskAns">
                              JAN 22,2024
                            </td>
                            <td className="px-6 py-4 taskAns">
                              Skimoil, Madfish
                            </td>

                          </tr>
                          <tr className="bg-white border-b  ">
                            <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap taskAns ">
                              Surbhi Rajwanshi
                            </th>
                            <td className="px-6 py-4 taskAns">
                              JAN 22,2024
                            </td>
                            <td className="px-6 py-4 taskAns">
                              Skimoil, Madfish
                            </td>

                          </tr>

                        </tbody>
                      </table>
                    </div>
                  </div> */}
