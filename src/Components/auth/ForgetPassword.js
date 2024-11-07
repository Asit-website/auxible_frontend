import React, { useState } from 'react';
import photo from "../images/Photo.png";
import kushel from "../images/kushel.png";
import path from '../images/path.png';
import { useNavigate } from 'react-router-dom';
import { useMain } from '../../hooks/useMain';
import buttons from "../images/Buttons.png"

const ForgetPassword = () => {
  const navigate = useNavigate();

  const { forgetPassword } = useMain();

  const [value, setValue] = useState({
    employeeCode: '',
    email: '',
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let ans = await forgetPassword(value);
    if (ans.success) {
      localStorage.setItem('kds-reset-email', ans.email);
      navigate("/forget1");
    }
  };

  return (
    <div className="auth">

      <div className="login-page">

        <div className="login-page2">

          <img src={kushel} className='kushImg' alt="" />


          <h2>Forgotten your password?</h2>

          <p className="mt-4 max-w-[363px]">
          There is nothing to worry about, we'll send you a message to help you reset your password.
          </p>

          <div className="login-form">

            <form onSubmit={handleSubmit}>

              <div className=" flex flex-col mt-4 ">

                <label className="custom-field one">
                  <input required type="text" placeholder=" " onChange={handleChange} name="employeeCode" value={value.employeeCode} />
                  <span className="placeholder">Employee Code</span>
                </label>

                <label className="custom-field one">
                  <input required type="email" placeholder=" " onChange={handleChange} name="email" value={value.email} />
                  <span className="placeholder">Email Id</span>
                </label>
              </div>

              {/* <button type='submit'>Next</button> */}
              <button type='submit' className='forgetSumtBtn'><span>Send Reset Link</span></button>

              {/* <div className="sign-information">
                <p>Powered by <a target='_blank' href="https://www.kusheldigi.com/"><span>KusheldigiSolutions</span></a> </p>
              </div> */}
              
            </form>




          </div>


    
        </div>

        <div className='termanduse'>
          Terms of Use and Privacy Policy.
          </div>


      </div>
    </div>
  )
}

export default ForgetPassword