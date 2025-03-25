"use client";
import React, { useActionState } from "react";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { useOptimistic } from "react";
//HOC
const withAuthorization = (WrappedComponent, allowedRoles) => {
  //tewo inputs 1 : compnent 2 : allowed roles
  return (props) => {
    const { user } = useAuth(); // we will user  from backend
    if (!user || !allowedRoles.includes(user.role)) {
      return (
        <>
          <div className="p-4 bg-white shadow-md rounded-lg w-64">
            <h2 className="text-xl font-semibold mb-2">Dashboard</h2>
            <p>UnAuthorized</p>
          </div>
        </>
      );
    }
    return <WrappedComponent {...props} />;
  };
};

const AdminDashboard = () => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg w-64">
      <h2 className="text-xl font-semibold mb-2">Dashboard</h2>
      <p className="text-gray-600">
        Total Users: <span className="font-bold">1,250</span>
      </p>
      <p className="text-gray-600">
        Active Users: <span className="font-bold text-green-600">950</span>
      </p>
    </div>
  );
};

const WithAuth = withAuthorization(AdminDashboard, ["admin"]);

const ManagerDashboard = () => {
  return <h1>Manager Dashboard</h1>;
};

const WithManagerAuth = withAuthorization(ManagerDashboard, [
  "admin",
  "manger",
]);

function UpdateUser() {
  async function updateUser(prevState, formData) {
    console.log(prevState, formData.get("userName"), "formData");

    // const res = await fetch("https:server/t", {
    //   method: "POST",
    //   body: {
    //     userName: formData.get("userName"),
    //   },
    // });
    return { message: "user details Updated" };
  }
  const [data, submitAction, isPending] = useActionState(updateUser, null); //[data , function , boolean]
  return (
    <div className="p-4 bg-white shadow-md rounded-lg w-64">
      <h1 className="text-xl font-semibold text-black mb-2">Update User</h1>
      <form action={submitAction} className="flex flex-col gap-2 text-black">
        <input
          type="text"
          name="userName"
          placeholder="Enter User Name"
          className="border-2 border-gray-300 rounded-md p-2 text-black"
        />
        <input
          type="text"
          name="userAge"
          placeholder="Enter User Age"
          className="border-2 border-gray-300 text-black rounded-md p-2"
        />
        <input
          type="text"
          name="userNumber"
          placeholder="Enter User Number"
          className="border-2 border-gray-300 text-black rounded-md p-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          {isPending ? "updating.." : "update"}
        </button>
      </form>
      {data && <p className="text-green-600">{data.message}</p>}
    </div>
  );
}
async function submitFeedback(prevState, formData) {
  const feedback = formData.get("feedback");
  //data dabase op

  return {
    message: `Thank you! Your feedback: "${feedback}"`,
    reviewCount: prevState?.reviewCount + 1 || 1,
  };
}
function FeedbackForm() {
  const [state, submitAction, pending] = useActionState(submitFeedback, {
    message: "please leave a review",
    reviewCount: 0,
  });
  return (
    <form
      className="p-4 bg-white shadow-md rounded-lg w-64"
      action={submitAction}
    >
      <textarea
        className="border-2 border-gray-300 rounded-md p-2 text-black"
        name="feedback"
        placeholder="Write your feedback..."
        required
      />
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
        type="submit"
        disabled={pending}
      >
        {pending ? "Submitting..." : "Submit"}
      </button>
      <p className="text-green-600">{state.message}</p>
      <p className="text-gray-600">Total Reviews: {state.reviewCount}</p>
    </form>
  );
}

export default function Home() {
  return (
    <div>
      {/* <UpdateUser /> */}
      <OptimistickLike />
    </div>
  );
}

function Link() {
  const [likes, setLikes] = useState(100);
  const [isLoading, setIsLoading] = useState(false);
  async function handleLike() {
    setIsLoading(true);
    // optimistic update
    setLikes((prev) => prev + 1);

    try {
      await fetch("/api/like", { method: "POST" }); //making post to server?
      throw new Error("Failed to like");
    } catch (error) {
      console.log(error, "error");
      setLikes((prev) => prev - 1); // Revert on failure
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <button
      className="bg-blue-500 text-white p-2 rounded-md"
      onClick={handleLike}
      disabled={isLoading}
    >
      <p className="text-white text-xl font-bold">
        ❤️ {likes} {isLoading && "(Updating...)"}
      </p>
    </button>
  );
}

function OptimistickLike() {
  const [likes, setLikes] = useState(100);
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    likes,
    (prevLikes, newLikes) => {
      return newLikes;
    }
  ); //intial state , updater function

  async function handleLike() {
    setOptimisticLikes(optimisticLikes + 1);
    try {
      await fetch("/api/like", { method: "POST" });
      // setLikes((prev) => prev + 1);
    } catch (error) {
      setOptimisticLikes(optimisticLikes - 1);
    }
  }
  return (
    <form action={handleLike}>
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
      >
        ❤️ {optimisticLikes}
      </button>
    </form>
  );
}
