import { User } from "../components/UserForm";
export const handleGlobalSearch = (
  query: string,
  data: User[],
  setFilteredData: (data: User[]) => void
) => {
  const filtered = data.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(query.toLowerCase())
    )
  );
  setFilteredData(filtered);
};

export const handleSearch = (
  query: string,
  roleFilter: string, // New role filter
  data: User[],
  setFilteredData: (data: User[]) => void
) => {
  const filtered = data.filter((item) => {
    const matchesSearch = Object.values(item).some((val) =>
      String(val).toLowerCase().includes(query.toLowerCase())
    );

    const matchesRole = roleFilter ? item.role === roleFilter : true;

    return matchesSearch && matchesRole;
  });

  setFilteredData(filtered);
};

export const handleDownload = (data: User[]) => {
  const csvContent =
    "data:text/csv;charset=utf-8," +
    [
      "Name,Email,Role",
      ...data.map((u) => `${u.name},${u.email},${u.role}`),
    ].join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.href = encodedUri;
  link.download = "users.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
