import React, { useState, useEffect } from "react";
import EmployeeNavbar from "../Navbar/EmployeeNavbar";
import EmployeeSidebar from "../Sidebar/EmployeeSidebar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import { NavLink } from "react-router-dom";
import lighting from "../../images/ligting.svg";
import "./dashboard.css";
import cel1 from "../../images/cel1.png";
import cap from "../../images/cap.png";
import peo1 from "../../images/peo1.png";
import meeting from "../../images/meeting.svg"
import goals from "../../images/goals.png";
import timeLog from "../../images/timeLog.png"
import clock2 from "../../images/clock2.png"
import leavimg from "../../images/leaveImg.png"
import cas from "../../images/cssual.png"
import sick2 from "../../images/sick2.png"
import annNav from "../../images/annNav.png"
import cutt from "../../images/cutt.png"
import toast from "react-hot-toast";

var tc3;
var tc4;

const people = [
  {
    img: peo1,
    name: "Gautam Panday",
    work: "Graphic Designer",
  },
  {
    img: peo1,
    name: "Chirag Sharma",
    work: "Project Manager",
  },
];

const EmployeeDash = ({ setAlert, pop1, setPop1 }) => {
  // =================punch in punch out concept==========
  const {
    user,
    postActivity,
    getStatisticsByUser,
    postLeave,
    getLeaveTypes,
    postNotification,
    postAttendence,
    fetchAnnoucement
    
  } = useMain();

  const [announce, setAnnounce] = useState([]);

  const getAnnoucement = async () => {
    const ans = await fetchAnnoucement();
    setAnnounce(ans?.data);
  }

 const [loading , setLoading] = useState(false);

 const [clockoutLoading , setClockoutLoading] = useState(false);

  // =================Popup==============
  const [popup1, setPopup1] = useState(false);

  // ==============other===========================
  const [value, onChange] = useState(new Date());

  // ==========to get user data================
  useEffect(() => {
    // getData();
  }, []);

  var [clock, setClock] = useState(0);
  var [breakClock, setBreakClock] = useState(0);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
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
    let t = localStorage.getItem("clock-in");
    let t1 = localStorage.getItem("clock-status");
    let t2 = localStorage.getItem("break-seconds");
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

        if (t1 === "resume") {
          tc3 = setInterval(() => {
            setBreakClock(++t2);
          }, 1000);
        }
      } else {
        let t7 = localStorage.getItem("clock-out-time");
        let t5 = Math.floor((t7 - t) / 1000);
        setClock(t5);
      }
    }
  };

  
  const clockIn = async () => {

    setLoading(true);

    let t = localStorage.getItem("clock-status");

    localStorage.setItem("date1", new Date().toLocaleDateString("en-GB"));

    if (!t) {

      localStorage.setItem(
        "clockInTime",
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );

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

      let currentDate = new Date().toLocaleDateString("en-GB");
      localStorage.setItem("clock-in-date", currentDate);

     
      tc4 = setInterval(() => {
        setClock(++clock);
      }, 1000);
    } 
    
    else {

      if (t === "break") {

        console.log("breakstart ");
        localStorage.setItem(
          "breakInTime",
          new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          })
        );
        localStorage.setItem("break-time", new Date().getTime());
        localStorage.setItem("clock-status", "resume");

       
        let t3 = localStorage.getItem("break-seconds");

        tc3 = setInterval(() => {
          setBreakClock(++t3);
        }, 1000);
      }
       else if (t === "resume") {
        console.log("breaklast");
        localStorage.setItem(
          "breakOutTime",
          new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          })
        );

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


  const parseTime = (timeStr) => {
     
    const [time, modifier] = timeStr?.split(' ');
    let [hours, minutes, seconds] = time?.split(':');
  
    if (hours === '12') {
      hours = '00';
    }
  
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
  
    return new Date(`${new Date().toDateString()} ${hours}:${minutes}:${seconds}`);
  };

  
  const clockOut = async () => {

    setClockoutLoading(true);
    localStorage.setItem("clock-status", "out");
    localStorage.setItem("clock-out-time", new Date().getTime());
    localStorage.setItem(
      "clockOutTime",
      new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
    );

    clearInterval(tc3);
    clearInterval(tc4);
    setMount(!mount);
    setClock(0);

    const breakIn = localStorage.getItem("breakInTime");
    const breakOut = localStorage.getItem("breakOutTime");

    // Convert breakIn and breakOut to Date objects
      let date1 , date2;
       if(breakIn !== null){
          date1 = parseTime(breakIn);

       }
       if(breakOut !== null){
         date2 = parseTime(breakOut);

       }

        let differenceMs , hours , minutes , seconds , differenceText;

        if(breakIn !== null && breakOut !== null){
          differenceMs = date2.getTime() - date1.getTime();

        // Convert the difference to a readable format
         hours = Math.floor(differenceMs / (1000 * 60 * 60));
         minutes = Math.floor((differenceMs % (1000 * 60 * 60)) / (1000 * 60));
         seconds = Math.floor((differenceMs % (1000 * 60)) / 1000);


        differenceText = `${hours}:${minutes}:${seconds}`;
        }

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

    const clockInDate = localStorage.getItem("clock-in-date");

    const attendence = await postAttendence({
      clockInDetail: localStorage.getItem("clockInTime"),
      // clockInDetail: localStorage.getItem("clock-in"),
      breakTime: differenceText,
      clockOutDetail: localStorage.getItem("clockOutTime"),
      id: userData?._id,
      clockInDate: clockInDate,
    });

    localStorage.removeItem("clock-in");
    localStorage.removeItem("clock-status");
    localStorage.removeItem("clock-out-time");
    localStorage.removeItem("clockOutTime");
    localStorage.removeItem("clockInTime");
    localStorage.removeItem("breakInTime");
    localStorage.removeItem("breakOutTime");
    localStorage.removeItem("clock-in-date");
    localStorage.removeItem("break-time");
    localStorage.removeItem("break-seconds");
    localStorage.removeItem("date1");


    setClockoutLoading(false);
  };

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

    const notify = await postNotification(daysGap, formdata.employeeName , user?.fullName);

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

  useEffect(()=>{
    getAnnoucement();
  },[])


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
            pop1={pop1}
            setPop1={setPop1}
          />

          <div className="em2">
            <div >
              
              <div className="bedge">

                <div className=" w-full  dashwar ">

                  <div className="topWrap">
                    <h2>Hi {userDetail?.fullName}</h2>
                    <p>Real-time insights and performance overview</p>
                  </div>

                  <div className="attend-ctiveWrapempp">

                    {/* left side  */}
                    <div className="attenLeft">

                      <div className="celWrap">
                        <nav>
                          <img src={cel1} alt="" />
                          <span>Today's Celebrations</span>
                        </nav>

                        <div className="partPeople">
                          {people.map((data, index) => (
                            <div className="singcel" key={index}>
                              <div className="capWrap">
                                <img src={data.img} alt="" />
                                <img src={cap} alt="" className="cap" />
                              </div>
                              <div>
                                <h3>{data.name}</h3>
                                <p>{data.work}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* second  */}
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
                            <NavLink to="/employeeDash/atten">
                              <Calendar onChange={onChange} value={value} />
                            </NavLink>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* righr side  */}
                    <div className="attenRight">
                      {/* frists  */}
                      <div className="hrmActRight55">
                        <div className="markAttWrap55">
                          <div className="markAtt55">
                            <img src={lighting} alt="" />
                            <p> Mark Attandance</p>
                          </div>

                          <hr />

                          <div className="myOficeWrap55">
                            <div className="oficTime55">
                              <div className="ofSin55">
                                <div className="singlTime55">
                                  <p>{Math.floor(clock / 3600)}</p>
                                </div>
                                <p className="day55">Hours</p>
                              </div>

                              <div className="ofSin55">
                                <div className="singlTime55">
                                  <p>{Math.floor((clock % 3600) / 60)}</p>
                                </div>
                                <p className="day55">Minutes</p>
                              </div>

                              <div className="ofSin55">
                                <div className="singlTime55">
                                  <p>{clock % 60}</p>
                                </div>

                                <p className="day55">Seconds</p>
                              </div>
                            </div>

                            <div className="clockINOUTBtn55">
                              {(mount || !mount) && (
                                <button className="clockIN55" onClick={clockIn}>
                                  <svg
                                    width="19"
                                    height="21"
                                    viewBox="0 0 19 21"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M6.5 1.5V0H12.5V1.5H6.5ZM8.75 12.675H10.25V6.925H8.75V12.675ZM9.5 20.975C8.26667 20.975 7.10417 20.7375 6.0125 20.2625C4.92083 19.7875 3.96667 19.1417 3.15 18.325C2.33333 17.5083 1.6875 16.5542 1.2125 15.4625C0.7375 14.3708 0.5 13.2083 0.5 11.975C0.5 10.7417 0.7375 9.57917 1.2125 8.4875C1.6875 7.39583 2.33333 6.44167 3.15 5.625C3.96667 4.80833 4.92083 4.1625 6.0125 3.6875C7.10417 3.2125 8.26667 2.975 9.5 2.975C10.6167 2.975 11.6667 3.1625 12.65 3.5375C13.6333 3.9125 14.5083 4.43333 15.275 5.1L16.55 3.825L17.6 4.875L16.325 6.15C16.925 6.81667 17.4375 7.625 17.8625 8.575C18.2875 9.525 18.5 10.6583 18.5 11.975C18.5 13.2083 18.2625 14.3708 17.7875 15.4625C17.3125 16.5542 16.6667 17.5083 15.85 18.325C15.0333 19.1417 14.0792 19.7875 12.9875 20.2625C11.8958 20.7375 10.7333 20.975 9.5 20.975ZM9.5 19.475C11.5833 19.475 13.3542 18.7458 14.8125 17.2875C16.2708 15.8292 17 14.0583 17 11.975C17 9.89167 16.2708 8.12083 14.8125 6.6625C13.3542 5.20417 11.5833 4.475 9.5 4.475C7.41667 4.475 5.64583 5.20417 4.1875 6.6625C2.72917 8.12083 2 9.89167 2 11.975C2 14.0583 2.72917 15.8292 4.1875 17.2875C5.64583 18.7458 7.41667 19.475 9.5 19.475Z"
                                      fill="white"
                                    />
                                  </svg>
                                  {
                                    loading ? 
                                    <span class="loader"></span>
                                    :
                                  
                                  <span>
                                    {!localStorage.getItem("clock-status")
                                      ? "Check-in"
                                      : localStorage.getItem("clock-status") ===
                                        "break"
                                      ? "Break"
                                      : localStorage.getItem("clock-status") ===
                                        "resume"
                                      ? "Resume"
                                      : localStorage.getItem("clock-status") ===
                                        "out"
                                      ? "Check-in"
                                      : null}
                                  </span>

}
                                </button>
                              )}

                              {(mount || !mount) && (
                                <button
                                  className="clockOUT55"
                                  disabled={
                                    !localStorage.getItem("clock-status") ||
                                    localStorage.getItem("clock-status") ===
                                      "out"
                                  }
                                  onClick={clockOut}
                                >
                                  <svg
                                    width="19"
                                    height="21"
                                    viewBox="0 0 19 21"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M6.5 1.5V0H12.5V1.5H6.5ZM8.75 12.675H10.25V6.925H8.75V12.675ZM9.5 20.975C8.26667 20.975 7.10417 20.7375 6.0125 20.2625C4.92083 19.7875 3.96667 19.1417 3.15 18.325C2.33333 17.5083 1.6875 16.5542 1.2125 15.4625C0.7375 14.3708 0.5 13.2083 0.5 11.975C0.5 10.7417 0.7375 9.57917 1.2125 8.4875C1.6875 7.39583 2.33333 6.44167 3.15 5.625C3.96667 4.80833 4.92083 4.1625 6.0125 3.6875C7.10417 3.2125 8.26667 2.975 9.5 2.975C10.6167 2.975 11.6667 3.1625 12.65 3.5375C13.6333 3.9125 14.5083 4.43333 15.275 5.1L16.55 3.825L17.6 4.875L16.325 6.15C16.925 6.81667 17.4375 7.625 17.8625 8.575C18.2875 9.525 18.5 10.6583 18.5 11.975C18.5 13.2083 18.2625 14.3708 17.7875 15.4625C17.3125 16.5542 16.6667 17.5083 15.85 18.325C15.0333 19.1417 14.0792 19.7875 12.9875 20.2625C11.8958 20.7375 10.7333 20.975 9.5 20.975ZM9.5 19.475C11.5833 19.475 13.3542 18.7458 14.8125 17.2875C16.2708 15.8292 17 14.0583 17 11.975C17 9.89167 16.2708 8.12083 14.8125 6.6625C13.3542 5.20417 11.5833 4.475 9.5 4.475C7.41667 4.475 5.64583 5.20417 4.1875 6.6625C2.72917 8.12083 2 9.89167 2 11.975C2 14.0583 2.72917 15.8292 4.1875 17.2875C5.64583 18.7458 7.41667 19.475 9.5 19.475Z"
                                      fill="white"
                                    />
                                  </svg>
                                  {
                                    clockoutLoading ?
                                    <span class="loader2"></span>
                                    :

                                  <span>Check-out</span>
                                  }
                                </button>
                              )}
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* second  */}
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
                    </div>
                    
                  </div>

                  {/* this is for leave type  */}
                  <div className="hrLefThi22">

                    <div className="leaves_request_emp">

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

                  {/* this is for annoucement  */}
                  <div className="hrLefThi">

                     <div className="annNav">

                    <img src={annNav} alt="" />
                    <h3>Announcement Lists </h3>

                     </div>

                    <div className="relative overflow-x-auto annTable">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                        <thead className="text-xs uppercase textALLtITL ">
                          <tr>
                            <th scope="col" className="px-6 py-3 taskTitl">
                              TITLE
                            </th>
                            <th scope="col" className="px-2 py-3 taskTitl">
                              START DATE
                            </th>
                            <th scope="col" className="px-6 py-3 taskTitl">
                              END DATE
                            </th>

                            <th scope="col" className="px-6 py-3 taskTitl">
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
                  </div>
                </div>

                <>
                
                  <div
                    style={styleThing}
                    id="authentication-modal"
                    tabindex="-1"
                    aria-hidden="true"
                    class="user_class  hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center mt-10 md:inset-0 h-[calc(100%-1rem)] max-h-full "
                  >
                    <div class="relative  p-4 w-full wrapping max-w-md max-h-full">
                   
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
                
              </div>
            </div>
          </div>

          {popup1 && (
            <div className="hrmsystemsetup-leftmenu">
              <div className="hrmsystemsetup-container">
                <h1> Hlo Dinesh </h1>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default EmployeeDash;