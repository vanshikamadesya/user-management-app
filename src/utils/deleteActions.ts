import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "../features/userSlice";
import { User } from "../features/type";

const useUserActions = (users: User[]) => {
  const dispatch = useDispatch();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  // Toggle individual user selection
  const toggleUserSelection = useCallback((userId: string) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  }, []);

  // Toggle select all users
  const toggleSelectAll = useCallback(() => {
    setSelectAll((prevSelectAll) => {
      const newSelectAll = !prevSelectAll;
      setSelectedUsers(newSelectAll ? users.map((user) => user.id ?? "") : []);
      return newSelectAll;
    });
  }, [users]);

  // Open delete confirmation dialog
  const confirmDeleteUser = useCallback((userId: string) => {
    setUserToDelete(userId);
    setDeleteConfirm(true);
  }, []);

// Handle actual delete
const handleDeleteUser = useCallback(() => {
  if (userToDelete) {
    dispatch(deleteUser(userToDelete)); // Dispatching the single delete action
    setUserToDelete(null);
    setDeleteConfirm(false);
    setSelectedUsers([]); // Reset selection
  }
}, [dispatch, userToDelete]);

  // Delete multiple users
  const handleDeleteUsers = useCallback(() => {
    if (selectedUsers.length > 0) {
      dispatch(deleteUser(selectedUsers)); // Dispatch array of IDs
      setSelectedUsers([]); 
      setSelectAll(false);
      setDeleteConfirm(false);
    }
  }, [dispatch, selectedUsers]);
          
  return {
    selectedUsers,
    selectAll,
    toggleUserSelection,
    toggleSelectAll,
    confirmDeleteUser,
    handleDeleteUser,
    handleDeleteUsers,
    deleteConfirm,
    setDeleteConfirm,
    userToDelete,
  };
};

export default useUserActions;
