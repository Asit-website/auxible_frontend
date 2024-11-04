import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import "./HRMsystem.css";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";
import "./quote.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ITR = ({ setAlert, pop, setPop }) => {
  const { user } = useMain();

  const navigate = useNavigate();
  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));
  const { role } = hrms_user;

  const questions = [
    "Q1. Income from Salary/Pension ",
    "Q2. Income from House Property(Home Loan/ Rental Income, etc) ",
    "Q3. Income from Business/Profession ?",
    "Q4. Income from Capital Gains (Shares/ Mutual Funds/Property etc) ",
    "Q5. Income from Other Sources ",
    "Q6. Income from Foreign Source ",
  ];

  // Initialize state with empty values for each question
  const [selectedAnswers, setSelectedAnswers] = useState(
    questions.reduce((acc, question) => {
      acc[question] = "no"; // No answer selected by default
      return acc;
    }, {})
  );

  // Handle radio button change
  const handleChange = (question, answer) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [question]: answer,
    }));
  }; 

 
   // Handle button click
   const handleClick = () => {
    const allNo = Object.values(selectedAnswers).every(answer => answer === 'no');
    
    if (allNo) {
      toast.error('At least one answer should be "Yes"');
    } else {
      navigate("/adminDash/HRM/UploadITRForm");
    }
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
            <div className="ITRWRAP">

              <h2 className="heading">
                Income Tax Return (ITR) Filing for FY 2023-24 (AY 2024-25)
              </h2>

              <div className="incomeChoice">
                {questions.map((question, index) => (
                  <>
                    <div key={index} className="question">
                      <label className="questinput">{` ${question}`}</label>
                      <div className="choices">
                        <label>
                          <input
                            type="radio"
                            name={question}
                            value="yes"
                            checked={selectedAnswers[question] === "yes"}
                            onChange={() => handleChange(question, "yes")}
                          />
                          <span> Yes</span>
                        </label>
                        <label>
                          <input
                            type="radio"
                            name={question}
                            value="no"
                            checked={selectedAnswers[question] === "no"}
                            onChange={() => handleChange(question, "no")}
                          />
                          <span> No</span>
                        </label>
                      </div>
                    </div>
                    <hr />
                  </>
                ))}
              </div>


          <button onClick={()=>{
            handleClick();
          }} className="continueBtn"><span>Continue</span></button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ITR;
