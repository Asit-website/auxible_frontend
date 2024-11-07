import React, { useState } from 'react';
import photo from "../images/Photo.png";
import kushel from "../images/kushel.png";
import path from '../images/path.png';
import { useMain } from '../../hooks/useMain';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ForgetPassword2 = ({ setAlert }) => {
  const { forgetPassword2 } = useMain();

  const [value, setValue] = useState({
    password: '',
    password1: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (value.password === value.password1) {
      const ans = await forgetPassword2({ email: localStorage.getItem('kds-reset-email'), password: value.password });

      if (ans.success) {
        localStorage.removeItem('hrms_token');
        localStorage.removeItem('hrms_user');
        localStorage.removeItem('kds-reset-email');
        toast.success("password changed successfully");
        navigate('/login');
      }
    }
    else {
      setAlert("error", "Password and confirm password must be same");
    }
  };

  return (
    <div className="auth">
      <div className="login-page">

        {/* <div className="login-page1"> */}
          {/* <img className="path6" src={path} alt="path" /> */}
          {/* <img src={photo} alt="photo" /> */}
        {/* </div> */}

        <div className="login-page2">

                    <img className="kushImg" src={kushel} alt="" />

          <h2>Create new password</h2>

          <p className="mt-4 max-w-[363px]">
          There is nothing to worry about, we'll send you a message to help you reset your password.
          </p>

          <div className="login-form">
            <form onSubmit={handleSubmit}>

              <div className=" flex flex-col mt-4 ">
                {/* <label htmlFor='oldPassword' className="custom-field one">
              <input type="text"
                          name="oldPassword"
                          onChange={handleChange}
                          value={value.oldPassword}
                          id="oldPassword"
                          className=" block w-full"
                          required
                          placeholder=" " />
              <span className="placeholder">Old Password</span>
            </label> */}
                <label htmlFor='password' className="custom-field one">
                  <input type="text"
                    name="password"
                    onChange={handleChange}
                    value={value.password}
                    id="password"
                    className=" block w-full"
                    required
                    placeholder=" " />
                  <span className="placeholder">New Password</span>
                </label>

                <label htmlFor='password1' className="custom-field one">
                  <input type="text"
                    name="password1"
                    onChange={handleChange}
                    value={value.password1}
                    id="password1"
                    className=" block w-full"
                    required
                    placeholder=" " />
                  <span className="placeholder">Confirm Password</span>
                </label>

              </div>

              <button type='submit' className='forgetSumtBtn'><span>Continue</span></button>

              <div className="sign-information">
                <p>Powered by <a target='_blank' href="https://www.kusheldigi.com/"> <span>KusheldigiSolutions</span></a> </p>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ForgetPassword2