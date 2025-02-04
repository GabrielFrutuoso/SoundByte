import { useMutation } from "@tanstack/react-query";

type RegisterUserData = {
  email: string;
  username: string;
  avatar?: string;
  provider?: string;
  password?: string;
};

type RegisterUserOptions = {
  onSuccess?: () => void;
};

const registerUser = async (userData: RegisterUserData) => {
  const response = await fetch("http://localhost:3000/api/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to register user");
  }

  return response.json();
};

export const useRegisterUser = (options?: RegisterUserOptions) => {
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: options?.onSuccess,
  });

  return mutation;
};
