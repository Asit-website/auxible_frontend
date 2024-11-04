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
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";



const Trip = ({ setAlert, pop, setPop }) => {
    const { user, allEmployee, createTrip, getTrip, deleteTrip, updateTrip } = useMain();

    const [popup1, setPopup1] = useState(false);

    const [employee, setEmployee] = useState([]);
    const [refreshFlag, setRefreshFlag] = useState([]);
    const [onEdit, setOnEdit] = useState(false);
    const [editData, setEditData] = useState({});
    const [data, setData] = useState([]);
    const [designation, setDesignation] = useState([]);

    const [formdata, setFormdata] = useState({
        Employee: "", startDate: "", endDate: "", purpose: "", country: "", description: ""
    })

    const fetchEmployee = async () => {
        const ans = await allEmployee();
        setEmployee(ans?.emp);
    }

    const getData = async () => {
        const ans = await getTrip();
        setData(ans?.data);
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
        getData();
    }, [refreshFlag])


    useEffect(() => {
        if (onEdit) {
          setFormdata({
            id: editData._id,
            Employee: editData.Employee,
            startDate: editData.startDate,
            endDate: editData.endDate,
            purpose: editData.purpose,
            country: editData.country,
            description: editData.description
          })
        }
      }, [editData])


    //   ==========assign value from trip to a particular employee or all user=========

    const fetchEmployeeById = async () =>{
        const id = allEmployee?.filter((val,index)=>{
        })
        const ans = await allEmployee();
        setEmployee(ans?.emp);
    }

    const submitHandler = async (e) => {
        try {
            if (onEdit) {
              await updateTrip({ ...formdata });
              toast.success("update successfully");
              setRefreshFlag(!refreshFlag);
            }
            else {
              await createTrip({ ...formdata });
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
                await deleteTrip(id);
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
                                                        START DATE
                                                    </th>
                                                    <th scope="col" class="px-6 py-3">
                                                        END DATE
                                                    </th>
                                                    <th scope="col" class="px-6 py-3">
                                                        PURPOSE OF TRIP
                                                    </th>
                                                    <th scope="col" class="px-6 py-3">
                                                        COUNTRY
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
                                                                    {item?.startDate}
                                                                </td>
                                                                <td class="px-6 py-4">
                                                                    {item?.endDate}
                                                                </td>
                                                                <td class="px-6 py-4">
                                                                    {item?.purpose}
                                                                </td>
                                                                <td class="px-6 py-4">
                                                                    {item?.country}
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
                                                                            deleteProject(item._id)
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
                            <form onSubmit={submitHandler}>
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
                                    <label htmlFor="startDate">
                                        <p>Start Date</p>
                                        <input id="startDate" type="date" value={formdata?.startDate} name="startDate" onChange={changeHandler} />
                                    </label>
                                </div>
                                <div className="award-popup-label">
                                    <label htmlFor="title">
                                        <p>End Date</p>
                                        <input
                                            type="date"
                                            name="endDate"
                                            value={formdata?.endDate}
                                            id="endDate"
                                            onChange={changeHandler}
                                            placeholder=""
                                        />
                                    </label>
                                    <label htmlFor="purpose">
                                        <p>Purpose of trip</p>
                                        <input
                                            type="text"
                                            name="purpose"
                                            value={formdata?.purpose}
                                            onChange={changeHandler}
                                            id="purpose"
                                        />
                                    </label>
                                </div>
                                <div className="award-popup-label">
                                    <label htmlFor="country">
                                        <p>Country</p>
                                        <input
                                            type="text"
                                            name="country"
                                            value={formdata?.country}
                                            onChange={changeHandler}
                                            id="country"
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

export default Trip;
