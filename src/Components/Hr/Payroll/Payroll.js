import React, { useState } from 'react'
import HrSidebar from '../Sidebar/HrSidebar';
import HrNavbar from '../Navbar/HrNavbar';
import orange from '../../images/orange.png';
import download from '../../images/download.png';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Payroll = ({ setAlert, pop1, setPop1 }) => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      <div className="employee-dash h-full">
        <HrSidebar setAlert={setAlert} />
        <div className="tm">
          <HrNavbar setAlert={setAlert} pop1={pop1} setPop1={setPop1} />
          <div className="em">
            <div className="flex-col">
              <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
              <div className="hr-bash">

                <div className="relative overflow-x-auto overhidding overhidding1">
                  <h2>My Payroll</h2>
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="bg-[#ffffff] theads theads1">
                      <tr>
                        <th scope="col" className="px-6 py-3 sitar">
                          <h4>S.No</h4>
                        </th>
                        <th scope="col" className="px-6 py-3 sitar">
                          <h4>Transaction address</h4>
                        </th>
                        <th scope="col" className="px-6 py-3 sitar">
                          <h4>Date</h4>
                        </th>
                        <th scope="col" className="px-6 py-3 sitar">
                          <h4>Amount</h4>
                        </th>
                        <th scope="col" className="px-6 py-3 sitar">
                          <h4>Working days</h4>
                        </th>
                        <th scope="col" className="px-6 py-3 sitar">
                          <h4>Status</h4>
                        </th>
                        <th scope="col" className="px-6 py-3 sitar1">
                          <h4>Download Slip</h4>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-[#ffffff] tr-head tr-head1  ">
                        <td scope="row" className="px-6 py-4">
                          <p className="sno">01</p>
                        </td>
                        <td className="px-6 py-4">
                          <p>1234-5678-9012-3456</p>
                        </td>
                        <td className="px-6 py-4 timer">
                          <div className='flex items-center'>
                            <div>
                              <img width={15} src={orange} alt="orange" />
                            </div>
                            <div className='ml-2 dates-pick'>
                              <h3>15 July 2021</h3>
                              <p>10 : 45 AM</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className='inr'>+100000 INR</p>
                        </td>
                        <td className="px-6 py-4">
                          <p>24.5  (588 Hours) </p>
                        </td>
                        <td className="px-6 py-4 timer">
                          <p>Sucessfull</p>
                        </td>
                        <td className="px-6 py-4 relative cursor-pointer">
                          <div className='santu'>
                            <img src={download} alt="download" />
                          </div>
                        </td>
                      </tr>
                      <tr className="bg-[#ffffff] tr-head tr-head1  ">
                        <td scope="row" className="px-6 py-4">
                          <p className="sno">01</p>
                        </td>
                        <td className="px-6 py-4">
                          <p>1234-5678-9012-3456</p>
                        </td>
                        <td className="px-6 py-4 timer">
                          <div className='flex items-center'>
                            <div>
                              <img width={15} src={orange} alt="orange" />
                            </div>
                            <div className='ml-2 dates-pick'>
                              <h3>15 July 2021</h3>
                              <p>10 : 45 AM</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className='inr'>+100000 INR</p>
                        </td>
                        <td className="px-6 py-4">
                          <p>24.5  (588 Hours) </p>
                        </td>
                        <td className="px-6 py-4 timer">
                          <p>Sucessfull</p>
                        </td>
                        <td className="px-6 py-4 relative cursor-pointer">
                          <div className='santu'>
                            <img src={download} alt="download" />
                          </div>
                        </td>
                      </tr>
                      <tr className="bg-[#ffffff] tr-head tr-head1  ">
                        <td scope="row" className="px-6 py-4">
                          <p className="sno">01</p>
                        </td>
                        <td className="px-6 py-4">
                          <p>1234-5678-9012-3456</p>
                        </td>
                        <td className="px-6 py-4 timer">
                          <div className='flex items-center'>
                            <div>
                              <img width={15} src={orange} alt="orange" />
                            </div>
                            <div className='ml-2 dates-pick'>
                              <h3>15 July 2021</h3>
                              <p>10 : 45 AM</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className='inr'>+100000 INR</p>
                        </td>
                        <td className="px-6 py-4">
                          <p>24.5  (588 Hours) </p>
                        </td>
                        <td className="px-6 py-4 timer">
                          <p>Sucessfull</p>
                        </td>
                        <td className="px-6 py-4 relative cursor-pointer">
                          <div className='santu'>
                            <img src={download} alt="download" />
                          </div>
                        </td>
                      </tr>
                      <tr className="bg-[#ffffff] tr-head tr-head1  ">
                        <td scope="row" className="px-6 py-4">
                          <p className="sno">01</p>
                        </td>
                        <td className="px-6 py-4">
                          <p>1234-5678-9012-3456</p>
                        </td>
                        <td className="px-6 py-4 timer">
                          <div className='flex items-center'>
                            <div>
                              <img width={15} src={orange} alt="orange" />
                            </div>
                            <div className='ml-2 dates-pick'>
                              <h3>15 July 2021</h3>
                              <p>10 : 45 AM</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className='inr'>+100000 INR</p>
                        </td>
                        <td className="px-6 py-4">
                          <p>24.5  (588 Hours) </p>
                        </td>
                        <td className="px-6 py-4 timer">
                          <p>Sucessfull</p>
                        </td>
                        <td className="px-6 py-4 relative cursor-pointer">
                          <div className='santu'>
                            <img src={download} alt="download" />
                          </div>
                        </td>
                      </tr>
                      <tr className="bg-[#ffffff] tr-head tr-head1  ">
                        <td scope="row" className="px-6 py-4">
                          <p className="sno">01</p>
                        </td>
                        <td className="px-6 py-4">
                          <p>1234-5678-9012-3456</p>
                        </td>
                        <td className="px-6 py-4 timer">
                          <div className='flex items-center'>
                            <div>
                              <img width={15} src={orange} alt="orange" />
                            </div>
                            <div className='ml-2 dates-pick'>
                              <h3>15 July 2021</h3>
                              <p>10 : 45 AM</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className='inr'>+100000 INR</p>
                        </td>
                        <td className="px-6 py-4">
                          <p>24.5  (588 Hours) </p>
                        </td>
                        <td className="px-6 py-4 timer">
                          <p>Sucessfull</p>
                        </td>
                        <td className="px-6 py-4 relative cursor-pointer">
                          <div className='santu'>
                            <img src={download} alt="download" />
                          </div>
                        </td>
                      </tr>
                      <tr className="bg-[#ffffff] tr-head tr-head1  ">
                        <td scope="row" className="px-6 py-4">
                          <p className="sno">01</p>
                        </td>
                        <td className="px-6 py-4">
                          <p>1234-5678-9012-3456</p>
                        </td>
                        <td className="px-6 py-4 timer">
                          <div className='flex items-center'>
                            <div>
                              <img width={15} src={orange} alt="orange" />
                            </div>
                            <div className='ml-2 dates-pick'>
                              <h3>15 July 2021</h3>
                              <p>10 : 45 AM</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className='inr'>+100000 INR</p>
                        </td>
                        <td className="px-6 py-4">
                          <p>24.5  (588 Hours) </p>
                        </td>
                        <td className="px-6 py-4 timer">
                          <p>Sucessfull</p>
                        </td>
                        <td className="px-6 py-4 relative cursor-pointer">
                          <div className='santu'>
                            <img src={download} alt="download" />
                          </div>
                        </td>
                      </tr>
                      <tr className="bg-[#ffffff] tr-head tr-head1  ">
                        <td scope="row" className="px-6 py-4">
                          <p className="sno">01</p>
                        </td>
                        <td className="px-6 py-4">
                          <p>1234-5678-9012-3456</p>
                        </td>
                        <td className="px-6 py-4 timer">
                          <div className='flex items-center'>
                            <div>
                              <img width={15} src={orange} alt="orange" />
                            </div>
                            <div className='ml-2 dates-pick'>
                              <h3>15 July 2021</h3>
                              <p>10 : 45 AM</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className='inr'>+100000 INR</p>
                        </td>
                        <td className="px-6 py-4">
                          <p>24.5  (588 Hours) </p>
                        </td>
                        <td className="px-6 py-4 timer">
                          <p>Sucessfull</p>
                        </td>
                        <td className="px-6 py-4 relative cursor-pointer">
                          <div className='santu'>
                            <img src={download} alt="download" />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Payroll