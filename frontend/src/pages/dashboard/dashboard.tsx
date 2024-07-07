import { Stack, useDisclosure } from "@chakra-ui/react";
import Navbar from "../../components/navbar/navbar";
import { TableComponent } from "../../components/table/table";
import { Todos } from "../../libs/entity/TodoType";
import { useEffect, useState } from "react";
import { addTodos, getAllTodos } from "../../libs/network/Todos";
import { RemoveDataLocal } from "../../libs/local-storage";
import ButtonComponent from "../../components/button/button";
import { AddIcon } from "@chakra-ui/icons";
import AddDialog from "../../components/dialog/add-dialog";
import { AlertComponent } from "../../components/alert/alert";

export const DashboardPage = () => {
  const [todos, setTodos] = useState<Todos[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [alert, setAlert] = useState({
    isOpen: false,
    status: "success",
    message: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllTodos();
      if (data.message === "auth") {
        RemoveDataLocal();
        window.location.href = "/login";
      }

      setTodos(data.data);
    };

    fetchData();
  }, []);

  const handleAddTodo = async (newTodo: Todos) => {
    const result = await addTodos(newTodo);

    if (result.title !== "") {
      setTodos((prevTodos) => [...prevTodos, result]);
      setAlert({
        isOpen: true,
        status: "success",
        message: "Todo berhasil ditambahkan.",
      });
    }
  };

  return (
    <Stack>
      <Navbar />
      <ButtonComponent
        maxWidth={{ base: "100%", md: "200px" }}
        my={2}
        label="Tambah Data Baru"
        colorScheme="blue"
        variant="outline"
        leftIcon={<AddIcon />}
        onClick={onOpen}
      />
      <TableComponent data={todos} setData={setTodos} />
      <AddDialog isOpen={isOpen} onClose={onClose} onAddTodo={handleAddTodo} />

      {alert.isOpen && (
        <AlertComponent
          message="Add Todo Success"
          status={alert.status}
          my={4}
          onClose={() =>
            setAlert({ isOpen: false, status: "success", message: "" })
          }
        >
          {alert.message}
        </AlertComponent>
      )}
    </Stack>
  );
};
