import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import HrSidebar from "../../Hr/Sidebar/HrSidebar";
import HrNavbar from "../../Hr/Navbar/HrNavbar";
import "./hrm.css";
import "./leaveReq.css";
import "./markAttendance.css";
import moreVert from "../../images/more_vert.png";
import { useEffect, useState } from "react";
import upload2 from "../../images/upload_2.png";
import frames from "../../images/Frame 1000010647.png";
import bxsearch from "../../images/bx-search.png";
import crosss from "../../images/crosss.png";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";
import edit from "../../images/edit.png";
// import delete4 from "../../images/delete.png";
import cutt from "../../images/cut.png"
import { parse, format } from 'date-fns';
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";


const MarkAttendance = ({
  pop1,
  setPop1,
  pop,
  setPop,
  setAlert,
  isHr = false,
}) => {
  const {
    user,
    getAllActivities,
    getDepartments,
    allEmployee,
    getAllActivities2,
    postAttendence,
    updateAttendance,
    deleteAttendence
  } = useMain();
  const [data, setData] = useState([]);
  const [data1, setData1] = useState({});
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [allDash, setAllDash] = useState([]);

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const { role } = hrms_user;

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [currentPage2, setCurrentPage2] = useState(1);

  const pageSize2 = 10;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handleNextPage2 = () => {
    if (currentPage2 < totalPages2) {
      setCurrentPage2(currentPage2 + 1);
    }
  };

  // Function to handle previous page click
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to handle previous page click
  const handlePrevPage2 = () => {
    if (currentPage2 > 1) {
      setCurrentPage2(currentPage2 - 1);
    }
  };

  const totalPages = Math.ceil(data?.length / pageSize);

  const totalPages2 = Math.ceil(allDash?.length / pageSize);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data?.slice(startIndex, endIndex);
  };

  const getCurrentPageData2 = () => {
    const startIndex = (currentPage2 - 1) * pageSize2;
    const endIndex = startIndex + pageSize2;
    return allDash?.slice(startIndex, endIndex);
  };

  const parseDate = (dateStr) => {
    if (dateStr !== null) {
      const [day, month, year] = dateStr?.split("/")?.map(Number);
      return new Date(year, month - 1, day); // Month is 0-indexed in Date
    } else {
      return dateStr;
    }
  };

  const getData = async () => {
    let ans = await getAllActivities();
    setAllDash(ans?.data);
    const ans1 = await allEmployee();
    setUsers(ans1?.emp);

    const sortedArray = ans?.data.sort(
      (a, b) => parseDate(b?.Date) - parseDate(a?.Date)
    );

    setData1(sortedArray);
    const ans2 = await getDepartments();
    setDepartments(ans2.data);
  };

  var [selectedOption, setSelectedOption] = useState("daily");

  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [userId, setuserId] = useState("");
  const [department, setDepartment] = useState("Select Department");

  const handleOptionChange = () => {
    handleSubmit();
  };

  const formatDate = (inputDate) => {
    const dateObj = new Date(inputDate);
    const year = dateObj.getFullYear();
    const month = ("0" + (dateObj.getMonth() + 1))?.slice(-2);
    const day = ("0" + dateObj.getDate())?.slice(-2);
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async () => {
    let monthUpdate;

    if (month) {
      const regex = /-(\d+)/;
      const match = month.match(regex);

      if (match) {
        monthUpdate = match[1];
      }
    }

    if (selectedOption === "daily") {
      if (department !== "Select Department") {
        if (date === "") {
          // alert("Please select the date ");
        } else {
          const date1 = formatDate(date);

          let ans = await getAllActivities2(
            selectedOption,
            date1,
            monthUpdate,
            userId,
            department
          );
          setData(ans?.data);
        }
      } else {
        // alert("Please select the department")
      }
    } else if (selectedOption === "all") {
      getData();
    } else {
      let ans = await getAllActivities2(
        selectedOption,
        date,
        monthUpdate,
        userId,
        department
      );
      if (ans?.status) {
        setData(ans?.data);
      }
    }
  };



  const handleDownload = async () => {
    console.log("handleDownload");
  };

  const handleShare = async () => {
    console.log("share");
  };

  const calculateTime = (clockIn, clockOut) => {
    if (clockIn && clockOut) {
      const getHour = (time) => {
        const hourStr = time.split(":")[0];
        const hour = parseInt(hourStr);
        if (hour === 12) {
          return 12;
        } else {
          return hour % 12;
        }
      };

      let clockInDetail = getHour(clockIn);
      let clockOutDetail = getHour(clockOut);

      let count = 0;

      while (clockInDetail !== clockOutDetail) {
        if (clockInDetail === 12) {
          clockInDetail = 1;
        } else {
          clockInDetail++;
        }
        count++;
      }

      if (count >= 9) {
        return true;
      } else {
        return false;
      }
    } else {
      console.error("Error: clockIn or clockOut is null.");
      return false;
    }
  };

  useEffect(() => {
    getData();
  }, [currentPage]);

  const currentPageData = getCurrentPageData();

  const currentPageData2 = getCurrentPageData2();

  const [showImportPop, setShowImportPop] = useState(false);

  const [makeChange, setMakeChange] = useState(true);

  const [srchText, setSrchText] = useState("");

  const srchHandler = (e) => {
    setSrchText(e.target.value);
  };

  useEffect(() => {
    if (selectedOption === "monthly") {
      if (srchText === "") {
        getData();
      } else {
        const filteredData = data.filter(
          (item) =>
            item &&
            item.user &&
            item.user.fullName &&
            item.user.fullName.includes(srchText)
        );
      }
    }
  }, [srchText, makeChange]);

  useEffect(() => {
    if (selectedOption !== "monthly") {
      getData();
    }
  }, [selectedOption, makeChange]);

  // Excel sheet
  const [excelFile, setExcelFile] = useState(null);

  const [typeError, setTypeError] = useState(null);

  // submit state
  const [excelData, setExcelData] = useState(null);

  // onchange event
  const handleFile = (e) => {
    let fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];

    let selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target.result);
        };
      } else {
        setTypeError("please seelect only file type");
        setExcelFile(null);
      }
    } else {
      console.log("please select the file");
    }
  };

  // onsubmit event
  const handleFileSubmit = async (e) => {
    e.preventDefault();

    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });

      const worksheetName = workbook.SheetNames[0];

      const worksheet = workbook.Sheets[worksheetName];

      const data = XLSX.utils.sheet_to_json(worksheet);

      let toastId;

      if (data?.length > 0) {
        toastId = toast.loading("Loading....");
      }

      setExcelData(data?.slice(0, 10));

      for (let i = 0; i < data?.length; i++) {
        const { Break, date, clockIn, clockOut, Employee } = data[i];

        const excelDateObj = new Date((date - 25569) * 86400000); // Subtract base date (Dec 30, 1899)

        const formattedDate = format(excelDateObj, 'MM/dd/yyyy');


        const convertExcelTime = (excelTime) => {
          const totalSeconds = Math.round(excelTime * 86400);
          const hours = Math.floor(totalSeconds / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);
          const seconds = totalSeconds % 60;
          const date = new Date(0, 0, 0, hours, minutes, seconds);
          return format(date, 'h:mm:ss a');
        };

        const formattedClockIn = convertExcelTime(clockIn);
        const formattedClockOut = convertExcelTime(clockOut);


        // Parse Break value to hours, minutes, and seconds
        const breakSeconds = parseInt(Break * 86400, 10); // Convert to seconds
        const breakHours = Math.floor(breakSeconds / 3600);
        const breakMinutes = Math.floor((breakSeconds % 3600) / 60);
        const breakSecondsRemainder = breakSeconds % 60;

        // Format Break time as string
        const formattedBreak = `${breakHours}:${breakMinutes}:${breakSecondsRemainder}`;

        const filterdata = users.filter(
          (item) => item?.fullName.toLowerCase() === Employee.toLowerCase()
        );


        if (filterdata?.length > 0) {
          let id = filterdata[0]?._id;
          const ans = await postAttendence({
            clockInDetail: formattedClockIn,
            clockOutDetail: formattedClockOut,
            id: id,
            breakTime: formattedBreak,
            clockInDate: formattedDate,
          });


          toast.success("Successfuly uploaded");

        }
      }


      toast.dismiss(toastId);
    }
  };

  const [optionedit, setOptionEdit] = useState(null);

  const [editForm, setEditform] = useState(null);

  useEffect(() => {
    handleSubmit();
  }, [makeChange])

  const updateHandler = async () => {
    let toastId = toast.loading("Loading...");
    try {

      const ans = await updateAttendance(editForm?._id, editForm?.Date, editForm?.clockIn, editForm?.clockOut, editForm?.breakTime);

      if (ans?.status) {
        toast.success("Successfuly updated");
        setEditform(null);
        setOptionEdit(null);
        getData();
        setMakeChange((prev) => !prev);

      }
      else {
        toast.error("Something went wrong , please try again later");
      }

    } catch (error) {
      console.log(error);
      toast.error("Someting went wrong, please try again");
    }

    toast.dismiss(toastId);

  }

  const convertToDisplayFormat = (dateStr) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleChange = (e) => {
    const inputDate = e.target.value; // format: yyyy-mm-dd
    const displayDate = convertToDisplayFormat(inputDate);
    setEditform(prev => ({
      ...prev,
      Date: displayDate
    }));
  };

  const deleteHandler = async (id) => {
    const ans = await deleteAttendence(id);
    if (ans?.status) {
      toast.success("Successffuly deleted");
      setMakeChange((prev) => !prev);
    }
    else {
      toast.error("Something went wrong , please try again");
    }
  }

  return (
    <>
      <h1>Hello Dinesh</h1>
      <div className="employee-dash h-full">
        {isHr ? <HrSidebar /> :
          role === "EMPLOYEE" ?
            <EmployeeSidebar pop={pop} setPop={setPop} />
            :
            <AdminSidebar pop={pop} setPop={setPop} />


        }
        <div className="tm relative">
          {isHr ? (
            <HrNavbar
              user={user}
              setAlert={setAlert}
              pop1={pop1}
              setPop1={setPop1}
            />
          ) : (

            role === "EMPLOYEE" ?
              <EmployeeNavbar /> :

              <AdminNavbar user={user} setAlert={setAlert} />

          )}

          <div className="em ">

            <div className="flex-col emWraping">
              {/* first  */}
              <div className="hrmDasTxtFir2">
                <h2>Attendance  Management</h2>

                <button onClick={() => setShowImportPop(true)}>
                  {" "}
                  <img src={upload2} alt="" />
                  <span>Upload File</span>
                </button>
              </div>

              <div className="marSecond">
                <div className="mAdSlE">
                  <button
                    onClick={() => {
                      setSelectedOption("daily");
                      selectedOption = "daily";
                      handleOptionChange();
                    }}
                    className={`${selectedOption === "daily" ? "mselected" : "notSelected"
                      }`}
                  >
                    <span>Daily Report</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedOption("monthly");
                      selectedOption = "monthly";
                      handleOptionChange();
                    }}
                    className={`${selectedOption === "monthly" ? "mselected" : "notSelected"
                      }`}
                  >
                    <span>Monthly Report</span>
                  </button>
                </div>

                <div className="maDSrIGH">
                  {selectedOption === "daily" && (
                    <>
                      <div name="" id="">
                        <input
                          type="date"
                          name="date"
                          id="date"
                          value={date}
                          onChange={(e) => {
                            setDate(e.target.value);
                          }}
                          className="daate_mate_btn"
                        />
                      </div>

                      <select
                        className="markAttSelect"
                        onChange={(e) => {
                          setDepartment(e.target.value);
                        }}
                      >
                        <option value="Select Department">
                          Select Department
                        </option>
                        <option value="All">All</option>
                        {departments?.map((e, index) => {
                          return (
                            <option value={e?.name} key={index}>
                              {e?.name}
                            </option>
                          );
                        })}
                      </select>



                      <div>
                        <img
                          onClick={handleSubmit}
                          className="cursor-pointer"
                          src={frames}
                          alt=""
                        />
                      </div>
                    </>
                  )}
                  {selectedOption === "monthly" && (
                    <>
                      {/* <h2>Monthly</h2> */}
                      <div>
                        <input
                          type="month"
                          name="month"
                          id="month"
                          value={month}
                          onChange={(e) => setMonth(e.target.value)}
                          className="daate_mate_btn"
                        />
                      </div>



                      <select
                        className="markAttSelect"
                        value={userId}
                        onChange={(e) => {
                          setuserId(e.target.value);
                        }}
                      >
                        <option value="Select Employee">
                          {" "}
                          Select Employee{" "}
                        </option>
                        {users?.map((e, index) => {
                          return (
                            <option key={index} value={e._id}>
                              {" "}
                              {e?.fullName}{" "}
                            </option>
                          );
                        })}
                      </select>


                      <div>
                        <img
                          onClick={handleSubmit}
                          className="cursor-pointer"
                          src={frames}
                          alt=""
                        />
                      </div>
                    </>
                  )}

                  {selectedOption === "all" && (
                    <>
                      <select
                        className="markAttSelect"
                        value={userId}
                        onChange={(e) => {
                          setuserId(e.target.value);
                        }}
                      >
                        <option value=""> Select Employee </option>
                        {users?.map((e, index) => {
                          return (
                            <option key={index} value={e._id}>
                              {" "}
                              {e?.fullName}{" "}
                            </option>
                          );
                        })}
                      </select>

                      <div>
                        <input
                          id="all"
                          type="radio"
                          name="all"
                          value="all"
                          checked={selectedOption === "all"}
                          onChange={handleOptionChange}
                        />{" "}
                        All
                      </div>

                      <div className="resSeBtn">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                          onClick={handleSubmit}
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                          />
                        </svg>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                          onClick={handleDownload}
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                          />
                        </svg>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                          onClick={handleShare}
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                          />
                        </svg>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                          />
                        </svg>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <main className="MarkAtMain">
                <div className="marknav">
                  <div className="marNavLef">
                    <h3>Daily Attendance</h3>

                    <div className="seexwrap">
                      <div className="serchEmpl">
                        <input
                          type="text"
                          value={srchText}
                          onChange={srchHandler}
                          placeholder="Search Employee"
                        />
                        <img src={bxsearch} alt="" />
                      </div>

                      {(selectedOption === "daily" && date === "" ) && (
                        <ReactHTMLTableToExcel
                          id="test-table-xls-button"
                          className="download-table-xls-button exprtbtn"
                          table="table-to-xls"
                          filename="tablexls"
                          sheet="tablexls"
                          buttonText="Export"
                        />
                      )}

                      {(selectedOption === "daily" && date !== "") && (
                        <ReactHTMLTableToExcel
                          id="test-table-xls-button"
                          className="download-table-xls-button exprtbtn"
                          table="table-to-xls1"
                          filename="tablexls"
                          sheet="tablexls"
                          buttonText="Export"
                        />
                      )}

                      {selectedOption === "monthly" && (
                        <ReactHTMLTableToExcel
                          id="test-table-xls-button"
                          className="download-table-xls-button exprtbtn"
                          table="table-to-xls2"
                          filename="tablexls"
                          sheet="tablexls"
                          buttonText="Export"
                        />
                      )}

{selectedOption === "all" && (
                        <ReactHTMLTableToExcel
                          id="test-table-xls-button"
                          className="download-table-xls-button exprtbtn"
                          table="table-to-xls3"
                          filename="tablexls"
                          sheet="tablexls"
                          buttonText="Export"
                        />
                      )} 
                    </div>
                  </div>
                </div>

                {/* this is do shwo all empplye  */}
                {selectedOption === "daily" && date !== "" ? (
                  <div className="relative overflow-x-auto">
                    <table
                      id="table-to-xls1"
                      className="w-full martable text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3 currentText">
                            Employee Name
                          </th>
                          <th scope="col" className="px-6 py-3 currentText">
                            Department
                          </th>
                          <th scope="col" className="px-6 py-3 currentText">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 currentText">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 currentText">
                            clock In
                          </th>
                          <th scope="col" className="px-6 py-3 currentText">
                            clock out
                          </th>
                          <th scope="col" className="px-6 py-3 currentText">
                            Break
                          </th>

                          <th scope="col" className="px-6 py-3 currentText">
                            action
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {data?.map((item, index) => (
                          <tr key={index} className="bg-white ">
                            <td className="px-6 py-4 itemANs">
                              {item?.user?.fullName}
                            </td>
                            <td className="px-6 py-4 itemANs">
                              {item?.user?.department}
                            </td>
                            <td className="px-6 py-4 itemANs">{item?.Date}</td>
                            <td className="px-6 py-4 itemANs">
                              {calculateTime(item.clockIn, item.clockOut)
                                ? "Full Day"
                                : "Half Day"}
                            </td>

                            <td className="px-6 py-4 itemANs">
                              {item?.clockIn}
                            </td>
                            <td className="px-6 py-4 itemANs">
                              {item?.clockOut}
                            </td>
                            <td className="px-6 py-4 itemANs">
                              {item?.breakTime ? item?.breakTime : "No break"}
                            </td>


                            <td
                              // onClick={() => {
                              //   if (optionedit === index) {
                              //     setOptionEdit(null);
                              //   } else {
                              //     setOptionEdit(index);
                              //   }
                              // }}
                              className="px-6 py-4 relative cursor-pointer"
                            >
                              {/* <img src={moreVert} alt="" /> */}

                              <svg onClick={() => {
                                setEditform(item);
                              }} className="cursor-pointer" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.71569 5.51667L10.4824 6.28333L2.93236 13.8333H2.16569V13.0667L9.71569 5.51667ZM12.7157 0.5C12.5074 0.5 12.2907 0.583333 12.1324 0.741667L10.6074 2.26667L13.7324 5.39167L15.2574 3.86667C15.5824 3.54167 15.5824 3.01667 15.2574 2.69167L13.3074 0.741667C13.1407 0.575 12.9324 0.5 12.7157 0.5ZM9.71569 3.15833L0.499023 12.375V15.5H3.62402L12.8407 6.28333L9.71569 3.15833Z" fill="#383838" />
                              </svg>

                              {/* {optionedit === index && (
                                  <div className="attaedipop">

                                    <div
                                      onClick={() => {
                                        setEditform(item);
                                      }}
                                      className="attposin"
                                    >
                                      <img src={edit} alt="" />
                                      <p>Edit</p>
                                    </div>
                                   
                                  </div>
                                )} */}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  selectedOption !== "monthly" && (
                    <div className="relative overflow-x-auto">
                      <table
                        id="table-to-xls"
                        className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" className="px-6 py-3 currentText">
                              Employee
                            </th>
                            <th scope="col" className="px-6 py-3 currentText">
                              Department
                            </th>
                            <th scope="col" className="px-6 py-3 currentText">
                              Date
                            </th>
                            <th scope="col" className="px-6 py-3 currentText">
                              Status
                            </th>
                            <th scope="col" className="px-6 py-3 currentText">
                              clock In
                            </th>
                            <th scope="col" className="px-6 py-3 currentText">
                              clock out
                            </th>
                            <th scope="col" className="px-6 py-3 currentText">
                              Break
                            </th>

                            <th scope="col" className="px-6 py-3 currentText">
                              action
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {currentPageData2?.map((item, index) => (
                            <tr key={index} className="bg-white ">
                              <td className="px-6 py-4 itemANs">
                                {item?.user?.fullName}
                              </td>

                              <td className="px-6 py-4 itemANs">
                                {item?.user?.department}
                              </td>

                              <td className="px-6 py-4 itemANs">
                                {item?.Date}
                              </td>

                              <td className="px-6 py-4 itemANs">
                                {calculateTime(item.clockIn, item.clockOut)
                                  ? "Full Day"
                                  : "Half Day"}
                              </td>

                              <td className="px-6 py-4 itemANs">
                                {item?.clockIn}
                              </td>

                              <td className="px-6 py-4 itemANs">
                                {item?.clockOut}
                              </td>

                              <td className="px-6 py-4 itemANs">
                                {item?.breakTime ? item?.breakTime : "No break"}
                              </td>

                              <td

                                className="px-6 py-4 relative cursor-pointer"
                              >
                                {/* <img src={moreVert} alt="" /> */}

                                <svg onClick={() => {
                                  setEditform(item);
                                }} className="cursor-pointer" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M9.71569 5.51667L10.4824 6.28333L2.93236 13.8333H2.16569V13.0667L9.71569 5.51667ZM12.7157 0.5C12.5074 0.5 12.2907 0.583333 12.1324 0.741667L10.6074 2.26667L13.7324 5.39167L15.2574 3.86667C15.5824 3.54167 15.5824 3.01667 15.2574 2.69167L13.3074 0.741667C13.1407 0.575 12.9324 0.5 12.7157 0.5ZM9.71569 3.15833L0.499023 12.375V15.5H3.62402L12.8407 6.28333L9.71569 3.15833Z" fill="#383838" />
                                </svg>


                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <div className="prevNextWrap">
                        <button
                          className="prebBtN"
                          onClick={handlePrevPage2}
                          disabled={currentPage2 === 1}
                        >
                          Prev
                        </button>
                        <div className="crrpage">
                          {currentPage2} / {totalPages2}
                        </div>
                        <button
                          className="prebBtN"
                          onClick={handleNextPage2}
                          disabled={currentPage2 === totalPages2}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )
                )}

                {selectedOption === "monthly" && (
                  <div className="relative overflow-x-auto">
                    <table
                      id="table-to-xls2"
                      className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3 currentText">
                            Employee Name
                          </th>

                          <th scope="col" className="px-6 py-3 currentText">
                            Department
                          </th>

                          <th scope="col" className="px-6 py-3 currentText">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 currentText">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 currentText">
                            clock In
                          </th>
                          <th scope="col" className="px-6 py-3 currentText">
                            clock out
                          </th>
                          <th scope="col" className="px-6 py-3 currentText">
                            Break
                          </th>

                          <th scope="col" className="px-6 py-3 currentText">
                            action
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {currentPageData?.map((item, index) => (
                          <tr key={index} className="bg-white ">
                            <td className="px-6 py-4 itemANs">
                              {item?.user?.fullName}
                            </td>

                            <td className="px-6 py-4 itemANs">
                              {item?.user?.department}
                            </td>

                            <td className="px-6 py-4 itemANs">{item?.Date}</td>

                            <td className="px-6 py-4 itemANs">
                              {calculateTime(item.clockIn, item.clockOut)
                                ? "Full Day"
                                : "Half Day"}
                            </td>
                            <td className="px-6 py-4 itemANs">
                              {item?.clockIn}
                            </td>
                            <td className="px-6 py-4 itemANs">
                              {item?.clockOut}
                            </td>
                            <td className="px-6 py-4 itemANs">
                              {item?.breakTime ? item?.breakTime : "No break"}
                            </td>


                            <td
                              // onClick={() => {
                              //   if (optionedit === index) {
                              //     setOptionEdit(null);
                              //   } else {
                              //     setOptionEdit(index);
                              //   }
                              // }}
                              className="px-6 py-4 relative cursor-pointer"
                            >
                              {/* <img src={moreVert} alt="" /> */}

                              <svg onClick={() => {
                                setEditform(item);
                              }} className="cursor-pointer" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.71569 5.51667L10.4824 6.28333L2.93236 13.8333H2.16569V13.0667L9.71569 5.51667ZM12.7157 0.5C12.5074 0.5 12.2907 0.583333 12.1324 0.741667L10.6074 2.26667L13.7324 5.39167L15.2574 3.86667C15.5824 3.54167 15.5824 3.01667 15.2574 2.69167L13.3074 0.741667C13.1407 0.575 12.9324 0.5 12.7157 0.5ZM9.71569 3.15833L0.499023 12.375V15.5H3.62402L12.8407 6.28333L9.71569 3.15833Z" fill="#383838" />
                              </svg>

                              {/* {optionedit === index && (
                                <div className="attaedipop">
                                 
                                  <div
                                    onClick={() => {
                                      setEditform(item);
                                    }}
                                    className="attposin"
                                  >
                                    <img src={edit} alt="" />
                                    <p>Edit</p>
                                  </div>
                                 
                                </div>
                              )} */}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="prevNextWrap">
                      <button
                        className="prebBtN"
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                      >
                        Prev
                      </button>
                      <div className="crrpage">
                        {currentPage} / {totalPages}
                      </div>
                      <button
                        className="prebBtN"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {selectedOption === "all" && (
                  <div className="relative overflow-x-auto">
                    <table
                      id="table-to-xls3"
                      className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3 currentText">
                            Employee
                          </th>
                          <th scope="col" className="px-6 py-3 currentText">
                            Branch
                          </th>
                          <th scope="col" className="px-6 py-3 currentText">
                            Department
                          </th>

                          <th scope="col" className="px-6 py-3 currentText">
                            Designation
                          </th>
                          <th scope="col" className="px-6 py-3 currentText">
                            Total working days
                          </th>
                          <th scope="col" className="px-6 py-3 currentText">
                            Present
                          </th>
                          <th scope="col" className="px-6 py-3 currentText">
                            Absent
                          </th>
                          <th scope="col" className="px-6 py-3 currentText">
                            action
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {data1 &&
                          Object.keys(data1)?.length > 0 &&
                          Object.keys(data1)?.map((item, index) => (
                            <tr key={index} className="bg-white ">
                              <td className="px-6 py-4 itemANs">
                                {data1[item]?.user?.fullName}
                              </td>
                              <td className="px-6 py-4 itemANs">
                                {data1[item]?.user?.Branch}
                              </td>
                              <td className="px-6 py-4 itemANs">
                                {data1[item]?.user?.department}
                              </td>
                              <td className="px-6 py-4 itemANs">
                                {data1[item]?.user?.designation}
                              </td>
                              <td className="px-6 py-4 itemANs">
                                {data1[item]?.workingDays}
                              </td>
                              <td className="px-6 py-4 itemANs">
                                {data1[item]?.presentCount}
                              </td>
                              <td className="px-6 py-4 itemANs">
                                {data1[item]?.absentCount}
                              </td>

                              <td className="px-6 py-4 ">
                                <img src={moreVert} alt="" />
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}


              </main>
            </div>

            {/* for  import cvv popup  */}

            {showImportPop && (
              <div className="importPopWrap">
                <div className="impPopCont">
                  <nav>
                    <h2>Import employee CSV file</h2>
                    <img
                      onClick={() => setShowImportPop(false)}
                      src={crosss}
                      alt=""
                    />
                  </nav>

                  <hr className="hrrr" />

                  <div className="excewrap">
                    {/* <p>Choose File</p> */}
                    <input type="file" required onChange={handleFile} />
                    <span>Exemption application</span>
                  </div>

                  <p className="extext">
                    Exemption application of nawab sharif in DV act (3).doc
                  </p>

                  <div className="impopbtn">
                    <button
                      onClick={() => setShowImportPop(false)}
                      className="cence"
                    >
                      <span>Cancel</span>
                    </button>
                    <button onClick={handleFileSubmit} className="uplaodin">
                      <span>Upload</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {typeError && <div>{typeError}</div>}

          {
            editForm !== null &&


            <div className="editFromwrap">


              <div className="editfromcont">

                <nav >
                  <h2>Edit Attendance</h2>
                  <img onClick={() => setEditform(null)} src={cutt} alt="" />
                </nav>

                <hr />

                <div className="editSindiv">

                  <label htmlFor="">
                    <p>Employee</p>
                    <input value={editForm?.user?.fullName} type="text" />
                  </label>

                  <label htmlFor="">
                    <p>Date</p>
                    <input onChange={handleChange} value={editForm?.Date?.split('/').reverse().join('-') || ''} type="date" />

                  </label>

                </div>

                <div className="editSindiv">

                  <label htmlFor="">
                    <p>Check In</p>
                    <input onChange={(e) => setEditform((prev) => ({
                      ...prev,
                      clockIn: e.target.value
                    }))} value={editForm?.clockIn} type="text" />
                  </label>

                  <label htmlFor="">
                    <p>Check Out</p>
                    <input onChange={(e) => setEditform((prev) => ({
                      ...prev,
                      clockOut: e.target.value
                    }))} value={editForm?.clockOut} type="text" />
                  </label>

                </div>


                <div className="editSindiv">


                  <label >
                    <p>Break</p>
                    <input onChange={(e) => setEditform((prev) => ({
                      ...prev,
                      breakTime: e.target.value
                    }))} value={editForm?.breakTime} type="text" />
                  </label>

                </div>


                <div className="formupdacan">
                  <button onClick={updateHandler} className="upda"><span>Update</span></button>
                  <button onClick={() => setEditform(null)} className="canc"><span>Cancel</span></button>
                </div>

              </div>

            </div>


          }


        </div>
      </div>
    </>
  );
};

export default MarkAttendance;
