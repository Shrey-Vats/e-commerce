import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { de } from "zod/v4/locales";

const BaseUrl = "http://localhost:3000";

const verifyEmail = () => {
    const {token} = useParams();
    const navigate = useNavigate();

    const [status, setStatus] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${BaseUrl}/auth/verify-email/${token}`);

            setStatus(response.data.success);
            setMessage(response.data.message);
        }

        fetchData();
    }, []);
    
    return (
        <div>
            
        </div>
    )
}

export default verifyEmail