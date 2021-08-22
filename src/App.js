import CssBaseline from '@material-ui/core/CssBaseline';
import { useState } from 'react';

import Content from "./layout/Content";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";

function App() {

  const [sidebarOpened, setSidebarOpened] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpened(!sidebarOpened)
  }


  return (
    <>
      <CssBaseline />

      <Header sidebarOpened={sidebarOpened} onToggleSidebar={toggleSidebar} />
      <Sidebar opened={sidebarOpened}/>
      <Content />
      <Footer />


    </>
  );
}

export default App;
