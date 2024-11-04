import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import "./HRMsystem.css";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";
import "./quote.css";
import { Avatar } from "react-profile-avatar";
import "react-profile-avatar/dist/index.css";
import threedots from "../../images/thredonts.png";
import { useEffect, useState } from "react";

const MyProjectTask = ({ setAlert, pop, setPop }) => {
  const { user, getAllProjectUserApi, getAllProjectUserTaskApi } = useMain();

  const [allProjects, setAllProject] = useState([]);

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const { role } = hrms_user;

  const fetchuserapi = async () => {
    const ans = await getAllProjectUserApi();
    setAllProject(ans?.projects);
  };

  const [allTasks, setAllTasks] = useState([]);

  const fetchTask = async () => {
    const ans = await getAllProjectUserTaskApi();

    setAllTasks(ans?.data);
  };

  useEffect(() => {
    fetchuserapi();
    fetchTask();
  }, []);

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
                <h2> My Tasks</h2>
              </nav>

              <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        Subject
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Members
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
                    {allTasks?.map((task, index) => (
                      <tr
                        key={index}
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <td class="px-6 py-4">{task.Title}</td>
                        <td class="px-6 py-4">{task?.Members?.fullName}</td>
                        <td class="px-6 py-4">{task?.StartDate}</td>
                        <td class="px-6 py-4">{task?.DueDate}</td>
                        <td class="px-6 py-4">{task?.Project?.Name}</td>
                        <td class="px-6 py-4">{task?.Priority}</td>
                        <td class="px-6 py-4">{task?.Github}</td>
                        <td class="px-6 py-4">{task?.Description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MyProjectTask;
