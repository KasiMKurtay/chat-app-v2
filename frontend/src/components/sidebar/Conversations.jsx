import React from 'react'; // React kütüphanesini içe aktarır, React kullanmak için gerekli.
import Conversation from './Conversation'; // "Conversation" bileşenini başka bir dosyadan içe aktarır.

const Conversations = () => { // "Conversations" isminde bir fonksiyonel bileşen tanımlar.
  return ( // Bileşenin render edeceği JSX yapısını başlatır.
    <div className='py-2 flex flex-col overflow-auto'> 
      {/* Yukarıdan ve aşağıdan 2 birim boşluk (py-2) ekler, flexbox ile dikeyde hizalar, içerik taşarsa kaydırma çubuğu ekler. */}
      <Conversation /> {/* Conversation bileşenini 6 kez çağırır, her biri bir sohbeti temsil eder. */}
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
    </div>
  );
};

export default Conversations; 
