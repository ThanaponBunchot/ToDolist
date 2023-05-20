import React, { useState, useEffect } from "react";
import { ToDoListProps } from "./interfaces/listProp";
import axios from "axios";
import { InputText } from "./component/Input";
import { EditInput } from "./component/EditInput";
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
  // console.log("list[0].title>>", lists[0]?.title);
  const handleNoInput = (title: string) => {
    const _updateData = { ...updateId, title: title };
    const _titleUpdate = _updateData.title;
    setUpdateTitle(_titleUpdate);
  };
  // Fetching
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
        setLists(response.data);
      })
      .catch((error: any) => {
        console.log("error>>", error);
      });
  }, [clickedButton, fetchToggle]);
  // console.log(text);
  // console.log("clickButton>>", clickedButton);

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

  useEffect(() => {}, []);

  return (
    <div className="container">
      <div className="progrees-bar">Progress bar</div>
      <div className="task-header">Tasks</div>
      <div className="lists">
        {lists.map((lists) => (
          <div className="list-items">
            <div className="inside-list">
              <div className="title"> {lists.title}</div>
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
                      <div className="button" onClick={() => Delete(lists.id)}>
                        Delete
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
          Add list
        </button>
      </form>
    </div>
  );
};

export default App;
