import React, { useState, useEffect } from "react";
import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import chevron from "../../images/chevron_right.png";
import { useMain } from "../../../hooks/useMain";

import "./award.css";
import ReactStars from "react-rating-stars-component";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import plusIcon from "../../images/plusIcon.png";
import toast from "react-hot-toast";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";

const sidebarItem = [
  {
    title: "Branch",
    tableData: [
      {
        title: "TYPE",
      },
      {
        title: "ACTION",
      },
    ],
  },
  {
    title: "Department",
    tableData: [
      {
        title: "BRANCH",
      },
      {
        title: "DEPARTMENT",
      },
      {
        title: "ACTION",
      },
    ],
  },
  {
    title: "Designation",
    tableData: [
      {
        title: "DEPARTMENT",
      },
      {
        title: "DESIGNATION",
      },
      {
        title: "ACTION",
      },
    ],
  },
  {
    title: "Leave Type",
    tableData: [
      {
        title: "Leave Type",
      },
      {
        title: "Days/Year",
      },
      {
        title: "ACTION",
      },
    ],
  },
];

const HRMsystemSetup = ({ setAlert, pop, setPop }) => {

  const { user, getBranchs, postBranch, updateBranch, deleteBranch, getDepartments, postDepartment, updateDepartment, deleteDepartment, getDesignations, postDesignation, updateDesignation, deleteDesignation, postLeaveType, updateLeaveType, getLeaveTypes, deleteLeaveType, postAward, getAward, allEmployee, deleteAward, updateAward } = useMain();

  const [value, onChange] = useState(new Date());
  const [gen, setGen] = useState([]);
  const [flag, setFlag] = useState();

  const [open, setOpen] = useState(0);

  const [popup, setPopup] = useState(false);

  const [onEdit, setOnEdit] = useState(false);
  const [editData, setEditData] = useState({});

  const styleing = {
    display: popup ? "block" : "none",
  };


  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const { role } = hrms_user;


  const [popup1, setPopup1] = useState(false);
  const [popup11, setPopup11] = useState(false);
  const [popup2, setPopup2] = useState(false);
  const [popup21, setPopup21] = useState(false);
  const [popup3, setPopup3] = useState(false);
  const [popup31, setPopup31] = useState(false);
  const [popup4, setPopup4] = useState(false);
  const [popup41, setPopup41] = useState(false);

  const [id, setId] = useState('');
  const [branches, setBranches] = useState([]);
  const [branches1, setBranches1] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [departments1, setDepartments1] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [designations1, setDesignations1] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [leaveTypes1, setLeaveTypes1] = useState([]);
  const [branch, setBranch] = useState("");
  const [branch1, setBranch1] = useState("");
  const [departmentValue, setDepartmentValue] = useState({
    branch: "",
    name: "",
  });
  const [leaveTypeValue, setLeaveTypeValue] = useState({
    name: "",
    days: ""
  });
  const [designationValue, setDesignationValue] = useState({
    department: "",
    name: "",
  });
  const [departmentValue1, setDepartmentValue1] = useState({
    branch: "",
    name: "",
  });
  const [designationValue1, setDesignationValue1] = useState({
    department: "",
    name: "",
  });
  const [leaveTypeValue1, setLeaveTypeValue1] = useState({
    name: "",
    days: ""
  });
  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    getData();
  }, [refreshFlag]);

  const getData = async () => {
    const ans1 = await getBranchs();
    const ans2 = await getDepartments();
    const ans3 = await getDesignations();
    const ans4 = await getLeaveTypes();
    setBranches(ans1.data);
    setBranches1(ans1.data);
    setDepartments(ans2.data);
    setDepartments1(ans2.data);
    setDesignations(ans3.data);
    setDesignations1(ans3.data);
    setLeaveTypes(ans4.data);
    setLeaveTypes1(ans4.data);
  };

  const handleCreateBranch = async () => {
    const ans = await postBranch({ name: branch });
    if (ans.success) {
      toast.success(ans.message);
      setBranch("");
      setRefreshFlag(!refreshFlag);
      setPopup1(false);
    } else {
      toast.error("something went wrong");
    }
  };

  const handleUpdateBranch = async () => {
    const ans = await updateBranch({ name: branch1, id });
    if (ans.success) {
      toast.success(ans.message);
      setBranch1("");
      setRefreshFlag(!refreshFlag);
      setPopup11(false);
    } else {
      toast.error("something went wrong");
    }
  };

  const handleCreateDepartment = async () => {
    const ans = await postDepartment({
      name: departmentValue.name,
      branch: branches.find(x => x._id === departmentValue.branch),
    });
    if (ans.success) {
      setDepartmentValue({
        name: '',
        branch: ''
      });
      toast.success(ans.message);
      setRefreshFlag(!refreshFlag);
      setPopup2(false);
    } else {
      toast.error("something went wrong");
    }
  };

  const handleCreateDesignation = async () => {
    const ans = await postDesignation({
      name: designationValue.name,
      department: departments.find(x => x._id === designationValue.department)
    });
    if (ans.success) {
      toast.success(ans.message);
      setDesignationValue({
        name: '',
        department: ''
      });
      setRefreshFlag(!refreshFlag);
      setPopup3(false);
    } else {
      toast.error("something went wrong");
    }
  };

  const handleCreateLeaveType = async () => {
    const ans = await postLeaveType({
      days: leaveTypeValue?.days,
      name: leaveTypeValue?.name
    });
    if (ans.success) {
      alert(ans.message);
      setLeaveTypeValue({
        name: '',
        days: ''
      });
      setRefreshFlag(!refreshFlag);
      setPopup4(false);
    } else {
      alert("something went wrong");
    }
  };

  const handleUpdateDepartment = async () => {
    const ans = await updateDepartment({
      id,
      name: departmentValue1?.name,
      branch: branches?.find(x => x?._id === departmentValue1?.branch),
    });
    if (ans.success) {
      setDepartmentValue1({
        name: '',
        branch: ''
      });
      alert(ans.message);
      setRefreshFlag(!refreshFlag);
      setPopup21(false);
    } else {
      alert("something went wrong");
    }
  };

  const handleUpdateDesignation = async () => {
    // console.log(designationValue);
    const ans = await updateDesignation({
      id,
      name: designationValue1?.name,
      department: departments?.find(x => x?._id === designationValue1?.department)
    });
    if (ans.success) {
      alert(ans.message);
      setDesignationValue1({
        name: '',
        department: ''
      });
      setRefreshFlag(!refreshFlag);
      setPopup31(false);
    } else {
      alert("something went wrong");
    }
  };

  const handleUpdateLeaveType = async () => {
    const ans = await updateLeaveType({
      id,
      days: leaveTypeValue1?.days,
      name: leaveTypeValue1?.name
    });
    if (ans.success) {
      alert(ans.message);
      setLeaveTypeValue1({
        name: '',
        days: ''
      });
      setRefreshFlag(!refreshFlag);
      setPopup41(false);
    } else {
      alert("something went wrong");
    }
  };

  const handleDelete = async (id, type) => {
    let ans;
    if (type === 'branch') {
      ans = await deleteBranch(id);
    }
    else if (type === 'department') {
      ans = await deleteDepartment(id);
    }
    else if (type === 'designation') {
      ans = await deleteDesignation(id);
    }
    else if (type === 'leaveType') {
      ans = await deleteLeaveType(id);
    }

    if (ans.success) {
      alert(ans.message);
      setRefreshFlag(!refreshFlag);
    } else {
      alert("something went wrong");
    }
  };

  const [allAward, setAllAward] = useState([]);

  const [formdata, setFormdata] = useState({
    employee: "",
    awardType: "",
    date: "",
    gift: "",
    description: "",
    rating: ""
  })

  const ratingChanged = (newRating) => {
    setFormdata((prev) => ({
      ...prev,
      rating: newRating
    }))
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormdata((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const [allEmp, setAllEmp] = useState([]);


  const fetchAward = async () => {
    const resp = await getAward();
    setAllAward(resp?.data);

  }

  useEffect(() => {
    if (onEdit) {
      setFormdata({
        id: editData._id,
        employee: editData.employee,
        awardType: editData.awardType,
        date: editData.date,
        gift: editData.gift,
        description: editData.description,
        rating: editData.rating
      })
    }
  }, [editData])

  const submitHandler = async () => {
    try {
      if (formdata.employee === 'Select Employee') {
        return toast.error("Please select correct employee");
      }
      if (onEdit) {
        const ans = await updateAward({ ...formdata });
        alert("update successfully");
        setRefreshFlag(!refreshFlag);
      }
      else {
        const ans = await postAward({ ...formdata });
        alert("Successfuly Created");
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
            await deleteAward(id);
            toast.success("delete Successfully");
            setRefreshFlag(!refreshFlag);
          }
        },
        {
          label: 'Cancel',

          onClick: () => null
        }
      ]
    });

  };

  const fetchEmplyee = async () => {
    const ans = await allEmployee();
    if (ans?.status) {
      setAllEmp(ans?.emp);
    }
  }

  useEffect(() => {
    fetchEmplyee();
    fetchAward();
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
                    <h2 className="hrmShed">Manage Award</h2>

                    <div className="hrmDoHe">
                      <p>Dashboard</p>
                      <img src={chevron} alt="" />
                      <span>Award</span>
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

                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            EMPLOYEE
                          </th>
                          <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                              AWARD TYPE
                              <a href="#">
                                <svg
                                  className="w-3 h-3 ms-1.5"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                </svg>
                              </a>
                            </div>
                          </th>
                          <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                              DATE
                              <a href="#">
                                <svg
                                  className="w-3 h-3 ms-1.5"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                </svg>
                              </a>
                            </div>
                          </th>
                          <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                              GIFT
                              <a href="#">
                                <svg
                                  className="w-3 h-3 ms-1.5"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                </svg>
                              </a>
                            </div>
                          </th>
                          <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                              Rating
                              <a href="#">
                                <svg
                                  className="w-3 h-3 ms-1.5"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                </svg>
                              </a>
                            </div>
                          </th>
                          <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                              DESCRIPTION
                              <a href="#">
                                <svg
                                  className="w-3 h-3 ms-1.5"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                </svg>
                              </a>
                            </div>
                          </th>
                          <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                              ACTION
                              <a href="#">
                                <svg
                                  className="w-3 h-3 ms-1.5"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                </svg>
                              </a>
                            </div>
                          </th>
                        </tr>
                      </thead>

                      <tbody>

                        {
                          allAward?.map((item, index) => (
                            <tr key={index} class="bg-white dark:bg-gray-800">
                              <th class="px-6 py-4">
                                {item.employee}
                              </th>
                              <td class="px-6 py-4">
                                {item?.awardType}
                              </td>
                              <td class="px-6 py-4">
                                {/* {new Date(item.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })} */}
                                {item?.date}
                              </td>
                              <td class="px-6 py-4">
                                {item.gift}
                              </td>
                              <td class="px-6 py-4">
                                {item.rating}
                              </td>
                              <td class="px-6 py-4">
                                {item.description}
                              </td>
                              <td class="px-6 py-4">
                                <div className='flex items-center sk'>
                                  <i onClick={() => {
                                    setOnEdit(true);
                                    setEditData(item);
                                    setPopup1(true)
                                  }} className="fa-solid fa-pen-to-square"></i>
                                  <i onClick={(e) => {
                                    e.preventDefault();
                                    deleteProject(item?._id);
                                  }} className="fa-solid fa-trash"></i>
                                </div>
                              </td>
                            </tr>
                          ))
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
              <h2>Create New Award</h2>
              <label onClick={() => {
                setPopup1(false);
                setOnEdit(false);
                setEditData({});
                setFormdata({
                  employee: "",
                  awardType: "",
                  date: "",
                  gift: "",
                  description: "",
                  rating: ""
                })
              }} className="cross-icon"></label>

              <hr />

              {/* <div className="award-popup-label"> */}
              <div className="award-popup-label">

                <label htmlFor="">
                  <p>Employee</p>
                  <select name="employee" value={formdata?.employee} onChange={changeHandler} id="">
                    <option value="Select Employee"> Select Employee</option>
                    {
                      allEmp.map((item, index) => (
                        <option value={item?.fullName} key={index}>{item?.fullName}</option>
                      ))
                    }
                  </select>

                </label>

                <label htmlFor="">
                  <p>Award Type</p>
                  <input
                    type="text"
                    name="awardType"
                    onChange={changeHandler}
                    value={formdata.awardType}
                    placeholder="Certificate"
                  />
                </label>

              </div>
              <div className="award-popup-label">

                <label htmlFor="">
                  <p>Date</p>
                  <input
                    type="date"
                    name="date"
                    onChange={changeHandler}
                    value={formdata.date}
                    placeholder="dd-mm-yyyy"
                  />
                </label>

                <label htmlFor="">
                  <p>Gift</p>
                  <input
                    type="text"
                    name="gift"
                    onChange={changeHandler}
                    value={formdata.gift}
                    placeholder="Enter Gift"
                  />
                </label>

              </div>



              <div className="award-popup-label award-popup-textarea">

                <label htmlFor="">
                  <p>Description</p>
                  <textarea id="w3review" name="description"
                    onChange={changeHandler}
                    value={formdata.description} rows="8" cols="50" placeholder="Enter Description"></textarea>
                </label>

              </div>

              <div className="award-popup-label award-popup-textarea">

                <label htmlFor="">
                  <p>Rating</p>
                  <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={24}
                    value={formdata?.rating}
                    activeColor="#ffd700"
                  />,
                </label>

              </div>
              {/* <div/> */}

              <hr />

              <div className="btnWrap Award-popup-btn">
                <button onClick={() => {
                  setPopup1(false);
                  setOnEdit(false);
                  setEditData({});
                  setFormdata({
                    employee: "",
                    awardType: "",
                    date: "",
                    gift: "",
                    description: "",
                    rating: ""
                  })
                }} className="cencel awd-cancel">
                  <span>Cancel</span>
                </button>

                <button className="create awd-create" onClick={() => {
                  submitHandler();
                  setPopup1(false);
                }}>
                  <span>Create</span>
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
