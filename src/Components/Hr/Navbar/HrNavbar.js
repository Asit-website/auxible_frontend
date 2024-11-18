import React, { useEffect, useState } from "react";
import kushel1 from "../../images/kushel1.png";
import notification from "../../images/notifications.png"
import chatbot from "../../images/chat_bubble_outline.png"
import lok from "../../images/lok.png";
import bottom from "../../images/bottom.png";
import { NavLink, useNavigate } from "react-router-dom";
import notifyy from "../../images/notifyy.png"
import redcancel from "../../images/redcancel.png"
import { useMain } from '../../../hooks/useMain'



const HrNavbar = ({ setAlert}) => {
  
  let user = JSON?.parse(localStorage.getItem("hrms_user"));

  const { fetchUserNotifyHR , deleteNotification } = useMain();


  const updateUser = () => {
    document.getElementById("ty").classList.toggle("tys");
  };

  const [allNotication , setAllNotification] = useState([]);

  const [shownotify , setShownotify] = useState(false);

  // const {user} = useMain();
  const handleLogout = () => {
    localStorage.removeItem("hrms_token");
    localStorage.removeItem("hrms_user");
    localStorage.removeItem("clock-in");
    localStorage.removeItem("clock-status");
    localStorage.removeItem("clock-out-time");
    localStorage.removeItem("clockOutTime");
    localStorage.removeItem("clockInTime");
    localStorage.removeItem("breakInTime");
    localStorage.removeItem("breakOutTime");
    localStorage.removeItem("clock-in-date");
    localStorage.removeItem("break-seconds");
    localStorage.removeItem("break-time");
   

    window.location.href = "/login";
    setAlert("success", "logout successfully");
  };

  const navigate = useNavigate();

  // ===============logic for good morning, good afternoon and evening accorroding to time====
  let myDate = new Date();
  let hours = myDate.getHours();
  let greet;

  if (hours < 12) greet = "Morning";
  else if (hours >= 12 && hours <= 17) greet = "Afternoon";
  else if (hours >= 17 && hours <= 24) greet = "Evening";


  const fetchNotification  = async()=>{
    const ans = await fetchUserNotifyHR();

     if(ans.status){
      let notifications = ans?.notifications;
      let reversedNotifications = notifications.slice().reverse(); 

      setAllNotification(reversedNotifications);  
     }
}

useEffect(()=>{
  fetchNotification();
},[])


  return (
    <>
      <div className="Employee-nav w-full">


        <div className="logo-namewrap">

          <div className="logo ">
            <img src={kushel1} alt="" />
          </div>

          <NavLink to="/adminDash">

            <div className="second-logo flex items-center">

          
            </div>

          </NavLink>

        </div>


        <div className="navProfiIcons">

          <img  onClick={()=>setShownotify(true)} src={notification} alt="" />

          {/* <img onClick={() => navigate("/hrDash/notification3")} src={chatbot} alt="" /> */}

          {/* navitem  */}
          <div className="relative cursor-pointer" onClick={updateUser}>

            <div className="sixth-logo flex items-center relative ">
              <img className="john" src={user?.profileImage ? user?.profileImage : lok} alt="lok" />
              <p className="ml-2.5">{user?.fullName ? user?.fullName : null}</p>
              <img className="ml-2.5 bottom" src={bottom} alt="bottom" />
            </div>

            <div id="ty" className="bg-white w-40 absolute user-profile hidden">
              <p onClick={handleLogout} className=" text-center">
                Logout
              </p>
              <NavLink to="/adminDash/profile"><p className=" text-center">
                Edit Profile
              </p></NavLink>
              {/* <NavLink to="/employeeDash/update">
                <p className=" text-center">Edit Profile</p>
              </NavLink> */}
            </div>

          </div>

        </div>




      </div>

        {/* this is notification sidebar  */}

 {
  shownotify && 
  <div className="notifySidwrap">

  <div className="notifcont">

    <nav>
     <h2>Notifications</h2>
     <img onClick={()=>{
      setShownotify(false);
     }}  src={redcancel} alt="" />
    </nav>

    <hr />

     <div className="allnotiftcont">

         {

          allNotication.length > 0 ?

           allNotication?.map((item , index)=>(

             <>
             <div key={index} className="singlnotify">
               <h2>{item?.title}</h2>

              <p>{item?.description}</p>

              <p>Date : {new Date(parseInt(item?.date)).toLocaleDateString()}</p>


             </div>

              <hr />
             </>

           ))

           
           :
           <div className="nonotify">
             <img src={notifyy} alt="" />
           </div>
         }

     </div>

  </div>

</div>
 }
    </>
  );
};

export default HrNavbar;
