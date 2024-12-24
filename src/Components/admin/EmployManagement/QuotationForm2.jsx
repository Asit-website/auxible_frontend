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

const QuotationForm2 = ({ setAlert, pop, setPop }) => {
  const {
    user,
    uploadSingleImage,
    postQuotationFormApi,
    updateQuotationFormApi,
  } = useMain();

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  //   const location = useLocation();

  //   const { id, item } = location.state;

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
      const formdata2 = new FormData();
      formdata2.append("Image", file);
      setBuisLogName(file);

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

  const [rows, setRows] = useState([
    { application: "", brand: "", model: "", description: "" , qty:"" , unitPrice:"" , amount:"" },
  ]);

  const addRow = () => {
    setRows([...rows, { application: "", brand: "", model: "", description: "" , qty:"" , unitPrice:"" , amount:"" }]);
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
                      <p>Kind Attention</p>
                      <input
                        type="text"
                        value={formdata.customerReq}
                        name="customerReq"
                        onChange={textChangeHandler}
                        placeholder="Mobile App - diet care app"
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

             
                  <div class="relative ">
                    <table className="quotablle text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="theadqu">
                        <tr>
                          <th scope="col" className="px-2 py-3">
                            Application
                          </th>
                          <th scope="col" className="px-2 py-3">
                            Brand
                          </th>
                          <th scope="col" className="px-2 py-3">
                            Model
                          </th>
                          <th scope="col" className="px-2 py-3">
                            Description
                          </th>
                          <th scope="col" className="px-2 py-3">
                            Qty
                          </th>
                          <th scope="col" className="px-2 py-3">
                             Unit Price
                          </th>
                          <th scope="col" className="px-2 py-3">
                             Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row, index) => (
                          <tr className="bg-white tabletr" key={index}>

                            <td className="px-2 py-4">
                              <input
                                type="text"
                                className="appinput2"
                                value={row.application}
                                onChange={(e) => {
                                  const newRows = [...rows];
                                  newRows[index].application = e.target.value;
                                  setRows(newRows);
                                }}
                              />
                            </td>

                            <td className="px-2 py-4">
                              <input
                                type="text"
                                className="appinput2"
                                value={row.brand}
                                onChange={(e) => {
                                  const newRows = [...rows];
                                  newRows[index].brand = e.target.value;
                                  setRows(newRows);
                                }}
                              />
                            </td>

                            <td className="px-2 py-4">
                              <input
                                type="text"
                                className="appinput2"
                                value={row.model}
                                onChange={(e) => {
                                  const newRows = [...rows];
                                  newRows[index].model = e.target.value;
                                  setRows(newRows);
                                }}
                              />
                            </td>

                            <td className="px-2 py-4">
                              <input
                              className="appinput2"
                                type="text"
                                value={row.description}
                                onChange={(e) => {
                                  const newRows = [...rows];
                                  newRows[index].description = e.target.value;
                                  setRows(newRows);
                                }}
                              />
                            </td>

                            <td className="px-2 py-4">
                              <input
                              className="appinput2"
                                type="text"
                                value={row.qty}
                                onChange={(e) => {
                                  const newRows = [...rows];
                                  newRows[index].qty = e.target.value;
                                  setRows(newRows);
                                }}
                              />
                            </td>

                            <td className="px-2 py-4">
                              <input
                              className="appinput2"
                                type="text"
                                value={row.unitPrice}
                                onChange={(e) => {
                                  const newRows = [...rows];
                                  newRows[index].unitPrice = e.target.value;
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
                                  newRows[index].amount = e.target.value;
                                  setRows(newRows);
                                }}
                              />
                            </td>

                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div onClick={addRow} className="admorCont cursor-pointer">
                    <img src={plussing} alt="" />
                    <span>Add Item</span>
                  </div>

            
                </div>
              </div>

              {preview && (
                <div className="previ_wrap">
                  <div className="prev_quotarioncont">

                    <div ref={contonentPDF} className="qutaRightcont">
                 
                         <div className="quota2_ref">
                             <p>Ref. No- {formdata.quotationNum}</p>
                             <p>Date : {formdata.quotationDate}</p>
                         </div>

                         <div className="qut1_to">
                            <p>To, {formdata.customerName}</p>
                            <p>Kind Attention :- {formdata.customerReq}</p>
                            <p>Noida</p>
                         </div>

                         <div className="quot2_dear">
                            <p>Dear Sir,</p>
                            <p>As per discussion held, please find attached the quotation for the sound solution for your suggested area premises.</p>
                         </div>

                      <div className="talbeLike">
                        <div class="relative w-full">
                         <p className="aubdisolpara">AUDIO SOLUTION</p>
                          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="quuo2_table_head">
                              <tr>
                                <th scope="col" className="px-2 py-3 ">
                                  SI. No.
                                </th>
                                <th scope="col" className="px-2 py-3">
                                  Application
                                </th>
                                <th scope="col" className="px-2 py-3">
                                  Brand
                                </th>
                                <th scope="col" className="px-2 py-3">
                                  Model
                                </th>
                                <th scope="col" className="px-2 py-3">
                                  Description
                                </th>
                                <th scope="col" className="px-2 py-3">
                                  Qty
                                </th>
                                <th scope="col" className="px-2 py-3">
                                  Unit Price
                                </th>
                                <th scope="col" className="px-2 py-3">
                                  Amount
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {rows.map((row, index) => (
                                <tr className="bg-white quotabletr2 " key={index}>
                                    
                                  <td className="px-2 py-2 prewid1">{index+1} </td>
                                  <td className="px-2 py-2 prewid2">{row.application} </td>
                                  <td className="px-2 py-2 prewid1">{row.brand}</td>
                                  <td className="px-2 py-2 prewid3">{row.model}</td>
                                  <td className="px-2 py-2 prewid4">{row.description}</td>
                                  <td className="px-2 py-2 prewid1">{row.qty}</td>
                                  <td className="px-2 py-2 prewid5">{row.unitPrice}</td>
                                  <td className="px-2 py-2 prewid5">{row.amount}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>


               <div className="quo1_termandcond">
                <h4>TERMS & CONDITIONS</h4>
                <p>1. GST 18% will be extra as applicable.</p>
                <p>2. Freight & ITC charges extra as per actual.</p>
                <p>3. All specifications will be followe as per standard practice from companies.</p>
                <p>4. All warranties for various products to be provided as per OEM policy.</p>
                <p>5. 100% advance along with PO.</p>
                <p>6. All payment to be done through cheque/ RTGS</p>
                <p>7. Quotation validation within  15-days.</p>
               </div>

     <p className="quo1_extrapra">Hope you find our quotation in line with your requirement. Looking forward to being a part of your prestigious project.</p>
     <p className="quo1_extrapra">Regards</p>


                   
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
export default QuotationForm2;
