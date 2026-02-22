import axios from "axios";
import { User } from "../components/user";

export async function getUserList() {
  try {
    const res = await axios.get("/api/getUserList");
    const userResponse = res.data;

    const users: User[] = userResponse.map((userData: any) => {
      const user: User = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        image: userData.image,
        role: userData.role,
      };
      return user;
    });

    return users;
  } catch (error) {
    console.error(error);
    return false;
  }
}
