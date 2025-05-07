import React, { Fragment } from "react";

const ListComponent = ({ data, renderItem }) => {
  return <Fragment>{data?.map((item) => renderItem(item))}</Fragment>;
};

export default ListComponent;
