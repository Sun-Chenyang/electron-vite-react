import { useState, useEffect } from "react";
import { Input, Button } from "antd";
import { allFavlists, addFavlist, deleteFavlist, electronMessage } from "./electron";
import reactLogo from "./assets/react.svg";
import "antd/dist/antd.css";
import "./App.less";

function App() {
  const [list, setList] = useState([]);
  const [keyword, setKeyword] = useState();

  const fetch = () => {
    allFavlists().then((res) => {
      console.log("res: ", res);
      setList(res);
    });
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="App">
      <div>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="row1">
        <Input
          value={keyword}
          onChange={(e) => {
            console.log("e: ", e);
            const value = e?.target?.value;
            setKeyword(value);
          }}
          placeholder="请输入内容"
        />
        <Button
          className="button"
          type="primary"
          onClick={() => {
            if (keyword)
              addFavlist(keyword).then(() => {
                console.log("添加成功!: ");
                setKeyword();
                fetch();
              });
          }}
        >
          添加
        </Button>
      </div>

      {list.map((e) => {
        return (
          <div className="row">
            <div className="title">{e.title}</div>
            <Button
              className="button"
              onClick={() => {
                deleteFavlist(e.id).then(() => {
                  fetch();
                });
              }}
              danger
            >
              删除
            </Button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
