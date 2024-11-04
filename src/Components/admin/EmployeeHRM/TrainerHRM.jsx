import React, { useState, useEffect } from "react";
import AdminNavbar from "../Navbar/AdminNavbar";
import AdminSidebar from "../Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import chevron from "../../images/chevron_right.png";
import { useMain } from "../../../hooks/useMain";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import "./award.css";
import "./trainingsetup.css"

import plusIcon from "../../images/plusIcon.png";
import toast from "react-hot-toast";

// const sidebarItem = [
//   {
//     title: "Branch",
//     tableData: [
//       {
//         title: "TYPE",
//       },
//       {
//         title: "ACTION",
//       },
//     ],
//   },
//   {
//     title: "Department",
//     tableData: [
//       {
//         title: "BRANCH",
//       },
//       {
//         title: "DEPARTMENT",
//       },
//       {
//         title: "ACTION",
//       },
//     ],
//   },
//   {
//     title: "Designation",
//     tableData: [
//       {
//         title: "DEPARTMENT",
//       },
//       {
//         title: "DESIGNATION",
//       },
//       {
//         title: "ACTION",
//       },
//     ],
//   },
//   {
//     title: "Leave Type",
//     tableData: [
//       {
//         title: "Leave Type",
//       },
//       {
//         title: "Days/Year",
//       },
//       {
//         title: "ACTION",
//       },
//     ],
//   },
// ];

