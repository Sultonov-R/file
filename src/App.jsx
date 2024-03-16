import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const nameRef = useRef("");
  const ageRef = useRef("");
  const [editId, setEditId] = useState(null);

  const count = useSelector((state) => state.count.count);
  console.log(count);
  let counter = 0;

  function handleClick(e) {
    e.preventDefault();

    if (nameRef.current.value) {
      let t = {
        id: Date.now(),
        name: nameRef.current.value,
        age: ageRef.current.value,
      };
      dispatch({ type: "Add", payload: t });
      nameRef.current.value = "";
      ageRef.current.value = "";
    }
  }

  function handleDelete(id) {
    dispatch({ type: "Delete", payload: id });
  }

  function handleUpgrade(id) {
    const newName = nameRef.current.value;
    const newAge = ageRef.current.value;
    if (newName && newAge) {
      dispatch({ type: "Upgrade", payload: { id, newName, newAge } });
      nameRef.current.value = "";
      ageRef.current.value = "";
      setEditId(null);
    }
  }

  function handleEdit(id, name, age) {
    nameRef.current.value = name;
    ageRef.current.value = age;
    setEditId(id);

    nameRef.current.value = "";
    ageRef.current.value = "";
  }

  return (
    <>
      <div className="container d-flex flex-column gap-3 justify-content-between">
        <form className="w-50 container p-4 d-flex flex-column gap-3 mt-4">
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            ref={nameRef}
          />
          <input
            type="number"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            ref={ageRef}
          />
          <button
            onClick={handleClick}
            type="button"
            className="btn btn-primary w-25"
          >
            Add
          </button>
        </form>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">N</th>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          {count.length > 0 &&
            count.map((el, index) => {
              counter++;

              return (
                <tbody key={index}>
                  <tr>
                    <th scope="row">{counter}</th>
                    <td>
                      {editId === el.id ? (
                        <input
                          type="text"
                          defaultValue={el.name}
                          ref={nameRef}
                        />
                      ) : (
                        el.name
                      )}
                    </td>
                    <td>
                      {editId === el.id ? (
                        <input
                          type="number"
                          defaultValue={el.age}
                          ref={ageRef}
                        />
                      ) : (
                        el.age
                      )}
                    </td>
                    <td
                      onClick={() => {
                        handleDelete(el.id);
                      }}
                      className=""
                      style={{ cursor: "pointer", color: "red" }}
                    >
                      Delete
                    </td>
                    <td
                      onClick={() => {
                        if (editId === el.id) {
                          handleUpgrade(el.id);
                        } else {
                          handleEdit(el.id, el.name, el.age);
                        }
                      }}
                      className="w-5"
                      style={{
                        cursor: "pointer",
                        color: editId === el.id ? "green" : "blue",
                      }}
                    >
                      {editId === el.id ? "Save" : "Edit"}
                    </td>
                  </tr>
                </tbody>
              );
            })}
        </table>
      </div>
    </>
  );
}

export default App;
