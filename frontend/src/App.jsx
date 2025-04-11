import { Navigate, Route, Routes } from "react-router-dom"; // react-router-dom kütüphanesinden yönlendirme ve rota bileşenleri import edilir.
import "./App.css"; // CSS dosyası import edilir.
import Home from "./pages/home/Home"; // Ana sayfa bileşeni import edilir.
import Login from "./pages/login/Login"; // Giriş sayfası bileşeni import edilir.
import SignUp from "./pages/signup/SignUp"; // Kayıt sayfası bileşeni import edilir.
import { Toaster } from "react-hot-toast"; // Bildirimler için 'react-hot-toast' kütüphanesinin Toaster bileşeni import edilir.
import { useAuthContext } from "./context/AuthContext"; // Kimlik doğrulama işlemi için AuthContext import edilir.

function App() {
  const { authUser } = useAuthContext(); // Kimlik doğrulama işlemi yapılır ve 'authUser' alındı.
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        {/* Ana sayfa için rota: Kullanıcı doğrulandıysa Home sayfasına, değilse Login sayfasına yönlendirilir. */}
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/login"} />}
        />

        {/* Login sayfası için rota: Eğer kullanıcı doğrulandıysa Home sayfasına yönlendirilir, değilse Login sayfası gösterilir. */}
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />

        {/* SignUp sayfası için rota: Eğer kullanıcı doğrulandıysa Home sayfasına yönlendirilir, değilse SignUp sayfası gösterilir. */}
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <SignUp />}
        />
      </Routes>

      {/* react-hot-toast ile bildirimler için 'Toaster' bileşeni */}
      <Toaster />
    </div>
  );
}

export default App;
