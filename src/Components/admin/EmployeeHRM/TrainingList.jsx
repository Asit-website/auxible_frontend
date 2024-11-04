import React, { useState, useEffect } from "react";
import AdminNavbar from "../Navbar/AdminNavbar";
import AdminSidebar from "../Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import chevron from "../../images/chevron_right.png";
import { useMain } from "../../../hooks/useMain";

import "./award.css";
import "./trainingsetup.css"

import plusIcon from "../../images/plusIcon.png";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import toast from "react-hot-toast";



const HRMsystemSetup = ({ setAlert, pop, setPop }) => {
  const { user, getBranchs, createTrainingList, getTrainer, getTrainingList, updateTrainingList, deleteTrainingList, allEmployee } = useMain();



  const [popup1, setPopup1] = useState(false);
  const [popup2, setPopup2] = useState(false);
  const [allBranch, setBranch] = useState([]);
  const [data, setData] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [trainerList, setTrainerList] = useState([]);
  const [allEmp, setAllEmp] = useState([]);

  const [onEdit, setOnEdit] = useState(false);
  const [editData, setEditData] = useState({});

  const fetchBranch = async () => {
    const ans = await getBranchs();
    setBranch(ans?.data);
  }

  const fetchTrainer = async () => {
    const ans = await getTrainer();
    setTrainerList(ans?.data);
  }

  const fetchEmployee = async () => {
    const ans = await allEmployee();
    setAllEmp(ans?.emp)
  }
  const getData = async () => {
    const ans = await getTrainingList();
    setData(ans?.data);
  }

  const [formdata, setFormdata] = useState({
    Branch: "", trainerOption: "", trainingType: "", trainer: "", trainingCost: "", Employee: "", startDate: "", endDate: "", description: "", status: "", performance:"",remarks:""
  })

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
            await deleteTrainingList(id);
            toast.success("delete Successfully");
            setRefreshFlag(!refreshFlag);
          }
        },
        {
          label: 'Cancel',

          onClick: () => null
        }
      ]
    });

  };

  const changeHandler = (e) => {
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
        Branch: editData.Branch,
        trainerOption: editData.trainerOption,
        trainingType: editData.trainingType,
        trainer: editData.trainer,
        Description: editData.Description,
        trainingCost: editData.trainingCost,
        Employee: editData.Employee,
        startDate: editData.startDate,
        endDate: editData.endDate,
        description: editData.description,
        status: editData.status,
        performance: editData.performance,
        remarks: editData.remarks
      })
    }
  }, [editData])


  const submitHandler = async () => {
    if (onEdit) {
      const ans = await updateTrainingList({ ...formdata });
      toast.success("update successfully");
      setRefreshFlag(!refreshFlag);
    }
    else {
      const ans = await createTrainingList({ ...formdata });
      toast.success("Successfuly Created");
      setRefreshFlag(!refreshFlag);
    }
    setPopup1(false)
    setPopup2(false)
  }

  useEffect(() => {
    fetchBranch();
    fetchTrainer();
    fetchEmployee();
    getData();
  }, [refreshFlag])


  return (
    <>
      <div className="employee-dash h-full">
        <AdminSidebar pop={pop} setPop={setPop} />

        <div className="tm awardtm">
          <AdminNavbar setAlert={setAlert} />

          <div className="em">
            <div className="flex-col">
              <div className="admin-main adminmain">
                <div className="plusSection">
                  <div className="adminFirt">
                    <h2 className="hrmShed">Manage Training</h2>

                    <div className="hrmDoHe">
                      <p>Dashboard</p>
                      <img src={chevron} alt="" />
                      <span>Training</span>
                    </div>
                  </div>

                  <img
                    onClick={() => {
                      setPopup1(true);
                    }}
                    className="plusiCON"
                    src={plusIcon}
                    alt=""
                  />
                </div>

                <div>
                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            BRANCH
                          </th>
                          <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                              TRAINING TYPE
                              <a href="#">
                                <svg
                                  className="w-3 h-3 ms-1.5"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                </svg>
                              </a>
                            </div>
                          </th>
                          <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                              STATUS
                              <a href="#">
                                <svg
                                  className="w-3 h-3 ms-1.5"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                </svg>
                              </a>
                            </div>
                          </th>
                          <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                              EMPLOYEE
                              <a href="#">
                                <svg
                                  className="w-3 h-3 ms-1.5"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                </svg>
                              </a>
                            </div>
                          </th>
                          <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                              TRAINER
                              <a href="#">
                                <svg
                                  className="w-3 h-3 ms-1.5"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                </svg>
                              </a>
                            </div>
                          </th>
                          <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                              TRAINING DURATION
                              <a href="#">
                                <svg
                                  className="w-3 h-3 ms-1.5"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                </svg>
                              </a>
                            </div>
                          </th>
                          <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                              COST
                              <a href="#">
                                <svg
                                  className="w-3 h-3 ms-1.5"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                </svg>
                              </a>
                            </div>
                          </th>
                          <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                              ACTION
                              <a href="#">
                                <svg
                                  className="w-3 h-3 ms-1.5"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                </svg>
                              </a>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <thead className="text-xs text-gray-700 uppercase bg-white-50 dark:bg-white-700 dark:text-gray-400">
                        {
                          data?.map((val, index) => {
                            return <tr key={index}>
                              <th scope="col" className="px-6 py-3 bg-white">
                                {val?.Branch}
                              </th>
                              <th scope="col" className="px-6 py-3 bg-white">
                                <div className="flex items-center">
                                  {val?.trainerOption}
                                  <a href="#">
                                    <svg
                                      className="w-3 h-3 ms-1.5"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                    </svg>
                                  </a>
                                </div>
                              </th>
                              <th scope="col" className="px-6 py-3 bg-white">
                                <div className="flex items-center">
                                  <button onClick={() => {
                                    setOnEdit(true);
                                    setEditData(val);
                                    setPopup2(true);
                                  }} type="button" class="px-6 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{val?.status}</button>
                                  <a href="#">
                                    <svg
                                      className="w-3 h-3 ms-1.5"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                    </svg>
                                  </a>
                                </div>
                              </th>
                              <th scope="col" className="px-6 py-3 bg-white">
                                <div className="flex items-center">
                                  {val?.Employee}
                                  <a href="#">
                                    <svg
                                      className="w-3 h-3 ms-1.5"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                    </svg>
                                  </a>
                                </div>
                              </th>
                              <th scope="col" className="px-6 py-3 bg-white">
                                <div className="flex items-center">
                                  {val?.trainer}
                                  <a href="#">
                                    <svg
                                      className="w-3 h-3 ms-1.5"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                    </svg>
                                  </a>
                                </div>
                              </th>
                              <th scope="col" className="px-6 py-3 bg-white bg-white">
                                <div className="flex items-center">
                                  {/* Dec 1, 2023 to Mar 1, 2024 */}
                                  {val?.startDate} to {val?.endDate}
                                  <a href="#">
                                    <svg
                                      className="w-3 h-3 ms-1.5"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                    </svg>
                                  </a>
                                </div>
                              </th>
                              <th scope="col" className="px-6 py-3 bg-white">
                                <div className="flex items-center">
                                  ${val?.trainingCost}
                                  <a href="#">
                                    <svg
                                      className="w-3 h-3 ms-1.5"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                    </svg>
                                  </a>
                                </div>
                              </th>
                              <th scope="col" className="px-6 py-3 bg-white">
                                <div className='flex items-center sk'>
                                  <i onClick={() => {
                                    setOnEdit(true);
                                    setEditData(val);
                                    setPopup1(true);
                                  }} className="fa-solid fa-pen-to-square"></i>
                                  <i onClick={() => {
                                    deleteProject(val?._id);
                                  }} className="fa-solid fa-trash"></i>
                                </div>
                              </th>
                            </tr>
                          })
                        }

                      </thead>
                    </table>

                  </div>

                </div>


                <>
                  {/* Main modal */}

                </>

              </div>
            </div>
          </div>
        </div>

        {popup1 && (
          <div className="allPopupWrap">
            <div className="popup1 awardpopup popup33">
              <h2>Create New Training</h2>
              <label onClick={() => {
                setPopup1(false);
                setOnEdit(false);
                setEditData({});
                setFormdata({
                  Branch: "", trainerOption: "", trainingType: "", trainer: "", trainingCost: "", Employee: "", startDate: "", endDate: "", description: "", status: "",
                })
              }} className="cross-icon"></label>

              <hr />

              {/* <div className="award-popup-label"> */}
              <div className="award-popup-label traininginput">
                <label htmlFor="Branch">
                  <p>Branch</p>
                  <select onChange={changeHandler} value={formdata?.Branch} name="Branch" id="Branch">
                    <option>Select Branch</option>
                    {
                      allBranch?.map((val, index) => {
                        return <option key={index} value={val?.name}>{val?.name}</option>
                      })
                    }
                  </select>
                </label>
              </div>
              <div className="award-popup-label">
                <label htmlFor="trainerOption">
                  <p>Trainer Option</p>
                  <input
                    type="text"
                    name="trainerOption"
                    value={formdata?.trainerOption}
                    onChange={changeHandler}
                    id="trainerOption"
                    placeholder="Internal"
                  />
                </label>
                <label htmlFor="trainingType">
                  <p>Training Type</p>
                  <input
                    type="text"
                    name="trainingType"
                    value={formdata?.trainingType}
                    onChange={changeHandler}
                    id="trainingType"
                    // onChange={(e) => {
                    //   setBranch(e.target.value);
                    // }}
                    // value={branch}
                    placeholder="Offline"
                  />
                </label>
              </div>

              {/* {
                onEdit &&
                <div className="award-popup-label okij w-full">
                  <label htmlFor="status">
                    <p>Status</p>
                   
                    <select name="status" id="status" onChange={changeHandler} value={formdata?.status}>
                         <option>Select Status</option>
                         <option>Pending</option>
                         <option>Started</option>
                         <option>Completed</option>
                         <option>Terminated</option>
                    </select>
                  </label>
                </div>
              } */}

              <div className="award-popup-label">
                <label htmlFor="">
                  <p>Trainer</p>
                  <select value={formdata?.trainer} name="trainer" id="trainer" onChange={changeHandler}>
                    <option>Select Trainer</option>
                    {
                      trainerList?.map((val, index) => {
                        return <option key={index}>{val?.firstName} {val?.lastName}</option>
                      })
                    }
                  </select>
                </label>
                <label htmlFor="trainingCost">
                  <p>Training Cost</p>
                  <input
                    type="text"
                    name="trainingCost"
                    value={formdata?.trainingCost}
                    id="trainingCost"
                    onChange={changeHandler}
                    placeholder=""
                  />
                </label>
              </div>

              <div className="award-popup-label traininginput">
                <label htmlFor="Employee">
                  <p>Employee</p>
                  <select value={formdata?.Employee} name="Employee" id="Employee" onChange={changeHandler}>
                    <option disabled>Select Employee</option>
                    {
                      allEmp?.map((val, index) => {
                        return <option key={index} value={val?.fullName}>{val?.fullName}</option>
                      })
                    }
                  </select>
                </label>
              </div>
              <div className="award-popup-label">
                <label htmlFor="startDate">
                  <p>Start Date</p>
                  <input
                    type="date"
                    name="startDate"
                    onChange={changeHandler}
                    id="startDate"
                    value={formdata?.startDate}
                  />
                </label>
                <label htmlFor="endDate">
                  <p>End Date</p>
                  <input
                    type="date"
                    name="endDate"
                    id="endDate"
                    value={formdata?.endDate}
                    onChange={changeHandler}
                  />
                </label>
              </div>

              <div className="award-popup-label award-popup-textarea">
                <label htmlFor="description">
                  <p>Description</p>
                  <textarea onChange={changeHandler} value={formdata?.description} id="description" name="description" rows="6" cols="50" placeholder="Enter Description"></textarea>
                </label>
              </div>
              {/* <div/> */}

              <hr />

              <div className="btnWrap Award-popup-btn">
                <button onClick={() => {
                  setPopup1(false);
                  setOnEdit(false);
                  setEditData({});
                  setFormdata({
                    Branch: "", trainerOption: "", trainingType: "", trainer: "", trainingCost: "", Employee: "", startDate: "", endDate: "", description: "", status: "",
                  })
                }} className="cencel awd-cancel">
                  <span>Cancel</span>
                </button>

                <button onClick={() => {
                  setPopup1(false);
                  submitHandler();
                }} className="create awd-create" >
                  <span>{onEdit ? "Update" : "Create"}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {popup2 && (
          <div className="allPopupWrap">
            <div style={{overflow:"hidden"}} className="popup1 popup110 testingk">
              {
                onEdit &&
                <div>
                <div className="award-popup-label okij w-full">
                  <label htmlFor="status">
                    <p>Status</p>
                    <select style={{width:"460px"}} name="status" id="status" onChange={changeHandler} value={formdata?.status}>
                         <option>Select Status</option>
                         <option>Pending</option>
                         <option>Started</option>
                         <option>Completed</option>
                         <option>Terminated</option>
                    </select>
                  </label>
                </div>
                 <div className="award-popup-label okij w-full">
                 <label htmlFor="performance">
                   <p>Performance</p>
                   {/* <input
                     type="text"
                     name="performance"
                     value={formdata?.performance}
                     onChange={changeHandler}
                     id="performance"
                     className="w-full"
                   /> */}
                      <select style={{width:"460px"}} name="performance" id="performance" onChange={changeHandler} value={formdata?.performance}>
                         <option>Select Performance</option>
                         <option>Not Calculated</option>
                         <option>Satisfactory</option>
                         <option>Average</option>
                         <option>Poor</option>
                         <option>Excellent</option>
                    </select>
                 </label> 
               </div>
               <div className="award-popup-label okij w-full">
                 <label htmlFor="remarks">
                   <p>Remarks</p>
                   <input
                     type="text"
                     name="remarks"
                     value={formdata?.remarks}
                     onChange={changeHandler}
                     id="remarks"
                     className="w-full"
                   />
                 </label>
               </div>
               </div>
              }



              <div className="btnWrap Award-popup-btn">
                <button onClick={() => {
                  setPopup2(false);
                  setOnEdit(false);
                  setEditData({});
                  setFormdata({
                    status: "",
                  })
                }} className="cencel awd-cancel">
                  <span>Cancel</span>
                </button>

                <button onClick={() => {
                  setPopup2(false);
                  submitHandler();
                }} className="create awd-create" >
                  <span>{onEdit ? "Update" : "Create"}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default HRMsystemSetup;
