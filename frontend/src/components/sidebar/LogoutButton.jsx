import React from "react"; // React kütüphanesini içe aktarır, React kullanmak için gerekli.
import { BiLogOut } from "react-icons/bi"; // "BiLogOut" simgesini 'react-icons' kütüphanesinden içe aktarır.
import useLogout from "../../hooks/useLogout"; // "useLogout" hook'unu içe aktarır, logout işlemi için gerekli.

const LogoutButton = () => { // "LogoutButton" isminde bir fonksiyonel bileşen tanımlar.
  const { loading, logout } = useLogout(); // useLogout hook'unu çağırır, loading ve logout fonksiyonunu alır.

  return ( // Bileşenin render edeceği JSX yapısını başlatır.
    <div className="mt-auto"> {/* Alt alanda (mt-auto) hizalanmış bir div oluşturur. */}
      {!loading ? ( // Eğer loading false ise (yüklenmiyor), simgeyi gösterir.
        <BiLogOut
          className="w-6 h-6 text-white cursor-pointer" // Simgenin boyutlarını (w-6 h-6) ayarlar, beyaz renk ve tıklanabilir hale getirir.
          onClick={logout} // Logout fonksiyonu tetiklenir (butona tıklanınca çıkış yapılır).
        />
      ) : ( // Eğer loading true ise (yükleniyor), yükleniyor simgesini gösterir.
        <span className="loading loading-spinner"></span> // Yükleniyor simgesini gösterir.
      )}
    </div>
  );
};

export default LogoutButton;
