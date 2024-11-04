import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import HrSidebar from "../../Hr/Sidebar/HrSidebar";
import HrNavbar from "../../Hr/Navbar/HrNavbar";
import chevron from "../../images/chevron_right.png";


import "./createEmply.css";
import { NavLink } from "react-router-dom";

const CreateEmployee = ({
  pop1,
  setPop1,
  pop,
  setPop,
  setAlert,
  isHr = false,
}) => {
  const { user } = useMain();

  return (
    <>
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

            <div className="flex-col">

              {/* first  */}
              <div className="hrmDasTxtFir">
                
                <p className="hrmHed">HRMS</p>

                <div className="hrDsPa">
                  <p className="hrFirDs">HRMS</p>{" "}
                  <span>
                    <img src={chevron} alt="" />
                  </span>{" "}
                  
                    <span className="hrFirDs">Employee Management</span>
                  
                  <span>
                    <img src={chevron} alt="" />
                  </span>{" "}
                  <span className="thml">Create Employee</span>
                </div>

              </div>

              {/* second */}
              <main className="creteEmpWrap">

                {/* personal details */}
                <div className="personDetaCon">
                  <h2>Personal Details</h2>

                  <hr />

                  <div className="PDAllFie">
                    {/* first row */}
                    <div className="PDFirs">
                      <input
                        type="text"
                        placeholder="Employee Name*"
                        className="empName"
                      />
                      <input
                        type="text"
                        placeholder="Enter Employee Phone*"
                        className="empName"
                      />
                      <input type="date" placeholder="" className="empDate" />
                      <input
                        type="text"
                        placeholder="Personal Email ID"
                        className="empEmailId"
                      />
                    </div>

                    {/* second row */}
                    <div className="PDFirs">
                      <input
                        type="text"
                        placeholder="Employee Name*"
                        className="empAdd"
                      />
                      <input
                        type="text"
                        placeholder="Enter Employee Phone*"
                        className="empAdd"
                      />

                      <input
                        type="text"
                        placeholder="Personal Email ID"
                        className="empAdd"
                      />
                    </div>

                    <div className="PdThird">

                      {/* left side */}
                      <div className="PdthirLeft">
                        <select name="" id="" className="pdSelec">
                          <option value="" selected className="pdThOp">
                            Country*
                          </option>
                        </select>
                        <select name="" id="" className="pdSelec">
                          <option value="" selected>
                            City*
                          </option>
                        </select>
                        <select name="" id="" className="pdSelec">
                          <option value="" selected>
                            Pincode*
                          </option>
                        </select>
                      </div>

                      {/* right side */}
                      <div className="PdthirLeft">

                      <select name="" id="" className="pdSelec">
                          <option value="" selected>
                            Country*
                          </option>
                        </select>
                      <select name="" id="" className="pdSelec">
                          <option value="" selected>
                            Country*
                          </option>
                        </select>
                      <select name="" id="" className="pdSelec">
                          <option value="" selected>
                            Country*
                          </option>
                        </select>

                      </div>

                    </div>

     <div className="pdFourth">
          
            <p>Gender*</p>

            <div className="pdFoOpt">

                <label htmlFor="">
                    <input type="radio" />
                    <span>Male</span>
                </label>

                <label htmlFor="">
                    <input type="radio" />
                    <span>Female</span>
                </label>

            </div>


     </div>

                  </div>
                </div>

                {/* company details */}
                <div className="companyDetCon">

                    <h2>Company Detail</h2>
                    <hr />

                    <div className="allComInputs">

                        {/* first  */}
                        <div className="alComFirst">

                            <input type="text" className="empId" placeholder="Employee ID*" />
                            <input type="text" className="empId" placeholder="Date of Joining*" />

                            <input type="text" placeholder="Branch*" className="empCoBranc" />

                             <input type="text" placeholder="Department*" className="emComDepart" />
  

                        </div>

                         <div className="alComFirst">

                            <input type="text" placeholder="Designation*" className="emComDepart" />
                            <input type="text" placeholder="Salary*" className="empCoBranc" />
                         </div>

                        <div>
                            
                        </div>

                    </div>

                </div>


                {/* docoument details */}
                <div className="docuDetCon">
                    <h2>Document Detail</h2>
                    <hr />

            <div className="allDocInputs">

{/* first  */}
<div className="documeFirst">
    <input type="text"  placeholder="Pan Number"  className="docNum" />
    <input type="text"  placeholder="Aadhaar Number" className="docNum" />
    <input type="text"  placeholder="Validation Of Pan Number" className="docNum" />
</div>

{/* secondd */}
<div className="documeFirst">

    <div className="uploadDoc">
        <input type="text" placeholder="Upload Pan Card"  />
        <button><span>Upload here</span></button>
    </div>
    <div className="uploadDoc">
        <input type="text" placeholder="10th Certificate"  />
        <button><span>Upload here</span></button>
    </div>

</div>

{/* secondd */}
<div className="documeFirst">

    <div className="uploadDoc">
        <input type="text" placeholder="Cancel Check Upload"  />
        <button><span>Upload here</span></button>
    </div>
    <div className="uploadDoc">
        <input type="text" placeholder="12th Certificate"  />
        <button><span>Upload here</span></button>
    </div>

</div>
{/* secondd */}
<div className="documeFirst">

    <div className="uploadDoc">
        <input type="text" placeholder="Upload Aadhaar Card"  />
        <button><span>Upload here</span></button>
    </div>
    <div className="uploadDoc">
        <input type="text" placeholder="Graduation Certificate"  />
        <button><span>Upload here</span></button>
    </div>

</div>

            </div>

                </div>


{/* bank account details */}
<div className="bankAccDetCont">

   <h2>Bank Account Detail</h2>
   <hr />

   <div className="bankAllinpts">

{/* first  */}
<div className="bankFist">

 <input type="text" placeholder="Account Holder Name" className="accName" />
 <input type="text" placeholder="Account Number" className="accName" />
 <input type="text" placeholder="Bank Name" className="accName" />
 <input type="text" placeholder="IFSC" className="accIFSC" />

</div>

{/* first  */}
<div className="bankFist">

 <input type="text" placeholder="Branch" className="bankBranch" />

 <div className="uploadDoc">
        <input type="text" placeholder="Last Organization Docs"  />
        <button><span>Upload here</span></button>
    </div>
    
     <div className="uploadDoc">
        <input type="text" placeholder="Experience Letter Of LO"  />
        <button><span>Upload here</span></button>
    </div>


</div>

<div className="bankFist">

<div className="uploadDoc">
        <input type="text" placeholder="Relieving Letter of LO"  />
        <button><span>Upload here</span></button>
    </div> 
    <div className="uploadDoc">
        <input type="text" placeholder="Offer Letter Of LO"  />
        <button><span>Upload here</span></button>
    </div>
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

export default CreateEmployee;
