import { statusOptions } from "@/core/constants/statusOptions";
import { sortOptions } from "@/core/constants/sortOptions";
import { useDebounce } from "@/core/hooks/useDebounce";
import { Checkbox, Input, Select } from "antd";
import React from "react";

const SortFilterSection = ({
  handleFilter,
  handleSort,
  handleFilterByStatus,
}) => {
  const debouncedOnChangeHandler = useDebounce((ev) => {
    handleFilter(ev.target.value);
  }, 500);

  return (
    <div className=" justify-self-center w-fit flex gap-6 max-lg:w-full max-lg:justify-between max-xl:flex-wrap-reverse ">
      <Select
        showSearch
        style={{ width: "calc(50% - 12px)", minWidth: "250px" }}
        size="large"
        placeholder="Search to Select"
        optionFilterProp="label"
        onSelect={handleSort}
        onClear={() => handleSort(null)}
        options={sortOptions}
        allowClear
      />
      <Input
        placeholder="Search ..."
        style={{ width: "calc(50% - 12px)", minWidth: "250px" }}
        onChange={debouncedOnChangeHandler}
        size="large"
      />
      <div className="flex gap-4 items-center max-[30rem]:items-start max-[30rem]:flex-col max-[30rem]:justify-center ">
        <span className="text-nowrap"> filter by status:</span>
        <div>
          <Checkbox.Group
            options={statusOptions}
            onChange={handleFilterByStatus}
            style={{
              display: "flex",
              flexWrap: "nowrap",
              alignItems: "center",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SortFilterSection;
