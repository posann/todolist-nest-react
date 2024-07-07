import axios from "axios";

type UserData = {
  username: string;
  password: string;
};

export const RegisterAction = async ({
  username,
  password,
}: UserData): Promise<boolean> => {
  try {
    const response = await axios({
      method: "post",
      url: "http://127.0.0.1:3000/auth/register",
      data: {
        username: username,
        password: password,
      },
    });

    console.log(response);

    return true;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return false;
  }
};

export const LoginAction = async ({
  username,
  password,
}: UserData): Promise<any> => {
  try {
    const response = await axios({
      method: "post",
      url: "http://127.0.0.1:3000/auth/login",
      data: {
        username: username,
        password: password,
      },
    });

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return false;
  }
};
