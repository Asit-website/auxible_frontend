import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import "./HRMsystem.css";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";
import "./quote.css";
import pluss from "../../images/pluss.png";
import "react-profile-avatar/dist/index.css";
import predit from "../../images/Frame 9740.png";
import predel from "../../images/Frame 9741.png";
import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import cut from "../../images/cutt.png";
import CircularProgress from "./CircularProgress";
import { MdDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";

const ProjectDetails = ({ setAlert, pop, setPop }) => {
  const {
    user,
    getAllProjectApi,
    CreateProjectTask,
    getProjectTask,
    deleteProjectTaskapi,
    EditProjectTask,  } = useMain();

  const location = useLocation();

  const data = location?.state;

  const [percentage, setPercentage] = useState(0);
  const [pendingTask, setPendingTask] = useState(0);
  const [notStartedTask, setnotStartedTask] = useState(0);
  const [startedTask, setstartedTask] = useState(0);

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const { role } = hrms_user;

  const [formdata, setFormdata] = useState({
    Title: "",
    Description: "",
    Members: "",
    StartDate: "",
    DueDate: "",
    // Project: "",
    Priority: "",
    Github: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [addClientPop, setAddClientPop] = useState(false);

  const [allEmp, setAllEmp] = useState([]);

  const [allProject, setAllProject] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [allTaskDetail, setAllTaskDetail] = useState([]);

  const getProjectTaskapi = async () => {
    const ans = await getProjectTask(data?._id);
    const reversedTasks = ans?.data.reverse();
    setAllTaskDetail(ans?.data2);
    setAllTasks(reversedTasks);
  };

  const getAllProject = async () => {
    const ans = await getAllProjectApi();
    setAllProject(ans?.data);
  };

  const submitHandler = async () => {
    try {
      const toastId = toast.loading("Loading....");

      const ans = await CreateProjectTask({
        ...formdata,
        projectId: data?._id,
      });
      if (ans?.status) {
        toast.success("Successfuly created task");
      }

      setAddClientPop(false);
      getProjectTaskapi();
      setFormdata({
        Title: "",
        Description: "",
        Members: "",
        StartDate: "",
        DueDate: "",
        Github: "",
      });

      toast.dismiss(toastId);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong , please try again");
    }
  };

  const edittaskhandler = async () => {
    try {
      const toastId = toast.loading("Loading....");

      const ans = await EditProjectTask({
        ...formdata,
        projectId: data?._id,
        taskId: isEdit,
      });
      if (ans?.status) {
        toast.success("Successfuly Updated task");
      }

      setAddClientPop(false);
      setisEdit(false);
      getProjectTaskapi();
      setFormdata({
        Title: "",
        Description: "",
        Members: "",
        StartDate: "",
        DueDate: "",
        Github: "",
      });

      toast.dismiss(toastId);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong , please try again");
    }
  };

  useEffect(() => {
    getAllProject();
    getProjectTaskapi();
  }, []);

  useEffect(() => {
    if (data) {
      setAllEmp(data?.Members);
    }
  }, [data]);

  useEffect(() => {
    const totalTasks = allTasks.length;
    const completedTasks = allTasks.filter(
      (task) => task.Status === "Completed"
    ).length;

    const notStartTasks = allTasks.filter(
      (task) => task.Status === "Not Started"
    ).length;

    const startedtasks = allTasks.filter(
      (task) => task.Status === "Started"
    ).length;
    const Pendingtasks = allTasks.filter(
      (task) => task.Status === "Pending"
    ).length;

    const completedPercentage = (completedTasks / totalTasks) * 100;
    const notStartPercentage = (notStartTasks / totalTasks) * 100;
    const startedPercentage = (startedtasks / totalTasks) * 100;
    const PendingPercentage = (Pendingtasks / totalTasks) * 100;

    setPercentage(completedPercentage);
    setnotStartedTask(notStartPercentage);
    setstartedTask(startedPercentage);
    setPendingTask(PendingPercentage);
  }, [allTasks]);

  const [isEdit, setisEdit] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  // Calculate the total number of pages
  const totalPages = Math.ceil(allTasks.length / tasksPerPage);

  // Get the tasks for the current page
  const currentTasks = allTasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  // Handle click for previous button
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle click for next button
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const deleteTasks = async (id) => {
    const resp = await deleteProjectTaskapi(id);
    if (resp.status) {
      getProjectTaskapi();
      toast.success("Succesfuly deleted");
    } else {
      toast.error("Something went wrong");
    }
  };

  // THIS IS FOR  POPUP SHOW TASK TIMER DETAILS
  const [timerPop, setTimerPop] = useState(false);

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
                <div className="pronaheading">
                  <h2>{data?.Name}</h2>
                  <p
                    className={`stapro ${
                      allProject.Status === "Finished" && "finibg"
                    } ${allProject.Status === "Ongoing" && "Ongoingbg"} ${
                      allProject.Status === "OnHold" && "OnHoldbg"
                    }`}
                  >
                    {allProject?.Status}
                  </p>
                </div>

                <div className="clibtns">
                  <NavLink to="/adminDash/HRM/taskProjects">
                    <button className="backpro">
                      <span>Back</span>
                    </button>
                  </NavLink>
                  <button
                    onClick={() => {
                      setAddClientPop(true);
                      setisEdit(false);
                    }}
                    className="newcli"
                  >
                    <img src={pluss} /> <span>Add Task</span>
                  </button>
                </div>
              </nav>

              <div className="prodlefriwrap">
                {/* left side */}
                <div className="leftprodetail">
                  <label>
                    <p className="filn">Start Date:</p>
                    <p className="proand">
                      {new Date(data?.createdAt).toLocaleDateString("en-GB")}
                    </p>
                  </label>
                  <label>
                    <p className="filn">Due Date:</p>
                    <p className="proand">{data?.DueDate}</p>
                  </label>
                  <label>
                    <p className="filn">Total Members</p>
                    <p className="proand">{data.Members?.length}</p>
                  </label>
                </div>

                {/* right side */}
                <div className="righprodetail">
                  <div>
                    <img src={predit} alt="" />
                  </div>
                  <div>
                    <img src={predel} alt="" />
                  </div>
                </div>
              </div>

              {/* this is all tasks now  */}

              <div className="relative overflow-x-auto">
                <table className="w-full prodetailTable text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Subject
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Assign To
                      </th>
                      <th scope="col" className="px-6 py-3">
                        StartDate
                      </th>
                      <th scope="col" className="px-6 py-3">
                        DueDate
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Priority
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Github
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentTasks.map((task, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <td className="px-6 py-4">{task.Title}</td>
                        <td className="px-6 py-4">{task?.Members?.fullName}</td>
                        <td className="px-6 py-4">{task?.StartDate}</td>
                        <td className="px-6 py-4">{task?.DueDate}</td>
                        <td className="px-6 py-4">{task?.Priority}</td>
                        <td className="px-6 py-4">{task?.Github}</td>
                        <td className="px-6 py-4">{task?.Description}</td>
                        <td className="px-6 py-4">{task?.Status}</td>
                        <td className="px-6 py-4 adddsomflex">
                          <MdDelete
                            onClick={() => deleteTasks(task?._id)}
                            className="iconsss"
                          />
                          <MdOutlineEdit
                            onClick={() => {
                              setAddClientPop(true);
                              setFormdata(task);
                              setisEdit(task?._id);
                            }}
                            className="iconsss2"
                          />
                          <FaEye
                            onClick={() => {
                              const filterData = allTaskDetail.find(
                                (t) => t?.taskId === task?._id
                              );
                              setTimerPop(filterData);
                            }}
                            className="iconsss"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="navbuttons flex justify-between items-center mt-4">
                  <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 rounded-md disabled:bg-gray-200"
                  >
                    Prev
                  </button>
                  <span className="px-4">{currentPage}</span>
                  <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-300 rounded-md disabled:bg-gray-200"
                  >
                    Next
                  </button>
                </div>
              </div>
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
                  setisEdit(false);
                  setFormdata({
                    Name: "",
                    Description: "",
                    Members: "",
                    Status: "Ongoing",
                    DueDate: "",
                    Members: "",
                  });
                }}
                src={cut}
                alt=""
              />
            </nav>

            <hr />

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (isEdit) {
                  edittaskhandler();
                } else {
                  submitHandler();
                }
              }}
            >
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
                <p>Github Link</p>
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
                  <span>{isEdit ? "Update" : "Add Task"}</span>
                </button>
                <button
                  onClick={() => {
                    setAddClientPop(false);
                    setisEdit(false);
                    setFormdata({
                      Name: "",
                      Description: "",
                      Members: "",
                      Status: "Ongoing",
                      DueDate: "",
                      Members: "",
                    });
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

      {timerPop && (
        <div className="addCliWrap">
          <div className="addClieCont fitheight">
            <nav>
              <p>Timer Details</p>
              <img
                onClick={() => {
                  setTimerPop(false);
                }}
                src={cut}
              />
            </nav>

            <hr />

            <p>
              Time In:{" "}
              {new Date(timerPop?.timeIn).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: true,
              })}
            </p>

            <p>
              Time Out:{" "}
              {new Date(Number(timerPop?.timeOut)).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: true,
              })}
            </p>

            <p>Total Time: {timerPop?.totalTime} </p>
          </div>
        </div>
      )}
    </>
  );
};
export default ProjectDetails;
