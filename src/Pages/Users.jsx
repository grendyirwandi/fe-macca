import axios from "axios";
import React, { useEffect, useState } from "react";
import LayoutDashboard from "../Components/layoutDashboard";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [kelas, setKelas] = useState([]);
  const initData = { noRegis:"", fullName:"", role:"user", classCode:"", email: "", password: "" }
  const [data, setData] = useState(initData);
  const [cookies, removeCookie] = useCookies(["token"]);
  const clearData = () => {
    setData({ ...initData });
  };
  
  useEffect(() => {
    document.title = 'Users - Macca Education';
    axios
      .get("users")
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
    axios
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
    return () => {};
  }, []);
  
  const handleSubmitAddUser = async (e) => {
    e.preventDefault();
    if (data._id) {
      let obj = {...data}
      delete obj._id
      return axios
        .put("users/"+data._id, obj)
        .then(async (respon) => {
          alert("Berhasil mengedit data!")
          navigate(0);
        })
        .catch((err) => {
          console.log("msk sni",err);
          alert("Error: "+err.response.data.message);
          if (e.response.statusText != "ok") alert(e.response.data.message);
          if (e.response.status == 401) {
            navigate("/login", { replace: true })
            removeCookie("token");
          };
        });
    }else{
      return axios
        .post("users", data)
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
    }
  };

  const deleteUser = async (idUser)=>{
    return axios
      .delete("users/"+idUser)
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
          <div className="col-6"><h4>List User</h4></div>
          <div className="col-6"><button type="button" className="btn btn-primary float-right mb-2" data-toggle="modal" data-target="#addUsers" onClick={()=>clearData()}>Add</button></div>
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">No.Regis</th>
              <th scope="col">Name</th>
              <th scope="col">Role</th>
              <th scope="col">Email</th>
              <th scope="col">Class Code</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={i}>
                <th scope="row">{i+1}</th>
                <td>{user.noRegis}</td>
                <td>{user.fullName}</td>
                <td>{user.role}</td>
                <td>{user.email}</td>
                <td>{user.classCode}</td>
                <td>
                  <button className="btn btn-sm btn-warning mr-2" onClick={(e)=>{clearData(); setData(user);}} data-toggle="modal" data-target="#addUsers">Edit</button>
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
              <h5 className="modal-title" id="exampleModalLabel">{ data._id ?"Edit User": "Add User"}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
            <form id="addUser" onSubmit={handleSubmitAddUser}>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="noRegis">No.Regis</label>
                  <input type="text" className="form-control" id="noRegis" placeholder="0001"
                  onChange={(e) => setData({ ...data, noRegis: e.target.value })}
                  value={data.noRegis} />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="fullName">Name</label>
                  <input type="text" className="form-control" id="fullName" placeholder="Ahmad" 
                  onChange={(e) => setData({ ...data, fullName: e.target.value })}
                  value={data.fullName} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="role">Role</label>
                  <select id="role" className="form-control" onChange={(e) => setData({ ...data, role: e.target.value })} value={data.role}>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="email">Email</label>
                  <input type="text" className="form-control" id="email"
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  value={data.email} />
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
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" id="password"
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                  value={data.password} />
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
