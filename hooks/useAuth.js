import React, { useEffect, useState } from "react";

export default function useAuth() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function fetchUser() {
      const user = await fetch("http://localhost:3000/api/user");
      const userData = await user.json();
      //   setUser(userData);
    }
    fetchUser();
  }, []);
  return { user: user || { role: "admin" } };
}
