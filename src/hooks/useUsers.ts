import { useQuery } from "@tanstack/react-query";
import { UserService } from "../server/UserService";
import { useEffect } from "react";

export const useUsers = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: UserService.getUsers,
    select: (data) => data.data,
  });
  useEffect(() => {
    if (isError) console.log("Error");
  }, [isError]);

  return { data, isError, isLoading };
};
