import { Container } from "@mui/material";
import { FC, lazy, useEffect } from "react";
import './App.scss'
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRecoilState } from "recoil";
import { useApi } from "./hooks/useApi";
import { useAuth } from "./hooks/useAuth";
import { currentUserAtom } from "./store/user";
import Header from "./components/Header";

const Home = lazy(() => import("./screens/homepage"))
const ShopPage = lazy(() => import("./screens/shop"))
const Checkout = lazy(() => import("./screens/checkout"))
const CollectionOverview = lazy(() => import("./components/products/CollectionOverview"))
const Sign = lazy(() => import("./screens/sign"))
const NotFound = lazy(() => import("./screens/notFound"))

toast.configure();

const App: FC = () => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom)
  const { user, logout } = useAuth()
  const { Fetch } = useApi()

  useEffect(() => {
    user && user.id ? Fetch(`/v1/web/user/${user.id}`).then(res => {
        if (res?.success && res.user) {
          setCurrentUser(res.user)
        } else {
          setCurrentUser(null)
          logout()
        }
    }) : setCurrentUser(null)
    return () => setCurrentUser(null)
    // eslint-disable-next-line
  }, [user])

  return (
      <Container className="mt-5" maxWidth="xl">
        <Header />
        <Routes>
          {/* PUBLIC ROUTE */}
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/shop/:category" element={<CollectionOverview />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="sign" element={<RedirectRoute component={Sign} isObject={currentUser} />} />

          {/* PRIVATE ROUTE */}
          <Route path="checkout" element={<PrivateRoute component={Checkout}/>} />
        </Routes>
      </Container>
  );
}

const PrivateRoute = ({ component: Component }:any) => {
	const auth = useAuth()
	const user = auth.loggedIn() && auth.user
  const location = useLocation()

  return user ? <Component /> : 
    <Navigate to="/sign" state={{ from: `?next=${location.pathname}` }} />
};

const RedirectRoute = ({ component: Component, isObject }:any) => {
    return !isObject ? <Component /> : <Navigate to="/" />
}

export default App;