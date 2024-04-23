import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAuthUserAction } from "./actions/auth/getAuthUser";
import { setUser } from "./redux/slices/authSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const func = async () => {
      let dt = await getAuthUserAction();
      if (dt !== false) {
        dispatch(setUser(dt));
      }
    };
    func();
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
