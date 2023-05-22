import axios from "axios";
import Okra from "okra-js"
import toast from "react-hot-toast"
import httpService from "../../../services/http-service"
// import logo from './logo.svg';

const OkraW = () => {
  let details = {};
  const widgetOkra = () => {

    Okra.buildWithOptions({
      name: 'CASHIET',
      env: 'production',
      app_id: '',// app_id from your app builder
      key: 'e9a54eb4-6490-5d01-894c-9590356297ee',
      token: '61c8f0e2c2e47e0322e78af0',
      products: ['transactions', 'identity', 'balance'],
      onSuccess: function (data) {
        console.log(data);
        details = {
          customerId: data?.identity?.customer,
          accountId: data?.accounts[0]?.id,
          recordId: data?.record_id,
          balance: data?.balance?.data?.formatted[0].available_balance,
          okra_id: data?.identity?.id
        };

        sendOkarResponse(details)

        // getTransactions(data?.transactions?.transactions.callback_url);

      },
      onerror: function (error) {
        toast.error('your verification has ended. Please try again')

      },
      onClose: function () {
        toast.error('your verification has ended')
        console.log('options close')
      }
    })

  }
  const getTransactions = async (url) => {
    await axios.get(url).then((data) => {
      console.log(data);

    }).catch((error) => {
      console.log(error);
    })
  };
  const sendOkarResponse = (data) => {
    httpService.post({ endpoint: '/okra/save/', details: data }).then((resp) => {
      console.log(resp);
      if (resp.status) {
        toast.success('Verification successful')

      }
    }).catch((error) => { toast.error('sorry an error occured please try again') })
  }
  return (
    <div className="my-6">
      <h5 className="v-t text-center px-4 capitalize ">this verification,  if successful will give the you the ability to purchase on CASHIET and pay later or pay installmentaly</h5>
      <button style={{ width: '200px' }} onClick={() => widgetOkra()} className="text-sm-cashiet btn btn-solid text-nowrap px-2 p-2">
        start your verification
      </button>
    </div>
  );
}

export default OkraW;