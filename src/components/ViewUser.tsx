import { Dialog } from "@radix-ui/themes";

const ViewUser = ({ user, onClose }) => {
  return (
    <Dialog.Root open={true} onOpenChange={onClose}>
      <Dialog.Content className="max-w-2xl p-0 rounded-md overflow-hidden">
        {/* Header */}
        <div className="bg-gray-900 text-white px-4 py-3 flex justify-between">
          <Dialog.Title className="font-semibold mt-3">VIEW USER</Dialog.Title>
          <button onClick={onClose} className="text-white font-bold">✖</button>
        </div>

        {/* User Details Table */}
        <div className="p-4 pl-6 bg-white ">
          <div className="grid grid-cols-3 gap-4 border-b py-2">
            <span className="font-semibold text-cyan-600 ">Name:</span>
            <span className="col-span-2 text-cyan-600">{user.name}</span>
          </div>

          <div className="grid grid-cols-3 gap-4 border-b py-2">
            <span className="font-semibold text-cyan-600">Email:</span>
            <span className="col-span-2 text-cyan-600">{user.email}</span>
          </div>

          <div className="grid grid-cols-3 gap-4 border-b py-2">
            <span className="font-semibold text-cyan-600">Role:</span>
            <span className="col-span-2 text-cyan-600">{user.role || "-"}</span>
          </div>

          <div className="grid grid-cols-3 gap-4 border-b py-2">
            <span className="font-semibold text-cyan-600">Dob:</span>
            <span className="col-span-2 text-cyan-600">{user.dob || "-"}</span>
          </div>

          <div className="grid grid-cols-3 gap-4 border-b py-2">
            <span className="font-semibold text-cyan-600">Profile:</span>
          </div>

          <div className="grid grid-cols-3 gap-4 border-b py-2">
            <span className="font-semibold text-cyan-600">Gender:</span>
            <span className="col-span-2 text-cyan-600">{user.gender || "-"}</span>
          </div>

          <div className="grid grid-cols-3 gap-4 py-2">
            <span className="font-semibold text-cyan-600">Status:</span>
            <span className="col-span-2 text-cyan-600">{user.status ? "Active" : "Inactive"}</span>
          </div>
        </div>

      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ViewUser;
