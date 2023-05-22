import { useState } from "react";
import toast from "react-hot-toast";
import httpService from "../../services/http-service";
import Breadcrumb from "../layouts/breadcrumb";

const ContactUs = () => {
    const [contactUs, setContactUs] = useState('');
    const [Loading, setLoading] = useState('');
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContactUs((prevState) => ({
            ...prevState,
            [name]: value
        }))

    }
    const createContact = async(e)=>{
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await httpService.post({endpoint:'/contact', details:contactUs})
            if (response.status) {
                toast.success(response.data.message);

                setLoading(false);
            }
            else{
                throw response;
            }
        }
        catch (e) {
            setLoading(false)
            if(e.response.data.status === 400){

            }
            else{
                toast.error(e.response.data.message);
            }
        }
    }
    return (
        <>
            {/* breadcrumb start */}
            <Breadcrumb title="Contact Us" breadcrumbItem="Contact Us" />
            {/* breadcrumb End */}

            {/*section start*/}
            <section className="contact-page section-b-space">
                <div className="container">
                {/* <div className="row section-b-space">
                    <div className="col-lg-7 map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1605.811957341231!2d25.45976406005396!3d36.3940974010114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1550912388321" allowFullScreen />
                    </div>
                    <div className="col-lg-5">
                    <div className="contact-right">
                        <ul>
                        <li>
                            <div className="contact-icon"><img src="../assets/images/icon/phone.png" alt="Generic placeholder image" />
                            <h6>Contact Us</h6>
                            </div>
                            <div className="media-body">
                            <p>+91 123 - 456 - 7890</p>
                            <p>+86 163 - 451 - 7894</p>
                            </div>
                        </li>
                        <li>
                            <div className="contact-icon"><i className="fa fa-map-marker" aria-hidden="true" />
                            <h6>Address</h6>
                            </div>
                            <div className="media-body">
                            <p>ABC Complex,Near xyz, New York</p>
                            <p>USA 123456</p>
                            </div>
                        </li>
                        <li>
                            <div className="contact-icon"><img src="../assets/images/icon/email.png" alt="Generic placeholder image" />
                            <h6>Address</h6>
                            </div>
                            <div className="media-body">
                            <p>Support@Shopcart.com</p>
                            <p>info@shopcart.com</p>
                            </div>
                        </li>
                        <li>
                            <div className="contact-icon"><i className="fa fa-fax" aria-hidden="true" />
                            <h6>Fax</h6>
                            </div>
                            <div className="media-body">
                            <p>Support@Shopcart.com</p>
                            <p>info@shopcart.com</p>
                            </div>
                        </li>
                        </ul>
                    </div>
                    </div>
                </div> */}
                <div className="row">
                    <div className="col-sm-12">
                    <form className="theme-form" onSubmit={e => createContact(e)}>
                        <div className="form-row row">
                        <div className="col-md-6">
                            <label htmlFor="name">First Name</label>
                            <input type="text" className="form-control" name="firstName" id="name" placeholder="Enter Your name" required onChange={handleInputChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="email">Last Name</label>
                            <input type="text" className="form-control" name="lastName" id="last-name" placeholder="Enter Your Last name" required onChange={handleInputChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="review">Phone number</label>
                            <input type="number" className="form-control" name="phoneNumber" id="review" placeholder="Enter Your number" required onChange={handleInputChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="email">Email</label>
                            <input type="text" className="form-control" name="email" id="email" placeholder="Enter Your Email" required onChange={handleInputChange} />
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="review">Write Your Message</label>
                            <textarea className="form-control" placeholder="Write Your Message" name="message" id="exampleFormControlTextarea1" rows={6} defaultValue={""} required onChange={handleInputChange}/>
                        </div>
                        <div className="col-md-12">
                            <button className="btn btn-solid" type="submit">{Loading ? 'Loading...' :  'Send Your Message'}</button>
                        </div>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </section>
            {/*Section ends*/}
        </>
    )
}

export default ContactUs;