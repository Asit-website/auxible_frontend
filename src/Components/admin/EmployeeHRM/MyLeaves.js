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
import { RxCross2 } from "react-icons/rx";


const MyLeaves = ({
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

  const { user, FetchMyLeave  } = useMain();

  const [data, setData] = useState([]);

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));
  let hrms_permission = JSON.parse(localStorage.getItem("hrms_permission"));

  const {role } = hrms_user;
  const {  leaveReqestEditPermission } = hrms_permission;

  
  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    return formattedDate;
  };



  const getData=async()=>{
    let ans = await FetchMyLeave();
    console.log("my leaves",ans);
    const reverseData = ans?.data?.reverse();
    setData(reverseData);
  };

  useEffect(()=>{
    getData();

  },[]);


   const [showPlay , setShowPlay] = useState(-1);

   const [leavePopup , setLeavePopup] = useState(false);

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

                    <thead className="text-xs textALLtITL ">
                      <tr className="gfg">
                       
                        <th scope="col" className="px-2 py-3 ">
                          LEAVE TYPES
                        </th>
                        <th scope="col" className="px-2 py-3">
                          APPLIED ON
                        </th>
                      
                        <th scope="col" className="px-2 py-3">
                          START DATE
                        </th>
                        <th scope="col" className="px-2 py-3 ">
                          END DATE
                        </th>
                        <th scope="col" className="px-2 py-3">
                          TOTAL DAYS
                        </th>
                        <th scope="col" className="px-2 py-3">
                          LEAVE REASON
                        </th>
                        <th scope="col" className="px-2 py-3">
                          STATUS
                        </th>
                     
                      </tr>
                    </thead>

                    <tbody>
                      {data?.map((e,index)=>{
                        return (
                          <tr  onClick={()=>setLeavePopup(e)} key={index} className="bg-white trtextalltr cursor-pointer gfg border-b">
                         
                          <td className="px-2 py-3">{e?.leaveType}</td>
                          <td className="px-2 py-3">{formatDate(e?.appliedOn)}</td>
                          <td className="px-2 py-3">  {e?.from}</td>
                          <td className="px-2 py-3"> {e?.to} </td>
                          <td className="px-2 py-3"> {(e?.days) - 1 + 2} </td>
                          
                          <td className="px-2 py-3">{e?.reason?.slice(1,34)}...</td>
  
                          <td className="px-2 py-3">
                            <div className="ACTIVITYsss">{
                              e?.status === "" ?"Pending":e?.status
                            }</div>
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

     
          {
            leavePopup && 
            <div className="leavePopupwrap2">
                <div className="leavepopconta2">

                  <nav><RxCross2 fontSize={24} className="cursor-pointer" onClick={()=>setLeavePopup(false)} /></nav>
 
                <label htmlFor="">
                  <h4>FullName: </h4>
                  <p>{leavePopup?.user?.fullName}</p>
                </label>

              
                <label htmlFor="">
                  <h4>From: </h4>
                  <p>{leavePopup?.from}</p>
                </label>
                <label htmlFor="">
                  <h4>To: </h4>
                  <p>{leavePopup?.to}</p>
                </label>

                <label htmlFor="">
                  <h4>Reason: </h4>
                  <p>{leavePopup?.reason}</p>
                </label>

                   
                </div>
            </div>
          }

  
        </div>
      </div>
    </>
  );
};

export default MyLeaves;
