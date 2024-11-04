import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("hrms_token"));
    let user = JSON.parse(localStorage.getItem("hrms_user"));
    
    if (token && user) {
      if (user.role === "EMPLOYEE") {
        navigate("/employeeDash");
      } else if (user.role === "HR") {
        navigate("/hrDash");
      } else {
        navigate("/adminDash");
      }
    } else {
      navigate("/login");
    }
  }, []);
  return <>Home</>;
};

export default Home;
