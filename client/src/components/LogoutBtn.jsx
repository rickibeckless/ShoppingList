import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { local_api_url } from '../App.jsx';
import "../css/componentStyles/LogoutBtnStyles.css";

export default function LogoutBtn() {
    const navigate = useNavigate();

    return (
        <p>
            <button
                onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                    navigate('/login');
                }}
            >
                Logout
            </button>
        </p>
    );
};