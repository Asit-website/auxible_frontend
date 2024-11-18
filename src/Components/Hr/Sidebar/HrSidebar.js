
import React, { useState } from "react";
import dots from "../../images/dots.png";
import lokia from "../../images/lokia.png";
import calling from "../../images/calling.png";
import earth from "../../images/earth.png";
import pdf from "../../images/pdf.png";
import chakka from "../../images/chakka.png";
import kushel1 from "../../images/kushel1.png";
import Managment from "../../admin/Management/Managment";
import { NavLink, useNavigate } from "react-router-dom";
import dashboard from "../../images/dashboard.png";
import expand_more from "../../images/expand_more.png";

import chooseDash from "../../images/choosedash.png";
import unchosedash from "../../images/unchosedash.png";
import dasg from '../../images/dasg.svg'
import adminSetting from "../../images/adminSetting.png"
import { IoIosArrowDown } from "react-icons/io";


// import {user} from '../../../hooks/useMain'
import "./sidebar1.css"

const dashboardItem = [
  {
    title: "HRM",
    link: "/hrDash"
  },
  {
    title: "My Self",
    link: "/adminDash/mySelf"
  },
  {
    title: "Accounting",
  },
  {
    title: "CRM",
  },
  {
    title: "Projects",
  }
];

const leadItem = [
  {
    title:"Lead Dashboard" , 
    link:"/adminDash/leadDash",
  },
  {
    title:"My Lead" , 
    link:"/adminDash/myLead",
  },

]

const HRMSItem = [
  {
    title: "Employee Management",
    link: "/adminDash/HRM/employeeManagement"
  },
  {
    title: "HRM System Setup",
    link: "/adminDash/HRM/HRMsystemSetup"
  },
  {
    title: "Performance Setup",
   
  },
  {
    title: "Training Setup",
   
  },
  {
    title: "Leave Management Setup",
   
  },
  {
    title: "HR Admin Setup",
   
  },
  {
    title: "Lead Management",
   
  },
  {
    title: "Employees Asset Setup",
    link: "/performance/Assets"
  },
  {
    title: "Employees Attendence",
    link: "/adminDash/HRM/userAttendence"
  },
  
]

const performanceItem = [
  {
    title: "Indicator",
    link: "/performance/indicator"
  },
  {
    title: "Appraisal",
    link: "/performance/appraisal"
  },
  {
    title: "Goal Tracking",
    link: "/performance/goalTracking"
  },
]
const trainingItem = [
  {
    title: "Training list",
    link: "/training/TrainingList"
  },
  {
    title: "Trainer",
    link: "/training/TrainerHRM"
  },
 
]

const LeaveManItem = [
  {
    title: "Manage Leave",
    link: "/adminDash/HRM/LeaveEmployee"
  },
  {
    title: "Leave Request",
    link: "/adminDash/HRM/leaveRequest"
  },
  {
    title: "Mark Attendence",
    link: "/adminDash/HRM/markAttendance"
  },
 
]

const hrAdminItem = [
  {
    title: "Award",
    link: "/adminDash/HRM/AwardHRM"
  },
  {
    title: "Transfer",
    link: "/adminDash/HRM/TransferHRM"
  },
  {
    title: "Regisnation",
    link: "/adminDash/HRM/ResignationHRM"
  },
  {
    title: "Promotion",
    link: "/adminDash/HRM/PromotionHRM"
  },
  {
    title: "Complaints",
    link: "/adminDash/HRM/ComplaintsHRM"
  },
  {
    title: "Warning",
    link: "/adminDash/HRM/WarningHRM"
  },
  {
    title: "Termination",
    link: "/adminDash/HRM/TerminationHRM"
  },
  {
    title: "Holiday",
    link: "/adminDash/HRM/holiday" 
  },
  {
    title:"Announcement",
    link:"/adminDash/announcement"
  }
]

