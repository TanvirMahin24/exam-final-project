import { createBrowserRouter } from "react-router-dom";
import {
  CreateExamPage,
  CreatedExamsPage,
  DashboardPage,
  ExamDetailsPage,
  ExamPage,
  LandingPage,
  LoginPage,
  RegisterPage,
  ResultPage,
  ResultsPage,
  SettingsPage,
} from "../pages";
import AuthWrapper from "../components/shared/AuthWrapper/AuthWrapper";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthWrapper>
        <LandingPage />
      </AuthWrapper>
    ),
  },
  {
    path: "/login",
    element: (
      <AuthWrapper>
        <LoginPage />
      </AuthWrapper>
    ),
  },
  {
    path: "/register",
    element: (
      <AuthWrapper>
        <RegisterPage />,
      </AuthWrapper>
    ),
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/results",
    element: <ResultsPage />,
  },
  {
    path: "/my-exams",
    element: <CreatedExamsPage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
  {
    path: "/exam/:id",
    element: <ExamPage />,
  },
  {
    path: "/details/:id",
    element: <ExamDetailsPage />,
  },
  {
    path: "/result/:id",
    element: <ResultPage />,
  },
  {
    path: "/create-exam",
    element: <CreateExamPage />,
  },
]);
