import React, { useCallback, useEffect, useState } from "react";
import AddDomain from "./AddDomain";
import SortFilterSection from "./SortFilterSection";
import {
  useCreateDomainMutation,
  useDeleteDomainMutation,
  useGetDomainsQuery,
  useUpdateDomainMutation,
} from "@/core/services/state/domains/domainsApiSlice";
import TableSection from "./TableSection";

const Content = () => {
  // const [id, setId] = useState(undefined);

  const {
    data: domains,
    isLoading: islmsdlm,
    refetch,
  } = useGetDomainsQuery({});
  // const { data: postDetail } = useGetDomainQuery({ id: id });
  const [
    createDomain,
    { isSuccess: isAddingDomainSuccess, isError: isAddingDomainError },
  ] = useCreateDomainMutation();
  const [deleteDomain, { isSuccess: isDeleteSuccess, isError: isDeleteError }] =
    useDeleteDomainMutation();

  const [updateDomain, { isSuccess: isUpdateSuccess, isError: isUpdateError }] =
    useUpdateDomainMutation();

  const [filteredDomains, setFilteredDomains] = useState(undefined);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState(null);
console.log(selectedStatuses)
  const handleFiltersAndSort = useCallback(() => {
    let result = [...domains];

    if (searchTerm) {
      result = result.filter((domain) =>
        domain.domain.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedStatuses.length > 0) {
      result = result.filter((domain) =>
        selectedStatuses.includes(domain.status)
      );
    }

    if (sortType) {
      switch (sortType) {
        case "Order by Name Ascending":
          result.sort((a, b) =>
            a.domain.toLowerCase().localeCompare(b.domain.toLowerCase())
          );
          break;
        case "Order by Name Descending":
          result.sort((a, b) =>
            b.domain.toLowerCase().localeCompare(a.domain.toLowerCase())
          );
          break;
        case "Order by Date Ascending":
          result.sort(
            (a, b) => new Date(a.createdDate) - new Date(b.createdDate)
          );
          break;
        case "Order by Date Descending":
          result.sort(
            (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
          );
          break;
        case "Order by Activity":
          result.sort((a, b) => Number(b.isActive) - Number(a.isActive));
          break;
      }
    }
    setFilteredDomains(result);
  }, [domains, searchTerm, sortType, selectedStatuses]);

  useEffect(() => {
    if (domains) {
      handleFiltersAndSort();
    }
  }, [domains, searchTerm, sortType, selectedStatuses, handleFiltersAndSort]);

  console.log(filteredDomains);

  return (
    <main className="flex flex-col gap-8 ">
      <button onClick={createDomain}>kanfkasnaskdn</button>
      <div className="flex justify-between gap-6 flex-nowrap max-lg:flex-wrap">
        <AddDomain />
        <SortFilterSection
          handleFilter={setSearchTerm}
          handleSort={setSortType}
          handleFilterByStatus={setSelectedStatuses}
        />
      </div>
      <TableSection data={filteredDomains} />
    </main>
  );
};

export default Content;
