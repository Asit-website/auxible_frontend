import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import "./HRMsystem.css";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";
import "./quote.css";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const data = `<h2 style="margin-right: 0in; margin-left: 0in; font-family: &quot;Times New Roman&quot;, serif; text-align: justify; font-size: 24px;"><span style="font-family: Calibri, sans-serif; color: black; background: white;">Introduction</span><br></h2><p><br></p><p class="MsoNormal" style="margin: 0in 0in 20px; font-family: Calibri, sans-serif; font-size: 15px;"><span style="font-size: 19px;"><span>&nbsp;</span><span style="color: black; background: white;">Dear Sir</span></span></p><p class="MsoNormal" style="margin: 0in 0in 20px; font-family: Calibri, sans-serif; font-size: 15px;"><span style="color: black; background: white; font-size: 19px;">On behalf of the entire team here at
        Kushel Digi, I would like to thank you for the opportunity to earn your
        business as your provider of .<br><br><br></span></p><p class="MsoNormal" style="margin: 0in; font-family: Calibri, sans-serif; font-size: 15px;"><strong><span lang="EN-IN" style="color: black; font-size: 24px;">Current Situation<br><br><br><br></span></strong></p><p class="MsoNormal" style="margin: 0in 0in 20px; font-family: Calibri, sans-serif; font-size: 15px;"><strong><span lang="EN-IN" style="color: black; font-size: 24px;">Project Overview&nbsp;</span></strong><br><br><br></p><h2 style="margin-right: 0in; margin-left: 0in; font-family: &quot;Times New Roman&quot;, serif; text-align: justify; font-size: 24px;"><span style="font-family: Calibri, sans-serif; color: black; background: white;">Your website</span><br></h2><p><br></p><h2 style="margin-right: 0in; margin-left: 0in; font-family: &quot;Times New Roman&quot;, serif; text-align: justify; font-size: 24px;"><span lang="EN-IN" style="font-family: Calibri, sans-serif; color: black; font-weight: normal; font-size: 19px;">After having discussion with you at length regarding your
        needs, we have developed a shared vision for your website that we feel will
        greatly build your overall brand and boost new customer acquisition.</span><br><br>
</h2><table style="border-collapse:collapse;width: 100%;"><tbody>
<tr>
	<td style="width: 16.4969%; text-align: center;"><strong>Phase</strong></td>
	<td style="width: 49.8982%; text-align: center;"><strong>Activity</strong></td>
	<td style="width: 33.3333%;"><strong>Time Frame</strong></td></tr>
<tr>
	<td style="text-align: center;">1</td>
	<td><br></td>
	<td style="width: 33.3333%;"><br></td></tr>
<tr>
	<td style="text-align: center;">2</td>
	<td><br></td>
	<td style="width: 33.3333%;"><br></td></tr>
<tr>
	<td style="text-align: center;">3</td>
	<td><br></td>
	<td style="width: 33.3333%;"><br></td></tr></tbody></table><p><br></p><p><br></p><p class="MsoNormal" style="margin: 0in; font-family: Calibri, sans-serif; font-size: 15px;"><strong><span style="font-family: Arial, sans-serif; font-size: 19px;">Infrastructure:</span></strong><br><br></p><p class="MsoNormal" style="margin: 0in; font-family: Calibri, sans-serif; font-size: 15px;"><span style="font-size: 19px;">Frontend
        Website : <br>
        BACKEND : </span></p>

<p class="MsoNormal" style="margin: 0in; font-family: Calibri, sans-serif; font-size: 15px;"><span style="font-size: 19px;">App
        :React:&nbsp;<br>
        Database : <br>
        UI :  <br>
        Graphics : <br>
        Web based Admin : <br><br><br></span></p><p class="MsoNormal" style="margin: 0in; font-family: Calibri, sans-serif; font-size: 15px;"><strong><span style="font-family: Arial, sans-serif; font-size: 24px;"><br>
            <br>
            <br>
            Our Action Plan :</span></strong><br><br><br><br><br></p><h2 style="margin-right: 0in; margin-left: 0in; font-family: &quot;Times New Roman&quot;, serif; text-align: justify; font-size: 24px;"><span style="font-family: Calibri, sans-serif; color: black; background: white;">Our Development Process</span></h2>

<h2 style="margin-right: 0in; margin-left: 0in; font-family: &quot;Times New Roman&quot;, serif; text-align: justify; font-size: 24px;"><span style="font-family: Calibri, sans-serif; color: black; background: white; font-weight: normal; font-size: 19px;">We take a structured
        approach to </span><span style="font-family: Calibri, sans-serif; background: white; font-weight: normal; font-size: 19px;">website<span style="color: black;">
            design. Our development process was created to ensure every project is
            delivered on-time and on-budget. Once your web design project kicks off, here's
            what to expect:</span></span></h2>

<p class="MsoNormal" style="margin: 0.25in 0in 0in; font-family: Calibri, sans-serif; text-align: justify; font-size: 15px;"><strong><span style="color: black; background: white; font-size: 19px;">Initial Planning -</span></strong><span style="color: black; background: white; font-size: 19px;"> The first order of
        business is to sit down with you and create a detailed set of design and
        technical specifications. These specifications serve as a roadmap for the rest
        of the web design process</span></p>

<p class="MsoNormal" style="margin: 0.25in 0in 0in; font-family: Calibri, sans-serif; text-align: justify; font-size: 15px;"><strong><span style="color: black; background: white; font-size: 19px;">Wire framing -</span></strong><span style="color: black; background: white; font-size: 19px;"> Wireframes are your
        first chance to visualize your </span><span style="background: white; font-size: 19px;">site</span><span style="color: black; background: white; font-size: 19px;">. While they're not nearly as detailed as the final site will be, they
        give us a visual representation of the site's overall layout.</span></p>

<p class="MsoNormal" style="margin: 0.25in 0in 0in; font-family: Calibri, sans-serif; text-align: justify; font-size: 15px;"><strong><span style="color: black; background: white; font-size: 19px;">Mockups -</span></strong><span style="color: black; background: white; font-size: 19px;"> Once all site
        mockups are completed and approved, we'll proceed with site mockups. These add
        color and a bit more detail to the initial wireframes, giving us a stronger
        visual representation of the final product.</span></p>

<p class="MsoNormal" style="margin: 0.25in 0in 0in; font-family: Calibri, sans-serif; text-align: justify; font-size: 15px;"><strong><span style="color: black; background: white; font-size: 19px;">Copy &amp;Graphics -</span></strong><span style="color: black; background: white; font-size: 19px;"> Once we've agreed on
        a final design based on the mockups, our team will proceed with development,
        kicking off two phases in unison. The first involves creating your site's </span><span style="background: white; font-size: 19px;">wire frame design</span><span style="color: black; background: white; font-size: 19px;"> and graphics. Our
        team will get to work performing SEO and competitive research and come up with
        the copy and images that will flesh out your final site.</span></p>

<p class="MsoNormal" style="margin: 0.25in 0in 0in; font-family: Calibri, sans-serif; text-align: justify; font-size: 15px;"><strong><span style="color: black; background: white; font-size: 19px;">Development -</span></strong><span style="color: black; background: white; font-size: 19px;"> At the same time,
        we'll kick off the technical side of the design process. This will include
        deploying your website, creating your theme and page designs, and setting up
        your website's analytics.</span></p>

<p class="MsoNormal" style="margin: 0.25in 0in 0in; font-family: Calibri, sans-serif; text-align: justify; font-size: 15px;"><strong><span style="color: black; background: white; font-size: 19px;">Testing -</span></strong><span style="color: black; background: white; font-size: 19px;"> Once our writers,
        designers, and developers have finished their work, our Quality Assurance team
        will get to work testing your site's performance and reliability. We'll use
        various tools to benchmark your site for loading, responsiveness, and speed,
        while also ensuring that it works reliably on all web browsers and mobile
        devices.</span></p>

<p class="MsoNormal" style="margin: 0.25in 0in 0in; font-family: Calibri, sans-serif; text-align: justify; font-size: 15px;"><strong><span style="color: black; background: white; font-size: 19px;">Deployment
            &amp;Optimization -</span></strong><span style="color: black; background: white; font-size: 19px;"> Once we're sure that your site is ready to be released to the public,
        we'll deploy it on your public domain. Then, we'll shift into a monthly support
        process that will continue for 1 months. During that period, we'll create
        monthly backups of your site, update scripts and plugins to maintain security
        and reliability, and perform layout and content updates at your request.<br><br><br></span></p>

<p class="MsoNormal" style="margin: 0in; font-family: Calibri, sans-serif; text-align: justify; font-size: 15px;"><strong><span style="color: black; background: white; font-size: 24px;">Cost Estimate</span></strong></p><p class="MsoNormal" style="margin: 0in; font-family: Calibri, sans-serif; text-align: justify; font-size: 15px;"><strong><span style="color: black; background: white; font-size: 24px;"><br></span></strong></p><br><table style="border-collapse: collapse; width: 100%; height: 251px;"><tbody>
<tr>
	<td style="width: 33.3333%;"><strong>COST HEAD</strong></td>
	<td style="width: 33.3333%;"><strong>NATURE OF CHARGE</strong></td>
	<td style="width: 33.3333%;"><strong>AMOUNT(IN INR)</strong></td></tr>
<tr>
	<td style="width: 33.3333%; "><br></td>
	<td style="width: 33.3333%;">One-Time</td>
	<td style="width: 33.3333%;"><br></td></tr>
<tr>
	<td style="width: 33.3333%;"><br></td>
	<td style="width: 33.3333%;">One-Time</td>
	<td style="width: 33.3333%;"><br></td></tr>
<tr>
	<td style="width: 33.3333%;"><br></td>
	<td style="width: 33.3333%;">One-Time</td>
	<td style="width: 33.3333%;"><div>

    
(Part of development effort )</div><br></td></tr>
<tr>
	<td style="width: 33.3333%;">SSL</td>
	<td style="width: 33.3333%;">Yearly</td>
	<td style="width: 33.3333%;">client with provide</td></tr>
<tr>
	<td style="width: 33.3333%;">Web-Hosting</td>
	<td style="width: 33.3333%;">Yearly</td>
	<td style="width: 33.3333%;">client with provide</td></tr><tr>
	<td style="width: 33.3333%;">In words: Rs Only/-</td>
	<td style="width: 33.3333%;">One-Time</td>
	<td style="width: 33.3333%; text-align: center;"><strong>+18%GST</strong></td></tr></tbody></table><p class="MsoNormal" style="margin: 0.25in 0in 0in; font-family: Calibri, sans-serif; text-align: justify; font-size: 15px;"><strong><span style="color: black; background: white; font-size: 24px;">Payment Schedule</span></strong><br><br><br></p><p class="MsoNormal" style="margin: 0in; font-family: Calibri, sans-serif; font-size: 15px;"><strong><span style="color: black; background: white; font-size: 24px;">Requirements</span></strong><br><br><br></p><p class="MsoNormal" style="margin: 0in; font-family: Calibri, sans-serif; font-size: 15px;"><strong><span style="color: black; background: white; font-size: 24px;">Process Forward</span></strong></p>

<p class="MsoNormal" style="margin: 0in; font-family: Calibri, sans-serif; font-size: 15px;"><strong><span style="color: black; background: white; font-size: 24px;">&nbsp;</span></strong><br></p>

<p class="MsoNormal" style="margin: 0in 0in 0in 0.5in; font-family: Calibri, sans-serif; text-align: justify; text-indent: -0.25in; font-size: 15px;"><span style="font-family: &quot;Noto Sans Symbols&quot;; color: black; background: white; font-size: 19px;"><span>●<span style="font: 9px &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span></span></span><span style="color: black; background: white; font-size: 19px;">Finalization of terms of development</span></p>

<p class="MsoNormal" style="margin: 0in 0in 0in 0.5in; font-family: Calibri, sans-serif; text-align: justify; text-indent: -0.25in; font-size: 15px;"><span style="font-family: &quot;Noto Sans Symbols&quot;; color: black; background: white; font-size: 19px;"><span>●<span style="font: 9px &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span></span></span><span style="color: black; background: white; font-size: 19px;">Project Agreement for Digital Signature</span></p>

<p class="MsoNormal" style="margin: 0in 0in 0in 0.5in; font-family: Calibri, sans-serif; text-align: justify; text-indent: -0.25in; font-size: 15px;"><span style="font-family: &quot;Noto Sans Symbols&quot;; color: black; background: white; font-size: 19px;"><span>●<span style="font: 9px &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span></span></span><span style="color: black; background: white; font-size: 19px;">Advance Payment</span></p>

<p class="MsoNormal" style="margin: 0in 0in 0in 0.5in; font-family: Calibri, sans-serif; text-align: justify; text-indent: -0.25in; font-size: 15px;"><span style="font-family: &quot;Noto Sans Symbols&quot;; color: black; background: white; font-size: 19px;"><span>●<span style="font: 9px &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span></span></span><span style="color: black; background: white; font-size: 19px;">Commencement of Development Process</span></p>

<p class="MsoNormal" style="margin: 0in 0in 0in 0.5in; font-family: Calibri, sans-serif; text-align: justify; text-indent: -0.25in; font-size: 15px;"><span style="font-family: &quot;Noto Sans Symbols&quot;; color: black; background: white; font-size: 19px;"><span>●<span style="font: 9px &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span></span></span><span style="color: black; background: white; font-size: 19px;">Milestone Update</span></p>

<p class="MsoNormal" style="font-family: Calibri, sans-serif; margin: 7px 23px 0px 8px; line-height: 112%; font-size: 15px;"><span style="line-height: 112%; color: black; background: white; font-size: 19px;">We hope this will be helpful to understand our process and our plan for
        your website. We intend to build a creative, thoughtful, and modern website
        which your customers will love to use and increase your brand value,
        credibility, and sales. We look forward to providing you with a smooth
        development process and constant web support.</span></p><p class="MsoNormal" style="font-family: Calibri, sans-serif; margin: 7px 23px 0px 8px; line-height: 112%; font-size: 15px;"><span style="line-height: 112%; color: black; background: white; font-size: 19px;"><br></span></p>

<h2 style="margin-right: 0in; margin-left: 0in; font-family: &quot;Times New Roman&quot;, serif; text-align: justify; font-size: 24px;"><span style="font-family: Calibri, sans-serif; color: black; background: white; font-size: 19px;"><span>&nbsp;</span>Thanks &amp; Regards </span></h2><p><br></p>

<p class="MsoNormal" style="font-family: Calibri, sans-serif; margin: 0in 23px 0px 8px; line-height: 112%; font-size: 15px;"><strong><span style="line-height: 112%; color: black; background: white; font-size: 19px;">Shubham Gupta</span></strong></p>

<p class="MsoNormal" style="font-family: Calibri, sans-serif; margin: 0in 23px 0px 8px; line-height: 112%; font-size: 15px;"><span style="line-height: 112%; color: black; background: white; font-size: 19px;">Managing Director </span></p>

<p class="MsoNormal" style="font-family: Calibri, sans-serif; margin: 0in 23px 0px 8px; line-height: 112%; font-size: 15px;"><span style="line-height: 112%; color: black; background: white; font-size: 19px;">Kushel Digi Solutions </span></p>

<p class="MsoNormal" style="font-family: Calibri, sans-serif; margin: 0in 23px 0px 8px; line-height: 112%; font-size: 15px;"><span style="line-height: 112%; color: black; background: white; font-size: 19px;">G-9 First Floor, Sector 63, Noida, India</span></p>

<p class="MsoNormal" style="font-family: Calibri, sans-serif; margin: 0in 23px 0px 8px; line-height: 112%; font-size: 15px;"><span style="line-height: 112%; color: black; background: white; font-size: 19px;">Email: </span><a href="mailto:shubham@kusheldigi.com" style="color: blue; text-decoration: underline;"><span style="line-height: 112%; background: white; font-size: 19px;">shubham@kusheldigi.com</span></a></p>

<p class="MsoNormal" style="font-family: Calibri, sans-serif; margin: 0in 23px 0px 8px; line-height: 112%; font-size: 15px;"><span style="line-height: 112%; color: black; background: white; font-size: 19px;">Phone: +91 </span><span style="line-height: 112%; font-size: 19px;">9045301702</span></p>`

