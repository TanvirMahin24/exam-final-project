import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/store";

const AuthWrapper = ({ children }: any) => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth && isAuth == true) {
      navigate(`/dashboard`);
    }
  }, [isAuth]);
  return <>{children}</>;
};

export default AuthWrapper;
