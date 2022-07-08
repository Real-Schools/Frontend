/**
 * @author Paul Jeremiah Mugaya
 * @email paulmugaya@live.com
 * @create date 2022-06-24 10:57:38
 * @modify date 2022-06-24 10:57:38
 * @desc https://codepen.io/knyttneve/pen/vYEzXOR
 */

import { useQuery } from "@apollo/client";
import { GET_USERS } from "Api/graphql";
import Page from "Components/Page";
import PageContent from "Components/PageContent";
import Table from "Components/Table";
import CreateUser from "./createUser";

const UsersPage = () => {
  const { loading, error, data, refetch } = useQuery(GET_USERS);

  return (
    <Page
      title="Users"
      overFlowHidden
      headerExtra={[<CreateUser key={1} onUpdate={refetch} />]}
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
              Header: "Email",
              accessor: "email",
            },
            {
              Header: "Role",
              accessor: "role",
            },
          ]}
          data={data?.users || []}
        />
      </PageContent>
    </Page>
  );
};

export default UsersPage;
