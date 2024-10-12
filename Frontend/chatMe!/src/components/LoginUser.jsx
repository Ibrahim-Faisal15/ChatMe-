import React from "react";
import { Card, Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { Navigate, useLoaderData, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function LoginUser() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });



  const changeFunction = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const LoginUser = async (e) => {
    e.preventDefault();

    axios
      .post("/api/v1/user/login", formData)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data.message);
          navigate("/chats");
        } else {
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error("Server error:", error.response.data.message);
        } else if (error.request) {
          console.error("Network error or no response received:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      });
  };
  return (
    <div className="flex justify-center items-center flex-col h-[90vh]">
      <div className="header">
        <img src="public\logoIMG.png" alt="Logo" className="h-56" />
      </div>
      <Card color="transparent" shadow={false} className="justify-center">
        <Typography variant="h4" color="blue-gray">
          Login!
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to Login.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={LoginUser}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Username or Email
            </Typography>
            <Input
              size="lg"
              name="username"
              value={formData.username || ""}
              onChange={changeFunction}
              placeholder="Username or Email"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Password
            </Typography>
            <Input
              type="password"
              name="password"
              size="lg"
              value={formData.password || ""}
              onChange={changeFunction}
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <Button className="mt-6" fullWidth type="submit">
            Login
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            New here?{" "}
            <Link to="/Register" className="font-medium text-gray-900">
              Register your account
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
