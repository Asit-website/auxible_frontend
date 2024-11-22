import React, { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import uint from '../../images/uing.png';
import { useNavigate, NavLink } from "react-router-dom";
import upload from '../../images/upload.svg';
import OutsideClickHandler from "react-outside-click-handler";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";
import toast from "react-hot-toast";
import * as EmailValidator from "email-validator";
import validator from 'validator';
import usit from '../../images/usit.png';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'


const CreateLead2 = ({ setAlert, pop, setPop }) => {
    const { user, createLead, getEmployees, AllLeadSource, AllLeadStatus, getLeadStat, uploadToCloudinaryImg } = useMain();
    const [pop1, setPop1] = useState(false);
    const stylePeer = {
        display: pop1 ? "block" : "none"
    }

    let userDetail = JSON.parse(localStorage.getItem("hrms_user"));

    const [emp, setEmp] = useState([]);

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

    const [emailisValid, setIsemailValid] = useState(null);
    const [emailisValid1, setIsemailValid1] = useState(null);

    const handleValidation = () => {
        const valid = EmailValidator.validate(formdata.Email);
        setIsemailValid(valid);
    };

    const handleValidation1 = () => {
        const valid = EmailValidator.validate(formdata.SecondaryEmail);
        setIsemailValid1(valid);
    }

    const [isUrlValid, setIsUrlValid] = useState(null);
    const [isUrlValid1, setIsUrlValid1] = useState(null);
    const [isUrlValid2, setIsUrlValid2] = useState(null);

    const handleInputUrlChange = (value) => {
        if (validator.isURL(value)) {
            setIsUrlValid(true);
        } else {
            setIsUrlValid(false);
        }
    };

    const handleInputUrlChange1 = (value) => {
        if (validator.isURL(value)) {
            setIsUrlValid1(true);
        } else {
            setIsUrlValid1(false);
        }
    };

    const handleInputUrlChange2 = (value) => {
        if (validator.isURL(value)) {
            setIsUrlValid2(true);
        } else {
            setIsUrlValid2(false);
        }
    };


    const navigate = useNavigate();

    const [leadUpldProf, setLeadUpLdPro] = useState("");


    const handleImageChange = async (event) => {
        const imageFile = event.target.files[0];

        if (!imageFile || !imageFile.type.match('image/*')) {
            return toast.error('Please select a valid image file.');
        }

        setFormdata((prev) => ({
            ...prev,
            image: imageFile
        }))

        const resp = await uploadToCloudinaryImg({ image: imageFile });
        console.log(resp)
        setLeadUpLdPro(resp?.data);

    };

    const changeHandler = async (e) => {
        const { name, value } = e.target;

        if (name === "ZipCode" && value.length > 6) {
            return
        }

        if (name === "Mobile" && value.length > 10) {
            return
        }

        setFormdata((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const submitHandler = async () => {
      
        const toastId = toast.loading("Loading...");
        if (emailisValid === false && formdata.Email !== "") {
          toast.dismiss(toastId);
          return toast.error("Please Enter Correct Gmail");
        }
    

       
        const ans = await createLead({ ...formdata });
        if (ans?.status) {
            navigate("/employeeDash/myLead")
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
            })

            toast.success("Successfuly submit");
        }

        toast.dismiss(toastId);
    }

    const getOwner = async () => {
        const ans = await getEmployees();
        console.log(ans?.data);
        setEmp(ans?.data);
    }



    const [allLeadSource, setAllLeadSource] = useState([]);


    const fetchSource = async () => {
        const ans = await AllLeadSource();
        setAllLeadSource(ans?.data);
    }


    useEffect(() => {
        getOwner();
        fetchSource();

    }, [])

    return (
        <>
            <div className="employee-dash h-full">
                <EmployeeSidebar pop={pop} setPop={setPop} />

                <div className="tm">
                    <EmployeeNavbar user={user} setAlert={setAlert} />

                    <div className="em">

                    

<div className="ghj makeitsticky">
                            <div className="makethifles">
                                <NavLink to="/employeeDash/myLead"><button>Back</button></NavLink>

                                <button onClick={submitHandler} type="button" class="siubmitbtnlead">Submit</button>

                            </div>

                        </div>

                        <form action="" className="test_formis">
                            <div data-modal-target="default-modal"
                                data-modal-toggle="default-modal" className="uploadprowrap">
                                <div className="imagewrapleac">

                                    {
                                        leadUpldProf ? <img src={leadUpldProf} alt="" className="leadUpldProf" /> :
                                            // <FaUpload className="FaUploadfds" onClick={() => setPop1(!pop1)} />
                                            <img src={usit} alt="usit" />
                                    }

                                </div>
                                <p onClick={() => setPop1(!pop1)} className="cursor-pointer"> {formdata.image ? "Change Image" : "Upload Image"} </p>

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
                                                        <input type="file" onChange={(e) => {
                                                            handleImageChange(e);
                                                            setPop1(false);
                                                        }} />
                                                    </div>

                                                </div>
                                                {/* Modal footer */}
                                                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                                </div>
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

export default CreateLead2;
