import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import "./HRMsystem.css";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";
import cross1 from "../../images/cross1.png";
import "./quote.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Expense = ({ setAlert, pop, setPop }) => {
  const { user , CreateExpense ,getExpenseApi  , deleteExpenseApi} = useMain();

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));
  const { role } = hrms_user;
  const [openExpense , setOpenExpense] = useState(false);

  const [formdata ,setFormdata] = useState({
    title:"" ,itemCode:"" , quantity:"" , unit:"" ,  purchasePrice:"" , salesPrice:"" , purchaseDate:"" ,  category:""
  })

  const [allExpense , setAllExpense] = useState([]);

  const changeHandler = (e)=>{
    const {name ,value} = e.target;
    setFormdata((prev)=>({
        ...prev ,
        [name]:value
    }))
  }

  const getExpense = async()=>{
    const resp =await getExpenseApi();
    setAllExpense(resp?.expesnes);

  }

  

  const cretaeHandler = async(e)=>{
   const toastId =  toast.loading("Loading...");
    e.preventDefault();
    const resp= await CreateExpense({...formdata});
     toast.success("Successfuly Created");
     toast.dismiss(toastId);
     getExpense();
     setOpenExpense(false);
  }

  const deleteExpense =async(id)=>{
    const toastId =  toast.loading("Loading...");

    const resp = await deleteExpenseApi(id);
    toast.success("Successfuly deleted");
    toast.dismiss(toastId);
    getExpense();
  }

  useEffect(()=>{
    getExpense();
  },[])

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
            <div className="ITRWRAP">
              <nav className="expennav">
                <button onClick={()=>setOpenExpense(true)}>
                  <span>Create Item</span>
                </button>
              </nav>

              <div className="expencont">
                <div class="relative overflow-x-auto w-full">
                  <table class="w-full expensetable text-sm text-left rtl:text-right ">

                    <thead class="text-xs w-full uppercase bg-gray-50  ">
                      <tr>
                      <th scope="col" class="px-6 py-3">
                          Title
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Item Code
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Quantity
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Unit
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Purchase Price
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Sales Price
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Purchase Date
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Category
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                        {
                            allExpense?.map((item , index)=>(
                                <tr key={index} class="bg-white dark:bg-gray-800 ">
                                <td class="px-6 py-4">{item?.title}</td>
                                <td class="px-6 py-4">{item?.itemCode}</td>
                                <td class="px-6 py-4">{item?.quantity}</td>
                                <td class="px-6 py-4">   {item?.unit}  </td>
                                <td class="px-6 py-4"> {item?.purchasePrice}</td>
                                <td class="px-6 py-4"> {item?.salesPrice}</td>
                                <td class="px-6 py-4"> {item?.purchaseDate}</td>
                                <td class="px-6 py-4"> {item?.category}</td>
                                <td class="px-6 py-4">
                                  <div className="flex items-center sk">
                                    <i onClick={()=>deleteExpense(item?._id)} className="fa-solid fa-trash"></i>
                                  </div>
                                </td>
                              </tr>
                            ))
                        }
                    
                    </tbody>
                    
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>




      {openExpense && (
          <div className="allPopupWrap incheight">
            <div className="popup1 expensepop">
              <div className="popNav">
                <h2>Create Expense  </h2>
                <img onClick={() => setOpenExpense(false)} src={cross1} alt="" />
              </div>
              <hr />
              <label>
                <p className="popTitl">Title</p>

                <input
                  type="text"
                  placeholder="Enter Leave Type Name"
                  name="title"
                  value={formdata.title}
                  onChange={changeHandler}
                />
              </label>

              <label>
                <p className="popTitl">Item Code</p>

                <input
                  type="text"
                  placeholder="Enter ItemCode"
                  name="itemCode"
                  value={formdata.itemCode}
                  onChange={changeHandler} />
              </label>

              <label>
                <p className="popTitl">Quantity</p>

                <input
                  type="number"
                  placeholder="Enter Quantity"
                  name="quantity"
                  value={formdata.quantity}
                  onChange={changeHandler}
                   />
              </label>
              
              <label>
                <p className="popTitl">Unit</p>

                <input
                  type="text"
                  placeholder="Enter unit"
                  name="unit"
                  value={formdata.unit}
                  onChange={changeHandler}
                   />
              </label>

              <label>
                <p className="popTitl">Purchase Price</p>

                <input
                  type="number"
                  placeholder="Enter purchasePrice"
                  name="purchasePrice"
                  value={formdata.purchasePrice}
                  onChange={changeHandler}
                   />
              </label>

              <label>
                <p className="popTitl">Sales Price</p>

                <input
                  type="number"
                  placeholder="Enter purchasePrice"
                  name="salesPrice"
                  value={formdata.salesPrice}
                  onChange={changeHandler}
                   />
              </label>

              <label>
                <p className="popTitl">Purchase Date</p>

                <input
                  type="date"
                  placeholder="Enter purchase Date"
                  name="purchaseDate"
                  value={formdata.purchaseDate}
                  onChange={changeHandler}
                   />
              </label>

              <label>
                <p className="popTitl">category</p>

                <input
                  type="text"
                  placeholder="Enter purchase Date"
                  name="category"
                  value={formdata.category}
                  onChange={changeHandler}
                   />
              </label>

              <div className="btnWrap">
                <button className="cencel" onClick={() => setOpenExpense(false)}>
                  <span>Cancel</span>
                </button>

                <button onClick={cretaeHandler} className="create" >
                  <span>Create</span>
                </button>
              </div>

            </div>
          </div>
        )}

 {/* <i className="fa-solid fa-pen-to-square"></i> */}

       
    </>

  );
};
export default Expense;
