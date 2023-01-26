import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function LayoutDashboard({children}) {
  const [cookies, removeCookie] = useCookies(["token"]);
  let navigate = useNavigate();
  return(
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
        </div>
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarCenteredExample" aria-controls="navbarCenteredExample" aria-expanded="false" aria-label="Toggle navigation">
            <i className="fas fa-bars" />
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="navbarCenteredExample">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/dashboard">
                  <img src="https://maccaeducation.id/assets/page/images/logo-light.png" style={{width:"120px"}} />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/users">Users</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/class">Class</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/courses">Courses</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/questions">Questions</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/schedulers">Schedules</a>
              </li>
              {/* <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <a className="dropdown-item" href="#">Something else here</a>
                  </li>
                </ul>
              </li> */}
            </ul>
          </div>
        </div>
        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <a onClick={ ()=>{
                  removeCookie("token");
                  navigate("/login", { replace: true });
                }} className="nav-link active" style={{cursor: "pointer"}} >Logout</a>
            </li>
          </ul>
        </div>
      </nav>
      
      <div className="container">
        {children}
      </div>
    </>
  );
}
