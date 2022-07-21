import { StudentsChart } from "Components/charts";
import Page from "Components/Page";
import PageContent from "Components/PageContent";

const Dashboard = () => {
  return (
    <Page title="Dashboard" noBack>
      <PageContent loading={false}>
        <StudentsChart />
      </PageContent>
    </Page>
  );
};

export default Dashboard;
