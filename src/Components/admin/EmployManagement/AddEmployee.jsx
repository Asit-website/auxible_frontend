import React, { useState } from "react";
import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import "./emp.css";
import bxUser from "../../images/bx-user-pin.png";
// import OutsideClickHandler from "react-outside-click-handler";
// import upload from '../../images/upload.svg';

const item = [
  {
    title: "Full-time Employees",
  },
  {
    title: "Part-time Employees",
  },
  {
    title: "Trainee Employees",
  },
];

const AddEmployee = ({ setAlert, pop, setPop }) => {
  const { user } = useMain();

  const [currEmp, setCurrEmp] = useState(0);

  const [formdata , setFormdata] = useState({
    employeeId:"" ,
    firstName:"",
    lastName:"" ,
    dateOfJoin:"",
    mobile:"" , 
    personalEmail:"",
    password:"",
    email:"",
    gender:""
  })


  const changeHandler = async(e)=>{
    const {name , value} = e.target;

     setFormdata((prev)=>({
        ...prev ,
        [name]:value
     }))
  }

  return (
    <>
      <div className="employee-dash h-full">
        <AdminSidebar pop={pop} setPop={setPop} />

        <div className="tm">
          <AdminNavbar user={user} setAlert={setAlert} />

          <div className="em">
            {/* first  */}
            <section className="adFri">
              {/* left side  */}
              <h2>Add Employee</h2>

              {/* right side  */}
              <div className="adFrRIH">
                <button className="calce">
                  <span>Cancel</span>
                </button>
                <button className="register">
                  <span>Register New</span>
                </button>
              </div>
            </section>

            {/* /main section  */}
            <main className="leadForm">
              {/* first sec */}

              <div className="leadInFir">
                {item.map((e, index) => (
                  <div
                    onClick={() => setCurrEmp(index)}
                    className="sinInfir"
                    key={index}
                  >
                    <img src={bxUser} alt="" />

                    <p className={`${currEmp == index ? "currEmp" : "nom"}`}>
                      {e.title}
                    </p>
                  </div>
                ))}
              </div>

                     {/* four forms   */}
              <div className="foruFormWrap">

{/* first row form  */}

 <div className="emFriFormwrap">

   {/* first form  */}
   <div className="adFirstForm">

    <h2>Personal Detail</h2>

    <label htmlFor="" className="fullLabel">
        <p>EMPLOYEE ID**</p>
        <input type="text" value={formdata.employeeId} name="employeeId"  onChange={changeHandler} />
    </label>

     <div className="twoInputWrap">

     <label htmlFor="" className="halfLabel">
        <p>First Name*</p>
        <input type="text" value={formdata.firstName} name="firstName"  onChange={changeHandler} />
    </label>

     <label htmlFor="" className="halfLabel">
        <p>Last Name*</p>
        <input type="text" value={formdata.lastName} name="lastName"  onChange={changeHandler} />
    </label>
    
     </div>

     <div className="twoInputWrap">

     <label htmlFor="" className="halfLabel">
        <p>Date of Joining*</p>
        <input type="text" value={formdata.dateOfJoin} name="dateOfJoin"  onChange={changeHandler} />
    </label>

     <label htmlFor="" className="halfLabel">
        <p>Mobile*</p>
        <input type="text" value={formdata.mobile} name="mobile"  onChange={changeHandler} />
    </label>


    
     </div>

     <div className="twoInputWrap">

     <label htmlFor="" className="halfLabel">
        <p>Personal Email ID*</p>
        <input type="text" value={formdata.personalEmail} name="personalEmail"  onChange={changeHandler} />
    </label>

  <div className="checWrap">

     <label htmlFor="" className="checkLabel">
        <input type="checkbox" name="gender" value={formdata.gender} onChange={changeHandler} />

        <span>Male</span>
        
     </label>

     <label htmlFor="" className="checkLabel">
        <input type="checkbox" onChange={changeHandler} value={formdata.gender} name="gender" />
        <span>Female</span>
     </label>

  </div>

     </div>

     <div className="twoInputWrap">

     <label htmlFor="" className="halfLabel">
        <p>Password*</p>
        <input type="text" value={formdata.password} name="password"  onChange={changeHandler} />
    </label>

     <label htmlFor="" className="halfLabel">
        <p>Email*</p>
        <input type="email" value={formdata.email} name="email"  onChange={changeHandler} />
    </label>


    
     </div>

   </div>

     {/* second form  */}
     <div className="adFirstForm">

<h2>Address Detail</h2>

<label htmlFor="" className="fullLabel">
    <p>EMPLOYEE ID**</p>
    <input type="text" value={formdata.employeeId} name="employeeId"  onChange={changeHandler} />
</label>

 <div className="twoInputWrap">

 <label htmlFor="" className="halfLabel">
    <p>First Name*</p>
    <input type="text" value={formdata.firstName} name="firstName"  onChange={changeHandler} />
</label>

 <label htmlFor="" className="halfLabel">
    <p>Last Name*</p>
    <input type="text" value={formdata.lastName} name="lastName"  onChange={changeHandler} />
</label>

 </div>

 <div className="twoInputWrap">

 <label htmlFor="" className="halfLabel">
    <p>Date of Joining*</p>
    <input type="text" value={formdata.dateOfJoin} name="dateOfJoin"  onChange={changeHandler} />
</label>

 <label htmlFor="" className="halfLabel">
    <p>Mobile*</p>
    <input type="text" value={formdata.mobile} name="mobile"  onChange={changeHandler} />
</label>



 </div>

 <div className="twoInputWrap">

 <label htmlFor="" className="halfLabel">
    <p>Personal Email ID*</p>
    <input type="text" value={formdata.personalEmail} name="personalEmail"  onChange={changeHandler} />
</label>

<div className="checWrap">

 <label htmlFor="" className="checkLabel">
    <input type="checkbox" name="gender" value={formdata.gender} onChange={changeHandler} />

    <span>Male</span>
    
 </label>

 <label htmlFor="" className="checkLabel">
    <input type="checkbox" onChange={changeHandler} value={formdata.gender} name="gender" />
    <span>Female</span>
 </label>

</div>

 </div>

 <div className="twoInputWrap">

 <label htmlFor="" className="halfLabel">
    <p>Password*</p>
    <input type="text" value={formdata.password} name="password"  onChange={changeHandler} />
</label>

 <label htmlFor="" className="halfLabel">
    <p>Email*</p>
    <input type="email" value={formdata.email} name="email"  onChange={changeHandler} />
</label>



 </div>

</div>

 </div>

{/* second row form  */}

 <div className="emFriFormwrap">

   {/* first form  */}
   <div className="adFirstForm">

    <h2>Personal Detail</h2>

    <label htmlFor="" className="fullLabel">
        <p>EMPLOYEE ID**</p>
        <input type="text" value={formdata.employeeId} name="employeeId"  onChange={changeHandler} />
    </label>

     <div className="twoInputWrap">

     <label htmlFor="" className="halfLabel">
        <p>First Name*</p>
        <input type="text" value={formdata.firstName} name="firstName"  onChange={changeHandler} />
    </label>

     <label htmlFor="" className="halfLabel">
        <p>Last Name*</p>
        <input type="text" value={formdata.lastName} name="lastName"  onChange={changeHandler} />
    </label>
    
     </div>

     <div className="twoInputWrap">

     <label htmlFor="" className="halfLabel">
        <p>Date of Joining*</p>
        <input type="text" value={formdata.dateOfJoin} name="dateOfJoin"  onChange={changeHandler} />
    </label>

     <label htmlFor="" className="halfLabel">
        <p>Mobile*</p>
        <input type="text" value={formdata.mobile} name="mobile"  onChange={changeHandler} />
    </label>


    
     </div>

     <div className="twoInputWrap">

     <label htmlFor="" className="halfLabel">
        <p>Personal Email ID*</p>
        <input type="text" value={formdata.personalEmail} name="personalEmail"  onChange={changeHandler} />
    </label>

  <div className="checWrap">

     <label htmlFor="" className="checkLabel">
        <input type="checkbox" name="gender" value={formdata.gender} onChange={changeHandler} />

        <span>Male</span>
        
     </label>

     <label htmlFor="" className="checkLabel">
        <input type="checkbox" onChange={changeHandler} value={formdata.gender} name="gender" />
        <span>Female</span>
     </label>

  </div>

     </div>

     <div className="twoInputWrap">

     <label htmlFor="" className="halfLabel">
        <p>Password*</p>
        <input type="text" value={formdata.password} name="password"  onChange={changeHandler} />
    </label>

     <label htmlFor="" className="halfLabel">
        <p>Email*</p>
        <input type="email" value={formdata.email} name="email"  onChange={changeHandler} />
    </label>


    
     </div>

   </div>

     {/* second form  */}
     <div className="adFirstForm">

<h2>Address Detail</h2>

<label htmlFor="" className="fullLabel">
    <p>EMPLOYEE ID**</p>
    <input type="text" value={formdata.employeeId} name="employeeId"  onChange={changeHandler} />
</label>

 <div className="twoInputWrap">

 <label htmlFor="" className="halfLabel">
    <p>First Name*</p>
    <input type="text" value={formdata.firstName} name="firstName"  onChange={changeHandler} />
</label>

 <label htmlFor="" className="halfLabel">
    <p>Last Name*</p>
    <input type="text" value={formdata.lastName} name="lastName"  onChange={changeHandler} />
</label>

 </div>

 <div className="twoInputWrap">

 <label htmlFor="" className="halfLabel">
    <p>Date of Joining*</p>
    <input type="text" value={formdata.dateOfJoin} name="dateOfJoin"  onChange={changeHandler} />
</label>

 <label htmlFor="" className="halfLabel">
    <p>Mobile*</p>
    <input type="text" value={formdata.mobile} name="mobile"  onChange={changeHandler} />
</label>



 </div>

 <div className="twoInputWrap">

 <label htmlFor="" className="halfLabel">
    <p>Personal Email ID*</p>
    <input type="text" value={formdata.personalEmail} name="personalEmail"  onChange={changeHandler} />
</label>

<div className="checWrap">

 <label htmlFor="" className="checkLabel">
    <input type="checkbox" name="gender" value={formdata.gender} onChange={changeHandler} />

    <span>Male</span>
    
 </label>

 <label htmlFor="" className="checkLabel">
    <input type="checkbox" onChange={changeHandler} value={formdata.gender} name="gender" />
    <span>Female</span>
 </label>

</div>

 </div>

 <div className="twoInputWrap">

 <label htmlFor="" className="halfLabel">
    <p>Password*</p>
    <input type="text" value={formdata.password} name="password"  onChange={changeHandler} />
</label>

 <label htmlFor="" className="halfLabel">
    <p>Email*</p>
    <input type="email" value={formdata.email} name="email"  onChange={changeHandler} />
</label>



 </div>

</div>

 </div>

              </div>

            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEmployee;
