

import Navbar from './Navbar';
import Search from './Search';
import Chats from './Chats';


const Sidebar = () => {
  return (
    <div className='bg-[#214e6e] w-[35%] '>
      <Navbar/>
      <Search/>
      <Chats/>

    </div>
  )
};

export default Sidebar;
