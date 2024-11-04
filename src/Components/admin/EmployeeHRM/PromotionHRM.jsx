import React, { useState, useEffect } from "react";
import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import chevron from "../../images/chevron_right.png";
import { useMain } from "../../../hooks/useMain";

import "./award.css";

import plusIcon from "../../images/plusIcon.png";
import toast from "react-hot-toast";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";



const HRMsystemSetup = ({ setAlert, pop, setPop }) => {
  const { user, createPromotion, allEmployee, getDesignations,getPromotion,deletePromotion,updatePromotion} = useMain();

  const [popup1, setPopup1] = useState(false);

  const [employee, setEmployee] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [data, setData] = useState([]);
  const [designation, setDesignation] = useState([]);

  const [formdata, setFormdata] = useState({
    Employee: "", Designation: "", title: "", promotionDate: "", description: ""
  })

  const fetchEmployee = async () => {
    const ans = await allEmployee();
    setEmployee(ans?.emp);
  }

  const getData = async () => {
    const ans = await getPromotion();
    setData(ans?.data);
  }

  const designationCollect = async () => {
    const ans3 = await getDesignations();
    setDesignation(ans3?.data);

  }

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const { role } = hrms_user;

  const changeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormdata((prev) => ({
      ...prev,
      [name]: value
    }))

  }

  useEffect(() => {
    fetchEmployee();
    designationCollect();
    getData();
  }, [refreshFlag]);

  useEffect(() => {
    if (onEdit) {
      setFormdata({
        id: editData._id,
        Employee: editData.Employee,
        Designation: editData.Designation,
        title: editData.title,
        promotionDate: editData.promotionDate,
        description: editData.description
      })
    }
  }, [editData])

  const submitHandler = async (e) => {
    try {
      if (onEdit) {
        await updatePromotion({ ...formdata });
        toast.success("update successfully");
        setRefreshFlag(!refreshFlag);
      }
      else {
        await createPromotion({ ...formdata });
        toast.success("Successfuly Created");
        setRefreshFlag(!refreshFlag);
      }
      setPopup1(false);
    } catch (error) {
      console.log(error);
    }
  }

 


  // const getData = async () => {
  //   const ans = await getComplain();
  //   setData(ans?.data);
  // }

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
                    <h2 className="hrmShed">Manage Promotion</h2>

                    <div className="hrmDoHe">
                      <p>Dashboard</p>
                      <img src={chevron} alt="" />
                      <span>Promotion</span>
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
                            EMPLOYEE NAME
                          </th>
                          <th scope="col" class="px-6 py-3">
                            DESIGNATION
                          </th>
                          <th scope="col" class="px-6 py-3">
                            PROMOTION TITLE
                          </th>
                          <th scope="col" class="px-6 py-3">
                            PROMOTION DATE
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
                                  {item?.Employee}
                                </td>
                                <td class="px-6 py-4">
                                  {item?.Designation}
                                </td>
                                <td class="px-6 py-4">
                                  {item?.title}
                                </td>
                                <td class="px-6 py-4">
                                  {item?.promotionDate}
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
                                      deletePromotion(item._id);
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
              <h2>Create New Promotion</h2>
              <label className="cross-icon"></label>

              <hr />

              {/* <div className="award-popup-label"> */}
              <form onSubmit={()=>{
                submitHandler();
                setPopup1(false);
              }}>
                <div className="award-popup-label">
                  <label htmlFor="Employee">
                    <p>Employee</p>
                    <select name="Employee" value={formdata?.Employee} id="Employee" onChange={changeHandler}>
                      {
                        employee?.map((val, index) => {
                          return <option key={index} value={val?.fullName}>{val?.fullName}</option>
                        })
                      }
                    </select>
                  </label>
                  <label htmlFor="Designation">
                    <p>Designation</p>
                    <select onChange={changeHandler} name="Designation" id="Designation" value={formdata?.Designation}>
                      {
                        designation?.map((val, index) => {
                          return <option key={index} value={val?.name}>{val?.name}</option>
                        })
                      }

                    </select>
                  </label>
                </div>
                <div className="award-popup-label">
                  <label htmlFor="title">
                    <p>Promotion Title</p>
                    <input
                      type="text"
                      name="title"
                      value={formdata?.title}
                      id="title"
                      onChange={changeHandler}
                      placeholder=""
                    />
                  </label>
                  <label htmlFor="promotionDate">
                    <p>Promotion Date</p>
                    <input
                      type="date"
                      name="promotionDate"
                      value={formdata?.promotionDate}
                      onChange={changeHandler}
                      id="promotionDate"
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
                  <button type="button" className="cencel awd-cancel" onClick={() => setPopup1(false)}>
                    <span>Cancel</span>
                  </button>

                  <button type="submit" className="create awd-create">
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
