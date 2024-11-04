import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import HrSidebar from "../../Hr/Sidebar/HrSidebar";
import HrNavbar from "../../Hr/Navbar/HrNavbar";
import chevron from "../../images/chevron_right.png";
import "./hrm.css";
import "./leaveEmp.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";



const LeaveUpdates = ({
  pop1,
  setPop1,
  pop,
  setPop,
  setAlert,
  isHr = false,
}) => {
  const { user , fetchMonthlyLeave } = useMain();

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    return formattedDate;
  };
  const [data , setData] = useState([]);
  console.log("data",data);
  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const {role} = hrms_user;

  const [selectMonth , setSelectMonth] = useState("");

  const getLeavesEmp = async(month)=>{
          if(month !== 'Select'){
         const ans = await fetchMonthlyLeave(month);
          if(ans?.status){
           setData(ans?.data);
          }
        }
          
  }

  useEffect(()=>{
    getLeavesEmp("");
const currentDate = new Date();

const currentMonth = currentDate.getMonth() + 1; 
 setSelectMonth(currentMonth);
  },[])
  

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
                    <span className="hrFirDs">HRM</span>
                  </NavLink>
                  <span>
                    <img src={chevron} alt="" />
                  </span>{" "}
                  <span className="thml">Employees on Leave</span>

                  


                </div>

              </div>

 {/* mid  */}
 <div className="chhosemonth">
 <select onChange={(e)=>{getLeavesEmp(e.target.value)
   setSelectMonth(e.target.value);
 }} value={selectMonth} name="month" id="">
  <option value="Select">Select Month</option>
  <option value="1">January</option>
  <option value="2">February</option>
  <option value="3">March</option>
  <option value="4">April</option>
  <option value="5">May</option>
  <option value="6">June</option>
  <option value="7">July</option>
  <option value="8">August</option>
  <option value="9">September</option>
  <option value="10">October</option>
  <option value="11">November</option>
  <option value="12">December</option>
</select>

 </div>

 <main className="leaveReqWrap">
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs uppercase textALLtITL ">
                      <tr className="gfg">
                       
                        <th scope="col" className="px-3 py-3 uppercase">
                          EMPLOYEE
                        </th>
                       
                        <th scope="col" className="px-3 py-3 uppercase">
                        UNPAID LEAVE 
                          </th>
                        <th scope="col" className="px-3 py-3 uppercase">
                        PAID LEAVE 
                          </th>
                        <th scope="col" className="px-3 py-3 uppercase">
                        SICK LEAVE 
                          </th>
                      
                        <th scope="col" className="px-3 py-3 uppercase">
                        CASUAL LEAVE 
                          </th>
                        <th scope="col" className="px-3 py-3 uppercase">
                        OTHERS  
                          </th>
                      
                        <th scope="col" className="px-3 py-3 uppercase">
                          TOTAL DAYS
                        </th>
                      

                      </tr>
                    </thead>

                    <tbody>
                      {data?.map((e,index)=>{
                        return (
                          <tr key={index} className="bg-white gfg border-b">
                         
                          <td className="px-3 py-3 taskAns">  {e?.user?.fullName}</td>
                          <td className="px-3 py-3 taskAns">  {e?.UnpaidLeave}</td>
                          <td className="px-3 py-3 taskAns">  {e?.paidLeave}</td>
                          <td className="px-3 py-3 taskAns">  {e?.sickLeave}</td>
                          <td className="px-3 py-3 taskAns">  {e?.casualLeave}</td>
                          <td className="px-3 py-3 taskAns">  {e?.other}</td>
                          <td className="px-3 py-3 taskAns">
  {e?.totalDays ? ( e.totalDays) : ( (parseInt(e?.UnpaidLeave) || 0) + (parseInt(e?.paidLeave) || 0) + (parseInt(e?.sickLeave) || 0) + (parseInt(e?.casualLeave) || 0) +  (parseInt(e?.other) || 0) )}
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
        </div>
      </div>
    </>
  );
};

export default LeaveUpdates;
