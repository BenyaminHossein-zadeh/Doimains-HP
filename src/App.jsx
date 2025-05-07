import Content from "./components/content/Content";
import Header from "./components/header/Header";
import {
  useCreateDomainMutation,
  useDeleteDomainMutation,
  useGetDomainQuery,
  useGetDomainsQuery,
  useUpdateDomainMutation,
} from "./core/services/state/domains/domainsApiSlice";
import { useState } from "react";

function App() {

  return (
    <div className="px-6 py-8 space-y-8 w-screen">
      <Header />
      <Content />
    </div>
  );
}

export default App;
