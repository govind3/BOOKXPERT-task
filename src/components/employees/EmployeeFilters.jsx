const EmployeeFilters = ({
  search,
  setSearch,
  gender,
  setGender,
  status,
  setStatus,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full md:w-1/3"
      />

      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className="border p-2 rounded w-full md:w-1/4"
      >
        <option value="">All Genders</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2 rounded w-full md:w-1/4"
      >
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  );
};

export default EmployeeFilters;
