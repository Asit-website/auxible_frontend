import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import HrSidebar from "../../Hr/Sidebar/HrSidebar";
import HrNavbar from "../../Hr/Navbar/HrNavbar";
import ac1 from "../../images/ac1.png";
import ac2 from "../../images/ac2.png";
import ac3 from "../../images/ac3.png";
import ac4 from "../../images/ac4.png";
import clock2 from "../../images/clock2.png";
import timeLog from "../../images/timeLog.png";
import "./hrm.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import refresh from "../../images/bx-refresh.png";
import annouce from "../../images/annouce.png";
import holi from "../../images/holid.png";
import taskA from "../../images/taskAs.png";
import sites from "../../images/sites.svg";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import cel1 from "../../images/cel1.png";
import cap from "../../images/cap.png";
import Calendar from "react-calendar";
import peo1 from "../../images/peo1.png";
import meeting from "../../images/meeting.svg";
import goals from "../../images/goals.png";
import lighting from "../../images/ligting.svg";
import leavimg from "../../images/leaveImg.png";
import cas from "../../images/cssual.png";
import sick2 from "../../images/sick2.png";
import annNav from "../../images/annNav.png";
import cutt from "../../images/cutt.png";
import cross1 from "../../images/cross1.png";


import toast from "react-hot-toast";

var tc3;
var tc4;

