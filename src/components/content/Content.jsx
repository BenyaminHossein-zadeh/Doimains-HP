import React, { useCallback, useEffect, useState } from "react";
import AddDomain from "./AddDomain";
import SortFilterSection from "./SortFilterSection";
import { useGetDomainsQuery } from "@/core/services/state/domains/domainsApiSlice";
import DomainsTable from "../common/DomainsTable";

const Content = () => {
  // const [id, setId] = useState(undefined);

  const { data: domains, isLoading, refetch } = useGetDomainsQuery({});
  // const { data: postDetail } = useGetDomainQuery({ id: id });

  const [filteredDomains, setFilteredDomains] = useState(undefined);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState(null);
  console.log(selectedStatuses);

  const handleFiltersAndSort = useCallback(() => {
    if (!domains) return;

    let result = [...domains];

    if (selectedStatuses.length > 0) {
      result = result.filter((domain) =>
        selectedStatuses.includes(domain.status)
      );
    }

    if (searchTerm) {
      result = result.filter((domain) =>
        domain.domain.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortType) {
      const sortedResult = [...result];
      switch (sortType) {
        case "Order by Name Ascending":
          sortedResult.sort((a, b) =>
            a.domain.toLowerCase().localeCompare(b.domain.toLowerCase())
          );
          break;
        case "Order by Name Descending":
          sortedResult.sort((a, b) =>
            b.domain.toLowerCase().localeCompare(a.domain.toLowerCase())
          );
          break;
        case "Order by Date Ascending":
          sortedResult.sort(
            (a, b) =>
              new Date(a.createdDate).getTime() -
              new Date(b.createdDate).getTime()
          );
          break;
        case "Order by Date Descending":
          sortedResult.sort(
            (a, b) =>
              new Date(b.createdDate).getTime() -
              new Date(a.createdDate).getTime()
          );
          break;
        case "Order by Activity":
          sortedResult.sort((a, b) => {
            if (a.isActive === b.isActive) return 0;
            return a.isActive ? -1 : 1;
          });
          break;
        default:
          sortedResult.sort(
            (a, b) =>
              new Date(a.createdDate).getTime() -
              new Date(b.createdDate).getTime()
          );
          break;
      }
      result = sortedResult;
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
    <main className="flex flex-col gap-8">
      <div className="flex justify-between gap-6 flex-nowrap max-md:flex-col max-lg:flex-wrap">
        <AddDomain refetch={refetch} />
        <SortFilterSection
          handleFilter={setSearchTerm}
          handleSort={setSortType}
          handleFilterByStatus={setSelectedStatuses}
        />
      </div>
      <DomainsTable
        data={filteredDomains}
        refetch={refetch}
        isLoading={isLoading}
      />
    </main>
  );
};

export default Content;
