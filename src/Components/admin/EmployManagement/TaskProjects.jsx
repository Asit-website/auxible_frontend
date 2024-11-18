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
import threedots from "../../images/thredonts.png";
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

const TaskProjects = ({ setAlert, pop, setPop }) => {
  const {
    user,
    allEmployee,
    editProjectapi,
    getAllProjectApi,
    createProjectapi,
    deleteTaskProject,
  } = useMain();

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const { role } = hrms_user;

  const [formdata, setFormdata] = useState({
    Name: "",
    Description: "",
    Members: [],
    Status: "Ongoing",
    DueDate: "",
  });

  const [proUser, setProUser] = useState([]);


  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const changeHandler2 = (e) => {
    const selectedEmpId = e.target.value;
    if (selectedEmpId === 'Select' || formdata.Members.includes(selectedEmpId)) return;

    const selectedEmp = allEmp.find((emp) => emp._id === selectedEmpId);
    setProUser([...proUser, selectedEmp.fullName]);
    setFormdata({ ...formdata, Members: [...formdata.Members, selectedEmpId] });
  };

  const removeUser = (index) => {
    const newProUser = proUser.filter((_, i) => i !== index);
    const newMembers = formdata.Members.filter((_, i) => i !== index);
    setProUser(newProUser);
    setFormdata({ ...formdata, Members: newMembers });
  };

  const [showIndex, setShowIndex] = useState(null);

  const [isEdit, setIsEdit] = useState(false);

  const [addClientPop, setAddClientPop] = useState(false);

  const [optIndex, setOptIndex] = useState(0);

  const navigate = useNavigate();

  const [allProjects, setAllProjects] = useState([]);

  const [storeProject, setStorePro] = useState([]);

  const [allEmp, setAllEmp] = useState([]);

  const getAllProject = async () => {
    const ans = await getAllProjectApi();
    if (ans?.status) {
      setAllProjects(ans?.data);
      setStorePro(ans?.data);
    }
  };

  const editHandler = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Loading...");
    try {
      const ans = await editProjectapi({ ...formdata, projectId: isEdit });
      if (ans?.status) {
        toast.success("Successfuly updated");
        getAllProject();
        setFormdata({
          Name: "",
          Description: "",
          Members: [],
          Status: "Ongoing",
          DueDate: "",
          Members: "",
        });
        setAddClientPop(false);
        setProUser([]);
        setIsEdit(false);
        setShowIndex(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("sometinng went wrong ,please try agin");
    }

    toast.dismiss(toastId);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setShowIndex(null);
    const toastId = toast.loading("Loading...");
    try {
      const ans = await createProjectapi({ ...formdata });
      if (ans?.status) {
        toast.success("Successfuly created");
        getAllProject();
        setFormdata({
          Name: "",
          Description: "",
          Members: "",
          Status: "Ongoing",
          DueDate: "",
          Members: "",
        });
        setAddClientPop(false);
        setProUser([]);
      }
    } catch (error) {
      console.log(error);
      toast.error("sometinng went wrong ,please try agin");
    }

    toast.dismiss(toastId);
  };

  const fetchemp = async () => {
    const ans = await allEmployee();
    setAllEmp(ans?.emp);
  };

  const deleteApi = async (id) => {
    const toastId = toast.loading("Loading...");
    setShowIndex(null);
    const ans = await deleteTaskProject(id);
    toast.success("Successfuly deleted");
    toast.dismiss(toastId);
    getAllProject();
  };

  const handleEditClick = (client) => {
    const membersNames = client.Members.map(memberId => {
      const member = allEmp.find(emp => emp._id === memberId?._id);
      return member ? member.fullName : '';
    });

    setIsEdit(client._id);
    setFormdata(client);
    setProUser(membersNames);
    setAddClientPop(true);
  };

  useEffect(() => {
    fetchemp();
    getAllProject();
  }, []);

  useEffect(() => {
    if (optIndex === 0) {
      setAllProjects([...storeProject]);
    } else if (optIndex === 1) {
      const fitlerdata = storeProject.filter((pro) => pro.Status === "Ongoing");
      setAllProjects(fitlerdata);
    } else if (optIndex === 2) {
      const fitlerdata = storeProject.filter(
        (pro) => pro.Status === "Finished"
      );
      setAllProjects(fitlerdata);
    } else {
      const fitlerdata = storeProject.filter((pro) => pro.Status === "OnHold");
      setAllProjects(fitlerdata);
    }
  }, [optIndex]);

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
                <h2>Projects</h2>

                <div className="clibtns">
                  <button
                    onClick={() => {
                      setAddClientPop(true);
                    }}
                    className="newcli"
                  >
                    <img src={pluss} /> <span>Add Project</span>
                  </button>
                  {/* <button className="impcli">
                    <span>Import Project</span>
                  </button>
                  <button className="expoclient">
                    <span>Export Project</span>
                  </button> */}
                </div>
              </nav>

              {/* filter type  */}
              <div className="selectOption">
                {projectOpt.map((pr, index) => (
                  <div
                    onClick={() => setOptIndex(index)}
                    key={index}
                    className={`cursor-pointer singelPr ${
                      index === 0 && "addlefborder"
                    }  ${index === 3 && "addBorder"} ${
                      optIndex === index && "adddbg"
                    }`}
                  >
                    <span>{pr}</span>
                  </div>
                ))}
              </div>

              <div className="allClients">
                {allProjects.map((client, index) => (
                  <div key={index} className="singleProject">
                    
                    <div
                     
                      className="projnav"
                    >
                      <div  onClick={()=>navigate("/adminDash/HRM/projectDetails" , {state: client})} className="leftnav cursor-pointer">
                        <Avatar
                        
                          name={client?.Name}
                          colour={
                            index % 3 == 0
                              ? "#3C78E9"
                              : `${index % 2 == 0 ? "#E45D3A" : "#F7A539"}`
                          }
                          size={32}
                          className="avatarclient"
                        />
                        <p>{client.Name}</p>
                      </div>

                      <img  className="cursor-pointer" onClick={() => {
                        if (showIndex === index) {
                          setShowIndex(null);
                        } else {
                          setShowIndex(index);
                        }
                      }} src={threedots} alt="" />

                    </div>

                    <hr />

                    <div className="statusdue">
                      <div
                        className={`stapro ${
                          client.Status === "Finished" && "finibg"
                        } ${client.Status === "Ongoing" && "Ongoingbg"} ${
                          client.Status === "OnHold" && "OnHoldbg"
                        }`}
                      >
                        <span className={`${client?.Status === "onHold" || "onHoldbg"}`}>{client.Status}</span>
                      </div>

                      <p className="duedate">
                        {" "}
                        <span>Due Date:</span>
                        {client?.DueDate}
                      </p>
                    </div>

                    <div className="propara">
                      <p className="">{client?.Description}</p>
                    </div>

                    <div className="mem">
                      <p>Members</p>
                       <p>{client?.Members?.length}</p>
                    </div>

                    <div className="protasjwon">
                      <p className="proteast">{client.task} Tasks</p>
                    </div>

 <div className="mem">
                     <p onClick={()=>navigate("/adminDash/HRM/projectOverview" , {state:client})} className="oveviewBtn">Overview </p>
 </div>

                    {showIndex === index && (
                      <div className="showIndexcont2">
                        {/* <div className="singlinpro">
                          <img src={invidd} alt="" />
                          <span>Invite Employee</span>
                        </div>

                        <hr /> */}

                        <div
                          onClick={() => {
                        
                            handleEditClick(client);
                          }}
                          className="singlinpro"
                        >
                          <img src={edit} alt="" />
                          <span>Edit</span>
                        </div>

                        <hr />

                        {/* <div className="singlinpro">
                          <img src={share} alt="" />
                          <span>Share to Clients</span>
                        </div>

                        <hr /> */}

                        {/* <div className="singlinpro">
                          <img src={bxcopy} alt="" />
                          <span>Duplicate</span>
                        </div>

                        <hr /> */}

                        <div
                          onClick={() => deleteApi(client?._id)}
                          className="singlinpro"
                        >
                          <img src={disable} alt="" />
                          <span className="delspan">Delete</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {addClientPop && (
        <div className="addCliWrap">
          <div className="addClieCont addheight">
            <nav>
              <p>Create New Project</p>
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

            <form onSubmit={isEdit ? editHandler : submitHandler}>
              <label>
                <p>Name</p>
                <input
                  name="Name"
                  value={formdata.Name}
                  onChange={changeHandler}
                  type="text"
                  placeholder="Name"
                />
              </label>

              <label>
                <p>Employee </p>

                <div className="allempid">
                  {proUser.map((pro, index) => (
                    <div key={index} className="sinproid">
                      <p >{pro}</p>
                      <img
                        src={cut}
                        alt="Remove"
                        onClick={() => removeUser(index)}
                      />
                    </div>
                  ))}
                </div>

                <select
                  name="Members"
                  value={formdata.Members}
                  onChange={changeHandler2}
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
                <p>Status </p>
                <select
                  name="Status"
                  value={formdata.Status}
                  onChange={changeHandler}
                >
                  <option value="Ongoing">Ongoing</option>
                  <option value="OnHold">OnHold</option>
                  <option value="Finished">Finished</option>
                </select>
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
                  <span>Add Project</span>
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
export default TaskProjects;
