import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../css/homeStyles/HomeStyles.css";

export default function Home() {
    return (
        <div className="home">
            <h1>Home</h1>
        </div>
    );
};