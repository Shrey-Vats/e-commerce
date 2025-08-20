import { useEffect, useState } from "react";
import axios from "axios";
import {  useSearchParams, useNavigate  } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import LoopIcon from "@mui/icons-material/Loop";

const BaseUrl = "http://localhost:3000";
function EmailVerificationStatus() {
  const [isValidToken, setIsValidToken] = useState<boolean>(false);
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  const navigation = useNavigate();
  const id = searchParams.get("id");
  console.log(id)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${BaseUrl}/auth/emailverification-status?id=${id}`
      );

      setIsValidToken(response.data.success);
      setIsEmailVerified(response.data.IsVerified);

      if (response.data.IsVerified) {
        navigation("/")
      }
    };

    console.log(fetchData);

    const timer = setInterval(() => {
      fetchData();
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
      <div className="h-2/4 w-3/4 bg-gray-300 flex items-center justify-center sm:w-1/2 md:w-1/3 lg:w-1/4 flex-col p-5 rounded-2xl">
        {!isValidToken ? (
          <>
            <CancelIcon color="primary" fontSize="large" className="mb-5"/>
            <h1 className="text-3xl font-bold text-gray-800">
              {" "}
              Unauthorize Person
            </h1>
            <p className="text-sm font-normal self-center text-gray-400">
              Please try again after some time
            </p>
          </>
        ) : (
          <>
            <LoopIcon color="primary" fontSize="large" className="mb-5" />
            <h1 className="text-3xl font-bold text-gray-800">Email {isEmailVerified ? "verified" : "not verified"}</h1>
            <p>To verify. please check your email</p>
          </>
        )}
      </div>
    </div>
  );
}

export default EmailVerificationStatus;
