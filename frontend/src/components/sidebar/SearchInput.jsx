import React from "react"; // React kütüphanesini içe aktarır, React kullanmak için gerekli.
import { IoSearchSharp } from "react-icons/io5"; // "IoSearchSharp" simgesini 'react-icons/io5' kütüphanesinden içe aktarır.

const SearchInput = () => { // "SearchInput" isminde bir fonksiyonel bileşen tanımlar.
  return ( // Bileşenin render edeceği JSX yapısını başlatır.
    <form className="flex items-center gap-2"> {/* Flexbox ile yatayda hizalanmış ve aralarındaki boşluğu 2 birim yapan form. */}
      <input
        type="text" // Text giriş alanı oluşturur.
        placeholder="Search..." // Kullanıcıya arama yapması için ipucu verir (arama kutusu içeriği).
        className="input input-bordered rounded-full" // 'input' stil sınıfını uygular, kenarlıklı ve yuvarlak köşeli bir giriş alanı oluşturur.
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white"> {/* Arama butonunu oluşturur. */}
        <IoSearchSharp className="w-6 h-6 outline-none"/> {/* Arama simgesi (büyüklüğü 6x6) ve kenar çizgisi yok. */}
      </button>
    </form>
  );
};

export default SearchInput;
