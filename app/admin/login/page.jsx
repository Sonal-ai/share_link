"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import styled from "styled-components";

const schema = z.object({
  username: z.string().min(1, "Username required"),
  password: z.string().min(1, "Password required"),
});

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "https://tnp-recruitment-challenge.manitvig.live/login",
        data
      );
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      router.push("/admin/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <StyledWrapper>
      <div className="container mx-auto mt-20 bg-stone-100">
        <div className="left">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="p-6 font-bold text-4xl text-gray-800 relative left-24 -top-10">Login</h1>
            <div className="input-block">
              <input
                className="input"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
              <label>Username</label>
            </div>
            <div className="input-block">
              <input
                className="input"
                type="password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
              <label>Password</label>
            </div>
            <div className="input-block">
              <button className="cursor-pointer disabled:cursor-not-allowed"
                type="submit"
                disabled={isSubmitting}
              >{isSubmitting ? (<img src="/loader.svg" alt="loading spinner" className="w-4 h-4 animate-spin" />
          ) : (
            <span></span>
          )}
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="right">
          <div className="img">
            <img src="/illustration.svg" alt="Illustration" className="relative top-52" />
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .container {
    display: flex;
    width: 520px;
    height: 500px;
    max-width: 99%;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    border-radius: 15px;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.03);
    border: 0.1px solid rgba(128, 128, 128, 0.178);
  }

  .left {
    width: 66%;
    height: 100%;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 100%;
    left: 0;
    backdrop-filter: blur(20px);
    position: relative;
  }

  .form::before {
    position: absolute;
    content: "";
    width: 40%;
    height: 40%;
    right: 1%;
    z-index: -1;
    background: radial-gradient(
      circle,
      rgb(194, 13, 170) 20%,
      rgb(26, 186, 235) 60%,

      rgb(26, 186, 235) 100%
    );
    filter: blur(70px);
    border-radius: 50%;
  }

  .right {
    width: 34%;
    height: 100%;
  }

  .img {
    width: 100%;
    height: 100%;
  }

  .container::after {
    position: absolute;
    content: "";
    width: 80%;
    height: 80%;
    right: -40%;
    background: rgb(157, 173, 203);
    background: radial-gradient(
      circle,
      rgba(157, 173, 203, 1) 61%,
      rgba(99, 122, 159, 1) 100%
    );
    border-radius: 50%;
    z-index: -1;
  }

  .input,
  button {
    background: rgba(253, 253, 253, 0);
    outline: none;
    border: 1px solid rgba(255, 0, 0, 0);
    border-radius: 0.5rem;
    padding: 10px;
    margin: 10px auto;
    width: 80%;
    display: block;
    color: #425981;
    font-weight: 500;
    font-size: 1.1em;
  }

  .input-block {
    position: relative;
  }

  label {
    position: absolute;
    left: 15%;
    top: 37%;
    pointer-events: none;
    color: gray;
  }

  .forgot {
    display: block;
    margin: 5px 0 10px 0;
    margin-left: 35px;
    color: #5e7eb6;
    font-size: 0.9em;
  }

  .input:focus + label,
  .input:valid + label {
    transform: translateY(-120%) scale(0.9);
    transition: all 0.4s;
  }

  button {
    background-color: #5e7eb6;
    color: white;
    font-size: medium;
    box-shadow: 2px 4px 8px rgba(70, 70, 70, 0.178);
  }

  a {
    color: #5e7eb6;
  }

  .input {
    box-shadow: inset 4px 4px 4px rgba(165, 163, 163, 0.315),
      4px 4px 4px rgba(218, 218, 218, 0.13);
  }
`;
