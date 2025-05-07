import React, { memo } from "react";
import ListComponent from "../common/ListComponent";
import DomainsTable from "../common/DomainsTable";

const TableSection = memo(({ data }) => {
  return (
    <section>
      <ListComponent
        data={data}
        renderItem={(domain) => <li key={domain.id}>{domain.domain}</li>}
      />
      <DomainsTable />
    </section>
  );
});

export default TableSection;
