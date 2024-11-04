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
  const { user, createTermination, getTermination, deleteTermination, updateTermination, allEmployee } = useMain();
  const [popup1, setPopup1] = useState(false);
  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const { role } = hrms_user;
  const [employee, setEmployee] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [data, setData] = useState([]);

  const [formdata, setFormdata] = useState({
    Employee: "",
    type: "",
    noticeDate: "",
    terminationDate: "",
    description: "",
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
    const ans = await getTermination();
    setData(ans?.data);
  }

  useEffect(() => {
    if (onEdit) {
      setFormdata({
        id: editData._id,
        Employee: editData.Employee,
        type: editData.type,
        noticeDate: editData.noticeDate,
        terminationDate: editData.terminationDate,
        description: editData.description
      })
    }
  }, [editData])

  const submitHandler = async () => {
    try {
      if (onEdit) {
        await updateTermination({ ...formdata });
        toast.success("update successfully");
        setRefreshFlag(!refreshFlag);
      }
      else {
        await createTermination({ ...formdata });
        toast.success("Successfuly Created");
        setRefreshFlag(!refreshFlag);
      }
      setPopup1(false);
    } catch (error) {
      console.log(error);
    }
  }

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
            await deleteTermination(id);
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
                    <h2 className="hrmShed">Manage Termination</h2>

                    <div className="hrmDoHe">
                      <p>Dashboard</p>
                      <img src={chevron} alt="" />
                      <span>Termination</span>
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
                            EMPLOYEE NAME
                          </th>
                          <th scope="col" class="px-6 py-3">
                            TERMINATION TYPE
                          </th>
                          <th scope="col" class="px-6 py-3">
                            NOTICE DATE
                          </th>
                          <th scope="col" class="px-6 py-3">
                            TERMINATION DATE
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
                                  {item?.Employee}
                                </td>
                                <td class="px-6 py-4">
                                  {item?.type}
                                </td>
                                <td class="px-6 py-4">
                                  {item?.noticeDate}
                                </td>
                                <td class="px-6 py-4">
                                  {item?.terminationDate}
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
                                    <i onClick={()=>{
                                      deleteProject(item?._id)
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
              <h2>Create New Termination</h2>
              <label onClick={() => {
                setPopup1(false);
                setOnEdit(false);
                setEditData({});
                setFormdata({
                  Employee: "",
                  type: "",
                  noticeDate: "",
                  terminationDate: "",
                  description: "",
                })
              }} className="cross-icon"></label>

              <hr />
              <form onSubmit={() => {
                submitHandler();
                setPopup1(false);
              }}>
                {/* <div className="award-popup-label"> */}
                <div className="award-popup-label">
                  <label htmlFor="Employee">
                    <p>Employee</p>
                    <select name="Employee" id="Employee" value={formdata?.Employee} onChange={changeHandler}>
                      <option>Select Employee</option>
                      {
                        employee?.map((val, index) => {
                          return <option key={index} value={val.fullName}>{val.fullName}</option>
                        })
                      }
                    </select>
                  </label>
                  <label htmlFor="type">
                    <p>Termination Type</p>
                    <select name="type" id="type" value={formdata?.type} onChange={changeHandler}>
                      <option>Voluntary</option>
                      <option>Involuntary</option>
                    </select>
                  </label>
                </div>
                <div className="award-popup-label">
                  <label htmlFor="noticeDate">
                    <p>Notice Date</p>
                    <input
                      type="date"
                      name="noticeDate"
                      id="noticeDate"
                      value={formdata?.noticeDate}
                      placeholder=""
                      onChange={changeHandler}
                    />
                  </label>
                  <label htmlFor="terminationDate">
                    <p>Termination Date</p>
                    <input
                      type="date"
                      name="terminationDate"
                      id="terminationDate"
                      value={formdata?.terminationDate}
                      onChange={changeHandler}
                    />
                  </label>
                </div>
                <div className="award-popup-label award-popup-textarea">
                  <label htmlFor="description">
                    <p>Description</p>
                    <textarea onChange={changeHandler} value={formdata?.description} id="description" name="description" rows="8" cols="50" placeholder="Enter Description">

                    </textarea>
                  </label>
                </div>
                {/* <div/> */}

                <hr />

                <div className="btnWrap Award-popup-btn mt-5">
                  <button type="button" className="cencel awd-cancel" onClick={() =>{
                      setPopup1(false);
                      setOnEdit(false);
                      setEditData({});
                      setFormdata({
                        Employee: "",
                        type: "",
                        noticeDate: "",
                        terminationDate: "",
                        description: "",
                      })
                  }}>
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
