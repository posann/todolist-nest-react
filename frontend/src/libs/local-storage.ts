export const SetDataLocal = ({ ...rest }) => {
  localStorage.setItem("jwt-token", rest.access_token);
  localStorage.setItem("username", rest.username);
  localStorage.setItem("userId", rest.userId);
};

export const GetDataLocal = () => {
  return {
    access_token: localStorage.getItem("jwt-token"),
    username: localStorage.getItem("username"),
    userId: localStorage.getItem("userId"),
  };
};

export const RemoveDataLocal = () => {
  localStorage.removeItem("jwt-token");
  localStorage.removeItem("username");
  localStorage.removeItem("userId");
};
