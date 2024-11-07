import React, { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import siy from "../../images/siy.png";
import { NavLink, useNavigate } from "react-router-dom";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";
import toast from "react-hot-toast";
import OutsideClickHandler from "react-outside-click-handler";
import moreVert from "../../images/more_vert.png";
import edit from "../../images/edit.png";
import delete4 from "../../images/delete.png";
import { confirmAlert } from 'react-confirm-alert'; // Import


const LeadDash2 = ({ setAlert, pop, setPop }) => {
  const {
    user,
    getLead,
    getTaskApi,
    getMeetApi,
    deleteTaskapi,
    deleteMeetapi,
    deleteLeads , 
    GetOpenLeadsApi
  } = useMain();

  const [start1, setStart1] = useState(false);
  const [start3, setStart3] = useState(false);

  const stylePeer2 = {
    display: start1 ? "block" : "none",
  };

  const stylePeer4 = {
    display: start3 ? "block" : "none",
  };

  const [totalMyLead, setTotalMyLead] = useState(0);

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));



  const [totalOpenLead , setTotalOpenLead] = useState(0);
  const [totalCloseLead , setTotalCloseLead] = useState(0);

  const GetOpenLeads = async()=>{

    const ans = await GetOpenLeadsApi({id:hrms_user?._id});

     if(ans?.status){
      setTotalOpenLead(ans?.openLeads?.length);
      setTotalCloseLead(ans?.closeLead?.length);
     }


  }

  const [allTask, setAllTask] = useState([]);
  const [allMeet, setAllMeet] = useState([]);

  const [allLeads, setAllLeads] = useState([]);
  const [optionedit, setOptionEdit] = useState(null);


  const navigate = useNavigate();

  const fetchLead = async () => {
    const ans = await getLead("", "", "", "");
    if (ans?.data) {
      setTotalMyLead(ans?.data?.length);
      setAllLeads(ans?.data);
    }
  };

  const fetchTask = async () => {
    const data = await getTaskApi({ userId: hrms_user?._id });
    if (data?.status) {
      setAllTask(data?.allTask);
    }
  };

  const fetchMeet = async () => {
    const data = await getMeetApi({ userId: hrms_user?._id });
    if (data?.status) {
      setAllMeet(data?.allMeet);
    }
  };

  const deleteTask = async (id) => {
    const toastId = toast.loading("Loading...");
    const ans = await deleteTaskapi({ taskId: id });
    if (ans?.status) {
      toast.success("Succesfully deleted");
      fetchTask();
    }
    toast.dismiss(toastId);
  };

  const deleteMeet = async (id) => {
    const toastId = toast.loading("Loading...");
    const ans = await deleteMeetapi({ meetId: id });
    if (ans?.status) {
      toast.success("Succesfully deleted");
      fetchMeet();
    }
    toast.dismiss(toastId);
  };

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
            await deleteLeads(id);
            toast.success("delete Successfully");
            fetchLead();
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
    fetchLead();
    fetchTask();
    fetchMeet();
    GetOpenLeads();
  }, []);

  const convertTo12HourFormat = (time) => {
    const [hours, minutes] = time.split(':');
    const intHours = parseInt(hours, 10);
    const amPm = intHours >= 12 ? 'PM' : 'AM';
    const adjustedHours = intHours % 12 || 12; // Convert 0 to 12 for 12 AM
    return `${adjustedHours}:${minutes} ${amPm}`;
  };

  return (
    <>
      <div className="employee-dash h-full">
        <EmployeeSidebar pop={pop} setPop={setPop} />
        <div className="tm">
          <EmployeeNavbar user={user} setAlert={setAlert} />

          <div className="em">
            <div className="leadThings">
              <div className="lead_content1">
                <h2>Lead Management</h2>
                <p>Real-time insights and performance overview</p>
              </div>
              <div className="lead_content2">
                <div className="leads_btn">
                  <button
                    onClick={() =>
                      (window.location.href = "/employeeDash/leadDash")
                    }
                    className="refresh"
                  >
                    <span className="ref1">Refresh</span>{" "}
                    <svg
                      width="20"
                      height="14"
                      viewBox="0 0 20 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 5.99999H5.101L5.102 5.99099C5.23257 5.35162 5.48813 4.74434 5.854 4.20399C6.39845 3.4018 7.16215 2.77315 8.054 2.39299C8.356 2.26499 8.671 2.16699 8.992 2.10199C9.65789 1.96698 10.3441 1.96698 11.01 2.10199C11.967 2.29808 12.8451 2.7714 13.535 3.46299L14.951 2.05099C14.3128 1.41262 13.5578 0.903028 12.727 0.549986C12.3033 0.370615 11.8628 0.233939 11.412 0.141986C10.4818 -0.0470031 9.52316 -0.0470031 8.593 0.141986C8.14185 0.23432 7.70101 0.371329 7.277 0.550986C6.02753 1.08109 4.95793 1.96108 4.197 3.08499C3.68489 3.84284 3.32676 4.69398 3.143 5.58999C3.115 5.72499 3.1 5.86299 3.08 5.99999H0L4 9.99999L8 5.99999ZM12 7.99999H14.899L14.898 8.00799C14.6367 9.28975 13.8812 10.4171 12.795 11.146C12.2548 11.5122 11.6475 11.7677 11.008 11.898C10.3424 12.033 9.65656 12.033 8.991 11.898C8.35163 11.7674 7.74435 11.5119 7.204 11.146C6.93862 10.9665 6.69085 10.7622 6.464 10.536L5.05 11.95C5.68851 12.5882 6.44392 13.0974 7.275 13.45C7.699 13.63 8.142 13.767 8.59 13.858C9.51982 14.0471 10.4782 14.0471 11.408 13.858C13.2005 13.4859 14.7773 12.4294 15.803 10.913C16.3146 10.1557 16.6724 9.30525 16.856 8.40999C16.883 8.27499 16.899 8.13699 16.919 7.99999H20L16 3.99999L12 7.99999Z"
                        fill="#0B56E4"
                      />
                    </svg>
                  </button>
                  <NavLink to="/employeeDash/myLead">
                    <button className="lead_btn">My Leads</button>
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="lead_dash_cards">
              <div className="lead_dash_card">
                <div className="lead_dash_box sing11">
                  <div className="lead_contents">
                    <svg
                      width="42"
                      height="43"
                      viewBox="0 0 42 43"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        y="0.5"
                        width="42"
                        height="42"
                        rx="8"
                        fill="url(#paint0_linear_410_608)"
                      />
                      <path
                        d="M29 15.5H26V13.5C26 12.397 25.103 11.5 24 11.5H18C16.897 11.5 16 12.397 16 13.5V15.5H13C11.897 15.5 11 16.397 11 17.5V28.5C11 29.603 11.897 30.5 13 30.5H29C30.103 30.5 31 29.603 31 28.5V17.5C31 16.397 30.103 15.5 29 15.5ZM24 13.5V15.5H18V13.5H24ZM17 17.5H29V20.5H13V17.5H17ZM13 28.5V22.5H19V24.5H23V22.5H29L29.001 28.5H13Z"
                        fill="#0B56E4"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_410_608"
                          x1="1"
                          y1="5.5"
                          x2="38.5"
                          y2="39"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#D1E8FD" />
                          <stop offset="1" stop-color="#EDEFFF" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="lead_contens1">
                    <h3>My Open Deals</h3>
                    <h1>{totalOpenLead}</h1>
                  </div>
                </div>
                <div className="lead_dash_box sing111">
                  <div className="lead_contents">
                    <svg
                      width="42"
                      height="43"
                      viewBox="0 0 42 43"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        y="0.5"
                        width="42"
                        height="42"
                        rx="8"
                        fill="url(#paint0_linear_497_5769)"
                      />
                      <path
                        d="M30.707 20.793L28.707 18.793L28 18.086V15.5C28 15.2348 27.8947 14.9804 27.7071 14.7929C27.5196 14.6053 27.2652 14.5 27 14.5H24.414L23.707 13.793L21.707 11.793C21.6142 11.7 21.504 11.6263 21.3827 11.576C21.2614 11.5257 21.1314 11.4998 21 11.4998C20.8687 11.4998 20.7386 11.5257 20.6173 11.576C20.496 11.6263 20.3858 11.7 20.293 11.793L18.293 13.793L17.586 14.5H15C14.7348 14.5 14.4804 14.6053 14.2929 14.7929C14.1054 14.9804 14 15.2348 14 15.5V18.086L13.293 18.793L11.293 20.793C11.2001 20.8858 11.1263 20.996 11.076 21.1173C11.0257 21.2386 10.9998 21.3687 10.9998 21.5C10.9998 21.6313 11.0257 21.7614 11.076 21.8827C11.1263 22.004 11.2001 22.1142 11.293 22.207L13.293 24.207L14 24.914V27.5C14 27.7652 14.1054 28.0196 14.2929 28.2071C14.4804 28.3946 14.7348 28.5 15 28.5H17.586L18.293 29.207L20.293 31.207C20.3857 31.3002 20.4958 31.3741 20.6172 31.4246C20.7385 31.475 20.8686 31.501 21 31.501C21.1314 31.501 21.2615 31.475 21.3829 31.4246C21.5042 31.3741 21.6144 31.3002 21.707 31.207L23.707 29.207L24.414 28.5H27C27.2652 28.5 27.5196 28.3946 27.7071 28.2071C27.8947 28.0196 28 27.7652 28 27.5V24.914L28.707 24.207L30.707 22.207C30.8 22.1142 30.8737 22.004 30.924 21.8827C30.9743 21.7614 31.0002 21.6313 31.0002 21.5C31.0002 21.3687 30.9743 21.2386 30.924 21.1173C30.8737 20.996 30.8 20.8858 30.707 20.793ZM26.293 23.793L26 24.086V26.5H23.586L23.293 26.793L22.293 27.793L21 29.086L19.707 27.793L18.707 26.793L18.414 26.5H16V24.086L15.707 23.793L14.707 22.793L13.414 21.5L14.707 20.207L15.707 19.207L16 18.914V16.5H18.414L18.707 16.207L19.707 15.207L21 13.914L22.293 15.207L23.293 16.207L23.586 16.5H26V18.914L26.293 19.207L27.293 20.207L28.586 21.5L27.293 22.793L26.293 23.793Z"
                        fill="#0B56E4"
                      />
                      <path
                        d="M21 17.5V25.5C23.206 25.5 25 23.706 25 21.5C25 19.294 23.206 17.5 21 17.5Z"
                        fill="#0B56E4"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_497_5769"
                          x1="1"
                          y1="5.5"
                          x2="38.5"
                          y2="39"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#D1E8FD" />
                          <stop offset="1" stop-color="#EDEFFF" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="lead_contens1">
                    <h3>My Untouched Deals</h3>
                    <h1>{totalCloseLead}</h1>
                  </div>
                </div>
                {/* <div className="lead_dash_box sing1111">
                  <div className="lead_contents">
                    <svg
                      width="42"
                      height="43"
                      viewBox="0 0 42 43"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        y="0.5"
                        width="42"
                        height="42"
                        rx="8"
                        fill="url(#paint0_linear_497_5780)"
                      />
                      <path
                        d="M25.57 31.5C25.8356 31.5015 26.0988 31.4501 26.3443 31.3488C26.5898 31.2475 26.8127 31.0984 27 30.91L29.71 28.2C29.8962 28.0126 30.0008 27.7592 30.0008 27.495C30.0008 27.2308 29.8962 26.9774 29.71 26.79L25.71 22.79C25.5226 22.6037 25.2692 22.4992 25.005 22.4992C24.7408 22.4992 24.4873 22.6037 24.3 22.79L22.7 24.38C21.5922 24.0846 20.5663 23.5409 19.7 22.79C18.9511 21.9223 18.4076 20.8968 18.11 19.79L19.7 18.19C19.8862 18.0026 19.9908 17.7492 19.9908 17.485C19.9908 17.2208 19.8862 16.9674 19.7 16.78L15.7 12.78C15.5126 12.5937 15.2592 12.4892 14.995 12.4892C14.7308 12.4892 14.4773 12.5937 14.29 12.78L11.59 15.5C11.4016 15.6872 11.2524 15.9101 11.1511 16.1556C11.0498 16.4012 10.9984 16.6644 11 16.93C11.0907 20.7723 12.626 24.4393 15.3 27.2C18.0607 29.8739 21.7277 31.4093 25.57 31.5ZM15 14.91L17.59 17.5L16.3 18.79C16.1778 18.9044 16.0863 19.0477 16.0339 19.2067C15.9815 19.3657 15.9698 19.5353 16 19.7C16.3737 21.3704 17.1651 22.9186 18.3 24.2C19.5803 25.3363 21.129 26.1279 22.8 26.5C22.9621 26.5339 23.1302 26.527 23.289 26.4798C23.4479 26.4327 23.5925 26.3469 23.71 26.23L25 24.91L27.59 27.5L25.59 29.5C22.2737 29.4146 19.1095 28.0911 16.72 25.79C14.4129 23.3995 13.0856 20.2311 13 16.91L15 14.91ZM29 20.5H31C31.0259 19.311 30.8108 18.129 30.3677 17.0254C29.9246 15.9217 29.2626 14.9192 28.4217 14.0783C27.5807 13.2373 26.5782 12.5754 25.4746 12.1322C24.3709 11.6891 23.189 11.4741 22 11.5V13.5C22.9279 13.4679 23.8525 13.627 24.7163 13.9674C25.5801 14.3078 26.3646 14.8223 27.0211 15.4788C27.6777 16.1353 28.1921 16.9199 28.5325 17.7837C28.873 18.6475 29.0321 19.5721 29 20.5Z"
                        fill="#0B56E4"
                      />
                      <path
                        d="M22 17.5C24.1 17.5 25 18.4 25 20.5H27C27 17.28 25.22 15.5 22 15.5V17.5Z"
                        fill="#0B56E4"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_497_5780"
                          x1="1"
                          y1="5.5"
                          x2="38.5"
                          y2="39"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#D1E8FD" />
                          <stop offset="1" stop-color="#EDEFFF" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="lead_contens1">
                    <h3>My Calls Today</h3>
                    <h1>120</h1>
                  </div>
                </div> */}
                <div className="lead_dash_box sing11111">
                  <div className="lead_contents">
                    <svg
                      width="42"
                      height="43"
                      viewBox="0 0 42 43"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        y="0.5"
                        width="42"
                        height="42"
                        rx="8"
                        fill="url(#paint0_linear_497_5769)"
                      />
                      <path
                        d="M30.707 20.793L28.707 18.793L28 18.086V15.5C28 15.2348 27.8947 14.9804 27.7071 14.7929C27.5196 14.6053 27.2652 14.5 27 14.5H24.414L23.707 13.793L21.707 11.793C21.6142 11.7 21.504 11.6263 21.3827 11.576C21.2614 11.5257 21.1314 11.4998 21 11.4998C20.8687 11.4998 20.7386 11.5257 20.6173 11.576C20.496 11.6263 20.3858 11.7 20.293 11.793L18.293 13.793L17.586 14.5H15C14.7348 14.5 14.4804 14.6053 14.2929 14.7929C14.1054 14.9804 14 15.2348 14 15.5V18.086L13.293 18.793L11.293 20.793C11.2001 20.8858 11.1263 20.996 11.076 21.1173C11.0257 21.2386 10.9998 21.3687 10.9998 21.5C10.9998 21.6313 11.0257 21.7614 11.076 21.8827C11.1263 22.004 11.2001 22.1142 11.293 22.207L13.293 24.207L14 24.914V27.5C14 27.7652 14.1054 28.0196 14.2929 28.2071C14.4804 28.3946 14.7348 28.5 15 28.5H17.586L18.293 29.207L20.293 31.207C20.3857 31.3002 20.4958 31.3741 20.6172 31.4246C20.7385 31.475 20.8686 31.501 21 31.501C21.1314 31.501 21.2615 31.475 21.3829 31.4246C21.5042 31.3741 21.6144 31.3002 21.707 31.207L23.707 29.207L24.414 28.5H27C27.2652 28.5 27.5196 28.3946 27.7071 28.2071C27.8947 28.0196 28 27.7652 28 27.5V24.914L28.707 24.207L30.707 22.207C30.8 22.1142 30.8737 22.004 30.924 21.8827C30.9743 21.7614 31.0002 21.6313 31.0002 21.5C31.0002 21.3687 30.9743 21.2386 30.924 21.1173C30.8737 20.996 30.8 20.8858 30.707 20.793ZM26.293 23.793L26 24.086V26.5H23.586L23.293 26.793L22.293 27.793L21 29.086L19.707 27.793L18.707 26.793L18.414 26.5H16V24.086L15.707 23.793L14.707 22.793L13.414 21.5L14.707 20.207L15.707 19.207L16 18.914V16.5H18.414L18.707 16.207L19.707 15.207L21 13.914L22.293 15.207L23.293 16.207L23.586 16.5H26V18.914L26.293 19.207L27.293 20.207L28.586 21.5L27.293 22.793L26.293 23.793Z"
                        fill="#0B56E4"
                      />
                      <path
                        d="M21 17.5V25.5C23.206 25.5 25 23.706 25 21.5C25 19.294 23.206 17.5 21 17.5Z"
                        fill="#0B56E4"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_497_5769"
                          x1="1"
                          y1="5.5"
                          x2="38.5"
                          y2="39"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#D1E8FD" />
                          <stop offset="1" stop-color="#EDEFFF" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="lead_contens1">
                    <h3>My Leads</h3>
                    <h1>{totalMyLead}</h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="my_things">
              <div className="table11">
                <div className="my_open">
                  <h3>My Follow Up</h3>
                </div>
                <div className="relative overflow-x-auto lonj">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr className="thol">
                        <th scope="col" className="px-4 py-3">
                        LeadName
                        </th>
                        <th scope="col" className="px-4 py-3">
                           Date
                        </th>
                        <th scope="col" className="px-4 py-3">
                        FollowUpType
                        </th>
                        <th scope="col" className="px-4 py-3">
                        Remark
                        </th>
                        <th scope="col" className="px-4 py-3">
                        Time 
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {allTask?.map((task, index) => (
                        <tr
                          key={index}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <th
                            scope="row"
                            className="px-4 aka py-4 font-medium text-gray-900 whitespace-nowrap  aka"
                          >
                            {task?.LeadName}
                          </th>
                          <td className="px-4 py-4 duedatest">
                            {new Date(task?.Date).toLocaleDateString(
                              "en-GB"
                            )}
                          </td>
                          <td className="px-4 py-4 duedatest">
                            {task?.FollowUpType}
                          </td>
                          <td className="px-4 py-4 duedatest">
                            {task?.FollowUpType}
                          </td>
                          <td className="px-4 py-4 relt">{task?.Time && convertTo12HourFormat(task.Time)}</td>

                          <td className="px-3 py-3 thebuttn">
                            <OutsideClickHandler
                              onOutsideClick={() => {
                                if (
                                  !document
                                    .getElementById(`action_box${index}`)
                                    .classList.contains("hidden")
                                ) {
                                  document
                                    .getElementById(`action_box${index}`)
                                    .classList.add("hidden");
                                }
                              }}
                            >
                              <div>
                                <svg
                                  className="floyu"
                                  onClick={() => {
                                    document
                                      .getElementById(`action_box${index}`)
                                      .classList.toggle("hidden");
                                  }}
                                  width="32"
                                  height="32"
                                  viewBox="0 0 32 32"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M0.5 4C0.5 2.067 2.067 0.5 4 0.5H28C29.933 0.5 31.5 2.067 31.5 4V28C31.5 29.933 29.933 31.5 28 31.5H4C2.067 31.5 0.5 29.933 0.5 28V4Z"
                                    fill="#F5F9FF"
                                  />
                                  <path
                                    d="M0.5 4C0.5 2.067 2.067 0.5 4 0.5H28C29.933 0.5 31.5 2.067 31.5 4V28C31.5 29.933 29.933 31.5 28 31.5H4C2.067 31.5 0.5 29.933 0.5 28V4Z"
                                    stroke="#B3CBF7"
                                  />
                                  <path
                                    d="M16 14C14.9 14 14 14.9 14 16C14 17.1 14.9 18 16 18C17.1 18 18 17.1 18 16C18 14.9 17.1 14 16 14ZM16 8C14.9 8 14 8.9 14 10C14 11.1 14.9 12 16 12C17.1 12 18 11.1 18 10C18 8.9 17.1 8 16 8ZM16 20C14.9 20 14 20.9 14 22C14 23.1 14.9 24 16 24C17.1 24 18 23.1 18 22C18 20.9 17.1 20 16 20Z"
                                    fill="#49515C"
                                  />
                                </svg>

                                <div
                                  id={`action_box${index}`}
                                  className="z-10 taning hidden action_box bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                                >
                                  <ul
                                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="dropdownActionButton"
                                  >
                                    <li className="sysok">
                                      <a
                                        onClick={() => {
                                          navigate(
                                            `/adminDash/importLead/${task?.LeadId}`,
                                            {
                                              state: {
                                                type: "task",
                                                data1: task,
                                              },
                                            }
                                          );
                                        }}
                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                      >
                                        <svg
                                          width="16"
                                          height="16"
                                          viewBox="0 0 16 16"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M9.71569 5.51667L10.4824 6.28333L2.93236 13.8333H2.16569V13.0667L9.71569 5.51667ZM12.7157 0.5C12.5074 0.5 12.2907 0.583333 12.1324 0.741667L10.6074 2.26667L13.7324 5.39167L15.2574 3.86667C15.5824 3.54167 15.5824 3.01667 15.2574 2.69167L13.3074 0.741667C13.1407 0.575 12.9324 0.5 12.7157 0.5ZM9.71569 3.15833L0.499023 12.375V15.5H3.62402L12.8407 6.28333L9.71569 3.15833Z"
                                            fill="#383838"
                                          />
                                        </svg>

                                        <span>Edit</span>
                                      </a>
                                    </li>

                                    <li className="sysok">
                                      <a
                                        onClick={() => {
                                          navigate("/adminDash/taskLead" , {state:task})
                                        }}
                                       
                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                      >
                                        <svg
                                          width="20"
                                          height="14"
                                          viewBox="0 0 20 14"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M10.0002 2.41667C13.1585 2.41667 15.9752 4.19167 17.3502 7C15.9752 9.80833 13.1585 11.5833 10.0002 11.5833C6.84183 11.5833 4.02516 9.80833 2.65016 7C4.02516 4.19167 6.84183 2.41667 10.0002 2.41667ZM10.0002 0.75C5.8335 0.75 2.27516 3.34167 0.833496 7C2.27516 10.6583 5.8335 13.25 10.0002 13.25C14.1668 13.25 17.7252 10.6583 19.1668 7C17.7252 3.34167 14.1668 0.75 10.0002 0.75ZM10.0002 4.91667C11.1502 4.91667 12.0835 5.85 12.0835 7C12.0835 8.15 11.1502 9.08333 10.0002 9.08333C8.85016 9.08333 7.91683 8.15 7.91683 7C7.91683 5.85 8.85016 4.91667 10.0002 4.91667ZM10.0002 3.25C7.9335 3.25 6.25016 4.93333 6.25016 7C6.25016 9.06667 7.9335 10.75 10.0002 10.75C12.0668 10.75 13.7502 9.06667 13.7502 7C13.7502 4.93333 12.0668 3.25 10.0002 3.25Z"
                                            fill="#383838"
                                          />
                                        </svg>

                                        <span>View</span>

                                      </a>
                                    </li>

                                    <li className="sysok">
                                      <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        <svg
                                          width="12"
                                          height="16"
                                          viewBox="0 0 12 16"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M9.33317 5.5V13.8333H2.6665V5.5H9.33317ZM8.08317 0.5H3.9165L3.08317 1.33333H0.166504V3H11.8332V1.33333H8.9165L8.08317 0.5ZM10.9998 3.83333H0.999837V13.8333C0.999837 14.75 1.74984 15.5 2.6665 15.5H9.33317C10.2498 15.5 10.9998 14.75 10.9998 13.8333V3.83333Z"
                                            fill="#DE3730"
                                          />
                                        </svg>

                                        <span
                                          onClick={() => {
                                            deleteTask(task?._id);
                                          }}
                                        >
                                          Delete
                                        </span>
                                      </a>
                                    </li>

                                  </ul>
                                </div>
                              </div>
                            </OutsideClickHandler>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="prev_next">
                  <div className="on1">
                    <p>1</p>
                  </div>
                  <div className="on1">
                    <p>2</p>
                  </div>
                  <div className="next">
                    <button>
                      <span>Next</span>
                      <svg
                        width="8"
                        height="10"
                        viewBox="0 0 8 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.08748 0L0.912476 1.175L4.72914 5L0.912476 8.825L2.08748 10L7.08748 5L2.08748 0Z"
                          fill="#666D76"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="table22">
                <div className="my_open">
                  <h3>My Meetings</h3>
                </div>
                <div className="relative overflow-x-auto lonj">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr className="thol">
                        <th scope="col" className="px-4 py-3">
                          Title
                        </th>
                        <th scope="col" className="px-4 py-3">
                          From
                        </th>
                        <th scope="col" className="px-4 py-3">
                          To
                        </th>

                        <th scope="col" className="px-4 py-3">
                          Related To
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Participant
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {allMeet?.map((meet, index) => (
                        <tr
                          key={index}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <th
                            scope="row"
                            className="px-4 aka py-4 font-medium text-gray-900 whitespace-nowrap  aka"
                          >
                            {meet?.title}
                          </th>
                          <td className="px-4 py-4 meettime">
                            {meet?.meetDateFrom}{" "}
                            {new Date(
                              `1970-01-01T${meet?.meetTimeFrom}`
                            ).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </td>
                          <td className="px-4 py-4 meettime">
                            {meet?.meetDateTo}{" "}
                            {new Date(
                              `1970-01-01T${meet?.meetTimeTo}`
                            ).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </td>
                          <td className="px-4 py-4 duedatest">
                            {meet?.RelatedTo}
                          </td>
                          <td className="px-4 py-4 relt ">
                            {meet?.Participant}
                          </td>

                          <td className="relative">
                            <svg
                              className="floyu"
                              onClick={() => setStart1(!start1)}
                              width="32"
                              height="32"
                              viewBox="0 0 32 32"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0.5 4C0.5 2.067 2.067 0.5 4 0.5H28C29.933 0.5 31.5 2.067 31.5 4V28C31.5 29.933 29.933 31.5 28 31.5H4C2.067 31.5 0.5 29.933 0.5 28V4Z"
                                fill="#F5F9FF"
                              />
                              <path
                                d="M0.5 4C0.5 2.067 2.067 0.5 4 0.5H28C29.933 0.5 31.5 2.067 31.5 4V28C31.5 29.933 29.933 31.5 28 31.5H4C2.067 31.5 0.5 29.933 0.5 28V4Z"
                                stroke="#B3CBF7"
                              />
                              <path
                                d="M16 14C14.9 14 14 14.9 14 16C14 17.1 14.9 18 16 18C17.1 18 18 17.1 18 16C18 14.9 17.1 14 16 14ZM16 8C14.9 8 14 8.9 14 10C14 11.1 14.9 12 16 12C17.1 12 18 11.1 18 10C18 8.9 17.1 8 16 8ZM16 20C14.9 20 14 20.9 14 22C14 23.1 14.9 24 16 24C17.1 24 18 23.1 18 22C18 20.9 17.1 20 16 20Z"
                                fill="#49515C"
                              />
                            </svg>

                            {/* Dropdown menu */}
                            <div
                              id="dropdownAction"
                              style={stylePeer2}
                              className="z-10 taning hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 checkderop"
                            >
                              <ul
                                className="py-1 lesar  text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdownActionButton"
                              >
                                <li className="sysok">
                                  <a
                                    onClick={() => {
                                      navigate(
                                        `/employeeDash/importLead/${meet?.LeadId}`,
                                        { state: { type: "meet", data1: meet } }
                                      );
                                    }}
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  >
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M9.71569 5.51667L10.4824 6.28333L2.93236 13.8333H2.16569V13.0667L9.71569 5.51667ZM12.7157 0.5C12.5074 0.5 12.2907 0.583333 12.1324 0.741667L10.6074 2.26667L13.7324 5.39167L15.2574 3.86667C15.5824 3.54167 15.5824 3.01667 15.2574 2.69167L13.3074 0.741667C13.1407 0.575 12.9324 0.5 12.7157 0.5ZM9.71569 3.15833L0.499023 12.375V15.5H3.62402L12.8407 6.28333L9.71569 3.15833Z"
                                        fill="#383838"
                                      />
                                    </svg>

                                    <span>Edit</span>
                                  </a>
                                </li>
                                <li className="sysok">
                                  <a
                                    onClick={() => {
                                      navigate("/employeeDash/meetLead", { state: meet })
                                    }}
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  >
                                    <svg
                                      width="20"
                                      height="14"
                                      viewBox="0 0 20 14"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M10.0002 2.41667C13.1585 2.41667 15.9752 4.19167 17.3502 7C15.9752 9.80833 13.1585 11.5833 10.0002 11.5833C6.84183 11.5833 4.02516 9.80833 2.65016 7C4.02516 4.19167 6.84183 2.41667 10.0002 2.41667ZM10.0002 0.75C5.8335 0.75 2.27516 3.34167 0.833496 7C2.27516 10.6583 5.8335 13.25 10.0002 13.25C14.1668 13.25 17.7252 10.6583 19.1668 7C17.7252 3.34167 14.1668 0.75 10.0002 0.75ZM10.0002 4.91667C11.1502 4.91667 12.0835 5.85 12.0835 7C12.0835 8.15 11.1502 9.08333 10.0002 9.08333C8.85016 9.08333 7.91683 8.15 7.91683 7C7.91683 5.85 8.85016 4.91667 10.0002 4.91667ZM10.0002 3.25C7.9335 3.25 6.25016 4.93333 6.25016 7C6.25016 9.06667 7.9335 10.75 10.0002 10.75C12.0668 10.75 13.7502 9.06667 13.7502 7C13.7502 4.93333 12.0668 3.25 10.0002 3.25Z"
                                        fill="#383838"
                                      />
                                    </svg>

                                    <span>View</span>
                                  </a>
                                </li>
                                <li
                                  onClick={() => {
                                    deleteMeet(meet?._id);
                                  }}
                                  className="sysok"
                                >
                                  <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  >
                                    <svg
                                      width="12"
                                      height="16"
                                      viewBox="0 0 12 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M9.33317 5.5V13.8333H2.6665V5.5H9.33317ZM8.08317 0.5H3.9165L3.08317 1.33333H0.166504V3H11.8332V1.33333H8.9165L8.08317 0.5ZM10.9998 3.83333H0.999837V13.8333C0.999837 14.75 1.74984 15.5 2.6665 15.5H9.33317C10.2498 15.5 10.9998 14.75 10.9998 13.8333V3.83333Z"
                                        fill="#DE3730"
                                      />
                                    </svg>

                                    <span>Delete</span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="prev_next">
                  <div className="on1">
                    <p>1</p>
                  </div>
                  <div className="on1">
                    <p>2</p>
                  </div>
                  <div className="next">
                    <button>
                      <span>Next</span>
                      <svg
                        width="8"
                        height="10"
                        viewBox="0 0 8 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.08748 0L0.912476 1.175L4.72914 5L0.912476 8.825L2.08748 10L7.08748 5L2.08748 0Z"
                          fill="#666D76"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="my_things">
              <div className="table11">
                <div className="my_open">
                  <h3>Today's Leads</h3>
                </div>
                <div className="relative overflow-x-auto lonj">

                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr className="thol">
                        <th scope="col" className="px-4 py-3">
                          Company
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Email
                        </th>
                        <th scope="col" className="px-4 py-3">
                          FirstName
                        </th>
                        <th scope="col" className="px-4 py-3">
                          LastName
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Status
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>

                      {allLeads.map((lead, index) => (
                        <tr
                          key={index}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <td className="px-4 py-4 duedatest">
                            {lead?.Company}
                          </td>
                          <td className="px-4 py-4 duedatest">{lead?.Email}</td>
                          <td className="px-4 py-4 duedatest">
                            {lead?.FirstName}
                          </td>
                          <td className="px-4 py-4 relt">{lead?.LastName}</td>
                          <td className="px-4 py-4 relt">{lead?.LeadStatus}</td>

                          <td
                            onClick={() => {
                              if (optionedit === index) {
                                setOptionEdit(null);
                              } else {
                                setOptionEdit(index);
                              }
                            }}
                            className="px-6 py-4 relative cursor-pointer"
                          >
                            <img src={moreVert} alt="" />

                            {optionedit === index && (
                              <div className="attaedipop2">
                                <div onClick={() => navigate("/employeeDash/editLead", { state: lead })} className="attposin" >
                                  <img src={edit} alt="" />
                                  <p>Edit</p>
                                </div>
                                <div onClick={() => {
                                  navigate(`/employeeDash/importLead/${lead._id}`);
                                }}
                                  className="attposin" >
                                  <svg
                                    width="20"
                                    height="14"
                                    viewBox="0 0 20 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M10.0002 2.41667C13.1585 2.41667 15.9752 4.19167 17.3502 7C15.9752 9.80833 13.1585 11.5833 10.0002 11.5833C6.84183 11.5833 4.02516 9.80833 2.65016 7C4.02516 4.19167 6.84183 2.41667 10.0002 2.41667ZM10.0002 0.75C5.8335 0.75 2.27516 3.34167 0.833496 7C2.27516 10.6583 5.8335 13.25 10.0002 13.25C14.1668 13.25 17.7252 10.6583 19.1668 7C17.7252 3.34167 14.1668 0.75 10.0002 0.75ZM10.0002 4.91667C11.1502 4.91667 12.0835 5.85 12.0835 7C12.0835 8.15 11.1502 9.08333 10.0002 9.08333C8.85016 9.08333 7.91683 8.15 7.91683 7C7.91683 5.85 8.85016 4.91667 10.0002 4.91667ZM10.0002 3.25C7.9335 3.25 6.25016 4.93333 6.25016 7C6.25016 9.06667 7.9335 10.75 10.0002 10.75C12.0668 10.75 13.7502 9.06667 13.7502 7C13.7502 4.93333 12.0668 3.25 10.0002 3.25Z"
                                      fill="#383838"
                                    />
                                  </svg>

                                  <p>View</p>
                                </div>
                                <div
                                  onClick={() => { deleteProject(lead?._id) }}
                                  className="attposin">
                                  <img src={delete4} alt="" />
                                  <p>Delete</p>
                                </div>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}

                    </tbody>

                  </table>
                </div>

                <div className="prev_next">
                  <div className="on1">
                    <p>1</p>
                  </div>
                  <div className="on1">
                    <p>2</p>
                  </div>
                  <div className="next">
                    <button>
                      <span>Next</span>
                      <svg
                        width="8"
                        height="10"
                        viewBox="0 0 8 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.08748 0L0.912476 1.175L4.72914 5L0.912476 8.825L2.08748 10L7.08748 5L2.08748 0Z"
                          fill="#666D76"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

              </div>

              <div className="table22">
                <div className="my_open">
                  <h3>My Deals Closing This Month</h3>
                  <div>
                    <svg
                      className="floyu"
                      onClick={() => setStart3(!start3)}
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.5 4C0.5 2.067 2.067 0.5 4 0.5H28C29.933 0.5 31.5 2.067 31.5 4V28C31.5 29.933 29.933 31.5 28 31.5H4C2.067 31.5 0.5 29.933 0.5 28V4Z"
                        fill="#F5F9FF"
                      />
                      <path
                        d="M0.5 4C0.5 2.067 2.067 0.5 4 0.5H28C29.933 0.5 31.5 2.067 31.5 4V28C31.5 29.933 29.933 31.5 28 31.5H4C2.067 31.5 0.5 29.933 0.5 28V4Z"
                        stroke="#B3CBF7"
                      />
                      <path
                        d="M16 14C14.9 14 14 14.9 14 16C14 17.1 14.9 18 16 18C17.1 18 18 17.1 18 16C18 14.9 17.1 14 16 14ZM16 8C14.9 8 14 8.9 14 10C14 11.1 14.9 12 16 12C17.1 12 18 11.1 18 10C18 8.9 17.1 8 16 8ZM16 20C14.9 20 14 20.9 14 22C14 23.1 14.9 24 16 24C17.1 24 18 23.1 18 22C18 20.9 17.1 20 16 20Z"
                        fill="#49515C"
                      />
                    </svg>

                    {/* Dropdown menu */}
                    <div
                      id="dropdownAction"
                      style={stylePeer4}
                      className="z-10 taning hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                    >
                      <ul
                        className="py-1 lesar text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownActionButton"
                      >
                        <li className="sysok">
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9.71569 5.51667L10.4824 6.28333L2.93236 13.8333H2.16569V13.0667L9.71569 5.51667ZM12.7157 0.5C12.5074 0.5 12.2907 0.583333 12.1324 0.741667L10.6074 2.26667L13.7324 5.39167L15.2574 3.86667C15.5824 3.54167 15.5824 3.01667 15.2574 2.69167L13.3074 0.741667C13.1407 0.575 12.9324 0.5 12.7157 0.5ZM9.71569 3.15833L0.499023 12.375V15.5H3.62402L12.8407 6.28333L9.71569 3.15833Z"
                                fill="#383838"
                              />
                            </svg>

                            <span>Edit</span>
                          </a>
                        </li>
                        <li className="sysok">
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            <svg
                              width="20"
                              height="14"
                              viewBox="0 0 20 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.0002 2.41667C13.1585 2.41667 15.9752 4.19167 17.3502 7C15.9752 9.80833 13.1585 11.5833 10.0002 11.5833C6.84183 11.5833 4.02516 9.80833 2.65016 7C4.02516 4.19167 6.84183 2.41667 10.0002 2.41667ZM10.0002 0.75C5.8335 0.75 2.27516 3.34167 0.833496 7C2.27516 10.6583 5.8335 13.25 10.0002 13.25C14.1668 13.25 17.7252 10.6583 19.1668 7C17.7252 3.34167 14.1668 0.75 10.0002 0.75ZM10.0002 4.91667C11.1502 4.91667 12.0835 5.85 12.0835 7C12.0835 8.15 11.1502 9.08333 10.0002 9.08333C8.85016 9.08333 7.91683 8.15 7.91683 7C7.91683 5.85 8.85016 4.91667 10.0002 4.91667ZM10.0002 3.25C7.9335 3.25 6.25016 4.93333 6.25016 7C6.25016 9.06667 7.9335 10.75 10.0002 10.75C12.0668 10.75 13.7502 9.06667 13.7502 7C13.7502 4.93333 12.0668 3.25 10.0002 3.25Z"
                                fill="#383838"
                              />
                            </svg>

                            <span>View</span>
                          </a>
                        </li>
                        <li className="sysok">
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            <svg
                              width="12"
                              height="16"
                              viewBox="0 0 12 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9.33317 5.5V13.8333H2.6665V5.5H9.33317ZM8.08317 0.5H3.9165L3.08317 1.33333H0.166504V3H11.8332V1.33333H8.9165L8.08317 0.5ZM10.9998 3.83333H0.999837V13.8333C0.999837 14.75 1.74984 15.5 2.6665 15.5H9.33317C10.2498 15.5 10.9998 14.75 10.9998 13.8333V3.83333Z"
                                fill="#DE3730"
                              />
                            </svg>

                            <span>Delete</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="relative overflow-x-auto lonj">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr className="thol">
                        <th scope="col" className="px-4 py-3">
                          Subject
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Due Date
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Status
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Priority
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Related To
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Contact Name
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-4 aka py-4 font-medium text-gray-900 whitespace-nowrap  aka"
                        >
                          Follow up WhatsApp Message
                        </th>
                        <td className="px-4 py-4 duedatest">31/05/2023</td>
                        <td className="px-4 py-4 duedatest">Not Started</td>
                        <td className="px-4 py-4 duedatest">High</td>
                        <td className="px-4 py-4 relt">Machi Gulinski</td>
                        <td className="px-4 py-4">
                          <div className="contactk">
                            <img src={siy} alt="siy" />
                            <p>Kris Marrier</p>
                          </div>
                        </td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-4 aka py-4 font-medium text-gray-900 whitespace-nowrap  aka"
                        >
                          Follow up WhatsApp Message
                        </th>
                        <td className="px-4 py-4 duedatest">31/05/2023</td>
                        <td className="px-4 py-4 duedatest">Not Started</td>
                        <td className="px-4 py-4 duedatest">High</td>
                        <td className="px-4 py-4 relt">Machi Gulinski</td>
                        <td className="px-4 py-4">
                          <div className="contactk">
                            <img src={siy} alt="siy" />
                            <p>Kris Marrier</p>
                          </div>
                        </td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-4 aka py-4 font-medium text-gray-900 whitespace-nowrap  aka"
                        >
                          Follow up WhatsApp Message
                        </th>
                        <td className="px-4 py-4 duedatest">31/05/2023</td>
                        <td className="px-4 py-4 duedatest">Not Started</td>
                        <td className="px-4 py-4 duedatest">High</td>
                        <td className="px-4 py-4 relt">Machi Gulinski</td>
                        <td className="px-4 py-4">
                          <div className="contactk">
                            <img src={siy} alt="siy" />
                            <p>Kris Marrier</p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="prev_next">
                  <div className="on1">
                    <p>1</p>
                  </div>
                  <div className="on1">
                    <p>2</p>
                  </div>
                  <div className="next">
                    <button>
                      <span>Next</span>
                      <svg
                        width="8"
                        height="10"
                        viewBox="0 0 8 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.08748 0L0.912476 1.175L4.72914 5L0.912476 8.825L2.08748 10L7.08748 5L2.08748 0Z"
                          fill="#666D76"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default LeadDash2;
