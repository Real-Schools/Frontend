/**
 * @author Paul Jeremiah Mugaya
 * @email paulmugaya@live.com
 * @create date 2022-06-24 10:57:38
 * @modify date 2022-06-24 10:57:38
 * @desc Branches
 */

import { useQuery } from "@apollo/client";
import { GET_BRANCHES } from "Api/graphql";
import Page from "Components/Page";
import PageContent from "Components/PageContent";
import Table from "Components/Table";
import Create from "./create";

const BranchesPage = () => {
  const { loading, error, data, refetch } = useQuery(GET_BRANCHES);

  return (
    <Page
      title="Branches"
      overFlowHidden
      headerExtra={[<Create key={1} onUpdate={refetch} />]}
      error={error}
    >
      <PageContent loading={loading}>
        <Table
          columns={[
            {
              Header: "ID",
              accessor: "id",
            },
            {
              Header: "Name",
              accessor: "name",
            },
            {
              Header: "Location",
              accessor: "location",
            },
            {
              Header: "Prefix",
              accessor: "prefix",
            },
          ]}
          data={data?.branches || []}
        />
      </PageContent>
    </Page>
  );
};

export default BranchesPage;
