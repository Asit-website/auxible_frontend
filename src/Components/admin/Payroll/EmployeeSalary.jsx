import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import { useEffect, useState } from "react";
import talent from '../../images/talent.svg';
import { useNavigate } from "react-router-dom";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";
const EmployeeSalary = ({
    pop,
    setPop
   
}) => {
    const { user, getUsers } = useMain();

    let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

    const {role} = hrms_user;



    const [data, setData] = useState([]);



    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        const ans = await getUsers();
        console.log(ans?.data);
        setData(ans?.data);
    }


    const navigate = useNavigate();

const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;

const [searchtext, setSearchTxt] = useState("");

const filteredData = data?.filter((x) => x?.designation !== "CEO" && x?._id !== user?._id)?.filter((x) => x?.fullName
?.toLowerCase()?.includes(searchtext?.toLowerCase())); // Assuming you're filtering by 'name'

const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

const handleNextPage = () => {
  setCurrentPage((prevPage) => prevPage + 1);
};

const handlePrevPage = () => {
  setCurrentPage((prevPage) => prevPage - 1);
};

useEffect(() => {
  setCurrentPage(1); // Reset to page 1 on new search
}, [searchtext]);


    return (
        <>
            <div className="employee-dash h-full">
            {
          role=== "EMPLOYEE" ?
          <EmployeeSidebar pop={pop} setPop={setPop} />
           :
        <AdminSidebar pop={pop} setPop={setPop} />
        }
                <div className="tm">
                {
            role === "EMPLOYEE" ?
             <EmployeeNavbar />:

          <AdminNavbar user={user} />
          } 


                    <div className="em ">

                        <div className="flex-col emWraping">

                            {/* first  */}
                            <div className="hrmDasTxtFir2">
                                <h2>Manage Employee Salary</h2>
                            </div>

                            <div className="employee_sal_card">

                                <div className="emp_selo">

                                    <h3 className="somoi">Employee</h3>

                                    <form className="max-w-md mx-auto">
                                        <label
                                            htmlFor="default-search"
                                            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                                        >
                                            Search
                                        </label>
                                        <div className="relative">
                                            <div className="absolute sonit inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                <svg
                                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                                    />
                                                </svg>
                                            </div>
                                            <input
                                                type="search"
                                                id="default-search"
                                                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Search Employee"
                                                required=""
                                                onChange={(e)=>setSearchTxt(e.target.value)}
                                                value={searchtext}
                                                
                                            />

                                        </div>
                                    </form>

                                </div>

                                <div className="relative overflow-x-auto sklin">

                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr className="sipi">
                                                <th scope="col" className="px-6 py-3">
                                                    Employee ID
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Employee Name
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Payroll Type
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Salary
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Net Salary
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                currentItems.filter(x => x.designation !== "CEO" && x._id !== user._id )?.map((val, index) => {
                                                    return <tr key={index} className="bg-white opos border-b dark:bg-gray-800 dark:border-gray-700">
                                                        <th
                                                            scope="row"
                                                            className="px-6 py-4 oklo font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                        >
                                                            {/* {index + 1} */}
                                                            #KDS{val?.employeeCode}
                                                        </th>
                                                        <td className="px-6 py-4">{val?.fullName}</td>
                                                        <td className="px-6 py-4">Monthly Payslip</td>
                                                        <td className="px-6 py-4">₹{val?.salary}</td>
                                                        <td className="px-6 py-4">₹{val?.netSalary}</td>
                                                        <td onClick={() => {
                                                            navigate(`/adminDash/setAll/${val?._id}`,{state:val?._id});
                                                        }} className="px-6 py-4">
                                                            <img src={talent} alt="" />
                                                        </td>
                                                    </tr>
                                                })
                                            }

                                        </tbody>
                                    </table>

                                </div>

                                <div className="prev_next">

                                    <div className="next">
                                        <button onClick={handlePrevPage} disabled={currentPage === 1}>
                                            <span>Prev</span>
                                            <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.08748 0L0.912476 1.175L4.72914 5L0.912476 8.825L2.08748 10L7.08748 5L2.08748 0Z" fill="#666D76" />
                                            </svg>

                                        </button>
                                    </div>

                                    <div className="on1">
                                        <p> <p>{currentPage}</p></p>
                                    </div>

                                    <div className="next">
                                        <button onClick={handleNextPage} disabled={currentItems.length < itemsPerPage}> <span>Next</span>
                                            <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.08748 0L0.912476 1.175L4.72914 5L0.912476 8.825L2.08748 10L7.08748 5L2.08748 0Z" fill="#666D76" />
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

export default EmployeeSalary;
