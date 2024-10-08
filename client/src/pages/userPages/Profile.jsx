import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { local_api_url } from '../../App.jsx';
import LogoutBtn from "../../components/LogoutBtn.jsx";
import "../../css/userStyles/accountFormStyles.css";
import "../../css/userStyles/ProfileStyles.css";

export default function Profile() {
    const userId = localStorage.getItem('userId');
    let { username } = useParams();

    username = username.toUpperCase();

    return (
        <>
            <h2>Welcome, {username}!</h2>
            <LogoutBtn />
        </>
    );
};