const HrSidebar = ({ pop, setPop }) => {
  const [dashItem, setDashItem] = useState(0);

  const [HRMS, setHRMS] = useState(null);

  const navigate = useNavigate();

  const [openDashItem, setOpenDashItem] = useState(false);
  const [openHRMSItem, setOpenHRMSItem] = useState(false);

  const [openPerfor , setOpenPer] = useState(false);
  const [openTrain , setOpenTrain] = useState(false);
  const [openLeaveMan, setOpenLeaveMan] = useState(false);
  const [openHrAdmin, setOpenHrAdmin] = useState(false);

  const [openLead , setOpenLead] = useState(false);


  return (
    <>
      <button
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="sidebar-multi-level-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 sidebars"
        aria-label="Sidebar"
      >
        {/* <div className="logobar">
          <img src={kushel1} alt="" />
        </div> */}

        <div className="h-full px-3 py-4 overflow-y-auto sidebars sidebars1">

          <div className="allDasCon">

            {/* <-------------dashboard----------------> */}
            <div className="adDasWrap">

              {/* dashboard  */}
              <div
                onClick={() => setOpenDashItem((prev) => !prev)}
                className="side-dash-box"
              >
                <div className="dash-wrap">
                  <img src={dasg} alt="dasg" />
                  <p>Dashboard</p>
                </div>

                <img src={expand_more} alt="" />
              </div>

              {openDashItem && (
                <div className="alladminDash-item">
                  {dashboardItem?.map((item, index) => (
                    <div
                      onClick={() => {
                        setDashItem(index)
                        navigate(item?.link)
                      }

                      }
                      className="sinADDasItem"
                      key={index}
                    >
                      {dashItem == index ? (
                        <img src={chooseDash} alt="" />
                      ) : (
                        <img src={unchosedash} alt="" />
                      )}
                      <p
                        className={` ${dashItem === index ? "dashItemp" : "dITitl"
                          }`}
                      >
                        {item?.title}
                      </p>
                    </div>
                  ))}
                </div>
              )}

            </div>


           {/* <-----------HRMS--------------> */}
            <div onClick={()=>setOpenHRMSItem((prev)=>!prev)}  className="HRMS-dash-box"
            >
              <div className="HRMS-wrap">
                <img src={unchosedash} alt="" />
                <p>HRMS</p>
              </div>

              <img src={expand_more} alt="" />
            </div>

            {openHRMSItem && (
              <div className="alladminDash-item">
                {HRMSItem?.map((item, index) => (
                  item.title === "Performance Setup"?

                    <div className="performaceSetup ">
    
                   <div key={index} onClick={()=>setOpenPer((prev)=>!prev)}  className="sinADDasItem relative">

           {dashItem == index ? (
                      <img src={chooseDash} alt="" />
                    ) : (
                      <img src={unchosedash} alt="" />
                    )}
                    <p
                      className={` ${
                        HRMS === index ? "dashItemp" : "dITitl"
                      }`}
                    >
                      {item?.title}
                    </p>

                   
                         <p><IoIosArrowDown className="text-white absolute right-6 top-[30%] " /></p>
       
                   </div>

                   {
                    openPerfor && 
                    <div>

{
  performanceItem?.map((item ,index)=>(
    <div
                  
    onClick={()=>{
      setHRMS(index)
      navigate(item?.link)
    }}
    className="sinADDasItem"
    key={index}
  >
    {dashItem == index ? (
      <img src={chooseDash} alt="" />
    ) : (
      <img src={unchosedash} alt="" />
    )}
    <p
      className={` ${
        HRMS === index ? "dashItemp" : "dITitl"
      }`}
    >
      {item?.title}
    </p>
  </div>
  ))
}
                 
                    </div>
                   }
                  

                   </div>

                   :

                    item.title === "Leave Management Setup" ?

                    <div className="performaceSetup ">
    
                    <div key={index} onClick={()=>setOpenLeaveMan((prev)=>!prev)}  className="sinADDasItem relative">
 
            {dashItem == index ? (
                       <img src={chooseDash} alt="" />
                     ) : (
                       <img src={unchosedash} alt="" />
                     )}
                     <p
                       className={` ${
                         HRMS === index ? "dashItemp" : "dITitl"
                       }`}
                     >
                       {item?.title}
                     </p>
 
                    
                          <p><IoIosArrowDown className="text-white absolute right-6 top-[30%] " /></p>
        
                    </div>
 
                    {
                     openLeaveMan && 
                     <div>
 
 {
   LeaveManItem?.map((item ,index)=>(
     <div
                   
     onClick={()=>{
       setHRMS(index)
       navigate(item?.link)
     }}
     className="sinADDasItem"
     key={index}
   >
     {dashItem == index ? (
       <img src={chooseDash} alt="" />
     ) : (
       <img src={unchosedash} alt="" />
     )}
     <p
       className={` ${
         HRMS === index ? "dashItemp" : "dITitl"
       }`}
     >
       {item?.title}
     </p>
   </div>
   ))
 }
                  
                     </div>
                    }
                   
 
                    </div>


                    :
                    
                   item.title === "Training Setup" ? 
                   (

                    <div className="performaceSetup ">
    
                    <div key={index} onClick={()=>setOpenTrain((prev)=>!prev)}  className="sinADDasItem relative">
 
            {dashItem == index ? (
                       <img src={chooseDash} alt="" />
                     ) : (
                       <img src={unchosedash} alt="" />
                     )}
                     <p
                       className={` ${
                         HRMS === index ? "dashItemp" : "dITitl"
                       }`}
                     >
                       {item?.title}
                     </p>
 
                    
                          <p><IoIosArrowDown className="text-white absolute right-6 top-[30%] " /></p>
        
                    </div>
 
                    {
                     openTrain && 
                     <div>
 
 {
   trainingItem?.map((item ,index)=>(
     <div
                   
     onClick={()=>{
       setHRMS(index)
       navigate(item?.link)
     }}
     className="sinADDasItem"
     key={index}
   >
     {dashItem == index ? (
       <img src={chooseDash} alt="" />
     ) : (
       <img src={unchosedash} alt="" />
     )}
     <p
       className={` ${
         HRMS === index ? "dashItemp" : "dITitl"
       }`}
     >
       {item?.title}
     </p>
   </div>
   ))
 }
                  
                     </div>
                    }
                   
 
                    </div>
                   )
                   :

                   item.title === "HR Admin Setup"?
                   (

                    <div className="performaceSetup ">
    
                    <div key={index} onClick={()=>setOpenHrAdmin((prev)=>!prev)}  className="sinADDasItem relative">
 
            {dashItem == index ? (
                       <img src={chooseDash} alt="" />
                     ) : (
                       <img src={unchosedash} alt="" />
                     )}
                     <p
                       className={` ${
                         HRMS === index ? "dashItemp" : "dITitl"
                       }`}
                     >
                       {item?.title}
                     </p>
 
                    
                          <p><IoIosArrowDown className="text-white absolute right-6 top-[30%] " /></p>
        
                    </div>
 
                    {
                     openHrAdmin && 
                     <div>
 
 {
   hrAdminItem?.map((item ,index)=>(
     <div
                   
     onClick={()=>{
       setHRMS(index)
       navigate(item?.link)
     }}
     className="sinADDasItem"
     key={index}
   >
     {dashItem == index ? (
       <img src={chooseDash} alt="" />
     ) : (
       <img src={unchosedash} alt="" />
     )}
     <p
       className={` ${
         HRMS === index ? "dashItemp" : "dITitl"
       }`}
     >
       {item?.title}
     </p>
   </div>
   ))
 }
                  
                     </div>
                    }
                   
 
                    </div>
                   )
                    :

                    item.title === "Lead Management"?
                   (

                    <div className="performaceSetup ">
    
                    <div key={index} onClick={()=>setOpenLead((prev)=>!prev)}  className="sinADDasItem relative">
 
            {dashItem == index ? (
                       <img src={chooseDash} alt="" />
                     ) : (
                       <img src={unchosedash} alt="" />
                     )}
                     <p
                       className={` ${
                         HRMS === index ? "dashItemp" : "dITitl"
                       }`}
                     >
                       {item?.title}
                     </p>
 
                    
                          <p><IoIosArrowDown className="text-white absolute right-6 top-[30%] " /></p>
        
                    </div>
 
                    {
                     openLead && 
                     <div>
 
 {
   leadItem?.map((item ,index)=>(
     <div
                   
     onClick={()=>{
       setHRMS(index)
       navigate(item?.link)
     }}
     className="sinADDasItem"
     key={index}
   >
     {dashItem == index ? (
       <img src={chooseDash} alt="" />
     ) : (
       <img src={unchosedash} alt="" />
     )}
     <p
       className={` ${
         HRMS === index ? "dashItemp" : "dITitl"
       }`}
     >
       {item?.title}
     </p>
   </div>
   ))
 }
                  
                     </div>
                    }
                   
 
                    </div>
                   ):

                  <div
                  
                    onClick={()=>{
                      setHRMS(index)
                      navigate(item?.link)
                    }}
                    className="sinADDasItem"
                    key={index}
                  >
                    {dashItem == index ? (
                      <img src={chooseDash} alt="" />
                    ) : (
                      <img src={unchosedash} alt="" />
                    )}
                    <p
                      className={` ${
                        HRMS === index ? "dashItemp" : "dITitl"
                      }`}
                    >
                      {item?.title}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* <---------------System setting------------------> */}
            <div className="setWrap">
              {/* <p>Setting</p> */}
              <div className="systSset">
                <img src={adminSetting} alt="" />
                <span>System Settings</span>
              </div>
            </div>


          </div>

          <div className="red-box">
            <div className="white-box">
              <img src={chakka} alt="chakka" />
              <div className="black-box">
                <h3>Need Help?</h3>
                <p>Our support team is ready for you</p>
                <button>Get Help</button>
              </div>
            </div>
          </div>

        </div>
      </aside>

      <div className="p-0 sm:ml-64"></div>

      {pop && <Managment setPop={setPop} />}
    </>
  );
};

export default HrSidebar;

{
  /* <NavLink to="/adminDash">
              <li className="most">
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <img width={16} src={dots} alt="dots" />
                  <span className="ml-3">Dashboard</span>
                </a>
              </li>
            </NavLink>

            <NavLink to="/adminDash/profile-management">
            <li className="most">
              <button
                type="button"
                className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <img width={16} src={lokia} alt="lokia" />
                <span
                  className="flex-1 ml-2 text-left whitespace-nowrap"
                  sidebar-toggle-item
                >
                  Employee Information
                </span>
                <svg
                  sidebar-toggle-item
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <ul id="dropdown-example" className="hidden py-2 space-y-2">
                <li>
                  <a
                    href="#"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Billing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Invoice
                  </a>
                </li>
              </ul>
            </li>
            </NavLink>


            <NavLink to="#!">
              {" "}
              <li className="most">
                <button
                  type="button"
                  className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  aria-controls="dropdown-example"
                  data-collapse-toggle="dropdown-example"
                >
                  <img width={16} src={calling} alt="lokia" />
                  <span
                    className="flex-1 ml-3 text-left whitespace-nowrap"
                    sidebar-toggle-item
                  >
                    Inbox
                  </span>
                  <svg
                    sidebar-toggle-item
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
                <ul id="dropdown-example" className="hidden py-2 space-y-2">
                  <li>
                    <a
                      href="#"
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Products
                    </a>
                  </li>
                </ul>
              </li>
            </NavLink> */
}




// ! old core ///////

// import React, { useState } from "react";
// import dots from "../../images/dots.png";
// import lokia from "../../images/lokia.png";
// import calling from "../../images/calling.png";
// import earth from "../../images/earth.png";
// import pdf from "../../images/pdf.png";
// import chakka from "../../images/chakka.png";
// import kushel1 from "../../images/kushel1.png";
// import Managment from "../Management/Managment";
// import { NavLink, useNavigate } from "react-router-dom";
// import dashboard from "../../images/dashboard.png";
// import expand_more from "../../images/expand_more.png";

// import chooseDash from "../../images/choosedash.png";
// import unchosedash from "../../images/unchosedash.png";

// import adminSetting from "../../images/adminSetting.png"
// import { IoIosArrowDown } from "react-icons/io";


// // import {user} from '../../../hooks/useMain'
// import "./sidebar.css"

// const dashboardItem = [
//   {
//     title: "HRM",
//     link: "/adminDash/HRM"
//   },
//   {
//     title: "Accounting",
//   },
//   {
//     title: "CRM",
//   },
//   {
//     title: "Projects",
//   },
// ];

// const HRMSItem = [
//   {
//     title: "Employee Management",
//     link: "/adminDash/HRM/employeeManagement"
//   },
//   {
//     title: "HRM System Setup",
//     link: "/adminDash/HRM/HRMsystemSetup"
//   },
//   {
//     title: "Performance Setup",
   
//   },
//   {
//     title: "Employees Asset Setup",
//     link: "/performance/Assets"
//   },
  
// ]

// const performanceItem = [
//   {
//     title: "Indicator",
//     link: "/performance/indicator"
//   },
//   {
//     title: "Appraisal",
//     link: "/performance/appraisal"
//   },
//   {
//     title: "Goal Tracking",
//     link: "/performance/goalTracking"
//   },
// ]

// const AdminSidebar = ({ pop, setPop }) => {
//   const [dashItem, setDashItem] = useState(0);

//   const [HRMS, setHRMS] = useState(null);

//   const navigate = useNavigate();

//   const [openDashItem, setOpenDashItem] = useState(false);
//   const [openHRMSItem, setOpenHRMSItem] = useState(false);

//   const [openPerfor , setOpenPer] = useState(false);

//   return (
//     <>
//       <button
//         data-drawer-target="sidebar-multi-level-sidebar"
//         data-drawer-toggle="sidebar-multi-level-sidebar"
//         aria-controls="sidebar-multi-level-sidebar"
//         type="button"
//         className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//       >
//         <span className="sr-only">Open sidebar</span>
//         <svg
//           className="w-6 h-6"
//           aria-hidden="true"
//           fill="currentColor"
//           viewBox="0 0 20 20"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             clipRule="evenodd"
//             fillRule="evenodd"
//             d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
//           ></path>
//         </svg>
//       </button>

//       <aside
//         id="sidebar-multi-level-sidebar"
//         className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 sidebars"
//         aria-label="Sidebar"
//       >
//         {/* <div className="logobar">
//           <img src={kushel1} alt="" />
//         </div> */}

//         <div className="h-full px-3 py-4 overflow-y-auto sidebars sidebars1">

//           <div className="allDasCon">

//             {/* <-------------dashboard----------------> */}
//             <div className="adDasWrap">

//               {/* dashboard  */}
//               <div
//                 onClick={() => setOpenDashItem((prev) => !prev)}
//                 className="side-dash-box"
//               >
//                 <div className="dash-wrap">
//                   <img src={dashboard} alt="" />
//                   <p>Dashboard</p>
//                 </div>

//                 <img src={expand_more} alt="" />
//               </div>

//               {openDashItem && (
//                 <div className="alladminDash-item">
//                   {dashboardItem?.map((item, index) => (
//                     <div
//                       onClick={() => {
//                         setDashItem(index)
//                         navigate(item?.link)
//                       }

//                       }
//                       className="sinADDasItem"
//                       key={index}
//                     >
//                       {dashItem == index ? (
//                         <img src={chooseDash} alt="" />
//                       ) : (
//                         <img src={unchosedash} alt="" />
//                       )}
//                       <p
//                         className={` ${dashItem === index ? "dashItemp" : "dITitl"
//                           }`}
//                       >
//                         {item?.title}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               )}

//             </div>


//            {/* <-----------HRMS--------------> */}
//             <div onClick={()=>setOpenHRMSItem((prev)=>!prev)}  className="HRMS-dash-box"
//             >
//               <div className="HRMS-wrap">
//                 <img src={unchosedash} alt="" />
//                 <p>HRMS</p>
//               </div>

//               <img src={expand_more} alt="" />
//             </div>

//             {openHRMSItem && (
//               <div className="alladminDash-item">
//                 {HRMSItem?.map((item, index) => (
//                    item.title === "Performance Setup"?

//                     <div className="performaceSetup ">
    
//                    <div key={index} onClick={()=>setOpenPer((prev)=>!prev)}  className="sinADDasItem relative">

//            {dashItem == index ? (
//                       <img src={chooseDash} alt="" />
//                     ) : (
//                       <img src={unchosedash} alt="" />
//                     )}
//                     <p
//                       className={` ${
//                         HRMS === index ? "dashItemp" : "dITitl"
//                       }`}
//                     >
//                       {item?.title}
//                     </p>

                   
//                          <p><IoIosArrowDown className="text-white absolute right-6 top-[30%] " /></p>
       
//                    </div>

//                    {
//                     openPerfor && 
//                     <div>

// {
//   performanceItem?.map((item ,index)=>(
//     <div
                  
//     onClick={()=>{
//       setHRMS(index)
//       navigate(item?.link)
//     }}
//     className="sinADDasItem"
//     key={index}
//   >
//     {dashItem == index ? (
//       <img src={chooseDash} alt="" />
//     ) : (
//       <img src={unchosedash} alt="" />
//     )}
//     <p
//       className={` ${
//         HRMS === index ? "dashItemp" : "dITitl"
//       }`}
//     >
//       {item?.title}
//     </p>
//   </div>
//   ))
// }
                 
//                     </div>
//                    }

//                    </div>

//                    :

//                   <div
                  
//                     onClick={()=>{
//                       setHRMS(index)
//                       navigate(item?.link)
//                     }}
//                     className="sinADDasItem"
//                     key={index}
//                   >
//                     {dashItem == index ? (
//                       <img src={chooseDash} alt="" />
//                     ) : (
//                       <img src={unchosedash} alt="" />
//                     )}
//                     <p
//                       className={` ${
//                         HRMS === index ? "dashItemp" : "dITitl"
//                       }`}
//                     >
//                       {item?.title}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}





//             {/* <---------------System setting------------------> */}
//             <div className="setWrap">
//               {/* <p>Setting</p> */}
//               <div className="systSset">
//                 <img src={adminSetting} alt="" />
//                 <span>System Settings</span>
//               </div>
//             </div>


//           </div>

//           <div className="red-box">
//             <div className="white-box">
//               <img src={chakka} alt="chakka" />
//               <div className="black-box">
//                 <h3>Need Help?</h3>
//                 <p>Our support team is ready for you</p>
//                 <button>Get Help</button>
//               </div>
//             </div>
//           </div>

//         </div>
//       </aside>

//       <div className="p-0 sm:ml-64"></div>

//       {pop && <Managment setPop={setPop} />}
//     </>
//   );
// };

// export default AdminSidebar;

// {
//   /* <NavLink to="/adminDash">
//               <li className="most">
//                 <a
//                   href="#"
//                   className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
//                 >
//                   <img width={16} src={dots} alt="dots" />
//                   <span className="ml-3">Dashboard</span>
//                 </a>
//               </li>
//             </NavLink>

//             <NavLink to="/adminDash/profile-management">
//             <li className="most">
//               <button
//                 type="button"
//                 className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
//                 aria-controls="dropdown-example"
//                 data-collapse-toggle="dropdown-example"
//               >
//                 <img width={16} src={lokia} alt="lokia" />
//                 <span
//                   className="flex-1 ml-2 text-left whitespace-nowrap"
//                   sidebar-toggle-item
//                 >
//                   Employee Information
//                 </span>
//                 <svg
//                   sidebar-toggle-item
//                   className="w-6 h-6"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                     clipRule="evenodd"
//                   ></path>
//                 </svg>
//               </button>
//               <ul id="dropdown-example" className="hidden py-2 space-y-2">
//                 <li>
//                   <a
//                     href="#"
//                     className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
//                   >
//                     Products
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
//                   >
//                     Billing
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
//                   >
//                     Invoice
//                   </a>
//                 </li>
//               </ul>
//             </li>
//             </NavLink>


//             <NavLink to="#!">
//               {" "}
//               <li className="most">
//                 <button
//                   type="button"
//                   className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
//                   aria-controls="dropdown-example"
//                   data-collapse-toggle="dropdown-example"
//                 >
//                   <img width={16} src={calling} alt="lokia" />
//                   <span
//                     className="flex-1 ml-3 text-left whitespace-nowrap"
//                     sidebar-toggle-item
//                   >
//                     Inbox
//                   </span>
//                   <svg
//                     sidebar-toggle-item
//                     className="w-6 h-6"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                       clipRule="evenodd"
//                     ></path>
//                   </svg>
//                 </button>
//                 <ul id="dropdown-example" className="hidden py-2 space-y-2">
//                   <li>
//                     <a
//                       href="#"
//                       className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
//                     >
//                       Products
//                     </a>
//                   </li>
//                 </ul>
//               </li>
//             </NavLink> */
// }
