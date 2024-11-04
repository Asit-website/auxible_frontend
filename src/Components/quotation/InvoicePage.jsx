import React,{useRef} from "react";
import AdminNavbar from "../admin/Navbar/AdminNavbar";
import AdminSidebar from "../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../hooks/useMain";
import EmployeeSidebar from "../Employee/Sidebar/EmployeeSidebar";
import EmployeeNavbar from "../Employee/Navbar/EmployeeNavbar";
import { useLocation } from "react-router-dom";
import "./quotation.css";
import kidLogo from "../images/Kds logo (1) 1.png";
import { useReactToPrint } from 'react-to-print'



const InvoicePage = ({ setAlert, pop, setPop }) => {
  const { user } = useMain();

  const user1 = JSON.parse(localStorage.getItem("hrms_user"));

  const location = useLocation();
  const invoiceData = location.state;

  const contonentPDF = useRef();

  const generatePdf = useReactToPrint({
    content: () => contonentPDF.current,
    documentTitle: "Order",
    parentContainer: {
      '@media print': {
        display: 'block'
      },
    },
    onAfterPrint: () => alert("success", "item saved")
  })

  return (
    <>
      <div className="employee-dash h-full">
        {user1?.role === "ADMIN" ? (
          <AdminSidebar pop={pop} setPop={setPop} />
        ) : (
          <EmployeeSidebar pop={pop} setPop={setPop} />
        )}

        <div className="tm">
          {user1?.role === "ADMIN" ? (
            <AdminNavbar user={user} setAlert={setAlert} />
          ) : (
            <EmployeeNavbar user={user} setAlert={setAlert} />
          )}

          <div className="em">
            <div className="invnav">
              <button onClick={generatePdf} className="converToPDf">
                <span>Convert To PDF</span>
              </button>
            </div>

            <div ref={contonentPDF} className="invoform">
              {/* first section  */}
              <div className="inFirstSec">
                {/* left side */}
                <div className="inFirLeft">
                  <img src={kidLogo} className="kidLogo" alt="" />

                  {/* s */}
                  <div className="inLefS">
                    <div className="singLef">
                      <h3>Issue Date :</h3>
                      <p>{new Date(Number(invoiceData?.ts)).toLocaleDateString()}</p>
                    </div>

                    <div className="singLef">
                      <h3>GST NO :</h3>
                      <p>{invoiceData?.GstNo}</p>
                    </div>
                    <div className="singLef">
                      <h3>SAC CODE :</h3>
                      <p>{invoiceData?.SacCode}</p>
                    </div>

                    <div className="singLef">
                      <h3>Place of Supply :</h3>
                      <p>{invoiceData?.PlacedSupply}</p>
                    </div>

                    <div className="singLef">
                      <h3>Currency : USD</h3>
                      <p>Conversion Rate: 80.00</p>
                    </div>
                  </div>

                  {/* t */}
                  <div className="inLefT">
                    <h4>Bill To</h4>
                    <h5>{invoiceData?.BillTo}</h5>

                    <p className="add">{invoiceData?.Address}</p>
                    <p className="num"> {invoiceData?.Mobile}</p>
                    <p className="email">{invoiceData?.Email}</p>
                  </div>
                </div>

                {/* right side */}
                <div className="inFirLeft">
                  <div className="infirleTop">
                    <h2>Invoice</h2>
                    <p className="biLLnO">Bill No: {invoiceData?.BillTo}</p>
                  </div>

                  {/* s */}
                  <div className="inLefS2">
                    <p className="in2lHead">Kushel Digi Solutions</p>

                    <div className="inlef2Total">
                      <p>
                        205 Pankaj Tower mayur vihar phase 1 New Delhi, New
                        Delhi, DL
                      </p>
                      <p>(07) 110091, IN | 919045301702</p>
                      <p>shubham@kusheldigi.com</p>

                      <p>GSTIN: 07BKlPG8876K1 ZG Website: www.kusheldigi.com</p>

                      <p>Contact Name: shubham Gupta</p>
                    </div>
                  </div>

                  {/* t */}
                  <div className="inLefT">
                    <h4>Ship To</h4>

                    <p className="add">{invoiceData?.ShipTo}</p>
                  </div>
                </div>
              </div>

              {/* second section  */}
              <div className="inSecondSec">
                <div class="relative overflow-x-auto tableWrapping">

                  <div className="talbWraNAV">
                    <h2>Payment log</h2>
                  </div>

                  <table class="w-full text-sm text-left tablecont">
                    <thead class=" uppercase ">
                      <tr>
                        <th scope="col" class="px-6 py-3 ">
                          S. No.
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Item Description
                        </th>
                        <th scope="col" class="px-6 py-3">
                          HSN/SAC
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Qty UoM
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Price (₹)
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Amount (₹)
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Amount ($)
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr class="bg-white border-2 border-black  dark:border-gray-700">
                        <td class="px-6 py-4 addingBorder">01</td>
                        <td class="px-6 py-4 addingBorder">
                          {invoiceData?.ItemDescription}
                        </td>
                        <td class="px-6 py-4 addingBorder">{invoiceData?.SacCode}</td>
                        <td class="px-6 py-4 addingBorder">{invoiceData?.Qty}</td>
                        <td class="px-6 py-4 addingBorder" >{invoiceData?.Price}</td>
                        <td class="px-6 py-4 addingBorder">{invoiceData?.Amount}</td>
                        <td class="px-6 py-4 addingBorder">{invoiceData?.Amount}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* third section  */}
              <div className="inThirdSec">
                {/* left  */}
                <div className="inThirLEFT">
                  <div className="inThrPro">
                    <h3>Bank Name :</h3>
                    <p>Axis Bank Ltd</p>
                  </div>

                  <div className="inThrPro">
                    <h3>Account Number :</h3>
                    <p>918020056731833</p>
                  </div>
                  <div className="inThrPro">
                    <h3>Branch Name :</h3>
                    <p>Mayur Vihar Pahse 1</p>
                  </div>

                  <div className="inThrPro">
                    <h3>IFSC Code :</h3>
                    <p>AXISlNBB296</p>
                  </div>

                  <div className="inThrPro">
                    <h3>SWIFT CODE :</h3>
                    <p>AXISlNBB296</p>
                  </div>
                </div>

                {/* right  */}
                <div className="inThirLEFT">
                  <div className="inThrPro">
                    <h3>Total Taxable Value:</h3>
                    <p>₹40,000.00</p>
                  </div>

                  <div className="inThrPro">
                    <h3>Total Value (INR) :</h3>
                    <p>₹40,000</p>
                  </div>
                  <div className="inThrPro">
                    <h3>Total Value (USD) :</h3>
                    <p>$500.00</p>
                  </div>

                  <div className="inThrPro">
                    <h3>Total Value in words (INR) :</h3>
                    <p>₹ Forty Thousand Only </p>
                  </div>

                  <div className="inThrPro">
                    <h3>Total Value in words (USD) :</h3>
                    <p>$ Five Hundred Only</p>
                  </div>
                </div>
              </div>

              {/* foruthr  */}
              <div className="balanceFowrap">
                <div className="balanceCont">
                  <h2>Balance Amount :</h2>
                  <p className="valueBaln">{invoiceData?.BalanceAmount}</p>
                </div>
              </div>

              {/* fivth  */}
              <div className="inFivSec">
                <p className="ccHEad">Comments</p>
                <p className="comAns">
                  Fees Once Paid will not be Refundable, Nor-Transferable and
                  Nor-Extendable. Outside Shoes Not Allowed. Please do Not Bring
                  any Valuables as the Club will not be responsible for any
                  Loss.
                </p>
              </div>

              {/* sixth */}
              <div className="inSixSec">
                <div className="sixCont">
                  <div className="singLine"></div>
                  <p>Provider Signature</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoicePage;
