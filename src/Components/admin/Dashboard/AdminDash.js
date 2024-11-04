import React, { useState, useEffect } from "react";
import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import plus1 from "../../images/plus1.png";
import loj from "../../images/loj.png";
import person from "../../images/person.png";
import person1 from "../../images/person1.png";
import person2 from "../../images/person2.png";
import { NavLink } from "react-router-dom";
const AdminDash = ({ setAlert, pop, setPop }) => {
  const { user } = useMain();

  return (
    <>
      <div className="employee-dash h-full">
        <AdminSidebar pop={pop} setPop={setPop} />

        <div className="tm">
          <AdminNavbar user={user} setAlert={setAlert} />

          <div className="em">
            <div className="flex-col">
              <div className="admin-main">
                <div className="admin1">
                  <img
                    onClick={() => setPop(true)}
                    className="plus1"
                    src={plus1}
                    alt="plus1"
                  />
                </div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDash;
