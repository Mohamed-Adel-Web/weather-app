/** @format */
import Container from "@mui/material/Container";
import { Button, Typography } from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/min/locales.min";
import "moment/dist/locale/ar";
import { useTranslation } from "react-i18next";
export default function Weather() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState("English");
  const [time, setTime] = useState("");
  const [weather, setWeather] = useState({
    temp: "",
    icon: "",
    description: "",
    min: "",
    max: "",
  });
  function handleLanguage() {
    if (lang === "Arabic") {
      setLang("English");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    } else if (lang === "English") {
      setLang("Arabic");
      i18n.changeLanguage("en");
      moment.locale("en");
    }
    setTime(moment().format("L"));
  }
  useEffect(() => {
    setTime(moment().format("L"));
    i18n.changeLanguage("ar");
  }, []);
  useEffect(() => {
    const abortController = new AbortController();
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=30.033333&lon=31.233334&appid=7e42cf1ad5147eda13d8264c1a96b6a8",
        {
          signal: abortController.signal,
        }
      )
      .then((response) => {
        setWeather({
          temp: Math.round(response.data.main.temp - 273),
          icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
          description: response.data.weather[0].description,
          min: Math.round(response.data.main.temp_min - 273),
          max: Math.round(response.data.main.temp_max - 273),
        });
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <>
      <Container
        maxWidth="sm"
        style={{
          background: "#0d47a1",
          color: "white",
          boxShadow: "0 7px 7px rgb(0,0,0,0.4)",
          padding: "1rem 2rem",
          borderRadius: "10px",
          direction: lang == "Arabic" ? "ltr" : "rtl",
        }}
      >
        <div className="weather-card">
          <div
            className="header"
            style={{
              display: "flex",
              alignItems: "flex-end",
              borderBottom: "1px solid white",
              width: "100%",
              paddingBottom: "0.2rem",
              fontWeight: "normal",
            }}
          >
            <Typography
              className="city-name"
              style={{ fontWeight: "bold" }}
              variant="h2"
            >
              {t("cairo")}
            </Typography>

            <Typography
              className="current-date"
              style={{ margin: "0 1rem" }}
              variant="h4"
            >
              {time}
            </Typography>
          </div>
          <div
            className="body"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="weather-temp-details">
              <div className="temp " style={{ display: "flex" }}>
                <Typography className="weather-temp" variant="h1">
                  {weather.temp}
                </Typography>
                <div className="weather-temp-icon">
                  <img src={weather.icon} alt="" />
                </div>
              </div>
              <Typography
                className="weather-description"
                style={{ fontSize: "2rem" }}
              >
                {t(weather.description)}
              </Typography>
              <Typography
                className="weather-range"
                style={{ marginTop: "1rem", fontWeight: "bold" }}
              >
                <span className="min">
                  {t("min")}: {weather.min}
                </span>
                <span className="spacer" style={{ margin: "0 0.5rem" }}>
                  |
                </span>
                <span className="max">
                  {t("max")}: {weather.max}
                </span>
              </Typography>
            </div>
            <div className="weather-icon">
              <CloudIcon style={{ fontSize: "12rem" }} />
            </div>
          </div>
        </div>
        <Button
          variant="text"
          style={{
            color: "white",
            position: "absolute",
            marginTop: "2rem",
            fontSize: "1rem",
            fontWeight: "bold",
            boxShadow: "0 7px 7px rgb(0,0,0,0.4)",
          }}
          value={lang}
          onClick={handleLanguage}
        >
          {lang}
        </Button>
      </Container>
    </>
  );
}
