import React, { useState, useEffect } from "react";
import { ToDoListProps } from "./interfaces/listProp";
import axios, { all } from "axios";
import { InputText } from "./component/Input";
import { EditInput } from "./component/EditInput";
import { CheckBox } from "./component/CheckBox";
import { ProgressBar } from "./component/ProgessBar";
import { ProgressBarBack } from "./component/ProgressBarBack";
import { AiOutlineCheck } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import "./App.css";

const App = () => {
  const [lists, setLists] = useState<ToDoListProps["ToDoList"]>([]);
  const [text, setText] = useState("");
  const [clickedButton, setClickedButton] = useState("");
  const [fetchToggle, setFetchToggle] = useState(false);
  const [updateId, setUpdateId] = useState({});
  const [updateToggle, setUpdateToggle] = useState(false);
  const [updateData, setUpdateData] = useState<string | {}>({});
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [checked, setChecked] = useState(false);
  const [radioState, setRadioState] = useState("off");
  const [dropDown, setDropDown] = useState(false);
  const [doneTasks, setDonetasks] = useState(0);
  const [widthTask, setWidthTask] = useState(0);
  const [dropDownStatus, setDropDownStatus] = useState("All");
  const [opacity, setOpacity] = useState("1");
  const [margin, setMargin] = useState("0px");

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const button: HTMLButtonElement = event.currentTarget;
    setClickedButton(button.name);
    createList(text);
  };

  const updateFunc = (selectedId: string) => {
    // setUpdateId(updateId)
    const selecetedId = lists.filter((list) => list.id === selectedId);
    setUpdateId(selecetedId[0]);
    setId(selecetedId[0].id);
    setTitle(selecetedId[0].title);
  };

  const handleOnChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const _input = event.target.value;
    const _updateData = { ...updateId, title: _input };
    const _titleUpdate = _updateData.title;
    setUpdateTitle(_titleUpdate);
    setUpdateData(_updateData);
  };

  const handleNoInput = (title: string) => {
    const _updateData = { ...updateId, title: title };
    const _titleUpdate = _updateData.title;
    setUpdateTitle(_titleUpdate);
  };

  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("radio on change... ");
    event.preventDefault();
    const _radio = event.target.value;
    setRadioState(event.target.value);

    console.log("event.target.value>>", _radio);
    console.log("radioState>>>", radioState);
  };

  const markDone = (listId: string) => {
    const findMarkId = lists.filter((r) => r.id === listId);
    console.log("findMarkId>>", findMarkId);
    const setDone = { ...findMarkId[0], completed: true };
    console.log("setDone", setDone);

    let data = JSON.stringify({
      title: setDone.title,
      completed: setDone.completed,
    });

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `http://localhost:3001/todos/${listId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log("mark done>>", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setFetchToggle(!fetchToggle);
    console.log("Mark done completed!");
  };

  //Create
  const createList = (text: string) => {
    console.log("createList is working...");
    if (text) {
      let _id = (Math.random() * 100000000).toFixed(0);
      let data = JSON.stringify({
        id: _id,
        title: text,
        completed: false,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:3001/todos",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response: any) => {
          // console.log("create data>>", response.data);
        })
        .catch((error: any) => {
          console.log(error);
        });
    } else {
      alert("Please add todo...");
    }
    setFetchToggle(!fetchToggle);
  };

  //Delete
  const Delete = (deleteId: string) => {
    console.log("Deleting ...", deleteId);
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `http://localhost:3001/todos/${deleteId}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log("delete>>", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setFetchToggle(!fetchToggle);
    console.log("Delete complete!!");
  };

  //Update
  const update = (updateID: string) => {
    let _data = {};
    if (title === updateTitle) {
      return (_data = updateId);
    } else {
      _data = updateData;
    }
    let data = JSON.stringify(_data);

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `http://localhost:3001/todos/${updateID}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log("update resposne>>", response.data);
        setFetchToggle(!fetchToggle);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("Update completed");
  };

  //Click All
  const clickAll = () => {
    let data = "";
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3001/todos",
      headers: {},
      data: data,
    };
    axios
      .request(config)
      .then((response: any) => {
        // console.log("res.data=>>", response.data);
        setLists(response.data);
        setFetchToggle(!fetchToggle);
      })
      .catch((error: any) => {
        console.log("error>>", error);
      });
  };

  //Click Done
  const clickDone = () => {
    let data = "";
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3001/todos",
      headers: {},
      data: data,
    };
    setOpacity("0");
    axios
      .request(config)
      .then((response: any) => {
        console.log("res.data=>>", response.data);
        const fetchData = response.data;
        const doneList = fetchData.filter(
          (list: { completed: boolean }) => list.completed === true
        );
        setLists(doneList);
        setOpacity("1");
      })

      .catch((error: any) => {
        console.log("error>>", error);
      });
  };

  //Click Undone
  const clickUndone = () => {
    let data = "";
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3001/todos",
      headers: {},
      data: data,
    };
    setOpacity("0");
    axios
      .request(config)
      .then((response: any) => {
        console.log("res.data=>>", response.data);
        const fetchData = response.data;
        const unDoneList = fetchData.filter(
          (list: { completed: boolean }) => list.completed === false
        );
        setLists(unDoneList);
        setOpacity("1");
      })

      .catch((error: any) => {
        console.log("error>>", error);
      });
  };

  // Fecthing Radio
  useEffect(() => {
    const _isSame = radioState === "on" ? true : false;
    console.log("_isSame>>", _isSame);
    console.log("checked>>", checked);
    console.log("radioState>>>", radioState);
    setChecked(_isSame);
  }, [radioState]);

  // Fetching when click
  useEffect(() => {
    let data = "";
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3001/todos",
      headers: {},
      data: data,
    };
    setOpacity("0");
    axios
      .request(config)
      .then((response: any) => {
        // console.log("res.data=>>", response.data);
        setLists(response.data);
        setOpacity("1");
      })
      .catch((error: any) => {
        console.log("error>>", error);
      });
  }, [clickedButton, fetchToggle]);

  // Fecthing ProgressBar
  useEffect(() => {
    let data = "";
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3001/todos",
      headers: {},
      data: data,
    };
    axios
      .request(config)
      .then((response: any) => {
        // console.log("res.data=>>", response.data);
        const allList = response.data;
        const _doneTasks = allList.filter(
          (list: { completed: boolean }) => list.completed === true
        ).length;
        const allTasks = allList.length;
        const donePercent = ((_doneTasks / allTasks) * 100).toFixed(2);
        const widthTask = Number(donePercent) * 450 * 0.01;
        setDonetasks(_doneTasks);
        setWidthTask(widthTask);
        // setLists(response.data);
      })
      .catch((error: any) => {
        console.log("error>>", error);
      });

    // console.log("lists>>>.", lists);
  }, [fetchToggle, []]);

  return (
    <div className="container">
      <div className="progrees-bar">
        Progress
        <div className="bar-container">
          <div className="barStatus">
            <ProgressBar
              styles={{
                height: "7px",
                width: `${widthTask}px`,
                backgroundColor: "white",
                borderRadius: "5px",
                transitionDuration: "2s",
              }}
            />
          </div>
          <div className="barBack">
            <ProgressBarBack
              styles={{
                height: "7px",
                width: "450px",
                backgroundColor: "black",
                borderRadius: "5px",
              }}
            />
          </div>
        </div>
        <div className="completed-status">{doneTasks} completed</div>
      </div>

      <div className="drop-down-filter">
        {" "}
        <div className="task-header">Tasks</div>
        <div className="drop-down-filter-content">
          <div className="">{dropDownStatus}</div>{" "}
          <div
            className="downLine"
            onClick={() => {
              setDropDown(!dropDown);
            }}
          >
            <RiArrowDropDownLine />
          </div>
        </div>
      </div>
      <div className="selector"></div>
      {dropDown && (
        <div className="optionAll" style={{ opacity: "1", marginTop: "2px" }}>
          <div
            className="option1"
            onClick={() => {
              setDropDown(!dropDown);
              clickAll();
              setDropDownStatus("All");
            }}
          >
            All
          </div>
          <div
            className="option2"
            onClick={() => {
              setDropDown(!dropDown);
              clickDone();
              setDropDownStatus("Done");
            }}
          >
            Done
          </div>
          <div
            className="option3"
            onClick={() => {
              setDropDown(!dropDown);
              clickUndone();
              setDropDownStatus("Undone");
            }}
          >
            Undone
          </div>
        </div>
      )}

      <div
        className="lists"
        style={{ opacity: opacity, transitionDuration: "1s" }}
      >
        {lists.map((lists) => (
          <div className="list-items">
            <div className="inside-list">
              <div className="title">
                <div
                  className="checkBox"
                  onClick={() => {
                    setId(lists.id);
                    markDone(lists.id);
                  }}
                >
                  <CheckBox
                    handleOnChange={handleChangeRadio}
                    type="radio"
                    checked={lists.completed}
                    styles={{
                      height: "25px",
                      width: "25px",
                      outline: "none",
                      display: "inline-block",
                      transitionDuration: "0.5s",
                    }}
                  />
                </div>{" "}
                {lists.completed === true ? (
                  <div className="checkIcon">
                    <AiOutlineCheck />
                  </div>
                ) : (
                  ""
                )}
                {lists.completed === true ? (
                  <span className="lineThroughText">{lists.title}</span>
                ) : (
                  <span>{lists.title}</span>
                )}
              </div>
              <div className="drop-down">
                <div
                  className="dot"
                  onClick={() => {
                    setIsOpenEdit(!isOpenEdit);
                    // setUpdateToggle(!updateToggle);
                    updateFunc(lists.id);
                  }}
                >
                  ...
                </div>
                {isOpenEdit && lists.id === id && (
                  <div className="drop-down-content">
                    <div className="edit-delete">
                      <div
                        className="edit"
                        onClick={() => {
                          {
                            setUpdateToggle(true);
                            setIsOpenEdit(false);
                            handleNoInput(lists.title);
                          }
                        }}
                      >
                        Edit
                      </div>
                      <div
                        className="button"
                        onClick={() => {
                          Delete(lists.id);
                          setIsOpenEdit(false);
                        }}
                      >
                        <span className="delete">Delete</span>
                      </div>
                    </div>
                  </div>
                )}
                {updateToggle && lists.id === id && (
                  <div className="edit-text">
                    <div className="editInput">
                      <EditInput
                        defualtValue={lists.title}
                        handleChange={handleOnChangeForm}
                        styles={{
                          height: "39px",
                          padding: "0px",
                          borderRadius: "20px",
                          paddingLeft: "20px",
                          width: "540px",
                          borderColor: "white",
                          fontSize: "medium",
                          border: "0px",
                          color: "black",
                        }}
                      />
                    </div>
                    <div
                      className="saveButton"
                      onClick={() => {
                        setUpdateToggle(false);
                        update(lists.id);
                      }}
                    >
                      Save
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="inputText">
        <InputText
          placeholder=""
          value={text}
          handleChange={(event) => setText(event.target.value)}
          styles={{
            height: "39px",
            padding: "0px",
            borderRadius: "20px",
            paddingLeft: "10px",
            width: "540px",
          }}
        />
      </div>

      <form>
        <button onClick={buttonHandler} className="button" name={text}>
          <div className="add-button">Add</div>
        </button>
      </form>
    </div>
  );
};

export default App;
