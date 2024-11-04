import React from 'react'
import cut from '../../images/cut.png';
import gol from '../../images/gol.png';
import gol1 from '../../images/gol1.png';
import arrows from '../../images/arrows.png';
import { NavLink } from 'react-router-dom';
const Managment = ({ setPop }) => {
    return (
        <>
            <div className='home-pop'>
                <div className="popup-container">
                    <img className='cut' onClick={() => setPop(false)} src={cut} alt="" />
                    <div className="pops-man">
                        <h3>Select Employee Type</h3>
                        <div className="select-type flex items-center justify-center">
                            <NavLink onClick={() => setPop(false)} to="/adminDash/EmployeeMan"> <div className="sel-type">
                                <div className="select-typ1">
                                    <img src={gol} alt="" />
                                </div>
                                <p className='text-center'>Employee</p>
                            </div></NavLink>
                            <div className="sel-type">
                                <div className="select-typ1">
                                    <img src={gol1} alt="" />
                                </div>
                                <p className='text-center'>Interns</p>
                            </div>
                            <div className="sel-type">
                                <div className="select-typ1">
                                    <img src={gol} alt="" />
                                </div>
                                <p className='text-center'>Consultant</p>
                            </div>
                        </div>
                        <div className="arrow-btn">
                            <button><img src={arrows} alt="arrows" /></button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Managment