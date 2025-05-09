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
import { memo, useCallback, useMemo, useState } from "react";
import DrawerWithForm from "./DrawerWithForm";
import { formatUrl } from "@/core/utils/formatUrl";

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
                <Popover
                  content={
                    <div style={{ maxWidth: "500px" }}>
                      <div className="preview-card p-4 bg-white rounded-md border border-gray-200">
                        <h4 className="text-base font-medium mb-2">
                          Domain Preview
                        </h4>
                        <div
                          style={{
                            width: "450px",
                            height: "300px",
                            position: "relative",
                            overflow: "hidden",
                            borderRadius: "4px",
                            border: "1px solid #f0f0f0",
                          }}
                        >
                          <iframe
                            src={formatUrl(record.domain)}
                            title={`Preview of ${record.domain}`}
                            style={{
                              width: "100%",
                              height: "100%",
                              border: "none",
                              transform: "scale(0.9)",
                              transformOrigin: "0 0",
                            }}
                            sandbox="allow-same-origin allow-scripts"
                            loading="lazy"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.parentElement.innerHTML = `
                        <div class="text-gray-500 p-4">
                          <p>Preview not available</p>
                          <a href="${record.domain}" 
                             target="_blank" 
                             rel="noopener noreferrer"
                             class="text-blue-600 hover:underline"
                          >
                            Open in new tab
                          </a>
                        </div>
                      `;
                            }}
                          />
                        </div>
                        <a
                          href={record.domain}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-block text-blue-600 hover:underline"
                        >
                          Visit website
                        </a>
                      </div>
                    </div>
                  }
                  placement="right"
                  trigger="hover"
                >
                  <span
                    key={`domain-${record.id}`}
                    className="truncate text-blue-600 cursor-pointer"
                  >
                    {record.domain}
                  </span>
                </Popover>

                <Button type="text" onClick={() => showEditDrawer(record)}>
                  <EditIcon className=" opacity-60 cursor-pointer" />
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
            message.success("Click on Yes");
            handleDelete(record);
          };
          const cancel = (e) => {
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
