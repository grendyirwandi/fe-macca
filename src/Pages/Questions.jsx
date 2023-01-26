import axios from "axios";
import React, { useEffect, useState } from "react";
import LayoutDashboard from "../Components/layoutDashboard";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Questions() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [kelas, setKelas] = useState([]);
  const [courses, setCourse] = useState([]);
  const inputArr = [{id: 1, value: ""}];
  const [arr, setArr] = useState(inputArr);
  const initData = {quest: "", answer: "", options: [], courseCode: "", classCode:""}
  const [data, setData] = useState(initData);
  const [cookies, removeCookie] = useCookies(["token"]);
  const addInput = () => {
    setArr(s => {
      return [
        ...s,
        {
          value: ""
        }
      ];
    });
  };
  const delInput = () => {
    if (arr.length > 1){
      setArr(s => {
        return s.slice(0, -1);
      });
    }
  };
  const check=()=>{
    console.log(arr);
    console.log(arr.length);
  }
  const handleChange = e => {
    e.preventDefault();

    const index = e.target.id;
    setArr(s => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;

      return newArr;
    });
  };
  useEffect(() => {
    document.title = 'Questions - Macca Education';
    axios
      .get("questions")
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
      axios
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
    if (data._id) {
      let obj = {...data}
      delete obj._id
      obj.options = arr
      return axios
        .put("questions/"+data._id, obj)
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
      data.options = arr
      return axios
        .post("questions", data)
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
      .delete("questions/"+idUser)
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
          <div className="col-6"><h4>List Question</h4></div>
          <div className="col-6"><button type="button" className="btn btn-primary float-right mb-2" data-toggle="modal" data-target="#addUsers">Add</button></div>
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Course Code</th>
              <th scope="col">Class Code</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={i}>
                <th scope="row">{i+1}</th>
                <td>{user.courseCode}</td>
                <td>{user.classCode}</td>
                <td>
                  <button className="btn btn-sm btn-warning mr-2" onClick={(e)=>{setData(user)}} data-toggle="modal" data-target="#addUsers">Edit</button>
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
              <h5 className="modal-title" id="exampleModalLabel">{ data._id ?"Edit Course": "Add Course"}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
            <form id="addUser" onSubmit={handleSubmitAddUser}>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="quest">Question</label>
                  <input type="text" className="form-control" id="quest"
                  onChange={(e) => setData({ ...data, quest: e.target.value })}
                  value={data.quest} />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="answer">Answer</label>
                  <input type="text" className="form-control" id="answer"
                  onChange={(e) => setData({ ...data, answer: e.target.value })}
                  value={data.answer} />
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
              <div className="form-row">
                <div className="form-group col-md-10">
                  <label htmlFor="quest">Options</label>
                </div>
                <div className="form-group col-md-2">
                <button onClick={addInput} type="button" className="btn btn-sm btn-primary float-right font-weight-bold">+</button>
                <button onClick={delInput} type="button" className="btn btn-sm btn-danger float-right font-weight-bold">-</button>
                <button onClick={check} type="button" className="btn btn-sm btn-danger float-right font-weight-bold">C</button>
                </div>{
                  arr.map((item, i) => {
                    return (
                      <div key={i} className="form-group col-md-10">
                        <input type="text" className="form-control"
                        onChange={handleChange}
                        value={item.value}
                        id={i}
                        />
                      </div>
                    )
                  })
                }
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
