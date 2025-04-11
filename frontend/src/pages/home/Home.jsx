import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
  // Home bileşeni, ana sayfa bileşenidir
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      {/* Ana container div'ini tanımlıyoruz. flex ile çocuk bileşenlerini yan yana yerleştiriyoruz.
				Responsive tasarım için sm ve md breakpoint'lerinde yükseklik değerini değiştiriyoruz. 
				Bu div, hem arka plan rengini hem de blurlama efektini içeriyor. */}
      <Sidebar /> {/* Sidebar bileşenini yerleştiriyoruz */}
      <MessageContainer /> {/* Mesajları gösteren bileşeni yerleştiriyoruz */}
    </div>
  );
};
export default Home;
