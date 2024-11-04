import AdminSidebar from '../Sidebar/AdminSidebar';
import AdminNavbar from '../Navbar/AdminNavbar';
import { useMain } from '../../../hooks/useMain'
import annPlus from "../../images/annPlus.png"
import "./indicator.css"
import { useEffect, useState } from 'react';
import cross from "../../images/crossAn.png"
import { FaOm, FaRegStar } from "react-icons/fa";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import toast from 'react-hot-toast';
import EmployeeNavbar from '../../Employee/Navbar/EmployeeNavbar';
import EmployeeSidebar from '../../Employee/Sidebar/EmployeeSidebar';


const GoalTracking = ({ pop, setPop, setAlert }) => {
  const { user, createTracks, getBranchs, getTracks, deleteTracks, updateTracks } = useMain();

  const [openForm, setOpenForm] = useState(false);

  const [data, setData] = useState([]);

  const [branch, setBranch] = useState([]);

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

   const {role} = hrms_user;


  const [refreshFlag, setRefreshFlag] = useState(false);

  const [onEdit, setOnEdit] = useState(false);
  const [editData, setEditData] = useState({});

  const [formdata, setFormdata] = useState({
    Branch: "", GoalType: "", startDate: "", endDate: "", subject: "", target: "", description: "", status: "", rating: "", progress: ""
  })

  useEffect(() => {
    getData();
    getData1();
  }, [refreshFlag])

  const getData1 = async () => {
    const ans = await getBranchs();
    setBranch(ans?.data);
  }

  const getData = async () => {
    const ans = await getTracks();
    setData(ans?.data);
  }

  useEffect(() => {
    if (onEdit) {
      setFormdata({
        id: editData._id,
        Branch: editData.Branch,
        GoalType: editData.GoalType,
        startDate: editData.startDate,
        endDate: editData.endDate,
        subject: editData.subject,
        target: editData.target,
        description: editData.description,
        status: editData.status,
        rating: editData.rating,
        progress: editData.progress
      })
    }
  }, [editData])

  const changeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormdata((prev) => ({
      ...prev,
      [name]: value
    }))

  }

  const submitHandler = async (e) => {
    try {
      if (onEdit) {
        await updateTracks({ ...formdata });
        toast.success("update successfully");
        setRefreshFlag(!refreshFlag);
      }
      else {
        await createTracks({ ...formdata });
        toast.success("Successfuly Created");
        setRefreshFlag(!refreshFlag);
      }
      setOpenForm(false);
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
            await deleteTracks(id);
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

  // const data = [
  //   {
  //     goalType: "Short term goal",
  //     subject: "afb project",
  //     branch: "Head office",
  //     target: "10000000",
  //     startDate: "	Jan 4, 2024",
  //     endDate: "Jan 4, 2024",
  //     rating: "5",
  //     progress: "96%"

  //   },

  // ]


  return (
    <>
      <div className="annDash relative h-full">

      {
          role=== "EMPLOYEE" ?
          <EmployeeSidebar pop={pop} setPop={setPop} />
           :
        <AdminSidebar pop={pop} setPop={setPop} />
        }


        <div className="tm">
        {
            role === "EMPLOYEE" ?
             <EmployeeNavbar user={user} setAlert={setAlert}  />:

          <AdminNavbar user={user} setAlert={setAlert} />
          } 

          <div className="em">

            <div className='anNav'>

              {/* left sie */}
              <div className='anNavLeft'>

                <h2>Manage Goal Tracking</h2>
                <p>Dashboard <span>Goal Tracking</span> </p>

              </div>

              {/* rogth side  */}
              <div onClick={() => setOpenForm(true)} className='plusImg'>
                <img src={annPlus} alt="" />

              </div>

            </div>


            <main className='anMain'>

              {/* top */}
              <div className='anmainTop'>
                {/* left side */}
                <div className='anMLef'>

                  <select name="" id="">
                    <option value="10">10</option>
                  </select>

                  <span>entries per page</span>

                </div>

                {/* right side  */}
                <div className='anMaRi'>
                  <input type="text" placeholder='Search...' />
                </div>
              </div>



              <div class="relative overflow-x-auto">

                <table class="w-full text-sm text-left rtl:text-right text-black dark:text-black">

                  <thead class="text-xs text-black uppercase  dark:text-black">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        GOAL TYPE
                      </th>
                      <th scope="col" class="px-6 py-3">
                        SUBJECT
                      </th>
                      <th scope="col" class="px-6 py-3">
                        BRANCH
                      </th>
                      <th scope="col" class="px-6 py-3">
                        TARGET ACHIEVEMENT
                      </th>
                      <th scope="col" class="px-6 py-3">
                        START DATE
                      </th>
                      <th scope="col" class="px-6 py-3">
                        END DATE
                      </th>
                      <th scope="col" class="px-6 py-3">
                        RATING
                      </th>
                      <th scope="col" class="px-6 py-3">
                        PROGRESS
                      </th>
                      <th scope="col" class="px-6 py-3">
                        ACTION
                      </th>
                    </tr>
                  </thead>

                  <tbody>

                    {
                      data.map((item, index) => (
                        <tr key={index} class="bg-white">

                          <td class="px-6 py-4">
                            {item.GoalType}
                          </td>
                          <td class="px-6 py-4">
                            {item.subject}
                          </td>
                          <td class="px-6 py-4">
                            {item.Branch}
                          </td>
                          <td class="px-6 py-4">
                            {item.target}
                          </td>

                          <td class="px-6 py-4">
                            {item.startDate}
                          </td>
                          <td class="px-6 py-4">
                            {item.endDate}
                          </td>
                          <td class="px-6 py-4">
                            {item.rating}
                          </td>
                          <td class="px-6 py-4">
                            {item.progress}%
                          </td>

                          <td class="px-6 py-4">
                            <div className='flex items-center sk'>
                              <i onClick={() => {
                                setOnEdit(true);
                                setEditData(item);
                                setOpenForm(true)
                              }} className="fa-solid fa-pen-to-square"></i>
                              <i onClick={() => {
                                deleteProject(item?._id)
                              }} className="fa-solid fa-trash"></i>
                            </div>
                          </td>


                        </tr>
                      ))
                    }



                  </tbody>

                </table>

                <p className='showText'>Showing 1 to 1 of 1 entries</p>

              </div>


            </main>

          </div>
        </div>

        {/* form  */}
        {
          openForm &&
          <div className='annFormwrap'>

            <form onSubmit={() => {
              submitHandler();
              setOpenForm(false);
            }} className='openform' >

              <nav>
                {/* left  */}
                <h2>Create New Goal Tracking</h2>
                <img onClick={() => {
                  setOpenForm(false);
                  setOnEdit(false);
                  setEditData({});
                  setFormdata({
                    Branch: "", GoalType: "", startDate: "", endDate: "", subject: "", target: "", description: "", status: "", rating: "", progress: ""
                  })
                }} className='cursor-pointer' src={cross} alt="" />
              </nav>

              <hr />

              <div className="allInputFileds">

                <label htmlFor="" className='halfLabel' >
                  <p>Branch</p>
                  <select name="Branch" id="Branch" onChange={changeHandler} value={formdata.Branch}>
                    <option>Select Branch</option>
                    {
                      branch?.map((val, index) => {
                        return <option key={index} value={val.name}>{val.name}</option>
                      })
                    }
                  </select>
                </label>

                <label className='halfLabel' >
                  <p>GoalTypes</p>
                  <select name="GoalType" id="GoalType" value={formdata.GoalType} onChange={changeHandler}>
                    <option>Select Goal Type</option>
                    <option>Short term goal</option>
                    <option>Long term goal</option>
                  </select>
                </label>

                <label className='halfLabel' >
                  <p>Start Date</p>
                  <input value={formdata.startDate} name='startDate' onChange={changeHandler} type="date" />
                </label>
                <label className='halfLabel' >
                  <p>End Date</p>
                  <input value={formdata.endDate} name='endDate' onChange={changeHandler} type="date" />
                </label>

                <label className='fullLabel' >
                  <p>Subject</p>
                  <input value={formdata.subject} onChange={changeHandler} name='subject' type="text" />
                </label>

                <label className='fullLabel' >
                  <p>Target Achievement</p>
                  <input value={formdata.target} name='target' onChange={changeHandler} type="text" />
                </label>
                <label htmlFor='description' className='fullLabel' >
                  <p>Description</p>
                  <textarea value={formdata.description} name="description" id="description" onChange={changeHandler} cols="20" rows="8"></textarea>
                </label>

                <label htmlFor='status' className='fullLabel' >
                  <p>Status</p>
                  <select value={formdata.status} id="status" name='status' onChange={changeHandler}>
                    <option>Not Started</option>
                    <option>In progress</option>
                    <option>Completed</option>
                  </select>
                </label>


                <div className='fullStars' >
                  {/* <FaRegStar />
                  <FaRegStar />
                  <FaRegStar />
                  <FaRegStar />
                  <FaRegStar /> */}
                  <p>Rating</p>
                  <input className='w-full' value={formdata.rating} name='rating' onChange={changeHandler} type="number" placeholder='rating out of 5' />
                </div>

                <div className='fullStars' >
                  {/* <FaRegStar />
                  <FaRegStar />
                  <FaRegStar />
                  <FaRegStar />
                  <FaRegStar /> */}
                  <p>Progress</p>
                  <input className='w-full' value={formdata.progress} name='progress' onChange={changeHandler} type="range" placeholder='Progress' />
                </div>


              </div>

              <hr />

              <div className="createBtn">
                <button type='button' onClick={() => {
                  setOpenForm(false);
                  setOnEdit(false);
                  setEditData({});
                  setFormdata({
                    Branch: "", GoalType: "", startDate: "", endDate: "", subject: "", target: "", description: "", status: "", rating: "", progress: ""
                  })
                }} className='cancelBtn'>Cancel</button>
                <button type='submit' className='creteBtn'>Create</button>
              </div>


            </form>
          </div>
        }

      </div>
    </>
  )
}

export default GoalTracking;