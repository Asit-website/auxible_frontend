import React, { useState, useEffect } from "react";
import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import "./HRMsystem.css";
import bran from "../../images/hub_FILL0_wght400_GRAD0_opsz24 1.png";
import deleted from "../../images/deleted.png";
import edited from "../../images/edited.png";
import textType from "../../images/Text Type.png";
import hub from "../../images/hub2.png";
import hub2 from "../../images/work_FILL0_wght400_GRAD0_opsz24 1.png";
import hub3 from "../../images/hub3.png";
import cross1 from "../../images/cross1.png";
import toast from "react-hot-toast";
import plus from "../../images/pluss.png";
import Selectmultidropdown from "./MultiSelect";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";

const sidebarItem = [
  {
    title: "Branch",
    img: bran,
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
    img: hub,
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
    img: hub2,
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
    img: hub3,
    class:"syss",
    tableData: [
      {
        title: "LEAVE TYPE",
      },
      {
        title: "DAYS/YEAR",
      },
      {
        title: "ACTION",
      },
    ],
  },
  // {
  //   title: "Lead Status",
  //   img: hub3,
  //   tableData: [
  //     {
  //       title: "Leave Status",
  //     },
  //     {
  //       title: "ACTION",
  //     },
  //   ],
  // },
  // {
  //   title: "Industry",
  //   img: hub3,
  //   tableData: [
  //     {
  //       title: "Industry",
  //     },
  //     {
  //       title: "ACTION",
  //     },
  //   ],
  // },
];

