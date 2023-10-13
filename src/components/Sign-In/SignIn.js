import React, { useState } from "react";
import "./SignIn.scss";
import logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDialog } from "../../Contexts/DialogProvider";

function SignIn() {
  const navigate = useNavigate();
  const { open, setOpen } = useDialog();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/users/sign-in`, formData)
      .then((response) => {
        setOpen(false);
        localStorage.setItem("email", formData.email);
        localStorage.setItem("fname",response.data.fname)
        localStorage.setItem("lname",response.data.lname)
        localStorage.setItem("bestScore",response.data.bestScore)
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="signin h-screen flex justify-center align-items">
        <div className="wrap-signin my-20 bg-white bg-opacity-90 rounded-lg">
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-24 w-auto"
                src={logo}
                alt="Your Company"
              />
              <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign In
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      onChange={handleInputChange}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      onChange={handleInputChange}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
            <p class="mt-10 text-center text-sm text-gray-500">
              Not a member?
              <Link
                to="/sign-up"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-2"
              >
                Sign Up
              </Link>
            </p>
            <p class="mt-4 text-center text-sm text-gray-500">
              Return to
              <Link
                to="/"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-2"
              >
                HomePage
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default SignIn;
