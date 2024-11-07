import AdminSidebar from "../Sidebar/AdminSidebar";
import AdminNavbar from "../Navbar/AdminNavbar";
import { useMain } from "../../../hooks/useMain";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./permission.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  allLead,
  allowancePerms,
  assetPerms,
  dashboardPerms,
  expensePerms,
  hrmsSetupPerms,
  leadSystem,
  otherPerms,
  payrollPerms,
  payslipPerms,
  ProjectCreate,
  taskPerms,
  permissionProvide
} from "./data";
import { useLocation, useNavigate } from "react-router-dom";
import HrSidebar from "../../Hr/Sidebar/HrSidebar";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import HrNavbar from "../../Hr/Navbar/HrNavbar";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";

const PermissionData = ({  pop1,
  setPop1,
  pop,
  setPop,
  setAlert,
  isHr = false,}) => {

  const { user,ProvidePermission,UpdatePermission} = useMain();

  let hrms_user = JSON?.parse(localStorage.getItem("hrms_user"));
  const { role } = hrms_user;

  const navigate = useNavigate();

  const [roleName , setRoleName] = useState({
    name:"" ,  
  });

  const location = useLocation();

  const item = location.state;

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setRoleName((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [selectLead, setSelectLead] = useState([]);


  const applyPermission = async () => {
    
    if(roleName?.name === ""){
      return toast.error("Please Enter the name");
    }
    const toastId = toast.loading("Loading...");

    const ans = await ProvidePermission({
      name: roleName?.name,
      Service: selectLead ,
    });

    toast.success("Successfuly done");
    navigate("/adminDash/Permission")
    toast.dismiss(toastId);
  };

  const udpatePermision = async () => {
    
    if(roleName?.name === ""){
      return toast.error("Please Enter the name");
    }
    const toastId = toast.loading("Loading...");

    const ans = await UpdatePermission({
      name: roleName?.name,
      Service: selectLead ,
      roleId: item?._id
    });

    if(ans?.status){
        toast.success("Successfuly Updated");
        navigate("/adminDash/Permission")

    }

    toast.dismiss(toastId);
  };

  const handleSelect = (id) => {
    setSelectLead((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((leadId) => leadId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = (event, categoryArray) => {
    if (event.target.checked) {
      setSelectLead((prevSelected) => [
        ...prevSelected,
        ...categoryArray
          .map((item) => item.id)
          .filter((id) => !prevSelected.includes(id)),
      ]);
    } else {
      setSelectLead((prevSelected) =>
        prevSelected.filter(
          (id) => !categoryArray.some((item) => item.id === id)
        )
      );
    }
  };

  const renderCategory = (category, title) => (
    <div className="leadroleCont">
      <div className="lead_head">
        <input
          type="checkbox"
          checked={category.every((item) => selectLead.includes(item.id))}
          onChange={(e) => handleSelectAll(e, category)}
        />
        <h2>{title}</h2>
      </div>
      
      <hr />
      
      <div className="leadroelscond">
        {category.map((item) => (
          <div key={item.id} className="singlead">
            <input
              type="checkbox"
              checked={selectLead.includes(item.id)}
              onChange={() => handleSelect(item.id)}
            />
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );

  useEffect(() => {
    if (item) {
        setRoleName({ name: item.name });

        const truePermissions = Object.keys(item).filter(key => 
            item[key] === true 
        );
        setSelectLead(truePermissions);
    }
}, [item]);

  return (
    <>
      <div className="annDash relative h-full">
        {/* <AdminSidebar pop={pop} setPop={setPop} /> */}
        {isHr ? (
          <HrSidebar />
        ) : role === "EMPLOYEE" ? (
          <EmployeeSidebar pop={pop} setPop={setPop} />
        ) : (
          <AdminSidebar pop={pop} setPop={setPop} />
        )}

        <div className="tm">
          {/* <AdminNavbar user={user} setAlert={setAlert} /> */}
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


          <div className="em editrolewrap">
            <h1>Edit Role</h1>

            <label htmlFor="" className="inputfilabel">
              <p>Name</p>
            <input type="text"  value={roleName.name} name="name" onChange={changeHandler} />
            </label>

            <div className="allroleswrap">
              {renderCategory(allLead, "Lead")}
              {renderCategory(ProjectCreate, "Project")}
              {renderCategory(leadSystem, "Lead System")}
              {renderCategory(taskPerms, "Task")}
              {renderCategory(hrmsSetupPerms, "HRMS setup")}
              {renderCategory(assetPerms, "Assets")}
              {renderCategory(allowancePerms, "Allowance")}
              {renderCategory(expensePerms, "Expense")}
              {renderCategory(payrollPerms, "Payroll")}
              {renderCategory(dashboardPerms, "Dashboard ")}
              {renderCategory(payslipPerms, "Payslip ")}
              {renderCategory(otherPerms, "Others")}
              {renderCategory(permissionProvide, "Permission Page")}
            </div>

            <button onClick={()=>{
                if(item){
             udpatePermision();
                }
                else{
                    applyPermission()
                }
            }} className="udpateBtns"><span>{item?"Update":"Create"}</span></button>

          </div>
          
        </div>
      </div>
    </>
  );
};

export default PermissionData;
