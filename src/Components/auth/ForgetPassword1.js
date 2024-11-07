import React, { useState } from 'react'
import photo from "../images/Photo.png";
import kushel from "../images/kushel.png";
import path from '../images/path.png';
import { useNavigate } from 'react-router-dom';
import { useMain } from '../../hooks/useMain';

const ForgetPassword1 = () => {
  const navigate = useNavigate();
  const { forgetPassword1 } = useMain();
  const [value, setValue] = useState({
    n1: '',
    n2: '',
    n3: '',
    n4: '',
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let ans = await forgetPassword1({ email: localStorage.getItem('kds-reset-email'), otp: value.n1 + value.n2 + value.n3 + value.n4 })
    if (ans.success) {
      navigate("/forget2");
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

          <h2>Forgot Password</h2>
          <p className="mt-4">
            This is a secure system and you will need to provide your login
            details to access the site.
          </p>
          <div className="login-form">
            <form onSubmit={handleSubmit}>
              <div className=" flex justify-between otp-verify  ">
                <input required className='otp' type="text" maxLength="1" name="n1" onChange={handleChange} value={value.n1} />
                <input required className='otp otp1' type="text" maxLength="1" name="n2" onChange={handleChange} value={value.n2} />
                <input required className='otp otp1' type="text" maxLength="1" name="n3" onChange={handleChange} value={value.n3} />
                <input required className='otp otp1' type="text" maxLength="1" name="n4" onChange={handleChange} value={value.n4} />
              </div>
              <button type='submit' className='next-btn'>Next</button>
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

export default ForgetPassword1