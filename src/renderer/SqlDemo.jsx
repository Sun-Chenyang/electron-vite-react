import { Button, Input } from "antd";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import styles from "./App.module.less";
import reactLogo from "./assets/react.svg";
import { addFavlist, allFavlists, deleteFavlist } from "./electron";

const SqlDemo = () => {
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
    <div className={styles.sql}>
      <div>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img
            src={reactLogo}
            className={classNames(styles.logo, styles.react)}
            alt="React logo"
          />
        </a>
      </div>
      <div className={styles.row}>
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
          className={styles.button}
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
          <div key={e.id} className={styles.row}>
            <div className={styles.title}>{e.title}</div>
            <Button
              className={styles.button}
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
};

export default SqlDemo;
