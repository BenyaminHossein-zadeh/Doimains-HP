import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

import { useCreateDomainMutation } from "@/core/services/state/domains/domainsApiSlice";
import DrawerWithForm from "../common/DrawerWithForm";

const AddDomain = ({ refetch }) => {
  const [open, setOpen] = useState(false);

  const [createDomain, { isLoading: isAddingDomainLoading }] =
    useCreateDomainMutation();

  const handleSubmit = async (value) => {
    try {
      await createDomain(value);
      await refetch();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        type="primary"
        size="large"
        onClick={showDrawer}
        icon={<PlusOutlined />}
      >
        New Domain
      </Button>
      <DrawerWithForm
        title="Add New Domain"
        onSubmit={handleSubmit}
        open={open}
        onClose={onClose}
        loading={isAddingDomainLoading}
      ></DrawerWithForm>
    </>
  );
};

export default AddDomain;
