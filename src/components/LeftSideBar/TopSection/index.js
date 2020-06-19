import React, { useContext } from 'react';
import BurgerButton from '../BurgerButton';
import { LeftSideBarContext } from '../index';
import './style.scss';

const TopSection = () => {
  const { setIsShowSidebar } = useContext(LeftSideBarContext);
  return (
    <div className="LeftSideBar__TopSection">
      <BurgerButton
        onClick={() => setIsShowSidebar(true)}
      />
      <div className="LeftSideBar__TopSection__Title">Shoes Shop Admin Page</div>
      <div className="LeftSideBar__TopSection__SignOut">
        <a href="/login" onClick={() => localStorage.removeItem("token")}>Sign out</a>
      </div>
    </div>
  );
};

export default TopSection;
