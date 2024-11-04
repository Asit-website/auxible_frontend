import React, { useState, useEffect } from "react";
import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import chevron from "../../images/chevron_right.png";
import { useMain } from "../../../hooks/useMain";

import "./award.css";
import "./resignation.css";

import plusIcon from "../../images/plusIcon.png";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import toast from "react-hot-toast";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";



const HolidayHRM = ({ setAlert, pop, setPop }) => {
  const { user, createHoliday,getHoliday,deleteHolidays,updateHolidays } = useMain();
  const [popup1, setPopup1] = useState(false);

  const [refreshFlag, setRefreshFlag] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [data, setData] = useState([]);

  console.log("data ",data);

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const { role } = hrms_user;

  const [formdata, setFormdata] = useState({
    holidayName: "",
    startDate: "",
    endDate:""
  })


  const changeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormdata((prev) => ({
      ...prev,
      [name]: value
    }))

  }

  const getData = async () => {
    const ans = await getHoliday();
    setData(ans?.data);
  }

  useEffect(() => {
    if (onEdit) {
      setFormdata({
        id: editData._id,
        holidayName: editData.holidayName,
        startDate: editData.startDate,
        endDate: editData.endDate,
      })
    }
  }, [editData])

  const submitHandler = async () => {
    try {
      if (onEdit) {
        await updateHolidays({ ...formdata });
        toast.success("update successfully");
        setRefreshFlag(!refreshFlag);
      }
      else {
        await createHoliday({ ...formdata });
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
            await deleteHolidays(id);
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
                    <h2 className="hrmShed">Manage Holiday</h2>

                    <div className="hrmDoHe">
                      <p>Dashboard</p>
                      <img src={chevron} alt="" />
                      <span>Holiday</span>
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
                            OCCASION
                          </th>
                          <th scope="col" class="px-6 py-3">
                            START DATE
                          </th>
                          <th scope="col" class="px-6 py-3">
                            END DATE
                          </th>
                         
                          <th scope="col" class="px-6 py-3">
                            ACTION
                          </th>
                        </tr>
                      </thead>

                      <tbody>

                        {
                          data?.length > 0 ?
                            data?.map((item, index) => (
                              <tr key={index} class="bg-white">
                                <td class="px-6 py-4">
                                  {item?.holidayName}
                                </td>
                                <td class="px-6 py-4">
                                  {item?.startDate}
                                </td>
                                <td class="px-6 py-4">
                                  {item?.endDate}
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
            <div className="popup1 awardpopup popingson">
              <h2>Create New Holiday</h2>
              <label onClick={() => {
                setPopup1(false);
                setOnEdit(false);
                setEditData({});
                setFormdata({
                 holidayName:"",
                 startDate:"",
                 endDate:""
                })
              }} className="cross-icon"></label>

              <hr />

              {/* <div className="award-popup-label"> */}
              <form onSubmit={() => {
                submitHandler();
                setPopup1(false);
              }}>
                <div className="award-popup-label">
                  <label htmlFor="holidayName" className="Resig-employ">
                    <p>Occasion</p>
                    <input id="holidayName" type="text" name="holidayName" value={formdata?.holidayName} onChange={changeHandler} />
                  </label>
                </div>
                <div className="award-popup-label">
                  <label htmlFor="startDate">
                    <p>Start Date</p>
                    <input
                      type="date"
                      name="startDate"
                      value={formdata?.startDate}
                      onChange={changeHandler}
                      id="startDate"
                    />
                  </label>
                  <label htmlFor="endDate">
                    <p>End Date</p>
                    <input
                      type="date"
                      name="endDate"
                      value={formdata?.endDate}
                      id="endDate"
                      onChange={changeHandler}
                    />
                  </label>
                </div>
               

                <hr />

                <div className="btnWrap Award-popup-btn mt-5">
                  <button onClick={() => {
                    setPopup1(false);
                    setOnEdit(false);
                    setEditData({});
                    setFormdata({
                     holidayName:"",
                     startDate:"",
                     endDate:""
                    })
                  }} className="cencel awd-cancel">
                    <span>Cancel</span>
                  </button>

                  <button className="create awd-create">
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

export default HolidayHRM;
