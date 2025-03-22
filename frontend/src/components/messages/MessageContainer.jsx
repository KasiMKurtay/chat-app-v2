import React from "react"; // React kütüphanesini içe aktarır.
import Messages from "./Messages"; // Mesajları listeleyen bileşeni içe aktarır.
import MessageInput from "./MessageInput"; // Mesaj gönderme alanını içeren bileşeni içe aktarır.
import { TiMessages } from "react-icons/ti"; // React iconlarını içeren kütüphaneden mesaj simgesini içe aktarır.

const MessageContainer = () => { // "MessageContainer" isminde bir fonksiyonel bileşen tanımlar.
  const noChatSelected = true; // Chat seçilmediği durumu simüle eden bir değişken. (Gerçek uygulamada bu, chat seçildiğinde değişir.)

  return ( // Bileşenin render edeceği JSX yapısını başlatır.
    <div className="md:min-w-[450px] flex flex-col"> {/* Mesaj kutusunun stilini belirler: belirli bir genişlik ve flex düzeni */}
      {noChatSelected ? ( // Eğer "noChatSelected" true ise, "NoChatSelected" bileşeni render edilir.
        <NoChatSelected />
      ) : ( // Aksi takdirde (yani chat seçildiyse) aşağıdaki içerik render edilir.
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2"> {/* Chat başlığını ve kimle konuşulduğunu gösteren alan */}
            <span className="label-text">To:</span> {/* "To:" etiketi */}
            <span className="text-gray-900 font-bold">Kasım Kurtay</span> {/* Mesajlaşılacak kişinin adı */}
          </div>

          <Messages /> {/* Mesajları listeleyen bileşeni render eder */}
          <MessageInput /> {/* Mesaj yazma alanını render eder */}
        </>
      )}
    </div>
  );
};

export default MessageContainer; // "MessageContainer" bileşenini dışa aktarır.

const NoChatSelected = () => { // "NoChatSelected" isminde bir bileşen tanımlar.
  return (
    <div className="flex items-center justify-center w-full h-full"> {/* Chat seçilmediğinde gösterilecek alanın merkezlenmiş düzeni */}
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Hoşgeldin 👋 Kasım</p> {/* Kullanıcıya hoş geldin mesajı */}
        <p>Select a chat to start messaging</p> {/* Chat seçilmesini isteyen mesaj */}
        <TiMessages className="text-xl md:text-4xl text-center" /> {/* Mesaj simgesi */}
      </div>
    </div>
  );
};
