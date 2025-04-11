import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "", // Kullanıcının tam adı.
    username: "", // Kullanıcı adı.
    password: "", // Şifre.
    confirmPassword: "", // Şifreyi doğrulamak için kullanılan alan.
    gender: "", // Kullanıcının cinsiyetini tutar.
  });

  const { loading, signup } = useSignup(); // useSignup hook'undan loading durumu ve signup fonksiyonu alınır.

  const handleCheckboxChange = (gender) => {
    // Cinsiyet seçimi değiştiğinde state güncellenir.
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    // Form gönderildiğinde bu fonksiyon çalışır.
    e.preventDefault(); // Sayfanın yenilenmesini engeller.
    await signup(inputs); // Kullanıcı verileri ile signup fonksiyonu çağrılır.
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      {" "}
      {/* Formun genel düzeni için kullanılan flexbox yapısı */}
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        {" "}
        {/* Form kutusunun stilini belirler */}
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          {" "}
          {/* Başlık kısmı */}
          Sign Up <span className="text-blue-500"> ChatApp</span>{" "}
          {/* ChatApp ismiyle stil verilmiş başlık */}
        </h1>
        <form onSubmit={handleSubmit}>
          {" "}
          {/* Form submit işlemi için onSubmit event handler */}
          <div>
            <label className="label p-2">
              {" "}
              {/* Etiket kısmı */}
              <span className="text-base label-text">Full Name</span>{" "}
              {/* Tam isim etiketi */}
            </label>
            <input
              type="text" // Kullanıcı adı için metin giriş alanı
              placeholder="John Doe" // Placeholder metni
              className="w-full input input-bordered  h-10" // Tailwind ile stil verilmiş
              value={inputs.fullName} // State'deki fullName değeri
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              } // Input değiştiğinde state güncellenir
            />
          </div>
          <div>
            <label className="label p-2 ">
              <span className="text-base label-text">Username</span>{" "}
              {/* Kullanıcı adı etiketi */}
            </label>
            <input
              type="text" // Kullanıcı adı için metin giriş alanı
              placeholder="johndoe" // Placeholder metni
              className="w-full input input-bordered h-10" // Tailwind ile stil verilmiş
              value={inputs.username} // State'deki username değeri
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              } // Input değiştiğinde state güncellenir
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>{" "}
              {/* Şifre etiketi */}
            </label>
            <input
              type="password" // Şifre girişi için input türü
              placeholder="Enter Password" // Placeholder metni
              className="w-full input input-bordered h-10" // Tailwind ile stil verilmiş
              value={inputs.password} // State'deki password değeri
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              } // Input değiştiğinde state güncellenir
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>{" "}
              {/* Şifreyi doğrulama etiketi */}
            </label>
            <input
              type="password" // Şifreyi doğrulamak için input türü
              placeholder="Confirm Password" // Placeholder metni
              className="w-full input input-bordered h-10" // Tailwind ile stil verilmiş
              value={inputs.confirmPassword} // State'deki confirmPassword değeri
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              } // Input değiştiğinde state güncellenir
            />
          </div>
          <GenderCheckbox
            onCheckboxChange={handleCheckboxChange}
            selectedGender={inputs.gender}
          />{" "}
          {/* Cinsiyet seçim kutusunu ekler */}
          <Link
            to={"/login"} // Giriş sayfasına yönlendiren Link bileşeni
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            Already have an account? {/* Giriş yapma bağlantısı */}
          </Link>
          <div>
            <button
              className="btn btn-block btn-sm mt-2 border border-slate-700"
              disabled={loading}
            >
              {" "}
              {/* Buton, loading durumu kontrolüyle devre dışı bırakılabilir */}
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}{" "}
              {/* Yükleniyor durumu gösterilir */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
