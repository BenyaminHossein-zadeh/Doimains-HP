import { filtersRadioGroupOptions } from "@/core/constants/filtersRadioGroupOptions";
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
    <div className=" w-fit flex gap-6 max-md:w-full max-md:justify-between max-md:flex-wrap-reverse">
      <Select
        showSearch
        style={{ width: "100%", minWidth: "250px" }}
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
        style={{ minWidth: "250px" }}
        onChange={debouncedOnChangeHandler}
        size="large"
      />
      <div className="flex flex-nowrap max-[30rem]:flex-wrap gap-4 flex-row items-center ">
        <span className="text-nowrap"> filter by status:</span>
        <Checkbox.Group
          options={filtersRadioGroupOptions}
          onChange={handleFilterByStatus}
          style={{ display: "flex", flexWrap: "nowrap", alignItems: "center" }}
        />
      </div>
    </div>
  );
};

export default SortFilterSection;
