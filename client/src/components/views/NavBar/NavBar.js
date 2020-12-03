import React, { useState, useEffect } from 'react';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button, Icon } from 'antd';
import { auth } from '../../../_actions/user_actions';
import { useSelector, useDispatch } from "react-redux";
import './Sections/Navbar.css';

function NavBar() {
  let user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [admin, setAdmin] = useState(false);
  
  useEffect(() => {
    dispatch(auth()).then(response => {
      setAdmin(response.payload.isAdmin);
    })
  }, [])

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  return (
    <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
      <div className="menu__logo">
        <a href="/">순천향대 온라인 서점</a>
      </div>
      <div className="menu__container">
        <div className="menu_rigth">
            <RightMenu mode="horizontal" />
        </div>
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
          <Icon type="align-right" />
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  )
}

export default NavBar