import React, { useEffect, useRef, useState } from "react";
import EmployeeNavbar from "../Navbar/EmployeeNavbar";
import EmployeeSidebar from "../Sidebar/EmployeeSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import "./myself.css"
import doc from "../../images/docu.png"
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import { useReactToPrint } from "react-to-print";


const MySelf = ({ setAlert, pop1, setPop1 }) => {
   // =================punch in punch out concept==========
   const {
      postActivity,
      getStatisticsByUser,
      getMyOfferLetter

   } = useMain();

   const [user , setUser] = useState();

   const [curenpage , setCurrPage] =useState("Document");
   let user1 = JSON?.parse(localStorage.getItem("hrms_user"));
   let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));
   const {offerLetterPermission} = hrms_user;

   const [offerContent , setOfferContent] =useState(``);
   const [reliveContent , setReliveContent] =useState(``);

   const [experienceContent , setExperienceContent] =useState(``);
   const [internshipContent , setinternshipContent] =useState(``);

   const contonentPDF = useRef();
   const contonentPDF2 = useRef();
   const contonentPDF3 = useRef();
   const contonentPDF4= useRef();


   const generatePdf = useReactToPrint({
      content: () => contonentPDF.current,
      documentTitle: "Quotation",
      parentContainer: {
        "@media print": {
          display: "block",
        },
      },
    });

   const generatePdf2 = useReactToPrint({
      content: () => contonentPDF2.current,
      documentTitle: "Quotation",
      parentContainer: {
        "@media print": {
          display: "block",
        },
      },
    });
   const generatePdf3 = useReactToPrint({
      content: () => contonentPDF3.current,
      documentTitle: "Quotation",
      parentContainer: {
        "@media print": {
          display: "block",
        },
      },
    });
   const generatePdf4 = useReactToPrint({
      content: () => contonentPDF4.current,
      documentTitle: "Quotation",
      parentContainer: {
        "@media print": {
          display: "block",
        },
      },
    });
  

    const getOfferletter = async()=>{
      const ans = await getMyOfferLetter(user1?._id);
       if(ans?.status){
         setOfferContent(ans?.data?.createletter[0]?.content);
         setReliveContent(ans?.data?.relivingLetter[0]?.content);
         setExperienceContent(ans?.data?.expeletter[0]?.content);
         setinternshipContent(ans?.data?.internLetter[0]?.content);
       }
    }

 useEffect(()=>{
   setUser(hrms_user);
   if(offerLetterPermission){
      getOfferletter();
   }
 },[]);

 useEffect(() => {
   const removeYellowBackground = (content) => {
     // Use a regular expression to remove the background: yellow; style
     return content?.replace(/background:\s*yellow\s*;?/gi, '');
   };

   if (offerContent) {
     setOfferContent(removeYellowBackground(offerContent));
   }

   if (reliveContent) {
     setReliveContent(removeYellowBackground(reliveContent));
   }

   if (experienceContent) {
     setExperienceContent(removeYellowBackground(experienceContent));
   }
 }, [offerContent, reliveContent, experienceContent]);

   return (
      <>
         <div className="employee-dash h-full">
            {
               user1?.role === "ADMIN" ?
                  <AdminSidebar />
                  :
                  <EmployeeSidebar />
            }
            <div className="tm">
               <EmployeeNavbar
                  user={user}
                  setAlert={setAlert}
                  postActivity={postActivity}
                  getStatisticsByUser={getStatisticsByUser}
                  pop1={pop1}
                  setPop1={setPop1}
               />

               <div className="em manem">

                  <nav className="myselfNav">

                     
                     <h2>My self</h2>

                     <select value={curenpage} onChange={(e)=>setCurrPage(e.target.value)} name="" id="">
                        <option value="Document">Document</option>
                        <option value="Offer Letter">Offer Letter</option>
                        <option value="Relieving Letter">Relieving Letter</option>
                        <option value="Experience Letter">Experience Letter</option>
                        <option value="Internship Letter">Internship Letter</option>
                     </select>

                  </nav>


 {
   curenpage === 'Document' && 
 
   <>
   
            <div className="myselfFirst">


                     <h3>Employee Detail</h3>

                     <hr />

                     <div className="allFristDe3tail">

                        <div className="singfirst">
                           <p>Employee ID :</p>
                           <span>{user1?.employeeCode}</span>
                        </div>

                        <div className="singfirst">
                           <p>Name :</p>
                           <span>{user1?.fullName}</span>
                        </div>

                        <div className="singfirst">
                           <p>Department :</p>
                           <span>{user1?.department}</span>
                        </div>

                        <div className="singfirst">
                           <p>Designation :</p>
                           <span>{user1?.designation}</span>
                        </div>

                        <div className="singfirst">
                           <p>Date of Joining :</p>
                           <span>{user1?.joiningDate}</span>
                        </div>

                        <div className="singfirst">
                           <p>Office Email :</p>
                           <span>{user1?.email}</span>
                        </div>

                     </div>

                  </div>

                  <div className="myselfFirst">


                     <h3>Other Detail</h3>

                     <hr />

                     <div className="allFristDe3tail">

                        <div className="singfirst">
                           <p>Address :</p>
                           <span>{user1?.currentAddress}</span>
                        </div>

                        <div className="singfirst">
                           <p>Mobile :</p>
                           <span>{user1?.mobile}</span>
                        </div>

                        <div className="singfirst">
                           <p>Personal ID :</p>
                           <span>{user1?.email1}</span>
                        </div>

                        <div className="singfirst">
                           <p>Gender :</p>
                           <span>{user1?.gender}</span>
                        </div>

                        <div className="singfirst">
                           <p>Pan Number :</p>
                           <span>{user1?.pan}</span>
                        </div>

                        <div className="singfirst">
                           <p>Adhar Number :</p>
                           <span>{user1?.adhar}</span>
                        </div>

                        <div className="singfirst">
                           <p>Father Name :</p>
                           <span>{user1?.father}</span>
                        </div>

                        <div className="singfirst">
                           <p>Current  Address :</p>
                           <span>{user1?.currentAddress}</span>
                        </div>

                        <div className="singfirst">
                           <p>Current State :</p>
                           <span>{user1?.currentState}</span>
                        </div>

                        <div className="singfirst">
                           <p>Current City :</p>
                           <span>{user1?.currentCity}</span>
                        </div>

                        <div className="singfirst">
                           <p>Area Pincode :</p>
                           <span>{user1?.currentPin}</span>
                        </div>

                        <div className="singfirst">
                           <p>Permanent Address :</p>
                           <span>{user1?.residence}</span>
                        </div>

                        <div className="singfirst">
                           <p>Permanent State :</p>
                           <span>{user1?.perState}</span>
                        </div>

                        <div className="singfirst">
                           <p>Permanent City :</p>
                           <span>{user1?.perCity}</span>
                        </div>

                        <div className="singfirst">
                           <p>Permanent Pin :</p>
                           <span>{user1?.perPin}</span>
                        </div>

                        <div className="singfirst">
                           <p>Marital status :</p>
                           <span>{user1?.Martial}</span>
                        </div>

                        <div className="singfirst">
                           <p>Nationality :</p>
                           <span>{user1?.nationality}</span>
                        </div>

                        <div className="singfirst">
                           <p>Mother name :</p>
                           <span>{user1?.Mother}</span>
                        </div>



                     </div>

                  </div>

                  <div className="myselfFirst">


                     <h3>Document Upload</h3>

                     <hr />

                     <div className="allFristDe3tail2">

                        {
                           user1?.document?.map((item, index) => (
                              <div className="singleDoc" key={index}>

                                 {/* left */}
                                 <div className="sidocLeft">

                                  <a target="_blank" href={`${item?.url}`}><img src={doc} alt="" /></a> 

                                    <div className="ffwrap">
                                     <a target="_blank" href={`${item?.url}`}><p className="ff"> {item.name === "twevelCert" ?"twelveth Certificate" : item?.name ==="tenCert" ?"Tenth Certicate" : item?.name }</p></a>
                                      <a target="_blank" href={`${item?.url}`}> <p className="dd">{(item?.url).slice(50,80)}</p></a>
                                    </div>

                                 </div>

                                 {/* right  */}
                                 {/* <p className="singDocRight">{new Date().now()}</p> */}

                              </div>
                           ))
                        }


                     </div>

                  </div>

                  <div className="myselfFirst">


                     <h3>Bank Account Detail</h3>

                     <hr />

                     <div className="allFristDe3tail">

                        <div className="singfirst">
                           <p>Salary Pay Mode</p>
                           <span>{user1?.SalaryPay}</span>
                        </div>

                        <div className="singfirst">
                           <p>Account No :</p>
                           <span>{user1?.AccountNumber}</span>
                        </div>

                        <div className="singfirst">
                           <p> Bank Name :</p>
                           <span>{user1?.SalaryBankName}</span>
                        </div>

                        <div className="singfirst">
                           <p>Beneficiary Name :</p>
                           <span>{user1?.BeneficiaryName}</span>
                        </div>

                        <div className="singfirst">
                           <p>Branch Ifsc Code :</p>
                           <span>{user1?.BankIfsc}</span>
                        </div>
                        <div className="singfirst">
                           <p>Bank Branch Name :</p>
                           <span>{user1?.Branch}</span>
                        </div>
                     </div>

                  </div>

                  </>

                     }


                     {
               curenpage ==="Offer Letter" && 
               <div className="showoffercont">
               <h2>OFFER LETTER</h2>

             <div ref={contonentPDF} className="font-wrapper p-4">
             <div className="addfont" dangerouslySetInnerHTML={{ __html: offerContent }} />

           
             </div>

             <div className="prntBtn">
                  <button  onClick={() => generatePdf()} >
                    <span>Print</span>
                  </button>
                </div>

             </div>
                     }
                     {
               curenpage ==="Relieving Letter" && 
               <div className="showoffercont">
               <h2>RELIEVING LETTER</h2>

             <div ref={contonentPDF2} className=" p-4">
             <div dangerouslySetInnerHTML={{ __html: reliveContent }} />
             </div>

             <div className="prntBtn">
                  <button  onClick={() => generatePdf2()} >
                    <span>Print</span>
                  </button>
                </div>


             </div>
                     }

                     {

               curenpage ==="Experience Letter" && 
               <div className="showoffercont">
               <h2>EXPERIENCE LETTER</h2>

             <div ref={contonentPDF3} className="p-4">
             <div dangerouslySetInnerHTML={{ __html: experienceContent }} />
             </div>

             <div className="prntBtn">
                  <button  onClick={() => generatePdf3()} >
                    <span>Print</span>
                  </button>
                </div>


             </div>
                     }

{

curenpage ==="Internship Letter" && 
<div className="showoffercont">
<h2>INTERNSHIP LETTER</h2>

<div ref={contonentPDF4} className="p-4">
<div dangerouslySetInnerHTML={{ __html: internshipContent }} />
</div>

<div className="prntBtn">
   <button  onClick={() => generatePdf4()} >
     <span>Print</span>
   </button>
 </div>


</div>
      }

               </div>



            </div>
         </div>
      </>
   );
};

export default MySelf;
