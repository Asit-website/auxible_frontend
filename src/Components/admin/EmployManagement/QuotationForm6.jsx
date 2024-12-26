import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import "./HRMsystem.css";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";
import plussing from "../../images/plussing.png";
import inputfileds from "../../images/inputfield.png";
import "./quote.css";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { CiCirclePlus } from "react-icons/ci";
import pluslogo from "../../images/8922789.png";

const QuotationForm6 = ({ setAlert, pop, setPop }) => {
  const {
    user,
    uploadSingleImage,
    postQuotationFormApi,
    updateQuotationFormApi,
  } = useMain();

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const [formdata, setFormdata] = useState({
    quotationNum: "",
    customerName: "",
    customerReq: "",
    mobileNum: "",
    quotationDate: "",
    validUntil: "",
    customerId: "",
    companyName: "",
    companyAddress: "",
    companyGSTIN: "",
    companyWebsite: "",
    total:"",
    candICharge:"" , 
    totalPayableAmt:"" , 
    subTotal:"", 
    serviceTax:"" ,
     installation:"" ,
     other:"" ,
      transpotation :"",
       totalPayableAmt:"" ,
       tax:""

  });

  const textChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const editor = useRef(null);

  const navigate = useNavigate();

  const [content, setContent] = useState("");

  const { role } = hrms_user;

  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const [preview, setPreview] = useState(false);

  const [logoImage, setLogoImage] = useState("");
  const [buislogoname, setBuisLogName] = useState("");

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setBuisLogName(file);
      const formdata2 = new FormData();
      formdata2.append("Image", file);

      const ans = await uploadSingleImage(formdata2);
      if (ans?.status) {
        sessionStorage.setItem("quotationLogoLink", ans?.link);
        toast.success("Successfuly uploaded");
        setLogoImage(ans?.link);
      } else {
        toast.error("Something went wrong , please try again");
      }
    }
  };

   // Handle image selection and upload
   const handleImageUpload = async (e, index) => {
    const file = e.target.files[0]; 

    if (file) {
      const formdata2 = new FormData();
      formdata2.append("Image", file);

      const ans = await uploadSingleImage(formdata2); 

      if (ans?.status) {
        const newRows = [...rows];
        newRows[index].productPic = ans?.link; 
        setRows(newRows); 
      } else {
        console.error("Image upload failed");
      }
    }
  };

  const [rows, setRows] = useState([
    {  description:"", sft: "", rate: "", amount: "" , design:"" },
  ]);

  const addRow = () => {
    setRows([
      ...rows,
      {  description:"", sft: "", rate: "", amount: "" , design:"" },
    ]);
  };

  const addDescriptionField = (rowIndex) => {
    const newRows = [...rows];
    newRows[rowIndex].description.push(""); // Add an empty description
    setRows(newRows);
  };

  const handleDescriptionChange = (rowIndex, descIndex, value) => {
    const newRows = [...rows];
    newRows[rowIndex].description[descIndex] = value; // Update the specific description
    setRows(newRows);
  };

  //   const postQuotationForm = async () => {
  //     const toastId = toast.loading("Loading...");

  //     const ans = await postQuotationFormApi({
  //       ...formdata,
  //       items: rows,
  //       userId: hrms_user?._id,
  //       leadId: id,
  //       content,
  //     });

  //     if (ans?.status) {
  //       toast.success("Successfuly created");
  //       setFormdata({
  //         quotationNum: "",
  //         customerName: "",
  //         customerReq: "",
  //         mobileNum: "",
  //         quotationDate: "",
  //         validUntil: "",
  //         customerId: "",
  //         companyName: "",
  //         companyAddress: "",
  //         companyGSTIN: "",
  //         companyWebsite: "",
  //       });

  //       sessionStorage.removeItem("quotationLogoLink");

  //       setRows([]);
  //       setContent(data);
  //     }
  //     toast.dismiss(toastId);
  //   };

  //   const updateQuotationForm = async () => {
  //     const toastId = toast.loading("Loading...");

  //     const ans = await updateQuotationFormApi({
  //       ...formdata,
  //       items: rows,
  //       userId: hrms_user?._id,
  //       leadId: id,
  //       content,
  //       id: item?._id,
  //     });

  //     if (ans?.status) {
  //       toast.success("Successfuly updated");
  //       setFormdata({
  //         quotationNum: "",
  //         customerName: "",
  //         customerReq: "",
  //         mobileNum: "",
  //         quotationDate: "",
  //         validUntil: "",
  //         customerId: "",
  //         companyName: "",
  //         companyAddress: "",
  //         companyGSTIN: "",
  //         companyWebsite: "",
  //       });

  //       setRows([]);
  //       setContent(data);
  //       sessionStorage.removeItem("quotationLogoLink");
  //     }
  //     toast.dismiss(toastId);
  //   };

  useEffect(() => {
    const quotationLogoLink = sessionStorage.getItem("quotationLogoLink");
    if (quotationLogoLink) {
      setLogoImage(quotationLogoLink);
    }
  }, []);

  //   useEffect(() => {
  //     if (item) {
  //       const {
  //         quotationNum,
  //         customerName,
  //         customerReq,
  //         mobileNum,
  //         quotationDate,
  //         validUntil,
  //         customerId,
  //         companyName,
  //         companyAddress,
  //         companyGSTIN,
  //         companyWebsite,
  //         items,
  //       } = item;
  //       setRows(items);
  //       setFormdata({
  //         quotationNum,
  //         customerName,
  //         customerReq,
  //         mobileNum,
  //         quotationDate,
  //         validUntil,
  //         customerId,
  //         companyName,
  //         companyAddress,
  //         companyGSTIN,
  //         companyWebsite,
  //       });
  //     }
  //   }, []);

  const contonentPDF = useRef();

  const generatePdf = useReactToPrint({
    content: () => contonentPDF.current,
    documentTitle: "Quotation",
    parentContainer: {
      "@media print": {
        display: "block",
      },
    },
    onAfterPrint: () => alert("success", "item saved"),
  });

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
            <div className="qutaWrap">
              <div className="qutaLeft">

                <div className="qutLTo">
                  <div className="qutolobutons">
                    <button onClick={() => setPreview(true)}>Preview</button>
                    <button
                    //  onClick={()=>{
                    //     if (item) {
                    //       updateQuotationForm();
                    //     } else {
                    //       postQuotationForm();
                    //     }
                    //  }}
                    >
                      Create
                    </button>
                    <button
                      onClick={() => {
                        navigate(-1);
                      }}
                      className="cnebuqo"
                    >
                      Cancel
                    </button>
                  </div>
                </div>

                <div className="allwhitebg">

                  <form className="qtoform">
                    <label>
                      <p>Ref No*</p>
                      <input
                        value={formdata.quotationNum}
                        name="quotationNum"
                        onChange={textChangeHandler}
                        type="text"
                        placeholder="#01"
                      />
                    </label>

                    <label>
                      <p>Customer Name*</p>
                      <input
                        value={formdata.customerName}
                        name="customerName"
                        onChange={textChangeHandler}
                        type="text"
                        placeholder="Akash Negi"
                      />
                    </label>

                    <label>
                      <p>Quotation Date*</p>
                      <input
                        value={formdata.quotationDate}
                        name="quotationDate"
                        onChange={textChangeHandler}
                        type="date"
                      />
                    </label>  
                  </form>

             
              <div className="relative quotabl_wrap">
      <table className="quotablle3 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="theadqu">
          <tr>
            <th scope="col" className="px-2 py-3">Description</th>
            <th scope="col" className="px-2 py-3">S. FT. (size/Nos.)</th>
            <th scope="col" className="px-2 py-3">Rate / S.FT</th>
            <th scope="col" className="px-2 py-3">Amount</th>
            <th scope="col" className="px-2 py-3">Design</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, rowIndex) => (
            <tr className="bg-white tabletr" key={rowIndex}>
              <td className="px-2 py-4">
                <input
                  type="text"
                  className="appinput2 addwidth"
                  value={row.description}
                  onChange={(e) => {
                    const newRows = [...rows];
                    newRows[rowIndex].description = e.target.value;
                    setRows(newRows);
                  }}
                />
              </td>

              <td className="px-2 py-4">
                <input
                  type="text"
                  className="appinput2"
                  value={row.sft}
                  onChange={(e) => {
                    const newRows = [...rows];
                    newRows[rowIndex].sft = e.target.value;
                    setRows(newRows);
                  }}
                />
              </td>

              <td className="px-2 py-4">
                <input
                  type="text"
                  className="appinput2"
                  value={row.rate}
                  onChange={(e) => {
                    const newRows = [...rows];
                    newRows[rowIndex].rate = e.target.value;
                    setRows(newRows);
                  }}
                />
              </td>

              <td className="px-2 py-4">
                <input
                  className="appinput2"
                  type="text"
                  value={row.amount}
                  onChange={(e) => {
                    const newRows = [...rows];
                    newRows[rowIndex].amount = e.target.value;
                    setRows(newRows);
                  }}
                />
              </td>

              <td className="px-2 py-4">
                <input
                  type="file"
                  accept="image/*"
                  className="appinput2"
                  onChange={(e) => handleImageUpload(e, rowIndex)} 
                />
                {/* {row.productPic && (
                  <img src={row.productPic} alt="Product" className="mt-2 w-16 h-16 object-cover" />
                )} */}
              </td>



            </tr>
          ))}
        </tbody>
      </table>

      <button
        type="button"
        className="bg-green-500 text-white px-3 py-2 mt-4 rounded"
        onClick={addRow}
      >
        Add Row
      </button>
    </div>

                  <div onClick={addRow} className="admorCont cursor-pointer">
                    <img src={plussing} alt="" />
                    <span>Add Item</span>
                  </div>

                 <div className="totalCI_charges">

                   <label htmlFor="">
                    <p>Sub Total :</p>
                    <input onChange={textChangeHandler} name="subTotal" value={formdata.subTotal} type="text" />
                   </label>

                   <label htmlFor="">
                    <p>Tax : </p>
                    <input onChange={textChangeHandler} name="tax" value={formdata.tax} type="text" />
                   </label>
                   <label htmlFor="">
                    <p>Sercice Tax :</p>
                    <input onChange={textChangeHandler} name="serviceTax" value={formdata.serviceTax} type="text" />
                   </label>
                   <label htmlFor="">
                    <p> Installation :</p>
                    <input onChange={textChangeHandler} name="installation" value={formdata.installation} type="text" />
                   </label>
                   <label htmlFor="">
                    <p> Other :</p>
                    <input onChange={textChangeHandler} name="other" value={formdata.other} type="text" />
                   </label>
                   <label htmlFor="">
                    <p> Transpotation :</p>
                    <input onChange={textChangeHandler} name="transpotation" value={formdata.transpotation} type="text" />
                   </label>

                   <label htmlFor="">
                    <p>Total :</p>
                    <input onChange={textChangeHandler} name="total" value={formdata.total} type="text" />
                   </label>

           

                 </div>
            
                </div>
              </div>

              {preview && (
                <div className="previ_wrap2">
                  <div className="prev_quotarioncont">

                    <div ref={contonentPDF} className="qutaRightcont">
                 
                         <div className="quota2_ref">
                             <p>Ref. No- {formdata.quotationNum}</p>
                             <p>Date : {formdata.quotationDate}</p>
                         </div>

                         <div className="qut1_to">
                            <p>Kind Attention :- {formdata.customerName}</p>
                            <p>Home Solution</p>
                            <p>Delhi</p>
                         </div>

                         <div className="quot2_dear">
                            <h4>Dear Sir,</h4>
                            <p>As per discussion held, please find attached the quotation for the sound solution for your suggested area premises.</p>
                         </div>

                      <div className="talbeLike">
                        <div class="relative w-full">
                         <p className="aubdisolpara3 text-white">VIDEO SOLUTION</p>
                          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="quuo2_table_head2">
                              <tr>
                                <th scope="col" className="px-2 py-3 ">
                                  S. No.
                                </th>
                                <th scope="col" className="px-2 py-3">
                                 Product Name
                                </th>
                                <th scope="col" className="px-2 py-3">
                                  Product Description
                                </th>
                                <th scope="col" className="px-2 py-3">
                                  Unit Price
                                </th>
                                <th scope="col" className="px-2 py-3">
                                  Tax Rate
                                </th>
                                <th scope="col" className="px-2 py-3">
                                  Amount
                                </th>
                               
                              </tr>
                            </thead>
                            <tbody>
                            {rows.map((row, rowIndex) => (
            <tr className="bg-white quotabletr2" key={rowIndex}>
              <td className="px-2 py-2 prewid1">{rowIndex + 1}</td>
              <td className="px-2 py-2 prewid2">{row.productName}</td>
              <td className="prewid2  addsomethin1">
                {row.description.map((desc, descIndex) => (  <p className="eachprepara" key={descIndex}>{desc}</p>  ))}
              </td>
              <td className="px-2 py-2 prewid4">{row.unitPrice}</td>
              <td className="px-2 py-2 prewid1">{row.taxRate}</td>
           
              <td className="px-2 py-2 prewid5">{row.amount}</td>
            
            
         
            </tr>
          ))}
                            </tbody>
                          </table>

                          <div className="totalcai_cont">
                           <p>Sub Total: {formdata.subTotal}</p>
                           <p>Total: {formdata.total}</p>
                           <p>Tax {formdata.tax}</p>
                           <p>Service Tax {formdata.serviceTax}</p>
                           <p>Installation {formdata.installation}</p>
                           <p>Other {formdata.other}</p>
                           <p>Transpotation {formdata.transpotation}</p>
                           <p>Total Payable amount: {formdata.totalPayableAmt}</p>
                          </div>

                        </div>
                      </div>



                    </div>

                    <hr />

                    <div className="prntBtn">
                      <button
                        onClick={() => setPreview(false)}
                        className="cnebuqo"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          generatePdf();
                        }}
                      >
                        <span>Print</span>
                      </button>
                    </div>

                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default QuotationForm6;
