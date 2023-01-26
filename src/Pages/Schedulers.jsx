import axios from "axios";
import React, { useEffect, useState } from "react";
import LayoutDashboard from "../Components/layoutDashboard";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import moment from "moment/moment";
import { axiosInstance } from "../store/Helpers";

export default function Schedulers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [kelas, setKelas] = useState([]);
  const [courses, setCourse] = useState([]);
  const initData = {name: "", start: "", end: "", classCode: "", courseCode: ""}
  const [data, setData] = useState(initData);
  const [cookies, removeCookie] = useCookies(["token"]);
  const clearData = () => {
    setData({ ...initData });
  };
  
  useEffect(() => {
    document.title = 'Schedulers - Macca Education';
    axiosInstance
      .get("schedulers")
      .then((resp) => {
        setUsers(resp.data.result);
      })
      .catch((e) => {
        if (e.response.statusText != "ok") alert(e.response.data.message);
        if (e.response.status == 401) {
          navigate("/login", { replace: true })
          removeCookie("token");
        };
      });
    axiosInstance
      .get("classes")
      .then((resp) => {
        setKelas(resp.data.result);
      })
      .catch((e) => {
        if (e.response.statusText != "ok") alert(e.response.data.message);
        if (e.response.status == 401) {
          navigate("/login", { replace: true })
          removeCookie("token");
        };
      });
    axiosInstance
      .get("courses")
      .then((resp) => {
        setCourse(resp.data.result);
      })
      .catch((e) => {
        if (e.response.statusText != "ok") alert(e.response.data.message);
        if (e.response.status == 401) {
          navigate("/login", { replace: true })
          removeCookie("token");
        };
      });
    return () => {};
  }, []);
  
  const handleSubmitAddUser = async (e) => {
    e.preventDefault();
    let obj = {...data};
    obj.start = moment(obj.start, "DD-MM-YYYY HH:mm:ss", true).format('x')
    obj.end = moment(obj.end, "DD-MM-YYYY HH:mm:ss", true).format('x')
    return axios
      .post("schedulers", obj)
      .then(async (respon) => {
        alert("Berhasil menambah data!")
        navigate(0);
      })
      .catch((err) => {
        alert("Error: "+err.response.data.message);
        if (e.response.statusText != "ok") alert(e.response.data.message);
        if (e.response.status == 401) {
          navigate("/login", { replace: true })
          removeCookie("token");
        };
      });
  };

  const deleteUser = async (idUser)=>{
    return axios
      .delete("schedulers/"+idUser)
      .then(async (respon) => {
        alert("Berhasil menghapus data!")
        navigate(0);
      })
      .catch((err) => {
        alert("Error: "+err.response.data.message);
        if (e.response.statusText != "ok") alert(e.response.data.message);
        if (e.response.status == 401) {
          navigate("/login", { replace: true })
          removeCookie("token");
        };
      });
  }

  return(
    <LayoutDashboard>
      <div className="container">
        <div className="row mt-4">
          <div className="col-6"><h4>List Schedule</h4></div>
          <div className="col-6"><button type="button" className="btn btn-primary float-right mb-2" data-toggle="modal" data-target="#addUsers" onClick={()=>clearData()}>Add</button></div>
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Start</th>
              <th scope="col">End</th>
              <th scope="col">Class Code</th>
              <th scope="col">Course Code</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={i}>
                <th scope="row">{i+1}</th>
                <td>{user.name}</td>
                <td>{moment(user.start).format("DD-MM-YYYY HH:mm:ss")}</td>
                <td>{moment(user.end).format("DD-MM-YYYY HH:mm:ss")}</td>
                <td>{user.classCode}</td>
                <td>{user.courseCode}</td>
                <td>
                  <button className="btn btn-sm btn-danger" onClick={(e)=>deleteUser(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="modal fade" id="addUsers" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">{ data._id ?"Edit Schedule": "Add Schedule"}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
            <form id="addUser" onSubmit={handleSubmitAddUser}>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label htmlFor="name">Name</label>
                  <input type="text" className="form-control" id="name" placeholder="Ahmad" 
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  value={data.name} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="start">Start</label>
                  <input type="text" className="form-control" id="start" placeholder="example: 31-12-2023 19:57:58" 
                  onChange={(e) => setData({ ...data, start: e.target.value })}
                  value={data.start} />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="end">End</label>
                  <input type="text" className="form-control" id="end" placeholder="example: 31-12-2023 19:57:58" 
                  onChange={(e) => setData({ ...data, end: e.target.value })}
                  value={data.end} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="classCode">Class Code</label>
                  <select id="classCode" className="form-control" onChange={(e) => {setData({ ...data, classCode: e.target.value })}} value={data.classCode}>
                    <option value="">Select</option>
                    {kelas.map((kls, i) => (
                      <option key={i} value={kls.name +" - "+kls.classCode}>{kls.name +" - "+kls.classCode}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="courseCode">Course Code</label>
                  <select id="courseCode" className="form-control" onChange={(e) => {setData({ ...data, courseCode: e.target.value })}} value={data.courseCode}>
                    <option value="">Select</option>
                    {courses.map((course, i) => (
                      <option key={i} value={course.name +" - "+course.courseCode}>{course.name +" - "+course.courseCode}</option>
                    ))}
                  </select>
                </div>
              </div>
            </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" form="addUser" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </LayoutDashboard>
  );
}
