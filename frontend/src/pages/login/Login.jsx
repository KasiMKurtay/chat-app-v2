import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState();
  //username değerini tutan state, başlangıçta undefined
  const [password, setPassword] = useState();
  //password değerini tutan state

  const { loading, login } = useLogin();
  //useLogin hook'undan Loading ve login çekildi

  //Form gönderilidğinde çalışacak fonksiyon
  const handleSubmit = async (e) => {
    //Sayfa yenilenmesini engeller
    e.preventDefault();
    //Giriş fonksiyonunu çağırır, kullanıdı adı ve şifre ile
    await login(username, password);
  };
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto ">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        {/*Sayfa ortasına hizalanmış kapsayıcı div */}
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
          <span className="text-blue-500">ChatApp-V2</span>
        </h1>
        <form onSubmit={handleSubmit}>
          {" "}
          {/*Form yapısı ve submit edildiğinde çalışacak olan fonksiyon */}
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              //Kullanıcı adı değiştikçe state güncellenir
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              //Şifre değiştikçe state güncellenir
            />
          </div>
          <Link
            to={"/signup"}
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            {"Don't"} have an account?
          </Link>
          <div>
            <button className="btn btn-block btn-sm mt-2" disabled={loading}>
              {!loading ? (
                "Login"
              ) : (
                <span className="loading loading-spinner"></span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
