import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext(); // SocketContext'i oluşturuyoruz, bu context uygulama boyunca kullanılacak

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => {
  return useContext(SocketContext); // SocketContext'ten değer alabilmek için hook oluşturuyoruz
};

export const SocketContextProvider = ({ children }) => {
  // Provider, context'in değerlerini alt bileşenlere iletecek
  const [socket, setSocket] = useState(null); // socket state'ini tanımlıyoruz, başta null
  const [onlineUsers, setOnlineUsers] = useState([]); // Çevrimiçi kullanıcıları saklamak için state
  const { authUser } = useAuthContext(); // AuthContext'ten login olmuş kullanıcı bilgilerini alıyoruz

  useEffect(() => {
    // useEffect, authUser değiştiğinde socket bağlantısını yönetiyor
    if (authUser) {
      // Eğer authUser varsa, soket bağlantısı kuruyoruz
      const socket = io("https://chat-app-yt.onrender.com", {
        // Socket.io üzerinden bağlanıyoruz
        query: {
          userId: authUser._id, // Kimlik doğrulama için userId gönderiyoruz
        },
      });

      setSocket(socket); // Kurduğumuz socket'i state'e kaydediyoruz

      // getOnlineUsers event'ini dinliyoruz, sunucudan çevrimiçi kullanıcı bilgilerini alıyoruz
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users); // Çevrimiçi kullanıcıları state'e kaydediyoruz
      });

      return () => socket.close(); // Component unmount olduğunda socket bağlantısını kapatıyoruz
    } else {
      // Eğer authUser yoksa
      if (socket) {
        socket.close(); // Mevcut soket bağlantısını kapatıyoruz
        setSocket(null); // Socket state'ini null yapıyoruz
      }
    }
  }, [authUser]); // authUser değiştiğinde bu effect çalışacak

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  ); // Provider ile alt bileşenlere değerleri sağlıyoruz
};