const config = {
    readonly: false, 
  };
const ProposalForm = ({ setAlert, pop, setPop }) => {
  const {
    user,
    postProposalFormApi,
    updatePropsalFormApi
  } = useMain();

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const location = useLocation();

    const { id  , item} = location.state;

  const [formdata, setFormdata] = useState({ 
    proposalFor: "",
    preparedFor: "",
    createdBy: "",
    Date: "",
  });

  const textChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const editor = useRef(null);

  const [content, setContent] = useState(data);

  const { role } = hrms_user;

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

  const postPropsalForm = async()=>{
    const toastId = toast.loading("Loading...");

     const ans = await postProposalFormApi({...formdata  , userId:hrms_user?._id , leadId:id , content});
     console.log("ans ",ans);
     
 if(ans?.status){
   toast.success("Successfuly created");
  setFormdata({
    proposalFor: "",
    preparedFor: "",
    createdBy: "",
    Date: "",
  })


  setContent(data);

 }
    toast.dismiss(toastId);

  }

  const updatePropsalForm = async()=>{
    const toastId = toast.loading("Loading...");

     const ans = await updatePropsalFormApi({...formdata  , userId:hrms_user?._id , leadId:id , content , id:item?._id});
     
 if(ans?.status){
   toast.success("Successfuly updated");
  setFormdata({
    proposalFor: "",
    preparedFor: "",
    createdBy: "",
    Date: "",
  })

  setContent(data);

 }
    toast.dismiss(toastId);

  }
  
  useEffect(()=>{
    if(item){

       const {   proposalFor , 
        preparedFor,
        createdBy,
        Date, } = item;
        setFormdata({ proposalFor , 
            preparedFor,
            createdBy,
            Date, });

    }
  },[])

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
              {/* lefft side  */}

              <div className="qutaLeft">
                <div className="qutLTo">
                  <h2>Proposal Form</h2>
                </div>

                <div className="allwhitebg">

                  <form className="qtoform">

                    <label>
                      <p>Proposal For</p>
                      <input
                        value={formdata.proposalFor}
                        name="proposalFor"
                        onChange={textChangeHandler}
                        type="text"
                        placeholder=""
                      />
                    </label>

                    <label>
                      <p>Prepared For</p>
                      <input
                        value={formdata.preparedFor}
                        name="preparedFor"
                        onChange={textChangeHandler}
                        type="text"
                        placeholder=""
                      />
                    </label>

                    <label>
                      <p>Created by:</p>
                      <input
                        value={formdata.createdBy}
                        name="createdBy"
                        onChange={textChangeHandler}
                        type="text"
                        placeholder=""
                      />
                    </label>

                    <label>
                      <p>Date </p>
                      <input
                        value={formdata.Date}
                        name="Date"
                        onChange={textChangeHandler}
                        type="date"
                      />
                    </label>

                  </form>     

                  <div className="docuThird">
                    <h3>Format</h3>

                    <hr />

                    <JoditEditor
                      ref={editor}
                      value={content}
                      config={config}
                      tabIndex={1}
                      onBlur={(newContent) => setContent(newContent)}
                      onChange={(newContent) => {
                        setContent(newContent);
                      }}
                    />
                  </div>

               
                </div>
              </div>

              {/* right side  */}
              <div className="qutaRight">

                <div ref={contonentPDF} className="qutaRightcont">
                  <div className="hdquot">
                    <p>A Proposal for {formdata?.proposalFor}</p>
                  </div>


                  <div className="promtopde">

                    <label>
                      <h4>Prepared For:</h4>
                      <p>{formdata?.preparedFor}</p>
                    </label>
                    <label>
                      <h4>Created by:</h4>
                      <p>{formdata?.createdBy}</p>
                    </label>
                    <label>
                      <h4>Date :</h4>
                      <p>{formdata?.Date}</p>
                    </label>

                    <label>
                      <h4> Kushel Digi Solutions</h4>
                      <p> shubham@kusheldigi.com</p>
                      <p>www.kusheldigi.com </p>
                     <p> +91 9045301702 </p>
                    </label>

                  </div>

                  <div className="userApp">
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                  </div>


          

                </div>

                <hr />

                <div className="prntBtn">
                  <button
                    onClick={() => {
              
                           if(item){
                            updatePropsalForm();
                            }
                            else {
                              postPropsalForm();
                            }
                            generatePdf();
                      
                    }}
                  >
                    <span>Print</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProposalForm;
