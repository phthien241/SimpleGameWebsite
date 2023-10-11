import React, { useEffect, useState } from "react";
import "./Social.scss";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import user_ava from '../../assets/images/user_ava.png'

function Social() {
  const [formData, setFormData] = useState({
    email: "",
    content: "",
    fname: "",
    lname: "",
  });

  const [newfeeds, setNewfeeds] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/newfeeds/get-newfeeds`)
      .then((response) => {
        const formattedData = response.data.map((item) => ({
          ...item,
          createdAt:
            new Date(item.createdAt).toLocaleDateString() +
            " " +
            new Date(item.createdAt).toLocaleTimeString(),
        }));
        setNewfeeds(formattedData);
      })
      .catch((err) => {
        console.log("there is an error");
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      email: localStorage.getItem("email"),
      fname: localStorage.getItem("fname"),
      lname: localStorage.getItem("lname"),
    });
  };

  const handleSubmitNewfeed = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/newfeeds/post-newfeeds`,
        formData
      )
      .then((response) => {
        setFormData({
          email: "",
          content: "",
          fname: "",
          lname: "",
        });
        console.log("Post newfeed successfully");
      })
      .catch((err) => {
        console.log("Some errors occur");
      });
  };
  return (
    <>
      <Navbar></Navbar>
      <div class="grid grid-cols-4 gap-4 mt-8">
        <div className="col-span-1 relative">
          <div className="sticky top-0">
            <div className="p-4 hover:bg-gray-200 cursor-pointer">Home</div>
            <div className="p-4 hover:bg-gray-200 cursor-pointer">Friends</div>
            <div className="p-4 hover:bg-gray-200 cursor-pointer">Games</div>
            <div className="p-4 hover:bg-gray-200 cursor-pointer">Contact</div>
            <div className="p-4 hover:bg-gray-200 cursor-pointer">LogOut</div>
          </div>
        </div>
        <div class="social-newfeed col-span-2 p-4">
          <div>
            {newfeeds.slice().reverse().map((newfeed, index) => (
              <div key={index}>
                <div class="max-w-xl mx-auto mb-10 p-4 bg-white rounded-lg shadow-md">
                  <div class="flex items-center space-x-4">
                    <img
                      class="h-12 w-12 rounded-full"
                      src={user_ava}
                      alt="Profile"
                    />
                    <div>
                      <h3 class="font-semibold text-lg">
                        {newfeed.fname} {newfeed.lname}
                      </h3>
                      <p class="text-gray-500 text-sm">{newfeed.createdAt}</p>
                    </div>
                  </div>
                  <div class="mt-3 text-gray-700">{newfeed.content}</div>
                  <div class="mt-4 flex justify-between">
                    <button class="text-blue-500 hover:underline">Like</button>
                    <button class="text-blue-500 hover:underline">
                      Comment
                    </button>
                    <button class="text-blue-500 hover:underline">Share</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div class="col-span-1">
          <div className="wrap-input mx-auto sticky top-0">
            <form onSubmit={handleSubmitNewfeed}>
              <textarea
                className="block mx-auto rounded-2xl h-48"
                placeholder="What are you thinking...?"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
              />
              <button
                className="bg-blue-500 mt-8 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Social;
