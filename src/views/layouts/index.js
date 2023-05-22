import { Outlet } from "react-router-dom";
import Footer from "./footer";
import NavBar from "./navbar";

const Layout = () => {
    return(
        <div>
            {/* NavBar */}
            <NavBar/>

            <Outlet></Outlet>

            {/* Footer */}
            <div className="block" style={{marginTop:'100px'}}>
            <Footer/>

            </div>
        </div>
    )
}

export default Layout;