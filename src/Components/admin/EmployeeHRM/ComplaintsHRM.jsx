import React, { useState, useEffect } from "react";
import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import chevron from "../../images/chevron_right.png";
import { useMain } from "../../../hooks/useMain";

import "./award.css";

import plusIcon from "../../images/plusIcon.png";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import toast from "react-hot-toast";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";



const HRMsystemSetup = ({ setAlert, pop, setPop }) => {
  const { user, createComplain, getComplain, updateComplain, deleteComplain, allEmployee } = useMain();
  const [popup1, setPopup1] = useState(false);

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const { role } = hrms_user;

  const [employee, setEmployee] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [data, setData] = useState([]);


  const [formdata, setFormdata] = useState({
    complainFrom: "",
    complainAgain: "",
    title: "",
    complainDate: "",
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
    const ans = await getComplain();
    setData(ans?.data);
  }

  useEffect(() => {
    if (onEdit) {
      setFormdata({
        id: editData._id,
        complainFrom: editData.complainFrom,
        complainAgain: editData.complainAgain,
        title: editData.title,
        complainDate: editData.complainDate,
        description: editData.description
      })
    }
  }, [editData])

  const submitHandler = async () => {
    try {
      if (onEdit) {
        await updateComplain({ ...formdata });
        toast.success("update successfully");
        setRefreshFlag(!refreshFlag);
      }
      else {
        await createComplain({ ...formdata });
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
            await deleteComplain(id);
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
        {/* <AdminSidebar pop={pop} setPop={setPop} /> */}/
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
                    <h2 className="hrmShed">Manage Complain</h2>

                    <div className="hrmDoHe">
                      <p>Dashboard</p>
                      <img src={chevron} alt="" />
                      <span>Complain</span>
                    </div>
                  </div>


                  <img
                    onClick={() => {
                      setPopup1(true);
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
                            COMPLAIN FROM
                          </th>
                          <th scope="col" class="px-6 py-3">
                            COMPLAIN TO
                          </th>
                          <th scope="col" class="px-6 py-3">
                            TITLE
                          </th>
                          <th scope="col" class="px-6 py-3">
                            COMPLAIN DATE
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
                            data?.map((item, index) => (
                              <tr key={index} class="bg-white">

                                <td class="px-6 py-4">
                                  {item?.complainFrom}
                                </td>
                                <td class="px-6 py-4">
                                  {item?.complainAgain}
                                </td>
                                <td class="px-6 py-4">
                                  {item?.title}
                                </td>
                                <td class="px-6 py-4">
                                  {item?.complainDate}
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
              <h2>Create New Complaint</h2>
              <label onClick={() => {
                setPopup1(false);
                setOnEdit(false);
                setEditData({});
                setFormdata({
                  complainFrom: "",
                  complainAgain: "",
                  title: "",
                  complainDate: "",
                  description: ""
                })
              }} className="cross-icon"></label>

              <hr />

              {/* <div className="award-popup-label"> */}
              <form onSubmit={() => {
                submitHandler();
                setPopup1(false);
              }}>
                <div className="award-popup-label">
                  <label htmlFor="complainFrom">
                    <p>Complaint Form</p>
                    <select onChange={changeHandler} value={formdata?.complainFrom} name="complainFrom" id="complainFrom">
                      {
                        employee?.map((val, index) => {
                          return <option key={index} value={val?.fullName}>{val?.fullName}</option>
                        })
                      }
                    </select>
                  </label>
                  <label htmlFor="complainAgain">
                    <p>Complaint Against</p>
                    <select onChange={changeHandler} name="complainAgain" value={formdata?.complainAgain} id="complainAgain">
                      {
                        employee?.map((val, index) => {
                          return <option key={index} value={val?.fullName}>{val?.fullName}</option>
                        })
                      }
                    </select>
                  </label>
                </div>
                <div className="award-popup-label">
                  <label htmlFor="title">
                    <p>Title</p>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      onChange={changeHandler}
                      value={formdata?.title}
                      placeholder=""
                    />
                  </label>
                  <label htmlFor="complainDate">
                    <p>Complaint Date</p>
                    <input
                      type="date"
                      value={formdata?.complainDate}
                      name="complainDate"
                      id="complainDate"
                      onChange={changeHandler}
                    // placeholder="dd-mm-yyyy"
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
                  <button type="button" className="cencel awd-cancel" onClick={() => {
                    setPopup1(false);
                    setOnEdit(false);
                    setEditData({});
                    setFormdata({
                      complainFrom: "",
                      complainAgain: "",
                      title: "",
                      complainDate: "",
                      description: ""
                    })
                  }}>
                    <span>Cancel</span>
                  </button>

                  <button type="submit" className="create awd-create">
                    <span>Create</span>
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
