// components/dialog/AddDialog.tsx

import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { Todos } from "../../libs/entity/TodoType";
import { GetDataLocal } from "../../libs/local-storage";
import { InputComponent } from "../input/input";

interface AddDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTodo: (todo: Todos) => void;
}

const AddDialog = ({ isOpen, onClose, onAddTodo }: AddDialogProps) => {
  const localData = GetDataLocal();
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    dueDate: new Date(),
    status: "Pending",
    userId: localData?.userId || "",
    __v: 0,
    _id: "",
  });

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTodo({
      ...newTodo,
      [name]: value,
    });
  };

  const handleAddTodo = () => {
    // Reset errors
    setTitleError("");
    setDescriptionError("");

    // Validate inputs
    let isValid = true;
    if (!newTodo.title) {
      setTitleError("Silahkan masukkan judul");
      isValid = false;
    }
    if (!newTodo.description) {
      setDescriptionError("Silahkan masukkan deskripsi");
      isValid = false;
    }

    if (isValid) {
      onAddTodo(newTodo);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tambah Data Baru</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isInvalid={!!titleError}>
            <FormLabel>Title</FormLabel>
            <InputComponent
              name="title"
              value={newTodo.title}
              setValue={(value: string) =>
                setNewTodo({ ...newTodo, title: value })
              }
              helperText="Masukkan judul"
              errorMessage={titleError}
            />
          </FormControl>
          <FormControl mt={4} isInvalid={!!descriptionError}>
            <FormLabel>Description</FormLabel>
            <InputComponent
              name="description"
              value={newTodo.description}
              setValue={(value: string) =>
                setNewTodo({ ...newTodo, description: value })
              }
              helperText="Masukkan deskripsi"
              errorMessage={descriptionError}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Due Date</FormLabel>
            <Input
              type="date"
              name="dueDate"
              value={
                newTodo.dueDate instanceof Date
                  ? newTodo.dueDate.toISOString().split("T")[0]
                  : ""
              }
              onChange={handleChange}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleAddTodo}>
            Simpan
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Batal
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddDialog;
