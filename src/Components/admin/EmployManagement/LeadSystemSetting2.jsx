import React, { useState, useEffect } from "react";
import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import "./HRMsystem.css";
import deleted from "../../images/deleted.png";
import edited from "../../images/edited.png";
import textType from "../../images/Text Type.png";
import hub3 from "../../images/hub3.png";
import cross1 from "../../images/cross1.png";
import toast from "react-hot-toast";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";

const sidebarItem = [
  {
    title: "Industry",
    img: hub3,
    tableData: [
      {
        title: "INDUSTRY",
      },
      {
        title: "ACTION",
      },
    ],
  },
  {
    title: "Lead Source",
    img: hub3,
    tableData: [
      {
        title: "SOURCE",
      },

      {
        title: "ACTION",
      },
    ],
  },
  {
    title: "Lead Status",
    img: hub3,
    tableData: [
      {
        title: "STATUS",
      },

      {
        title: "ACTION",
      },
    ],
  },
  {
    title: "Follow Up",
    img: hub3,
    tableData: [
      {
        title: "FOLLOW-UP",
      },

      {
        title: "ACTION",
      },
    ],
  },
];

const LeadSystemSetting = ({ setAlert, pop, setPop }) => {

  const {
    user,
    postLeadStatus,
    postLeadSource2,
    AllLeadStatus,
    AllLeadSource,
    deleteIndustry,
    deleteLeadSource,
    updateLeadSource,
    updateIndustry,
    getLeadStat,
    postLeadStat,
    updateLeadStat,
    deleteLeadStat , 
    postFollowUp, updateFollowUp , deleteFollowUp , getFollowUp , 
  } = useMain();

  const [open, setOpen] = useState(0);

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));
  let hrms_permission = JSON.parse(localStorage.getItem("hrms_permission"));


    const {role} = hrms_user;
    const { leadSystemSettingEditPermission , leadSystemSettingDeletePermission , leadSystemSettingCreatePermission} = hrms_permission;


  const [popup, setPopup] = useState(false);

  const styleing = {
    display: popup ? "block" : "none",
  };

  const [allStatus, setAllStatus] = useState([]);
  const [allSource, setAllSource] = useState([]);
  const [allStat, setAllStat] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const fetchAllStatus = async () => {
    const ans = await AllLeadStatus();
    setAllStatus(ans?.data);
  };
  const fetchAllSource = async () => {
    const ans = await AllLeadSource();
    setAllSource(ans?.data);
  };

  const fetchAllStat = async () => {
    const ans = await getLeadStat();
    setAllStat(ans?.data);
  }

  useEffect(() => {
    fetchAllStatus();
    fetchAllSource();
    fetchAllStat();
  }, [refreshFlag]);

  const [popup5, setPopup5] = useState(false);
  const [popup6, setPopup6] = useState(false);
  const [popup7, setPopup7] = useState(false);
  const [popup8, setPopup8] = useState(false);

  const [id, setId] = useState("");

  const [leadStatus, setLeadStatus] = useState({
    status: "",
  });
  const [leadSource, setLeadSource] = useState({
    status: "",
  });

  const [leadStat, setLeadStat] = useState({
    name: "",
  })

  
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

  const handleCreateLeadStat = async () => {
    const toastId = toast.loading("Loading...");
    const ans = await postLeadStat({
      name: leadStat?.name,
    });

    setRefreshFlag(!refreshFlag)

    if (ans.status) {
      toast.success("success");
      fetchAllStat();
      setLeadStat("");
      setPopup7(false);
    }

    toast.dismiss(toastId);

   
  };


  const deleteIndustryHandler = async (id) => {
    const ans = await deleteIndustry(id);
    if (ans?.success) {
      toast.success("Delete Succesfuly");
      fetchAllStatus();
    }
  };

  const deleteLeadSourceHandler = async (id) => {
    const ans = await deleteLeadSource(id);
    if (ans?.success) {
      toast.success("Delete Succesfuly");
      fetchAllSource();
    }
  };

  const deleteLeadStatHandler = async (id) => {
    const ans = await deleteLeadStat(id);
    if (ans?.success) {
      toast.success("Delete Succesfuly");
      fetchAllStat();
    }
  };

  const [isIndusUpat, setIsInuP] = useState(false);
  const [isLeSrc, setIsLdSrc] = useState(false);
  const [allFollow , setAllFollow] = useState([]);

  const [isStat, setIsStat] = useState(false);

  const getFollow = async()=>{
    const ans = await getFollowUp();
     if(ans?.success){
      setAllFollow(ans?.data);
     }
  }

  const CreateFollow = async()=>{
    const ans = await postFollowUp({name:leadStat.name});
     if(ans?.success){
      toast.success("Successfuly created");
     }
     getFollow();
     setIsStat(false);
     setLeadStat((prev) => ({
       ...prev,
       name: ""
     }))
     setPopup8(false);
  }

  const deleteFollowHandler = async(id)=>{
    const ans = await deleteFollowUp(id);
     if(ans?.success){
      toast.success('Successfult deleted');
     }
     getFollow();
     setIsStat(false);
     setLeadStat((prev) => ({
       ...prev,
       name: ""
     }))
     setPopup8(false);
  }

  const updateFollow = async()=>{
    const ans = await updateFollowUp({id:isStat , name:leadStat.name});
    if(ans?.success){
      toast.success("Successfuly updated");
    }
    getFollow();
    setIsStat(false);
    setLeadStat((prev) => ({
      ...prev,
      name: ""
    }))
    setPopup8(false);

  }

  const updateLeadSourceHandler = async () => {
    const ans = await updateLeadSource({
      id: isLeSrc,
      name: leadSource?.status,
    });
    if (ans?.success) {
      toast.success("updated Succesfuly");
      fetchAllSource();
      setIsLdSrc(false);
      setLeadSource((prev) => ({
        ...prev,
        status: ""
      }))
      setPopup6(false);
    }
  };

  const updateIndustryHandler = async (id) => {
    const ans = await updateIndustry({
      id: isIndusUpat,
      name: leadStatus?.status,
    });
    if (ans?.success) {
      toast.success("updated Succesfuly");
      fetchAllStatus();
      setIsInuP(false);
      setPopup5(false);
      setLeadStatus((prev) => ({
        ...prev,
        status: ""
      }))
    }
  };

  const updateLeadStatusHandler = async () => {
    const ans = await updateLeadStat({
      id: isStat,
      name: leadStat?.name,
    });
    if (ans?.success) {
      toast.success("updated Succesfuly");
      fetchAllStat();
      setIsStat(false);
      setLeadStat((prev) => ({
        ...prev,
        name: ""
      }))
      setPopup7(false);
    }
  };

  useEffect(()=>{
    getFollow();
    },[])

  return (
    <>
      <div className="employee-dash h-full">
        <EmployeeSidebar pop={pop} setPop={setPop} />

        <div className="tm">
          <EmployeeNavbar user={user} setAlert={setAlert} />

          <div className="em">
            <div className="flex-col">
              <div className="admin-main">

                <div className="plusSec">
                  <h3>Lead System Setting</h3>

                  {
                    (leadSystemSettingCreatePermission || role === "ADMIN") && 
                  
                  <button
                    onClick={() => {
                      console.log("optin", open);

                      if (open === 0) {
                        setPopup5(true);
                      } else if (open === 1) {
                        setPopup6(true);
                      }
                      else if (open === 2) {
                        setPopup7(true);
                      }
                      else if (open === 3) {
                        setPopup8(true);
                      }
                    }}
                  >
                    <img src={textType} alt="" /> <span>Add New</span>
                  </button>

}
                </div>

                <div className="hrmssystemsetup-parents">

                  <div className="hrmssystemsetup-rightmenu">
                    {sidebarItem.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => setOpen(index)}
                        className={`hrmsystemsetup-subrightmenu ${open === index && "openItem"
                          } `}
                      >
                        <img src={item.img} alt="" />
                        <span>{item.title}</span>
                      </div>
                    ))}
                  </div>

                  {open === 0 && (
                    <div className="hrmsystemsetup-leftmenu">
                      <div className="hrmsystemsetup-container">
                        <div className="hrmsystemsetup-pagination">
                          {/* <img src={frame1} alt="" /> */}
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
                              {allStatus.length === 0
                                ? "No data found"
                                : allStatus.map((item, index) => (
                                  <tr key={index} className="bg-white ">
                                    <td className="px-6 py-4 tabl3Titl">
                                      {item?.name}
                                    </td>
                                    <td className="px-6 py-4 flex hrmActions">       
                                 
                                 {
                                  (leadSystemSettingEditPermission || role === "ADMIN") && 
                                    <img
                                        className="cursor-pointer"
                                        onClick={() => {
                                          setPopup5(true);
                                          setIsInuP(item?._id);
                                          setLeadStatus((prev) => ({
                                            ...prev,
                                            status: item?.name,
                                          }));
                                        }}
                                        src={edited}
                                        alt=""
                                      />

}

{
  (leadSystemSettingDeletePermission || role === "ADMIN") && 


                                      <img
                                        className="cursor-pointer"
                                        onClick={(e) => {
                                          deleteIndustryHandler(item?._id);
                                        }}
                                        src={deleted}
                                        alt=""
                                      />

}
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
                          <span>Lead Source</span>
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
                                    {
                                (leadSystemSettingEditPermission || role === "ADMIN") &&
                                    
                                      <img
                                        className="cursor-pointer"
                                        onClick={() => {
                                          setPopup6(true);
                                          setIsLdSrc(item?._id);
                                          setLeadSource((prev) => ({
                                            ...prev,
                                            status: item?.name,
                                          }));
                                        }}
                                        src={edited}
                                        alt=""
                                      />

}
{
   (leadSystemSettingDeletePermission || role ==="ADMIN") && 

                                      <img
                                        className="cursor-pointer"
                                        onClick={() => {
                                          deleteLeadSourceHandler(item?._id);
                                        }}
                                        src={deleted}
                                        alt=""
                                      />
}
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
                              {allStat?.length === 0
                                ? "No data found"
                                : allStat?.map((item, index) => (
                                  <tr key={index} className="bg-white ">
                                    <td className="px-6 py-4 tabl3Titl">
                                      {item?.name}
                                    </td>
                                    <td className="px-6 py-4 flex hrmActions">
                                    {
                                      (leadSystemSettingEditPermission || role === "ADMIN") && 
                                    
                                      <img
                                        className="cursor-pointer"
                                        onClick={() => {
                                          setPopup7(true);
                                          setIsStat(item?._id);
                                          setLeadStat((prev) => ({
                                            ...prev,
                                            name: item?.name,
                                          }));
                                        }}
                                        src={edited}
                                        alt=""
                                      />
}

{
  (leadSystemSettingDeletePermission || role === "ADMIN") && 

                                      <img
                                        className="cursor-pointer"
                                        onClick={() => {
                                          deleteLeadStatHandler(item?._id);
                                        }}
                                        src={deleted}
                                        alt=""
                                      />
}
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
                          <span>Follow-up</span>
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
                              {allFollow?.length === 0
                                ? "No data found"
                                : allFollow?.map((item, index) => (
                                  <tr key={index} className="bg-white ">
                                    <td className="px-6 py-4 tabl3Titl">
                                      {item?.name}
                                    </td>
                                    <td className="px-6 py-4 flex hrmActions">
{
  (leadSystemSettingEditPermission || role === "ADMIN") && 

                                      <img
                                        className="cursor-pointer"
                                        onClick={() => {
                                          setPopup8(true);
                                          setIsStat(item?._id);
                                          setLeadStat((prev) => ({
                                            ...prev,
                                            name: item?.name,
                                          }));
                                        }}
                                        src={edited}
                                        alt=""
                                      />
}
{
  (leadSystemSettingDeletePermission || role === "ADMIN") && 

                                      <img
                                        className="cursor-pointer"
                                        onClick={() => {
                                          deleteFollowHandler(item?._id);
                                        }}
                                        src={deleted}
                                        alt=""
                                      />
}
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

        {popup5 && (
          <div className="allPopupWrap">
            <div className="popup1 popup5 pono2">
              <div className="popNav">
                <h2>Create New Industry</h2>
                <img
                  onClick={() => {
                    setPopup5(false);
                    setIsInuP(false);
                    setLeadStatus((prev) => ({
                      ...prev,
                      status: "",
                    }));
                  }}
                  src={cross1}
                  alt=""
                />
              </div>
              <hr />
              <label>
                <p className="popTitl">Industry</p>

                <input
                  type="text"
                  placeholder="Enter Industry"
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
                <button
                  className="cencel"
                  onClick={() => {
                    setPopup5(false);
                    setIsInuP(false);
                    setLeadStatus((prev) => ({
                      ...prev,
                      status: "",
                    }));
                  }}
                >
                  <span>Cancel</span>
                </button>

                <button
                  className="create"
                  onClick={
                    isIndusUpat ? updateIndustryHandler : handleCreateLeadStatus
                  }
                >
                  <span>{isIndusUpat ? "Update" : "Create"}</span>
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
                <img
                  onClick={() => {
                    setPopup6(false);
                    setIsLdSrc(false);
                    setLeadSource((prev) => ({
                      ...prev,
                      status: "",
                    }));
                  }}
                  src={cross1}
                  alt=""
                />
              </div>
              <hr />
              <label>
                <p className="popTitl">Lead Source</p>

                <input
                  type="text"
                  placeholder="Enter Lead Source"
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
                <button
                  className="cencel"
                  onClick={() => {
                    setPopup6(false);
                    setIsLdSrc(false);
                    setLeadSource((prev) => ({
                      ...prev,
                      status: "",
                    }));
                  }}
                >
                  <span>Cancel</span>
                </button>

                <button
                  className="create"
                  onClick={
                    isLeSrc ? updateLeadSourceHandler : handleCreateLeadSource
                  }
                >
                  <span>{isLeSrc ? "Update" : "Create"}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {popup7 && (
          <div className="allPopupWrap">
            <div className="popup1 popup5 pono2">
              <div className="popNav">
                <h2>Create New Lead Status</h2>
                <img
                  onClick={() => {
                    setPopup7(false);
                    setIsStat(false);
                    setLeadStat((prev) => ({
                      ...prev,
                      name: "",
                    }));
                  }}
                  src={cross1}
                  alt=""
                />
              </div>
              <hr />
              <label>
                <p className="popTitl">Lead Status</p>

                <input
                  type="text"
                  placeholder="Enter Lead Status"
                  name="name"
                  value={leadStat?.name}
                  onChange={(e) => {
                    setLeadStat({
                      ...leadStat,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </label>

              <div className="btnWrap">
                <button
                  className="cencel"
                  onClick={() => {
                    setPopup7(false);
                    setIsStat(false);
                    setLeadStat((prev) => ({
                      ...prev,
                      name: "",
                    }));
                  }}
                >
                  <span>Cancel</span>
                </button>

                <button
                  className="create"
                  onClick={ 
                    isStat ? updateLeadStatusHandler : handleCreateLeadStat
                  }
                >
                  <span onClick={()=>{
                    setIsStat(false)
                    setPopup7(false)
                  }}>{isStat ? "Update" : "Create"}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {popup8 && (
          <div className="allPopupWrap">
            <div className="popup1 popup5 pono2">
              <div className="popNav">
                <h2>Create New Follow Up</h2>
                <img
                  onClick={() => {
                    setPopup8(false);
                    setIsStat(false);
                    setLeadStat((prev) => ({
                      ...prev,
                      name: "",
                    }));
                  }}
                  src={cross1}
                  alt=""
                />
              </div>
              <hr />
              <label>
                <p className="popTitl">Follow-up</p>

                <input
                  type="text"
                  placeholder="Enter FollowUp"
                  name="name"
                  value={leadStat?.name}
                  onChange={(e) => {
                    setLeadStat({
                      ...leadStat,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </label>

              <div className="btnWrap">
                <button
                  className="cencel"
                  onClick={() => {
                    setPopup7(false);
                    setIsStat(false);
                    setLeadStat((prev) => ({
                      ...prev,
                      name: "",
                    }));
                  }}
                >
                  <span>Cancel</span>
                </button>

                <button
                  className="create"
                  onClick={ 
                    isStat ? updateFollow : CreateFollow
                  }
                >
                  <span onClick={()=>{
                    setIsStat(false)
                    setPopup8(false)
                  }}>{isStat ? "Update" : "Create"}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default LeadSystemSetting;
