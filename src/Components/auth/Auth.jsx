import React, { useState } from "react";
import kushel from "../images/auxi.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useMain } from "../../hooks/useMain";
import frame from "../images/Frame.png"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

const Auth = (props) => {
  const { login, setUser } = useMain();

  const navigate = useNavigate();

  var [value, setValue] = useState({
    email: "",
    password: "",
    employeeCode: ""
  });

  const [tab, setTab] = useState(0);
  const [showpassword, setShowpass] = useState(false);

  const adminLogin = (e) => {
    e.preventDefault();
    setTab(1);
    document.getElementById("btn2").style.border = "1px solid #B3CBF7";
    document.getElementById("btn2").style.background = "none";
    document.getElementById("btn2").style.color = "#49515C";

    document.getElementById("btn1").style.border = "none";
    document.getElementById("btn1").style.background = "#0b60ff";
    document.getElementById("btn1").style.color = "white"
  }

  const userLogin = (e) => {
    e.preventDefault();
    setTab(2);
    document.getElementById("btn1").style.border = "1px solid #B3CBF7";
    document.getElementById("btn1").style.background = "none";
    document.getElementById("btn1").style.color = "#49515C"

    document.getElementById("btn2").style.border = "none";
    document.getElementById("btn2").style.background = "#0b60ff";
    document.getElementById("btn2").style.color = "white"
  }

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let ans = await login(value);

    if (ans.success) {
      setUser(ans.user);
      localStorage.setItem("hrms_user", JSON.stringify(ans?.user));
      localStorage.setItem("hrms_permission", JSON.stringify(ans?.user?.PermissionRole || {}));
      localStorage.setItem(
        "hrms_token",
        JSON.stringify({
          token: ans.token,
          role: ans.role
        })
      );

      props.setAlert("success", ans.message);

      if (ans.user.role === "HR") {
        navigate("/hrDash");
      } else if (ans.user.role === "EMPLOYEE") {
        navigate("/employeeDash");
      } else {
        navigate("/adminDash/HRM");
      }

    } else {
      props.setAlert("error", ans.message);
    }
  };



  return (
    <div className="auth4">

      <div className="login-pageMain3">

        <div className="login-page2">


          <div className="login_new_div">


            <img className="kushel-logo2" src={kushel} alt="" />


            <div className="singWrap">
              <h2 className="singin">Sign in </h2>
              <p className="access">to access HRMS Dashboard</p>
            </div>

            <div className="login-buttons flex">
              <button id="btn1" onClick={adminLogin} className="admin_login">Admin</button>
              <button id="btn2" onClick={userLogin} className="user_login">Employee</button>
            </div>

            <div className="login-form">
              <form onSubmit={handleSubmit}>
                <div className=" flex flex-col mt-4 ">
                  <label className="custom-field one">
                    <input
                      required
                      name={tab === 1 ? "email" : "employeeCode"}
                      onChange={handleChange}
                      value={tab === 1 ? value.email : value.employeeCode}
                      type={tab === 1 ? "email" : "text"}
                      placeholder=" "
                    />
                    <span className="placeholder">{tab === 1 ? "Email" : "Employee Code"}</span>
                  </label>
                  {/* <label className="custom-field one">
         <input
           required
           name="password"
           onChange={handleChange}
           value={value.password}
           type="password"
           placeholder=" "
         />
         <span className="placeholder">Password</span>
       </label> */}
                  <div className="w-full relative">

                    <label className="custom-field w-full one">
                      <input
                        required
                        name="password"
                        onChange={handleChange}
                        value={value.password}
                        type={showpassword ? 'text' : 'password'}
                        placeholder=" "
                      />
                      <span className="placeholder">Password</span>
                    </label>

                    <span className="showpassicon"> {showpassword ? <FaEye onClick={() => setShowpass(false)} /> : <FaEyeSlash onClick={() => setShowpass(true)} />} </span>

                  </div>
                  <div className="formgotPassWidht">

                    <NavLink to="/forget">
                      <p className="   forget">Forgot password?</p>
                    </NavLink>
                  </div>
                </div>

                <button className="yui">Log in</button>


              </form>
            </div>

          </div>

        </div>

        <div className="login-page1">
          <img src={frame} alt="photo" />
        </div>

      </div>
    </div>
  );
};

export default Auth;
