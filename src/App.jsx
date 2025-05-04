import {
  useCreateDomainMutation,
  useDeleteDomainMutation,
  useGetDomainQuery,
  useGetDomainsQuery,
  useUpdateDomainMutation,
} from "./core/services/state/domains/domainsApiSlice";
import { useState } from "react";

function App() {
  const [id, setId] = useState(undefined);

  const { data: posts, isLoading: islmsdlm, refetch } = useGetDomainsQuery({});
  const { data: postDetail } = useGetDomainQuery({ id: id });
  console.log(postDetail, "kANDKnda");
  const [
    createDomain,
    { isSuccess: isAddingDomainSuccess, isError: isAddingDomainError },
  ] = useCreateDomainMutation();
  const [deleteDomain, { isSuccess: isDeleteSuccess, isError: isDeleteError }] =
    useDeleteDomainMutation();

  const [updateDomain, { isSuccess: isUpdateSuccess, isError: isUpdateError }] =
    useUpdateDomainMutation();

  if (islmsdlm) return <div>loading ...</div>;
  console.log(posts);

  return (
    <>
      <button
        onClick={async () => {
          await createDomain({
            createdDate: Date.now(),
            domain: "qwqdqwdqwd.com",
            status: "pending",
            isActive: true,
          });
          if (isAddingDomainSuccess || !isAddingDomainError) {
            refetch();
          }
        }}
      >
        Create Domain
      </button>
      <div className="grid place-content-center">
        <ul>
          {posts?.map((post) => {
            return (
              <li className="border border-red-500" key={post.id}>
                <button
                  className="p-5 border border-black"
                  onClick={async () => {
                    await deleteDomain({ id: post.id });
                    if (isDeleteSuccess || !isDeleteError) {
                      refetch();
                    }
                  }}
                >
                  Delete
                </button>
                {post.id}
                {post.domain}
                <button
                  className="p-5 border border-black"
                  onClick={async () => {
                    await updateDomain({
                      id: post.id,
                      domain: "updated domain",
                      isActive: true,
                    });
                    if (isUpdateSuccess || !isUpdateError) {
                      refetch();
                    }
                  }}
                >
                  PUT
                </button>
                <button
                  className="p-5 border border-black"
                  onClick={() => setId(post.id)}
                >
                  info
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
