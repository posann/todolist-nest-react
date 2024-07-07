import {
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  Text,
  useDisclosure,
  Badge,
  Button,
  Icon,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Todos } from "../../libs/entity/TodoType";
import EditDialog from "../dialog/edit-dialog";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { formatDate } from "../../libs/format-date";
import { deleteTodo, updateTodo } from "../../libs/network/Todos";
import { AlertComponent } from "../alert/alert";
import { useState, useRef } from "react";

interface TableComponentProps {
  data: Todos[];
  setData: React.Dispatch<React.SetStateAction<Todos[]>>;
}

export const TableComponent: React.FC<TableComponentProps> = ({
  data,
  setData,
}) => {
  const [alert, setAlert] = useState({
    isOpen: false,
    status: "success",
    message: "",
  });

  const columnHelper = createColumnHelper<Todos>();

  const columnData = [
    columnHelper.accessor("dueDate", {
      cell: (info) => formatDate(info.getValue().toString()),
      header: "Date",
    }),
    columnHelper.accessor("title", {
      cell: (info) => info.getValue(),
      header: "Title",
    }),
    columnHelper.accessor("description", {
      cell: (info) => info.getValue(),
      header: "Description",
    }),
    columnHelper.accessor("status", {
      cell: (info) => (
        <Badge
          size={"sm"}
          variant={"solid"}
          colorScheme={
            info.getValue() === "Done"
              ? "green"
              : info.getValue() === "On Process"
              ? "blue"
              : "red"
          }
        >
          {info.getValue()}
        </Badge>
      ),
      header: "Status",
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Stack direction="row" spacing={2}>
          <Button
            colorScheme="yellow"
            size="xs"
            onClick={() => handleEditClick(row.original)}
          >
            <Icon as={EditIcon} />
          </Button>
          <Button
            colorScheme="red"
            size="xs"
            onClick={() => handleDeleteClick(row.original)}
          >
            <Icon as={DeleteIcon} />
          </Button>
        </Stack>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns: columnData,
    getCoreRowModel: getCoreRowModel(),
  });

  const isMobile = useBreakpointValue({ base: true, md: false });
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const [selectedTodo, setSelectedTodo] = useState<Todos | null>(null);
  const cancelRef = useRef(null);

  const handleDeleteClick = (todo: Todos) => {
    setSelectedTodo(todo);
    onDeleteOpen();
  };

  const handleConfirmDelete = () => {
    // Implement delete logic here
    if (selectedTodo) {
      console.log("Deleted Todo:", selectedTodo);
      setData((prevData) =>
        prevData.filter((todo) => todo._id !== selectedTodo._id)
      );
      deleteTodo(selectedTodo._id);
      setAlert({
        isOpen: true,
        status: "success",
        message: "Todo deleted successfully",
      });

      onDeleteClose();
    }
  };

  const handleEditClick = (todo: Todos) => {
    setSelectedTodo(todo);
    onEditOpen();
  };

  const handleSaveEdit = (editedTodo: Todos) => {
    // Implement edit logic here
    console.log("Edited Todo:", editedTodo);
    updateTodo(editedTodo, editedTodo._id).then(() => {
      setData((prevData) =>
        prevData.map((todo) =>
          todo._id === editedTodo._id ? editedTodo : todo
        )
      );
      setAlert({
        isOpen: true,
        status: "success",
        message: "Todo updated successfully",
      });
    });
  };

  return (
    <Stack spacing={4}>
      {isMobile ? (
        <Stack spacing={4}>
          {table.getRowModel().rows.map((row) => (
            <Stack
              key={row.id}
              spacing={2}
              padding={4}
              boxShadow="md"
              borderRadius="md"
              borderWidth="1px"
            >
              {row.getVisibleCells().map((cell) => (
                <Stack
                  key={cell.id}
                  direction="row"
                  justifyContent="space-between"
                >
                  <Text fontWeight="bold">
                    {cell.column.columnDef.header?.toString()}
                  </Text>
                  <Text textAlign="right">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Text>
                </Stack>
              ))}
            </Stack>
          ))}
        </Stack>
      ) : (
        <Table variant="striped" size={"sm"} overflowX={"scroll"}>
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      {selectedTodo && (
        <>
          <EditDialog
            isOpen={isEditOpen}
            onClose={onEditClose}
            onSave={handleSaveEdit}
            todo={selectedTodo}
          />

          <AlertDialog
            isOpen={isDeleteOpen}
            leastDestructiveRef={cancelRef}
            onClose={onDeleteClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Delete Todo
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure you want to delete this todo? This action cannot
                  be undone.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onDeleteClose}>
                    Cancel
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={handleConfirmDelete}
                    ml={3}
                  >
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </>
      )}

      {alert.isOpen && (
        <AlertComponent status={alert.status} message={alert.message} />
      )}
    </Stack>
  );
};
