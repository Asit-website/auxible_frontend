import React, { useState, useEffect } from "react";
import AdminNavbar from "../Navbar/AdminNavbar";
import AdminSidebar from "../Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import uploadFile from "../../images/upload-file.png";
import { NavLink, useFetcher, useNavigate, useParams } from "react-router-dom";
import HrSidebar from "../../Hr/Sidebar/HrSidebar";
import HrNavbar from "../../Hr/Navbar/HrNavbar";
import toast from "react-hot-toast";
import bxUser from "../../images/bx-user-pin.png";
import { ImCross } from "react-icons/im";
import * as EmailValidator from "email-validator";
import validator from 'validator';

const item = [
  {
    title: "Full-time Employees",
  },
  {
    title: "Intern Employees",
  },
  {
    title: "Freelancer Employees",
  },
];

const EmployeeManage = ({
  pop1,
  setPop1,
  pop,
  setPop,
  setAlert,
  isHr = false,
}) => {
  const { id } = useParams();

  const [currEmp, setCurrEmp] = useState(0);

  const navigate = useNavigate();

  const {
    user,
    createEmployee1,
    AllRolesapi,
    getUsers,
    updateUser,
    getBranchs,
    getDepartments,
    getDesignations,
    uploadDocuments,
    allEmployee,
    uploadToCloudinaryImg
  } = useMain();

  const [employee, setEmployee] = useState([]);

  const getEmployee = async () => {
    const ans = await allEmployee();
    setEmployee(ans?.emp);
  };

  useEffect(() => {
    getEmployee();
  }, []);

  

  const [value1, setValue1] = useState({
    status: false,
    fullName: "",
    password: "",
    department: "",
    email: "",
    reportingManager: "",
    designation: "",
    joiningDate: "",
    PermissionRole: ""
  });

  const [emailisValid, setIsemailValid] = useState(null);
  const [emailisValid1, setIsemailValid1] = useState(null);

  const handleValidation = () => {
    const valid = EmailValidator.validate(value1.email);
    setIsemailValid(valid);
};



  const [value2, setValue2] = useState({
    status: false,
    gmail: "",
    email1: "",
    mobile: "",
    gender: "",
    dob: "",
  });

  const handleValidation1 = () => {
    const valid = EmailValidator.validate(value2.email1);
    setIsemailValid1(valid);
  };

  const [value3, setValue3] = useState({
    status: false,
    pan: "",
    adhar: "",
    father: "",
    currentAddress: "",
    currentState: "",
    currentCity: "",
    currentPin: "",
    residence: "",
    perState: "",
    perCity: "",
    perPin: "",
    Martial: "",
    nationality: "",
    Mother: "",
  });

  const [value4, setValue4] = useState({
    status: false,
    qualification: "",
    specialization: "",
    qualificationType: "",
    yearPass: "",
    university: "",
    college: "",
    percentage: "",
    previousCompany: "",
    previousDesignation: "",
    toDate: "",
    fromDate: "",
    numberOfMonth: "",
    Jobdescription: "",
  });

  const [value5, setValue5] = useState({
    status: false,
    SalaryPay: "",
    SalaryBankName: "",
    BeneficiaryName: "",
    BankIfsc: "",
    AccountNumber: "",
    confirmAccount: "",
    Branch: "",
  });

  const [branches, setBranches] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [PermRole, setPermRole] = useState([]);

  const fetchAllRoles = async () => {
    const ans = await AllRolesapi();
    setPermRole(ans?.data);
  }

  useEffect(() => {
    let form1 = localStorage.getItem("form1");
    if (form1) {
      form1 = JSON.parse(form1);
      setValue1(form1);
    }
    let form2 = localStorage.getItem("form2");
    if (form2) {
      form2 = JSON.parse(form2);
      setValue2(form2);
    }
    let form3 = localStorage.getItem("form3");
    if (form3) {
      form3 = JSON.parse(form3);
      setValue3(form3);
    }
    let form4 = localStorage.getItem("form4");
    if (form4) {
      form4 = JSON.parse(form4);
      setValue4(form4);
    }
    let form5 = localStorage.getItem("form5");
    if (form5) {
      form5 = JSON.parse(form5);
      setValue5(form5);
    }
  }, []);

  useEffect(() => {
    if (id) {
      getUser();
    }
  }, [id, PermRole]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let ans = await getBranchs();
    let ans1 = await getDepartments();
    let ans2 = await getDesignations();
    setBranches(ans?.data);
    setDepartments(ans1?.data);
    setDesignations(ans2?.data);
  };

  const getUser = async () => {
    const ans = await getUsers(id);

    const { EmployeeType } = ans?.data || {};

    if (EmployeeType) {
      const index = item.findIndex(i => i.title === EmployeeType);
      if (index !== -1) {
        setCurrEmp(index);
      }
    }

    let perm = "";

    if (ans?.data?.PermissionRole) {
      const foundRole = PermRole?.find((role) => role?._id === ans.data.PermissionRole);
      if (foundRole) {
        perm = foundRole._id;
      }
    }

    setValue1({
      status: false,
      fullName: ans.data.fullName,
      department: ans.data.department,
      email: ans.data.email,
      reportingManager: ans.data.reportingManager,
      designation: ans.data.designation,
      joiningDate: ans.data.joiningDate,
      password: "",
      PermissionRole: perm
    });
    setValue2({
      status: false,
      gmail: ans.data.gmail,
      email1: ans.data.email1,
      mobile: ans.data.mobile,
      gender: ans.data.gender,
      dob: ans.data.dob,
    });
    setValue3({
      status: false,
      pan: ans.data.pan,
      adhar: ans.data.adhar,
      father: ans.data.father,
      currentAddress: ans.data.currentAddress,
      currentState: ans.data.currentState,
      currentCity: ans.data.currentCity,
      currentPin: ans.data.currentPin,
      residence: ans.data.residence,
      perState: ans.data.perState,
      perCity: ans.data.perCity,
      perPin: ans.data.perPin,
      Martial: ans.data.Martial,
      nationality: ans.data.nationality,
      Mother: ans.data.Mother,
    });
    setValue4({
      status: false,
      qualification: ans.data.qualification,
      specialization: ans.data.specialization,
      qualificationType: ans.data.qualificationType,
      yearPass: ans.data.yearPass,
      university: ans.data.university,
      college: ans.data.college,
      percentage: ans.data.percentage,
      previousCompany: ans.data.previousCompany,
      previousDesignation: ans.data.previousDesignation,
      toDate: ans.data.toDate,
      fromDate: ans.data.fromDate,
      numberOfMonth: ans.data.numberOfMonth,
      Jobdescription: ans.data.Jobdescription,
    });
    setValue5({
      status: false,
      SalaryPay: ans.data.SalaryPay,
      SalaryBankName: ans.data.SalaryBankName,
      BeneficiaryName: ans.data.BeneficiaryName,
      BankIfsc: ans.data.BankIfsc,
      AccountNumber: ans.data.AccountNumber,
      confirmAccount: ans.data.confirmAccount,
      Branch: ans.data.Branch,
    });
  };

  const handleChange = (e, type) => {
    if (type === "form1") {
      setValue1({ ...value1, [e.target.name]: e.target.value });

    }
    else if (type === "form2") {
      if (e.target.name === "mobile" && e.target.value.length > 10) {
        return
      }
      setValue2({ ...value2, [e.target.name]: e.target.value });

    }
    else if (type === "form3") {
      if (e.target.name === "pan" && e.target.value.length > 10) {
        return
      }
      if (e.target.name === "adhar" && e.target.value.length > 12) {
        return
      }
      if (e.target.name === "currentPin" && e.target.value.length > 6) {
        return
      }
      if (e.target.name === "perPin" && e.target.value.length > 6) {
        return
      }
      setValue3({ ...value3, [e.target.name]: e.target.value });
    }
    else if (type === "form4") {
      setValue4({ ...value4, [e.target.name]: e.target.value });
    }
    else if (type === "form5") {
      setValue5({ ...value5, [e.target.name]: e.target.value });
    }
  };

  const [documents, setDocuments] = useState({
    adharCard: "",
    pancard: "",
    tenCert: "",
    twevelCert: "",
    cancelCheque: "",
    LastOrganization: "",
    RelievingLetter: "",
    OfferLetter: "",
    ExperienceLetter: "",


  });

  const [previewImages, setPreviewImages] = useState({})

  const handleFileChange = async (event, name) => {
    const file = event.target.files[0];
    if (file) {
      setDocuments((prevDocuments) => ({
        ...prevDocuments,
        [name]: file,
      }));
    }

    // upload to cludinary for preview 
    const toastId = toast.loading("Wait...");
    const ans = await uploadToCloudinaryImg({ image: file });

    if (ans?.status) {
      toast.success("Successfuly");
      setPreviewImages((prev) => ({
        ...prev,
        [name]: ans?.data
      }))
    }
    toast.dismiss(toastId);
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();

    const toastId = toast.loading("Loading...");

   
        if (emailisValid === false && value1?.email !== "") {
            toast.dismiss(toastId);
            return toast.error("Please Enter Correct Gmail")
        }

        if (emailisValid1 === false && value2?.email1 !== "") {
          toast.dismiss(toastId);
          return toast.error("Please Enter Correct Gmail")
      }

    if (!id) {
      const {
        adharCard,
        pancard,
        tenCert,
        twevelCert,
        cancelCheque,
        LastOrganization,
        RelievingLetter,
        OfferLetter,
        ExperienceLetter,
      } = documents;

      const formData = new FormData();
      if (documents.adharCard) {
        formData.append("adharCard", adharCard);
      }
      if (documents.pancard) {
        formData.append("pancard", pancard);
      }
      if (documents.cancelCheque) {
        formData.append("cancelCheque", cancelCheque);
      }
      if (documents.tenCert) {
        formData.append("tenCert", tenCert);
      }
      if (documents.LastOrganization) {
        formData.append("LastOrganization", LastOrganization);
      }
      if (documents.OfferLetter) {
        formData.append("OfferLetter", OfferLetter);
      }
      if (documents.RelievingLetter) {
        formData.append("RelievingLetter", RelievingLetter);
      }
      if (documents.twevelCert) {
        formData.append("twevelCert", twevelCert);
      }
      if (documents.ExperienceLetter) {
        formData.append("ExperienceLetter", ExperienceLetter);
      }


      if (
        documents.adharCard !== "" ||
        documents.pancard !== "" ||
        documents.tenCert !== "" ||
        documents.twevelCert !== "" ||
        documents.cancelCheque !== "" ||
        documents.LastOrganization !== "" ||
        documents.RelievingLetter !== "" ||
        documents.OfferLetter !== "" ||
        documents.ExperienceLetter !== ""
      ) {
        const ans = await createEmployee1({
          ...value1,
          ...value2,
          ...value3,
          ...value4,
          ...value5,
          formData,
          employeeType: item[currEmp].title
        });

      } else {
        const ans = await createEmployee1({
          ...value1,
          ...value2,
          ...value3,
          ...value4,
          ...value5,
          employeeType: item[currEmp].title
        });

      }

      localStorage.removeItem("form1");
      localStorage.removeItem("form2");
      localStorage.removeItem("form3");
      localStorage.removeItem("form4");
      localStorage.removeItem("form5");

      setValue1({
        status: false,
        fullName: "",
        password: "",
        department: "",
        email: "",
        reportingManager: "",
        designation: "",
        joiningDate: "",
        PermissionRole: ""
      });
      setValue2({
        status: false,
        gmail: "",
        email1: "",
        mobile: "",
        gender: "",
        dob: "",
      });
      setValue3({
        status: false,
        pan: "",
        adhar: "",
        father: "",
        currentAddress: "",
        currentState: "",
        currentCity: "",
        currentPin: "",
        residence: "",
        perState: "",
        perCity: "",
        perPin: "",
        Martial: "",
        nationality: "",
        Mother: "",
      });
      setValue4({
        status: false,
        qualification: "",
        specialization: "",
        qualificationType: "",
        yearPass: "",
        university: "",
        college: "",
        percentage: "",
        previousCompany: "",
        previousDesignation: "",
        toDate: "",
        fromDate: "",
        numberOfMonth: "",
        Jobdescription: "",
      });
      setValue5({
        status: false,
        SalaryPay: "",
        SalaryBankName: "",
        BeneficiaryName: "",
        BankIfsc: "",
        AccountNumber: "",
        confirmAccount: "",
        Branch: "",
      });

      toast.success("Successfuly created");
    } else {
      const {
        adharCard,
        pancard,
        tenCert,
        twevelCert,
        cancelCheque,
        LastOrganization,
        RelievingLetter,
        OfferLetter,
        ExperienceLetter,

      } = documents;

      const formData = new FormData();
      if (documents.adharCard) {
        formData.append("adharCard", adharCard);
      }
      if (documents.pancard) {
        formData.append("pancard", pancard);
      }
      if (documents.tenCert) {
        formData.append("tenCert", tenCert);
      }
      if (documents.twevelCert) {
        formData.append("twevelCert", twevelCert);
      }
      if (documents.LastOrganization) {
        formData.append("LastOrganization", LastOrganization);
      }
      if (documents.RelievingLetter) {
        formData.append("RelievingLetter", RelievingLetter);
      }
      if (documents.OfferLetter) {
        formData.append("OfferLetter", OfferLetter);
      }
      if (documents.ExperienceLetter) {
        formData.append("ExperienceLetter", ExperienceLetter);
      }

      if (

        adharCard !== "" ||
        pancard !== "" ||
        tenCert !== "" ||
        twevelCert !== "" ||
        cancelCheque !== "" ||
        LastOrganization !== "" ||
        RelievingLetter !== "" ||
        OfferLetter !== "" ||
        ExperienceLetter !== ""
      ) {

        const ans = await uploadDocuments(id, formData);
        if (ans?.success) {
          toast.success("Successfuly updated the documents");
        }
      }

      const ans = await updateUser(id, value1, value2, value3, value4, value5);

      toast.success("success", "Profile updated Successfully");

      if (!isHr) {
        navigate("/adminDash/HRM/EmployeeManagement");
      } else {
        navigate("/hrDash/EmployeeMan");
      }
    }

    toast.dismiss(toastId);
  };

  useEffect(() => {
    fetchAllRoles();
  }, [])


  return (
    <>
      <div className="employee-dash h-full">
        {isHr ? <HrSidebar /> : <AdminSidebar pop={pop} setPop={setPop} />}

        <div className="tm">
          {isHr ? (
            <HrNavbar
              user={user}
              setAlert={setAlert}
              pop1={pop1}
              setPop1={setPop1}
            />
          ) : (
            <AdminNavbar user={user} setAlert={setAlert} />
          )}

          <div className="em">

            {/* first  */}
            <section className="adFri">
              {/* left side  */}
              <h2>Add Employee</h2>

              {/* right side  */}
              <div className="adFrRIH">
                <NavLink to="/adminDash/HRM/employeeManagement"><button className="calce">
                  <span>Cancel</span>
                </button></NavLink>
                {/* <button className="register">
                  <span>Register New</span>
                </button> */}
              </div>
            </section>

            <div className="flex-col">

              {/* first sec */}
              <div className="leadInFir">
                {item.map((e, index) => (
                  <div
                    onClick={() => setCurrEmp(index)}
                    className="sinInfir"
                    key={index}
                  >
                    <img src={bxUser} alt="" />

                    <p className={`${currEmp == index ? "currEmp" : "nom"}`}>
                      {e.title}
                    </p>
                  </div>
                ))}
              </div>

              <form
                onSubmit={(f) => {
                  handleSubmit(f, "submit");
                }}
                className="empmanagform"
              >
                <div className="admin-mainnew ">

                  <div className="admin-form">

                    <div className="admin-form1">
                      <h2 className="admfperh2">Personal Detail</h2>

                      <div className="form-section">
                        <div>
                          <div className="flex flex-col emmanformwrap1">

                            <label>
                              <p>Full Name</p>
                              <input
                                onChange={(e) => {
                                  handleChange(e, "form1");
                                }}
                                name="fullName"
                                value={value1?.fullName}
                                type="text"
                                placeholder="Full Name"
                                disabled={value1.status}
                              />
                            </label>

                            <label htmlFor="password">
                              <p>Password</p>

                              <input
                                onChange={(e) => {
                                  handleChange(e, "form1");
                                }}
                                name="password"
                                value={value1?.password}
                                type="text"
                                placeholder="Password"
                                disabled={value1.status}
                              />
                            </label>

                            <label htmlFor="">
                              <p>Department</p>

                              <select
                                onChange={(e) => {
                                  handleChange(e, "form1");
                                }}
                                name="department"
                                value={value1?.department}
                                disabled={value1.status}
                                className="department_test"
                              >
                                <option value={""}>Select Department</option>
                                {departments?.map((e, index) => {
                                  return (
                                    <option key={index} value={e?.name}>
                                      {e?.name}
                                    </option>
                                  );
                                })}
                              </select>
                            </label>

                            <label htmlFor="">
                              <p>Company Email</p>

                              <input
                                onChange={(e) => {
                                  handleChange(e, "form1");
                                  handleValidation(e.target.value)
                                }}
                                className={`${(emailisValid === false && value1.email !== "") && "emailvalidinput"}`}
                                type="email"
                                // name="gmail"
                                name="email"
                                // value={value1?.gmail}
                                value={value1?.email}
                                // placeholder="Company Gmail"
                                placeholder="Company Email Address"
                                disabled={value1.status}
                              />
                            </label>

                            <label htmlFor="">
                              <p>Reporting Manager</p>

                              <select
                                onChange={(e) => {
                                  handleChange(e, "form1");
                                }}
                                name="reportingManager"
                                value={value1?.reportingManager}
                                disabled={value1.status}
                                className="department_test"
                              >
                                <option>Reporting Manager</option>
                                {employee?.map((val, index) => {
                                  return (
                                    <option key={index} value={val?.fullName}>
                                      {val?.fullName}
                                    </option>
                                  );
                                })}
                                {/* <option value="Chirag">Chirag Negi</option> */}
                              </select>
                            </label>

                            <label htmlFor="">
                              <p>Designation</p>

                              <select
                                onChange={(e) => {
                                  handleChange(e, "form1");
                                }}
                                name="designation"
                                value={value1?.designation}
                                disabled={value1.status}
                                className="department_test"
                              >
                                <option>Designation</option>
                                {designations?.map((e, index) => {
                                  return (
                                    <option key={index} value={e?._name}>
                                      {e?.name}
                                    </option>
                                  );
                                })}
                              </select>
                            </label>

                            <label htmlFor="">
                              <p>Role</p>

                              <select
                                onChange={(e) => {
                                  handleChange(e, "form1");
                                }}
                                name="PermissionRole"
                                value={value1?.PermissionRole}
                                disabled={value1.status}
                                className="department_test"
                              >
                                <option selected>Select Role</option>
                                {PermRole?.map((e, index) => {
                                  return (
                                    <option key={index} value={e?._id}>
                                      {e?.name}
                                    </option>
                                  );
                                })}
                              </select>
                            </label>

                            <label htmlFor="">
                              <p>Joining Date</p>

                              <input
                                onChange={(e) => {
                                  handleChange(e, "form1");
                                }}
                                type="date"
                                name="joiningDate"
                                value={value1?.joiningDate}
                                disabled={value1.status}
                              />
                            </label>

                            <label
                              for="email1"
                              className="block mb-0  font-medium"
                            >

                              <p> Personal Email Address</p>
                              <input
                                type="email"
                                id="email1"
                                // rounded-lg  w-full
                                className={`${(emailisValid1 === false && value2.email1 !== "") && "emailvalidinput"} rounded-lg  w-full`}
                                
                                // required
                                name="email1"
                                value={value2?.email1}
                                onChange={(e) => {
                                  handleChange(e, "form2");
                                  handleValidation1(e.target.value)
                                }}
                                disabled={value2.status}
                              />
                            </label>


                            <label
                              for="gender"
                              className="block mb-0  font-medium "
                            >
                              <p> Gender</p>
                              <select
                                onChange={(e) => {
                                  handleChange(e, "form2");
                                }}
                                name="gender"
                                value={value2?.gender}
                                disabled={value2.status}
                                className="w-full rouneded-lg"
                              >
                                <option>gender</option>
                                <option>Male</option>
                                <option>Female</option>
                                onChange=
                                {(e) => {
                                  handleChange(e, "form2");
                                }}
                                disabled={value2.status}
                              </select>
                            </label>



                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="basic-information">
                      <div className="basics">
                        <h3>Address Detail</h3>
                      </div>
                      <hr className="upper" />

                      <div className="form2-class">
                        <div className="w-full mt-2 form2wrap">

                          <div className="makethisflex1">
                            <div className="mb-6 w-full try">
                              <label
                                for="pan"
                                className="block mb-0  font-medium "
                              >
                                PAN No.
                              </label>
                              <input
                                type="text"
                                id="pan"
                                className=" w-full rounded-lg"
                                // required
                                name="pan"
                                value={value3?.pan}
                                onChange={(e) => {
                                  handleChange(e, "form3");
                                }}
                                disabled={value3.status}
                              />
                            </div>

                            <div className="mb-6 w-full try">
                              <label
                                for="adhar"
                                className="block mb-0  font-medium"
                              >
                                Aadhaar No.
                              </label>
                              <input
                                type="text"
                                id="adhar"
                                className="rounded-lg  w-full"
                                // required
                                name="adhar"
                                value={value3?.adhar}
                                onChange={(e) => {
                                  handleChange(e, "form3");
                                }}
                                disabled={value3.status}
                              />
                            </div>

                            <div className="mb-6 w-full try">
                              <label
                                for="father"
                                className="block mb-0 font-medium"
                              >
                                Father Name
                              </label>
                              <input
                                type="text"
                                id="father"
                                className="rounded-lg  w-full"
                                // required
                                name="father"
                                value={value3?.father}
                                onChange={(e) => {
                                  handleChange(e, "form3");
                                }}
                                disabled={value3.status}
                              />
                            </div>
                          </div>
                          <div className="flex w-full">
                            <div className="mb-6 w-full try">
                              <label
                                for="currentAddress"
                                className="block mb-0  font-medium "
                              >
                                Mobile Number*
                              </label>
                              <input
                                type="number"
                                id="mobile"
                                className="rounded-lg  w-full"
                                // required
                                name="mobile"
                                value={value2?.mobile}
                                onChange={(e) => {
                                  handleChange(e, "form2");
                                }}
                                disabled={value2.status}
                              />
                            </div>
                          </div>
                          <div className="flex w-full">
                            <div className="mb-6 w-full try">
                              <label
                                for="currentAddress"
                                className="block mb-0  font-medium "
                              >
                                Current Residence Address
                              </label>
                              <input
                                type="text"
                                id="currentAddress"
                                className="rounded-lg  w-full"
                                // required
                                name="currentAddress"
                                value={value3?.currentAddress}
                                onChange={(e) => {
                                  handleChange(e, "form3");
                                }}
                                disabled={value3.status}
                              />
                            </div>
                          </div>
                          <div className="flex w-full makethisflex1">
                            <div className="mb-6 w-full try">
                              <label
                                for="currentState"
                                className="block mb-0  font-medium "
                              >
                                Current state
                              </label>

                              <input
                                type="text"
                                id="currentState"
                                className="rounded-lg  w-full"
                                // required
                                name="currentState"
                                value={value3?.currentState}
                                onChange={(e) => {
                                  handleChange(e, "form3");
                                }}
                                disabled={value3.status}
                              />
                            </div>
                            <div className="mb-6 w-full try">
                              <label
                                for="currentCity"
                                className="block mb-0  font-medium"
                              >
                                Current city
                              </label>
                              <input
                                type="text"
                                id="currentCity"
                                className="rounded-lg  w-full"
                                // required
                                name="currentCity"
                                value={value3?.currentCity}
                                onChange={(e) => {
                                  handleChange(e, "form3");
                                }}
                                disabled={value3.status}
                              />
                            </div>
                            <div className="mb-6 w-full try">
                              <label
                                for="currentPin"
                                className="block mb-0 font-medium"
                              >
                                Area Pincode
                              </label>
                              <input
                                type="text"
                                id="currentPin"
                                className="rounded-lg  w-full"
                                // required
                                name="currentPin"
                                value={value3?.currentPin}
                                onChange={(e) => {
                                  handleChange(e, "form3");
                                }}
                                disabled={value3.status}
                              />
                            </div>
                          </div>

                          <div className="flex w-full">
                            <div className="mb-6 w-full try">
                              <div className="flex items-center">
                                <label
                                  for="residence"
                                  className="block mb-0  font-medium "
                                >
                                  Permanent Residence Address{" "}
                                </label>
                                <div className="flex items-center">

                                </div>
                              </div>
                              <input
                                type="text"
                                id="residence"
                                name="residence"
                                value={value3?.residence}
                                className=" rounded-lg w-full"
                                onChange={(e) => {
                                  handleChange(e, "form3");
                                }}
                                disabled={value3.status}
                              />
                            </div>
                          </div>

                          <div className="mb-6 try">
                            <label
                              for="currentAddress"
                              className="block mb-0  font-medium "
                            >
                              Permanent state
                            </label>
                            <select
                              className="rounded-lg  w-full"
                              name="perState"
                              value={value3?.perState}
                              id="perState"
                              onChange={(e) => {
                                handleChange(e, "form3");
                              }}
                              disabled={value3.status}
                            >
                              <option>Permanent State</option>
                              <option>Andhra Pradesh</option>
                              <option>Arunachal Pradesh</option>
                              <option>Assam</option>
                              <option>Bihar</option>
                              <option>Chhattisgarh</option>
                              <option>Goa</option>
                              <option>Gujarat</option>
                              <option>Haryana</option>
                              <option>Himachal Pradesh</option>
                              <option>Jharkhand</option>
                              <option>Karnataka</option>
                              <option>Kerala</option>
                              <option>Maharashtra</option>
                              <option>Madhya Pradesh</option>
                              <option>Manipur</option>
                              <option>Meghalaya</option>
                              <option>Mizoram</option>
                              <option>Nagaland</option>
                              <option>Odisha</option>
                              <option>Punjab</option>
                              <option>Rajasthan</option>
                              <option>Sikkim</option>
                              <option>Tamil Nadu</option>
                              <option>Tripura</option>
                              <option>Telangana</option>
                              <option>Uttar Pradesh</option>
                              <option>Uttarakhand</option>
                              <option>West Bengal</option>
                              <option>Andaman & Nicobar (UT)</option>
                              <option>Chandigarh (UT)</option>
                              <option>
                                Dadra & Nagar Haveli and Daman & Diu (UT)
                              </option>
                              <option>
                                Delhi [National Capital Territory (NCT)]
                              </option>
                              <option>Jammu & Kashmir (UT)</option>
                              <option>Ladakh (UT)</option>
                              <option>Lakshadweep (UT)</option>
                              <option>Puducherry (UT)</option>
                            </select>
                          </div>

                          <div className="mb-6 try">
                            <label
                              for="perCity"
                              className="block mb-0  font-medium"
                            >
                              Permanent city
                            </label>
                            <input
                              type="text"
                              id="perCity"
                              className="rounded-lg  w-full"
                              // required
                              name="perCity"
                              value={value3?.perCity}
                              onChange={(e) => {
                                handleChange(e, "form3");
                              }}
                              disabled={value3.status}
                            />
                          </div>

                          <div className="mb-6 try">
                            <label
                              for="perPin"
                              className="block mb-0 font-medium"
                            >
                              Permanent Area Pincode
                            </label>
                            <input
                              type="text"
                              id="perPin"
                              className="rounded-lg  w-full"
                              // required
                              name="perPin"
                              value={value3?.perPin}
                              onChange={(e) => {
                                handleChange(e, "form3");
                              }}
                              disabled={value3.status}
                            />
                          </div>


                          <div className="flex w-full makethisflex1">
                            <div className="mb-6 w-full try">
                              <label
                                for="Martial"
                                className="block mb-0  font-medium "
                              >
                                Marital status
                              </label>
                              <select
                                className="rounded-lg w-full"
                                name="Martial"
                                id="Martial"
                                value={value3?.Martial}
                                onChange={(e) => {
                                  handleChange(e, "form3");
                                }}
                                disabled={value3.status}
                              >
                                <option>Martial Status</option>
                                <option>Married</option>
                                <option>UnMarried</option>
                              </select>
                            </div>
                            <div className="mb-6 w-full try">
                              <label
                                for="nationality"
                                className="block mb-0  font-medium"
                              >
                                Nationality
                              </label>
                              <select
                                className="rounded-lg  w-full"
                                name="nationality"
                                id="nationality"
                                value={value3?.nationality}
                                onChange={(e) => {
                                  handleChange(e, "form3");
                                }}
                                disabled={value3.status}
                              >
                                <option>Nationality</option>
                                <option>Indian</option>
                              </select>
                            </div>
                            <div className="mb-6 w-full try">
                              <label
                                for="Mother"
                                className="block mb-0 font-medium"
                              >
                                Mother name
                              </label>
                              <input
                                type="text"
                                id="Mother"
                                className="rounded-lg  w-full"
                                // required
                                name="Mother"
                                value={value3?.Mother}
                                onChange={(e) => {
                                  handleChange(e, "form3");
                                }}
                                disabled={value3.status}
                              />
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>

                  </div>

                  <div className="admin-form">
                    {/* this is doc side  */}

                    <div className="admin-form1">

                      <div className="basics">
                        <h3>Documents</h3>
                      </div>

                      <hr className="upper" />

                      <div className="w-full alldocwwrap">
                        {/* this is first doc row  */}

                        <div className="wrap1">
                          {/* fist   */}
                          <div className="thiddrapgsingl">
                            <h4>Aadhar Card </h4>

                            <div className="drag-area">
                              <img src={uploadFile} alt="" />

                              <p>Click to upload</p>

                              <input
                                className="filesjila"
                                name="adharCard"
                                type="file"
                                onChange={(e) => handleFileChange(e, "adharCard")}
                              />
                            </div>

                            {
                              previewImages?.adharCard &&
                              <div className="previewiamges">
                                <nav> <ImCross onClick={() => {
                                  setPreviewImages((prev) => {
                                    const updatedPreviewImages = { ...prev };
                                    delete updatedPreviewImages.adharCard;
                                    return updatedPreviewImages
                                  });

                                  setDocuments((prev) => ({
                                    ...prev,
                                    adharCard: ""
                                  }))


                                }} className="cursor-pointer" /> </nav>
                                <img src={previewImages?.adharCard} alt="" />
                              </div>
                            }

                          </div>

                          {/* second */}

                          <div className="thiddrapgsingl">
                            <h4>PAN Card</h4>

                            <div className="drag-area try">
                              <img src={uploadFile} alt="" />

                              <p>Click to upload</p>

                              <input
                                className="filesjila"
                                type="file"
                                name="pancard"
                                onChange={(e) => handleFileChange(e, "pancard")}
                              />
                            </div>

                            {
                              previewImages?.pancard &&
                              <div className="previewiamges">
                                <nav> <ImCross onClick={() => {
                                  setPreviewImages((prev) => {
                                    const updatedPreviewImages = { ...prev };
                                    delete updatedPreviewImages?.pancard;
                                    return updatedPreviewImages
                                  });

                                  setDocuments((prev) => ({
                                    ...prev,
                                    pancard: ""
                                  }))


                                }} className="cursor-pointer" /> </nav>
                                <img src={previewImages?.pancard} alt="" />
                              </div>
                            }

                          </div>

                        </div>

                        {/* this is second doc row  */}

                        <div className="wrap1">
                          {/* frist   */}
                          <div className="thiddrapgsingl">
                            <h4>10th Certificate</h4>

                            <div className="drag-area ">
                              <img src={uploadFile} alt="" />

                              <p>Click to upload</p>

                              <input
                                className="filesjila w-full"
                                type="file"
                                name="tenCert"
                                onChange={(e) => handleFileChange(e, "tenCert")}
                              />
                            </div>
                            {
                              previewImages?.tenCert &&
                              <div className="previewiamges">
                                <nav> <ImCross onClick={() => {
                                  setPreviewImages((prev) => {
                                    const updatedPreviewImages = { ...prev };
                                    delete updatedPreviewImages?.tenCert;
                                    return updatedPreviewImages
                                  });

                                  setDocuments((prev) => ({
                                    ...prev,
                                    tenCert: ""
                                  }))


                                }} className="cursor-pointer" /> </nav>
                                <img src={previewImages?.tenCert} alt="" />
                              </div>
                            }
                          </div>

                          {/* second  */}
                          <div className="thiddrapgsingl">
                            <h4>12th Certificate</h4>

                            <div className="drag-area">
                              <img src={uploadFile} alt="" />

                              <p>Click to upload</p>

                              <input
                                name="twevelCert"
                                onChange={(e) => handleFileChange(e, "twevelCert")}
                                className="filesjila"
                                type="file"
                              />
                            </div>
                            {
                              previewImages?.twevelCert &&
                              <div className="previewiamges">
                                <nav> <ImCross onClick={() => {
                                  setPreviewImages((prev) => {
                                    const updatedPreviewImages = { ...prev };
                                    delete updatedPreviewImages?.twevelCert;
                                    return updatedPreviewImages
                                  });

                                  setDocuments((prev) => ({
                                    ...prev,
                                    twevelCert: ""
                                  }))


                                }} className="cursor-pointer" /> </nav>
                                <img src={previewImages?.twevelCert} alt="" />
                              </div>
                            }
                          </div>
                        </div>

                        <div className="wrap1">
                          {/* frist   */}

                          <div className="thiddrapgsingl">
                            <h4>Cancelled Cheque</h4>
                            <div className="drag-area ">
                              <img src={uploadFile} alt="" />

                              <p>Click to upload</p>

                              <input
                                className="filesjila"
                                type="file"
                                name="cancelCheque"
                                onChange={(e) => handleFileChange(e, "cancelCheque")}
                              />
                            </div>
                            {
                              previewImages?.cancelCheque &&
                              <div className="previewiamges">
                                <nav> <ImCross onClick={() => {
                                  setPreviewImages((prev) => {
                                    const updatedPreviewImages = { ...prev };
                                    delete updatedPreviewImages?.cancelCheque;
                                    return updatedPreviewImages
                                  });

                                  setDocuments((prev) => ({
                                    ...prev,
                                    cancelCheque: ""
                                  }))


                                }} className="cursor-pointer" /> </nav>
                                <img src={previewImages?.cancelCheque} alt="" />
                              </div>
                            }
                          </div>

                          {currEmp === 0 && (
                            <div className="thiddrapgsingl">
                              <h4>Last Organization</h4>


                              <div className="drag-area ">
                                <img src={uploadFile} alt="" />

                                <p>Click to upload</p>

                                <input
                                  name="LastOrganization"
                                  onChange={(e) => handleFileChange(e, "LastOrganization")}
                                  className="filesjila"
                                  type="file"
                                />
                              </div>
                              {
                                previewImages?.LastOrganization &&
                                <div className="previewiamges">
                                  <nav> <ImCross onClick={() => {
                                    setPreviewImages((prev) => {
                                      const updatedPreviewImages = { ...prev };
                                      delete updatedPreviewImages?.LastOrganization;
                                      return updatedPreviewImages
                                    });

                                    setDocuments((prev) => ({
                                      ...prev,
                                      LastOrganization: ""
                                    }))


                                  }} className="cursor-pointer" /> </nav>
                                  <img src={previewImages?.LastOrganization} alt="" />
                                </div>
                              }
                            </div>
                          )}
                        </div>

                        {currEmp === 0 && (
                          <>
                            <h1 className="lstOrgText">
                              Last Organization Docs
                            </h1>

                            <div className="wrap1">
                              {/* first   */}

                              <div className="thiddrapgsingl">
                                <h4>Relieving Letter</h4>


                                <div className="drag-area try">
                                  <img src={uploadFile} alt="" />

                                  <p>Click to upload</p>

                                  <input
                                    className="filesjila "
                                    type="file"
                                    name="RelievingLetter"
                                    onChange={(e) => handleFileChange(e, "RelievingLetter")}
                                  />
                                </div>
                                {
                                  previewImages?.RelievingLetter &&
                                  <div className="previewiamges">
                                    <nav> <ImCross onClick={() => {
                                      setPreviewImages((prev) => {
                                        const updatedPreviewImages = { ...prev };
                                        delete updatedPreviewImages?.RelievingLetter;
                                        return updatedPreviewImages
                                      });

                                      setDocuments((prev) => ({
                                        ...prev,
                                        RelievingLetter: ""
                                      }))


                                    }} className="cursor-pointer" /> </nav>
                                    <img src={previewImages?.RelievingLetter} alt="" />
                                  </div>
                                }
                              </div>

                              {/* second  */}

                              <div className="thiddrapgsingl">
                                <h4>Offer letter</h4>


                                <div className="drag-area try">
                                  <img src={uploadFile} alt="" />

                                  <p>Click to upload</p>

                                  <input
                                    name="OfferLetter"
                                    className="filesjila"
                                    type="file"
                                    onChange={(e) => handleFileChange(e, "OfferLetter")}
                                  />
                                </div>
                                {
                                  previewImages?.OfferLetter &&
                                  <div className="previewiamges">
                                    <nav> <ImCross onClick={() => {
                                      setPreviewImages((prev) => {
                                        const updatedPreviewImages = { ...prev };
                                        delete updatedPreviewImages?.OfferLetter;
                                        return updatedPreviewImages
                                      });

                                      setDocuments((prev) => ({
                                        ...prev,
                                        OfferLetter: ""
                                      }))


                                    }} className="cursor-pointer" /> </nav>
                                    <img src={previewImages?.OfferLetter} alt="" />
                                  </div>
                                }
                              </div>
                            </div>

                            <div className="wrap1">
                              {/* first   */}

                              <div className="thiddrapgsingl">
                                <h4>Experience letter</h4>

                                <div className="drag-area try">
                                  <img src={uploadFile} alt="" />

                                  <p>Click to upload</p>

                                  <input
                                    className="filesjila"
                                    type="file"
                                    name="ExperienceLetter"
                                    onChange={(e) => handleFileChange(e, "ExperienceLetter")}
                                  />
                                </div>
                                {
                                  previewImages?.ExperienceLetter &&
                                  <div className="previewiamges">
                                    <nav> <ImCross onClick={() => {
                                      setPreviewImages((prev) => {
                                        const updatedPreviewImages = { ...prev };
                                        delete updatedPreviewImages?.ExperienceLetter;
                                        return updatedPreviewImages
                                      });

                                      setDocuments((prev) => ({
                                        ...prev,
                                        ExperienceLetter: ""
                                      }))


                                    }} className="cursor-pointer" /> </nav>
                                    <img src={previewImages?.ExperienceLetter} alt="" />
                                  </div>
                                }
                              </div>

                              {/* second  */}

                              {/* <div className="thiddrapgsingl">
                                  <h4>Offer letter</h4>

                                  <div className="drag-area try">
                                    <img src={uploadFile} alt="" />

                                    <p>Click to upload</p>

                                    <input
                                      name="prevOrgOffer"
                                      className="filesjila w-full"
                                      type="file"
                                      onChange={handleFileChange}
                                    />
                                  </div>
                                </div> */}
                            </div>
                          </>
                        )}

                      </div>

                    </div>

                    {/* this is backend acc side  */}
                    <div className="basic-information">
                      <div className="basics">
                        <h3>Bank Account Information</h3>
                      </div>

                      <hr className="upper" />

                      <div className="form2-class">
                        <div className="w-full bank1wap mt-2">
                          <div className="flex singbankWrap w-full">
                            <div className="mb-6 w-full try">
                              <label
                                for="SalaryPay"
                                className="block mb-0  font-medium "
                              >
                                Salary Pay Mode
                              </label>
                              <input
                                type="text"
                                id="SalaryPay"
                                className=""
                                name="SalaryPay"
                                value={value5?.SalaryPay}
                                onChange={(e) => {
                                  handleChange(e, "form5");
                                }}
                                disabled={value5.status}
                              />
                            </div>

                            <div className="mb-6 w-full try">
                              <label
                                for="SalaryBankName"
                                className="block mb-0  font-medium"
                              >
                                Salary Bank Name
                              </label>
                              <input
                                type="text"
                                id="SalaryBankName"
                                className="rounded-lg  w-full"
                                name="SalaryBankName"
                                value={value5?.SalaryBankName}
                                onChange={(e) => {
                                  handleChange(e, "form5");
                                }}
                                disabled={value5.status}
                              />
                            </div>

                            <div className="mb-6 w-full try">
                              <label
                                for="BeneficiaryName"
                                className="block mb-0 font-medium"
                              >
                                Beneficiary Name
                              </label>

                              <input
                                type="text"
                                id="BeneficiaryName"
                                className="rounded-lg  w-full"
                                name="BeneficiaryName"
                                value={value5?.BeneficiaryName}
                                onChange={(e) => {
                                  handleChange(e, "form5");
                                }}
                                disabled={value5.status}
                              />
                            </div>
                          </div>

                          <div className="flex singbankWrap w-full">
                            <div className="mb-6 w-full try">
                              <label
                                for="BankIfsc"
                                className="block mb-0 font-medium"
                              >
                                Bank IFSC Code
                              </label>
                              <input
                                type="text"
                                id="BankIfsc"
                                className="rounded-lg  w-full"
                                name="BankIfsc"
                                value={value5?.BankIfsc}
                                onChange={(e) => {
                                  handleChange(e, "form5");
                                }}
                                disabled={value5.status}
                              />
                            </div>

                            <div className="mb-6 w-full try">
                              <label
                                for="AccountNumber"
                                className="block mb-0  font-medium"
                              >
                                Account Number
                              </label>
                              <input
                                type="text"
                                id="AccountNumber"
                                className="rounded-lg w-full"
                                name="AccountNumber"
                                value={value5?.AccountNumber}
                                onChange={(e) => {
                                  handleChange(e, "form5");
                                }}
                                disabled={value5.status}
                              />
                            </div>

                            <div className="mb-6 w-full try">
                              <label
                                for="confirmAccount"
                                className="block mb-0  font-medium"
                              >
                                Confirm Account Number
                              </label>
                              <input
                                type="text"
                                id="confirmAccount"
                                className="rounded-lg  w-full"
                                // required
                                name="confirmAccount"
                                value={value5?.confirmAccount}
                                onChange={(e) => {
                                  handleChange(e, "form5");
                                }}
                                disabled={value5.status}
                              />
                            </div>
                          </div>

                          <div className="flex w-full singbankWrap">
                            <div className="mb-6 w-full  try">
                              <label
                                for="Branch"
                                className="block mb-0  font-medium"
                              >
                                Bank Branch
                              </label>

                              <input
                                type="text"
                                id="Branch"
                                className="rounded-lg  w-full"
                                // required
                                name="Branch"
                                value={value5?.Branch}
                                onChange={(e) => {
                                  handleChange(e, "form5");
                                }}
                                disabled={value5.status}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* this is button  */}

                  <div className=" flex items-center justify-center mt-5">
                    <button
                      type="submit"
                      className="emregistbtn ctext-white outline-none bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  font-semibold rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Register
                    </button>
                  </div>

                </div>
              </form>

            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeManage;
