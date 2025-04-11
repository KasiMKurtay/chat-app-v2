import React, { useEffect } from "react";
import Messages from "./Messages"; 
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti"; 
import useConversation from "../../zustand/useConversation";
const MessageContainer = () => {
  // Mesaj kutusunun ana bileşeni olarak fonksiyonel bir bileşen tanımlar.
  const { selectedConversation, setSelectedConversation } = useConversation(); // Seçilen konuşmayı ve onu sıfırlamak için set fonksiyonunu zustand'dan alır.

  useEffect(() => {
    // Bileşen unmounted (sayfa kapanırken) olduğunda seçilen sohbeti sıfırlamak için useEffect kullanır.
    return () => setSelectedConversation(null); // Sayfa kapandığında sohbeti sıfırlar.
  }, [setSelectedConversation]); // Bu efekt yalnızca setSelectedConversation değiştiğinde çalışır.

  return (
    // Bileşenin render edeceği JSX yapısını başlatır.
    <div className="md:min-w-[450px] flex flex-col">
      {/* Mesaj kutusunun stilini belirler: belirli bir genişlik ve flex düzeni */}
      {!selectedConversation ? ( // Eğer seçili bir sohbet yoksa, "NoChatSelected" bileşenini gösterir.
        <NoChatSelected />
      ) : (
        // Aksi takdirde (yani sohbet seçildiyse) aşağıdaki içerik render edilir.
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2">
            {/* Chat başlığını ve kimle konuşulduğunu gösteren alan */}
            <span className="label-text">To:</span> {/* "To:" etiketi */}
            <span className="text-gray-900 font-bold">
              {selectedConversation.fullName} {/* Mesajlaşılacak kişinin adı */}
            </span>
          </div>
          <Messages /> {/* Mesajları listeleyen bileşeni render eder */}
          <MessageInput /> {/* Mesaj yazma alanını render eder */}
        </>
      )}
    </div>
  );
};

export default MessageContainer; // "MessageContainer" bileşenini dışa aktarır.

const NoChatSelected = () => {
  // "NoChatSelected" isminde bir bileşen tanımlar.
  return (
    <div className="flex items-center justify-center w-full h-full">
      {/* Chat seçilmediğinde gösterilecek alanın merkezlenmiş düzeni */}
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Hoşgeldin 👋 Kasım</p> {/* Kullanıcıya hoş geldin mesajı */}
        <p>Select a chat to start messaging</p>{" "}
        {/* Chat seçilmesini isteyen mesaj */}
        <TiMessages className="text-xl md:text-4xl text-center" />{" "}
        {/* Mesaj simgesi */}
      </div>
    </div>
  );
};
