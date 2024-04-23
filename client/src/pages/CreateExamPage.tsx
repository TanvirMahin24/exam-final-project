import CreateExam from "../components/exam/CreateExam/CreateExam";
import Layout from "../components/shared/Layout/Layout";

const CreateExamPage = () => {
  return (
    <div>
      <Layout>
        <h3 className="text-white">Create Exam</h3>
        <CreateExam />
      </Layout>
    </div>
  );
};

export default CreateExamPage;
