import { useContext, useEffect, useState } from "react";
import NabarCart from "./navbarCart";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CategoryContext } from "../../contexts/category-context";
const NavBar = () => {
    const category = useContext(CategoryContext);
    const openNav = () => {
        document.getElementById("mySidenav").classList.add('open-side');
    }

    const closeNav = () => {
        document.getElementById("mySidenav").classList.remove('open-side');
    }

    const openSearch = () => {
        document.getElementById("search-overlay").style.display = "block";
    }

    const closeSearch = () => {
        document.getElementById("search-overlay").style.display = "none";
    }
    const logout = () => {  
        localStorage.removeItem("_tt");
        localStorage.removeItem("xxrevxx");
        window.location.href = "/sign-in";
      };
    const cart = useSelector(state => state.cart.storageItems)
    // let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    const cartLength = useSelector(state => state.cart.totalQuantity)
    const [searchParam, setSearchParam] = useState("");
    let [subTotal, setSubTotal] = useState(0);
    let isLoggedIn = false;

    const handleSubmit = (event) => {
        event.preventDefault();
        window.location.href = '/products/filter?name=' + searchParam;

    }
    if (localStorage.getItem('_tt')) {
        isLoggedIn = true
    }



    return (
        <div>
            <header>
                <div className="mobile-fix-option"></div>
                <div className="top-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="header-contact">
                                    <ul>
                                        <li>Welcome to our store cashiet</li>
                                        {/* <li><i className="fa fa-phone" aria-hidden="true"></i>Call Us: 08165155313</li> */}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-6 text-end">
                                <ul className="header-dropdown">
                                    <li className="mobile-wishlist"><a href="/wishlist"><i className="fa fa-heart" aria-hidden="true"></i></a>
                                    </li>
                                    <li className="onhover-dropdown mobile-account"> <i className="fa fa-user" aria-hidden="true"></i>
                                        My Account
                                        {!isLoggedIn &&
                                            <ul className="onhover-show-div">
                                                <li>
                                                    <a href="/sign-in">Login
                                                        {isLoggedIn}
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="/sign-up">register</a>
                                                </li>
                                            </ul>
                                        }
                                        {isLoggedIn &&
                                            <ul className="onhover-show-div">

                                                <li>
                                                    <a href="/dashboard">Dashboard</a>
                                                </li>
                                                <li onClick={logout}>
                                                    <a>Log out</a>
                                                </li>
                                            </ul>
                                        }
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="main-menu">
                                <div className="menu-left">
                                    <div className="navbar" style={{ paddingTop: '23px ', paddingBottom: '23px' }}>
                                        <a href="#" onClick={openNav}>
                                            <div className="bar-style"><i className="fa fa-bars sidebar-bar" aria-hidden="true"></i>
                                            </div>
                                        </a>
                                        <div id="mySidenav" className="sidenav">
                                            <a href="#" className="sidebar-overlay" onClick={closeNav}></a>
                                            <nav>
                                                <div onClick={closeNav}>
                                                    <div className="sidebar-back text-start"><i className="fa fa-angle-left pe-2"
                                                        aria-hidden="true"></i> Back</div>
                                                </div>

                                                {category.category && category.category.map((category) => (
                                                    <ul key={category._id} id="sub-menu" className="sm pixelstrap sm-vertical" >

                                                        <li><a href={`/products/filter?category=${category?._id}`}>{category.name}</a></li>
                                                    </ul>
                                                ))}


                                            </nav>
                                        </div>
                                    </div>
                                    <div className="brand-logo" style={{ paddingTop: '20px ', paddingBottom: '20px' }}>
                                        <a href={'/'}><img src={require('../../assets/images/icon/cashiet-logo2.png')}
                                            style={{ paddingTop: '0px ', paddingBottom: '0px' }} className="img-fluid blur-up lazyload" alt="" /></a>
                                    </div>
                                </div>
                                <div className="menu-right pull-right">
                                    <div>
                                        <nav id="main-nav">
                                            <div className="toggle-nav" ><i className="fa fa-bars sidebar-bar"></i></div>
                                            <ul id="main-menu" className="sm pixelstrap sm-horizontal">
                                                <li>
                                                    <div className="mobile-back text-end">Back<i className="fa fa-angle-right ps-2"
                                                        aria-hidden="true"></i></div>
                                                </li>
                                                <li><a href="/">Home</a></li>
                                                <li>
                                                    <a href="/about-us">About Us</a>
                                                </li>
                                                <li>
                                                    <a href="/contact-us">Contact Us</a>
                                                </li>
                                                <li>
                                                    <a href="/products">Shop</a>

                                                </li>
                                                <li>
                                                    {/* <a href="/how-it-works">How it works</a> */}

                                                </li>
                                                <li>
                                                    {/* <a href="/help-center">Help center</a> */}

                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                    <div>
                                        <div className="icon-nav">
                                            <ul>
                                                <li className="onhover-div mobile-search" >
                                                    <div>
                                                        <img src="assets/images/icon/search.png" onClick={openSearch}
                                                            className="img-fluid blur-up lazyload" alt="" /> <i className="ti-search"
                                                                onClick={openSearch}></i>
                                                    </div>
                                                    <div id="search-overlay" className="search-overlay">
                                                        <div> <span className="closebtn" onClick={closeSearch}
                                                            title="Close Overlay">×</span>
                                                            <div className="overlay-content">
                                                                <div className="container">
                                                                    <div className="row">
                                                                        <div className="col-xl-12">
                                                                            <form onSubmit={handleSubmit} >
                                                                                <div className="form-group">
                                                                                    <input type="text" className="form-control"
                                                                                        id="exampleInputPassword1"
                                                                                        placeholder="Search a Product"
                                                                                        value={searchParam}
                                                                                        onChange={(e) => setSearchParam(e.target.value)}
                                                                                    />
                                                                                </div>
                                                                                <button type="submit" className="btn btn-primary">
                                                                                    <i className="fa fa-search"></i>
                                                                                </button>
                                                                            </form>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="onhover-div mobile-cart" >
                                                    <div><img src="assets/images/icon/cart.png"
                                                        className="img-fluid blur-up lazyload" alt="" /> <i
                                                            className="ti-shopping-cart"></i></div>
                                                    {cartLength >= 1 ?
                                                        <span className="cart_qty_cls">{cartLength}</span> : ''
                                                    }
                                                    <NabarCart />
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default NavBar;