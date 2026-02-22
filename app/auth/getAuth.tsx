"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Logged from "./Logged";
import ovsww_logo from "../../public/assets/ovs_ww.png";
import { getUser } from "../api/getUser";
import { useSelector } from "react-redux";
import UsersState from "../redux/reducer/usersSlice";

import AdminSession from "../dashboard/adminsession";
import { getSession } from "next-auth/react";
import { User } from "../components/user";
import { RootState } from "../redux/reducer/rootReducer";


export default function useAuth(roles: string[]) {
  const [users, setUsers] = useState<User | null>(null);
  const [validate, setValidate] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const session = await getSession();
      if (session) {
        const email = session.user?.email as string;
        const userResponse = (await getUser(email)) as User;

        if (userResponse && userResponse.id) {
          // check if userResponse is not empty and has an id

          setUsers(userResponse);
          setValidate(true);
        } else {
          // handle the case where the userResponse is empty or invalid
          setValidate(false);

          // you can also set the `user` state to `null` or an empty object if needed
        }
      }
    }

    fetchUser();
  }, []);

  if (!validate) {
    return false;
  }

  if (roles.includes(users?.role as string)) {
    return true;
  } else {
    console.log("Error: user role is not authorized");
    return false;
  }
}

// export default ValidAuth;
