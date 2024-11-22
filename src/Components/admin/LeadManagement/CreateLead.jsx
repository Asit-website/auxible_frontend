import React, { useEffect, useState } from "react";
import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import uint from "../../images/uing.png";
import { NavLink, useNavigate } from "react-router-dom";
import upload from "../../images/upload.svg";
import OutsideClickHandler from "react-outside-click-handler";
import toast from "react-hot-toast";
import * as EmailValidator from "email-validator";
import validator from "validator";
import { FaUpload } from "react-icons/fa6";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import usit from "../../images/usit.png";

const CreateLead = ({ setAlert, pop, setPop }) => {
  const {
    user,
    createLead,
    AllLeadSource , 
    getEmployees,
    uploadToCloudinaryImg,
  } = useMain();
  const [pop1, setPop1] = useState(false);
  const stylePeer = {
    display: pop1 ? "block" : "none",
  };

  let userDetail = JSON.parse(localStorage.getItem("hrms_user"));

  const [formdata, setFormdata] = useState({
    image: "",
    LeadOwner: userDetail?._id,
    leadType: "",
    budget: "",
    name: "",
    Mobile: "",
    Email: "",
    date: "",
    Street:"" ,
    City:"" ,
     State:"" , 
     ZipCode:"" ,
      Country:"" ,
      LeadSource:""

  });

  const [emp, setEmp] = useState([]);
  const [emailisValid, setIsemailValid] = useState(null);

  const [allLeadSource, setAllLeadSource] = useState([]);

  const fetchSource = async () => {
    const ans = await AllLeadSource();
    setAllLeadSource(ans?.data);
}


  const handleValidation = () => {
    const valid = EmailValidator.validate(formdata.Email);
    setIsemailValid(valid);
  };


  const navigate = useNavigate();

  const [leadUpldProf, setLeadUpLdPro] = useState("");

  const handleImageChange = async (event) => {
    const imageFile = event.target.files[0];

    if (!imageFile || !imageFile.type.match("image/*")) {
      return toast.error("Please select a valid image file.");
    }

    setFormdata((prev) => ({
      ...prev,
      image: imageFile,
    }));

    const resp = await uploadToCloudinaryImg({ image: imageFile });
    setLeadUpLdPro(resp?.data);
  };

  const changeHandler = async (e) => {
    const { name, value } = e.target;

    if (name === "Phone" && value.length > 10) {
      return;
    }

    if(name === "ZipCode" && value.length > 6){
        return ;
    }

    if (name === "Mobile" && value.length > 10) {
      return;
    }

    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async () => {
    const toastId = toast.loading("Loading...");
    if (emailisValid === false && formdata.Email !== "") {
      toast.dismiss(toastId);
      return toast.error("Please Enter Correct Gmail");
    }

    const ans = await createLead({ ...formdata });
    if (ans?.status) {
      toast.success("Successful created");
      navigate("/adminDash/myLead");
      setFormdata({
        image: "",
    LeadOwner: userDetail?._id,
    leadType: "",
    budget: "",
    name: "",
    Mobile: "",
    Email: "",
    date: "",
    Street:"" ,
    City:"" ,
     State:"" , 
     ZipCode:"" ,
      Country:"" ,
      LeadSource:""
      });
    }

    toast.dismiss(toastId);
  };

  const getOwner = async () => {
    const ans = await getEmployees();
    setEmp(ans?.data);
  };

  useEffect(() => {
    getOwner();
    fetchSource();
  }, []);


  return (
    <>
      <div className="employee-dash h-full">
        <AdminSidebar pop={pop} setPop={setPop} />

        <div className="tm">
          <AdminNavbar user={user} setAlert={setAlert} />

          <div className="em">
            <div className="ghj makeitsticky">
              <div className="makethifles">
                <NavLink to="/adminDash/myLead">
                  <button>Back</button>
                </NavLink>

                <button
                  onClick={submitHandler}
                  type="button"
                  class="siubmitbtnlead"
                >
                  Submit
                </button>
              </div>
            </div>

            <form className="test_formis" action="">
              <div
                data-modal-target="default-modal"
                data-modal-toggle="default-modal"
                className="uploadprowrap"
              >
                <div className="imagewrapleac">
                  {leadUpldProf ? (
                    <img src={leadUpldProf} alt="" className="leadUpldProf" />
                  ) : (
                    <img src={usit} alt="" onClick={() => setPop1(!pop1)} />
                  )}
                </div>
                <p onClick={() => setPop1(!pop1)} className="cursor-pointer">
                  {" "}
                  {formdata.image ? "Change Image" : "Upload Image"}{" "}
                </p>
              </div>

              <>
                {/* Main modal */}
                <OutsideClickHandler
                  onOutsideClick={() => {
                    setPop1(false);
                  }}
                >
                  <div
                    id="default-modal"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="hidden tikra overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                    style={stylePeer}
                  >
                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                      {/* Modal content */}
                      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* Modal header */}
                        <div className=" p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                          <h3 className="text-xl sini  font-semibold text-gray-900 dark:text-white">
                            Select Image
                          </h3>
                        </div>
                        {/* Modal body */}
                        <div className="selct_div">
                          <div className="upload_io">
                            <img src={upload} alt="" />
                          </div>
                          <div className="upload_an mt-4">
                            <p>Upload an image here</p>
                          </div>
                          <div className="opd mt-4">
                            <div className="browse">
                              <h3>Browse Local Files</h3>
                            </div>
                            <input
                              type="file"
                              onChange={(e) => {
                                handleImageChange(e);
                                setPop1(false);
                              }}
                            />
                          </div>
                        </div>
                        {/* Modal footer */}
                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"></div>
                      </div>
                    </div>
                  </div>
                </OutsideClickHandler>
              </>

              <div className="lead_information mt-6">
                <h2>Lead Information</h2>

                <div className="lead_input mt-5">

                  <div className="lead_inp">
                    <div className="lead_inp1">
                      <label htmlFor="">Lead Owner *</label>
                      <input
                        required
                        type="LeadOwner"
                        value={userDetail?.fullName}
                        disabled
                        onChange={changeHandler}
                      />
                    </div>
                  

                    <div className="lead_inp1">
                      <label  htmlFor="">
                        Name
                      </label>
                      <input
                        value={formdata.name}
                        name="name"
                        onChange={changeHandler}
                        type="text"
                      />
                    </div>

                  </div>

                  <div className="lead_inp">

                  <div className="lead_inp1">
                      <label  htmlFor="">
                        Budget *
                      </label>
                      <input
                        required
                        type="number"
                        value={formdata.budget}
                        name="budget"
                        onChange={changeHandler}
                      />
                    </div>
                
                    <div className="lead_inp1">
                      <label  htmlFor="">
                        Email *
                      </label>
                      <input
                        required
                        value={formdata.Email}
                        name="Email"
                        onChange={(e) => {
                          changeHandler(e);
                          handleValidation(e.target.value);
                        }}
                        type="email"
                        className={`${
                          emailisValid === false &&
                          formdata.Email !== "" &&
                          "emailvalidinput"
                        }`}
                      />
                    </div>
                  </div>

           
                  <div className="lead_inp">
                    <div className="lead_inp1">
                      <label  htmlFor="">
                        Mobile
                      </label>
                      <input
                        value={formdata.Mobile}
                        name="Mobile"
                        onChange={changeHandler}
                        type="number"
                      />
                    </div>

                    <div className="lead_inp1">
                      <label  htmlFor="">
                        Lead Type *
                      </label>
                      <select
                        required
                        value={formdata?.leadType}
                        name="leadType"
                        onChange={changeHandler}
                        id=""
                      >
                        <option>Select LeadType</option>
                        <option value="Sound">Sound</option>
                        <option value="LED">LED</option>
                        <option value="Lighting">Lighting</option>
                        <option value="All of the above">
                          All of the above
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="lead_inp">
                    <div className="lead_inp1">
                      <label  htmlFor="">
                        Date
                      </label>
                      <input
                        value={formdata.date}
                        name="date"
                        onChange={changeHandler}
                        type="date"
                      />
                    </div>

                    <div className="lead_inp1">
                                            <label htmlFor="">Lead Source</label>
                                            <select name="LeadSource" value={formdata.LeadSource} onChange={changeHandler} id="">
                                                <option>Select lead source</option>
                                                {
                                                    allLeadSource?.map((item, index) => (
                                                        <option key={index} value={item?.name}>{item?.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                  
                  </div>

                

                </div>


              </div>

              <div className="lead_information mt-6">
                                <h2>Address Information</h2>

                                <div className="lead_input mt-5">

                                    <div className="lead_inp">
                                        <div className="lead_inp1">
                                            <label htmlFor="">Street</label>
                                            <input value={formdata.Street} name="Street" onChange={changeHandler} type="text" />
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">City</label>
                                            <input value={formdata.City} name="City" onChange={changeHandler} type="text" />
                                        </div>
                                    </div>

                                    <div className="lead_inp">
                                        <div className="lead_inp1">
                                            <label htmlFor="">State</label>
                                            <input value={formdata.State} name="State" onChange={changeHandler} type="text" />
                                        </div>
                                       
                                        <div className="lead_inp1">
                                            <label htmlFor="">Zip Code</label>
                                            <input value={formdata.ZipCode} name="ZipCode" onChange={changeHandler} type="Number" />
                                        </div>
                                    </div>

                                    <div className="lead_inp">
                                        <div className="lead_inp1">
                                            <label htmlFor="">Country</label>
                                            <input value={formdata.Country} name="Country" onChange={changeHandler} type="text" />
                                        </div>
                                     
                                    </div>

                                </div>

                            </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateLead;
