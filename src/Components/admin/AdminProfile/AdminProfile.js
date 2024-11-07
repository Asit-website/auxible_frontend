import React, { useState, useEffect } from 'react'
import AdminSidebar from '../Sidebar/AdminSidebar';
import AdminNavbar from '../Navbar/AdminNavbar';
import { useMain } from '../../../hooks/useMain'
import { useNavigate } from 'react-router-dom';
const AdminProfile = ({ pop, setPop, setAlert }) => {

  const { user, updateProfile, getBranchs, getDepartments, getDesignations, uploadToCloudinaryImg } = useMain();
  const [value, setValue] = useState(user);

  const navigate = useNavigate();

  const [branches, setBranches] = useState([]);
  const [uploadedProfile, setUploadedProfile] = useState("");

  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);

  const getData = async () => {
    let ans = await getBranchs();
    let ans1 = await getDepartments();
    let ans2 = await getDesignations();
    setBranches(ans?.data);
    setDepartments(ans1?.data);
    setDesignations(ans2?.data);
  };

  useEffect(() => {
    let user1 = JSON?.parse(localStorage.getItem("hrms_user"));
    setValue(user1);
    getData();
  }, []);


  // const handleChange = async (e) => {
  //   if (e.target.name === "image") {
  //     setValue({ ...value, [e.target.name]: e.target.files[0] });
  //     let image = e.target.files[0];
  //     const ans = await uploadToCloudinaryImg({ image });
  //     if (ans.status) {
  //       setUploadedProfile(ans?.data);
  //     }
  //   } else {
  //     setValue({ ...value, [e.target.name]: e.target.value });
  //   }
  // };


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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const ans = await updateProfile(value);
    localStorage.setItem("hrms_user", JSON.stringify(ans.data));
    if (ans.success) {
      setAlert("success", ans.message);
      setValue(ans?.data);
      navigate("/adminDash");

    } else {
      setAlert("error", ans.message);
    }
  };

  return (
    <>
      <div className="employee-dash h-full">
        <AdminSidebar pop={pop} setPop={setPop} />
        <div className="tm">
          <AdminNavbar user={user} setAlert={setAlert} />

          <div className="em">
            <div className="flex-col">

              <form className="updateUser" onSubmit={handleSubmit}>
                {
                  user?.designation === "CEO" ?

                    <div className="mb-6">
                      <label htmlFor="fullName" className="block samat mb-1 ">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        onChange={handleChange}
                        value={value?.fullName}
                        id="fullName"
                        className=" block w-full"
                      />
                    </div>

                    :
                    <div className="mb-6">
                      <label htmlFor="fullName" className="block samat mb-1 ">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        onChange={() => null}
                        value={value?.fullName}
                        id="fullName"
                        className=" block w-full"
                      />
                    </div>
                }


                {
                  user?.designation === "CEO" ? <div className="mb-6">
                    <label htmlFor="email" className="block mb-1 ">
                      Company Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      value={value.email}
                      id="email"
                      className=" block w-full"
                    />
                  </div>
                    :
                    <div className="mb-6">
                      <label htmlFor="email" className="block mb-1 ">
                        Company Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        onChange={() => null}
                        value={value.email}
                        id="email"
                        className=" block w-full"
                      // required
                      />
                    </div>
                }


                <div className="mb-6">
                  <label htmlFor="mobile" className="block mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="number"
                    name="mobile"
                    onChange={handleChange}
                    value={value.mobile}
                    id="mobile"
                    className=" block w-full"
                  // required
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="gender" className="block mb-1 ">
                    Gender
                  </label>
                  <select className='w-full' name="gender" id="gender" onChange={() => null} value={value?.gender}>
                     <option>Male</option>
                     <option>Female</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label htmlFor="image" className="block mb-1">
                    Image
                  </label>
                  <input
                    className="block w-full"
                    name="image"
                    onChange={handleChange}
                    id="file_input"
                    type="file"
                  />
                  {
                    uploadedProfile !== "" &&
                    <div className="uploadedProfile">

                      {/* <div className="cutImg">

                        <img onClick={()=>{
                          setUploadedProfile("");
                           setProfileImage("");
                        }} src={cutImg} className="" alt="" />
                   </div> */}

                      <img src={uploadedProfile} alt="" />
                    </div>
                  }
                </div>

                <div className="mb-6">
                  <label htmlFor="email1" className="block mb-1">
                    Personal Gmail
                  </label>
                  <input
                    className="block w-full"
                    name="email1"
                    value={value.email1}
                    onChange={handleChange}
                    id="email1"
                    type="email"
                  // required
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="gmail" className="block mb-1">
                    Company Gmail
                  </label>
                  <input
                    className="block w-full"
                    name="gmail"
                    value={user?.gmail}
                    onChange={handleChange}
                    id="gmail"
                    type="email"
                  // required
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="department" className="block mb-1">
                    Department
                  </label>
                  {
                    user?.designation === "CEO"
                      ?
                      <select
                        className="block w-full"
                        onChange={handleChange}
                        name="department"
                        value={value?.department}
                        id="department"
                      >

                        {
                          departments?.map((val, index) => {
                            return <option key={index} value={val?.name}>{val?.name}</option>
                          })
                        }
                      </select>

                      :
                      <select
                        className="block w-full"
                        onChange={() => null}
                        name="department"
                        value={value?.department}
                        id="department"
                      >
                        {
                          departments?.map((val, index) => {
                            return <option key={index} value={val?.name}>{val?.name}</option>
                          })
                        }
                      </select>

                  }





                </div>

                <div className="mb-6">
                  <label htmlFor="designation" className="block mb-1">
                    Designation
                  </label>
                  {
                    user?.designation === "CEO" ? <select
                      className=" block w-full"
                      onChange={handleChange}
                      name="designation"
                      value={value.designation}
                      id="designation"
                    >
                      {
                        designations?.map((val, index) => {
                          return <option key={index} value={val?.name}>{val?.name}</option>
                        })
                      }
                    </select>
                      :
                      <select
                        className=" block w-full"
                        onChange={() => null}
                        name="designation"
                        value={value.designation}
                        id="designation"
                      >
                        {
                          designations?.map((val, index) => {
                            return <option key={index} value={val?.name}>{val?.name}</option>
                          })
                        }
                      </select>
                  }

                </div>

                <div className="mb-6">
                  <label htmlFor="date" className="block mb-1">
                    JoiningDate
                  </label>
                  <input
                    onChange={() => null}
                    type="date"
                    name="joiningDate"
                    value={value?.joiningDate}
                    className="block w-full"
                    id="date"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="date" className="block mb-1">
                    PAN No.
                  </label>
                  <input
                    type="text"
                    id="pan"
                    className=" w-full block"
                    // required
                    name="pan"
                    value={value?.pan}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="adhar" className="block mb-1">
                    Aadhaar No.
                  </label>
                  <input
                    type="text"
                    id="adhar"
                    className=" block w-full"
                    // required
                    name="adhar"
                    value={value?.adhar}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="father" className="block mb-1">
                    Father Name
                  </label>
                  <input
                    type="text"
                    id="father"
                    className=" block  w-full"
                    // required
                    name="father"
                    value={value?.father}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="currentAddress" className="block mb-1">
                    Current Residence Address
                  </label>
                  <input
                    type="text"
                    id="currentAddress"
                    className="block  w-full"
                    // required
                    name="currentAddress"
                    value={value?.currentAddress}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="currentState" className="block mb-1">
                    Current state
                  </label>

                  <input
                    type="text"
                    id="currentState"
                    className="rounded-lg  w-full"
                    // required
                    name="currentState"
                    value={value?.currentState}
                    onChange={handleChange}

                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="currentCity" className="block mb-1">
                    Current city
                  </label>
                  <input
                    type="text"
                    id="currentCity"
                    className="rounded-lg  w-full"
                    // required
                    name="currentCity"
                    value={value?.currentCity}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="currentPin" className="block mb-1">
                    Area Pincode
                  </label>
                  <input
                    type="text"
                    id="currentPin"
                    className="block  w-full"
                    // required
                    name="currentPin"
                    value={value?.currentPin}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="perState" className="block mb-1">
                    Permanent state
                  </label>
                  <select
                    className=" block  w-full"
                    name="perState"
                    value={value?.perState}
                    id="perState"
                    onChange={handleChange}
                  >
                    <option>Permanent State</option>
                    <option>Jharkhand</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label htmlFor="perCity" className="block mb-1">
                    Permanent city
                  </label>
                  <input
                    type="text"
                    id="perCity"
                    className="block w-full"
                    // required
                    name="perCity"
                    value={value?.perCity}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="perPin" className="block mb-1">
                    Permanent Area Pincode
                  </label>
                  <input
                    type="text"
                    id="perPin"
                    className="block w-full"
                    // required
                    name="perPin"
                    value={value?.perPin}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="Martial" className="block mb-1">
                    Marital status
                  </label>
                  <select
                    className="rounded-lg w-full"
                    name="Martial"
                    id="Martial"
                    value={value?.Martial}
                    onChange={handleChange}
                  >
                    <option>Martial Status</option>
                    <option>Married</option>
                    <option>UnMarried</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label htmlFor="nationality" className="block mb-1">
                    Nationality
                  </label>
                  <select
                    className="block  w-full"
                    name="nationality"
                    id="nationality"
                    value={value?.nationality}
                    onChange={handleChange}
                  >
                    <option>Nationality</option>
                    <option>Indian</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label htmlFor="Mother" className="block mb-1">
                    Mother name
                  </label>
                  <input
                    type="text"
                    id="Mother"
                    className=" block w-full"
                    // required
                    name="Mother"
                    value={value?.Mother}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="qualification" className="block mb-1">
                    Qualification
                  </label>
                  <input
                    type="text"
                    id="qualification"
                    className=" block w-full"
                    // required
                    name="qualification"
                    value={value?.qualification}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="specialization" className="block mb-1">
                    Specialization
                  </label>
                  <input
                    type="text"
                    id="qualification"
                    className=" block w-full"
                    // required
                    name="specialization"
                    value={value?.specialization}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="qualificationType" className="block mb-1">
                    Qualification Type
                  </label>
                  <select
                    className="rounded-lg  w-full"
                    name="qualificationType"
                    id="qualificationType"
                    value={value?.qualificationType}
                    onChange={handleChange}
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
                <div className="mb-6">
                  <label htmlFor="yearPass" className="block mb-1">
                    Year of passing •
                  </label>
                  <select
                    className="rounded-lg  w-full"
                    name="yearPass"
                    id="yearPass"
                    value={value?.yearPass}
                    onChange={handleChange}
                  >
                    <option>year of passing</option>
                    <option>2000</option>
                    <option>2001</option>
                    <option>2002</option>
                    <option>2003</option>
                    <option>2004</option>
                    <option>2005</option>
                    <option>2006</option>
                    <option>2007</option>
                    <option>2008</option>
                    <option>2009</option>
                    <option>2010</option>
                    <option>2011</option>
                    <option>2012</option>
                    <option>2013</option>
                    <option>2014</option>
                    <option>2015</option>
                    <option>2016</option>
                    <option>2017</option>
                    <option>2018</option>
                    <option>2019</option>
                    <option>2020</option>
                    <option>2021</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label htmlFor="university" className="block mb-1">
                    University/Board •
                  </label>
                  <input
                    type="text"
                    id="university"
                    className=" block w-full"
                    // required
                    name="university"
                    value={value?.university}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="college" className="block mb-1">
                    College/School •
                  </label>
                  <input
                    type="text"
                    id="college"
                    className=" block w-full"
                    // required
                    name="college"
                    value={value?.college}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="percentage" className="block mb-1">
                    Grade/CCPA/Percentage
                  </label>
                  <input
                    type="text"
                    id="percentage"
                    className="block w-full"
                    // required
                    name="percentage"
                    value={value?.percentage}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="previousCompany" className="block mb-1">
                    Previous Company •
                  </label>
                  <input
                    type="text"
                    id="previousCompany"
                    className="block w-full"
                    // required
                    name="previousCompany"
                    value={value?.previousCompany}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="previousDesignation" className="block mb-1">
                    Previous Designation •
                  </label>
                  <input
                    type="text"
                    id="previousDesignation"
                    className="block w-full"
                    // required
                    name="previousDesignation"
                    value={value?.previousDesignation}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="toDate" className="block mb-1">
                    To date •
                  </label>
                  <input
                    type="date"
                    id="toDate"
                    className="block w-full"
                    // required
                    name="toDate"
                    value={value?.toDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="fromDate" className="block mb-1">
                    From date*
                  </label>
                  <input
                    type="date"
                    id="fromDate"
                    className="block w-full"
                    // required
                    name="fromDate"
                    value={value?.fromDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="numberOfMonth" className="block mb-1">
                    Number of months *
                  </label>
                  <input
                    type="text"
                    id="numberOfMonth"
                    className="block w-full"
                    // required
                    name="numberOfMonth"
                    value={value?.numberOfMonth}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="Jobdescription" className="block mb-1">
                    Job description
                  </label>
                  <input
                    type="text"
                    id="Jobdescription"
                    className="block w-full"
                    // required
                    name="Jobdescription"
                    value={value?.Jobdescription}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="SalaryPay" className="block mb-1">
                    Salary Pay Mode
                  </label>
                  <input
                    type="text"
                    id="SalaryPay"
                    className="block w-full"
                    // required
                    name="SalaryPay"
                    value={value?.SalaryPay}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="SalaryBankName" className="block mb-1">
                    Salary Bank Name
                  </label>
                  <input
                    type="text"
                    id="SalaryBankName"
                    className="block w-full"
                    // required
                    name="SalaryBankName"
                    value={value?.SalaryBankName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="BeneficiaryName" className="block mb-1">
                    Beneficiary Name
                  </label>
                  <input
                    type="text"
                    id="BeneficiaryName"
                    className="block w-full"
                    // required
                    name="BeneficiaryName"
                    value={value?.BeneficiaryName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="BankIfsc" className="block mb-1">
                    Bank IFSC Code
                  </label>
                  <input
                    type="text"
                    id="BankIfsc"
                    className="block w-full"
                    // required
                    name="BankIfsc"
                    value={value?.BankIfsc}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="AccountNumber" className="block mb-1">
                    Account Number
                  </label>
                  <input
                    type="text"
                    id="AccountNumber"
                    className="block w-full"
                    // required
                    name="AccountNumber"
                    value={value?.AccountNumber}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="confirmAccount" className="block mb-1">
                    Confirm Account Number
                  </label>
                  <input
                    type="text"
                    id="confirmAccount"
                    className="block w-full"
                    // required
                    name="confirmAccount"
                    value={value?.confirmAccount}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="Branch" className="block mb-1">
                    Bank Branch
                  </label>
                  <input
                    type="text"
                    id="Branch"
                    className="block w-full"
                    // required
                    name="Branch"
                    value={value?.Branch}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="Branch" className="block mb-1">
                    Documents
                  </label>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    {
                      value?.document?.map((item, index) => (
                        <div key={index} style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "center", maxWidth: "200px" }}>
                          <img src={item.url} alt="" />
                          <p style={{ margin: "4px auto", fontWeight: "600" }}>{item.name}</p>
                        </div>
                      ))
                    }
                  </div>
                </div>



                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Save
                </button>

              </form>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminProfile