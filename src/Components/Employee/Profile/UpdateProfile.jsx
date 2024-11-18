import React, { useState, useEffect } from "react";
import EmployeeNavbar from "../Navbar/EmployeeNavbar";
import EmployeeSidebar from "../Sidebar/EmployeeSidebar";
import { useMain } from "../../../hooks/useMain";
import uploadFile from "../../images/upload-file.png";
import toast from "react-hot-toast";

const item = [
  {
    title: "Full-time Employees",
  },
  {
    title: "Intern Employees",
  },
  {
    title: "Part-time Employees",
  },
];


const UpdateProfile = ({ setAlert, pop1, setPop1 }) => {
  
  const { user, updateProfile, postActivity, getStatisticsByUser, getBranchs, getDepartments, getDesignations , uploadToCloudinaryImg  , uploadOwnDocs} = useMain();
  const [value, setValue] = useState(user);


  const [branches, setBranches] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);

  const [uploadedProfile , setUploadedProfile] = useState("");

  const getData = async () => {
    let ans = await getBranchs();
    let ans1 = await getDepartments();
    let ans2 = await getDesignations();
    setBranches(ans?.data);
    setDepartments(ans1?.data);
    setDesignations(ans2?.data);
  };

  const [pic , setPic] = useState("");

  const handleChange = async(e) => {
 const {name  , value} = e.target;

 if (name === "pan" && value.length > 10) {
  return; 
}
 if (name === "adhar" && value.length > 12) {
  return; 
}
 if (name === "currentPin" && value.length > 6) {
  return; 
}
if(name === "perPin" && value.length > 6){
  return
}
if(name === "mobile" && value.length > 10){
  return
}
if(name === "pan" && value.length > 10){
  return
}

 if (name === "image") {
  setValue({ ...value, [e.target.name]: e.target.files[0] });
  let image = e.target.files[0];
  const ans = await uploadToCloudinaryImg({image});
  if(ans.status){
    setUploadedProfile(ans?.data);
   }
} else {
  setValue({ ...value, [e.target.name]: e.target.value });
}
  };

  const [documents, setDocuments] = useState({
    adharCard: "",
    pancard: "",
    tenCert:"",
    twevelCert:"",
    cancelCheque: "",
    LastOrganization: "",
    RelievingLetter:"",
    OfferLetter:"",
    ExperienceLetter:"",
    ITR:"" , 
    ITR2:""

  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const { name } = event.target;
    if (file) {
      setDocuments((prevDocuments) => ({
        ...prevDocuments,
        [name]: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    
     const toastId = toast.loading("Loading...");

    e.preventDefault();
    const ans = await updateProfile(value );

    // this is for upload the user documents 
    const {
      adharCard,
      ITR ,
      ITR2,
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
    if (documents.ITR) {
      formData.append("ITR", ITR);
    }
    if (documents.ITR2) {
      formData.append("ITR2", ITR2);
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
      documents.ITR !== "" ||
      documents.ITR2!== "" ||
      documents.pancard !== "" ||
      documents.tenCert !== "" ||
      documents.twevelCert !== "" ||
      documents.cancelCheque !== "" ||
      documents.LastOrganization !== "" ||
      documents.RelievingLetter !== "" ||
      documents.OfferLetter !== "" ||
      documents.ExperienceLetter !== ""
    ) {
       const uploadans = await uploadOwnDocs({formData , id:user?._id});
    }

  
    if (ans.success) {
      toast.success(ans?.message);
      setValue(ans.data);
      // navigate("/employeeDash");
    } else {
      toast.error(ans?.message);
    }

    toast.dismiss(toastId);
  };

  const [currEmp, setCurrEmp] = useState(0);

  useEffect(()=>{

    const {EmployeeType} = user;
    const index = item.findIndex((emp) => emp.title === EmployeeType);

    if (index !== -1) {
      setCurrEmp(index);
    }
     

  },[user])


  useEffect(() => {
    let user1 = JSON.parse(localStorage.getItem("hrms_user"));
    setValue(user1);
    getData();
  }, []);
 
  const checkdiable = (name)=>{
      const ans = user?.document?.filter((doc)=>{
        if(doc?.name === name){
          return true;
        }
      })

      if(ans?.length > 0){
        return true;
      }
      else{
        return false;
      }
  }

  return (
    <>
      <div className="employee-dash h-full">
        <EmployeeSidebar />

        <div className="tm">
          <EmployeeNavbar
            user={user}
            setAlert={setAlert}
            postActivity={postActivity}
            getStatisticsByUser={getStatisticsByUser}
            pop1={pop1}
            setPop1={setPop1}
          />

          <div className="em">
            <div className="">
              <form className="updateUser" onSubmit={handleSubmit}>
              <div className="makethisgrid">

                <div className="">
                  <label htmlFor="fullName" className="block mb-1 ">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    // onChange={() => null}
                    value={value.fullName}
                    id="fullName"
                    className=" block"
                    disabled={!!user?.fullName} // Disable if user.fullName is not empty or undefined
                    />
                </div>
                <div className="">
                  <label htmlFor="email" className="block mb-1 ">
                    Company Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    // onChange={() => null}
                    value={value.email}
                    id="email"
                    className=" block"
                    disabled={!!user?.email}
                  // required
                  />
                </div>
                <div className="">
                  <label htmlFor="mobile" className="block mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="number"
                    name="mobile"
                    onChange={handleChange}
                    value={value.mobile}
                    id="mobile"
                    className=" block "
                    disabled={!!user?.mobile}
                  // required
                  />
                </div>

                <div className="">
                  <label htmlFor="gender" className="block mb-1 ">
                    Gender
                  </label>
                  <select disabled={!!user?.gender} className="" name="gender" id="gender"  value={value?.gender}>
                     <option>Male</option>
                     <option>Female</option>
                  </select>
                </div>

                <div className="">
                  <label htmlFor="DOB" className="block mb-1 ">
                    DOB
                  </label>
                  
                 <input disabled={!!user?.dob} type="date" name="dob"    onChange={handleChange}  value={value?.dob} className=" block "/>
                </div>

                <div className="">
                  <label  htmlFor="image" className="block mb-1">
                    Image
                  </label>

                  <input
                    className="block "
                    name="image"
                    onChange={handleChange}
                    id="file_input"
                    type="file"
                     value={pic}
                     disabled={!!user?.pic}

                  />

                   {
                    uploadedProfile !== "" && 
                     <div className="uploadedProfile">

                 
                       
                      <img  src={uploadedProfile} alt="" />
                     </div>
                    }
                </div>

                <div className="">
                  <label htmlFor="email1" className="block mb-1">
                    Personal Gmail
                  </label>
                  <input
                    className="block "
                    name="email1"
                    value={value.email1}
                    onChange={handleChange}
                    id="email1"
                    required
                    type="email"
                  // required
                  disabled={!!user?.email1}
                  />
                </div>
                
                {/* <div className="">
                  <label htmlFor="gmail" className="block mb-1">
                    Company Gmail
                  </label>
                  <input
                    className="block "
                    name="gmail"
                    value={value.gmail}
                    onChange={handleChange}
                    id="gmail"
                    type="email"
                  // 
                  />
                </div> */}

                <div className="">
                  <label htmlFor="department" className="block mb-1">
                    Department
                  </label>
                  <select
                    className="block "
                    onChange={() => null}
                    name="department"
                    value={value?.department}
                    id="department"
                    disabled={!!user?.department}

                  >
                    {
                      departments?.map((val, index) => {
                        return <option key={index} value={val?.name}>{val?.name}</option>
                      })
                    }
                  </select>
                </div>

                <div className="">
                  <label htmlFor="designation" className="block mb-1">
                    Designation
                  </label>
                  <select
                    className=" block "
                    // onChange={() => null}
                    disabled={!!user?.designation}
                    name="designation"
                    value={value.designation}
                    id="designation"
                  >
                    {/* <option>Designation</option>
                    <option value="Developer">Developer</option>
                    <option value="Designer">Designer</option>
                    <option value="Hr">Hr</option>
                    <option value="Manager">Manager/Project manager</option> */}
                    {
                      designations?.map((val, index) => {
                        return <option key={index} value={val?.name}>{val?.name}</option>
                      })
                    }
                  </select>
                </div>

                <div className="">
                  <label htmlFor="date" className="block mb-1">
                    JoiningDate
                  </label>
                  <input
                    // onChange={() => null}
                    type="date"
                    name="joiningDate"
                    value={value.joiningDate}
                    disabled={!!user?.joiningDate}
                    className="block "
                    id="date"
                  />
                </div>

                <div className="">
                  <label htmlFor="date" className="block mb-1">
                    PAN Number.
                  </label>
                  <input
                    type="text"
                    id="pan"
                    className="  block"
                    name="pan"
                    disabled={!!user?.pan}
                    value={value.pan}
                    onChange={handleChange}
                  />
                </div>

                <div className="">
                  <label htmlFor="adhar" className="block mb-1">
                    Aadhaar Number.
                  </label>
                  <input
                    type="text"
                    id="adhar"
                    className=" block "
                    // required
                    name="adhar"
                    disabled={!!user?.adhar}
                    value={value.adhar}
                    onChange={handleChange}
                  />
                </div>

                <div className="">
                  <label htmlFor="father" className="block mb-1">
                    Father Name
                  </label>
                  <input
                    type="text"
                    id="father"
                    className=" block"
                    // required
                    name="father"
                    disabled={!!user?.father}
                    value={value.father}
                    onChange={handleChange}
                  />
                </div>

                <div className="">
                  <label htmlFor="currentAddress" className="block mb-1">
                    Current Residence Address
                  </label>
                  <input
                    type="text"
                    id="currentAddress"
                    className="block  "
                    // required
                    name="currentAddress"
                    value={value.currentAddress}
                    disabled={!!user?.currentAddress}
                    onChange={handleChange}
                  />
                </div>
                <div className="">
                  <label htmlFor="currentState" className="block mb-1">
                    Current state
                  </label>
                  {/* <select
                    className="rounded-lg  "
                    name="currentState"
                    id="currentState"
                    value={value.currentState}
                    onChange={handleChange}
                  >
                    <option>CurrentState</option>
                    <option>Jharkhand</option>
                  </select> */}
                  <input
                    type="text"
                    id="currentState"
                    className="rounded-lg  "
                    // required
                    name="currentState"
                    value={value.currentState}
                    onChange={handleChange}
                    disabled={!!user?.currentState}

                  />
                </div>
                <div className="">
                  <label htmlFor="currentCity" className="block mb-1">
                    Current city
                  </label>
                  <input
                    type="text"
                    id="currentCity"
                    className="rounded-lg  "
                    // required
                    name="currentCity"
                    value={value.currentCity}
                    onChange={handleChange}
                    disabled={!!user?.currentCity}

                  />
                </div>
                <div className="">
                  <label htmlFor="currentPin" className="block mb-1">
                    Area Pincode
                  </label>
                  <input
                    type="text"
                    id="currentPin"
                    className="block  "
                    // required
                    name="currentPin"
                    value={value.currentPin}
                    onChange={handleChange}
                    disabled={!!user?.currentPin}

                  />
                </div>
                <div className="">
                  <label htmlFor="perState" className="block mb-1">
                    Permanent state
                  </label>
                  <select
                    className=" block  "
                    name="perState"
                    value={value.perState}
                    id="perState"
                    onChange={handleChange}
                    disabled={!!user?.perState}

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
                    <option>Dadra & Nagar Haveli and Daman & Diu (UT)</option>
                    <option>Delhi [National Capital Territory (NCT)]</option>
                    <option>Jammu & Kashmir (UT)</option>
                    <option>Ladakh (UT)</option>
                    <option>Lakshadweep (UT)</option>
                    <option>Puducherry (UT)</option>
                  </select>
                </div>
                <div className="">
                  <label htmlFor="perCity" className="block mb-1">
                    Permanent city
                  </label>
                  <input
                    type="text"
                    id="perCity"
                    className="block "
                    // required
                    name="perCity"
                    disabled={!!user?.perCity}
                    value={value.perCity}
                    onChange={handleChange}
                  />
                </div>
                <div className="">
                  <label htmlFor="perPin" className="block mb-1">
                    Permanent Area Pincode
                  </label>
                  <input
                    type="text"
                    id="perPin"
                    className="block "
                    // required
                    name="perPin"
                    disabled={!!user?.perPin}
                    value={value.perPin}
                    onChange={handleChange}
                  />
                </div>
                <div className="">
                  <label htmlFor="Martial" className="block mb-1">
                    Marital status
                  </label>
                  <select
                    className="rounded-lg "
                    name="Martial"
                    id="Martial"
                    disabled={!!user?.Martial}
                    value={value.Martial}
                    onChange={handleChange}
                  >
                    <option>Martial Status</option>
                    <option>Married</option>
                    <option>UnMarried</option>
                  </select>
                </div>
                <div className="">
                  <label htmlFor="nationality" className="block mb-1">
                    Nationality
                  </label>
                  <select
                    className="block  "
                    name="nationality"
                    id="nationality"
                    disabled={!!user?.nationality}

                    value={value.nationality}
                    onChange={handleChange}
                  >
                    <option>Nationality</option>
                    <option>Indian</option>
                  </select>
                </div>
                <div className="">
                  <label htmlFor="Mother" className="block mb-1">
                    Mother name
                  </label>
                  <input
                    type="text"
                    id="Mother"
                    className=" block "
                    // required
                    disabled={!!user?.Mother}

                    name="Mother"
                    value={value.Mother}
                    onChange={handleChange}
                  />
                </div>
                <div className="">
                  <label htmlFor="qualification" className="block mb-1">
                    Qualification
                  </label>
                  <input
                    type="text"
                    id="qualification"
                    className=" block "
                    // required
                    name="qualification"
                    disabled={!!user?.qualification}

                    value={value.qualification}
                    onChange={handleChange}
                  />
                </div>
                <div className="">
                  <label htmlFor="specialization" className="block mb-1">
                    Specialization
                  </label>
                  <input
                    type="text"
                    id="qualification"
                    className=" block "
                    // required
                    name="specialization"
                    value={value.specialization}
                    disabled={!!user?.specialization}

                    onChange={handleChange}
                  />
                </div>
                <div className="">
                  <label htmlFor="qualificationType" className="block mb-1">
                    Qualification Type
                  </label>
                  <select
                    className="rounded-lg  "
                    name="qualificationType"
                    id="qualificationType"
                    value={value.qualificationType}
                    onChange={handleChange}
                    disabled={!!user?.qualificationType}

                  >
                    <option>Qualification Type</option>
                    <option>M.sc</option>
                    <option>B.sc</option>
                    <option>10th</option>
                    <option>12th</option>
                    <option>BBA</option>
                    <option>BCA</option>
                    <option>B.tech</option>
                    <option>M.tech</option>
                    <option>MBA</option>
                    <option>BCom</option>
                    <option>Others</option>
                  </select>
                </div>
                <div className="">
                  <label htmlFor="yearPass" className="block mb-1">
                    Year of passing •
                  </label>
                 
                   <input  name="yearPass"
                    id="yearPass"
                    value={value.yearPass}
                    disabled={!!user?.yearPass}

                    onChange={handleChange} className=" rounded-lg" type="date" />
                </div>
                <div className="">
                  <label htmlFor="university" className="block mb-1">
                    University/Board •
                  </label>
                  <input
                    type="text"
                    id="university"
                    className=" block "
                    // required
                    name="university"
                    value={value.university}
                    disabled={!!user?.university}

                    onChange={handleChange}
                  />
                </div>
                <div className="">
                  <label htmlFor="college" className="block mb-1">
                    College/School •
                  </label>
                  <input
                    type="text"
                    id="college"
                    className=" block "
                    // required
                    name="college"
                    value={value.college}
                    onChange={handleChange}
                    disabled={!!user?.college}

                  />
                </div>
                <div className="">
                  <label htmlFor="percentage" className="block mb-1">
                    Grade/CCPA/Percentage
                  </label>
                  <input
                    type="text"
                    id="percentage"
                    className="block "
                    // required
                    name="percentage"
                    value={value.percentage}
                    disabled={!!user?.percentage}

                    onChange={handleChange}
                  />
                </div>
                <div className="">
                  <label htmlFor="previousCompany" className="block mb-1">
                    Previous Company •
                  </label>
                  <input
                    type="text"
                    id="previousCompany"
                    className="block "
                    // required
                    name="previousCompany"
                    value={value.previousCompany}
                    disabled={!!user?.previousCompany}

                    onChange={handleChange}
                  />
                </div>
                <div className="">
                  <label htmlFor="previousDesignation" className="block mb-1">
                    Previous Designation •
                  </label>
                  <input
                    type="text"
                    id="previousDesignation"
                    className="block "
                    // required
                    name="previousDesignation"
                    value={value.previousDesignation}
                    disabled={!!user?.previousDesignation}

                    onChange={handleChange}
                  />
                </div>
                <div className="">
                  <label htmlFor="toDate" className="block mb-1">
                    To date •
                  </label>
                  <input
                    type="date"
                    id="toDate"
                    className="block "
                    // required
                    name="toDate"
                    value={value.toDate}
                    disabled={!!user?.toDate}

                    onChange={handleChange}
                  />
                </div>
                <div className="">
                  <label htmlFor="fromDate" className="block mb-1">
                    From date*
                  </label>
                  <input
                    type="date"
                    id="fromDate"
                    className="block "
                    // required
                    name="fromDate"
                    value={value.fromDate}
                    onChange={handleChange}
                    disabled={!!user?.fromDate}

                  />
                </div>
                <div className="">
                  <label htmlFor="numberOfMonth" className="block mb-1">
                    Number of months *
                  </label>
                  <input
                    type="text"
                    id="numberOfMonth"
                    className="block "
                    // required
                    name="numberOfMonth"
                    value={value.numberOfMonth}
                    disabled={!!user?.numberOfMonth}

                    onChange={handleChange}
                  />
                </div>
                <div className="">
                  <label htmlFor="Jobdescription" className="block mb-1">
                    Job description
                  </label>
                  <input
                    type="text"
                    id="Jobdescription"
                    className="block "
                    // required
                    name="Jobdescription"
                    value={value.Jobdescription}
                    disabled={!!user?.Jobdescription}

                    onChange={handleChange}
                  />
                </div>
               
                <div className="">
                  <label htmlFor="SalaryBankName" className="block mb-1">
                    Salary Bank Name
                  </label>
                  <input
                    type="text"
                    id="SalaryBankName"
                    className="block "
                    // required
                    name="SalaryBankName"
                    value={value.SalaryBankName}
                    disabled={!!user?.SalaryBankName}

                    onChange={handleChange}
                  />
                </div>
                <div className="">
                  <label htmlFor="BeneficiaryName" className="block mb-1">
                    Beneficiary Name
                  </label>
                  <input
                    type="text"
                    id="BeneficiaryName"
                    className="block "
                    // required
                    name="BeneficiaryName"
                    value={value.BeneficiaryName}
                    disabled={!!user?.BeneficiaryName}

                    onChange={handleChange}
                  />
                </div>
                <div className="">
                  <label htmlFor="BankIfsc" className="block mb-1">
                    Bank IFSC Code
                  </label>
                  <input
                    type="text"
                    id="BankIfsc"
                    className="block "
                    // required
                    name="BankIfsc"
                    value={value.BankIfsc}
                    disabled={!!user?.BankIfsc}

                    onChange={handleChange}
                  />
                </div>

                <div className="">
                  <label htmlFor="AccountNumber" className="block mb-1">
                    Account Number
                  </label>
                  <input
                    type="text"
                    id="AccountNumber"
                    className="block "
                    // required
                    name="AccountNumber"
                    value={value.AccountNumber}
                    onChange={handleChange}
                    disabled={!!user?.AccountNumber}

                  />
                </div>

                <div className="">
                  <label htmlFor="confirmAccount" className="block mb-1">
                    Confirm Account Number
                  </label>
                  <input
                    type="text"
                    id="confirmAccount"
                    className="block "
                    // required
                    name="confirmAccount"
                    value={value.confirmAccount}
                    disabled={!!user?.confirmAccount}

                    onChange={handleChange}
                  />
                </div>

                <div className="">
                  <label htmlFor="Branch" className="block mb-1">
                    Bank Branch
                  </label>
                  <input
                    type="text"
                    id="Branch"
                    className="block "
                    // required
                    name="Branch"
                    value={value.Branch}
                    disabled={!!user?.Branch}

                    onChange={handleChange}
                  />
                </div>

                {/* this is document upload start  */}
             
                  
                </div>

 <div className="makethisfelxd">

                <div className="basic-information2 mb-4 mt-7">
                      <div className="basics">
                        <h3>Documents </h3>
                      </div>

                      <hr className="upper" />

                      <div className="form2-class">

                        <div className=" sfgh mt-6">
                          {/* this is first doc row  */}

                          <div className="flex ">
                            {/* fist   */}
                            <div className="thiddrapgsingl">
                              <h4>Aadhar Card</h4>

                              <div className="drag-area try">
                                <img src={uploadFile} alt="" />

                                <p>Click to upload</p>

                                <input
                                  className="filesjila "
                                  name="adharCard"
                                  type="file"
                                  onChange={handleFileChange}
                                  disabled={checkdiable("adharCard")}

                                />
                              </div>
                            </div>

                            {/* second */}

                            <div className="thiddrapgsingl">
                              <h4>PAN Card</h4>

                              <div className="drag-area try">
                                <img src={uploadFile} alt="" />

                                <p>Click to upload</p>

                                <input
                                  className="filesjila "
                                  type="file"
                                  name="pancard"
                                  onChange={handleFileChange}
                                  disabled={checkdiable("pancard")}

                                />
                              </div>
                            </div>
                          </div>

                          {/* this is second doc row  */}

                          <div className="flex  mt-6">
                            {/* frist   */}
                            <div className="thiddrapgsingl">
                              <h4>10th Certificate</h4>

                              <div className="drag-area try">
                                <img src={uploadFile} alt="" />

                                <p>Click to upload</p>

                                <input
                                  className="filesjila "
                                  type="file"
                                  name="tenCert"
                                  onChange={handleFileChange}
                                  disabled={checkdiable("tenCert")}

                                />
                              </div>
                            </div>

                            {/* second  */}
                            <div className="thiddrapgsingl">
                              <h4>12th Certificate</h4>

                              <div className="drag-area try">
                                <img src={uploadFile} alt="" />

                                <p>Click to upload</p>

                                <input
                                  name="twevelCert"
                                  onChange={handleFileChange}
                                  className="filesjila"
                                  type="file"
                                  disabled={checkdiable("twevelCert")}

                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex  mt-6">
                            {/* frist   */}

                            <div className="thiddrapgsingl">
                              <h4>Cancelled Cheque</h4>
                              <div className="drag-area try">
                                <img src={uploadFile} alt="" />

                                <p>Click to upload</p>

                                <input
                                  className="filesjila "
                                  type="file"
                                  name="cancelCheque"
                                  onChange={handleFileChange}
                                  disabled={checkdiable("cancelCheque")}

                                />
                              </div>
                            </div>

                            {currEmp === 0 && (
                              <div className="thiddrapgsingl">
                                <h4>Last Organization</h4>

      
                                <div className="drag-area try">
                                  <img src={uploadFile} alt="" />

                                  <p>Click to upload</p>

                                  <input
                                    name="LastOrganization"
                                    onChange={handleFileChange}
                                    className="filesjila "
                                    type="file"
                                    disabled={checkdiable("LastOrganization")}

                                  />
                                </div>
                              </div>
                            )}
                          </div>

                          {currEmp === 0 && (
                            <>
                              <h1 className="lstOrgText">
                                Last Organization Docs
                              </h1>

                              <div className="flex  mt-6">
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
                                      onChange={handleFileChange}
                                      disabled={checkdiable("RelievingLetter")}

                                    />
                                  </div>
                                </div>

                                {/* second  */}

                                <div className="thiddrapgsingl">
                                  <h4>Offer letter</h4>

        
                                  <div className="drag-area try">
                                    <img src={uploadFile} alt="" />

                                    <p>Click to upload</p>

                                    <input
                                      name="OfferLetter"
                                      className="filesjila "
                                      type="file"
                                      onChange={handleFileChange}
                                      disabled={checkdiable("OfferLetter")}

                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="flex  mt-6">
                                {/* first   */}

                                <div className="thiddrapgsingl">
                                  <h4>Experience letter</h4>

                                  <div className="drag-area try">
                                    <img src={uploadFile} alt="" />

                                    <p>Click to upload</p>

                                    <input
                                      className="filesjila "
                                      type="file"
                                      name="ExperienceLetter"
                                      onChange={handleFileChange}
                                      disabled={checkdiable("ExperienceLetter")}

                                    />
                                  </div>
                                </div>

                                {/* second  */}

                                <div className="thiddrapgsingl">
                                  <h4>Offer letter</h4>

                                  <div className="drag-area try">
                                    <img src={uploadFile} alt="" />

                                    <p>Click to upload</p>

                                    <input
                                      name="prevOrgOffer"
                                      className="filesjila "
                                      type="file"
                                      onChange={handleFileChange}
                                      disabled={checkdiable("prevOrgOffer")}

                                    />
                                  </div>
                                </div>
                              </div>
                            </>
                          )}

                <div className="flex  ">
                           
                            <div className="thiddrapgsingl mt-4">
                              <h4>ITR(Income Tax Return)</h4>

                              <div className="drag-area try">
                                <img src={uploadFile} alt="" />

                                <p>Click to upload</p>

                                <input
                                  className="filesjila "
                                  name="ITR"
                                  type="file"
                                  onChange={handleFileChange}
                                  disabled={checkdiable("ITR")}

                                />
                              </div>
                            </div>
                       
                            <div className="thiddrapgsingl mt-4">
                              <h4>ITR(Income Tax Return) Pdf2</h4>

                              <div className="drag-area try">
                                <img src={uploadFile} alt="" />

                                <p>Click to upload</p>

                                <input
                                  className="filesjila "
                                  name="ITR2"
                                  type="file"
                                  onChange={handleFileChange}
                                  disabled={checkdiable("ITR2")}

                                />
                              </div>
                            </div>
                       
                          </div>


                        </div>
                        
                      </div>
                    </div>

                <div className="">
                  <label htmlFor="Branch" className="block mb-1">
                    Documents
                  </label>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    {
                      value?.document?.map((item, index) => (
                        <div key={index} style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "center", maxWidth: "200px" }}>
                          <img src={item.url} alt="" />
                          {/* twevelCert , tenCert , cancelCheque */}
                          <p style={{ margin: "4px auto", fontWeight: "600" }}>{item.name === "twevelCert" ?"twelveth Certificate" : item?.name ==="tenCert" ?"Tenth Certicate" : item?.name }</p>
                        </div>
                      ))
                    }
                  </div>
                </div>
                </div>


                <button
                  type="submit"
                  className=" sabeupdabtn"
                >
                  Save
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
