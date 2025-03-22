import React from "react"; // React kütüphanesini içe aktarır, React kullanmak için gerekli.
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;

  // "Conversation" isminde bir fonksiyonel bileşen tanımlar.
  return (
    // Bileşenin render edeceği JSX yapısını başlatır.
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
          ${isSelected ? "bg-sky-500" : ""}
          `}
        onClick={() => setSelectedConversation(conversation)}
      >
        {/* Flexbox düzenini kullanarak öğeleri yatayda hizalar, gap-2 ile aralarına boşluk ekler, öğeye hover efekti ve yuvarlak köşe verir. */}
        <div className="avatar online">
          {/* Kullanıcının avatar'ını gösterecek bir kapsayıcı div. "online" sınıfı aktifse çevresi yeşil olabilir. */}
          <div className="w-12 rounded-full">
            {/* Avatarın boyutunu 12 birim genişliğinde yapar ve yuvarlak hale getirir. */}
            <img src={conversation.profilePic} alt="user avatar" />
            {/* Kullanıcı avatar'ı olarak bir resim yükler. */}
          </div>
        </div>
        <div className="flex flex-col flex-1">
          {/* Kullanıcı adı ve emoji gibi içerikleri dikeyde hizalamak için flexbox düzeni kullanılır. */}
          <div className="flex gap-3 justify-between">
            {/* İçeriği yatayda hizalamak ve aralarına boşluk eklemek için flexbox düzeni kullanır. */}
            <p className="font-bold text-gray-200">{conversation.fullName}</p>
            {/* Kullanıcının ismini koyar ve fontunu kalın yapar, metnin rengini gri yapar. */}
            <span className="text-xl">{emoji}</span>
            {/* Kullanıcının durumunu veya mesajını ifade eden bir emoji (👣) ekler. */}
          </div>
        </div>
      </div>
      {!lastIdx && <div className="divider my-0 py-0 h-1"></div>}
      {/* Eğer ki en alttaki kişi kutucuğu değilse her bir kişi öğesinin altına divider(çizgi ) ekler */}
    </>
  );
};

export default Conversation;
