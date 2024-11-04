import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import HrSidebar from "../../Hr/Sidebar/HrSidebar";
import HrNavbar from "../../Hr/Navbar/HrNavbar";
import Calendar from "react-calendar";
import "./hrm.css";
import "react-calendar/dist/Calendar.css";

import "./leaveReq.css";
import "./markAttendance.css";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EmployeAttendence = ({
  pop1,
  setPop1,
  pop,
  setPop,
  setAlert,
  isHr = false,
}) => {
  const { user, allEmployee  , getAttendence} = useMain();

  const [allEmp , setAllEmp] = useState([]);
  const [value, onChange] = useState(new Date());

  const [userData , setUserData] = useState({});


  const [formdata , setFormdata] = useState({
    Employee:"Select Employee",
    id:"" ,
    date:""

})

const fetchEmp = async()=>{
    const ans = await allEmployee();
    setAllEmp(ans?.emp);
}

const handleCalendar = (e) => {
    let date = new Date(e).toLocaleDateString('en-GB');
    setFormdata((prev)=>({
        ...prev ,
        date: date
    }))
  };

const changeHandler = (e)=>{
    const {name , value} = e.target;
    setFormdata((prev)=>({
        ...prev ,
        [name]:value
    }))

    const filterData = allEmp.filter((user)=>user.fullName === value);

    setFormdata((prev)=>({
        ...prev ,
        id: filterData[0]?._id
    }))

}

const submitHandler = async()=>{
     if(formdata.Employee == "Select Employee"){
        return toast.error("Please select the Employee");
     }

      const ans = await getAttendence({...formdata });
      setUserData(ans?.data);

}

useEffect(()=>{
    fetchEmp();
    const currentDate = new Date();
    let date = new Date(currentDate).toLocaleDateString('en-GB');
 setFormdata((prev)=>({
    ...prev ,
    date:date
 }))
},[])


  return (
    <>
    <h1>Hello Dinesh</h1>
      <div className="employee-dash h-full">
        {isHr ? <HrSidebar /> : <AdminSidebar pop={pop} setPop={setPop} />}
        <div className="tm">
          {isHr ? (
            <HrNavbar
              user={user}
              setAlert={setAlert}
              pop1={pop1}
              setPop1={setPop1}
            />
          ) : (
            <AdminNavbar user={user} setAlert={setAlert} />
          )}

          <div className="em">
            <div className="flex-col emWraping">
              {/* first  */}
              <div className="hrmDasTxtFir">

              <label htmlFor="Employee" >
                                    <p>Employee</p>
                                    <select onChange={changeHandler} name="Employee" id="Employee" value={formdata?.Employee}>
                                        <option>Select Employee</option>
                                        {
                                            allEmp?.map((val, index) => {
                                                return <option key={index} value={val?.fullName}>{val?.fullName}</option>
                                            })
                                        }
                                    </select>
                                </label>

                                <div className="calend calend1">
                    <div className="calend-head">
                   
                    </div>

                    <Calendar onChange={handleCalendar} value={value} />

                  </div>

                  <button onClick={submitHandler} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>

       
              </div>

              {/* second  */}
              <div style={{gap:"20px"}} className="flex ">


                {/*clock in  */}
<a href="#" class="block carding max-w-[300px]  h-[300px] p-10 w-full  bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

<h5 class="mb-2  text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Clock In</h5>
<p class="font-normal text-gray-700 dark:text-gray-400">{userData?.clockIn ? userData?.clockIn : "none"}</p>
</a>

{/* break  */}

<a href="#" class="block carding max-w-[300px] w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total Break</h5>
<p class="font-normal text-gray-700 dark:text-gray-400">{userData?.breakTime ? userData?.breakTime : "none"}</p>
</a>


{/* clock out  */}

<a href="#" class="block carding max-w-[300px] w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Clock Out</h5>
<p class="font-normal text-gray-700 dark:text-gray-400">{userData?.clockOut ? userData?.clockOut : "none"}</p>
</a>



              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeAttendence;
