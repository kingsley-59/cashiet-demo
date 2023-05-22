import { Link } from 'react-router-dom';
import Subscribe from '../../dashboard/components/subscribe';


const Footer = () => {
    return(
        <div className=' mt-4'>
            {/* footer */}
                <footer className="footer-light">
                    <div className="light-layout">
                        <div className="container">
                            <section className="small-section border-section border-top-0">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="subscribe">
                                            <div>
                                                <h4>KNOW IT ALL FIRST!</h4>
                                                <p>Never Miss Anything From Cashiet By Signing Up To Our Newsletter</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <Subscribe/>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                    <section className="section-b-space light-layout">
                        <div className="container">
                            <div className="row footer-theme partition-f">
                                <div className="col-lg-6 col-md-6">
                                    <div className="footer-title footer-mobile-title">
                                        <h4>about</h4>
                                    </div>
                                    <div className="footer-contant">
                                        <div className="footer-logo"><img src={require('../../assets/images/icon/cashiet-logo2.png')} alt="" /></div>
                                        <p>CASHIET is a platform that creates an affordable means of payment for goods and services. </p>
                                        <div className="footer-social">
                                            <ul>
                                                <li><a href="https://facebook.com/cashietng"><i className="fa fa-facebook-f"></i></a></li>
                                                {/* <li><Link to="/"><i className="fa fa-google-plus"></i></Link></li> */}
                                                <li><a href="https://twitter.com/cashiet"><i className="fa fa-twitter"></i></a></li>
                                                <li><a  href="https://instagram.com/cashietng"><i className="fa fa-instagram"></i></a></li>
                                                {/* <li><Link to="/"><i className="fa fa-rss" aria-hidden="true"></i></Link></li> */}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="sub-title">
                                        <div className="footer-title">
                                            <h4>why we choose</h4>
                                        </div>
                                        <div className="footer-contant">
                                            <ul>
                                                <li><Link to="/">Home</Link></li>
                                                <li><Link to="/about-us">about us </Link></li>
                                                <li><Link to="/contact-us">contact us</Link></li>
                                                <li><Link to="/products">shop</Link></li>
                                                {/* <li><Link to="#">how it works</Link></li> */}
                                                {/* <li><Link to="#">help center</Link></li> */}
                                                <li><Link to="/privacy-policy">Privacy policy</Link></li>
                                                <li><Link to="/terms-of-service">Terms and Conditions</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="sub-title">
                                        <div className="footer-title">
                                            <h4>store information</h4>
                                        </div>
                                        <div className="footer-contant">
                                            <ul className="contact-list">
                                                <li><i className="fa fa-map-marker"></i>174 University Road Tanke Ilorin Kwara State </li>
                                                <li><i className="fa fa-phone"></i>Call Us: 08165155313 / 09013666883</li>
                                                <li><i className="fa fa-envelope"></i>Email Us: <Link to="/">cashietltd@gmail.com </Link></li>
                                                <li><i className="fa fa-fax"></i>Fax: 09013666883</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="sub-footer">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-6 col-md-6 col-sm-12">
                                    <div className="footer-end">
                                        <p><i className="fa fa-copyright" aria-hidden="true"></i> 2022-22 cashiet powered by cyclebreeze</p>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-md-6 col-sm-12">
                                    <div className="payment-card-bottom">
                                        <ul>
                                            <li>
                                                <Link to="/"><img src="../assets/images/icon/visa.png" alt="" /></Link>
                                            </li>
                                            <li>
                                                <Link to="/"><img src="../assets/images/icon/mastercard.png" alt="" /></Link>
                                            </li>
                                            <li>
                                                <Link to="/"><img src="../assets/images/icon/paypal.png" alt="" /></Link>
                                            </li>
                                            <li>
                                                <Link to="/"><img src="../assets/images/icon/american-express.png" alt="" /></Link>
                                            </li>
                                            <li>
                                                <Link to="/"><img src="../assets/images/icon/discover.png" alt="" /></Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            {/* footer end  */}
        </div>
    )
}

export default Footer;