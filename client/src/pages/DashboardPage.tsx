import DashboardExamCards from "../components/dashboard/DashboardExamCards/DashboardExamCards";
import Welcome from "../components/dashboard/Welcome/Welcome";
import Layout from "../components/shared/Layout/Layout";

const DashboardPage = () => {
  return (
    <div>
      <Layout>
        <Welcome />
        <DashboardExamCards />
      </Layout>
    </div>
  );
};

export default DashboardPage;
