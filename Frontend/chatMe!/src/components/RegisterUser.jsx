import { Card, Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { Navigate, useLoaderData, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";



function RegisterUser() {


  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });



  // console.log(formData)

  const changeFunction = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const RegisterData = async (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/api/v1/user/registerUser", formData)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data.message);
          navigate("/Login")

        } else {
          console.log(response.data.message);
        }
      })
      .catch(error => {
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
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={RegisterData}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Username
            </Typography>
            <Input
              size="lg"
              name="username"
              value={formData.username || ""}
              onChange={changeFunction}
              placeholder="Username"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              name="email"
              placeholder="name@mail.com"
              value={formData.email || ""}
              onChange={changeFunction}
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
            sign up
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link to="/Login" className="font-medium text-gray-900">
              Login to your account
            </Link>
          </Typography>
        </form>
      </Card>
    </div>

  );
}

export default RegisterUser;
