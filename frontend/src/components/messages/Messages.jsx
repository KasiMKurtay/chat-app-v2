import React from "react"; // React kütüphanesini içe aktarır.
import Message from "./Message"; // "Message" bileşenini içe aktarır.

const Messages = () => {
  // "Messages" isminde bir fonksiyonel bileşen tanımlar.
  return (
    <div className="px-4 flex-1 overflow-auto">
      {" "}
      {/* Mesajları sarmalayan bir div, içeriği taşmasını engellemek için scroll özelliği ekler */}
      <Message />{" "}
      {/* Mesaj bileşenini çağırır ve her biri bir mesajı temsil eder */}
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </div>
  );
};

export default Messages;
