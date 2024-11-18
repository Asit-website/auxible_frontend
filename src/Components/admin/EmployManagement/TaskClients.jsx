import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import "./HRMsystem.css";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";
import "./quote.css";
import pluss from "../../images/pluss.png";
import { Avatar } from "react-profile-avatar";
import "react-profile-avatar/dist/index.css";
import threedots from "../../images/thredonts.png";
import { useEffect, useRef, useState } from "react";
import happy from "../../images/bx-happy-heart-eyes.png";
import edit from "../../images/edit.png";
import disable from "../../images/bx-hide.png";
import cut from "../../images/cutt.png";
import bxfile from "../../images/bx-file.svg";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";

const TaskClients = ({ setAlert, pop, setPop }) => {
  const { user, createClientapi, getClientapi, editTaskapi, disableClientapi } =
    useMain();

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const { role } = hrms_user;

  const [formdata, setFormdata] = useState({
    Name: "",
    Email: "",
    City: "",
    State: "",
    ZipCode: "",
    PhoneNumber: "",
    Country: "",
    Address: "",
  });

  const [showIndex, setShowIndex] = useState(null);

  const [addClientPop, setAddClientPop] = useState(false);

  const [showImport, setShowImport] = useState(false);

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [allClient, setAllClient] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const getAllClient = async () => {
    try {
      const ans = await getClientapi();
      console.log("ans", ans);
      if (ans?.status) {
        setAllClient(ans?.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("sometinng went wrong ,please try agin");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Loading...");
    try {
      const ans = await createClientapi({ ...formdata });
      if (ans?.status) {
        toast.success("Successfuly created");
        getAllClient();
        setFormdata({
          Name: "",
          Email: "",
          City: "",
          State: "",
          ZipCode: "",
          PhoneNumber: "",
          Country: "",
          Address: "",
        });
        setAddClientPop(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("sometinng went wrong ,please try agin");
    }

    toast.dismiss(toastId);
  };

  const editHandler = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Loading...");
    try {
      const ans = await editTaskapi({ ...formdata, clientId: isEdit });
      if (ans?.status) {
        toast.success("Successfuly updated");
        getAllClient();
        setFormdata({
          Name: "",
          Email: "",
          City: "",
          State: "",
          ZipCode: "",
          PhoneNumber: "",
          Country: "",
          Address: "",
        });
        setAddClientPop(false);
        setIsEdit(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("sometinng went wrong ,please try agin");
    }

    toast.dismiss(toastId);
  };

  const disableHandler = async (id) => {
    const toastId = toast.loading("Loading...");
    try {
      const ans = await disableClientapi(id);
      if (ans?.status) {
        toast.success("Successfuly done");
        getAllClient();
        setShowIndex(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("sometinng went wrong ,please try agin");
    }

    toast.dismiss(toastId);
  };

  // for the import excel sheet
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);

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
        console.log("slect file", selectedFile);
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
         console.log("data ",data);
        const {
          Name , Email , City , State , ZipCode , PhoneNumber , Country , Address
        } = data[i];

        const ans = await createClientapi({
          Name , Email , City , State , ZipCode , PhoneNumber , Country , Address
        });
      }
       setShowImport(false);
     getAllClient();
      toast.success("Successfuly uploaded");

      toast.dismiss(toastId);
    }
  };

  useEffect(() => {
    getAllClient();
  }, []);

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
            <div className="tclwrap">
              <nav>
                <h2>Clients</h2>

                <div className="clibtns">
                  <button
                    onClick={() => {
                      setAddClientPop(true);
                    }}
                    className="newcli"
                  >
                    <img src={pluss} alt="" /> <span>New Client</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowImport(true);
                    }}
                    className="impcli"
                  >
                    <span>Import Client</span>
                  </button>
                  {/* <button className="expoclient">
                    <span>Export Client</span>
                  </button> */}
                </div>
              </nav>

              <div className="allClients">
                {allClient.map((client, index) => (
                  <div key={index} className="singleclient2">
                    <div
                      onClick={() => {
                        if (showIndex === index) {
                          setShowIndex(null);
                        } else {
                          setShowIndex(index);
                        }
                      }}
                      className="navdiv cursor-pointer"
                    >
                      {" "}
                      <img src={threedots} alt="" />
                    </div>

                    <Avatar
                      name={client?.Name}
                      colour={
                        index % 3 == 0
                          ? "#3C78E9"
                          : `${index % 2 == 0 ? "#E45D3A" : "#F7A539"}`
                      }
                      size={60}
                      className="avatarclient"
                    />

                    <h3>{client?.Name}</h3>
                    <p>{client?.Email}</p>

                    {showIndex === index && (
                      <div className="showIndexcont">
                        <div className="singlinpro">
                          <img src={happy} alt="" />
                          <span>View</span>
                        </div>

                        <hr />

                        <div
                          onClick={() => {
                            setIsEdit(client?._id);
                            setFormdata(client);
                            setAddClientPop(true);
                            setShowIndex(null);
                          }}
                          className="singlinpro"
                        >
                          <img src={edit} alt="" />
                          <span>Edit</span>
                        </div>

                        <hr />

                        <div
                          onClick={() => {
                            disableHandler(client?._id);
                          }}
                          className="singlinpro"
                        >
                          <img src={disable} alt="" />
                          <span className="delspan">
                            {client?.isDisable ? "UnDisable" : "Disable"}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {addClientPop && (
        <div className="addCliWrap">
          <div className="addClieCont">
            <nav>
              <p>Add Client</p>
              <img
                onClick={() => {
                  setAddClientPop(false);
                  setIsEdit(false);
                }}
                src={cut}
                alt=""
              />
            </nav>

            <hr />

            <form onSubmit={isEdit ? editHandler : submitHandler}>
              <label>
                <p>Name</p>
                <input
                  type="text"
                  name="Name"
                  value={formdata.Name}
                  onChange={changeHandler}
                  placeholder="Name"
                />
              </label>

              <label>
                <p>Email</p>
                <input
                  type="text"
                  name="Email"
                  value={formdata.Email}
                  onChange={changeHandler}
                  placeholder="Email"
                />
              </label>

              <div className="citstateCont">
                <label>
                  <p>City</p>
                  <input
                    type="text"
                    name="City"
                    value={formdata.City}
                    onChange={changeHandler}
                    placeholder="City"
                  />
                </label>

                <label>
                  <p>State</p>
                  <input
                    type="text"
                    name="State"
                    value={formdata.State}
                    onChange={changeHandler}
                    placeholder="State"
                  />
                </label>
              </div>

              <div className="citstateCont">
                <label>
                  <p>Zip/Post Code</p>
                  <input
                    type="text"
                    name="ZipCode"
                    value={formdata.ZipCode}
                    onChange={changeHandler}
                    placeholder="Zip/Post Code"
                  />
                </label>

                <label>
                  <p>Country</p>
                  <input
                    type="text"
                    name="Country"
                    value={formdata.Country}
                    onChange={changeHandler}
                    placeholder="Country"
                  />
                </label>
              </div>

              <label>
                <p>Phone Number</p>
                <input
                  type="text"
                  name="PhoneNumber"
                  value={formdata.PhoneNumber}
                  onChange={changeHandler}
                  placeholder="Phone Number"
                />
              </label>

              <label>
                <p>Address</p>
                <input
                  type="text"
                  name="Address"
                  value={formdata.Address}
                  onChange={changeHandler}
                  placeholder="Address"
                />
              </label>

              <div className="btnsss">
                <button type="submit" className="saveclient">
                  <span>Save Client</span>
                </button>
                <button
                  onClick={() => {
                    setAddClientPop(false);
                  }}
                  className="cancel"
                >
                  <span>Cancel</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showImport && (
        <div className="addCliWrap">
          <div className="addClieCont3">
            <nav>
              <p>Upload Client</p>
              <img
                onClick={() => {
                  setShowImport(false);
                }}
                src={cut}
                alt=""
              />
            </nav>

            <hr />

            <div className="uploadClient">
              <div className="topUpclien">
                <img src={bxfile} alt="" />
                <span>Upload Clients</span>
              </div>

              <div className="chosefilesec">
                <p>Select CSV File</p>
                <button onClick={handleButtonClick}>
                  {" "}
                  <span>Choose File Here</span>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFile}
                  accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  />
              </div>
            </div>

            <div className="uplbtns">
              <button onClick={()=>handleFileSubmit()} className="up">
                <span>Upload</span>
              </button>
              <button onClick={() => {
                  setShowImport(false);
                }} className="clos">
                <span>Close</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default TaskClients;
