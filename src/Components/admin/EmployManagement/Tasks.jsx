import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import "./HRMsystem.css";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";
import "./quote.css";
import pluss from "../../images/pluss.png";
import { Avatar } from "react-profile-avatar";
import "react-profile-avatar/dist/index.css";
import { useEffect, useState } from "react";
import edit from "../../images/edit.png";
import disable from "../../images/delete1.png";
import cut from "../../images/cutt.png";
import invidd from "../../images/invide.png";
import share from "../../images/bx-share-alt.png";
import bxcopy from "../../images/bx-copy.png";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const projectOpt = ["All", "Ongoing", "Finished", "OnHold"];

const Tasks = ({ setAlert, pop, setPop }) => {

  const { user , allEmployee , getAllProjectApi , CreateProjectTask , getAllProjectAllTaskApi } = useMain();

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const { role } = hrms_user;

  const [formdata, setFormdata] = useState({
    Title: "",
    Description: "",
    Members: "",
    StartDate:"" ,
    DueDate: "",
    Project:"" , 
    Priority:"" , 
    Github:""

  });

  const [proUser, setProUser] = useState([]);


  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const [addClientPop, setAddClientPop] = useState(false);

  const [allEmp, setAllEmp] = useState([]);

  const [allProject , setAllProject] = useState([]);
  const [allTasks , setAllTasks] = useState([]);

  const allEmpapi = async()=>{
     const ans = await allEmployee();
     setAllEmp(ans?.emp);
  } 

  const getAllProjectAllTask = async()=>{
    const ans = await getAllProjectAllTaskApi();
     setAllTasks(ans?.data);

 }

  const getAllProject = async()=>{
    const ans = await getAllProjectApi();
    setAllProject(ans?.data);
  } 

  const submitHandler = async(e)=>{
    e.preventDefault();
    try{

      const toastId = toast.loading("Loading....");

       const ans = await CreateProjectTask({...formdata});
        if(ans?.status){
          toast.success("Successfuly created task");
        }

        setAddClientPop(false);
        getAllProjectAllTask();
        setFormdata({
          Title: "",
          Description: "",
          Members: "",
          StartDate:"" ,
          DueDate: "",
          Project:"" , 
          Github:""
      
        })

       toast.dismiss(toastId);

    } catch(error){
      console.log(error);
      toast.error("Something went wrong , please try again")
    }
  }

  useEffect(()=>{
    allEmpapi();
    getAllProject();
    getAllProjectAllTask();
  },[])

  return (
    <>
      <div className="employee-dash h-full">
        {role === "EMPLOYEE" ? (
          <EmployeeSidebar pop={pop} setPop={setPop} />
        ) : (
          <AdminSidebar pop={pop} setPop={setPop} />
        )}

        <div className="tm">
          {role === "EMPLOYEE" ? (
            <EmployeeNavbar user={user} setAlert={setAlert} />
          ) : (
            <AdminNavbar user={user} setAlert={setAlert} />
          )}

          <div className="em">

            <div className="tclwrap">

              <nav>
                <h2>Tasks</h2>

                <div className="clibtns">
                  <button
                    onClick={() => {
                      setAddClientPop(true);
                    }}
                    className="newcli"
                  >
                    <img src={pluss} /> <span>Add Tasks</span>
                  </button>
                  <button className="impcli">
                    <span>Import Tasks</span>
                  </button>
                  <button className="expoclient">
                    <span>Export Tasks</span>
                  </button>
                </div>
              </nav>

            </div>

            {/* ALL TASKS  */}
            

<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>

                <th scope="col" class="px-6 py-3">
                    Subject
                </th>
                <th scope="col" class="px-6 py-3">
                Assign To
                </th>
                <th scope="col" class="px-6 py-3">
                StartDate
                </th>
                <th scope="col" class="px-6 py-3">
                DueDate
                </th>
                <th scope="col" class="px-6 py-3">
                Project
                </th>
                <th scope="col" class="px-6 py-3">
                Priority
                </th>
                <th scope="col" class="px-6 py-3">
                Github
                </th>
                <th scope="col" class="px-6 py-3">
                Description
                </th>
            </tr>
        </thead>
        <tbody>

  {
    allTasks?.map((task ,index)=>(
      <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
     
      <td class="px-6 py-4">
          {task.Title}
      </td>
      <td class="px-6 py-4">
          {task?.Members?.fullName}
      </td>
      <td class="px-6 py-4">
          {task?.StartDate}
      </td>
      <td class="px-6 py-4">
          {task?.DueDate}
      </td>
      <td class="px-6 py-4">
          {task?.Project?.Name}
      </td>
      <td class="px-6 py-4">
          {task?.Priority}
      </td>
      <td class="px-6 py-4">
          {task?.Github}
      </td>
      <td class="px-6 py-4">
          {task?.Description}
      </td>
  </tr>

    ))
  }
          
        </tbody>
    </table>
</div>


          </div>

        </div>
      </div>

      {addClientPop && (
        <div className="addCliWrap">
          <div className="addClieCont addheight">

            <nav>
              <p>Create New Task</p>
              <img
                onClick={() => {
                  setAddClientPop(false);
                  setProUser([]);
                  setFormdata({
                   Name: "",
                   Description: "",
                   Members: "",
                   Status: "Ongoing",
                   DueDate: "",
                   Members: "",
                  })
                }}
                src={cut}
                alt=""
              />
            </nav>

            <hr />

            <form onSubmit={submitHandler} >

              <label>
                <p>Subject</p>
                <input
                  name="Title"
                  value={formdata.Title}
                  onChange={changeHandler}
                  type="text"
                  placeholder="Name"
                />
              </label>

              <label>
                <p>Assign To </p>

                <select
                  name="Members"
                  value={formdata.Members}
                  onChange={changeHandler}
                >
                  <option value="Select">Select Employee</option>
                  {allEmp?.map((emp, index) => (
                    <option value={emp?._id} key={index}>
                      {emp?.fullName}
                    </option>
                  ))}
                </select>

              </label>

              <label>
                <p>Project </p>

                <select
                  name="Project"
                  value={formdata.Project}
                  onChange={changeHandler}
                >
                  <option value="Select">Select Employee</option>
                  {allProject?.map((emp, index) => (
                    <option value={emp?._id} key={index}>{emp?.Name}</option>
                  ))}
                </select>
              </label>

              <label>
                <p>Priority </p>

                <select
                  name="Priority"
                  value={formdata.Priority}
                  onChange={changeHandler}
                >
                  <option value="Select">Select Priority</option>
                  <option value="Normal">Normal</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  
                </select>
              </label>

              <label>
                <p>Start Date </p>
                <input
                  name="StartDate"
                  value={formdata.StartDate}
                  onChange={changeHandler}
                  type="date"
                />
               
              </label>

              <label>
                <p>Due Date</p>
                <input
                  name="DueDate"
                  value={formdata.DueDate}
                  onChange={changeHandler}
                  type="date"
                />
              </label>

              <label>
                <p>Github</p>
                <input
                  name="Github"
                  value={formdata.Github}
                  onChange={changeHandler}
                  type="text"
                />
              </label>

              <label>
                <p>Description</p>
                <textarea
                  type="text"
                  name="Description"
                  value={formdata.Description}
                  onChange={changeHandler}
                  placeholder="Description"
                />
              </label>

              <div className="btnsss">
                <button type="submit" className="saveclient">
                  <span>Add Task</span>
                </button>
                <button
                  onClick={() => {
                    setAddClientPop(false);
                    setProUser([]);
                     setFormdata({
                      Name: "",
                      Description: "",
                      Members: "",
                      Status: "Ongoing",
                      DueDate: "",
                      Members: "",
                     })
                  }}
                  className="cancel"
                >
                  <span>Cancel</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </>
  );
};
export default Tasks;
