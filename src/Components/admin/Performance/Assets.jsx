import AdminSidebar from '../Sidebar/AdminSidebar';
import AdminNavbar from '../Navbar/AdminNavbar';
import { useMain } from '../../../hooks/useMain'
import annPlus from "../../images/annPlus.png"
import "./indicator.css"
import { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import toast from 'react-hot-toast';
import bxSerch from "../../images/bx-search.png"
import thedots from "../../images/thedots.png"
import editsss from "../../images/editss.svg"
import ccc from "../../images/ccc.png"
import EmployeeSidebar from '../../Employee/Sidebar/EmployeeSidebar';
import EmployeeNavbar from '../../Employee/Navbar/EmployeeNavbar';


const Assets = ({ pop, setPop, setAlert }) => {
  const { user, createAssets, allEmployee, getAssets,deleteAssets,updateAssets  , getDepartments , getDesignations } = useMain();

  const [openForm, setOpenForm] = useState(false);

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const {role} = hrms_user;

  const [employee, setEmployee] = useState([]);

  const [data, setData] = useState([]);

  const [refreshFlag, setRefreshFlag] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [editData, setEditData] = useState({});

  const [formdata, setFormdata] = useState({
    Employee:"",
    designation:"",
    department:"",
    product:"",
    purchaseDate:"",
    additonal:"",
    description:""
  })

  const changeHandler = (e) => {
    e.preventDefault();
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
        Employee: editData.Employee,
        designation: editData.designation,
        department: editData.department,
        product: editData.product,
        purchaseDate: editData.purchaseDate,
        additonal: editData.additonal,
        description: editData.description
      })
    }
  }, [editData])


  const submitHandler = async (e) => {
    try {
      if (onEdit) {
        await updateAssets({ ...formdata });
        toast.success("update successfully");
        setRefreshFlag(!refreshFlag);
      }
      else {
        await createAssets({ ...formdata });
        toast.success("Successfuly Created");
        setRefreshFlag(!refreshFlag);
      }
      setOpenForm(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData()
    fetchEmployee();
  }, [refreshFlag]);


  const getData = async () => {
    const ans = await getAssets();
    setData(ans?.data);
    setRefreshFlag(!refreshFlag)
  }


  const fetchEmployee = async () => {
    const ans = await allEmployee();
    setEmployee(ans?.emp);

  }

  const [department , setDepartment] = useState([]);
  const [designation , setDesignation] = useState([]);

  const departmentCollect = async()=>{
    const ans2 = await  getDepartments();
    setDepartment(ans2?.data);
    
  }
  const designationCollect = async()=>{
    const ans3 = await getDesignations();
    setDesignation(ans3?.data);

  }

  useEffect(()=>{
    departmentCollect();
    designationCollect();
  },[])


   const [showdots , setShowdots] = useState(null);

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

                <h2>Assets Management</h2>
              </div>

              {/* rogth side  */}
              <div onClick={() => setOpenForm(true)} className='plusImg'>

                <img src={annPlus} alt="" />
               <span>  Add New</span>

              </div>

            </div>


            <main className='anMain'>

              {/* top */}
              <div className='anmainTop'>
                {/* left side */}

                <h3>Assets</h3>

                <div className="amtopsrch">

                  <input type="text" placeholder='Search Employee' />
                   <img src={bxSerch} alt="" />

                </div>
               
              </div>



              <div class="relative overflow-x-auto">

                <table class="w-full text-sm assettable ">

                  <thead class="text-xs text-black uppercase  dark:text-black">
                    <tr>
                      <th scope="col" class="px-4 py-3">
                        EMPLOYEE
                      </th>
                      <th scope="col" class="px-4 py-3">
                        DESIGNATION
                      </th>
                      <th scope="col" class="px-4 py-3">
                        DEPARTMENT
                      </th>
                      <th scope="col" class="px-4 py-3">
                        PRODUCT
                      </th>
                      <th scope="col" class="px-4 py-3">
                        SUPPORTED DATE
                      </th>
                      <th scope="col" class="px-4 py-3">
                         ADDTIONAL PRODUCT
                      </th>

                      <th scope="col" class="px-4 py-3">
                         DESCRIPTION
                      </th>
                      <th scope="col" class="px-4 py-3">
                         STATUS
                      </th>

                      <th scope="col" class="px-4 py-3">
                        ACTION
                      </th>
                    </tr>
                  </thead>

                  <tbody>

                    {
                      data?.length > 0 ?
                        data.map((item, index) => (
                          <tr key={index} class="bg-white asetr">

                            <td class="px-4 py-4">
                              {item?.Employee}
                            </td>
                            <td class="px-4 py-4">
                              {item?.designation}
                            </td>
                            <td class="px-4 py-4">
                              {item?.department}
                            </td>
                            <td class="px-4 py-4">
                              {item?.product}
                            </td>

                            <td class="px-4 py-4">
                              {item?.purchaseDate}
                            </td>
                            <td class="px-4 py-4">
                              {item?.additonal}
                            </td>

                            <td class="px-4 py-4">
                              {item?.description}
                            </td>
                            <td class="px-4 py-4">
                              {item?.status}
                            </td>


                                   
                            <td class="px-4 py-4 relative">
                             

                                <img onClick={()=>{
                                  if(showdots === index) {
                                    setShowdots(null);
                                  }
                                  else {

                                    setShowdots(index);
                                  }
                                }} src={thedots} alt="" />


                                 {
                                  showdots === index && 
                                  <div className="showdots">



                                    <p onClick={()=>{
                                         setOnEdit(true);
                                         setEditData(item);
                                         setOpenForm(true);
                                         setShowdots(null);
                                    }}><img src={editsss} alt="" /> <span className='editSpan cursor-pointer'>Edit</span></p>

                                    <hr />

                                    {/* <p onClick={()=>{
                                  deleteProject(item?._id);
                                  setShowdots(null);
                                }}><img src={delete22} alt="" /> <span className='delettspan cursor-pointer'>Delete</span></p> */}

                                  </div>
                                 }
                                  

                            </td>


                          </tr>
                        ))
                        :
                        <div className='noEntries'>

                          <span >No entries found</span>
                        </div>

                    }





                  </tbody>

                </table>


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
                <h2 className='creanewAsseet'>Create New Assets</h2>
                <img onClick={() => {
                  setOpenForm(false);
                  setOnEdit(false);
                  setEditData({});
                  setFormdata({
                    Employee:"",
                    designation:"",
                    department:"",
                    product:"",
                    purchaseDate:"",
                    additonal:"",
                    description:""
                  })
                }} className='cursor-pointer' src={ccc} alt="" />
              </nav>

              <hr />

              <div className="allInputFileds">

                <label className='fullLabel' >
                  <p>Employee</p>
                  <select name="Employee" id="Employee" value={formdata.Employee} onChange={changeHandler}>
                    <option>Select</option>
                    {
                      employee?.map((val, index) => {
                        return <option key={index} value={val?.fullName}>{val?.fullName}</option>
                      })
                    }
                  </select>
                </label>


            
             <div className='labwrapp'>

          
                <label htmlFor="Name" className='halfLabel' >
                  <p>Designation</p>
                  <select name="designation" value={formdata.designation} onChange={changeHandler}>
                    <option>Select</option>
                    {
                      designation?.map((val, index) => {
                        return <option key={index} value={val?.name}>{val?.name}</option>
                      })
                    }
                  </select>
                </label>

                <label className='halfLabel' >
                  <p>Department</p>
                  <select name="department" value={formdata.department} onChange={changeHandler}>
                    <option>Select</option>
                    {
                      department?.map((val, index) => {
                        return <option key={index} value={val?.name}>{val?.name}</option>
                      })
                    }
                  </select>
                </label>

                </div>

                <div className='labwrapp'>

                <label className='halfLabel' >
                  <p>Product</p>
                  <input value={formdata?.product} name='product' onChange={changeHandler} type="text" />
                </label>

                <label className='halfLabel' >
                  <p>To Date</p>
                  <input name='purchaseDate' value={formdata?.purchaseDate} onChange={changeHandler} type="date" />
                </label>

                </div>

                <label className='fullLabel' >
                  <p>Additional Product</p>
                  <input name="additonal" id="additonal" onChange={changeHandler} cols="20" rows="3" value={formdata?.additonal} />
                </label>

                <label className='fullLabel' >
                  <p>Description</p>
                  <textarea name="description" id="description" onChange={changeHandler} cols="20" rows="3" value={formdata?.description}></textarea>
                </label>

              </div>

              <hr />

              <div className="createBtn">
             
                <button type='submit' className='creteBtn'>{onEdit ? "Update" : "Create"}</button>
                <button type='button' onClick={() => {
                  setOpenForm(false);
                  setOnEdit(false);
                  setEditData({});
                  setFormdata({
                    Employee:"",
                    designation:"",
                    department:"",
                    product:"",
                    purchaseDate:"",
                    additonal:"",
                    description:""
                  })
                }} className='cancelBtn'>Cancel</button>
              </div>


            </form>
          </div>
        }

      </div>
    </>
  )
}

export default Assets;