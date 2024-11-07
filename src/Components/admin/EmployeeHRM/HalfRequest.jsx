import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import HrSidebar from "../../Hr/Sidebar/HrSidebar";
import HrNavbar from "../../Hr/Navbar/HrNavbar";
import chevron from "../../images/chevron_right.png";
import "./hrm.css";
import "./leaveReq.css";
import { NavLink } from "react-router-dom";
import cancel from "../../images/cancell.png"

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";

const HalfRequest = ({
  pop1,
  setPop1,
  pop,
  setPop,
  setAlert,
  isHr = false,
}) => {

  const [star1, setStar1] = useState(false);


  const styleThing = {
    display: star1 ? "block" : "none",
  };

  const { user, getUserHalfDay  , updateLeave , acceptHalf , rejectHalfDay , postNotifyLeavereq } = useMain();

  const [data, setData] = useState([]);

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));
  let hrms_permission = JSON.parse(localStorage.getItem("hrms_permission"));

  const {role  } = hrms_user;
  const {  leaveReqestEditPermission } = hrms_permission;


  const [accept,setAccept] = useState("reject",user);

  const getData=async()=>{
    let ans = await getUserHalfDay();
    const reverseArray = ans?.data?.reverse();
    setData(reverseArray);
  };

  useEffect(()=>{
    getData();
  },[]);

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    return formattedDate;
  };


  const [formdata , setFormdata] = useState({
    employeeName:"" , leaveType:"" , start:"" , end:"" , reason:"" , id:""
  })

  const changeHandler = (e)=>{
    const {name ,value} = e.target;

    setFormdata((prev)=>({
      ...prev ,
      [name]:value
    }))
  }

   const [showPlay , setShowPlay] = useState(-1);

   const submitHandler = async()=>{
    const toastId = toast.loading("Loading...");
    const startDate = new Date(formdata.start);
    const endDate = new Date(formdata.end);
    const timeDifference = Math.abs(endDate - startDate);
    const daysGap = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  const ans = await updateLeave({ employeeName: formdata.employeeName ,  id:formdata.id ,  type: formdata.leaveType, from: formdata.start, to: formdata.end, days: daysGap, reason: formdata.reason});

   if(ans.success){
    toast.success("Successfuly updated");
    setStar1(false);
    getData();
   }

   toast.dismiss(toastId);

   }

   const rejectHandler = async(form)=>{

    const toastId = toast.loading("Loading...");
    const {user , _id} = form;

    const userName = user.fullName;

   const ans = await rejectHalfDay(form , _id);

    const notify = await postNotifyLeavereq(userName , "Rejected");

    if(ans?.status){
      toast.success("Successfuly reject the Half Day");
      setShowPlay(-1);
      getData();

      if(userName){
        setAccept(!accept);
      }
  
    }

    toast.dismiss(toastId);
  }
  
  const acceptHandler = async(form)=>{  
        
    const toastId =toast.loading("Loading...");
    const {user ,_id ,from ,to } = form;
    const userId = form?.user?._id;
    const userName = user.fullName;

    const ans = await acceptHalf(form , _id , userId , from , to);

    const notify = await postNotifyLeavereq(userName , "Accepted");

    window.prompt("notification reached successfully");

    if(ans?.status){
      
      toast.success("Successfuly Accepted the leave");
      setShowPlay(-1);
      getData();
      if(userName){
        setAccept(!accept);
      }
    }
    toast.dismiss(toastId);

   }


  return (
    <>
      <div className="employee-dash h-full">
        {isHr ? <HrSidebar /> :

        
  role=== "EMPLOYEE" ?
  <EmployeeSidebar pop={pop} setPop={setPop} />
   :
<AdminSidebar pop={pop} setPop={setPop} />
                
        }
        <div className="tm">
          {isHr ? (
            <HrNavbar
              user={user}
              setAlert={setAlert}
              pop1={pop1}
              setPop1={setPop1}
            />
          ) : (
            
              role === "EMPLOYEE" ?
               <EmployeeNavbar user={user} setAlert={setAlert}  />:
  
            <AdminNavbar user={user} setAlert={setAlert} />
            
          )}

          <div className="em">
            <div className="flex-col">
              {/* first  */}

              <div className="hrmDasTxtFir">
                <p className="hrmHed">Dashboard</p>

                <div className="hrDsPa">
                  <p className="hrFirDs">Dashboard</p>{" "}
                  <span>
                    <img src={chevron} alt="" />
                  </span>{" "}
                  <NavLink to={`/adminDash/HRM`}>
                    <span className="hrFirDs">Leave Management</span>
                  </NavLink>
                  <span>
                    <img src={chevron} alt="" />
                  </span>{" "}
                  <span className="thml">manage Leave</span>
                </div>
                
              </div>

              {/* second  */}

              <main className="leaveReqWrap">
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs uppercase textALLtITL ">
                      <tr className="gfg">
                       
                        <th scope="col" className="px-3 py-3 uppercase">
                          EMPLOYEE
                        </th>
                        {/* <th scope="col" className="px-3 py-3 uppercase">
                          LEAVE TYPES
                        </th> */}
                        <th scope="col" className="px-3 py-3 uppercase">
                          APPLIED ON
                        </th>
                      
                        <th scope="col" className="px-3 py-3 uppercase">
                          START DATE
                        </th>
                        <th scope="col" className="px-3 py-3 uppercase">
                          END DATE
                        </th>
                        <th scope="col" className="px-3 py-3 uppercase">
                          TOTAL DAYS
                        </th>
                        <th scope="col" className="px-3 py-3 uppercase">
                          LEAVE REASON
                        </th>
                        <th scope="col" className="px-3 py-3 uppercase">
                          STATUS
                        </th>
                        <th scope="col" className="px-3 py-3 uppercase">
                          ACTIONS
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {data?.map((e,index)=>{
                        return (
                          <tr key={index} className="bg-white gfg border-b">
                         
                          <td className="px-3 py-3 taskAns">  {e?.user?.fullName}</td>
                          {/* <td className="px-3 py-3 taskAns">{e?.leaveType}</td> */}
                          <td className="px-3 py-3 taskAns">{formatDate(e?.appliedOn)}</td>
                          <td className="px-3 py-3 taskAns">  {e?.from}</td>
                          <td className="px-3 py-3 taskAns"> {e?.to} </td>
                          <td className="px-3 py-3 taskAns"> {(e?.days) - 1 + 2} </td>
                          
                          <td className="px-3 py-3 taskAns">{e?.reason}</td>
  
                          <td className="px-3 py-3 taskAns">
                            <div className="ACTIVITYsss">{
                              e?.status === "" ?"Pending":e?.status
                            }</div>
                          </td>

                          <td className="px-3 py-3  flex items-center hiii_gap">
                            
                            {
                              (leaveReqestEditPermission || role === "ADMIN") && 
                          
                             <div className="relative">

                           
                              <button
                               onClick={()=>{
                                 if(showPlay === index){
                                  setShowPlay(-1);
                                 }
                                 else {
                                setShowPlay(index);
                                 }
                               }}

                                id="dropdownMenuIconButton2222"
                                data-dropdown-toggle="dropdownDots2222"
                                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                type="button"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                                  />
                                </svg>
                              </button>

                               <div style={{ gap:"5px" }} className={`absolute ${showPlay === index ? "showPlay":"hidenPlay"}`}>

                                  <p onClick={
                                    ()=>{
                                      acceptHandler(e );
                                    }
                                  } style={{backgroundColor:"green" , color:"white", padding:"10px" , borderRadius:"10px" , cursor:"pointer" , transform:"translateX(-20px)"  , zIndex:"100" }} >Accept </p>
                                  <p onClick={()=>{
                                    rejectHandler(e);
                                  }} style={{backgroundColor:"red" , color:"white", padding:"10px"  , borderRadius:"10px", cursor:"pointer" , transform:"translateX(-20px)" , zIndex:"100"  }} >Reject</p>

                               </div>

                              </div>
                      }       

{
  (leaveReqestEditPermission || role === "ADMIN") && 

                              <button
                                onClick={()=>{
                                  setFormdata((prev)=>({
                                    ...prev ,
                                    
                                      reason: e.reason , 
                                      leaveType: e.leaveType ,
                                      employeeName: e?.user?.fullName , 
                                      start: e.from , 
                                      end: e.to , 
                                      id: e._id
                                    
                                  }))
                                  setStar1((prev)=>!prev);
                                }}
                                id="dropdownMenuIconButton2222"
                                data-dropdown-toggle="dropdownDots2222"
                                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                type="button"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                  />
                                </svg>
                              </button>

    }

                    
                              <div
                                id="dropdownDots2222"
                                className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                              >
                                <ul
                                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                  aria-labelledby="dropdownMenuIconButton2222"
                                >
                                  <li>
                                    <a
                                      href="#"
                                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                      Dashboard
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="#"
                                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                      Settings
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="#"
                                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                      Earnings
                                    </a>
                                  </li>
                                </ul>
                                <div className="py-2">
                                  <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                  >
                                    Separated link
                                  </a>
                                </div>
                              </div>
                            
                          </td>

                        </tr>
                        )
                      })}
               

                     
                    </tbody>
                  </table>
                </div>
              </main>

            </div>
          </div>

     
     {/* this is edit form of leave rqeuest  */}

            <div
            style={styleThing}
            id="authentication-modal"
            tabindex="-1"
            aria-hidden="true"
            class="user_class tuser_class hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center mt-10 md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div class="relative p-4  editleaFrom max-h-full">
              {/* <!-- Modal content --> */}
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 swer">
                {/* <!-- Modal header --> */}
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 class="editLeadreq">
                    Edit Leave Request
                  </h3>
                  <img onClick={()=> setStar1(false)} src={cancel} alt="" />

                </div>
                {/* <!-- Modal body --> */}
                <div class="p-4 md:p-5">

                  <form  className="space-y-4 fkl" action="#">

                    <div class="mt-2 user_class_input">
                      <label

                      >
                        Employee Name
                      </label>

                      <input
           value={formdata.employeeName}
           onChange={changeHandler}
             
                        type="text"
                        name="employeeName"
                        id="text"
                       className=""
                        placeholder="Enter the name"
                        required
                      />
                    </div>

                    <div class="mt-2 user_class_input">
                      <label                  >
                        Leave type
                      </label>
                      <input
                      value={formdata.leaveType}
                      
                      onChange={changeHandler}
                        type="text"
                        name="leaveType"
                        id="text"
                        placeholder="Enter your leave type"
                        class=""
                        required
                      />
                    </div>

                    <div className="flex justify-between w-full">
                      <div class="user_class_input w-full mt-2 ">
                        <label
                          for="text"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Start
                        </label>
                        <input
                         value={formdata.start}
                         onChange={changeHandler}
                          type="date"
                          name="start"
                          id="text"
                         
                          required
                        />
                      </div>

                      <div class="user_class_input w-full ml-2  mt-2">
                        <label
                          for="text"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          End
                        </label>
                        <input
                         value={formdata.end}
                          onChange={changeHandler}
                          type="date"
                          name="end"
                          id="text"
                       
                          required
                        />
                      </div>
                      
                    </div>

                    <div class="user_class_input">
                        <label
                          for="message"
                          class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white"
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
                         
                          placeholder="Enter your reason..."
                        ></textarea>
                      </div>

                      <div className="safar">

                    <button
                      onClick={(e) =>{
                        
                        e.preventDefault();
                       
                       submitHandler(e);
                      }}
                      type="button" 
                      class="w-full mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      send
                    </button>

                    <button
                      onClick={(e) =>{
                        
                      setStar1(false);
                      }}
                      type="button" 
                      class="w-full mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Cancel
                    </button>
                    </div>

                  </form>

                </div>
              </div>
            </div>
          </div>
           
           
           {/* } */}


        </div>
      </div>
    </>
  );
};

export default HalfRequest;
