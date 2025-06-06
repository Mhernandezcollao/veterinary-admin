import { useState } from 'react';
import { FaChartBar, FaRegCalendarAlt } from 'react-icons/fa';
import { IoBookOutline, IoGlobeOutline } from 'react-icons/io5';
import { MdOutlineDiamond, MdOutlineShoppingCart } from 'react-icons/md';
import { RiInkBottleLine } from 'react-icons/ri';
import { Menu, menuClasses, MenuItem, Sidebar, SubMenu, type MenuItemStyles } from 'react-pro-sidebar';


export const NavbarSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);

  const menuItemStyles: MenuItemStyles = {
    root: {
      fontSize: '13px',
      fontWeight: 400,
    },
    icon: {
      color: '#0098e5',
      [`&.${menuClasses.disabled}`]: {
        color: '#9fb6cf',
      },
    },
    SubMenuExpandIcon: {
      color: '#b6b7b9',
    },
    subMenuContent: ({ level }) => ({
      backgroundColor: level === 0 && !collapsed ? 'bg-white/40' : 'transparent',
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: '#9fb6cf',
      },
      '&:hover': {
        backgroundColor: '#c5e4ff',
        color: '#44596e',
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };

  return (
    <div className="flex h-full">
      <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        onBreakPoint={setBroken}
        breakPoint="md"
        backgroundColor={'#ffffff'}
        rootStyles={{
          color: '#607489',
        }}
      >
        <div className="flex flex-col h-full">
          <button onClick={() =>setCollapsed(!collapsed)}>Collapse</button>
          <div className="flex-1 mb-8">
            <div className="px-6 mb-2">
              <p>
                General
              </p>
            </div>
            <Menu menuItemStyles={menuItemStyles}>
              <SubMenu
                label="Charts"
                icon={<FaChartBar />}
              >
                <MenuItem>Pie charts</MenuItem>
                <MenuItem>Line charts</MenuItem>
                <MenuItem>Bar charts</MenuItem>
              </SubMenu>
              <SubMenu label="Maps" icon={<IoGlobeOutline />}>
                <MenuItem>Google maps</MenuItem>
                <MenuItem>Open street maps</MenuItem>
              </SubMenu>
              <SubMenu label="Theme" icon={<RiInkBottleLine />}>
                <MenuItem>Dark</MenuItem>
                <MenuItem>Light</MenuItem>
              </SubMenu>
              <SubMenu label="Components" icon={<MdOutlineDiamond />}>
                <MenuItem>Grid</MenuItem>
                <MenuItem>Layout</MenuItem>
                <SubMenu label="Forms">
                  <MenuItem>Input</MenuItem>
                  <MenuItem>Select</MenuItem>
                  <SubMenu label="More">
                    <MenuItem>CheckBox</MenuItem>
                    <MenuItem>Radio</MenuItem>
                  </SubMenu>
                </SubMenu>
              </SubMenu>
              <SubMenu label="E-commerce" icon={<MdOutlineShoppingCart />}>
                <MenuItem>Product</MenuItem>
                <MenuItem>Orders</MenuItem>
                <MenuItem>Credit card</MenuItem>
              </SubMenu>
            </Menu>

            <div className="px-6 mb-2 mt-8">
              <p>
                Extra
              </p>
            </div>

            <Menu menuItemStyles={menuItemStyles}>
              {/* <MenuItem icon={<Calendar />} suffix={<Badge variant="success">New</Badge>}> */}
              <MenuItem icon={<FaRegCalendarAlt />}>
                Calendar
              </MenuItem>
              <MenuItem icon={<IoBookOutline />}>Documentation</MenuItem>
              <MenuItem disabled icon={<IoBookOutline />}>
                Examples
              </MenuItem>
            </Menu>
          </div>
          {/* <SidebarFooter collapsed={collapsed} /> */}
        </div>
      </Sidebar>
    </div>
  );
};