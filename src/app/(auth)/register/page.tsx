"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
interface AvatarFile {
  name: string;

  // Add more properties as needed
}
function Register() {
  const router = useRouter();

  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState<AvatarFile | null>(null); // State to hold the selected file
 const [Files,setFile]=useState(false);
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const handleClearFile = () => {
    setAvatar(null);
    setFile(false);
    // Clear the selected file
  };


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setAvatar(file);
    console.log(avatar)
    setFile(true);
  };

  const handleSubmit = async () => {
    if (!checked) {
      toast.error("Please agree to Terms & Conditions", { duration: 1300 });
      return;
    }
    if (!email || !password || !firstName || !lastName || !avatar) {
      toast.error("All fields are required", { duration: 1300 });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("avatar", avatar as unknown as Blob, avatar.name); // Append the file to FormData
      formData.append("email", email);
      formData.append("password", password);
      formData.append("name", `${firstName} ${lastName}`);

      const response = await axios.post("/api/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(response.data.message);
      router.push("/login");
    } catch (error) {
      toast.error(error.message, { duration: 1300 });
    }
  };


  return (
      <div className="bg-[#eef2f6] h-screen w-screen flex justify-center items-center">
        <Toaster />
        <div className="bg-[#ffffff] w-[28rem] flex items-center m-8 rounded-xl justify-around flex-col">
          <div className="mt-5">
            <svg
                width="92"
                height="32"
                viewBox="0 0 92 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  d="M33.085 26.4841V12.3839H37.9541C39.6408 12.3839 40.9202 12.7131 41.7922 13.3717C42.6642 14.0237 43.1002 14.9825 43.1002 16.2478C43.1002 16.9387 42.9251 17.5488 42.5751 18.0782C42.225 18.6011 41.7381 18.9853 41.1143 19.2306C41.8272 19.4114 42.3873 19.7761 42.7947 20.3249C43.2084 20.8737 43.4152 21.5452 43.4152 22.3392C43.4152 23.695 42.9888 24.7215 42.1359 25.4188C41.283 26.1161 40.0673 26.4712 38.4888 26.4841H33.085ZM35.9492 20.3443V24.1502H38.4028C39.0775 24.1502 39.6026 23.9888 39.9781 23.666C40.36 23.3367 40.551 22.8848 40.551 22.3102C40.551 21.0189 39.8922 20.3637 38.5747 20.3443H35.9492ZM35.9492 18.2912H38.0687C39.5135 18.2654 40.236 17.6811 40.236 16.5384C40.236 15.8992 40.0514 15.4408 39.6822 15.1632C39.3194 14.8792 38.7434 14.7371 37.9541 14.7371H35.9492V18.2912ZM53.9365 20.3733H48.4371V24.1502H54.8913V26.4841H45.573V12.3839H54.8723V14.7371H48.4371V18.0976H53.9365V20.3733ZM61.7175 21.3224H59.436V26.4841H56.5717V12.3839H61.7365C63.379 12.3839 64.6455 12.7551 65.5365 13.4975C66.4276 14.24 66.8734 15.2891 66.8734 16.6449C66.8734 17.6069 66.6661 18.4107 66.2527 19.0563C65.8455 19.6954 65.2248 20.2055 64.3907 20.5864L67.3985 26.3485V26.4841H64.3242L61.7175 21.3224ZM59.436 18.9691H61.746C62.4656 18.9691 63.0226 18.7851 63.417 18.4172C63.8114 18.0427 64.0092 17.5294 64.0092 16.8773C64.0092 16.2124 63.8214 15.6894 63.4455 15.3085C63.0768 14.9276 62.5069 14.7371 61.7365 14.7371H59.436V18.9691ZM74.2058 21.3224H71.9237V26.4841H69.0594V12.3839H74.2248C75.8667 12.3839 77.1337 12.7551 78.0248 13.4975C78.9159 14.24 79.3611 15.2891 79.3611 16.6449C79.3611 17.6069 79.1544 18.4107 78.7404 19.0563C78.3332 19.6954 77.7125 20.2055 76.879 20.5864L79.8863 26.3485V26.4841H76.8119L74.2058 21.3224ZM71.9237 18.9691H74.2343C74.9533 18.9691 75.5103 18.7851 75.9052 18.4172C76.2997 18.0427 76.4969 17.5294 76.4969 16.8773C76.4969 16.2124 76.3092 15.6894 75.9337 15.3085C75.5645 14.9276 74.9946 14.7371 74.2248 14.7371H71.9237V18.9691ZM85.8823 18.7367L88.7751 12.3839H91.9064L87.3427 21.3708V26.4841H84.4309V21.3708L79.8673 12.3839H83.008L85.8823 18.7367Z"
                  fill="#121926"
              ></path>
              <path
                  d="M10.987 31.5841C4.92849 31.5841 0 26.626 0 20.5323C0 14.4385 4.92899 9.48041 10.987 9.48041C17.045 9.48041 21.974 14.4385 21.974 20.5323C21.974 26.626 17.0459 31.5841 10.987 31.5841ZM10.987 10.536C5.50765 10.536 1.04938 15.0196 1.04938 20.5318C1.04938 26.044 5.50765 30.5275 10.987 30.5275C16.4663 30.5275 20.9251 26.0429 20.9251 20.5308C20.9251 15.0186 16.4673 10.536 10.987 10.536Z"
                  fill="#607d8b"
              ></path>
              <path
                  d="M18.96 21.0225C18.6182 19.7483 15.4851 19.6108 13.6203 20.0779C12.6437 20.3235 11.6456 20.6428 10.6162 20.8265C11.3697 21.4989 12.1788 22.135 13.34 22.2932C16.2211 22.6842 18.0112 21.775 18.96 21.0225Z"
                  fill="#607d8b"
              ></path>
              <path
                  d="M13.34 22.2932C12.1764 22.135 11.3697 21.4989 10.6162 20.8265C9.45013 19.7857 8.41298 18.6579 6.37723 19.0823C3.14069 19.7572 2.71488 23.6081 5.21404 26.0828C6.28706 27.2131 7.66455 28.0041 9.17779 28.3586C10.691 28.7132 12.2742 28.616 13.7333 28.079C15.1924 27.5419 16.4641 26.5883 17.3925 25.3352C18.3209 24.0819 18.8656 22.5835 18.96 21.0235C18.0112 21.775 16.221 22.6842 13.34 22.2932Z"
                  fill="#009688"
              ></path>
              <path
                  d="M15.034 13.9586C14.6301 14.8295 18.2304 15.7957 18.6611 18.6879C18.8687 15.8409 15.5335 12.882 15.034 13.9586Z"
                  fill="#607d8b"
              ></path>
              <path
                  d="M7.46619 17.5935C8.11524 17.3231 8.42345 16.5746 8.15463 15.9217C7.8858 15.2688 7.14167 14.9587 6.49262 15.2292C5.84357 15.4996 5.53536 16.2481 5.80418 16.9011C6.07306 17.5539 6.81714 17.8639 7.46619 17.5935Z"
                  fill="#009688"
              ></path>
              <path
                  d="M10.3549 14.08C10.6585 13.7746 10.6585 13.2795 10.3549 12.9741C10.0513 12.6687 9.55909 12.6687 9.25551 12.9741C8.95194 13.2795 8.95194 13.7746 9.25551 14.08C9.55909 14.3854 10.0513 14.3854 10.3549 14.08Z"
                  fill="#607d8b"
              ></path>
              <path
                  d="M13.1014 9.05206C14.2245 5.7149 13.4696 3.04871 11.1614 1.78241C9.58359 2.10513 8.647 2.87335 8.12549 3.93383C11.2204 3.68185 13.1844 5.63041 13.1014 9.05206Z"
                  fill="#607d8b"
              ></path>
              <path
                  d="M25.6983 6.13641C20.1389 4.1294 16.6304 4.81756 16.0786 9.39055C19.2648 12.6973 22.474 11.1146 25.6983 6.13641Z"
                  fill="#607d8b"
              ></path>
              <path
                  d="M21.2765 4.32541C21.5343 3.21728 21.6681 1.90776 21.6881 0.41748C15.9226 1.70883 13.3224 4.17658 15.2839 8.33846C15.3816 8.36203 15.4754 8.38119 15.5696 8.40085C16.0281 5.14422 18.0463 3.93835 21.2765 4.32541Z"
                  fill="#607d8b"
              ></path>
            </svg>
          </div>
          <div className="mt-5 text-center">
            <div className="mb-3 text-[#009d89] font-bold text-2xl">Sign UP</div>
            <div className="text-[#6b7287]">
              Enter your credentials to continue
            </div>
          </div>
          <div className="text-[black] font-bold">
            Sign up With Email Address
          </div>
          <div className="flex flex-col lg:flex-row items-center mt-5 w-[90%]">
            <input
                value={firstName}
                onChange={(e) => handleFirstNameChange(e)}
                className="p-3 mb-3 mr-2 w-[100%] bg-[#f8fafc] h-[3.5rem] rounded-md border border-[#bdbdbd]"
                placeholder="First Name"
            />

            <input
                value={lastName}
                onChange={(e) => handleLastNameChange(e)}
                className="mb-3 p-3 w-[100%] bg-[#f8fafc] h-[3.5rem] rounded-md border border-[#bdbdbd]"
                placeholder="Last Name"
                type={"text"}
            />
          </div>
          <div className="flex flex-col items-center mt-5 w-full">
            <input
                value={email}
                onChange={(e) => handleEmailChange(e)}
                className="p-3 m-2 w-[90%] bg-[#f8fafc] h-[3.5rem] rounded-md border border-[#bdbdbd]"
                placeholder="Email Address / UserName"
            />
            <div className="w-full flex justify-center relative">
              <input
                  onChange={(e) => handlePasswordChange(e)}
                  value={password}
                  className="p-3 m-2 w-[90%] bg-[#f8fafc] h-[3.5rem] rounded-md border border-[#bdbdbd]"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
              />
              <div
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  className="flex items-center justify-center w-10 h-10 rounded-[50%] hover:bg-[#eef2f6] absolute top-[21%] right-[8%]"
              >
                {showPassword ? (
                    <FontAwesomeIcon
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                        icon={faEye}
                    />
                ) : (
                    <FontAwesomeIcon
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                        icon={faEyeSlash}
                    />
                )}
              </div>
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center p-2">
              <input
                  onChange={() => {}}
                  type="checkbox"
                  onClick={() => {
                    setChecked(!checked);
                  }}
                  checked={checked}
                  id="checked"
                  className="ml-5 form-checkbox text-[#009d89] border-[#009d89] h-5 w-5 b"
              />
              <label htmlFor="checked" className="p-2">
                Agree With{" "}
                <span className="font-bold underline">Terms & Conditions</span>
              </label>
            </div>
          </div>
          {/* File Upload Section */}
          {
            Files ? (
                <div className="flex items-center justify-center w-full m-3">
                  <div className="flex flex-col items-center justify-center w-[90%] h-32 border-2 border-gray-300 border-solid rounded-lg overflow-hidden bg-gray-100">
                    {/* Display the selected file information */}
                    <p className="text-sm text-blue-600 font-bold px-4 py-2 truncate">

                      Selected File: {avatar?.name} {/* Assuming Files is the selected file object */}
                    </p>
                    <button
                        className=" text-white bg-blue-700 p-3 font-bold mt-2 rounded-md focus:outline-none"
                        onClick={() => handleClearFile()} // Implement handleClearFile function to clear the selected file
                    >
                      Clear
                    </button>
                  </div>
                </div>
            ) : (
                <div className="flex items-center justify-center w-full m-3">
                  <label
                      htmlFor="avatar-upload"
                      className="flex flex-col items-center justify-center w-[90%] h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                          className="w-8 h-8 mb-4 text-gray-500"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                      >
                        {/* SVG Path */}
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click </span> or drag to upload your Avatar Picture
                      </p>
                      <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF</p>
                    </div>
                    <input
                        id="avatar-upload"
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileChange(e)}
                    />
                  </label>
                </div>
            )
          }

          {/* End of File Upload Section */}
          <div className="w-full flex items-center justify-center">
            <button
                onClick={() => {
                  handleSubmit();
                }}
                className="text-white p-2 font-bold rounded-md w-[90%] h-[3rem] bg-[#009d89]"
            >
              Sign up
            </button>
          </div>
          <div className="mt-3 bg-yellow-50 w-[90%] border-t-2 border-[#009d89]"></div>
          <div className="m-5">
            <Link className="font-bold p-2" href={"/login"}>
              Already have an account
            </Link>
          </div>
        </div>
      </div>
  );
}

export default Register;
