import { useState } from "react";
import { useAuthContext } from "../context/authContext";
import toast from "react-hot-toast";

const useLogin = () => {
  let [loading, setloading] = useState(false);
  let { setAuthUser } = useAuthContext();

  let login = async ({ username, password }) => {
    let validateInputs = handleInputsError(username,password)
    if(!validateInputs) return;
    try {
      loading = true;
      let res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: username, password }),
        credentials: "include",
      });

      let data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }
      // LocalStorage
      setloading(false);
      localStorage.setItem("chat-user", JSON.stringify(data));
      //
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };

  return { loading, login };
};


function handleInputsError(username,password){
    if(!username || !password){
        toast.error("Please fill all the field")
        return false
    }
    if(password.length<6){
        toast.error("Password must be at least 6 character")
        return false
    }
    return true

}
export default useLogin;