const EmployeeHRM = ({
  pop1,
  setPop1,
  pop,
  setPop,
  setAlert,
  isHr = false,
}) => {
  const {
    user,
    getUsers,
    fetchUserOwnDetailApi , 
    getActiveUsersCount,
    postActivity,
    getTotalLeavesCount,
    fetchAnnoucement,
    getHoliday,
    postAttendence,
    fetchTodayLeave,
    postLeave,
    postNotification, 
    postNotification2, 
    getLeaveTypes,
    getTodayBirthday,
    changeStatusBreak,
    allEmployee , 
    LeaveAllowApihandler , leaveTypeApi , postHalfDay , CreateExpense
  } = useMain();



 


  const user2 = JSON.parse(localStorage.getItem("hrms_user"));

  const [counts, setCounts] = useState({
    activeEmployees: 0,
    leaveRequest: 0,
    employeesLeaves: 0,
    totalEmployees: 0,
    halfDayRequest:0 
  });

  const [loadFlag, setLoadFlag] = useState(true);

  const [loading, setLoading] = useState(false);
  const [clockoutLoading, setClockOutLoading] = useState(false);

  const [totalLeave, setTotalLeave] = useState(0);
  const [totalHalfDay, setTotalHalfDay] = useState(0);

  let hrms_user = JSON?.parse(localStorage.getItem("hrms_user"));
  let hrms_permission = JSON?.parse(localStorage.getItem("hrms_permission"));

  const [todayTask, setTodayTask] = useState("");

  const {
    activeEmployeePermission,
    halfDayPermission ,
    leaveRequestPermission,
    employeeOnLeavePermission,
    totalEmployeePermission,
    
  } = hrms_permission;

  const { role } = hrms_user;

  const fetchUserOwnDetailHandler = async()=>{
    const ans = await fetchUserOwnDetailApi(hrms_user?._id);
    console.log("ans " ,ans);
    if(ans?.status){
      localStorage.setItem("hrms_user", JSON.stringify(ans?.data));
      localStorage.setItem("hrms_permission", JSON.stringify(ans?.data?.PermissionRole || {}));
    }
 }

  useEffect(()=>{

   if(hrms_user){
      fetchUserOwnDetailHandler();
   }

  },[hrms_user])

  const [formdata, setFormdata] = useState({
    employeeName: "",
    leaveType: "",
    start: "",
    end: "",
    reason: "",
  });

  const [formdata2, setFormdata2] = useState({
    employeeName: "",
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
  const changeHandler2 = (e) => {
    const { name, value } = e.target;

    setFormdata2((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [leaveType, setLeaveType] = useState([]);

  const [value, onChange] = useState(new Date());

  const [announce, setAnnounce] = useState([]);

  const [holiday, setHoliday] = useState([]);

  const [star1, setStar1] = useState(false);
  const [star2, setStar2] = useState(false);

  const [openAnn, setOpenAnn] = useState(false);

  const [task, setTask] = useState([
    {
      name: "Chirag",
      assignDate: "31/05/2023",
      endDate: "31/05/2023",
      task: "Madfish",
    },
    {
      name: "Chirag",
      assignDate: "31/05/2023",
      endDate: "31/05/2023",
      task: "Madfish",
    },
    {
      name: "Chirag",
      assignDate: "31/05/2023",
      endDate: "31/05/2023",
      task: "Madfish",
    },
    {
      name: "Chirag",
      assignDate: "31/05/2023",
      endDate: "31/05/2023",
      task: "Madfish",
    },
  ]);

  const getData = async () => {
    setLoadFlag(true);
    const ans = await getUsers();
    const ans1 = await getActiveUsersCount();
    
    const ans2 = await getTotalLeavesCount();
    setTotalLeave(ans2.totalLeave);
    setTotalHalfDay(ans2?.halfDay);

    setCounts({
      ...counts,
      totalEmployees: ans.data.length,
      activeEmployees: ans1.data,
    });
    setLoadFlag(false);
  };

  var [clock, setClock] = useState(0);
  var [breakClock, setBreakClock] = useState(0);

  const navigate = useNavigate();

  const [mount, setMount] = useState(false);

  const [leavedata , setLeavedata] = useState({
    casualLeave:0 , 
    paidLeave:0
  });

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

  const breakchangeapi = async (isBreakIn) => {
    let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

    const resp = await changeStatusBreak({ isBreakIn, userId: hrms_user?._id });
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
        clockIn: localStorage.getItem("clock-in")
          ? localStorage.getItem("clock-in")
          : new Date().getTime(),
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
    } else {
      if (t === "break") {
        localStorage.setItem(
          "breakInTime",
          new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          })
        );

        await breakchangeapi(true);

        localStorage.setItem("break-time", new Date().getTime());
        localStorage.setItem("clock-status", "resume");

        let t3 = localStorage.getItem("break-seconds");

        tc3 = setInterval(() => {
          setBreakClock(++t3);
        }, 1000);
      } else if (t === "resume") {
        localStorage.setItem(
          "breakOutTime",
          new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          })
        );

        await breakchangeapi(false);

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

        // localStorage.setItem("clock-in", new Date().getTime());
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
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes, seconds] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }

    return new Date(
      `${new Date().toDateString()} ${hours}:${minutes}:${seconds}`
    );
  };

  const clockOut = async () => {
    if (todayTask === "") {
      return alert("Please Enter Your Task");
    }
    setClockOutLoading(true);

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

    await breakchangeapi(false);

    // Convert breakIn and breakOut to Date objects
    // Convert breakIn and breakOut to Date objects
    let date1, date2;
    if (breakIn !== null) {
      date1 = parseTime(breakIn);
    }
    if (breakOut !== null) {
      date2 = parseTime(breakOut);
    }

    let differenceMs, hours, minutes, seconds, differenceText;

    if (breakIn !== null && breakOut !== null) {
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
      todayTask: todayTask,
    });

    const userDataString = localStorage.getItem("hrms_user");

    const userData = JSON.parse(userDataString);

    const clockInDate = localStorage.getItem("clock-in-date");

    const attendence = await postAttendence({
      clockInDetail: localStorage.getItem("clockInTime"),
      breakTime: differenceText,
      clockOutDetail: localStorage.getItem("clockOutTime"),
      id: userData?._id,
      clockInDate: clockInDate,
      todayTask: todayTask,
    });

    setTodayTask("");

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

    setClockOutLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const getAnnoucement = async () => {
    const ans = await fetchAnnoucement();
    // setAnnounce(ans?.data);
    const reversedArray = ans?.data?.reverse();
    setAnnounce(reversedArray);
  };

  const getHolidays = async () => {
    const ans = await getHoliday();
    setHoliday(ans?.data);
  };

  useEffect(() => {
    getAnnoucement();
    getHolidays();
  }, []);

  const [leaveCount, setLeaveCount] = useState(0);

  const getLeavesEmp = async () => {
    const ans = await fetchTodayLeave();
    if (ans?.status) {
      setLeaveCount(ans?.data?.length);
    }
  };

  const [showleave, setShowLeave] = useState(false);
  const [showleave2, setShowLeave2] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Loading...");

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



    const notify = await postNotification(
      daysGap,
      formdata.employeeName,
      user?.fullName
    );

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

  const submitHandler2 = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Loading...");

    const startDate = new Date(formdata2.start);
    const endDate = new Date(formdata2.end);
    const timeDifference = Math.abs(endDate - startDate);
    const daysGap = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    const ans = await postHalfDay({
      from: formdata2.start,
      to: formdata2.end,
      days: daysGap,
      reason: formdata2.reason,
    });

    const notify = await postNotification2(
      daysGap,
      formdata2.employeeName,
      user?.fullName
    );

    if (ans.success) {
      toast.success("Successfully applied");
      setStar2(false);
      setShowLeave2(false);
    }
    setFormdata2({
      employeeName: "",
      leaveType: "",
      start: "",
      end: "",
    });

    toast.dismiss(toastId);
  };

  const fetchLeaveType = async () => {
    const resp = await getLeaveTypes();
    if (resp.success) {
      setLeaveType(resp?.data);
    }
  };

  const [userbirth, setUserBirth] = useState([]);
  const [totalLeavetaken, setLeaveTaken] = useState("00");

  const getTodayBirthdayapi = async () => {
    const ans = await getTodayBirthday();
    setUserBirth(ans);
  };

  useEffect(() => {
    getLeavesEmp();
    fetchLeaveType();
    getTodayBirthdayapi();
    // setLeaveTaken(hrms_user?.totalLeaves);
  }, []);

  useEffect(() => {
    const delay = 10 * 60 * 60 * 1000; // 10 hours in milliseconds

    let timeoutId; 

    
    const clockInTime = localStorage.getItem("clockInTime");

    if (clockInTime) {
      
      timeoutId = setTimeout(() => {
        clockOut(); 
      }, delay);
    }


    return () => clearTimeout(timeoutId);
  }, []); 


  // THIS IS FOR LEAVE ALLOWANCE 
   const [leaveAllowance , setLeaveAllow] = useState(false);
   const [expenseShow , setExpenseShow] = useState(false);

   const [allowData , setAllowData] = useState({
    user:"" ,
    allowance:""
   })

   const [allEmp , setAllEmp] = useState([]);

    const fetchemployess = async()=>{
      const resp = await allEmployee();
       setAllEmp(resp?.emp);
    }

    const LeaveAllowApi = async()=>{

       if(!allowData?.user || !allowData?.allowance){
        return alert("Please Provide the complete details")
       }
      const toastId = toast.loading("Loading...");
       const resp = await LeaveAllowApihandler(allowData?.user , allowData?.allowance);
       
       if(resp?.success){
         toast.success("Successfuly Added");
         localStorage.setItem("hrms_user" , JSON.stringify(resp?.userDetail));
        }
        toast.dismiss(toastId);
        setAllowData({
           user:"" ,
          allowance:""
        })
    }

    const leavestypecount = async()=>{
      const resp = await leaveTypeApi({id:user2?._id});
       setLeaveTaken(resp?.data?.totalLeaves)
       setLeavedata({
        casualLeave: resp?.data?.casualLeave , 
        paidLeave: resp?.data?.paidLeave
       })
    }

    useEffect(()=>{
      fetchemployess();
      leavestypecount();
    },[])


    const [openExpense , setOpenExpense] = useState(false);

    const [formdata3 ,setFormdata3] = useState({
      title:"" ,itemCode:"" , quantity:"" , unit:"" ,  purchasePrice:"" , salesPrice:"" , purchaseDate:"" ,  category:""
    })

    const changeHandler3 = (e)=>{
      const {name ,value} = e.target;
      setFormdata3((prev)=>({
          ...prev ,
          [name]:value
      }))
    }

    const expenseHandler = async(e)=>{
      const toastId =  toast.loading("Loading...");
       e.preventDefault();
       const resp= await CreateExpense({...formdata3});
        toast.success("Successfuly Created");
        toast.dismiss(toastId);
        setOpenExpense(false);
        setFormdata3({  title:"" ,itemCode:"" , quantity:"" , unit:"" ,  purchasePrice:"" , salesPrice:"" , purchaseDate:"" ,  category:""})
     }


  return (
    <>
      <div className="employee-dash relative h-full">
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

          {loadFlag ? (
            "Loading .."
          ) : (
            <div className="em emm">
              <div className="flex-col">
                {/* this is same fo Employeee and Admin  */}

                <div className="firstD">
                  {/* left side */}
                  <div className="dFirLef">
                    <h2>Hi {user2?.fullName}</h2>
                    <p>Real-time insights and performance overview</p>
                  </div>

                  {/* right side  */}
                  <button
                    onClick={() => {
                      window.location.href = "/adminDash/HRM";
                    }}
                    className="refreBtn"
                  >
                    Refresh{" "}
                    <span>
                      <img src={refresh} alt="" />
                    </span>
                  </button>
                </div>

                {/* second boxes => This is for Admin and Permission */}
                {(role === "ADMIN" ||
                  activeEmployeePermission ||
                  leaveRequestPermission ||
                  employeeOnLeavePermission ||
                  halfDayPermission || 
                  totalEmployeePermission) && (
                  <div className="hrLefFir">

                    {(activeEmployeePermission || role === "ADMIN") && (
                      <NavLink
                        className="skm"
                        to={`/adminDash/HRM/activeEmployee`}
                      >
                        <div className="sinActDat colorChange1 ">
                          <img className="firImg" src={ac1} alt="" />

                          <div className="titWrap">
                            <h3>Active Employee</h3>
                            <p className="hrmlRNu">{counts?.activeEmployees}</p>
                          </div>
                        </div>
                      </NavLink>
                    )}

                    {(halfDayPermission || role === "ADMIN") && (
                      <NavLink
                        className="skm"
                        to={role === "ADMIN" ? `/adminDash/HRM/halfDayRequest`:"/employeeDash/HRM/halfDayRequest"}
                      >
                        <div className="sinActDat colorChange1">
                          <img className="firImg" src={ac1} alt="" />

                          <div className="titWrap">
                            <h3>Half Day Request</h3>
                            <p className="hrmlRNu">{totalHalfDay}</p>
                          </div>
                        </div>
                      </NavLink>
                    )}

                    {(leaveRequestPermission || role === "ADMIN") && (
                      <NavLink
                        className="skm"
                        to={`/adminDash/HRM/leaveRequest`}
                      >
                        <div className="sinActDat colorChange2">
                          <img className="firImg" src={ac2} alt="" />

                          <div className="titWrap">
                            <h3>Leave Request</h3>
                            <p className="hrmlRNu">{totalLeave}</p>
                          </div>
                        </div>
                      </NavLink>
                    )}

                    {(employeeOnLeavePermission || role === "ADMIN") && (
                      <NavLink
                        className="skm"
                        to={`/adminDash/HRM/LeaveEmployee`}
                      >
                        <div className="sinActDat colorChange3">
                          <img className="firImg" src={ac3} alt="" />

                          <div className="titWrap">
                            <h3>Employee on Leave</h3>

                            <p className="hrmlRNu">{leaveCount}</p>
                          </div>
                        </div>
                      </NavLink>
                    )}

                    {(totalEmployeePermission || role === "ADMIN") && (
                      <NavLink
                        className="skm"
                        to={`/adminDash/HRM/totalEmployee`}
                      >
                        <div className="sinActDat colorChange4">
                          <img className="firImg" src={ac4} alt="" />

                          <div className="titWrap">
                            <h3>Total Employee</h3>

                            <p className="hrmlRNu">{counts?.totalEmployees}</p>
                          </div>
                        </div>
                      </NavLink>
                    )}
                  </div>
                )}

                {role === "ADMIN" && (
                  <main className="attend-ctiveWrap">
                    {/* left side */}

                    <div className="hrmActLeft">
                      {/* second  */}
                      <NavLink to="/adminDash/announcement">
                        <div className="hrLefThi">
                          <h2 className="headind">
                            {" "}
                            <img src={annouce} alt="" />{" "}
                            <span>Announcement Lists</span>
                          </h2>

                          <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 serrup">
                              <thead className="text-xs uppercase textALLtITL ">
                                <tr>
                                  <th
                                    scope="col"
                                    className="px-3  py-3 taskTitl"
                                  >
                                    TITLE
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-3  py-3 taskTitl"
                                  >
                                    START DATE
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-3 py-3 taskTitl"
                                  >
                                    END DATE
                                  </th>

                                 
                                </tr>
                              </thead>
                              <tbody>
                                {announce?.map((val, index) => {
                                  return (
                                    <tr
                                      key={index}
                                      className="bg-white border-b  "
                                    >
                                      <th
                                        scope="row"
                                        className="px-3 py-4 font-medium tasklo  whitespace-nowrap taskAns taskans11"
                                      >
                                        {val?.title}
                                      </th>
                                      <td className="px-3 py-4 taskAns lolo taskans11">
                                        {val?.startDate}
                                      </td>
                                      <td className="px-3 py-4 taskAns lolo taskans11">
                                        {val?.endDate}
                                      </td>
                                    
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </NavLink>

                      {/* third  */}
                      <NavLink to="/adminDash/announcement">
                        <div className="hrLefThi">
                          <h2 className="headind">
                            {" "}
                            <img src={taskA} alt="" /> <span>Task Assign</span>
                          </h2>

                          <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                              <thead className="text-xs uppercase textALLtITL ">
                                <tr>
                                  <th
                                    scope="col"
                                    className="px-2  py-3 taskTitl"
                                  >
                                    Name
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-3  py-3 taskTitl"
                                  >
                                    Assign Date
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-3 py-3 taskTitl"
                                  >
                                    END DATE
                                  </th>

                                  <th
                                    scope="col"
                                    className="px-3 py-3 taskTitl"
                                  >
                                    Tasks
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {task?.map((val, index) => {
                                  return (
                                    <tr
                                      key={index}
                                      className="bg-white border-b  "
                                    >
                                      <th
                                        scope="row"
                                        className="px-2 py-4 font-medium tasklo whitespace-nowrap taskAns "
                                      >
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
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </NavLink>
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

                        <div className="todaywords">
                          <input
                            type="text"
                            placeholder="today task"
                            value={todayTask}
                            onChange={(e) => setTodayTask(e.target.value)}
                          />
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
                            {(mount || !mount) && (
                              <button
                                className="clockIN cursor-pointer"
                                onClick={clockIn}
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
                                {loading ? (
                                  <span class="loader"></span>
                                ) : (
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
                                )}
                              </button>
                            )}

                            {(mount || !mount) && (
                              <button
                                className="clockOUT cursor-pointer"
                                disabled={
                                  !localStorage.getItem("clock-status") ||
                                  localStorage.getItem("clock-status") === "out"
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
                                {clockoutLoading ? (
                                  <span class="loader2"></span>
                                ) : (
                                  <span>Check-out</span>
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        <a
                          href="#"
                          className="block serad max-w-2xl p-5 bg-white border timeWrap border-gray-200 rounded-lg shadow"
                        >
                          {/* <div className="timeLogWrap">
                            <img src={timeLog} alt="" />
                          </div> */}

                          <div className="timelogscont">
                             <img src={timeLog} alt="" />
                              <span>Time Log</span>
                          </div>

                          <hr />

                          <h5 className="todayText addpading">Today</h5>

                          <hr />

                          <div className="time_emp_desh_flex addpading">
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

                            <div className="time_emp_desh ">
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

                          <h5 className="thisMonText addpading">This month</h5>

                          <hr />

                          <div className="time_emp_desh_flex2 addpading">
                            <img src={clock2} alt="" />

                            <div className="time_emp_desh addpading mt-3">
                              <h6 className="timeEmptext">168 hrs</h6>
                            </div>
                          </div>
                        </a>
                      </div>

                      {/* second  */}

                      <NavLink to="/adminDash/HRM/holiday">
                        <div className="hrLefThi">
                          <h2 className="holiHead4">
                            <img src={holi} alt="" /> <span>Holiday Lists</span>
                          </h2>

                          <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                              <thead className="text-xs uppercase textALLtITL ">
                                <tr>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 taskTitl"
                                  >
                                    OCCASION
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-2 py-3 taskTitl"
                                  >
                                    START DATE
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 taskTitl"
                                  >
                                    END DATE
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {holiday?.map((val, index) => {
                                  return (
                                    <tr
                                      key={index}
                                      className="bg-white border-b  "
                                    >
                                      <th
                                        scope="row"
                                        className="px-6 py-4 font-medium tasklo whitespace-nowrap taskAns "
                                      >
                                        {val?.holidayName}
                                      </th>
                                      <td className="px-2 py-4 taskAns">
                                        {val?.startDate}
                                      </td>
                                      <td className="px-6 py-4 taskAns">
                                        {val?.endDate}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </NavLink>
                    </div>
                  </main>
                )}

                {role === "EMPLOYEE" && (
                  <>
                    <div className=" mt-4 attend-ctiveWrapempp">
                      {/* left side  */}
                      <div className="attenLeft">
                        <div className="celWrap">
                          <nav>
                            <img src={cel1} alt="" />
                            <span>Today's Celebrations</span>
                          </nav>

                          <div className="partPeople">
                            {userbirth?.map((data, index) => (
                              <div className="singcel" key={index}>
                                <div className="capWrap">
                                  <img
                                    src={data.profileImage}
                                    className="phrofileimg"
                                  />
                                  <img src={cap} alt="" className="cap" />
                                </div>
                                <div>
                                  <h3>{data?.fullName}</h3>
                                  <p>{data?.designation}</p>
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

                            <div className="todaywords">
                              <input
                                type="text"
                                placeholder="today task"
                                value={todayTask}
                                onChange={(e) => setTodayTask(e.target.value)}
                              />
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
                                  <button
                                    className="clockIN55"
                                    onClick={clockIn}
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
                                    {loading ? (
                                      <span class="loader"></span>
                                    ) : (
                                      <span>
                                        {!localStorage.getItem("clock-status")
                                          ? "Check-in"
                                          : localStorage.getItem(
                                              "clock-status"
                                            ) === "break"
                                          ? "Break"
                                          : localStorage.getItem(
                                              "clock-status"
                                            ) === "resume"
                                          ? "Resume"
                                          : localStorage.getItem(
                                              "clock-status"
                                            ) === "out"
                                          ? "Check-in"
                                          : null}
                                      </span>
                                    )}
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
                                    {clockoutLoading ? (
                                      <span class="loader2"></span>
                                    ) : (
                                      <span>Check-out</span>
                                    )}
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
                            className="block serad max-w-2xl p-5 bg-white border timeWrap border-gray-200 rounded-lg shadow    "
                          >
                           
                       <div className="timelogscont">
                             <img src={timeLog} alt="" />
                              <span>Time Log</span>
                          </div>

                            <hr />

                            <h5 className="todayText addpading">Today</h5>

                            <hr />

                            <div className="time_emp_desh_flex addpading">
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

                            <h5 className="thisMonText addpading">This month</h5>

                            <hr />

                            <div className="time_emp_desh_flex2">
                              <img src={clock2} alt="" />

                              <div className="time_emp_desh addpading mt-3">
                                <h6 className="timeEmptext">168 hrs</h6>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="hrLefThi22">
                      <div className="leaves_request_emp">

                        <div className="adflex">
                          <img src={leavimg} alt="" />
                          <h3>Leaves</h3>
                        </div>

                        <div className="flex addpages items-center">

                        <button
                          data-modal-target="authentication-modal"
                          data-modal-toggle="authentication-modal"
                          class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          type="button"
                          onClick={() => {
                            setStar2(!star1);
                            setShowLeave2(true);
                          }}
                        >
                          <span> Create Half Day</span>
                        </button>

                        <button
                          data-modal-target="authentication-modal"
                          data-modal-toggle="authentication-modal"
                          class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          type="button"
                          onClick={() => {
                            setStar1(!star1);
                            setShowLeave(true);
                          }}
                        >
                          <span> Create Leave</span>
                        </button>

                      {
                       ( hrms_permission?.userAllowCrtPermission || hrms_user?.role === "ADMIN") && 
                        <button
                        data-modal-target="authentication-modal"
                        data-modal-toggle="authentication-modal"
                        class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        type="button"
                        onClick={() => {
                          setLeaveAllow(true);
                        }}
                      >
                        <span>Leave Allowance</span>
                      </button>
                      }

{
  (hrms_permission?.createExpensePermission || hrms_user?.role === "ADMIN") && 

<button
                        data-modal-target="authentication-modal"
                        data-modal-toggle="authentication-modal"
                        class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        type="button"
                        onClick={() => {
                          setOpenExpense(true);
                          // navigate("/adminDash/HRM/Expense")
                        }}
                      >
                        <span>Create Expense</span>
                      </button>

}

{
    (hrms_permission?.showExpensePermission || hrms_user?.role === "ADMIN") && 

                      <button
                        data-modal-target="authentication-modal"
                        data-modal-toggle="authentication-modal"
                        class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        type="button"
                        onClick={() => {
                          navigate("/adminDash/HRM/Expense")
                        }}
                      >
                        <span>All Expense</span>
                      </button>

}

                        </div>


                      </div>

                      <hr />

                      <div className="leave_setion_emp">

                        
                        <div className="totel_leave_allowance1">

                          
                          <div className="totalLeaText">
                            <h5>{user2?.userAllowance}</h5>
                            <p>Total leave allowance</p>
                          </div>

                          <div>
                            <p>
                              <img src={cas} alt="" />
                              <span className="cas"> casual - {leavedata?.casualLeave}</span>
                            </p>
                            <p>
                              <img src={sick2} alt="" />
                              <span className="cas">Paid - {leavedata?.paidLeave}</span>{" "}
                            </p>
                          </div>

                        </div>

                        <div className="totel_leave_allowance1">
                          <div className="totalLeaText">
                            <h5>{totalLeavetaken}</h5>
                            <p>Total leave taken</p>
                          </div>
                          <div>
                            <p>
                              <img src={cas} alt="" />
                              <span className="cas"> casual - {leavedata?.casualLeave} </span>
                            </p>
                            <p>
                              <img src={sick2} alt="" />
                              <span className="cas">Paid - {leavedata?.paidLeave}</span>{" "}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="leave_setion_emp">
                        <div className="totel_leave_allowance1">
                          <div className="totalLeaText">
                            <h5>
                              {parseInt(user2?.userAllowance) - parseInt(totalLeavetaken) >= 0
                                ? parseInt(user2?.userAllowance) - parseInt(totalLeavetaken)
                                : 0}
                            </h5>
                            <p>Total leave available</p>
                          </div>
                          <div>
                            <p>
                              <img src={cas} alt="" />
                              <span className="cas"> casual - {leavedata?.casualLeave}</span>
                            </p>
                            <p>
                              <img src={sick2} alt="" />
                              <span className="cas">Paid - {leavedata?.paidLeave}</span>{" "}
                            </p>
                          </div>
                        </div>

                        <div className="totel_leave_allowance1">
                          <div className="totalLeaText">
                            <h5>00</h5>
                            <p>Total request pending</p>
                          </div>
                          <div>
                            <p>
                              <img src={cas} alt="" />
                              <span className="cas"> casual - {leavedata?.casualLeave}</span>
                            </p>
                            <p>
                              <img src={sick2} alt="" />
                              <span className="cas">Paid - {leavedata?.paidLeave}</span>{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* this is for annoucement  */}
                    <div className="hrLefThi">
                      <div className="adflex">
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

                            
                            </tr>
                          </thead>

                          <tbody>
                            {announce?.map((val, index) => {
                              return (
                                <tr
                                onClick={()=>setOpenAnn(val)}
                                  key={index}
                                  className="bg-white border-b singleannoucs "
                                >
                                  <th
                                    scope="row"
                                    className="px-3 py-4 font-medium tasklo  whitespace-nowrap taskAns taskans11"
                                  >
                                    {val?.title}
                                  </th>
                                  <td className="px-3 py-4 taskAns lolo taskans11">
                                    {val?.startDate}
                                  </td>
                                  <td className="px-3 py-4 taskAns lolo taskans11">
                                    {val?.endDate}
                                  </td>
                                  {/* <td className="px-3 py-4 taskAns taskans11">
                                    {val?.description}
                                  </td> */}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}

                {/* this is create leave  */}
                {showleave && (
                  <>
                    <div className="leavewrapping">
                      <div className="crelevecont">
                        <div class="crelavetopsec">
                          <h3 class="leaveHead "> Leave Request </h3>

                          <img
                            src={cutt}
                            onClick={() => setShowLeave(false)}
                            alt=""
                          />
                        </div>

                        <hr />

                        {/* <!-- Modal body --> */}
                        <form className="levaecretaeform" action="#">
                          <div class="user_classleave">
                            <label>Leave type</label>

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

                          <div className="levaecreflex">
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

                          <div class="levelreasons">
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

                          <div className="leavebuttons">
                            <button
                              onClick={(e) => {
                                e.preventDefault();

                                submitHandler(e);
                              }}
                              type="button"
                              className="leaverqbtns"
                            >
                              <span> Request send</span>
                            </button>

                            <button
                              onClick={() => setStar1(false)}
                              type="button"
                              class="levacanclebtns"
                            >
                              <span>Cancel</span>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </>
                )}

                {showleave2 && (
                  <>
                    <div className="leavewrapping">
                      <div className="crelevecont">
                        <div class="crelavetopsec">
                          <h3 class="leaveHead "> Half Day Request </h3>

                          <img
                            src={cutt}
                            onClick={() => setShowLeave2(false)}
                            alt=""
                          />
                        </div>

                        <hr />

                        {/* <!-- Modal body --> */}
                        <form className="levaecretaeform" action="#">
                          {/* <div class="user_classleave">
                            <label>Leave type</label>

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
                          </div> */}

                          <div className="levaecreflex">
                            <div class="user_class_input3 w-full mt-2 ">
                              <label
                                for="text"
                                class="block mb-2 text-sm font-medium text-gray-900 employName"
                              >
                                Start
                              </label>
                              <input
                                value={formdata2.start}
                                onChange={changeHandler2}
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
                                value={formdata2.end}
                                onChange={changeHandler2}
                                type="date"
                                name="end"
                                id="text"
                                class="startDate"
                                required
                              />
                            </div>
                          </div>

                          <div class="levelreasons">
                            <label
                              for="message"
                              class="block mb-2 mt-2 text-sm font-medium text-gray-900 employName"
                            >
                              Reason
                            </label>
                            <textarea
                              required
                              name="reason"
                              onChange={changeHandler2}
                              value={formdata2.reason}
                              id="message"
                              rows="4"
                              class="reasonText2"
                              placeholder="Enter your reason..."
                            ></textarea>
                          </div>

                          <div className="leavebuttons">
                            <button
                              onClick={(e) => {
                                submitHandler2();
                              }}
                              type="button"
                              className="leaverqbtns"
                            >
                              <span> Request send</span>
                            </button>

                            <button
                              onClick={() => setShowLeave2(false)}
                              type="button"
                              class="levacanclebtns"
                            >
                              <span>Cancel</span>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </>
                )}

                {openAnn && (
                  <>
                    <div className="leavewrapping">
                      <div className="crelevecont2">

                        <div class="crelavetopsec">
                          <h3 class="leaveHead "> Annoucement </h3>

                          <img
                            src={cutt}
                            onClick={() => setOpenAnn(false)}
                            alt=""
                          />
                        </div>

                        <hr />

                        {/* <!-- Modal body --> */}
                          <div class="showann">
                            <label>Title</label>

                            <span>{openAnn?.title}</span>
                          </div>

                          <div class="showann">
                            <label
                              for="message"
                              class="block mb-2 mt-2 text-sm font-medium text-gray-900 employName"
                            >
                              Description
                            </label>
                            <span>{openAnn?.description}</span>
                          </div>

                                   </div>
                    </div>
                  </>
                )}


    {
      leaveAllowance && 
      <>
      <div className="leavewrapping">
        <div className="crelevecont">
          <div class="crelavetopsec">
            <h3 class="leaveHead "> Leave Allowance </h3>

            <img
              src={cutt}
              onClick={() => setLeaveAllow(false)}
            />
          </div>

          <hr />

          {/* <!-- Modal body --> */}
          <form className="levaecretaeform" action="#">

            <div class="user_classleave">
              <label>Select Employee</label>

              <select
                name="user"
                onChange={(e)=>{
                  setAllowData((prev)=>({
                    ...prev ,
                    user:e.target.value
                  }))
                }}
                value={allowData?.user}

                required
              >
               <option value="Select">Select</option>
               {
                allEmp?.map((emp , index)=>(
                  <option key={index} value={emp?._id}>{emp?.fullName}</option>
                ))
               }
              </select>
            </div>

            <div class="user_classleave">
              <label>Total Allowance</label>

              <select
                name="allowance"
                onChange={(e)=>{
                  setAllowData((prev)=>({
                    ...prev ,
                    allowance:e.target.value
                  }))
                }}
                value={allowData?.allowance}
                 
                required
              >
               <option value="Select">Select</option>
               <option value="1">1</option>
               <option value="2">2</option>
               <option value="3">3</option>
               <option value="4">4</option>
               <option value="5">5</option>
               <option value="6">6</option>
               <option value="7">7</option>
               <option value="8">8</option>
               <option value="9">9</option>
               <option value="10">10</option>
               <option value="11">11</option>
               <option value="12">12</option>
               <option value="13">13</option>
               <option value="14">14</option>
               <option value="15">15</option>
              </select>
            </div>

            <div className="leavebuttons">
              <button
                onClick={(e) => {
                  e.preventDefault();
            LeaveAllowApi();
                }}
                type="button"
                className="leaverqbtns"
              >
                <span>Create</span>
              </button>

              <button
                onClick={() => setLeaveAllow(false)}
                type="button"
                class="levacanclebtns"
              >
                <span>Cancel</span>
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
    }

{openExpense && (
          <div className="allPopupWrap incheight">
            <div className="popup1 expensepop">
              <div className="popNav">
                <h2>Create Expense  </h2>
                <img onClick={() => setOpenExpense(false)} src={cross1} alt="" />
              </div>
              <hr />
              <label>
                <p className="popTitl">Title</p>

                <input
                  type="text"
                  placeholder="Enter Leave Type Name"
                  name="title"
                  value={formdata3.title}
                  onChange={changeHandler3}
                />
              </label>

              <label>
                <p className="popTitl">Item Code</p>

                <input
                  type="text"
                  placeholder="Enter ItemCode"
                  name="itemCode"
                  value={formdata3.itemCode}
                  onChange={changeHandler3} />
              </label>

              <label>
                <p className="popTitl">Quantity</p>

                <input
                  type="number"
                  placeholder="Enter Quantity"
                  name="quantity"
                  value={formdata3.quantity}
                  onChange={changeHandler3}
                   />
              </label>
              
              <label>
                <p className="popTitl">Unit</p>

                <input
                  type="text"
                  placeholder="Enter unit"
                  name="unit"
                  value={formdata3.unit}
                  onChange={changeHandler3}
                   />
              </label>

              <label>
                <p className="popTitl">Purchase Price</p>

                <input
                  type="number"
                  placeholder="Enter purchasePrice"
                  name="purchasePrice"
                  value={formdata3.purchasePrice}
                  onChange={changeHandler3}
                   />
              </label>

              <label>
                <p className="popTitl">Sales Price</p>

                <input
                  type="number"
                  placeholder="Enter purchasePrice"
                  name="salesPrice"
                  value={formdata3.salesPrice}
                  onChange={changeHandler3}
                   />
              </label>

              <label>
                <p className="popTitl">Purchase Date</p>

                <input
                  type="date"
                  placeholder="Enter purchase Date"
                  name="purchaseDate"
                  value={formdata3.purchaseDate}
                  onChange={changeHandler3}
                   />
              </label>

              <label>
                <p className="popTitl">category</p>

                <input
                  type="text"
                  placeholder="Enter purchase Date"
                  name="category"
                  value={formdata3.category}
                  onChange={changeHandler3}
                   />
              </label>

              <div className="btnWrap">
                <button className="cencel" onClick={() => setOpenExpense(false)}>
                  <span>Cancel</span>
                </button>

                <button onClick={expenseHandler} className="create" >
                  <span>Create</span>
                </button>
              </div>

            </div>
          </div>
        )}

              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EmployeeHRM;
