import React from "react"; // React kütüphanesini içe aktarır.

const Message = () => {
  // "Message" isminde bir fonksiyonel bileşen tanımlar.
  return (
    // Bileşenin render edeceği JSX yapısını başlatır.
    <div className="chat chat-end">
      {" "}
      {/* Sohbet balonunun sağ tarafa yerleşmesini sağlayan kapsayıcı div. "chat-end" sınıfı ile mesaj sağda gösterilir. */}
      <div className="chat-image avatar">
        {" "}
        {/* Kullanıcı avatarını göstermek için kapsayıcı div. */}
        <div className="w-10 rounded-full">
          {" "}
          {/* Avatarın boyutunu ayarlar ve yuvarlatır. */}
          <img
            src="https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png"
            alt="avatar" // Avatar için bir görsel kullanılır.
          />
        </div>
      </div>
      <div className={`chat-bubble text-white bg-blue-500`}>
        {" "}
        {/* Mesaj balonunun stilini belirler, mavi arka plan ve beyaz metin rengi */}
        Selam naber {/* Mesaj içeriği */}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {" "}
        {/* Mesajın alt kısmında zaman damgası ve küçük metin boyutu ile zaman bilgisi */}
        15:12 {/* Mesajın gönderilme zamanı */}
      </div>
    </div>
  );
};

export default Message;
