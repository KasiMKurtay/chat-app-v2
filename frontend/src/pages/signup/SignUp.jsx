import React, { useState } from "react";
import GenderCheckbox from "./GenderCheckbox";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
  //fonksiyonel bileşen tanımladık
  const [inputs, setInputs] = useState({
    //Form verilerini tutmak için state
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { loading, signup } = useSignup(); //Kayıt işlemi ve yükleme durumu

  const handleCheckboxChange = (gender) => {
    //Cinsiyet seçildiğinde state güncelleniyor
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    //Form gönderildiğinde çalışacak fonksiyon
    e.preventDefault(); //Sayfanın yenilenmesini engeller
    await signup(inputs); //Kayıt fonksiyonunu çağırı ve from verrilerini gönderir
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300 ">
          Sign Up <span className="text-blue-500">ChatApp-V2</span>
        </h1>
        <form onSubmit={handleSubmit}>
          {" "}
          {/*Form gönderildiğinde handleSubmit çalışacak */}
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Kasım Kurtay"
              className="w-full input input-bordered h-10"
              value={inputs.fullName} //State'ten alınan değer input'ta gösterilir
              onChange={
                (e) => setInputs({ ...inputs, fullName: e.target.value }) //Input değiştiğinde state güncellenir
              }
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="KasiMKurtay"
              className="w-full input input-bordered h-10"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
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
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>
          <GenderCheckbox
            onCheckboxChange={handleCheckboxChange} //Cinsiyet seçildiğinde çalışacak input
            selectedGender={inputs.gender} //Seçilen cinsiyet input
          />
          <Link
            to={"/login"}
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            Already have an account?
          </Link>
          <div>
            <button
              className="btn btn-block btn-sm mt-2 border border-slate-700"
              disabled={loading} //Yükleme varsa butona tıklanmaz
            >
              {loading ? ( //Eğer yükleme varsa spinner göster
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up" //Yoksa metni göster
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
