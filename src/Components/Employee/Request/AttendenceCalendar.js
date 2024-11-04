import React, { useState } from "react";
import EmployeeNavbar from "../Navbar/EmployeeNavbar";
import EmployeeSidebar from "../Sidebar/EmployeeSidebar";
import { useMain } from "../../../hooks/useMain";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useEffect } from "react";
import toast from "react-hot-toast";

const AttendenceCalendar = ({ setAlert, pop1, setPop1 }) => {
  let todayDate = new Date().toLocaleDateString("en-GB");
  const {
    user,
    postActivity,
    getStatisticsByUser,
    getActivitiesByUser,
    getAttendence,
    savenoteatt,
  } = useMain();
  const [value, onChange] = useState(new Date());
  const [loadFlag, setLoadFlag] = useState(false);
  const [mainData, setMainData] = useState({});

  const [currdate, setCurrdate] = useState("");

  const [Note, setNote] = useState("");

  const [clockIn, setClockIn] = useState(null);
  const [clockOut, setClockOut] = useState(null);
  const [totalBreak, setTotalBreak] = useState(null);
  const [task, settask] = useState("");

  const getData = async (date) => {
    setLoadFlag(true);
    const data = await getActivitiesByUser(date, "", "", 0, 10, "");
    setMainData(data.data[0]);
    setLoadFlag(false);
  };

  useEffect(() => {
    getData(todayDate);
  }, []);

  const getClock = async (date) => {
    let user = localStorage.getItem("hrms_user");
    const userDetail = JSON.parse(user);

    const id = userDetail?._id;

    const attendece = await getAttendence({ id, date });

    if (attendece.status) {
      if (attendece?.data?.clockIn && attendece?.data?.clockOut) {
        setClockIn(attendece?.data?.clockIn);
        if (attendece?.data?.Note) {
          setNote(attendece?.data?.Note);
        } else {
          setNote("");
        }
        if (attendece?.data?.todayTask) {
          settask(attendece?.data?.todayTask);
        } else {
          settask(null);
        }
        setClockOut(attendece?.data?.clockOut);
        setTotalBreak(attendece?.data?.breakTime);
      } else {
        setClockIn(null);
        setClockOut(null);
        setTotalBreak(null);
        setNote("");
        settask(null);
      }
    }
  };

  const handleCalendar = (e) => {
    let date = new Date(e).toLocaleDateString("en-GB");
    setCurrdate(date);
    getClock(date);
    getData(date);
  };

  const savenoteapi = async () => {
    let user = localStorage.getItem("hrms_user");
    const userDetail = JSON.parse(user);

    const id = userDetail?._id;
    const ans = await savenoteatt({ Note, id, date: currdate });
    setNote(ans?.data);
    if (ans?.status) {
      toast.success("Successfuly saved");
    }
  };

  useEffect(() => {
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, "0")}/${String(
      today.getMonth() + 1
    ).padStart(2, "0")}/${today.getFullYear()}`;

    getClock(formattedDate);
  }, []);

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
          <div className="em">
            <div className="flex-col">
              <div className="distinguish flex">
                <div className="distinguish1 w-full">
                  <div className="calend calend1">
                    <div className="calend-head"></div>

                    <Calendar onChange={handleCalendar} value={value} />
                  </div>
                </div>

                <div className="distinguish2 w-full">
                  <div className="total-timeCal">
                    <h2 className="total">Total Time</h2>
                    <hr />
                    {!loadFlag ? (
                      <div className="clock-system">
                        <div className="clock">
                          <h3>Clock In</h3>
                          <div className="clock1 flex items-center">
                            <h2>{clockIn ? clockIn : "none"}</h2>
                          </div>
                        </div>
                        <hr />
                        <div className="clock clock2">
                          <h3>Clock Out</h3>
                          <div className=" clock1 flex items-center">
                            <h2>{clockOut ? clockOut : "none"}</h2>
                          </div>
                        </div>
                        <div className="clock clock2">
                          <h3>Total Break</h3>
                          <div className=" clock1 flex items-center">
                            <h2>{totalBreak ? totalBreak : "none"}</h2>
                          </div>
                        </div>
                        {/* <div className="clock clock2">
                          <h3>Note</h3>
                          <div className=" clock1 flex items-center noteinput">
                            <textarea type="text" value={Note} onChange={(e)=>setNote(e.target.value)} />
                          </div>

                          <button onClick={()=>savenoteapi()} className="attsavebtn"><span>Save</span></button>
                        </div> */}

                        <div className="clock clock2">
                          <h3>Task</h3>

                          <p className="prasj">{task}</p>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AttendenceCalendar;
