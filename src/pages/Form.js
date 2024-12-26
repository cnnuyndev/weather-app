import React, { use } from "react";
import classNames from "classnames/bind";
import styles from "./Form.module.scss";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import moment from "moment";

const cx = classNames.bind(styles);
function index() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [searchText, setSearchText] = useState("da nang");

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [data, setData] = useState(null);

  const API_KEY = "665e0f614efddb3348b139a3432ad42d";

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${searchText}&appid=${API_KEY}&units=metric&lang=vi`
        );
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Lỗi:", error);
      }
    };

    fetchData();
  }, [searchText]);

  return (
    <div className={cx("container")}>
      <div className={cx("main-section")}>
        <div className={cx("search-bar")}>
          <FontAwesomeIcon
            className={cx("faSearch")}
            icon={faSearch}
          ></FontAwesomeIcon>
          <input
            type="text"
            name="search-city"
            id="search-input"
            placeholder="Tìm kiếm thành phố..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          ></input>
        </div>
        <div className={cx("info-wrapper")}>
          <p className={cx("city-name")}>{data?.name}</p>
          <p className={cx("weather-state")}>{data?.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
            alt="weather icon"
            className={cx("weather-icon")}
          ></img>
          <p className={cx("temperature")}>{Math.round(data?.main.temp)}</p>
        </div>
      </div>
      <div className={cx("additional-section")}>
        <div className={cx("row")}>
          <div className={cx("item")}>
            <div className={cx("label")}>MT Mọc</div>
            <div className={cx("value sunrise")}>
              {moment.unix(data?.sys.sunrise).format("H:mm")}
            </div>
          </div>
          <div className={cx("item")}>
            <div className={cx("label")}>MT Lặn</div>
            <div className={cx("value sunset")}>
              {moment.unix(data?.sys.sunset).format("H:mm")}
            </div>
          </div>
        </div>
        <div className={cx("row")}>
          <div className={cx("item")}>
            <div className={cx("label")}>Độ ẩm</div>
            <div className={cx("value")}>
              <span className={cx("humidity")}>{data?.wind.deg}</span>%
            </div>
          </div>
          <div className={cx("item")}>
            <div className={cx("label")}>Gió</div>
            <div className={cx("value")}>
              <span className={cx("wind-speed")}>
                {(data?.wind.speed * 3.6).toFixed(2)}
              </span>{" "}
              km/h
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
