import AdminSidebar from '../Sidebar/AdminSidebar';
import AdminNavbar from '../Navbar/AdminNavbar';
import { useMain } from '../../../hooks/useMain'
import "../Announcement/annocement.css"
import { useState, useEffect } from 'react';
import HrSidebar from '../../Hr/Sidebar/HrSidebar';
import HrNavbar from '../../Hr/Navbar/HrNavbar';

const Notification3 = ({ pop, setPop, setAlert }) => {
    const { user , fetchUserNotifyHR , deleteNotification } = useMain();

     const [allNotication , setAllNotification] = useState([]);

    const fetchNotification  = async()=>{
        const ans = await fetchUserNotifyHR();

         if(ans.status){
            setAllNotification(ans?.notifications);
         }
    }

    const deleteNotify = async(id)=>{
        const ans = await deleteNotification(id);
        fetchNotification();
    }

    useEffect(()=>{
        fetchNotification();
    },[])

    return (
        <>
            <div className="annDash relative h-full">

                <HrSidebar pop={pop} setPop={setPop} />

                <div className="tm">
                    <HrNavbar user={user} setAlert={setAlert} />

                    
                    <div className="em">

                        <div  className='anNav notificaont'>

 
 {
    allNotication?.map((item ,index)=>(
<div key={index} id="toast-message-cta" class="w-full p-4 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400" role="alert">
    <div class="flex justify-between">

        <div class="ms-3 text-sm font-normal">
            <span  class="mb-1 text-sm font-semibold text-gray-900 dark:text-white">{item.title}</span>
            <div class="mb-2 text-sm font-normal">{item.description}</div> 
            <div class="mb-2 text-sm font-normal">Date : {new Date(parseInt(item?.date)).toLocaleDateString()}
</div> 
          
        </div>

        <button onClick={()=>{
            deleteNotify(item?._id);
        }}  type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white justify-center items-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-message-cta" aria-label="Close">
            <span class="sr-only">Close</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
        </button>

    </div>
</div>
    ))
 }



                          

                        </div>
      

                    </div>
                </div>
          

            </div>
        </>
    )
}

export default Notification3