const HRMsystemSetup = ({ setAlert, pop, setPop }) => {
  const {
    user,
    getBranchs,
    postBranch,
    updateBranch,
    deleteBranch,
    getDepartments,
    postDepartment,
    updateDepartment,
    deleteDepartment,
    getDesignations,
    postDesignation,
    updateDesignation,
    deleteDesignation,
    postLeaveType,
    updateLeaveType,
    getLeaveTypes,
    deleteLeaveType,
    postDocSetup,
    fetchAllDocs,
    deleteDocSetup,
    updateDocSetup,
    postLeadStatus,
    postLeadSource2,
    AllLeadStatus,
    AllLeadSource,
  } = useMain();

  const [open, setOpen] = useState(0);

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));
  let hrms_permission = JSON.parse(localStorage.getItem("hrms_permission"));


  const { role, } = hrms_user;

  const {hrmsSetupEditPermission,hrmsSetupDeletePermission,hrmsSetupCreatePermission, } = hrms_permission;

  const [popup, setPopup] = useState(false);

  const styleing = {
    display: popup ? "block" : "none",
  };

  const [allStatus, setAllStatus] = useState([]);
  const [allSource, setAllSource] = useState([]);

  const fetchAllStatus = async () => {
    const ans = await AllLeadStatus();
    setAllStatus(ans?.data);
  };
  const fetchAllSource = async () => {
    const ans = await AllLeadSource();
    setAllSource(ans?.data);
  };

  useEffect(() => {
    fetchAllStatus();
    fetchAllSource();
  }, []);

  const [popup1, setPopup1] = useState(false);
  const [popup11, setPopup11] = useState(false);
  const [popup2, setPopup2] = useState(false);
  const [popup21, setPopup21] = useState(false);
  const [popup3, setPopup3] = useState(false);
  const [popup31, setPopup31] = useState(false);
  const [popup4, setPopup4] = useState(false);
  const [popup5, setPopup5] = useState(false);
  const [popup6, setPopup6] = useState(false);
  const [popup41, setPopup41] = useState(false);

  const [docPop, setDocPop] = useState(false);

  const [id, setId] = useState("");
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
    days: "",
  });
  const [leadStatus, setLeadStatus] = useState({
    status: "",
  });
  const [leadSource, setLeadSource] = useState({
    status: "",
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
    days: "",
  });
  const [refreshFlag, setRefreshFlag] = useState(false);

  const getData = async () => {
    const ans1 = await getBranchs();
    const ans2 = await getDepartments();
    const ans3 = await getDesignations();
    const ans4 = await getLeaveTypes();
    setBranches(ans1?.data);
    setBranches1(ans1?.data);
    setDepartments(ans2?.data);
    setDepartments1(ans2?.data);
    setDesignations(ans3?.data);
    setDesignations1(ans3?.data);
    setLeaveTypes(ans4?.data);
    setLeaveTypes1(ans4?.data);
  };

  useEffect(() => {
    getData();
  }, [refreshFlag]);

  const handleCreateBranch = async () => {
    const toastId = toast.loading("Loading...");

    const ans = await postBranch({ name: branch });
    if (ans.success) {
      toast.success(ans.message);
      setBranch("");
      setRefreshFlag(!refreshFlag);
      setPopup1(false);
    } else {
      toast.error("Branch name is alreday exist");
    }

    toast.dismiss(toastId);
  };

  const handleUpdateBranch = async () => {
    const toastId = toast.loading("Loading...");

    const ans = await updateBranch({ name: branch1, id });
    if (ans.success) {
      toast.success(ans.message);
      setBranch1("");
      setRefreshFlag(!refreshFlag);
      setPopup11(false);
    } else {
      toast.error("something went wrong");
    }

    toast.dismiss(toastId);
  };

  const handleCreateDepartment = async () => {
    const toastId = toast.loading("Loading...");
    const ans = await postDepartment({
      name: departmentValue.name,
      branch: branches.find((x) => x._id === departmentValue.branch),
    });

    if (ans.status) {
      toast.success("success");
      setBranch("");
      setRefreshFlag(!refreshFlag);
      setPopup1(false);
    }
    if (ans.success) {
      setDepartmentValue({
        name: "",
        branch: "",
      });
      toast.success(ans.message);
      setRefreshFlag(!refreshFlag);
      setPopup2(false);
    } else {
      toast.error("Department name alreday exist");
    }

    toast.dismiss(toastId);
  };

  const handleCreateLeadStatus = async () => {
    const toastId = toast.loading("Loading...");
    const ans = await postLeadStatus({
      status: leadStatus?.status,
    });

    if (ans.status) {
      toast.success("success");
      fetchAllStatus();
      setLeadStatus("");
      setPopup5(false);
    }

    toast.dismiss(toastId);
  };

  const handleCreateLeadSource = async () => {
    const toastId = toast.loading("Loading...");
    const ans = await postLeadSource2({
      status: leadSource?.status,
    });

    if (ans.status) {
      toast.success("success");
      fetchAllSource();
      setLeadSource("");
      setPopup6(false);
    }

    toast.dismiss(toastId);
  };

  const handleCreateDesignation = async () => {
    const toastId = toast.loading("Loading...");

    const ans = await postDesignation({
      name: designationValue.name,
      department: departments.find(
        (x) => x._id === designationValue.department
      ),
    });
    if (ans.success) {
      toast.success(ans.message);
      setDesignationValue({
        name: "",
        department: "",
      });
      setRefreshFlag(!refreshFlag);
      setPopup3(false);
    } else {
      toast.error("something went wrong");
    }

    toast.dismiss(toastId);
  };

  const handleCreateLeaveType = async () => {
    const toastId = toast.loading("Loading...");

    const ans = await postLeaveType({
      days: leaveTypeValue?.days,
      name: leaveTypeValue?.name,
    });
    if (ans.success) {
      toast.success(ans.message);
      setLeaveTypeValue({
        name: "",
        days: "",
      });
      setRefreshFlag(!refreshFlag);
      setPopup4(false);
    } else {
      toast.error("Leave Name already exist");
    }

    toast.dismiss(toastId);
  };

  const handleUpdateDepartment = async () => {
    const toastId = toast.loading("Loading...");
    const ans = await updateDepartment({
      id,
      name: departmentValue1?.name,
      branch: branches?.find((x) => x?._id === departmentValue1?.branch),
    });
    if (ans.success) {
      setDepartmentValue1({
        name: "",
        branch: "",
      });
      toast.success(ans.message);
      setRefreshFlag(!refreshFlag);
      setPopup21(false);
    } else {
      toast.error("something went wrong");
    }

    toast.dismiss(toastId);
  };

  const handleUpdateDesignation = async () => {
    const toastId = toast.loading("Loading...");

    const ans = await updateDesignation({
      id,
      name: designationValue1?.name,
      department: departments?.find(
        (x) => x?._id === designationValue1?.department
      ),
    });
    if (ans.success) {
      toast.success(ans.message);
      setDesignationValue1({
        name: "",
        department: "",
      });
      setRefreshFlag(!refreshFlag);
      setPopup31(false);
    } else {
      toast.error("something went wrong");
    }

    toast.dismiss(toastId);
  };

  const handleUpdateLeaveType = async () => {
    const toastId = toast.loading("Loading...");
    const ans = await updateLeaveType({
      id,
      days: leaveTypeValue1?.days,
      name: leaveTypeValue1?.name,
    });
    if (ans.success) {
      toast.success(ans.message);
      setLeaveTypeValue1({
        name: "",
        days: "",
      });
      setRefreshFlag(!refreshFlag);
      setPopup41(false);
    } else {
      toast.error("something went wrong");
    }

    toast.dismiss(toastId);
  };

  const handleDelete = async (id, type) => {
    const toastId = toast.loading("Loading...");
    let ans;
    if (type === "branch") {
      ans = await deleteBranch(id);
    } else if (type === "department") {
      ans = await deleteDepartment(id);
    } else if (type === "designation") {
      ans = await deleteDesignation(id);
    } else if (type === "leaveType") {
      ans = await deleteLeaveType(id);
    }

    if (ans.success) {
      toast.success(ans.message);
      setRefreshFlag(!refreshFlag);
    } else {
      toast.success("something went wrong");
    }

    toast.dismiss(toastId);
  };

  const [allDocs, setAllDocs] = useState([]);

  const [docData, setDocdata] = useState({
    id: "",
    name: "",
    requiredField: [],
  });
  const getDocs = async () => {
    const ans = await fetchAllDocs();
    setAllDocs(ans?.data);
  };

  const handleDocSave = async () => {
    const toastId = toast.loading("Loding...");
    try {
      const ans = await postDocSetup({
        name: docData?.name,
        requiredField: docData?.requiredField,
      });
      console.log(ans);
      if (ans?.status) {
        toast.success("Successfuly created ");
        setDocPop(false);
        setDocdata({
          name: "",
          requiredField: [],
        });
        setIsUpdate(false);

        getDocs();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }

    toast.dismiss(toastId);
  };

  const deleteDoc = async (id) => {
    const toastId = toast.loading("Loading...");

    const ans = await deleteDocSetup({ id });
    if (ans?.status) {
      toast.success("Successfuly deleted");
      getDocs();
    } else {
      toast.error("Something went wrong");
    }

    toast.dismiss(toastId);
  };

  const [isUpdate, setIsUpdate] = useState(false);

  const docUpdateHandler = async () => {
    const toastId = toast.loading("Loading...");

    const ans = await updateDocSetup({
      id: docData?.id,
      name: docData?.name,
      requiredField: docData?.requiredField,
    });

    if (ans?.status) {
      toast.success("Successfuly updated");
      setDocPop(false);
      setDocdata({
        name: "",
        requiredField: [],
      });

      getDocs();
      setIsUpdate(false);
    } else {
      toast.error("Something went wrong ");
    }

    toast.dismiss(toastId);
  };

  useEffect(() => {
    getDocs();
  }, []);

  return (
    <>
      <div className="employee-dash h-full">
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
            <div className="flex-col">
              <div className="admin-main">
                <div className="plusSec">
                  <h3>HRM System Setup</h3>

                  {(hrmsSetupCreatePermission || role === "ADMIN") && (
                    <button
                      onClick={() => {
                        if (open === 0) {
                          setPopup1(true);
                        } else if (open === 1) {
                          setPopup2(true);
                        } else if (open === 2) {
                          setPopup3(true);
                        } else if (open === 3) {
                          setPopup4(true);
                        } else if (open === 4) {
                          setPopup5(true);
                        } else if (open === 5) {
                          setPopup6(true);
                        }
                      }}
                    >
                      <img src={textType} alt="" />
                      <span>Add New</span>
                    </button>
                  )}
                </div>

                <div className="hrmssystemsetup-parents">
                  <div className="hrmssystemsetup-rightmenu">
                    {sidebarItem.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => setOpen(index)}
                        className={`hrmsystemsetup-subrightmenu ${
                          open === index && "openItem"
                        } `}
                      >
                        <img className={`${item?.class}`} src={item.img} alt="" />
                        <span>{item.title}</span>
                      </div>
                    ))}
                  </div>

                  {open === 0 && (
                    <div className="hrmsystemsetup-leftmenu">
                      <div className="hrmsystemsetup-container">
                        <div className="hrmsystemsetup-pagination">
                          {/* <img src={frame1} alt="" /> */}
                          <span>Branch</span>
                        </div>

                        <div className="relative overflow-x-auto">
                          <table className="w-full table3 text-left text-[#060606]">
                            <thead className=" uppercase text-[#060606]">
                              <tr>
                                {sidebarItem[open].tableData.map(
                                  (item, index) => (
                                    <th
                                      key={index}
                                      scope="col"
                                      className="px-6 tabl3had py-3"
                                    >
                                      {item.title}
                                    </th>
                                  )
                                )}
                              </tr>
                            </thead>

                            <tbody>
                              {branches?.length === 0
                                ? "No Branches Added"
                                : branches.map((item, index) => (
                                    <tr key={index} className="bg-white ">
                                      <td className="px-6 py-4 tabl3Titl">
                                        {item?.name}
                                      </td>

                                      <td className="px-6 py-4 flex hrmActions">
                                        {(hrmsSetupEditPermission ||
                                          role === "ADMIN") && (
                                          <img
                                            className={"cursor-pointer"}
                                            onClick={() => {
                                              setId(item?._id);
                                              setBranch1(item?.name);
                                              setPopup11(true);
                                            }}
                                            src={edited}
                                            alt=""
                                          />
                                        )}
                                        {(hrmsSetupDeletePermission ||
                                          role === "ADMIN") && (
                                          <img
                                            className="cursor-pointer"
                                            onClick={() => {
                                              handleDelete(item._id, "branch");
                                            }}
                                            src={deleted}
                                            alt=""
                                          />
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {open === 1 && (
                    <div className="hrmsystemsetup-leftmenu">
                      <div className="hrmsystemsetup-container">
                        <div className="hrmsystemsetup-pagination">
                          {/* <img src={frame1} alt="" /> */}
                          <span>Department</span>
                        </div>

                        <div className="relative overflow-x-auto">
                          <table className="w-full table3 text-left   text-[#060606]">
                            <thead className=" uppercase text-[#060606]">
                              <tr>
                                {sidebarItem[open].tableData.map(
                                  (item, index) => (
                                    <th
                                      key={index}
                                      scope="col"
                                      className="px-6 tabl3had py-3"
                                    >
                                      {item.title}
                                    </th>
                                  )
                                )}
                              </tr>
                            </thead>

                            <tbody>
                              {departments.length === 0
                                ? "No Departments Added"
                                : departments.map((item, index) => (
                                    <tr key={index} className="bg-white ">
                                      <td className="px-6 py-4 tabl3Titl ">
                                        {item?.branch?.name}
                                      </td>
                                      <td className="px-6 py-4 tabl3Titl ">
                                        {item?.name}
                                      </td>
                                      <td className="px-6 py-4 flex hrmActions">
                                        {(hrmsSetupEditPermission ||
                                          role === "ADMIN") && (
                                          <img
                                            src={edited}
                                            className="cursor-pointer"
                                            onClick={() => {
                                              setDepartmentValue1({
                                                branch: item?.branch?._id,
                                                name: item?.name,
                                              });
                                              setId(item?._id);
                                              setPopup21(true);
                                            }}
                                            alt=""
                                          />
                                        )}
                                        {(hrmsSetupDeletePermission ||
                                          role === "ADMIN") && (
                                          <img
                                            src={deleted}
                                            className="cursor-pointer"
                                            onClick={() => {
                                              handleDelete(
                                                item._id,
                                                "department"
                                              );
                                            }}
                                            alt=""
                                          />
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {open === 2 && (
                    <div className="hrmsystemsetup-leftmenu">
                      <div className="hrmsystemsetup-container">
                        <div className="hrmsystemsetup-pagination">
                          {/* <img src={frame1} alt="" /> */}
                          <span>Designation</span>
                        </div>

                        <div className="relative overflow-x-auto">
                          <table className="w-full table3 text-left   text-[#060606]">
                            <thead className=" uppercase text-[#060606]">
                              <tr>
                                {sidebarItem[open].tableData.map(
                                  (item, index) => (
                                    <th
                                      key={index}
                                      scope="col"
                                      className="px-6 tabl3had py-3"
                                    >
                                      {item.title}
                                    </th>
                                  )
                                )}
                              </tr>
                            </thead>

                            <tbody>
                              {designations.length === 0
                                ? "No Designations Added"
                                : designations.map((item, index) => (
                                    <tr key={index} className="bg-white ">
                                      <td className="px-6 py-4  tabl3Titl">
                                        {item?.department?.name}
                                      </td>

                                      <td className="px-6 py-4  tabl3Titl">
                                        {item?.name}
                                      </td>

                                      <td className="px-6 py-4 flex hrmActions">
                                        {(hrmsSetupEditPermission ||
                                          role === "ADMIN") && (
                                          <img
                                            src={edited}
                                            className="cursor-pointer"
                                            onClick={() => {
                                              setDesignationValue1({
                                                department:
                                                  item?.department?._id,
                                                name: item?.name,
                                              });
                                              setId(item?._id);
                                              setPopup31(true);
                                            }}
                                            alt=""
                                          />
                                        )}
                                        {(hrmsSetupDeletePermission ||
                                          role === "ADMIN") && (
                                          <img
                                            src={deleted}
                                            className="cursor-pointer"
                                            onClick={() => {
                                              handleDelete(
                                                item._id,
                                                "designation"
                                              );
                                            }}
                                            alt=""
                                          />
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {open === 3 && (
                    <div className="hrmsystemsetup-leftmenu">
                      <div className="hrmsystemsetup-container">
                        <div className="hrmsystemsetup-pagination">
                          {/* <img src={frame1} alt="" /> */}
                          <span>Leave Type</span>
                        </div>

                        <div className="relative overflow-x-auto">
                          <table className="w-full table3 text-left   text-[#060606]">
                            <thead className=" uppercase text-[#060606]">
                              <tr>
                                {sidebarItem[open].tableData.map(
                                  (item, index) => (
                                    <th
                                      key={index}
                                      scope="col"
                                      className="px-6 py-3"
                                    >
                                      {item.title}
                                    </th>
                                  )
                                )}
                              </tr>
                            </thead>

                            <tbody>
                              {leaveTypes.length === 0
                                ? "No data found"
                                : leaveTypes.map((item, index) => (
                                    <tr key={index} className="bg-white ">
                                      <td className="px-6 py-4 tabl3Titl">
                                        {item?.name}
                                      </td>
                                      <td className="px-6 py-4 tabl3Titl">
                                        {item?.days}
                                      </td>
                                      <td className="px-6 py-4 flex hrmActions">
                                        {(hrmsSetupEditPermission ||
                                          role === "ADMIN") && (
                                          <img
                                            className="cursor-pointer"
                                            onClick={() => {
                                              setLeaveTypeValue1({
                                                days: item?.days,
                                                name: item?.name,
                                              });
                                              setId(item?._id);
                                              setPopup41(true);
                                            }}
                                            src={edited}
                                            alt=""
                                          />
                                        )}
                                        {(hrmsSetupDeletePermission ||
                                          role === "ADMIN") && (
                                          <img
                                            className="cursor-pointer"
                                            onClick={() => {
                                              handleDelete(
                                                item._id,
                                                "leaveType"
                                              );
                                            }}
                                            src={deleted}
                                            alt=""
                                          />
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {open === 4 && (
                    <div className="hrmsystemsetup-leftmenu">
                      <div className="hrmsystemsetup-container">
                        <div className="hrmsystemsetup-pagination">
                          <span>Lead Status</span>
                        </div>

                        <div className="relative overflow-x-auto">
                          <table className="w-full table3 text-left   text-[#060606]">
                            <thead className=" uppercase text-[#060606]">
                              <tr>
                                {sidebarItem[open].tableData.map(
                                  (item, index) => (
                                    <th
                                      key={index}
                                      scope="col"
                                      className="px-6 py-3"
                                    >
                                      {item.title}
                                    </th>
                                  )
                                )}
                              </tr>
                            </thead>

                            <tbody>
                              {allStatus.length === 0
                                ? "No data found"
                                : allStatus.map((item, index) => (
                                    <tr key={index} className="bg-white ">
                                      <td className="px-6 py-4 tabl3Titl">
                                        {item?.name}
                                      </td>
                                      <td className="px-6 py-4 flex hrmActions">
                                        {(hrmsSetupEditPermission ||
                                          role === "ADMIN") && (
                                          <img
                                            className="cursor-pointer"
                                            onClick={() => {
                                              setLeaveTypeValue1({
                                                days: item?.days,
                                                name: item?.name,
                                              });
                                              setId(item?._id);
                                              setPopup41(true);
                                            }}
                                            src={edited}
                                            alt=""
                                          />
                                        )}

                                        {(hrmsSetupDeletePermission ||
                                          role === "ADMIN") && (
                                          <img
                                            className="cursor-pointer"
                                            onClick={() => {
                                              handleDelete(
                                                item._id,
                                                "leaveType"
                                              );
                                            }}
                                            src={deleted}
                                            alt=""
                                          />
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {open === 5 && (
                    <div className="hrmsystemsetup-leftmenu">
                      <div className="hrmsystemsetup-container">
                        <div className="hrmsystemsetup-pagination">
                          <span>Industry</span>
                        </div>

                        <div className="relative overflow-x-auto">
                          <table className="w-full table3 text-left   text-[#060606]">
                            <thead className=" uppercase text-[#060606]">
                              <tr>
                                {sidebarItem[open].tableData.map(
                                  (item, index) => (
                                    <th
                                      key={index}
                                      scope="col"
                                      className="px-6 py-3"
                                    >
                                      {item.title}
                                    </th>
                                  )
                                )}
                              </tr>
                            </thead>

                            <tbody>
                              {allSource?.length === 0
                                ? "No data found"
                                : allSource?.map((item, index) => (
                                    <tr key={index} className="bg-white ">
                                      <td className="px-6 py-4 tabl3Titl">
                                        {item?.name}
                                      </td>
                                      <td className="px-6 py-4 flex hrmActions">
                                        {(hrmsSetupEditPermission ||
                                          role === "ADMIN") && (
                                          <img
                                            className="cursor-pointer"
                                            onClick={() => {
                                              setLeaveTypeValue1({
                                                days: item?.days,
                                                name: item?.name,
                                              });
                                              setId(item?._id);
                                              setPopup41(true);
                                            }}
                                            src={edited}
                                            alt=""
                                          />
                                        )}
                                        {(hrmsSetupDeletePermission ||
                                          role === "ADMIN") && (
                                          <img
                                            className="cursor-pointer"
                                            onClick={() => {
                                              handleDelete(
                                                item._id,
                                                "leaveType"
                                              );
                                            }}
                                            src={deleted}
                                            alt=""
                                          />
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="docSetupWrap">
                  <nav>
                    <h2>Documents Type</h2>
                    <button onClick={() => setDocPop(true)}>
                      <img src={plus} alt="" /> <span>Add New</span>
                    </button>
                  </nav>

                  <div className="hrmsystemsetup-leftmenu">
                    <div className="hrmsystemsetup-container">
                      <div className="hrmsystemsetup-pagination">
                        {/* <img src={frame1} alt="" /> */}
                        <span>Documents Type</span>
                      </div>

                      <div className="relative overflow-x-auto">
                        <table className="w-full table3 text-left text-[#060606]">
                          <thead className=" uppercase text-[#060606]">
                            <tr>
                              <th scope="col" className="px-6 tabl3had py-3">
                                {" "}
                                Documents{" "}
                              </th>
                              <th scope="col" className="px-6 tabl3had py-3">
                                {" "}
                                Required Field{" "}
                              </th>
                              <th scope="col" className="px-6 tabl3had py-3">
                                {" "}
                                Action{" "}
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {allDocs?.map((item, index) => (
                              <tr className="bg-white " key={index}>
                                <td className="px-6 py-4 tabl3Titl4">
                                  {item?.name}{" "}
                                </td>

                                <td className="px-6 py-4">
                                  <div className="seri">
                                    {item?.requiredField?.map((fi, index) => (
                                      <div
                                        className="px-6 py-4 requiFild"
                                        key={index}
                                      >
                                        {" "}
                                        <span>{fi}</span>{" "}
                                      </div>
                                    ))}
                                  </div>
                                </td>

                                <td className="px-6 py-4 flex hrmActions">
                                  <img
                                    className={"cursor-pointer"}
                                    onClick={() => {
                                      setDocPop(true);
                                      setDocdata({
                                        name: item?.name,
                                        requiredField: item?.requiredField,
                                        id: item?._id,
                                      });
                                      setIsUpdate(true);
                                    }}
                                    src={edited}
                                    alt=""
                                  />
                                  <img
                                    className="cursor-pointer"
                                    onClick={() => {
                                      deleteDoc(item?._id);
                                    }}
                                    src={deleted}
                                    alt=""
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <>
                  {/* Main modal */}

                  <div
                    style={styleing}
                    tabIndex={-1}
                    aria-hidden="true"
                    className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                  >
                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                      ={" "}
                      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        =
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Terms of Service
                          </h3>

                          {/* <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="default-modal"
                          >
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 14 14"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                              />
                            </svg>
                            <span className="sr-only">Close modal</span>
                          </button> */}
                        </div>
                        {/* Modal body */}
                        <div className="p-4 md:p-5 space-y-4">
                          <label>Name:</label>
                          <input type="text" name="" id="" />
                          {/* <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            With less than a month to go before the European
                            Union enacts new consumer privacy laws for its
                            citizens, companies around the world are updating
                            their terms of service agreements to comply.
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            The European Union’s General Data Protection
                            Regulation (G.D.P.R.) goes into effect on May 25 and
                            is meant to ensure a common set of data rights in
                            the European Union. It requires organizations to
                            notify users as soon as possible of high-risk data
                            breaches that could personally affect them.
                          </p> */}
                        </div>
                        {/* Modal footer */}
                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                          <button
                            onClick={() => setPopup(false)}
                            data-modal-hide="default-modal"
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => setPopup(false)}
                            data-modal-hide="default-modal"
                            type="button"
                            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                          >
                            Create
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              </div>
            </div>
          </div>
        </div>

        {popup1 && (
          <div className="allPopupWrap">
            <div className="popup1 pono0">
              <div className="popNav">
                <h2>New Branch</h2>
                <img onClick={() => setPopup1(false)} src={cross1} alt="" />
              </div>
              <hr />

              <label>
                <p className="popTitl">Branch</p>
                <input
                  type="text"
                  name="branch"
                  onChange={(e) => {
                    setBranch(e.target.value);
                  }}
                  value={branch}
                  placeholder="Enter Branch Name"
                />
              </label>

              <div className="btnWrap">
                <button className="create" onClick={handleCreateBranch}>
                  <span>Save</span>
                </button>

                <button className="cencel" onClick={() => setPopup1(false)}>
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {docPop && (
          <div className="allPopupWrap">
            <div className="popup1 pono10">
              <div className="popNav">
                <h2>Create New Document</h2>
                <img
                  onClick={() => {
                    setDocPop(false);
                    setIsUpdate(false);
                    setDocdata({
                      name: "",
                      requiredField: [],
                    });
                  }}
                  src={cross1}
                  alt=""
                />
              </div>
              <hr />

              <label>
                <p className="popTitl">Document Name</p>
                <input
                  type="text"
                  name="name"
                  onChange={(e) => {
                    setDocdata((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }));
                  }}
                  value={docData.name}
                />
              </label>

              <label>
                <p className="popTitl">Required Field</p>
                <Selectmultidropdown
                  setDocdata={setDocdata}
                  docData={docData}
                />
              </label>

              <div className="btnWrap">
                <button
                  className="create"
                  onClick={() => {
                    if (isUpdate) {
                      docUpdateHandler();
                    } else {
                      handleDocSave();
                    }
                  }}
                >
                  <span>{isUpdate ? "Update" : "Save"}</span>
                </button>

                <button
                  className="cencel"
                  onClick={() => {
                    setDocPop(false);
                    setIsUpdate(false);
                    setDocdata({
                      name: "",
                      requiredField: [],
                    });
                  }}
                >
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {popup11 && (
          <div className="allPopupWrap">
            <div className="popup1 pono0">
              <div className="popNav">
                <h2>Edit Branch</h2>
                <img onClick={() => setPopup11(false)} src={cross1} alt="" />
              </div>

              <hr />

              <label htmlFor="">
                <p className="popTitl">Name</p>
                <input
                  type="text"
                  name="branch1"
                  onChange={(e) => {
                    setBranch1(e.target.value);
                  }}
                  value={branch1}
                  placeholder="Enter Branch Name"
                />
              </label>

              <div className="btnWrap">
                <button className="cencel" onClick={() => setPopup11(false)}>
                  <span>Cancel</span>
                </button>

                <button className="create" onClick={handleUpdateBranch}>
                  <span>Update</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {popup2 && (
          <div className="allPopupWrap">
            <div className="popup1 pono2">
              <div className="popNav">
                <h2> New Department</h2>
                <img onClick={() => setPopup2(false)} src={cross1} alt="" />
              </div>

              <hr />

              <select
                className="selectBRANCH"
                value={departmentValue.branch}
                onChange={(e) => {
                  setDepartmentValue({
                    ...departmentValue,
                    branch: e.target.value,
                  });
                }}
                name="branch1"
                id="branch1"
              >
                <option value="">select Branch</option>

                {branches.map((e, index) => {
                  return (
                    <option key={index} value={e._id}>
                      {e.name}
                    </option>
                  );
                })}
              </select>

              <label>
                <p className="popTitl">Name</p>
                <input
                  type="text"
                  name="department1"
                  value={departmentValue.name}
                  onChange={(e) => {
                    setDepartmentValue({
                      ...departmentValue,
                      name: e.target.value,
                    });
                  }}
                  placeholder="Enter Department Name"
                />
              </label>

              <div className="btnWrap">
                <button className="cencel" onClick={() => setPopup2(false)}>
                  <span>Cancel</span>
                </button>

                <button className="create" onClick={handleCreateDepartment}>
                  <span>Create</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {popup21 && (
          <div className="allPopupWrap">
            <div className="popup1 pono2">
              <div className="popNav">
                <h2>Edit Department</h2>
                <img onClick={() => setPopup21(false)} src={cross1} alt="" />
              </div>
              <hr />
              <select
                className="selectBRANCH"
                value={departmentValue1.branch}
                onChange={(e) => {
                  setDepartmentValue1({
                    ...departmentValue1,
                    branch: e.target.value,
                  });
                }}
                name="branch1"
                id="branch1"
              >
                <option value="">select Branch</option>

                {branches.map((e, index) => {
                  return (
                    <option key={index} value={e._id}>
                      {e.name}
                    </option>
                  );
                })}
              </select>

              <label>
                <p className="popTitl">Name</p>
                <input
                  type="text"
                  name="department1"
                  value={departmentValue1.name}
                  onChange={(e) => {
                    setDepartmentValue1({
                      ...departmentValue1,
                      name: e.target.value,
                    });
                  }}
                  placeholder="Enter Department Name"
                />
              </label>

              <div className="btnWrap">
                <button className="cencel" onClick={() => setPopup21(false)}>
                  <span>Cancel</span>
                </button>

                <button className="create" onClick={handleUpdateDepartment}>
                  <span>Update</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {popup3 && (
          <div className="allPopupWrap">
            <div className="popup1 pono2">
              <div className="popNav">
                <h2>Create New Designation</h2>
                <img onClick={() => setPopup3(false)} src={cross1} alt="" />
              </div>

              <hr />
              <label>
                <p className="popTitl">Department</p>
                <select
                  className="selectBRANCH"
                  value={designationValue?.department}
                  onChange={(e) => {
                    setDesignationValue({
                      ...designationValue,
                      department: e.target.value,
                    });
                  }}
                >
                  <option value="" disabled>
                    Choose Department
                  </option>
                  {departments?.map((e, index) => {
                    return (
                      <option key={index} value={e?._id}>
                        {e?.name}
                      </option>
                    );
                  })}
                </select>
              </label>
              <label htmlFor="">
                <p className="popTitl">Name</p>
                <input
                  type="text"
                  placeholder="Enter Designation Name"
                  value={designationValue?.name}
                  onChange={(e) => {
                    setDesignationValue({
                      ...designationValue,
                      name: e.target.value,
                    });
                  }}
                />
              </label>

              <div className="btnWrap">
                <button className="cencel" onClick={() => setPopup3(false)}>
                  <span>Cancel</span>
                </button>

                <button className="create" onClick={handleCreateDesignation}>
                  <span>Create</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {popup31 && (
          <div className="allPopupWrap">
            <div className="popup1 pono2">
              <div className="popNav">
                <h2>Edit Designation</h2>
                <img onClick={() => setPopup31(false)} src={cross1} alt="" />
              </div>

              <hr />
              <label htmlFor>
                <p className="popTitl">Department</p>
                <select
                  className="selectBRANCH"
                  value={designationValue1?.department}
                  onChange={(e) => {
                    setDesignationValue1({
                      ...designationValue1,
                      department: e.target.value,
                    });
                  }}
                >
                  <option value="" disabled>
                    Choose Department
                  </option>
                  {departments?.map((e, index) => {
                    return (
                      <option key={index} value={e?._id}>
                        {e?.name}
                      </option>
                    );
                  })}
                </select>
              </label>
              <label htmlFor="">
                <p className="popTitl">Name</p>
                <input
                  type="text"
                  placeholder="Enter Designation Name"
                  value={designationValue1?.name}
                  onChange={(e) => {
                    setDesignationValue1({
                      ...designationValue1,
                      name: e.target.value,
                    });
                  }}
                />
              </label>

              <div className="btnWrap">
                <button className="cencel" onClick={() => setPopup31(false)}>
                  <span>Cancel</span>
                </button>

                <button className="create" onClick={handleUpdateDesignation}>
                  <span>Update</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {popup4 && (
          <div className="allPopupWrap">
            <div className="popup1 pono2">
              <div className="popNav">
                <h2>Create New Leave Type</h2>
                <img onClick={() => setPopup4(false)} src={cross1} alt="" />
              </div>
              <hr />
              <label htmlFor>
                <p className="popTitl">Leave Type</p>
                <input
                  type="text"
                  placeholder="Enter Leave Type Name"
                  name="name"
                  value={leaveTypeValue?.name}
                  onChange={(e) => {
                    setLeaveTypeValue({
                      ...leaveTypeValue,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </label>

              <label htmlFor="">
                <p className="popTitl">Days Per Year</p>
                <input
                  type="text"
                  placeholder="Enter Days / Year"
                  name="days"
                  value={leaveTypeValue?.days}
                  onChange={(e) => {
                    setLeaveTypeValue({
                      ...leaveTypeValue,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </label>

              <div className="btnWrap">
                <button className="cencel" onClick={() => setPopup4(false)}>
                  <span>Cancel</span>
                </button>

                <button className="create" onClick={handleCreateLeaveType}>
                  <span>Create</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {popup41 && (
          <div className="allPopupWrap">
            <div className="popup1 pono2">
              <div className="popNav">
                <h2>Edit Leave Type </h2>
                <img onClick={() => setPopup41(false)} src={cross1} alt="" />
              </div>

              <hr />
              <label htmlFor>
                <p className="popTitl">Leave Type</p>
                <input
                  type="text"
                  placeholder="Enter Leave Type Name"
                  name="name"
                  value={leaveTypeValue1?.name}
                  onChange={(e) => {
                    setLeaveTypeValue1({
                      ...leaveTypeValue1,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </label>

              <label htmlFor="">
                <p className="popTitl">Days Per Year</p>
                <input
                  type="text"
                  placeholder="Enter Days / Year"
                  name="days"
                  value={leaveTypeValue1?.days}
                  onChange={(e) => {
                    setLeaveTypeValue1({
                      ...leaveTypeValue1,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </label>

              <div className="btnWrap">
                <button className="cencel" onClick={() => setPopup41(false)}>
                  <span>Cancel</span>
                </button>

                <button className="create" onClick={handleUpdateLeaveType}>
                  <span>Update</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {popup5 && (
          <div className="allPopupWrap">
            <div className="popup1 popup5 pono2">
              <div className="popNav">
                <h2>Create New Lead Status</h2>
                <img onClick={() => setPopup5(false)} src={cross1} alt="" />
              </div>
              <hr />
              <label>
                <p className="popTitl">Lead Status</p>

                <input
                  type="text"
                  placeholder="Enter Leave Type Name"
                  name="status"
                  value={leadStatus?.status}
                  onChange={(e) => {
                    setLeadStatus({
                      ...leadStatus,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </label>

              <div className="btnWrap">
                <button className="cencel" onClick={() => setPopup5(false)}>
                  <span>Cancel</span>
                </button>

                <button className="create" onClick={handleCreateLeadStatus}>
                  <span>Create</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {popup6 && (
          <div className="allPopupWrap">
            <div className="popup1 popup5 pono2">
              <div className="popNav">
                <h2>Create New Lead Source</h2>
                <img onClick={() => setPopup6(false)} src={cross1} alt="" />
              </div>
              <hr />
              <label>
                <p className="popTitl">Lead Source</p>

                <input
                  type="text"
                  placeholder="Enter Leave Type Name"
                  name="status"
                  value={leadSource?.status}
                  onChange={(e) => {
                    setLeadSource({
                      ...leadSource,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </label>

              <div className="btnWrap">
                <button className="cencel" onClick={() => setPopup6(false)}>
                  <span>Cancel</span>
                </button>

                <button className="create" onClick={handleCreateLeadSource}>
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
