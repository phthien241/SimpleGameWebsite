import React from "react";
import "./Social.scss";
import Navbar from "../Navbar/Navbar";

function Social() {
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
          <div class="max-w-xl mx-auto mt-10 p-4 bg-white rounded-lg shadow-md">
            <div class="flex items-center space-x-4">
              <img
                class="h-12 w-12 rounded-full"
                src="profile-picture.jpg"
                alt="Profile"
              />
              <div>
                <h3 class="font-semibold text-lg">John Doe</h3>
                <p class="text-gray-500 text-sm">Just now</p>
              </div>
            </div>
            <div class="mt-3 text-gray-700">
              Just checked into this amazing place! #VacationVibes
            </div>
            <div class="mt-4 flex justify-between">
              <button class="text-blue-500 hover:underline">Like</button>
              <button class="text-blue-500 hover:underline">Comment</button>
              <button class="text-blue-500 hover:underline">Share</button>
            </div>
          </div>

          <div class="max-w-xl mx-auto mt-10 p-4 bg-white rounded-lg shadow-md">
            <div class="flex items-center space-x-4">
              <img
                class="h-12 w-12 rounded-full"
                src="profile-picture.jpg"
                alt="Profile"
              />
              <div>
                <h3 class="font-semibold text-lg">John Doe</h3>
                <p class="text-gray-500 text-sm">Just now</p>
              </div>
            </div>
            <div class="mt-3 text-gray-700">
              Just checked into this amazing place! #VacationVibes
            </div>
            <div class="mt-4 flex justify-between">
              <button class="text-blue-500 hover:underline">Like</button>
              <button class="text-blue-500 hover:underline">Comment</button>
              <button class="text-blue-500 hover:underline">Share</button>
            </div>
          </div>
        </div>
        <div class="col-span-1 p-4">2/3 Width</div>
      </div>
    </>
  );
}

export default Social;
