import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import "./HRMsystem.css";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";
import plussing from "../../images/plussing.png";
import "./quote.css";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const QuotationForm = ({ setAlert, pop, setPop }) => {
  
  const { user, uploadSingleImage } = useMain();

  const [currentshowindex, setCurrShowIndex] = useState(0);

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
    totalPayableAmt:"",
    total:""
  });

  const textChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  const { role } = hrms_user;

  const [preview, setPreview] = useState([false, false, false, false]);

  const handlePreviewClick = () => {
    const updatedPreview = preview.map((value, index) =>
      index === currentshowindex ? true : value
    );
    setPreview(updatedPreview);
  };

  const [rows, setRows] = useState([
    { application: "", brand: "", model: "", description: "" , qty:"" , unitPrice:"" , amount:"" },
  ]);

  const addRow = () => {
    setRows([...rows, { application: "", brand: "", model: "", description: "" , qty:"" , unitPrice:"" , amount:"" }]);
  };

  const [rows3, setRows3] = useState([
    {area: "", description: "" , qty:"" , price:"" , amount:"" , unit:"" },
  ]);

  const addRow3 = () => {
    setRows3([...rows3, {area: "", model: "", description: "" , qty:"" , unitPrice:"" , amount:"" },]);
  };

  const [rows4, setRows4] = useState([
    {product: "", model: "" , brand:"" , productPic:"" , unitPrice:"" , qty:"" , total:"" },
  ]);

  const addRow4 = () => {
    setRows4([...rows4, {product: "", model: "" , brand:"" , productPic:"" , unitPrice:"" , qty:"" , total:"" }]);
  };

  const [rows2, setRows2] = useState([
    {
      productName: "",
      description: [""],
      unitPrice: "",
      taxRate: "",
      amount: "",
    },
  ]);

  const addRow2 = () => {
    setRows2([
      ...rows2,
      {
        productName: "",
        description: [""],
        unitPrice: "",
        taxRate: "",
        amount: "",
      },
    ]);
  };

  const handleDescriptionChange = (rowIndex, descIndex, value) => {
    const newRows = [...rows2];
    newRows[rowIndex].description[descIndex] = value;
    setRows2(newRows);
  };

  const addDescriptionField = (rowIndex) => {
    const newRows = [...rows2];
    newRows[rowIndex].description.push("");
    setRows2(newRows);
  };

  const handleImageUpload = async (e, index) => {
    const file = e.target.files[0];

    if (file) {
      const formdata2 = new FormData();
      formdata2.append("Image", file);

      const ans = await uploadSingleImage(formdata2);

      if (ans?.status) {
        const newRows = [...rows4];
        newRows[index].productPic = ans?.link;
        setRows4(newRows);
      } else {
        console.error("Image upload failed");
      }
    }
  };

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

  const handleCancelClick = () => {
    setPreview(preview.map(() => false));
  };

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
                    <button onClick={handlePreviewClick}>Preview</button>
                    <button
                    >
                      Save
                    </button>

                    <button>Create</button>

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

                <div className="allquotation_formtate">
                  <button
                    onClick={() => {
                      setCurrShowIndex(0);
                      setFormdata({
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
                        totalPayableAmt:"",
                        total:""
                      })
                    }}
                  >
                    <span>Audio & Sound</span>
                  </button>
                  <button
                    onClick={() => {
                      setCurrShowIndex(1);
                      setFormdata({
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
                        totalPayableAmt:"",
                        total:""
                      })
                    }}
                  >
                    <span>LED</span>
                  </button>
                  <button
                    onClick={() => {
                      setCurrShowIndex(2);
                      setFormdata({
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
                        totalPayableAmt:"",
                        total:""
                      })
                    }}
                  >
                    <span>Home Theatre System</span>
                  </button>
                  <button
                    onClick={() => {
                      setCurrShowIndex(3);
                      setFormdata({
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
                        totalPayableAmt:"",
                        total:""
                      })
                    }}
                  >
                   
                    <span>Pixel Lighting</span>
                  </button>
                </div>

                {currentshowindex === 0 && (
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
                        <p>Kind Attention</p>
                        <input
                          type="text"
                          value={formdata.customerReq}
                          name="customerReq"
                          onChange={textChangeHandler}
                          placeholder="Akash "
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

                    <div class="relative allowoverflow">
                      <table className="quotablle  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                )}

                {currentshowindex === 1 && (
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
                        <p>Kind Attention</p>
                        <input
                          type="text"
                          value={formdata.customerReq}
                          name="customerReq"
                          onChange={textChangeHandler}
                          placeholder="Akash "
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

                      <label>
                        <p>GSTN No.</p>
                        <input
                          value={formdata.companyGSTIN}
                          name="companyGSTIN"
                          onChange={textChangeHandler}
                          type="text"
                          placeholder="GSTIN Number"
                        />
                      </label>
                    </form>

                    <div class="relative ">
                      <table className="quotablle text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="theadqu">
                          <tr>
                            <th scope="col" className="px-2 py-3">
                              Area
                            </th>
                            <th scope="col" className="px-2 py-3">
                              Description
                            </th>
                            <th scope="col" className="px-2 py-3">
                              Qty
                            </th>
                            <th scope="col" className="px-2 py-3">
                              Unit
                            </th>
                            <th scope="col" className="px-2 py-3">
                              Price
                            </th>
                            <th scope="col" className="px-2 py-3">
                              Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {rows3.map((row, index) => (
                            <tr className="bg-white tabletr" key={index}>
                              <td className="px-2 py-4">
                                <input
                                  type="text"
                                  className="appinput2"
                                  value={row.area}
                                  onChange={(e) => {
                                    const newRows = [...rows3];
                                    newRows[index].area = e.target.value;
                                    setRows3(newRows);
                                  }}
                                />
                              </td>

                              <td className="px-2 py-4">
                                <input
                                  type="text"
                                  className="appinput2"
                                  value={row.description}
                                  onChange={(e) => {
                                    const newRows = [...rows3];
                                    newRows[index].description = e.target.value;
                                    setRows3(newRows);
                                  }}
                                />
                              </td>

                              <td className="px-2 py-4">
                                <input
                                  type="text"
                                  className="appinput2"
                                  value={row.qty}
                                  onChange={(e) => {
                                    const newRows = [...rows3];
                                    newRows[index].qty = e.target.value;
                                    setRows3(newRows);
                                  }}
                                />
                              </td>

                              <td className="px-2 py-4">
                                <input
                                  className="appinput2"
                                  type="text"
                                  value={row.unit}
                                  onChange={(e) => {
                                    const newRows = [...rows3];
                                    newRows[index].unit = e.target.value;
                                    setRows3(newRows);
                                  }}
                                />
                              </td>

                              <td className="px-2 py-4">
                                <input
                                  className="appinput2"
                                  type="text"
                                  value={row.price}
                                  onChange={(e) => {
                                    const newRows = [...rows3];
                                    newRows[index].price = e.target.value;
                                    setRows3(newRows);
                                  }}
                                />
                              </td>

                              <td className="px-2 py-4">
                                <input
                                  className="appinput2"
                                  type="text"
                                  value={row.amount}
                                  onChange={(e) => {
                                    const newRows = [...rows3];
                                    newRows[index].amount = e.target.value;
                                    setRows3(newRows);
                                  }}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div onClick={addRow3} className="admorCont cursor-pointer">
                      <img src={plussing} alt="" />
                      <span>Add Item</span>
                    </div>
                  </div>
                )}

                {currentshowindex === 2 && (
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

                    <div class="relative quotabl_wrap">
                      <table className="quotablle3 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="theadqu">
                          <tr>
                            <th scope="col" className="px-2 py-3">
                              Product
                            </th>
                            <th scope="col" className="px-2 py-3">
                              Model
                            </th>
                            <th scope="col" className="px-2 py-3">
                              Brand
                            </th>
                            <th scope="col" className="px-2 py-3">
                              Product Picture
                            </th>
                            <th scope="col" className="px-2 py-3">
                              Unit Price
                            </th>
                            <th scope="col" className="px-2 py-3">
                              Qty
                            </th>
                            <th scope="col" className="px-2 py-3">
                              Total
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {rows4.map((row, index) => (
                            <tr className="bg-white tabletr" key={index}>
                              <td className="px-2 py-4">
                                <input
                                  type="text"
                                  className="appinput2 addwidth"
                                  value={row.product}
                                  onChange={(e) => {
                                    const newRows = [...rows4];
                                    newRows[index].product = e.target.value;
                                    setRows4(newRows);
                                  }}
                                />
                              </td>

                              <td className="px-2 py-4">
                                <input
                                  type="text"
                                  className="appinput2"
                                  value={row.model}
                                  onChange={(e) => {
                                    const newRows = [...rows4];
                                    newRows[index].model = e.target.value;
                                    setRows4(newRows);
                                  }}
                                />
                              </td>

                              <td className="px-2 py-4">
                                <input
                                  type="text"
                                  className="appinput2"
                                  value={row.brand}
                                  onChange={(e) => {
                                    const newRows = [...rows4];
                                    newRows[index].brand = e.target.value;
                                    setRows4(newRows);
                                  }}
                                />
                              </td>

                              <td className="px-2 py-4">
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="appinput2"
                                  onChange={(e) => handleImageUpload(e, index)}
                                />
                              </td>

                              <td className="px-2 py-4">
                                <input
                                  className="appinput2"
                                  type="text"
                                  value={row.unitPrice}
                                  onChange={(e) => {
                                    const newRows = [...rows4];
                                    newRows[index].unitPrice = e.target.value;
                                    setRows4(newRows);
                                  }}
                                />
                              </td>

                              <td className="px-2 py-4">
                                <input
                                  className="appinput2"
                                  type="text"
                                  value={row.qty}
                                  onChange={(e) => {
                                    const newRows = [...rows4];
                                    newRows[index].qty = e.target.value;
                                    setRows4(newRows);
                                  }}
                                />
                              </td>

                              <td className="px-2 py-4">
                                <input
                                  className="appinput2"
                                  type="text"
                                  value={row.total}
                                  onChange={(e) => {
                                    const newRows = [...rows4];
                                    newRows[index].total = e.target.value;
                                    setRows4(newRows);
                                  }}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div onClick={addRow4} className="admorCont cursor-pointer">
                      <img src={plussing} alt="" />
                      <span>Add Item</span>
                    </div>

                    <div className="totalCI_charges">
                      <label htmlFor="">
                        <p>Total</p>
                        <input
                          onChange={textChangeHandler}
                          name="total"
                          value={formdata.total}
                          type="text"
                        />
                      </label>
                      <label htmlFor="">
                        <p>C & I Charges @ 10%</p>
                        <input
                          onChange={textChangeHandler}
                          name="candICharge"
                          value={formdata.candICharge}
                          type="text"
                        />
                      </label>
                      <label htmlFor="">
                        <p>Total Payable amount</p>
                        <input
                          onChange={textChangeHandler}
                          name="totalPayableAmt"
                          value={formdata.totalPayableAmt}
                          type="text"
                        />
                      </label>
                    </div>
                  </div>
                )}

                {currentshowindex === 3 && (
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
                          {rows2.map((row, rowIndex) => (
                            <tr className="bg-white tabletr" key={rowIndex}>
                              <td className="px-2 py-4">
                                <input
                                  type="text"
                                  className="appinput2 addwidth"
                                  value={row.productName}
                                  onChange={(e) => {
                                    const newRows = [...rows2];
                                    newRows[rowIndex].productName =  e.target.value;
                                    setRows2(newRows);
                                  }}
                                />
                              </td>

                              <td className="px-2 py-4 flex ">
                                <div>
                                  {row?.description?.map((desc, descIndex) => (
                                    <div
                                      key={descIndex}
                                      className="flex items-center mb-2"
                                    >
                                      <input
                                        type="text"
                                        className="appinput2"
                                        value={desc}
                                        onChange={(e) =>
                                          handleDescriptionChange(
                                            rowIndex,
                                            descIndex,
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                  ))}
                                </div>

                                <button
                                  type="button"
                                  className="ml-2"
                                  onClick={() => addDescriptionField(rowIndex)}
                                >
                                  Add
                                </button>
                              </td>

                              <td className="px-2 py-4">
                                <input
                                  type="text"
                                  className="appinput2"
                                  value={row.unitPrice}
                                  onChange={(e) => {
                                    const newRows = [...rows2];
                                    newRows[rowIndex].unitPrice = e.target.value;
                                    setRows2(newRows);
                                  }}
                                />
                              </td>

                              <td className="px-2 py-4">
                                <input
                                  type="text"
                                  className="appinput2"
                                  value={row.taxRate}
                                  onChange={(e) => {
                                    const newRows = [...rows2];
                                    newRows[rowIndex].taxRate = e.target.value;
                                    setRows2(newRows);
                                  }}
                                />
                              </td>

                              <td className="px-2 py-4">
                                <input
                                  className="appinput2"
                                  type="text"
                                  value={row.amount}
                                  onChange={(e) => {
                                    const newRows = [...rows2];
                                    newRows[rowIndex].amount = e.target.value;
                                    setRows2(newRows);
                                  }}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div onClick={addRow2} className="admorCont cursor-pointer">
                      <img src={plussing} alt="" />
                      <span>Add Item</span>
                    </div>

                    <div className="totalCI_charges">
                      <label htmlFor="">
                        <p>Sub Total :</p>
                        <input
                          onChange={textChangeHandler}
                          name="subTotal"
                          value={formdata.subTotal}
                          type="text"
                        />
                      </label>

                      <label htmlFor="">
                        <p>Tax : </p>
                        <input
                          onChange={textChangeHandler}
                          name="tax"
                          value={formdata.tax}
                          type="text"
                        />
                      </label>
                      <label htmlFor="">
                        <p>Sercice Tax :</p>
                        <input
                          onChange={textChangeHandler}
                          name="serviceTax"
                          value={formdata.serviceTax}
                          type="text"
                        />
                      </label>
                      <label htmlFor="">
                        <p> Installation :</p>
                        <input
                          onChange={textChangeHandler}
                          name="installation"
                          value={formdata.installation}
                          type="text"
                        />
                      </label>
                      <label htmlFor="">
                        <p> Other :</p>
                        <input
                          onChange={textChangeHandler}
                          name="other"
                          value={formdata.other}
                          type="text"
                        />
                      </label>
                      <label htmlFor="">
                        <p> Transpotation :</p>
                        <input
                          onChange={textChangeHandler}
                          name="transpotation"
                          value={formdata.transpotation}
                          type="text"
                        />
                      </label>

                      <label htmlFor="">
                        <p>Total :</p>
                        <input
                          onChange={textChangeHandler}
                          name="total"
                          value={formdata.total}
                          type="text"
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {preview[0] && (
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
                        <p>
                          As per discussion held, please find attached the
                          quotation for the sound solution for your suggested
                          area premises.
                        </p>
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
                                <tr
                                  className="bg-white quotabletr2 "
                                  key={index}
                                >
                                  <td className="px-2 py-2 prewid1">
                                    {index + 1}{" "}
                                  </td>
                                  <td className="px-2 py-2 prewid2">
                                    {row.application}{" "}
                                  </td>
                                  <td className="px-2 py-2 prewid1">
                                    {row.brand}
                                  </td>
                                  <td className="px-2 py-2 prewid3">
                                    {row.model}
                                  </td>
                                  <td className="px-2 py-2 prewid4">
                                    {row.description}
                                  </td>
                                  <td className="px-2 py-2 prewid1">
                                    {row.qty}
                                  </td>
                                  <td className="px-2 py-2 prewid5">
                                    {row.unitPrice}
                                  </td>
                                  <td className="px-2 py-2 prewid5">
                                    {row.amount}
                                  </td>
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
                        <p>
                          3. All specifications will be followe as per standard
                          practice from companies.
                        </p>
                        <p>
                          4. All warranties for various products to be provided
                          as per OEM policy.
                        </p>
                        <p>5. 100% advance along with PO.</p>
                        <p>6. All payment to be done through cheque/ RTGS</p>
                        <p>7. Quotation validation within 15-days.</p>
                      </div>

                      <p className="quo1_extrapra">
                        Hope you find our quotation in line with your
                        requirement. Looking forward to being a part of your
                        prestigious project.
                      </p>
                      <p className="quo1_extrapra">Regards</p>
                    </div>

                    <hr />

                    <div className="prntBtn">
                      <button
                        onClick={() => handleCancelClick()}
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

              {preview[1] && (
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
                        <p>GSTIN- {formdata.companyGSTIN}</p>
                      </div>

                      <div className="quot2_dear">
                        <p>Dear Sir,</p>
                        <p>
                          As per discussion held, please find attached the
                          quotation for the sound solution for your suggested
                          area premises.
                        </p>
                      </div>

                      <div className="talbeLike">
                        <div class="relative w-full">
                          <p className="aubdisolpara2 text-white">
                            LIGHTING SOLUTION
                          </p>
                          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="quuo2_table_head2">
                              <tr>
                                <th scope="col" className="px-2 py-3 ">
                                  S. No.
                                </th>
                                <th scope="col" className="px-2 py-3">
                                  Area
                                </th>
                                <th scope="col" className="px-2 py-3">
                                  Description
                                </th>
                                <th scope="col" className="px-2 py-3">
                                  Qty
                                </th>
                                <th scope="col" className="px-2 py-3">
                                  Unit
                                </th>
                                <th scope="col" className="px-2 py-3">
                                  Price
                                </th>
                                <th scope="col" className="px-2 py-3">
                                  Amount
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {rows3.map((row, index) => (
                                <tr
                                  className="bg-white quotabletr2 "
                                  key={index}
                                >
                                  <td className="px-2 py-2 prewid1">
                                    {index + 1}{" "}
                                  </td>
                                  <td className="px-2 py-2 prewid2">
                                    {row.area}{" "}
                                  </td>
                                  <td className="px-2 py-2 prewid4">
                                    {row.description}
                                  </td>
                                  <td className="px-2 py-2 prewid1">
                                    {row.qty}
                                  </td>
                                  <td className="px-2 py-2 prewid1">
                                    {row.unit}
                                  </td>
                                  <td className="px-2 py-2 prewid5">
                                    {row.price}
                                  </td>
                                  <td className="px-2 py-2 prewid5">
                                    {row.amount}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="quo1_termandcond">
                        <h4>TERMS & CONDITIONS</h4>
                        <p className="hard_para">
                          Valid period of the above quotation: 15 days
                          Excluded:Supporting frame, Structure, And any civil &
                          electrical work.
                        </p>
                        <p className="hard_para">
                          Included:Installation, Delivery, Module, PowerSupply,
                          & Cable, Receiving & Sending card, Controller,
                          Training,
                        </p>
                        <p className="hard_para">
                          Payment term: 100% down payment, before shipment
                        </p>
                        <p className="hard_para">
                          Installation-Technical Assitance will be provided by
                          us during installation. All outstationCharge of
                          engineer will be bear by client only
                        </p>
                        <p className="hard_para">
                          Warrantly: ONE year warranty (can be extend up to 5
                          years AMC) voltage Stabilizerto be provided by client
                          in case of voltage fluctation A computer,
                        </p>
                        <p>1. GST 18% will be extra as applicable.</p>
                        <p>2. Freight & ITC charges extra as per actual.</p>
                        <p>
                          3. All specifications will be followe as per standard
                          practice from companies.
                        </p>
                        <p>
                          4. All warranties for various products to be provided
                          as per OEM policy.
                        </p>
                        <p>5. 100% advance along with PO.</p>
                        <p>6. All payment to be done through cheque/ RTGS</p>
                        <p>7. Quotation validation within 15-days.</p>
                      </div>

                      <p className="quo1_extrapra">
                        Hope you find our quotation in line with your
                        requirement. Looking forward to being a part of your
                        prestigious project.
                      </p>
                      <p className="quo1_extrapra">Regards</p>
                    </div>

                    <hr />

                    <div className="prntBtn">
                      <button
                        onClick={() => handleCancelClick()}
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

              {preview[2] && (
                <div className="previ_wrap">
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
                        <p>
                          As per discussion held, please find attached the
                          quotation for the sound solution for your suggested
                          area premises.
                        </p>
                      </div>

                      <div className="talbeLike">
                        <div class="relative w-full">
                          <p className="aubdisolpara2 text-white">
                            AUDIO SOLUTION
                          </p>
                          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="quuo2_table_head2">
                              <tr>
                                <th scope="col" className="px-2 py-3 ">
                                  S. No.
                                </th>
                                <th scope="col" className="px-2 py-3">
                                  Product
                                </th>
                                <th scope="col" className="px-2 py-3">
                                  Model
                                </th>
                                <th scope="col" className="px-2 py-3">
                                  Brand
                                </th>
                                <th scope="col" className="px-2 py-3">
                                  Product Picture
                                </th>
                                <th scope="col" className="px-2 py-3">
                                  Unit Price
                                </th>
                                <th scope="col" className="px-2 py-3">
                                  Qty
                                </th>
                                <th scope="col" className="px-2 py-3">
                                  Total
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {rows4.map((row, index) => (
                                <tr
                                  className="bg-white quotabletr2 "
                                  key={index}
                                >
                                  <td className="px-2 py-2 prewid1">
                                    {index + 1}{" "}
                                  </td>
                                  <td className="px-2 py-2 prewid2">
                                    {row.product}{" "}
                                  </td>
                                  <td className="px-2 py-2 prewid4">
                                    {row.model}
                                  </td>
                                  <td className="px-2 py-2 prewid1">
                                    {row.brand}
                                  </td>

                                  <td className="px-2 py-2 prewid1">
                                    {" "}
                                    <img src={row.productPic} alt="" />{" "}
                                  </td>
                                  <td className="px-2 py-2 prewid5">
                                    {row.unitPrice}
                                  </td>
                                  <td className="px-2 py-2 prewid5">
                                    {row.qty}
                                  </td>
                                  <td className="px-2 py-2 prewid5">
                                    {row.total}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>

                          <div className="totalcai_cont">
                            <p>Total: {formdata.total}</p>
                            <p>C & I Charges @ 10%: {formdata.candICharge}</p>
                            <p>
                              Total Payable amount: {formdata.totalPayableAmt}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr />

                    <div className="prntBtn">
                      <button
                        onClick={() => handleCancelClick()}
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

              {preview[3] && (
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
                        <p>
                          As per discussion held, please find attached the
                          quotation for the sound solution for your suggested
                          area premises.
                        </p>
                      </div>

                      <div className="talbeLike">
                        <div class="relative w-full">
                          <p className="aubdisolpara3 text-white">
                            VIDEO SOLUTION
                          </p>
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
                              {rows2.map((row, rowIndex) => (
                                <tr
                                  className="bg-white quotabletr2"
                                  key={rowIndex}
                                >
                                  <td className="px-2 py-2 prewid1">
                                    {rowIndex + 1}
                                  </td>
                                  <td className="px-2 py-2 prewid2">
                                    {row.productName}
                                  </td>
                                  <td className="prewid2  addsomethin1">
                                    {row.description.map((desc, descIndex) => (
                                      <p
                                        className="eachprepara"
                                        key={descIndex}
                                      >
                                        {desc}
                                      </p>
                                    ))}
                                  </td>
                                  <td className="px-2 py-2 prewid4">
                                    {row.unitPrice}
                                  </td>
                                  <td className="px-2 py-2 prewid1">
                                    {row.taxRate}
                                  </td>

                                  <td className="px-2 py-2 prewid5">
                                    {row.amount}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>

                          <div className="totalcai_cont">
                            <p>Sub Total: {formdata.subTotal}</p>
                            <p>Total: {formdata.total}</p>
                            <p>Tax: {formdata.tax}</p>
                            <p>Service Tax: {formdata.serviceTax}</p>
                            <p>Installation: {formdata.installation}</p>
                            <p>Other: {formdata.other}</p>
                            <p>Transpotation: {formdata.transpotation}</p>
                            <p>Total Payable amount: {formdata.total}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr />

                    <div className="prntBtn">
                      <button
                        onClick={() => handleCancelClick()}
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
export default QuotationForm;
