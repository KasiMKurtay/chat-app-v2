import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  // Login bileşeni başlatılıyor

  // Username ve password için state'ler tanımlanıyor
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin(); // useLogin hook'undan login fonksiyonu ve loading durumunu alıyoruz

  // Form gönderildiğinde login fonksiyonu çağrılır
  const handleSubmit = async (e) => {
    e.preventDefault(); // Formun default davranışını engelliyoruz
    await login(username, password); // Login fonksiyonunu çağırıyoruz
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      {/* Ana container */}
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        {/* Login kartı */}
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
          <span className="text-blue-500"> ChatApp</span>
          {/* Başlık kısmı, ChatApp markasını vurguluyor */}
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Formun submit işlemi handleSubmit fonksiyonu tarafından yapılır */}

          <div>
            <label className="label p-2">
              {/* Username için etiket */}
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
              value={username} // input değerini state ile bağlıyoruz
              onChange={(e) => setUsername(e.target.value)} // input değiştiğinde state güncellenir
            />
          </div>

          <div>
            <label className="label">
              {/* Password için etiket */}
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={password} // input değerini state ile bağlıyoruz
              onChange={(e) => setPassword(e.target.value)} // input değiştiğinde state güncellenir
            />
          </div>

          <Link
            to="/signup"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            {/* Kayıt olma linki */}
            {"Don't"} have an account?
          </Link>

          <div>
            <button className="btn btn-block btn-sm mt-2" disabled={loading}>
              {/* Login butonu */}
              {loading ? (
                <span className="loading loading-spinner "></span>
              ) : (
                "Login"
              )}
              {/* Eğer yükleniyorsa loading spinner'ı göster */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
