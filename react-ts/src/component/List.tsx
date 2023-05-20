import React, { FC, useState, useEffect } from "react";
import { ToDoListProps } from "../interfaces/listProp";
import axios from "axios";

const List: FC<ToDoListProps> = ({ ToDoList }) => {
  const [lists, setLists] = useState<ToDoListProps["ToDoList"]>([]);

  
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
        console.log("res.data=>>", response.data);
        setLists(response.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <div className="lists">
        {lists.map((lists) => (
          <div className="list-items">{lists.title}</div>
        ))}
      </div>
    </div>
  );
};
export default List;