const HRMsystemSetup = ({ setAlert, pop, setPop }) => {
  const { user, createTrainer, getTrainer, deleteTrainer, updateTrainer, getBranchs } = useMain();

  //   const [value, onChange] = useState(new Date());
  //   const [gen, setGen] = useState([]);
  //   const [flag, setFlag] = useState();

  const [open, setOpen] = useState(0);

  const [popup, setPopup] = useState(false);

  const styleing = {
    display: popup ? "block" : "none",
  };


  const [allBranch, setBranch] = useState([]);
  const [data,setData] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const [onEdit, setOnEdit] = useState(false);
  const [editData, setEditData] = useState({});

  const fetchBranch = async () => {
    const ans = await getBranchs();
    setBranch(ans?.data);
  }

  const getData = async () =>{
    const ans = await getTrainer();
    setData(ans?.data);
  }

  const [formdata, setFormdata] = useState({
    Branch:"", firstName:"", lastName:"", contact:"", email:"",expertise:"",address:""
  })

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
            await deleteTrainer(id);
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

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormdata((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  useEffect(() => {
    if (onEdit) {
      setFormdata({
        id: editData._id,
        Branch: editData.Branch,
        firstName: editData.firstName,
        lastName: editData.lastName,
        contact: editData.contact,
        email: editData.email,
        expertise:editData.expertise,
        address:editData.address
      })
    }
  }, [editData])


  const submitHandler = async () => {
    // const ans = await createTrainer({ ...formdata });
    // console.log("rep ans ", ans);
    // alert("Successfuly Created");
    // setRefreshFlag(!refreshFlag);
    if (onEdit) {
      const ans = await updateTrainer({ ...formdata });
      console.log(ans.data);
      toast.success("update successfully");
      setRefreshFlag(!refreshFlag);
    }
    else {
      const ans = await createTrainer({ ...formdata });
      toast.success("Successfuly Created");
      setRefreshFlag(!refreshFlag);
    }
    setPopup1(false)
  }

  useEffect(() => {
    fetchBranch();
    getData()
  }, [refreshFlag])


  //   const data1 = [
  //     {
  //       type: "Head office",
  //     },
  //     {
  //       type: "Head office",
  //     },
  //     {
  //       type: "Head office",
  //     },
  //   ];

  //   const data2 = [
  //     {
  //       branch: "Head office",
  //       department: "Admin",
  //     },
  //     {
  //       branch: "Head office",
  //       department: "Admin",
  //     },
  //     {
  //       branch: "Head office",
  //       department: "Admin",
  //     },
  //   ];

  //   const data3 = [
  //     {
  //       department: "Head office",
  //       designation: "Admin",
  //     },
  //     {
  //       department: "Head office",
  //       designation: "Admin",
  //     },
  //     {
  //       department: "Head office",
  //       designation: "Admin",
  //     },
  //   ];

  const [popup1, setPopup1] = useState(false);
  //   const [id, setId] = useState('');
  //   const [branches, setBranches] = useState([]);
  //   const [branches1, setBranches1] = useState([]);
  //   const [departments, setDepartments] = useState([]);
  //   const [departments1, setDepartments1] = useState([]);
  //   const [designations, setDesignations] = useState([]);
  //   const [designations1, setDesignations1] = useState([]);
  //   const [leaveTypes, setLeaveTypes] = useState([]);
  //   const [leaveTypes1, setLeaveTypes1] = useState([]);
  //   const [branch, setBranch] = useState("");
  //   const [branch1, setBranch1] = useState("");
  //   const [departmentValue, setDepartmentValue] = useState({
  //     branch: "",
  //     name: "",
  //   });
  //   const [leaveTypeValue, setLeaveTypeValue] = useState({
  //     name: "",
  //     days: ""
  //   });
  //   const [designationValue, setDesignationValue] = useState({
  //     department: "",
  //     name: "",
  //   });
  //   const [departmentValue1, setDepartmentValue1] = useState({
  //     branch: "",
  //     name: "",
  //   });
  //   const [designationValue1, setDesignationValue1] = useState({
  //     department: "",
  //     name: "",
  //   });
  //   const [leaveTypeValue1, setLeaveTypeValue1] = useState({
  //     name: "",
  //     days: ""
  //   });
  //   const [refreshFlag, setRefreshFlag] = useState(false);

  //   useEffect(() => {
  //     getData();
  //   }, [refreshFlag]);

  //   const getData = async () => {
  //     const ans1 = await getBranchs();
  //     const ans2 = await getDepartments();
  //     const ans3 = await getDesignations();
  //     const ans4 = await getLeaveTypes();
  //     setBranches(ans1.data);
  //     setBranches1(ans1.data);
  //     setDepartments(ans2.data);
  //     setDepartments1(ans2.data);
  //     setDesignations(ans3.data);
  //     setDesignations1(ans3.data);
  //     setLeaveTypes(ans4.data);
  //     setLeaveTypes1(ans4.data);
  //   };

  //   const handleCreateBranch = async () => {
  //     const ans = await postBranch({ name: branch });
  //     console.log(ans);
  //     if (ans.success) {
  //       alert(ans.message);
  //       setBranch("");
  //       setRefreshFlag(!refreshFlag);
  //       setPopup1(false);
  //     } else {
  //       alert("something went wrong");
  //     }
  //   };

  //   const handleUpdateBranch = async () => {
  //     const ans = await updateBranch({ name: branch1, id });
  //     console.log(ans);
  //     if (ans.success) {
  //       alert(ans.message);
  //       setBranch1("");
  //       setRefreshFlag(!refreshFlag);
  //       setPopup11(false);
  //     } else { 
  //       alert("something went wrong");
  //     }
  //   };

  //   const handleCreateDepartment = async () => {
  //     const ans = await postDepartment({
  //       name: departmentValue.name,
  //       branch: branches.find(x => x._id === departmentValue.branch),
  //     });
  //     console.log(ans);
  //     if (ans.success) {
  //       setDepartmentValue({
  //         name: '',
  //         branch: ''
  //       });
  //       alert(ans.message);
  //       setRefreshFlag(!refreshFlag);
  //       setPopup2(false);
  //     } else {
  //       alert("something went wrong");
  //     }
  //   };

  //   const handleCreateDesignation = async () => {
  //     const ans = await postDesignation({
  //       name: designationValue.name,
  //       department: departments.find(x => x._id === designationValue.department)
  //     });
  //     console.log(ans);
  //     if (ans.success) {
  //       alert(ans.message);
  //       setDesignationValue({
  //         name: '',
  //         department: ''
  //       });
  //       setRefreshFlag(!refreshFlag);
  //       setPopup3(false);
  //     } else {
  //       alert("something went wrong");
  //     }
  //   };

  //   const handleCreateLeaveType = async () => {
  //     const ans = await postLeaveType({
  //       days: leaveTypeValue?.days,
  //       name: leaveTypeValue?.name
  //     });
  //     console.log(ans);
  //     if (ans.success) {
  //       alert(ans.message);
  //       setLeaveTypeValue({
  //         name: '',
  //         days: ''
  //       });
  //       setRefreshFlag(!refreshFlag);
  //       setPopup4(false);
  //     } else {
  //       alert("something went wrong");
  //     }
  //   };

  //   const handleUpdateDepartment = async () => {
  //     const ans = await updateDepartment({
  //       id,
  //       name: departmentValue1?.name,
  //       branch: branches?.find(x => x?._id === departmentValue1?.branch),
  //     });
  //     console.log(ans);
  //     if (ans.success) {
  //       setDepartmentValue1({
  //         name: '',
  //         branch: ''
  //       });
  //       alert(ans.message);
  //       setRefreshFlag(!refreshFlag);
  //       setPopup21(false);
  //     } else {
  //       alert("something went wrong");
  //     }
  //   };

  //   const handleUpdateDesignation = async () => {
  //     const ans = await updateDesignation({
  //       id,
  //       name: designationValue1?.name,
  //       department: departments?.find(x => x?._id === designationValue1?.department)
  //     });
  //     console.log(ans);
  //     if (ans.success) {
  //       alert(ans.message);
  //       setDesignationValue1({
  //         name: '',
  //         department: ''
  //       });
  //       setRefreshFlag(!refreshFlag);
  //       setPopup31(false);
  //     } else {
  //       alert("something went wrong");
  //     }
  //   };

  //   const handleUpdateLeaveType = async () => {
  //     const ans = await updateLeaveType({
  //       id,
  //       days: leaveTypeValue1?.days,
  //       name: leaveTypeValue1?.name
  //     });
  //     console.log(ans);
  //     if (ans.success) {
  //       alert(ans.message);
  //       setLeaveTypeValue1({
  //         name: '',
  //         days: ''
  //       });
  //       setRefreshFlag(!refreshFlag);
  //       setPopup41(false);
  //     } else {
  //       alert("something went wrong");
  //     }
  //   };

  //   const handleDelete = async (id, type) => {
  //     let ans;
  //     console.log(id, type);
  //     if (type === 'branch') {
  //       ans = await deleteBranch(id);
  //     }
  //     else if (type === 'department') {
  //       ans = await deleteDepartment(id);
  //     }
  //     else if (type === 'designation') {
  //       ans = await deleteDesignation(id);
  //     }
  //     else if (type === 'leaveType') {
  //       ans = await deleteLeaveType(id);
  //     }
  //     console.log(ans);

  //     if (ans.success) {
  //       alert(ans.message);
  //       setRefreshFlag(!refreshFlag);
  //     } else {
  //       alert("something went wrong");
  //     }
  //   };



  return (
    <>
      <div className="employee-dash h-full">
        <AdminSidebar pop={pop} setPop={setPop} />

        <div className="tm awardtm">
          <AdminNavbar setAlert={setAlert} />

          <div className="em">
            <div className="flex-col">
              <div className="admin-main adminmain">
                <div className="plusSection">
                  <div className="adminFirt">
                    <h2 className="hrmShed">Manage Trainer</h2>

                    <div className="hrmDoHe">
                      <p>Dashboard</p>
                      <img src={chevron} alt="" />
                      <span>Trainer</span>
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
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            BRANCH
                          </th>
                          <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                              FULL NAME
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
                              CONTACT
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
                              EMAIL
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
                      <thead className="text-xs text-gray-700 uppercase bg-white-50 dark:bg-white-700 dark:text-gray-400">
                        {
                          data?.map((val,index)=>{
                            return  <tr>
                            <th scope="col" className="px-6 py-3 bg-white">
                              {val?.Branch}
                            </th>
                            <th scope="col" className="px-6 py-3 bg-white">
                              <div className="flex items-center">
                                {val?.firstName} {val?.lastName}
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
                            <th scope="col" className="px-6 py-3 bg-white">
                              <div className="flex items-center">
                                {val?.contact}
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
                            <th scope="col" className="px-6 py-3 bg-white bg-white">
                              <div className="flex items-center">
                                {val?.email}
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
                            <th scope="col" className="px-6 py-3 bg-white">
                            <div className='flex items-center sk'>
                                  <i onClick={() => {
                                    setOnEdit(true);
                                    setEditData(val);
                                    setPopup1(true)
                                  }}  className="fa-solid fa-pen-to-square"></i>
                                  <i onClick={()=>{
                                    deleteProject(val?._id)
                                  }}  className="fa-solid fa-trash"></i>
                                </div>
                            </th>
                          </tr>
                          })
                        }
                       
                      </thead>
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
              <h2>Create New Trainer</h2>
              <label onClick={() => {
                setPopup1(false);
                setOnEdit(false);
                setEditData({});
                setFormdata({
                  Branch:"", firstName:"", lastName:"", contact:"", email:"",expertise:"",address:""
                })
              }} className="cross-icon"></label>

              <hr />

              {/* <div className="award-popup-label"> */}
              <div className="award-popup-label traininginput">
                <label htmlFor="Branch">
                  <p>Branch</p>
                  {/* <input
                    type="text"
                    name="Branch"
                    value={formdata?.Branch}
                    onChange={changeHandler}
                    id="Branch"
                    placeholder="Head office"
                  /> */}
                  <select  className="w-full" name="Branch" id="Branch" onChange={changeHandler}>
                    <option value="">Select Branch</option>
                    {
                      allBranch?.map((val,index)=>{
                        return <option key={index} value={val?.name}>{val?.name}</option>
                      })
                    }
                  </select>
                </label>
              </div>
              <div className="award-popup-label">
                <label htmlFor="firstName">
                  <p>First Name</p>
                  <input
                    type="text"
                    name="firstName"
                    value={formdata.firstName}
                    onChange={changeHandler}
                    placeholder=""
                    id="firstName"
                  />
                </label>
                <label htmlFor="lastName">
                  <p>Last Name</p>
                  <input
                    type="text"
                    name="lastName"
                    value={formdata?.lastName}
                    onChange={changeHandler}
                    placeholder=""
                  />
                </label>
              </div>
              <div className="award-popup-label">
                <label htmlFor="contact">
                  <p>Contact</p>
                  <input
                    type="number"
                    name="contact"
                    value={formdata?.contact}
                    onChange={changeHandler}
                    placeholder=""
                    id="contact"
                  />
                </label>
                <label htmlFor="email">
                  <p>Email</p>
                  <input
                    type="email"
                    name="email"
                    onChange={changeHandler}
                    value={formdata?.email}
                    // onChange={(e) => {
                    //   setBranch(e.target.value);
                    // }}
                    // value={branch}
                    placeholder=""
                  />
                </label>
              </div>

              <div className="award-popup-label award-popup-textarea">
                <label htmlFor="expertise">
                  <p>Expertise</p>
                  <textarea onChange={changeHandler} value={formdata?.expertise} id="expertise" name="expertise" rows="6" cols="50" placeholder="Expertise"></textarea>
                </label>
              </div>
              <div className="award-popup-label award-popup-textarea">
                <label htmlFor="address">
                  <p>Address</p>
                  <textarea onChange={changeHandler} value={formdata?.address} id="address" name="address" rows="6" cols="50" placeholder="Address"></textarea>
                </label>
              </div>
              {/* <div/> */}

              <hr />

              <div className="btnWrap Award-popup-btn">
                <button className="cencel awd-cancel" onClick={() => {
                setPopup1(false);
                setOnEdit(false);
                setEditData({});
                setFormdata({
                  Branch:"", firstName:"", lastName:"", contact:"", email:"",expertise:"",address:""
                })
              }} >
                  <span>Cancel</span>
                </button>

                <button onClick={()=>{
                  submitHandler();
                  setPopup1(false)
                }} className="create awd-create" >
                  <span>Create</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
export default HRMsystemSetup;
