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
        getData();
      }
      else {
        await createPromotion({ ...formdata });
        toast.success("Successfuly Created");
        setRefreshFlag(!refreshFlag);
        getData();
      }
      setPopup1(false);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <div className="employee-dash h-full">
        {role === "EMPLOYEE" ? (
          <EmployeeSidebar pop={pop} setPop={setPop} />
        ) : (
          <AdminSidebar pop={pop} setPop={setPop} />
        )}

        <div className="tm awardtm">
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

                <div className="relative overflow-x-auto w-full">
                  <table className="w-full table1 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                    <thead className="text-xs uppercase textALLtITL ">
                      <tr>

                        <th scope="col" className="px-6 py-3 taskTitl ">
                          EMPLOYEE
                        </th>
                        <th scope="col" className="px-6 py-3 taskTitl ">
                        DESIGNATION
                        </th>
                        <th scope="col" className="px-6 py-3 taskTitl ">
                        PROMOTION TITLE
                        </th>
                        <th scope="col" className="px-6 py-3 taskTitl ">
                        PROMOTION DATE
                        </th>
                        <th scope="col" className="px-6 py-3 taskTitl ">
                        DESCRIPTION
                        </th>
                        <th scope="col" className="px-6 py-3 taskTitl ">
                        ACTION
                        </th>

                      </tr>
                    </thead>

                    <tbody>
                      {data.map((item, index) => (
                        <tr key={index} className="bg-white border-b fdf">

                          <td className="px-6 py-4 taskAns">{item?.Employee}</td>
                          <td className="px-6 py-4 taskAns">
                            {item?.Designation}
                          </td>
                          <td className="px-6 py-4 taskAns">{item?.title}</td>
                          <td className="px-6 py-4 taskAns">{item?.promotionDate}</td>
                          <td className="px-6 py-4 taskAns">{item?.description}</td>

                          <div className="viewOnwWRAP">
                            <td

                              className="px-6 py-4 taskAns cursor-pointer"
                            >
                              <div className="testok">

                                <svg className="cursor-pointer" onClick={() => {
                    setOnEdit(true);
                    setEditData(item);
                    setPopup1(true)
                  }}  width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M9.71569 5.51667L10.4824 6.28333L2.93236 13.8333H2.16569V13.0667L9.71569 5.51667ZM12.7157 0.5C12.5074 0.5 12.2907 0.583333 12.1324 0.741667L10.6074 2.26667L13.7324 5.39167L15.2574 3.86667C15.5824 3.54167 15.5824 3.01667 15.2574 2.69167L13.3074 0.741667C13.1407 0.575 12.9324 0.5 12.7157 0.5ZM9.71569 3.15833L0.499023 12.375V15.5H3.62402L12.8407 6.28333L9.71569 3.15833Z" fill="#383838" />
                                </svg>

                                <svg className="cursor-pointer" onClick={() => {
                    deletePromotion(item?._id)
                  }}
                                  width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M9.33317 5.5V13.8333H2.6665V5.5H9.33317ZM8.08317 0.5H3.9165L3.08317 1.33333H0.166504V3H11.8332V1.33333H8.9165L8.08317 0.5ZM10.9998 3.83333H0.999837V13.8333C0.999837 14.75 1.74984 15.5 2.6665 15.5H9.33317C10.2498 15.5 10.9998 14.75 10.9998 13.8333V3.83333Z" fill="#DE3730" />
                                </svg>

                              </div>
                            </td>



                          </div>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          </div>
        </div>

        {popup1 && (
          <div className="allPopupWrap">
            <div className="awardpopupcont">
              <h2>Create New Promotion</h2>

              <label 
           onClick={() => {
            setPopup1(false);
            setOnEdit(false);
            setEditData({});
           
          }} className="cross-icon"></label>

              <hr />

              <div className="lableawaiwrap">

              <label htmlFor="Employee">
            <p>Employee</p>
            <select name="Employee" value={formdata?.Employee}  onChange={changeHandler}>
              {
                employee?.map((val, index) => {
                  return <option key={index} value={val?.fullName}>{val?.fullName}</option>
                })
              }
            </select>

          </label>

          <label htmlFor="Designation">
            <p>Designation</p>
            <select onChange={changeHandler} name="Designation" value={formdata?.Designation}>
              {
                designation?.map((val, index) => {
                  return <option key={index} value={val?.name}>{val?.name}</option>
                })
              }

            </select>
          </label>
              </div>

              <div className="lableawaiwrap">
              <label htmlFor="title">
            <p>Promotion Title</p>
            <input
              type="text"
              name="title"
              value={formdata?.title}
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
            />
          </label>

              </div>

              <div className="lableawaiwrap">
                   <label htmlFor="description">
            <p>Description</p>
            <textarea onChange={changeHandler} value={formdata?.description}  name="description" rows="8" cols="50" placeholder="Enter Description"></textarea>
          </label>

              </div>

      
              <div className="btnWrap Award-popup-btn">
                <button  onClick={() => {
            setPopup1(false);
            setOnEdit(false);
            setEditData({});
          
          }} className="cencel awd-cancel">
                  <span>Cancel</span>
                </button>

                <button className="create awd-create" onClick={() => {
                  submitHandler();
                  setPopup1(false);
                }}>
                  <span>{onEdit ? "Update" : "Create"}</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default HRMsystemSetup;

