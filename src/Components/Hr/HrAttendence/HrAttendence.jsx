import React, { useState } from 'react'
import HrNavbar from '../Navbar/HrNavbar';
import HrSidebar from '../Sidebar/HrSidebar';
import { useMain } from '../../../hooks/useMain';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import akash from '../../images/akasha.png';
import { useEffect } from 'react';

const HrAttendence = ({ setAlert, pop1, setPop1 }) => {
  let todayDate = new Date().toLocaleDateString('en-GB');
  const { user, postActivity, getStatisticsByUser, getActivitiesByUser } = useMain();
  const [value, onChange] = useState(new Date());
  const [loadFlag, setLoadFlag] = useState(false);
  const [mainData, setMainData] = useState({});

  useEffect(() => {
    getData(todayDate);
  }, []);

  const getData = async (date) => {
    setLoadFlag(true);
    const data = await getActivitiesByUser(date, '', '', 0, 10, '');
    console.log(data.data[0]);
    setMainData(data.data[0]);
    setLoadFlag(false);
  };

  const handleCalendar = (e) => {
    let date = new Date(e).toLocaleDateString('en-GB');
    // console.log(date);
    getData(date);
  };

  return (
    <>
      <div className="employee-dash h-full">
        <HrSidebar />

        <div className="tm">
          <HrNavbar
            user={user}
            setAlert={setAlert}
            postActivity={postActivity}
            getStatisticsByUser={getStatisticsByUser}
            pop1={pop1} setPop1={setPop1}
          />
          <div className="em">
            <div className="flex-col">
              <div className='distinguish flex'>
                <div className="distinguish1 w-full">
                  <div className="calend calend1">
                    <div className="calend-head">
                      {/* <h2>Attendances Calendrer</h2>
                      <p>See all</p> */}
                    </div>

                    <Calendar onChange={handleCalendar} value={value} />

                  </div>
                </div>

                <div className="distinguish2 w-full">
                  <div className="total-timeCal">
                    <h2 className='total'>Total Time</h2>
                    <hr />
                    {!loadFlag ? <div className='clock-system'>
                      <div className="clock">
                        <h3>Clock In</h3>
                        <div className="clock1 flex items-center">
                          {/* <h2>07 : 35</h2> */}
                          <h2>{mainData && Object.keys(mainData).length > 0 ? new Date(mainData.activity[0].ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) : " - : - "}</h2>
                          {/* <p>Pm</p> */}
                        </div>
                      </div>
                      <hr />
                      <div className="clock clock2">
                        <h3>Clock Out</h3>
                        <div className=" clock1 flex items-center">
                          <h2>{mainData && Object.keys(mainData).length > 0 && mainData.activity[mainData.activity.length - 1].message !== "" ? new Date(mainData.activity[mainData.activity.length - 1].ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) : " - : -"}</h2>
                          {/* <h2>07 : 35</h2>
                          <p>Pm</p> */}
                        </div>
                      </div>
                    </div> : null}
                  </div>
                </div>
                <div className="distinguish3 w-full">
                  <div className="distinguish-varding">
                    <h3 className='sasks'>Tasks</h3>
                    <hr />
                    <div className="distinguish-fard">
                      <div className="distinguish-box">
                        <img src={akash} alt="akash" />
                        <div className='akash'>
                          <h3>Interview with Akash Negi</h3>
                          <p>Lorem Ipsum is simply dummy text of the printing and typesetting.</p>
                          <h4>12:30  June 12,2022</h4>
                        </div>
                      </div>
                      <div className="distinguish-box">
                        <img src={akash} alt="akash" />
                        <div className='akash'>
                          <h3>Interview with Akash Negi</h3>
                          <p>Lorem Ipsum is simply dummy text of the printing and typesetting.</p>
                          <h4>12:30  June 12,2022</h4>
                        </div>
                      </div>
                      <div className="distinguish-box">
                        <img src={akash} alt="akash" />
                        <div className='akash'>
                          <h3>Interview with Akash Negi</h3>
                          <p>Lorem Ipsum is simply dummy text of the printing and typesetting.</p>
                          <h4>12:30  June 12,2022</h4>
                        </div>
                      </div>
                      <div className="distinguish-box">
                        <img src={akash} alt="akash" />
                        <div className='akash'>
                          <h3>Interview with Akash Negi</h3>
                          <p>Lorem Ipsum is simply dummy text of the printing and typesetting.</p>
                          <h4>12:30  June 12,2022</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HrAttendence