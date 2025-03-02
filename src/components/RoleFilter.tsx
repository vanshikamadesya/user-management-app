import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Button, DropdownMenu } from "@radix-ui/themes";

interface FilterDropdownProps {
  roleFilter: string;
  setRoleFilter: (role: string) => void;
  handleApplyFilter: () => void;
  handleResetFilter: () => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  roleFilter,
  setRoleFilter,
  handleApplyFilter,
  handleResetFilter,
}) => {
  return (
    <Popover >
      <PopoverTrigger asChild>
        <Button
          variant="soft"
          className="text-white bg-blue-500 w-12 h-12 flex items-center justify-center text-2xl font-bold"
        >
          <MixerHorizontalIcon />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="bg-white shadow-lg rounded-md p-8 w-80 z-50 ">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Role</h3>

        {/* Dropdown for Role Selection */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger >
            <Button variant="soft" className="w-full justify-between">
              {roleFilter || "Select Role"}
              <DropdownMenu.TriggerIcon />
            </Button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Content>
            <DropdownMenu.Item onClick={() => setRoleFilter("")}>
              All Roles
            </DropdownMenu.Item>
            <DropdownMenu.Item onClick={() => setRoleFilter("Admin")}>
              Admin
            </DropdownMenu.Item>
            <DropdownMenu.Item onClick={() => setRoleFilter("User")}>
              User
            </DropdownMenu.Item>
            <DropdownMenu.Item onClick={() => setRoleFilter("Manager")}>
              Manager
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        <div className="flex justify-between mt-4">
          <Button
            variant="solid"
            className="text-sm px-4 py-1"
            onClick={handleApplyFilter}
          >
            Apply Filter
          </Button>
          <Button
            variant="soft"
            className="text-sm px-4 py-1"
            onClick={handleResetFilter}
          >
            Reset Filter
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilterDropdown;
