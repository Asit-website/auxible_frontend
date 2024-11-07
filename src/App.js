import { useEffect, useState } from "react";
import "./App.css";
import Auth from "./Components/auth/Auth.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgetPassword from "./Components/auth/ForgetPassword";
import ForgetPassword1 from "./Components/auth/ForgetPassword1";
import MainState from "./context/MainState";
import Alert from "./Components/Alert/Alert";
import PrivateRoute from "./privateRoute/PrivateRoute";
import HrDashboard from "./Components/Hr/Dashboard/HrDashboard";
import AdminDash from "./Components/admin/Dashboard/AdminDash";
import ForgetPassword2 from "./Components/auth/ForgetPassword2";
import Home from "./Components/Home";
import EmployeeManage from "./Components/admin/EmployeeManage/EmployeeManage";
import Request from "./Components/Employee/Request/Request";
import UpdateProfile from "./Components/Employee/Profile/UpdateProfile";
import AdminProfile from "./Components/admin/AdminProfile/AdminProfile";
import HrManage from "./Components/admin/HrManage/HrManage";
import EmployeeManageByHr from "./Components/Hr/EmployeeManageHr/EmployeeManageByHr";
import ShowEmployee from "./Components/Hr/ShownEmployee.js/ShowEmployee";
import ShowEmployee1 from "./Components/Hr/ShownEmployee.js/ShowEmployee1";
import UpdateProfileHr from "./Components/Hr/UpdateProfileHr/UpdateProfileHr";
import AttendenceCalendar from "./Components/Employee/Request/AttendenceCalendar";
import Payroll from "./Components/Hr/Payroll/Payroll";
import ProfileManagement from "./Components/admin/ProfileManagement/ProfileManagement";
import HrAttendence from "./Components/Hr/HrAttendence/HrAttendence";
import HolidayHRM from "./Components/admin/EmployeeHRM/HolidayHRM";
import EmployeeHRM from "./Components/admin/EmployeeHRM/EmployeeHRM";
import TotalEmployee from "./Components/admin/EmployeeHRM/TotalEmployee";
import LeaveEmployee from "./Components/admin/EmployeeHRM/LeaveEmployee";
import ActiveEmplyee from "./Components/admin/EmployeeHRM/ActiveEmplyee";
import LeaveRequest from "./Components/admin/EmployeeHRM/LeaveRequest";
import CreateEmployee from "./Components/admin/EmployManagement/CreateEmploy";
import EmployeeManagement from "./Components/admin/EmployManagement/EmployeeManagement";
import EmployeeManagementID from "./Components/admin/EmployManagement/EmployeeManagementID";
import HRMsystemSetup from "./Components/admin/EmployManagement/HRMsystemSetup";
import AwardHRM from "./Components/admin/EmployeeHRM/AwardHRM";
import TransferHRM from "./Components/admin/EmployeeHRM/TransferHRM";
import ResignationHRM from "./Components/admin/EmployeeHRM/ResignationHRM";
import PromotionHRM from "./Components/admin/EmployeeHRM/PromotionHRM";
import ComplaintsHRM from "./Components/admin/EmployeeHRM/ComplaintsHRM";
import WarningHRM from "./Components/admin/EmployeeHRM/WarningHRM";
import TerminationHRM from "./Components/admin/EmployeeHRM/TerminationHRM";
import TrainingList from "./Components/admin/EmployeeHRM/TrainingList";
import TrainerHRM from "./Components/admin/EmployeeHRM/TrainerHRM";
import DocumentSetup from "./Components/admin/EmployeeHRM/DocumentSetup";
import MarkAttendance from "./Components/admin/EmployeeHRM/MarkAttendence";
import AdminAnnoncement from "./Components/admin/Announcement/AdminAnnoncement"
import Indicator from "./Components/admin/Performance/Indicator";
import Appraisal from "./Components/admin/Performance/Appraisal";
import GoalTracking from "./Components/admin/Performance/GoalTracking";
import Assets from "./Components/admin/Performance/Assets";
import Notification from "./Components/admin/Notification/Notification";
import Notification2 from "./Components/admin/Notification/Notification2";
import EmployeAttendence from "./Components/admin/EmployeeHRM/EmployeAttendence";
import Trip from "./Components/admin/EmployeeHRM/Trip";
import LeadDash from "./Components/admin/LeadManagement/LeadDash.jsx";
import MyLead from "./Components/admin/LeadManagement/MyLead.jsx";
import UserLead from "./Components/admin/LeadManagement/UserLead.jsx";
import CreateLead from "./Components/admin/LeadManagement/CreateLead.jsx";
import ImportLead from "./Components/admin/LeadManagement/ImportLead.jsx";
import LeadFile from "./Components/admin/LeadManagement/LeadFile.jsx";
import EditLead from "./Components/admin/LeadManagement/EditLead.jsx";
import LeadDash2 from "./Components/admin/LeadManagement/LeadDash2.jsx";
import MyLead2 from "./Components/admin/LeadManagement/MyLead2.jsx";
import CreateLead2 from "./Components/admin/LeadManagement/CreateLead2.jsx";
import EditLead2 from "./Components/admin/LeadManagement/EditLead2.jsx";
import ImportLead2 from "./Components/admin/LeadManagement/ImportLead2.jsx";
import LeadFile2 from "./Components/admin/LeadManagement/LeadFile2.jsx";
import AddEmployee from "./Components/admin/EmployManagement/AddEmployee.jsx";
import MySelf from "./Components/Employee/MySelf/MySelf.jsx";
import CreateQuotation from "./Components/quotation/CreateQuotation.jsx";
import EditQuotation from "./Components/quotation/EditQuotation.jsx";
import InvoicePage from "./Components/quotation/InvoicePage.jsx";
import HrAttendence1 from "./Components/Hr/attendence/HrAttendence1.jsx";
import Notification3 from "./Components/admin/Notification/Notification3.jsx";
import Notification4 from "./Components/admin/Notification/Notification4.jsx";
import EmployeeSelf from "./Components/Employee/EmployeeSelf/EmployeeSelf.jsx";
import EmployeeSalary from "./Components/admin/Payroll/EmployeeSalary.jsx";
import SetSallary from "./Components/admin/Payroll/SetSallary.jsx";
import Payslip from "./Components/admin/Payslip/Payslip.jsx";
import DocumentManagement from "./Components/admin/document/DocumentManagement.jsx";
import TaskLead from "./Components/admin/LeadManagement/TaskLead.jsx";
import MeetLead from "./Components/admin/LeadManagement/MeetLead.jsx";
import LeadSystemSetting from "./Components/admin/EmployManagement/LeadSystemSetting.jsx";
import LeadSystemSetting2 from "./Components/admin/EmployManagement/LeadSystemSetting2.jsx";
import Permission from "./Components/admin/Permission/Permission.jsx";
import QuotationForm from "./Components/admin/EmployManagement/QuotationForm.jsx";
import TaskClients from "./Components/admin/EmployManagement/TaskClients.jsx";
import TaskProjects from "./Components/admin/EmployManagement/TaskProjects.jsx";
import Tasks from "./Components/admin/EmployManagement/Tasks.jsx";
import ProjectDetails from "./Components/admin/EmployManagement/ProjectDetails.jsx";
import MyProjects from "./Components/admin/EmployManagement/MyProjects.jsx";
import MyProjectTask from "./Components/admin/EmployManagement/MyProjectTask.jsx";
import ProjectDetails2 from "./Components/admin/EmployManagement/ProjectDetails2.jsx";
import ProjectOverview from "./Components/admin/EmployManagement/ProjectOverview.jsx";
import CreateProposal from "./Components/quotation/CreateProposal.jsx";
import ProposalForm from "./Components/admin/EmployManagement/ProposalForm.jsx";
import ITR from "./Components/admin/EmployManagement/ITR.jsx";
import UploadITRForm from "./Components/admin/EmployManagement/UploadITRForm.jsx";
import ITRReturn from "./Components/admin/EmployManagement/ITRReturn.jsx";
import Expense from "./Components/admin/EmployManagement/Expense.jsx";
import LeaveUpdates from "./Components/admin/EmployeeHRM/LeaveUpdates.jsx";
import HalfRequest from "./Components/admin/EmployeeHRM/HalfRequest.jsx";
import AcceptPage from "./Components/AcceptPage.jsx";
import PermissionData from "./Components/admin/Permission/PermissionData.js";
import { useMain } from "./hooks/useMain.js";

