import React from "react";

import './Header.css';

export class Header extends React.Component {

    render() {
        return (
            <div className="header page-block">
                <h1>Лабораторная работа №4</h1>

                по дисциплине

                <h2>Web-программирование</h2>

                <div className="header-details">
                    <strong>Лысенко Иван Владимирович</strong><br />
                    <strong>Соколова Анастасия Денисовна</strong><br />
                    Группа: <strong>P3201</strong><br />
                    Вариант: <strong>20133</strong>
                </div>
            </div>
        );
    }
}
