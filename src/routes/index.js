import { Route, Routes } from 'react-router-dom';
import App from '../App';
import Layout from '../views/layouts/index';
import Index from '../views/public';
import SignIn from '../views/auth/sign-in';
import SignUp from '../views/auth/sign-up';
import Cart from '../views/cart';
import VerifyEmail from '../views/auth/verify-email';
import DashboardIndex from '../dashboard';
import ProtectRoute from '../protect-route';
import ForgotPassword from '../views/auth/forgot-password';
import ResetPassword from '../views/auth/reset-password';
import Products from '../views/products/products';
import Product from '../views/products/product';
import AboutUs from '../views/public/about-us';
import FAQ from '../views/public/faq';
import ContactUs from '../views/public/contact-us';
import Wishlist from '../dashboard/components/wishlist/wishlist';
import Checkout from '../views/checkout/checkout';
import SingleOrder from '../dashboard/components/view-order';
import SkeletonCart from '../views/skeleton-cart';
import Order from '../dashboard/components/orders/order';
import OkraW from '../dashboard/components/okra/okra';
import HowItWorks from '../views/public/how-it-works';
import HelpCenter from '../views/public/help-center';
import Revoked from '../views/revoked';
import PrivacyPolicy from '../views/public/privacy-policy';
import TermsOfSerive from '../views/public/terms-of-service';
import Payments from '../views/checkout/payments';
const routes = [
    <Routes>
        <Route path="" element={<App />} >
            <Route path='/' element={<Layout />}>
                {/* <Route path='/t' element={ <Ts/> } ></Route> */}
                <Route path='' element={<Index />} ></Route>
                <Route path='/sign-in' element={<SignIn />} ></Route>
                <Route path='/sign-up' element={<SignUp />} ></Route>
                <Route path='/forgot-password' element={<ForgotPassword />} ></Route>
                <Route path='/password-reset' element={<ResetPassword />} ></Route>
                <Route path='/confirm-email/:emailToken' element={<VerifyEmail />} ></Route>

                <Route path='/cart' element={<Cart />} ></Route>
                <Route path='/products' element={<Products />} ></Route>
                <Route path='/products/filter' element={<Products />} ></Route>
                <Route path='/product/:productId' element={<Product />} ></Route>
                <Route path='/about-us' element={<AboutUs />} ></Route>
                <Route path='/faq' element={<FAQ />} ></Route>
                <Route path='/contact-us' element={<ContactUs />} ></Route>
                <Route path='/order/:id' element={<Order />} ></Route>


                <Route path='/how-it-works' element={<HowItWorks />} ></Route>
                <Route path='/help-center' element={<HelpCenter />} ></Route>
                <Route path='/privacy-policy' element={<PrivacyPolicy />} ></Route>
                <Route path='/terms-of-service' element={<TermsOfSerive />} ></Route>


                <Route element={<ProtectRoute />} >
                    <Route path='/check-out' element={<Checkout />} ></Route>
                    <Route path='/payments/:invoiceId' element={<Payments />} />
                    <Route path='/okra' element={<OkraW />}></Route>
                    <Route path='/dashboard' element={<DashboardIndex />} >
                    </Route>
                    <Route path='/wishlist' element={<Wishlist />} ></Route>
                    <Route path='/orders' element={<SingleOrder />} ></Route>
                </Route>


                <Route path='/user-revoked' element={<Revoked />}></Route>
            </Route>
        </Route>
    </Routes>
]

export default routes;