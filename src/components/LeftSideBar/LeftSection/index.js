/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import BurgerButton from '../BurgerButton';
import { LeftSideBarContext } from '../index';
import { NavLink } from 'react-router-dom';
import './style.scss';

const LeftSection = () => {
  const { isShowSidebar, setIsShowSidebar } = useContext(LeftSideBarContext);
  return (
    <div className={`LeftSideBar__LeftSection LeftSideBar__LeftSection--${isShowSidebar ? 'show' : 'hide'}`}>
      <div className="LeftSideBar__LeftSection__topWrapper">
        <BurgerButton
          onClick={() => setIsShowSidebar(false)}
        />
        <h3 className="LeftSideBar__LeftSection__topWrapper__title">Shoes Shop</h3>
      </div>
      <ul className="LeftSideBar__LeftSection__menuWrapper">
        <li>
          <NavLink to="/admin/products" activeClassName="navlink-selected" onClick={() => setIsShowSidebar(false)}>
            Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/orders" activeClassName="navlink-selected" onClick={() => setIsShowSidebar(false)}>
            Orders
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/customers" activeClassName="navlink-selected" onClick={() => setIsShowSidebar(false)}>
            Customers
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/feedbacks" activeClassName="navlink-selected" onClick={() => setIsShowSidebar(false)}>
            Feedbacks
          </NavLink>

        </li>
      </ul>
    </div>
  );
};

export default LeftSection;
