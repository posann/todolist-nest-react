import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Todos } from "../../libs/entity/TodoType";
import { useState, useRef, useEffect } from "react";
import { SelectComponent } from "../select/select";
import { dataStatus } from "../../libs/entity/StatusType";

interface EditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  todo: Todos;
  onSave: (todo: Todos) => void;
}

const EditDialog: React.FC<EditDialogProps> = ({
  isOpen,
  onClose,
  todo,
  onSave,
}) => {
  const [editedTodo, setEditedTodo] = useState<Todos>({
    title: todo?.title || "",
    description: todo?.description || "",
    dueDate: todo?.dueDate ? new Date(todo.dueDate) : new Date(),
    status: todo?.status || "",
    userId: todo?.userId || "",
    __v: todo?.__v || 0,
    _id: todo?._id || "",
  });

  useEffect(() => {
    if (todo) {
      setEditedTodo({
        ...todo,
        dueDate: new Date(todo.dueDate), // Ensure dueDate is a Date object
      });
    }
  }, [todo]);

  const cancelRef = useRef<HTMLButtonElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedTodo((prevTodo) => ({
      ...prevTodo,
      [name]: name === "dueDate" ? new Date(value) : value,
    }));
  };

  const handleSave = () => {
    onSave(editedTodo);
    onClose();
  };

  const handleStatusChange = (value: string) => {
    setEditedTodo((prevTodo) => ({
      ...prevTodo,
      status: value,
    }));
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Edit Todo
          </AlertDialogHeader>
          <AlertDialogBody>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                type="text"
                value={editedTodo.title}
                onChange={handleChange}
                placeholder="Enter title"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                name="description"
                type="text"
                value={editedTodo.description}
                onChange={handleChange}
                placeholder="Enter description"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Due Date</FormLabel>
              <Input
                name="dueDate"
                type="date"
                value={
                  editedTodo.dueDate instanceof Date
                    ? editedTodo.dueDate.toISOString().split("T")[0]
                    : ""
                }
                onChange={handleChange}
                placeholder="Enter due date"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Status</FormLabel>
              <SelectComponent
                data={dataStatus}
                selectedValue={editedTodo.status}
                setSelectedValue={handleStatusChange}
              />
            </FormControl>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Batal
            </Button>
            <Button colorScheme="blue" onClick={handleSave} ml={3}>
              Simpan
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default EditDialog;
