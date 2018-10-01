import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';

const menus = [
    {
        name: 'Home',
        to: '/',
        exact: true
    },
    {
        name: 'Product',
        to: '/products',
        exact: false
    }
];

const MenuLink = ({label, to, actviveWhenExact}) =>{
    return (
        <Route 
            path={to}
            exact={actviveWhenExact}
            children={({match}) => {
                var active = match? 'active' : '';
                return (
                    <li className={active}>
                        <Link to={to}>
                            {label}
                        </Link>
                    </li>
                )
            }}
        />
    );
};

class Menu extends Component {
    render() {
        return (
            <div className="navbar navbar-default">
                <a className="navbar-brand" >Call API</a>
                <ul className="nav navbar-nav">
                    {this.showMenu(menus)}
                </ul>
            </div>
        );
    }

    showMenu = (menus) =>{
        var result = null;
        if(menus.length > 0 ){
            result = menus.map((menu, index) => {
                return (
                    <MenuLink
                        key={index}
                        label={menu.name}
                        to={menu.to}
                        actviveWhenExact={menu.exact}
                    />
                )
            });
        }
        return result;
    }
}

export default Menu;