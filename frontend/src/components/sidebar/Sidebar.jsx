import Conversations from "./Conversations"; 
import LogoutButton from "./LogoutButton"; 
import SearchInput from "./SearchInput";  

const Sidebar = () => {
	return (
		<div className='border-r border-slate-500 p-4 flex flex-col'>
			<SearchInput />  {/* Arama input alanı */}
			<div className='divider px-3'></div>  {/* Bölücü çizgi */}
			<Conversations />  {/* Konuşmaların listelendiği alan */}
			<LogoutButton />  {/* Çıkış yapma butonu */}
		</div>
	);
};
export default Sidebar;
