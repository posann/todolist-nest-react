// src/services/todoService.ts

import axios from "axios";

export interface Todo {
  _id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: string;
  userId: string;
}

export const addTodos = async ({ title, description, dueDate }: Todo) => {
  const jwt = await localStorage.getItem("jwt-token");
  try {
    const response = await axios.post(
      "http://localhost:3000/todos",
      {
        title,
        description,
        dueDate,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const getAllTodos = async () => {
  const jwt = await localStorage.getItem("jwt-token");

  try {
    const response = await axios.get("http://localhost:3000/todos", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data;
  } catch (error) {
    return {
      message: "auth",
      data: [],
    }; // Handle error case, return empty array or handle error as needed
  }
};

export const updateTodo = async (todo: Todo, id: string) => {
  const jwt = await localStorage.getItem("jwt-token");
  try {
    await axios.put(`http://localhost:3000/todos/${id}`, todo, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return true;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return false;
  }
};

export const deleteTodo = async (id: string) => {
  const jwt = await localStorage.getItem("jwt-token");
  try {
    await axios.delete(`http://localhost:3000/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return true;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return false;
  }
};
