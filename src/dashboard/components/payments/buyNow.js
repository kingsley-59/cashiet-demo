import RemitaPayment from "react-remita";
import { useContext, useEffect, useState } from "react";
import '../../../index.css'
import toast from "react-hot-toast";
import { UserContext } from "../../../contexts/user-context";
import httpService from "../../../services/http-service";

function BuyNow({ amount, order }) {
  const { user } = useContext(UserContext);
  const [invoice, setInvoice] = useState('');
  let userEmail = user?.user?.email;
  const paymentData = {
    key: process.env.REACT_APP_REMITAL_KEY, // enter your key here
    customerId: user ? user._id : '',
    firstName: user ? user.firstName : '',
    lastName: user ? user.lastName : '',
    email: userEmail ? userEmail : '',
    amount: amount,
    narration: "Cashiet payment for order",
  };
  const getInvoice = async()=>{
    try {
      const response = await httpService.get('/invoice/order/'+order);
    
      if (response.status === 200) {
        let id = response.data.allInvoices[0]._id;
        setInvoice(id)
      }
    } catch (error) {
      
    }
  }
  const handleRemitalResponse = (response) => {
    let updatedResponse = { ...response, order: order, invoice: invoice };
    httpService.post({
      endpoint: '/transactions',
      details: updatedResponse
    }).then((resp) => {
      if (resp.status == 200) {
        window.location.href= "/dashboard";
      }
    }).catch((error)=>{
      handleRemitalResponse();
    })
  }
  let data = {
    ...paymentData,
    onSuccess: function (response) {
      // function callback when payment is successful
      handleRemitalResponse(response);
    },
    onError: function (response) {
      // function callback when payment fails
    },
    onClose: function () {
      // function callback when payment modal is closed
    },
  };
  useEffect(()=>{
    getInvoice();
  }, [order])

  return (
      <RemitaPayment
        remitaData={data}
        className='btn btn-solid text-sm text-nowrap mx-3'  // class to style the button
        text='Pay with Remita' //text to show on button
      // add a 'live' prop to use the live urls/keys
      />
  );
}

export default BuyNow;