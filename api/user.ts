import { User } from "@prisma/client";
import axios from "axios";

export const getUser = async (): Promise<User> => {
  const res = await axios.get("/api/user");
  return res.data.user;
};
