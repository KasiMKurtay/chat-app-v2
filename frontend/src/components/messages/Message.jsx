import { useAuthContext } from "../../context/AuthContext"; 
import { extractTime } from "../../utils/extractTime"; 
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
  const { authUser } = useAuthContext(); // Kullanıcı bilgisini context'ten alır
  const { selectedConversation } = useConversation(); // Seçili sohbet bilgisini zustand store'dan alır
  const fromMe = message.senderId === authUser._id; // Mesajın kullanıcıya ait olup olmadığını kontrol eder
  const formattedTime = extractTime(message.createdAt); // Mesajın zaman bilgisini formatlar
  const chatClassName = fromMe ? "chat-end" : "chat-start"; // Mesajın kullanıcıya mı yoksa diğerine mi ait olduğuna göre stil sınıfı belirler
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic; // Gönderenin profil fotoğrafını seçer
  const bubbleBgColor = fromMe ? "bg-blue-500" : ""; // Mesajın arka plan rengini kullanıcıya aitse mavi yapar

  const shakeClass = message.shouldShake ? "shake" : ""; // Eğer mesajın sallanması gerektiği işaretlenmişse "shake" sınıfını ekler

  return (
    <div className={`chat ${chatClassName}`}>
      {" "}
      // Mesajın pozisyonunu kullanıcıya aitse sağa, diğerine aitse sola hizalar
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} /> //
          Kullanıcının profil fotoğrafını görüntüler
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
      >
        {" "}
        // Mesaj balonunun stilini ve sallanma efektini uygular
        {message.message} // Mesajın içeriğini gösterir
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {" "}
        // Mesajın alt kısmında zaman bilgisini gösterir
        {formattedTime}
      </div>
    </div>
  );
};

export default Message; 
