import React, { useEffect, useState } from "react";
import hrLok from "../../images/hrLok.png";
import hrLok1 from "../../images/hrLok1.png";
import cg from '../../images/cg.png';
import celes from '../../images/celes.png';
import green from '../../images/green.png';
import bottomArrow from '../../images/bottomArrow.png';
import { NavLink, useNavigate } from "react-router-dom";
import edit1 from "../../images/edit1.png";
import delete1 from "../../images/delete1.png";
import { useMain } from "../../../hooks/useMain";
import AdminNavbar from "../Navbar/AdminNavbar";
import AdminSidebar from "../Sidebar/AdminSidebar";
import person from "../../images/person.png";
import person2 from "../../images/person2.png";

const ProfileManagement = ({ setAlert, pop, setPop }) => {
  const navigate = useNavigate();
  const { getUsers, user } = useMain();
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const ans = await getUsers();
    // console.log(ans);
    setData(ans.data);
  };

  const toggleMenu = (index) => {
    document.querySelectorAll(".menus")[index].classList.toggle('hidden');
  };

  return (
    <>
      <div className="employee-dash h-full">
        <AdminSidebar pop={pop} setPop={setPop} />

        <div className="tm">
          <AdminNavbar user={user} setAlert={setAlert} />

          <div className="em">
            <div className="flex-col">
              <div className="hr-bash">

                <div className="main-card flex items-center  justify-between">
                  <div className="main-box main-boxes">
                    <NavLink to="/adminDash/EmployeeMan">
                      <div className="main-box1">
                        <div className="loj">
                          <img src={person} alt="loj" />
                        </div>
                      </div>
                    </NavLink>
                    <NavLink to="/adminDash/EmployeeMan">
                      <div className="main-box2">
                        <h3>Employee Registration</h3>
                      </div>
                    </NavLink>
                  </div>

                  <NavLink to="/adminDash/profile-management" className="main-box main-boxes">
                    <div className="main-box1">
                      <div className="loj">
                        <img src={person} alt="loj" />
                      </div>
                    </div>
                    <div className="main-box2">
                      <h3>Profile Management</h3>
                    </div>
                  </NavLink>

                  <div className="main-box main-boxes">
                    <div className="main-box1">
                      <div className="loj">
                        <img src={person2} alt="loj" />
                      </div>
                    </div>
                    <div className="main-box2">
                      <h3>Roles Management</h3>
                    </div>
                  </div>
                </div>

                <div className="relative overflow-x-auto overhidding">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="bg-[#F1F6FF] theads">
                      <tr>
                        <th scope="col" className="px-6 py-3 sitar">
                          <h4>S.No</h4>
                        </th>
                        <th scope="col" className="px-6 py-3 sitar">
                          <h4>Employee Name</h4>
                        </th>
                        <th scope="col" className="px-6 py-3 sitar">
                          <h4>Designation</h4>
                        </th>
                        <th scope="col" className="px-6 py-3 sitar">
                          <h4>Reporting manager</h4>
                        </th>
                        <th scope="col" className="px-6 py-3 sitar">
                          <h4>Registration Date</h4>
                        </th>
                        <th scope="col" className="px-6 py-3 sitar">
                          <h4>Employee Code</h4>
                        </th>
                        <th scope="col" className="px-6 py-3 sitar1">
                          <h4>Employee Status</h4>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((e, index) => {
                        return (
                          <tr key={index} className="bg-[#F1F6FF] tr-head  ">
                            <td scope="row" className="px-6 py-4">
                              <p className="sno">{('0' + (index + 1)).slice(-2)}</p>
                            </td>
                            <td className="px-6 py-4">
                              <div className=" flex items-center timer">
                                <img width={28} height={28} src={cg} alt="cg" />
                                <p className="ml-2">{e.fullName}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4 timer">
                              <p>{e.designation}</p>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center timer">
                                <img width={28} height={28} src={cg} alt="cg" />
                                <p className="ml-2">{e.reportingManager}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="reg-date flex items-center">
                                <img src={celes} alt="celes" />
                                <div className="ml-2">
                                  <h4>{e.joiningDate}</h4>
                                  {/* <p>10 : 45 AM</p> */}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 timer">
                              <p>KDS{e?.employeeCode}</p>
                            </td>
                            <td className="px-6 py-4 relative cursor-pointer">
                              <div className="flex items-center status relative"
                                onClick={() => toggleMenu(index)}
                              >
                                <img src={green} alt="green" />
                                <p>{e.status === "OFFLINE" ? "Inactive" : "Active"}</p>
                                <img src={bottomArrow} alt="green" />
                              </div>
                              <div className="action menus hidden menu-0">
                                <div onClick={() => {
                                  navigate(`/adminDash/EmployeeMan/${e._id}`);
                                }} className="edit cursor-pointer flex items-center justify-center">
                                  <img width={13} height={11} src={edit1} alt="" />
                                  <p className="ml-2">Edit</p>
                                </div>
                                <div className="delete cursor-pointer flex items-center justify-center">
                                  <img
                                    width={11}
                                    height={11}
                                    src={delete1}
                                    alt=""
                                  />
                                  <p className="ml-2">Delete</p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileManagement;
