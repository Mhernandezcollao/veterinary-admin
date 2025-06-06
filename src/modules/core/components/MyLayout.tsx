import {
  Button,
  Card,
} from "@heroui/react";
import { IoMenu } from "react-icons/io5";
import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { NavbarSidebar } from "./NavbarSidebar";
import { DropdownLanguage } from "./DropdownLanguage";


export const MyLayout = () => {

  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [height, setHeight] = useState(window.innerHeight);

  const path = pathname.split('/').slice(1);

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const myHeight = height - 88;

  return (
    <div className="flex h-screen w-screen bg-bgcustom">

      {/* Sidebar */}
      <NavbarSidebar/>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="flex w-full items-center p-4">
          <Card className="flex-row w-full justify-between items-center h-[40px] overflow-hidden rounded-md">
            <div className="flex items-center">
              {/* Boton menu */}
              <Button isIconOnly aria-label="Like" radius="full" variant="light" color="primary">
                <IoMenu size={24} color="#909DAC"/>
              </Button>
              {/* titulo ruta */}
              <p className="text-[12px] font-semibold">{t(path)}</p>
            </div>
            {/* Seleciconar idioma */}
            <DropdownLanguage/>
          </Card>
        </header>
        {/* Contenido dinámico */}
        <div className="flex h-full w-full px-4">
          <div className="flex flex-1 overflow-auto" style={{height: myHeight}}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}