import React from "react"; // React kütüphanesini içe aktarır.
import { BsFillSendFill } from "react-icons/bs"; // React iconlarından gönder butonu simgesini içe aktarır.

const MessageInput = () => {
  // "MessageInput" isminde bir fonksiyonel bileşen tanımlar.
  return (
    <form className="px-4 my-3">
      {" "}
      {/* Form alanını oluşturur, çevresinde padding ekler */}
      <div className="w-full relative">
        {" "}
        {/* Genişliği tam olarak kaplayan ve relative pozisyonlandırılmış bir div */}
        <input
          type="text" // Metin girişi yapılacak alanı tanımlar.
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white" // Input elemanına stil verir: border, rounded köşeler, yazı rengi, arka plan rengi vb.
          placeholder="Send a message" // Kullanıcıya mesaj yazması için bir placeholder (yer tutucu) ekler.
        />
        <button
          type="submit" // Buton formu göndermeye yarar.
          className="absolute inset-y-0 end-0 flex items-center pe-3" // Butonu input elemanının sağ tarafına yerleştirir.
        >
          <BsFillSendFill /> {/* Gönder butonu için ikon */}
        </button>
      </div>
    </form>
  );
};

export default MessageInput; // "MessageInput" bileşenini dışa aktarır.
