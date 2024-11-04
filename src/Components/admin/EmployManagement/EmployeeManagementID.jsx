import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import HrSidebar from "../../Hr/Sidebar/HrSidebar";
import HrNavbar from "../../Hr/Navbar/HrNavbar";
import chevron from "../../images/chevron_right.png";

import "./employeManage.css";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";

const EmployeeManagementID = ({
  pop1,
  setPop1,
  pop,
  setPop,
  setAlert,
  isHr = false,
}) => {
  const { user } = useMain();

  const { id } = useParams();

  const navigate = useNavigate();

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

   const {role} = hrms_user;

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
                <p className="hrmHed">HRMS</p>

      <div className="hrDSPAwRAP">

     

                <div className="hrDsPa">
                  <p className="hrFirDs">HRMS</p>{" "}
                  <span>
                    <img src={chevron} alt="" />
                  </span>{" "}
                  <span onClick={()=>navigate("/adminDash/HRM/EmployeeManagement")} className="hrFirDs cursor-pointer">Employee Management</span>
                  <span>
                    <img src={chevron} alt="" />
                  </span>{" "}
                  <span className="thml">#{id}</span>
                </div>

                <div className="joLetNOC">

                    <select name="" id="">
                        <option value="" selected disabled>Joining Letter</option>
                       
                    </select>
                    
                    <select name="" id="">
                        <option value="" selected disabled>Experience Certificate</option>
                    </select>
                    <select name="" id="">
                        <option value="" selected disabled>NOC</option>
                    </select>

                </div>
                
                </div>

              </div>

              {/* second */}
              <main className="creteEmpWrap">

                {/* fist  */}
                <div className="PDwRAP">
                  <h2>Personal Details</h2>

                  <hr />

                  <div className="persDetaWrap">
                    {/* first  */}
                    <div className="singPD">
                      <p className="sinPDTit">Name:</p> <span>Shubham Gupta</span>
                    </div>

                    {/* second  */}
                    <div className="singPD">
                      <p>Employee ID:</p> <span>{id}</span>
                    </div>
                    {/* first  */}
                    <div className="singPD">
                      <p>Date of Birth:</p> <span>Sep 30, 1993</span>
                    </div>
                    {/* first  */}
                    <div className="singPD">
                      <p>Email:</p> <span>Shubham@kusheldigi.com</span>
                    </div>
                    {/* first  */}
                    <div className="singPD">
                      <p>Address:</p> <span>Wave City Noida</span>
                    </div>
                    <div className="singPD">
                      <p>Phone:</p> <span>9810******</span>
                    </div>
                    <div className="singPD">
                      <p>Basic salary:</p> <span>Shubham Gupta</span>
                    </div>
                    <div className="singPD">
                      <p>Salary Type:</p> <span>CASH</span>
                    </div>
                  </div>
                </div>

                {/* second  */}
                <div className="PDwRAP">
                  <h2>Company Detail</h2>

                  <hr />

                  <div className="persDetaWrap">
                    {/* first  */}
                    <div className="singPD">
                      <p className="sinPDTit">Branch:</p> <span>Head Office</span>
                    </div>

                    {/* second  */}
                    <div className="singPD">
                      <p>Department:</p> <span>Admin</span>
                    </div>
                    {/* first  */}
                    <div className="singPD">
                      <p>Designation:</p> <span>CEO</span>
                    </div>
                    {/* first  */}
                    <div className="singPD">
                      <p>Date of Joining:</p> <span>Sep 1, 2017</span>
                    </div>
                  
                  </div>
                </div>

                {/* third  */}
                <div className="PDwRAP">
                  <h2>Document Detail</h2>

                  <hr />

                  <div className="persDetaWrap">
                    {/* first  */}
                    <div className="singPD">
                      <p className="sinPDTit">Adhaar Card:</p> <span>XXXXXXXX9012</span>
                    </div>

                    {/* second  */}
                    <div className="singPD">
                      <p>Photo:</p> <span></span>
                    </div>
                    {/* first  */}
                    <div className="singPD">
                      <p>Pan Card:</p> <span>XXXXXXX9212</span>
                    </div>
                    {/* first  */}
                    <div className="singPD">
                      <p>Cancel Check:</p> <span></span>
                    </div>
                  
                  </div>
                </div>

                {/* fourth  */}
                <div className="PDwRAP">
                  <h2>Bank Account Detail</h2>

                  <hr />

                  <div className="persDetaWrap">
                    {/* first  */}
                    <div className="singPD">
                      <p className="sinPDTit">Account Holder Name:</p> <span></span>
                    </div>

                    {/* second  */}
                    <div className="singPD">
                      <p>Account Number:</p> <span></span>
                    </div>
                    {/* first  */}
                    <div className="singPD">
                      <p>Bank Name:</p> <span></span>
                    </div>

                    {/* first  */}
                    <div className="singPD">
                      <p>Bank Identifier Code:</p> <span></span>
                    </div>
                    {/* first  */}
                    <div className="singPD">
                      <p>Branch Location:</p> <span></span>
                    </div>
                  
                    {/* first  */}
                    <div className="singPD">
                      <p>Tax Payer ID:</p> <span></span>
                    </div>
                  
                  </div>
                </div>

              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeManagementID;
