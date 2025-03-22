import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";

const Home = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      {/*yatayda sırala 
      sm:h-[450px] küçük ekranlarda yükseklik 450px
      md:h-[550px] orta ekranlarda 550px
      rounded-lg:kenarlar oval
      overflow-hidden:taşan içerik gizlenir
      bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 : arka planı bulaklaştırmna efekti
      */}
      <Sidebar />
      {/*Sol tarafta sidebar */}
      <MessageContainer />
      {/*Sağda aktif sohbet mesajlar */}
    </div>
  );
};

export default Home;
