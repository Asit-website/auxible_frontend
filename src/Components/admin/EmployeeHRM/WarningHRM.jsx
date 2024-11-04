import React, { useState, useEffect } from "react";
import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import chevron from "../../images/chevron_right.png";
import { useMain } from "../../../hooks/useMain";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import "./award.css";

import plusIcon from "../../images/plusIcon.png";
import toast from "react-hot-toast";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";



const HRMsystemSetup = ({ setAlert, pop, setPop }) => {
  const { user, createWarning, getWarning, deleteWarning, updateWarning, allEmployee } = useMain();

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const { role } = hrms_user;

  const [popup1, setPopup1] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [data, setData] = useState([]);

  const [formdata, setFormdata] = useState({
    warningBy: "",
    warningTo: "",
    subject: "",
    warningDate: "",
    description: ""
  })

  const fetchEmployee = async () => {
    const ans = await allEmployee();
    setEmployee(ans?.emp);

  }

  const changeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormdata((prev) => ({
      ...prev,
      [name]: value
    }))

  }

  const getData = async () => {
    const ans = await getWarning();
    setData(ans?.data);
  }


  const submitHandler = async (e) => {
    try {
      if (onEdit) {
        e.preventDefault();
        await updateWarning({ ...formdata });
        toast.success("update successfully");
        setRefreshFlag(!refreshFlag);
      }
      else {
        e.preventDefault();
        await createWarning({ ...formdata });
        toast.success("Successfuly Created");
        setRefreshFlag(!refreshFlag);
      }
      setPopup1(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (onEdit) {
      setFormdata({
        id: editData._id,
        warningBy: editData.warningBy,
        warningTo: editData.warningTo,
        subject: editData.subject,
        warningDate: editData.warningDate,
        description: editData.description
      })
    }
  }, [editData])

  const deleteProject = async (id) => {

    confirmAlert({
      title: 'Are you sure to delete this data?',
      message: 'All related data to this will be deleted',
      buttons: [
        {
          label: 'Yes, Go Ahead!',
          style: {
            background: "#FF5449"
          },
          onClick: async () => {
            await deleteWarning(id);
            toast.success("delete Successfully");
            setRefreshFlag(!refreshFlag);
            getData();
          }
        },
        {
          label: 'Cancel',

          onClick: () => null
        }
      ]
    });

  };


  useEffect(() => {
    fetchEmployee();
    getData();
  }, [refreshFlag])


  return (
    <>
      <div className="employee-dash h-full">
        {/* <AdminSidebar pop={pop} setPop={setPop} /> */}
        {role === "EMPLOYEE" ? (
          <EmployeeSidebar pop={pop} setPop={setPop} />
        ) : (
          <AdminSidebar pop={pop} setPop={setPop} />
        )}

        <div className="tm awardtm">
          {/* <AdminNavbar user={user} setAlert={setAlert} /> */}
          {role === "EMPLOYEE" ? (
            <EmployeeNavbar user={user} setAlert={setAlert} />
          ) : (
            <AdminNavbar user={user} setAlert={setAlert} />
          )}

          <div className="em">
            <div className="flex-col">
              <div className="admin-main adminmain">
                <div className="plusSection">
                  <div className="adminFirt">
                    <h2 className="hrmShed">Manage Warning</h2>

                    <div className="hrmDoHe">
                      <p>Dashboard</p>
                      <img src={chevron} alt="" />
                      <span>Warning</span>
                    </div>
                  </div>


                  <img
                    onClick={() => {
                      setPopup1(true)
                    }}
                    className="plusiCON"
                    src={plusIcon}
                    alt=""
                  />
                </div>

                <div>
                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead class="text-xs text-black uppercase  dark:text-black">
                        <tr>
                          <th scope="col" class="px-6 py-3">
                            WARNING BY
                          </th>
                          <th scope="col" class="px-6 py-3">
                            WARNING TO
                          </th>
                          <th scope="col" class="px-6 py-3">
                            SUBJECT
                          </th>
                          <th scope="col" class="px-6 py-3">
                            WARNING DATE
                          </th>
                          <th scope="col" class="px-6 py-3">
                            DESCRIPTION
                          </th>
                          <th scope="col" class="px-6 py-3">
                            ACTION
                          </th>
                        </tr>
                      </thead>

                      <tbody>

                        {
                          data.length > 0 ?
                            data.map((item, index) => (
                              <tr key={index} class="bg-white">

                                <td class="px-6 py-4">
                                  {item?.warningBy}
                                </td>
                                <td class="px-6 py-4">
                                  {item?.warningTo}
                                </td>
                                <td class="px-6 py-4">
                                  {item?.subject}
                                </td>
                                <td class="px-6 py-4">
                                  {item?.warningDate}
                                </td>

                                <td class="px-6 py-4">
                                  {item?.description}
                                </td>
                                <td class="px-6 py-4">
                                  <div className='flex items-center sk'>
                                    <i onClick={() => {
                                      setOnEdit(true);
                                      setEditData(item);
                                      setPopup1(true)
                                    }} className="fa-solid fa-pen-to-square"></i>
                                    <i onClick={() => {
                                      deleteProject(item?._id);
                                    }} className="fa-solid fa-trash"></i>
                                  </div>
                                </td>


                              </tr>
                            ))
                            :
                            <div className='noEntries'>

                              <span >No entries found</span>
                            </div>

                        }





                      </tbody>
                    </table>
                  </div>

                </div>


                <>
                  {/* Main modal */}

                </>

              </div>
            </div>
          </div>
        </div>

        {popup1 && (
          <div className="allPopupWrap">
            <div className="popup1 awardpopup">
              <h2>Create New Warning</h2>
              <label onClick={() => {
                setPopup1(false);
                setOnEdit(false);
                setEditData({});
                setFormdata({
                  warningBy: "",
                  warningTo: "",
                  subject: "",
                  warningDate: "",
                  description: ""
                })
              }} className="cross-icon"></label>

              <hr />

              {/* <div className="award-popup-label"> */}
              <form onSubmit={submitHandler}>
                <div className="award-popup-label">
                  <label htmlFor="">
                    <p>Warning By</p>
                    <select name="warningBy" value={formdata.warningBy} id="warningBy" onChange={changeHandler} >
                      {
                        employee?.map((val, index) => {
                          return <option key={index} value={val?.fullName}>{val?.fullName}</option>
                        })
                      }
                    </select>
                  </label>
                  <label htmlFor="">
                    <p>Warning To</p>
                    <select name="warningTo" value={formdata.warningTo} id="warningTo" onChange={changeHandler} >
                      {
                        employee?.map((val, index) => {
                          return <option value={val?.fullName}>{val?.fullName}</option>
                        })
                      }
                    </select>
                  </label>
                </div>
                <div className="award-popup-label">
                  <label htmlFor="warningTo">
                    <p>Subject</p>
                    <input
                      type="text"
                      name="subject"
                      value={formdata?.subject}
                      onChange={changeHandler}
                      id="warningTo"
                      // onChange={(e) => {
                      //   setBranch(e.target.value);
                      // }}
                      // value={branch}
                      placeholder=""
                    />
                  </label>
                  <label htmlFor="warningDate">
                    <p>Warning Date</p>
                    <input
                      type="date"
                      name="warningDate"
                      value={formdata?.warningDate}
                      onChange={changeHandler}
                      id="warningDate"
                    />
                  </label>
                </div>
                <div className="award-popup-label award-popup-textarea">
                  <label htmlFor="description">
                    <p>Description</p>
                    <textarea onChange={changeHandler} value={formdata?.description} id="description" name="description" rows="8" cols="50" placeholder="Enter Description"></textarea>
                  </label>
                </div>
                {/* <div/> */}

                <hr />

                <div className="btnWrap Award-popup-btn mt-5">
                  <button onClick={() => {
                    setPopup1(false);
                    setOnEdit(false);
                    setEditData({});
                    setFormdata({
                      warningBy: "",
                      warningTo: "",
                      subject: "",
                      warningDate: "",
                      description: ""
                    })
                  }} type="button" className="cencel awd-cancel" >
                    <span>Cancel</span>
                  </button>

                  <button type="submit" className="create awd-create" >
                    <span>{onEdit ? "Update" : "Create"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default HRMsystemSetup;
