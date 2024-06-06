import React, { useState } from 'react';
import areas from './areas.json'; // areas.json 파일 import
import './WeatherSearch.module.css';

const WeatherSearch = () => {
    const [category, setCategory] = useState(Object.keys(areas)[0]); // 카테고리 초기값 설정
    const [selectedArea, setSelectedArea] = useState(areas[Object.keys(areas)[0]][0]); // 세부 지역 초기값 설정
    const [weather, setWeather] = useState(null);
    const handleSearch = async () => {
        const apiKey = process.env.REACT_APP_API_KEY;
        const url = `http://openapi.seoul.go.kr:8088/${apiKey}/json/citydata/1/5/${selectedArea}`;
        const response = await fetch(url);
        const data = await response.json();
        setWeather(data.CITYDATA.WEATHER_STTS[0]);
        console.log(data.CITYDATA.WEATHER_STTS[0]); // 찍어서 확인해보세요
    };

    return (
        <div className="weather-container">
            <h1>날씨 정보</h1>
            <div className="category-buttons">
                {Object.keys(areas).map((key) => (
                    <button key={key} onClick={() => setCategory(key)}>
                        {key}
                    </button>
                ))}
            </div>
            <div className="search-box">
                <select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)}>
                    {areas[category].map((area, index) => (
                        <option key={index} value={area}>
                            {area}
                        </option>
                    ))}
                </select>
                <button onClick={handleSearch}>검색</button>
            </div>

            {weather && (
                <div className="weather-info">
                    <p>온도: {weather.TEMP}°C</p>
                    <p>체감 온도: {weather.SENSIBLE_TEMP}°C</p>
                    <p>최고 온도: {weather.MAX_TEMP}°C</p>
                    <p>최저 온도: {weather.MIN_TEMP}°C</p>
                    <p>미세먼지 상태: {weather.AIR_IDX}</p>
                    <p>습도: {weather.HUMIDITY}%</p>
                    <p>풍속: {weather.WIND_SPD} km/h</p>
                    <p>풍향: {weather.WIND_DIRCT}</p>
                    <p>강수량: {weather.PRECIPITATION} mm</p>
                    <p>날씨 상태: {weather.WEATHER_MSG}</p>
                </div>
            )}
        </div>
    );
};

export default WeatherSearch;
