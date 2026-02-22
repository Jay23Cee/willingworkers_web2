"use client";
import { useState, useEffect } from "react";
import { Button } from "antd";
import { User } from "../../components/user";
import toast from "react-hot-toast";
import { getUserList } from "@/app/api/getUserList";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/app/redux/store/store";
import { setBulkUser } from "@/app/redux/reducer/usersSlice";
import { deleteUser } from "@/app/api/deleteUser";


export default function ListAllUser(props: any) {
  const user = useSelector((state: AppState) => state.user.user);
  const users = useSelector((state: AppState) => state.users.users);
  const [userList, setUserList] = useState<User[]>(
    users.length > 0 ? (users as User[]) : []
  );
  const [isLoading, setIsLoading] = useState<boolean>(userList.length > 0);
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      try {
        const data = await getUserList();

        if (data && isMounted) {
          dispatch(setBulkUser(data));
          setUserList(data as User[]);
          setIsLoading(true);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }

    if (user.role === "admin" && users.length === 0) {
      fetchData();
    }
    if (user.role === "admin" && users.length > 0) {
      setUserList(users as User[]);
      setIsLoading(true);
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, user.role, users]);

 async function handleDelete(user: User) {
    const id = user.id

    try {
     await deleteUser(id as string);
      setUserList(userList.filter((userList) => userList.id !== id));
      toast.success("User deleted");
    } catch (error:any) {
      console.error(error.message);
      toast.error("Error deleting user");
    }
  }

  return (
    <div className="list-user-container">
      {isLoading ? (
        userList.map((userList, index) => (
          <div
            className={`list-user-posting ${
              userList.email === user.email ? "own-user" : ""
            }`}
            key={index}
          >
            <h2>{userList.name}</h2>
            <h4>{userList.email}</h4>
            <p>Role: {userList.role}</p>
            {userList.email !== user.email && (
              <>
                <Button onClick={() => props.onClick("edit-user", userList)}>
                  Edit
                </Button>
                <Button
                  style={{ background: "red", color: "white" }}
                  onClick={() => handleDelete(userList)}
                >
                  Delete
                </Button>
              </>
            )}
            {userList.email === user.email && (
              <p className="own-user-label">
                This is your own user information
              </p>
            )}
          </div>
        ))
      ) : (
        <div className="no-user-posting">
          <p>No user postings are currently available.</p>
        </div>
      )}
    </div>
  );
}
