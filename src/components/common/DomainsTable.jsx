import { EditIcon } from "@/assets/icons/EditIcon";
import { statusOptions } from "@/core/constants/statusOptions";
import {
  useDeleteDomainMutation,
  useUpdateDomainMutation,
} from "@/core/services/state/domains/domainsApiSlice";
import {
  Button,
  message,
  Popconfirm,
  Popover,
  Select,
  Space,
  Switch,
  Table,
} from "antd";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import DrawerWithForm from "./DrawerWithForm";

const DomainsTable = ({ data, refetch, isLoading }) => {
  const [selectedRecordId, setSelectedRecordId] = useState(undefined);
  const [editRecord, setEditRecord] = useState(null);
  const [updateDomain, { isLoading: isUpdateLoading }] =
    useUpdateDomainMutation();
  const [deleteDomain, { isLoading: isDeleteLoading }] =
    useDeleteDomainMutation();

  const handleDelete = useCallback(
    async (record) => {
      try {
        setSelectedRecordId(record.id);
        await deleteDomain({ id: record.id }).unwrap();
        await refetch();
      } catch (error) {
        console.error("Delete failed:", error);
      }
    },
    [deleteDomain, refetch]
  );

  const handleUpdate = useCallback(
    async (updateData, selectedId) => {
      try {
        setSelectedRecordId(selectedId);
        await updateDomain({ ...updateData, id: selectedId }).unwrap();
        setEditRecord(null);
        await refetch();
      } catch (error) {
        console.error("Update failed:", error);
      }
    },
    [updateDomain, refetch]
  );

  const showEditDrawer = (record) => {
    setEditRecord(record);
  };

  const onCloseEditDrawer = () => {
    setEditRecord(null);
  };
  const columns = useMemo(
    () => [
      {
        title: "Domain URL",
        dataIndex: "domain",
        key: "domain",
        width: "30%",
        render: (_, record) => {
          return (
            <>
              <div className="flex gap-2 items-center group py-4">
                <span
                  key={`domain-${record.id}`}
                  className="truncate text-blue-600"
                >
                  {record.domain}
                </span>

                <Button type="text" onClick={() => showEditDrawer(record)}>
                  <EditIcon className="hidden group-hover:block opacity-60 cursor-pointer" />
                </Button>
              </div>
            </>
          );
        },
      },
      {
        title: "Activity",
        dataIndex: "isActive",
        key: "isActive",
        render: (_, record) => (
          <Switch
            key={`switch-${record.id}`}
            defaultChecked={record.isActive}
            size="default"
            onChange={(checked) =>
              handleUpdate({ id: record.id, isActive: checked }, record.id)
            }
            loading={selectedRecordId == record.id && isUpdateLoading}
          />
        ),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (_, record) => (
          <Select
            key={`select-${record.id}`}
            value={record.status}
            style={{ width: 100 }}
            size="small"
            onChange={(value) => {
              handleUpdate({ id: record.id, status: value }, record.id);
            }}
            options={statusOptions}
            loading={selectedRecordId == record.id && isUpdateLoading}
          />
        ),
      },
      {
        title: "Action",
        key: "action",
        render: (_, record) => {
          const confirm = (e) => {
            console.log(e);
            message.success("Click on Yes");
            handleDelete(record);
          };
          const cancel = (e) => {
            console.log(e);
            message.error("Click on No");
          };
          return (
            <Space>
              <Popconfirm
                title="Delete the Domain"
                description="Are you sure to delete this Domain?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  loading={selectedRecordId == record.id && isDeleteLoading}
                  variant="text"
                  color="primary"
                >
                  Delete
                </Button>
              </Popconfirm>
            </Space>
          );
        },
      },
    ],
    [handleUpdate, handleDelete, isUpdateLoading, isDeleteLoading]
  );
 

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => `row-${record.id}`}
        // pagination={{ pageSize: 10 }}
        scroll={true}
        size="small"
        loading={isLoading}
        className="overflow-x-auto"
      />
      <DrawerWithForm
        title={`Edit ${editRecord?.domain} domain`}
        open={!!editRecord}
        onClose={onCloseEditDrawer}
        onSubmit={(values) => handleUpdate(values, editRecord?.id)}
        defaultValue={editRecord}
        loading={isUpdateLoading && selectedRecordId === editRecord?.id}
      />
    </>
  );
};

export default memo(DomainsTable);
