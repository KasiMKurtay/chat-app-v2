import React from "react"; // React kütüphanesini içe aktarır.
import SearchInput from "./SearchInput"; // Daha önce tanımlanmış SearchInput bileşenini içe aktarır.
import Conversations from "./Conversations"; // Daha önce tanımlanmış Conversations bileşenini içe aktarır.
import LogoutButton from "./LogoutButton"; // Daha önce tanımlanmış LogoutButton bileşenini içe aktarır.

const Sidebar = () => {
  // "Sidebar" isminde bir fonksiyonel bileşen tanımlar.
  return (
    // Bileşenin render edeceği JSX yapısını başlatır.
    <div className="border-r border-slate-500 p-4 flex flex-col">
      {" "}
      {/* Sağ kenarına sınır çizen, gri tonlarında, padding eklenmiş ve dikeyde esnek bir yapı oluşturur. */}
      <SearchInput /> {/* Arama kutusunu render eder */}
      <div className="divider px-3"></div>{" "}
      {/* Arama kutusu ile sohbetlerin arasında bir ayırıcı (divider) ekler */}
      <Conversations /> {/* Sohbetlerin listeleneceği alanı render eder */}
      <LogoutButton /> {/* Kullanıcı çıkış yapma butonunu render eder */}
    </div>
  );
};

export default Sidebar;