var tc;

const ROLES = {
  EMPLOYEE: "EMPLOYEE",
  HR: "HR",
  ADMIN: "ADMIN",
};

function App() {


  const [alertValue, setAlertValue] = useState({
    show: false,
    color: "",
    message: "",
  });

  const [pop, setPop] = useState(false);
  const [pop1, setPop1] = useState(false);

  const setAlert = (color, message) => {
    setAlertValue({
      color,
      message,
      show: true,
    });

    clearTimeout(tc);
    tc = setTimeout(() => {
      setAlertValue({
        color: "",
        message: "",
        show: false,
      });
    }, 3000);
  };

  const closeAlert = () => {
    clearTimeout(tc);
    setAlertValue({
      color: "",
      message: "",
      show: false,
    });
  };

  
  return (
    <div className="relative">
      <MainState >
        <BrowserRouter>
          {alertValue.show ? (
            <Alert
              color={alertValue.color}
              message={alertValue.message}
              closeAlert={closeAlert}
            />
          ) : null}

          <Routes>
            <Route path="/" element={<Home setAlert={setAlert} />} />
            <Route path="/login" element={<Auth setAlert={setAlert} />} />
            <Route path="/forget" element={<ForgetPassword setAlert={setAlert} />} />
            <Route path="/forget1" element={<ForgetPassword1 setAlert={setAlert} />} />
            <Route path="/forget2" element={<ForgetPassword2 setAlert={setAlert} />} />

            {/* =================Employee routing=========== */}
            <Route
              element={<PrivateRoute role={[ROLES.EMPLOYEE, ROLES.ADMIN]} />}
            >
              

              <Route path="/employeeDash/request" element={<Request pop1={pop1}
                setPop1={setPop1} setAlert={setAlert} />} />
              <Route path="/employeeDash/update" element={<UpdateProfile pop1={pop1}
                setPop1={setPop1} setAlert={setAlert} />} />
              <Route path="/employeeDash/atten" element={<AttendenceCalendar pop1={pop1}
                setPop1={setPop1} setAlert={setAlert} />} />
              <Route path="/employeeDash/editLead" element={<EditLead2 />} />
              <Route path="/employeeDash/createLead" element={<CreateLead2 />} />
              <Route path="/employeeDash/myLead" element={<MyLead2 />} />
              <Route path="/employeeDash/leadDash" element={<LeadDash2 />} />
              <Route path="/employeeDash/importLead/:id" element={<ImportLead2 />} />
              <Route path="/employeeDash/leadFile" element={<LeadFile2 />} />
              <Route path="/employeeDash/mySelf" element={<MySelf />} />

              <Route path="/employeeDash/createQuotation" element={<CreateQuotation />} />
              <Route path="/employeeDash/editQuotation" element={<EditQuotation />} />
              
              <Route path="/employeeDash/taskLead" element={<TaskLead />}  />      
              <Route path="/employeeDash/meetLead" element={<MeetLead />}  />

              <Route path="/accept/:userId" element={<AcceptPage />} />


            </Route>

            {/* ====================hr routing============== */}
            <Route element={<PrivateRoute role={[ROLES.HR, ROLES.ADMIN]} />}>
              <Route
                path="/hrDash"
                element={<HrDashboard pop1={pop1} setPop1={setPop1} setAlert={setAlert} />}
              />
              <Route path="/hrDash/EmployeeReg" element={<EmployeeManage
                setAlert={setAlert}
                pop={pop}
                setPop={setPop}
                pop1={pop1}
                setPop1={setPop1}
                isHr={true}
              />} />
              <Route path="/hrDash/EmployeeReg/:id" element={<EmployeeManage
                setAlert={setAlert}
                pop={pop}
                setPop={setPop}
                pop1={pop1}
                setPop1={setPop1}
                isHr={true}
              />} />
              <Route path="/hrDash/EmployeeMan" element={<ShowEmployee setAlert={setAlert} pop1={pop1}
                setPop1={setPop1} />} />
              <Route path="/hrDash/EmployeeMan1" element={<ShowEmployee1 setAlert={setAlert} pop1={pop1}
                setPop1={setPop1} />} />
              <Route path="/hrDash/profile" element={<UpdateProfileHr setAlert={setAlert} pop1={pop1}
                setPop1={setPop1} />} />
              <Route path="/hrDash/payroll" element={<Payroll setAlert={setAlert} pop1={pop1}
                setPop1={setPop1} />} />

              <Route path="/hrDash/atten" element={<HrAttendence pop1={pop1}
                setPop1={setPop1} setAlert={setAlert} />} />
              <Route path="/hrDash/atten1" element={<HrAttendence1 pop1={pop1}
                setPop1={setPop1} setAlert={setAlert} />} />


            </Route>

            {/* ================admin routing===================== */}
            <Route >
              <Route
                path="/adminDash"
                element={<AdminDash pop={pop} setPop={setPop} setAlert={setAlert} />}
              />
              <Route path="/adminDash/EmployeeMan" element={<EmployeeManage pop={pop} setPop={setPop} setAlert={setAlert} />} />
              <Route path="/adminDash/HRM" element={<EmployeeHRM pop={pop} setPop={setPop} setAlert={setAlert} />} />
              {/* this is employee dashboard  */}
              <Route path="/employeeDash" element={<EmployeeHRM pop={pop} setPop={setPop} setAlert={setAlert} />} />

              <Route path="/adminDash/HRM/createEmployee" element={<CreateEmployee pop={pop} setPop={setPop} setAlert={setAlert} />} />
              <Route path="/adminDash/HRM/EmployeeManagement" element={<EmployeeManagement pop={pop} setPop={setPop} setAlert={setAlert} />} />
              <Route path="/employeeDash/HRM/EmployeeManagement" element={<EmployeeManagement pop={pop} setPop={setPop} setAlert={setAlert} />} />
              <Route path="/adminDash/HRM/EmployeeManagement/:id" element={<EmployeeManagementID pop={pop} setPop={setPop} setAlert={setAlert} />} />
              <Route path="/employeeDash/HRM/EmployeeManagement/:id" element={<EmployeeManagementID pop={pop} setPop={setPop} setAlert={setAlert} />} />
              {/* dinesh  */}
              <Route path="/adminDash/HRM/HRMsystemSetup" element={<HRMsystemSetup />} />
              <Route path="/employeeDash/HRM/HRMsystemSetup" element={<HRMsystemSetup />} />
              <Route path="/adminDash/HRM/QuotationForm" element={<QuotationForm />} />
              {/* <Route path="/adminDash/HRM/ITR" element={<ITR />} /> */}
              <Route path="/adminDash/HRM/Expense" element={<Expense />} />

              <Route path="/adminDash/HRM/UploadITRForm" element={<UploadITRForm />} />
              <Route path="/adminDash/HRM/ITRReturn" element={<ITRReturn />} />
              <Route path="/employeeDash/HRM/QuotationForm" element={<QuotationForm />} />
              <Route path="/employeeDash/HRM/ProposalForm" element={<ProposalForm />} />
              <Route path="/adminDash/HRM/ProposalForm" element={<ProposalForm />} />

              <Route path="/employeeDash/HRM/myProjects" element={<MyProjects />} />
              <Route path="/employeeDash/HRM/projectDetails" element={<ProjectDetails2 />} />

              <Route path="/adminDash/HRM/taskClients" element={<TaskClients />} />
              <Route path="/adminDash/HRM/taskProjects" element={<TaskProjects />} />
              <Route path="/adminDash/HRM/projectDetails" element={<ProjectDetails />} />
              <Route path="/adminDash/HRM/projectOverview" element={<ProjectOverview />} />
              <Route path="/adminDash/HRM/Tasks" element={<Tasks />} />

              <Route path="/adminDash/HRM/AwardHRM" element={<AwardHRM />} />
              <Route path="/adminDash/HRM/trip" element={<Trip />} />
              <Route path="/adminDash/HRM/TransferHRM" element={<TransferHRM />} />
              <Route path="/adminDash/HRM/ResignationHRM" element={<ResignationHRM />} />
              <Route path="/adminDash/HRM/PromotionHRM" element={<PromotionHRM />} />
              <Route path="/adminDash/HRM/ComplaintsHRM" element={<ComplaintsHRM />} />
              <Route path="/adminDash/HRM/WarningHRM" element={<WarningHRM />} />
              <Route path="/adminDash/HRM/TerminationHRM" element={<TerminationHRM />} />
              <Route path="/adminDash/HRM/holiday" element={<HolidayHRM />} />

              <Route path="/employeeDash/HRM/AwardHRM" element={<AwardHRM />} />
              <Route path="/employeeDash/HRM/trip" element={<Trip />} />
              <Route path="/employeeDash/HRM/TransferHRM" element={<TransferHRM />} />
              <Route path="/employeeDash/HRM/ResignationHRM" element={<ResignationHRM />} />
              <Route path="/employeeDash/HRM/PromotionHRM" element={<PromotionHRM />} />
              <Route path="/employeeDash/HRM/ComplaintsHRM" element={<ComplaintsHRM />} />
              <Route path="/employeeDash/HRM/WarningHRM" element={<WarningHRM />} />
              <Route path="/employeeDash/HRM/TerminationHRM" element={<TerminationHRM />} />
              <Route path="/employeeDash/HRM/holiday" element={<HolidayHRM />} />

              <Route path="/adminDash/HRM/totalEmployee" element={<TotalEmployee pop={pop} setPop={setPop} setAlert={setAlert} />} />
              <Route path="/adminDash/HRM/LeaveEmployee" element={<LeaveEmployee pop={pop} setPop={setPop} setAlert={setAlert} />} />
              <Route path="/employeeDash/HRM/LeaveEmployee" element={<LeaveEmployee pop={pop} setPop={setPop} setAlert={setAlert} />} />
              <Route path="/employeeDash/HRM/LeaveEmployeeDetails" element={<LeaveUpdates pop={pop} setPop={setPop} setAlert={setAlert} />} />
              <Route path="/adminDash/HRM/activeEmployee" element={<ActiveEmplyee pop={pop} setPop={setPop} setAlert={setAlert} />} />
              <Route path="/adminDash/HRM/leaveRequest" element={<LeaveRequest pop={pop} setPop={setPop} setAlert={setAlert} />} />
              <Route path="/adminDash/HRM/halfDayRequest" element={<HalfRequest pop={pop} setPop={setPop} setAlert={setAlert} />} />
              <Route path="/employeeDash/HRM/halfDayRequest" element={<HalfRequest pop={pop} setPop={setPop} setAlert={setAlert} />} />
              <Route path="/employeeDash/HRM/leaveRequest" element={<LeaveRequest pop={pop} setPop={setPop} setAlert={setAlert} />} />
              <Route path="/adminDash/HRM/markAttendance" element={<MarkAttendance pop={pop} setPop={setPop} setAlert={setAlert} />} />
              <Route path="/employeeDash/HRM/markAttendance" element={<MarkAttendance pop={pop} setPop={setPop} setAlert={setAlert} />} />
              <Route path="/adminDash/HRM/userAttendence" element={<EmployeAttendence pop={pop} setPop={setPop} setAlert={setAlert} />} />

              <Route path="/adminDash/EmployeeMan/:id" element={<EmployeeManage pop={pop} setPop={setPop} setAlert={setAlert} />} />

              <Route path="/adminDash/profile-management" element={<ProfileManagement pop={pop} setPop={setPop} setAlert={setAlert} />} />

              <Route path="/adminDash/HrManage" element={<HrManage pop={pop} setAlert={setAlert} setPop={setPop} />} />
              <Route path="/adminDash/Permission" element={<Permission  pop={pop} setAlert={setAlert} setPop={setPop} />} />
              <Route path="/employeeDash/Permission" element={<Permission pop={pop} setAlert={setAlert} setPop={setPop} />} />
              <Route path="/adminDash/PermissionDetail" element={<PermissionData pop={pop} setAlert={setAlert} setPop={setPop} />} />
              <Route path="/employeeDash/PermissionDetail" element={<PermissionData pop={pop} setAlert={setAlert} setPop={setPop} />} />
              <Route path="/adminDash/profile" element={<AdminProfile pop={pop} setPop={setPop} setAlert={setAlert} />} />
              <Route path="/adminDash/announcement" element={<AdminAnnoncement pop={pop} setPop={setPop} setAlert={setAlert} />} />
              <Route path="/employeeDash/announcement" element={<AdminAnnoncement pop={pop} setPop={setPop} setAlert={setAlert} />} />
              <Route path="/performance/indicator" element={<Indicator pop={pop} setPop={setPop} setAlert={setAlert} />} />
              <Route path="/performance/appraisal" element={<Appraisal pop={pop} setPop={setPop} setAlert={setAlert} />} />
              <Route path="/performance/goalTracking" element={<GoalTracking pop={pop} setPop={setPop} setAlert={setAlert} />} />
              <Route path="/performance/Assets" element={<Assets pop={pop} setPop={setPop} setAlert={setAlert} />} />
              <Route path="/training/TrainingList" element={<TrainingList />} />
              <Route path="/training/TrainerHRM" element={<TrainerHRM />} />
              <Route path="/training/DocumentSetup" element={<DocumentSetup />} />
              <Route path="/adminDash/notification" element={<Notification />} />
              <Route path="/hrDash/notification" element={<Notification2 setAlert={setAlert}
                pop={pop}
                setPop={setPop}
                pop1={pop1}
                setPop1={setPop1}
                isHr={true} />} />
              <Route path="/hrDash/notification3" element={<Notification3 />} />
              <Route path="/hrDash/notification4" element={<Notification4 setAlert={setAlert}
                pop={pop}
                setPop={setPop}
                pop1={pop1}
                setPop1={setPop1}
                isHr={true} />} />
              <Route path="/adminDash/leadDash" element={<LeadDash />} />
              <Route path="/adminDash/myLead" element={<MyLead />} />
              <Route path="/adminDash/userLead" element={<UserLead />} />
              <Route path="/adminDash/createLead" element={<CreateLead />} />
              <Route path="/adminDash/editLead" element={<EditLead />} />
              <Route path="/adminDash/importLead/:id" element={<ImportLead />} />
              <Route path="/adminDash/mySelf" element={<MySelf />} />
              <Route path="/adminDash/EmployeeDetails" element={<EmployeeSelf />} />

              <Route path="/adminDash/leadFile" element={<LeadFile />} />

              <Route path="/adminDash/createQuotation" element={<CreateQuotation />} />
              <Route path="/adminDash/editQuotation" element={<EditQuotation/>} />

              <Route path="/adminDash/setSallary" element={<EmployeeSalary pop={pop} setPop={setPop} />} />
              <Route path="/employeeDash/setSallary" element={<EmployeeSalary pop={pop} setPop={setPop} />} />

              <Route path="/adminDash/payslip" element={<Payslip pop={pop} setPop={setPop}/>}/>
              <Route path="/employeeDash/payslip" element={<Payslip pop={pop} setPop={setPop}/>}/>
           

              <Route path="/adminDash/setAll/:id" element={<SetSallary pop={pop} setPop={setPop} />} />

              <Route path="/adminDash/addEmployee" element={<AddEmployee />} />
              <Route path="/adminDash/documentManagement" element={<DocumentManagement />} />
              <Route path="/employeeDash/documentManagement" element={<DocumentManagement />} />

              <Route path="/invoicePage" element={<InvoicePage />} />
              <Route path="/adminDash/taskLead" element={<TaskLead />}  />
              <Route path="/adminDash/meetLead" element={<MeetLead />}  />
              <Route path="/adminDash/LeadSystemSetting" element={<LeadSystemSetting />}  />
              <Route path="/employeeDash/LeadSystemSetting" element={<LeadSystemSetting2 />}  />

           

            </Route>

          </Routes>

        </BrowserRouter>
      </MainState>
      {/* <Auth/> */}
    </div>
  );
};

export default App;

