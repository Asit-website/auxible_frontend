import AdminSidebar from "../Sidebar/AdminSidebar";
import AdminNavbar from "../Navbar/AdminNavbar";
import { useMain } from "../../../hooks/useMain";
import annPlus from "../../images/annPlus.png";
import "./annocement.css";
import { useState, useEffect } from "react";
import cross from "../../images/crossAn.png";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import toast from "react-hot-toast";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";
import { RxCross2 } from "react-icons/rx";


const AdminProfile = ({ pop, setPop, setAlert }) => {
  const {
    user,
    createAnnouncement,
    fetchAnnoucement,
    allEmployee,
    getBranchs,
    getDepartments,
    deleteAnnouncements,
    updateAnnouncements,
    departmentEmployee,
  } = useMain();

  const [openForm, setOpenForm] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [department, setDepartment] = useState([]);
  const [branch, setBranch] = useState([]);

  const [refreshFlag, setRefreshFlag] = useState(false);

  const [onEdit, setOnEdit] = useState(false);
  const [editData, setEditData] = useState({});

  const [formdata, setFormdata] = useState({
    title: "",
    Branch: "",
    Department: "",
    Employee: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [allAnnoucement, setAllAnouce] = useState([]);
  const [announcementList,setAnnouncementList] = useState([]);
  const [AnnoucSearch,setAnnounceSearch] = useState([]);

  const getAnnoucement = async () => {
    const ans = await fetchAnnoucement();
    setAllAnouce(ans?.data);
  };

  useEffect(() => {
    if (onEdit) {
      setFormdata({
        id: editData._id,
        title: editData.title,
        Branch: editData.Branch,
        Department: editData.Department,
        Employee: editData.Employee,
        startDate: editData.startDate,
        endDate: editData.endDate,
        description: editData.description,
      });
    }
  }, [editData]);

  const submitHandler = async () => {
    const toastId = toast.loading("Loading...");
    try {
      if (onEdit) {
        await updateAnnouncements({ ...formdata });
        toast.success("update successfully");
        setRefreshFlag(!refreshFlag);
      } else {
        await createAnnouncement({ ...formdata });
        toast.success("Successfuly Created");
        setRefreshFlag(!refreshFlag);
      }

      getAnnoucement();
      setOpenForm(false);
    } catch (error) {
      console.log(error);
    }
    toast.dismiss(toastId);

  };

  const getData1 = async () => {
    const ans = await getBranchs();
    const ans1 = await getDepartments();
    setBranch(ans?.data);
    setDepartment(ans1?.data);
  };

  useEffect(() => {
    getData1();
  }, [refreshFlag]);

  const employeeFetch = async () => {
    const ans2 = await allEmployee();
    setEmployee(ans2?.emp);
  };

  const deleteProject = async (id) => {
    confirmAlert({
      title: "Are you sure to delete this data?",
      message: "All related data to this will be deleted",
      buttons: [
        {
          label: "Yes, Go Ahead!",
          style: {
            background: "#FF5449",
          },
          onClick: async () => {
            await deleteAnnouncements(id);
            toast.success("delete Successfully");
            setRefreshFlag(!refreshFlag);
            // getData();
          },
        },
        {
          label: "Cancel",

          onClick: () => null,
        },
      ],
    });
  };

  const fetchDepartEmploye = async () => {
    const ans = await departmentEmployee(formdata?.Department);
    if (ans?.status) {
      setEmployee(ans?.allUser);
    }
  };

  useEffect(() => {
    if (formdata.Department === "All Department") {
      employeeFetch();
    } else if (
      formdata.Department !== "" &&
      formdata.Department !== "Select Department"
    ) {
      fetchDepartEmploye();
    }
  }, [formdata.Department]);

  useEffect(() => {
    getAnnoucement();
  }, [refreshFlag]);

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const [leavePopup , setLeavePopup] = useState(false);

  const { role } = hrms_user;

  const [currentPage, setCurrentPage] = useState(1);

  let itemsPerPage = 10;

  const totalPages = Math?.ceil(allAnnoucement?.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const endIndex = Math.min(startIndex + itemsPerPage, allAnnoucement?.length);

  const currentItems = allAnnoucement?.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });
  };


  return (
    <>
      <div className="annDash relative h-full">
        {role === "EMPLOYEE" ? (
          <EmployeeSidebar pop={pop} setPop={setPop} />
        ) : (
          <AdminSidebar pop={pop} setPop={setPop} />
        )}

        <div className="tm">
          {role === "EMPLOYEE" ? (
            <EmployeeNavbar user={user} setAlert={setAlert} />
          ) : (
            <AdminNavbar user={user} setAlert={setAlert} />
          )}
          <div className="em">

            <div className="anNav">

              {/* left sie */}
              <div className="anNavLeft">
                <h2>Manage Announcement</h2>
                <p>
                  Dashboard <span> Announcement</span>{" "}
                </p>
              </div>

              {/* right side  */}
              <div onClick={() => setOpenForm(true)} className="plusImg6">
                <img src={annPlus} alt="" />  <span>ADD</span>
              </div>
            </div>

            <main className="anMain">
              {/* top */}
              <div className="anmainTop">
               

                {/* right side  */}
                <div className="anMaRi">
                  <input type="text" placeholder="Search..." />
                </div>
              </div>

              <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-black dark:text-black tranking">
                  <thead class="text-xs text-black uppercase  dark:text-black">
                    <tr>
                      <th scope="col" class="px-3 py-3">
                        TITLE
                      </th>
                      <th scope="col" class="px-3 py-3">
                        START DATE
                      </th>
                      <th scope="col" class="px-3 py-3">
                        END DATE
                      </th>
                      <th scope="col" class="px-3 py-3">
                        DESCRIPTION
                      </th>
                      <th scope="col" class="px-3 py-3">
                        ACTION
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentItems.map((item, index) => (
                      <tr onClick={()=>setLeavePopup(item)} key={index} class="bg-white cursor-pointer">
                        <td class="px-3 py-4">{item.title?.slice(0, 30)}...</td>
                        <td class="px-3 py-4">{item.startDate}</td>
                        <td class="px-3 py-4">{item.endDate}</td>
                        <td class="px-3 py-4">{item.description?.slice(0,50)}...</td>
                        <td class="px-3 py-4">
                          <div className="flex items-center sk">
                            <i
                              onClick={() => {
                                setOnEdit(true);
                                setEditData(item);
                                setOpenForm(true);
                              }}
                              className="fa-solid fa-pen-to-square"
                            ></i>
                            <i
                              onClick={() => {
                                deleteProject(item?._id);
                              }}
                              className="fa-solid fa-trash"
                            ></i>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </main>

            <div className="emPaginate">
              <button
                className={`prepaginate ${currentPage !== 1 && "putthehovebtn"
                  }`}
                onClick={() => {
                  handlePageChange(currentPage - 1);
                  scrollToTop();
                }}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="pagenum">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className={`prepaginate ${currentPage !== totalPages && "putthehovebtn"
                  } `}
                onClick={() => {
                  handlePageChange(currentPage + 1);
                  scrollToTop();
                }}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>



          </div>


          {
            leavePopup && 
            <div className="leavePopupwrap2">
                <div className="leavepopconta2">

                  <nav><RxCross2 fontSize={24} className="cursor-pointer" onClick={()=>setLeavePopup(false)} /></nav>
 
                <label htmlFor="">
                  <h4>Title: </h4>
                  <p>{leavePopup?.title}</p>
                </label>

              
                <label htmlFor="">
                  <h4>From: </h4>
                  <p>{leavePopup?.startDate}</p>
                </label>
                <label htmlFor="">
                  <h4>To: </h4>
                  <p>{leavePopup?.endDate}</p>
                </label>

                <label htmlFor="">
                  <h4>Description: </h4>
                  <p>{leavePopup?.description}</p>
                </label>

                   
                </div>
            </div>
          }

        </div>

        {/* form  */}
        {openForm && (
          <div className="allPopupWrap">
            <form
              onSubmit={() => {
                submitHandler();
                setOpenForm(false);
              }}
              className="awardpopupcont"
            >
              <div className="allform_header">
                {/* left  */}
                <h2>Create New Announcement</h2>
                 <RxCross2  onClick={() => {
                    setOpenForm(false);
                    setOnEdit(false);
                    setEditData({});
                    setFormdata({
                      title: "",
                      Branch: "",
                      Department: "",
                      Employee: "",
                      startDate: "",
                      endDate: "",
                      description: "",
                    });
                  }} className="RxCross2_form" />
              </div>

              <hr />

<div className="popup_formdiv allInputFileds4">


                <label htmlFor="title">
                  <p>Announcement Title</p>
                  <input
                    id="title"
                    name="title"
                    onChange={changeHandler}
                    value={formdata?.title}
                    type="text"
                    placeholder="Enter Annoucement Title"
                  />
                </label>

                <label htmlFor="Branch">
                  <p>Branch</p>
                  <select
                    onChange={changeHandler}
                    name="Branch"
                    id="Branch"
                    value={formdata?.Branch}
                  >
                    <option>Select Branch</option>
                    {branch?.map((val, index) => {
                      return (
                        <option key={index} value={val.name}>
                          {val.name}
                        </option>
                      );
                    })}
                  </select>
                </label>

                <label htmlFor="Department">
                  <p>Department</p>
                  <select
                    onChange={(e) => {
                      changeHandler(e);
                    }}
                    name="Department"
                    id="Department"
                    value={formdata?.Department}
                  >
                    <option value="Select Department">Select Department</option>
                    <option value="All Department">All Department</option>
                    {department?.map((val, index) => {
                      return (
                        <option key={index} value={val.name}>
                          {val.name}
                        </option>
                      );
                    })}
                  </select>
                </label>

                <label htmlFor="Employee">
                  <p>Employee</p>
                  <select
                    onChange={changeHandler}
                    name="Employee"
                    id="Employee"
                    value={formdata?.Employee}
                  >
                    <option>Select Employee</option>
                    <option value="All Employee">All Employee</option>
                    {employee?.map((val, index) => {
                      return (
                        <option key={index} value={val?.fullName}>
                          {val?.fullName}
                        </option>
                      );
                    })}
                  </select>
                </label>

                <label htmlFor="startDate">
                  <p>Announcement start Date</p>
                  <input
                    id="startDate"
                    name="startDate"
                    value={formdata.startDate}
                    onChange={changeHandler}
                    type="date"
                  />
                </label>

                <label htmlFor="endDate">
                  <p>Announcement End Date</p>
                  <input
                    value={formdata?.endDate}
                    onChange={changeHandler}
                    name="endDate"
                    id="endDate"
                    type="date"
                  />
                </label>

                <div className="anDesWrap makefdufsld">
                  <p>Announcement Description</p>
                  <textarea
                    onChange={changeHandler}
                    value={formdata?.description}
                    name="description"
                    id="description"
                    cols="30"
                    rows="10"
                    placeholder="Enter Annoucement Title"
                  ></textarea>
                </div>

              {/* </div> */}


              </div>

              <hr />

              <div className="createBtn">
                <button
                  type="button"
                  onClick={() => {
                    setOpenForm(false);
                    setOnEdit(false);
                    setEditData({});
                    setFormdata({
                      title: "",
                      Branch: "",
                      Department: "",
                      Employee: "",
                      startDate: "",
                      endDate: "",
                      description: "",
                    });
                  }}
                  className="cancelBtn"
                >
                  Cancel
                </button>
                <button type="submit" className="creteBtn">
                  {onEdit ? "Update" : "Create"}
                </button>
              </div>


            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminProfile;
