import { useState, useMemo } from "react";
import {
  IconButton,
  Flex,
  Button,
  Table,
  TextField,
  Checkbox,
  Dialog,
} from "@radix-ui/themes";
import {
  EyeOpenIcon,
  Pencil1Icon,
  MagnifyingGlassIcon,
  DownloadIcon,
  TrashIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../features/store";
import { User } from "../features/type";
import ViewUser from "./ViewUser";
import useUserActions from "../utils/deleteActions";
import { deleteUser } from "../features/userSlice";
import {
  handleGlobalSearch,
  handleDownload,
  handleSearch,
} from "../utils/tableActions";
import FilterPopover from "./RoleFilter";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4;
  const [searchQuery, setSearchQuery] = useState("");
  const users = useSelector((state: RootState) => state.user.users);
  const [filteredData, setFilteredData] = useState(users);
  const [roleFilter, setRoleFilter] = useState("");

  const {
    selectedUsers,
    selectAll,
    toggleUserSelection,
    toggleSelectAll,
    handleDeleteUser,
    deleteConfirm,
    handleDeleteUsers,
    setDeleteConfirm,
  } = useUserActions(users);

  // Calculate indexes for pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = useMemo(
    () => filteredData.slice(indexOfFirstUser, indexOfLastUser),
    [filteredData, indexOfFirstUser, indexOfLastUser]
  );
    const totalPages =
    users.length > 0 ? Math.ceil(users.length / usersPerPage) : 1;

  return (
    <>
      <div className="w-full h-screen bg-blue-200 flex flex-col items-center p-6 py-8">
        {/* User List */}
        <div className="w-full min-h-[80vh] bg-white shadow-lg border rounded-md px-7 py-8">
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col">
              <Flex align="start" gap="3">
                <Button variant="soft">Listing</Button>
                <Button variant="soft">Import</Button>
                <Button variant="soft">Import Zip</Button>
              </Flex>
              <div className="mt-12 w-72 mb-6">
                <TextField.Root
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    handleGlobalSearch(e.target.value, users, setFilteredData);
                  }}
                >
                  <TextField.Slot>
                    <MagnifyingGlassIcon height="16" width="16" />
                  </TextField.Slot>
                </TextField.Root>
              </div>
            </div>
            <div className="mt-16 mr-4 flex gap-3">
              <FilterPopover
                roleFilter={roleFilter}
                setRoleFilter={setRoleFilter}
                handleApplyFilter={() =>
                  handleSearch(searchQuery, roleFilter, users, setFilteredData)
                }
                handleResetFilter={() => {
                  setRoleFilter("");
                  handleSearch(searchQuery, "", users, setFilteredData);
                }}
              />
              <IconButton
                variant="soft"
                className="text-white bg-purple-600 w-12 h-12 flex items-center justify-center text-2xl font-bold"
                onClick={() => navigate("/addUser")}
              >
                <PlusIcon />
              </IconButton>
              <IconButton
                variant="soft"
                onClick={() => handleDownload(filteredData)}
                className="text-white bg-blue-500 w-12 h-12 flex items-center justify-center text-2xl font-bold"
              >
                <DownloadIcon />
              </IconButton>
              <IconButton
                variant="soft"
                onClick={() => setDeleteConfirm(true)} // Open confirmation modal
                className={`text-white bg-red-500 w-12 h-12 flex items-center justify-center text-2xl font-bold ${
                  selectedUsers.length === 0
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={selectedUsers.length === 0} // Disable if no users are selected
              >
                <TrashIcon />
              </IconButton>
            </div>
          </div>
          {/* Table */}
          <Table.Root>
            <Table.Header className="bg-cyan-700 py-5">
              <Table.Row className="text-lg text-white">
                <Table.ColumnHeaderCell>
                  <Checkbox
                    checked={selectAll}
                    onCheckedChange={toggleSelectAll}
                  />
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>DOB</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Gender</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {currentUsers.map((user) => (
                <Table.Row key={user.id} className="text-blue-600 font-medium">
                  <Table.Cell>
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={() => toggleUserSelection(user.id)}
                    />
                  </Table.Cell>
                  <Table.Cell>{user.name}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.role}</Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell>{user.status ? "Active" : "Inactive"}</Table.Cell>
                  <Table.Cell>
                    <IconButton
                      variant="soft"
                      className="bg-transparent"
                      onClick={() => {
                        setSelectedUser(user); 
                        setIsViewOpen(true); 
                      }}
                    >
                      <EyeOpenIcon width="18" height="18" />
                    </IconButton>
                    <IconButton
                      variant="soft"
                      className="bg-transparent"
                      onClick={() => navigate(`/editUser/${user.id}`)}
                    >
                      <Pencil1Icon width="18" height="18" />
                    </IconButton>
                    <IconButton
                      variant="soft"
                      className="bg-transparent"
                      onClick={() => dispatch(deleteUser(user.id))}
                    >
                      <TrashIcon width="18" height="18" />
                    </IconButton>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-14">
            <IconButton
              variant="soft"
              className="bg-gray-200 disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <ChevronLeftIcon />
            </IconButton>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <IconButton
              variant="soft"
              className="bg-gray-200 disabled:opacity-50"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <ChevronRightIcon />
            </IconButton>
          </div>
        </div>
      </div>
      {isViewOpen && selectedUser && (
        <ViewUser user={selectedUser} onClose={() => setIsViewOpen(false)} />
      )}
      {deleteConfirm && (
        <Dialog open={deleteConfirm} onOpenChange={setDeleteConfirm}>
          <Dialog.Content>
            <p>
              {selectedUsers.length > 1
                ? `Are you sure you want to delete ${selectedUsers.length} users?`
                : "Are you sure you want to delete this user?"}
            </p>
            <Flex gap="2">
              <Button
                variant="solid"
                onClick={() => {
                  selectedUsers.length > 1
                    ? handleDeleteUsers()
                    : handleDeleteUser();
                }}
              >
                Yes
              </Button>
              <Button variant="soft" onClick={() => setDeleteConfirm(false)}>
                No
              </Button>
            </Flex>
          </Dialog.Content>
        </Dialog>
      )}
    </>
  );
};

export default Dashboard;
