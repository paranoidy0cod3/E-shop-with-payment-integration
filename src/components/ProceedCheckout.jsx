import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";

const ProceedCheckout = ({ cartItems }) => {
  const ABA_PAYWAY_API_URL = import.meta.env.VITE_ABA_PAYWAY_API_URL;
  const ABA_PAYWAY_API_KEY = import.meta.env.VITE_ABA_PAYWAY_API_KEY;
  const ABA_PAYWAY_MERCHANT_ID = import.meta.env.VITE_ABA_PAYWAY_MERCHANT_ID;

  const total =
    Math.round(
      cartItems.reduce((acc, curr) => {
        return (acc += curr.price * curr.quantity);
      }, 0) * 100
    ) / 100;

  // generate HMAC hash
  function generateHash(data, publicKey) {
    const hashedData = CryptoJS.HmacSHA512(data, publicKey);
    return CryptoJS.enc.Base64.stringify(hashedData);
  }

  const items = window.btoa(cartItems);
  const req_time = Math.floor(Date.now() / 1000);
  const tran_id = req_time;
  const merchant_id = ABA_PAYWAY_MERCHANT_ID;
  const amount = "5.00";
  const firstName = "Makara";
  const lastName = "Prom";
  const phone = import.meta.env.VITE_ABA_MERCHANT_PHONE;
  const email = import.meta.env.VITE_ABA_MERCHANT_EMAIL;
  const return_params = "Hello World!";
  const type = "purchase";
  const currency = "USD";
  const payment_option = "abapay";
  const shipping = "1.50";
  const cancel_url = import.meta.env.VITE_CANCEL_URL;
  const continue_success_url = import.meta.env.VITE_CONTINUE_SUCCESS_URL;

  const dataToHash = `${req_time}${merchant_id}${tran_id}${total}${items}${shipping}${firstName}${lastName}${email}${phone}${type}${continue_success_url}${currency}${return_params}`;
  const hash = generateHash(dataToHash, ABA_PAYWAY_API_KEY);

  return (
    <div className="card-proceed">
      <form
        method="POST"
        id="aba_merchant_request"
        action={ABA_PAYWAY_API_URL}
        className="proceed-form"
      >
        <label htmlFor="promo">Promo Code</label>
        <div className="input-group">
          <input id="promo" type="text" placeholder="type promo code here" />
          <button type="button" className="promo-btn">
            Apply
          </button>
        </div>
        <hr />
        <table className="table-proceed">
          <tbody>
            <tr>
              <td>Subtotal</td>
              <td>{total} $</td>
            </tr>
            <tr>
              <td>Discount</td>
              <td>0.0 $</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>{total} $</td>
            </tr>
          </tbody>
        </table>
        <input type="hidden" name="hash" value={hash} />
        <input type="hidden" name="tran_id" value={tran_id} />
        <input type="hidden" name="amount" value={total} />
        <input type="hidden" name="req_time" value={req_time} />
        <input type="hidden" name="merchant_id" value={merchant_id} />
        <input type="hidden" name="firstname" value={firstName} />
        <input type="hidden" name="lastname" value={lastName} />
        <input type="hidden" name="phone" value={phone} />
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="items" value={items} />
        <input type="hidden" name="return_params" value={return_params} />
        <input type="hidden" name="shipping" value={shipping} />
        <input type="hidden" name="payment_option" value="" />
        <input type="hidden" name="type" value={type} />
        <input
          type="hidden"
          name="continue_success_url"
          value={continue_success_url}
        />
        <input type="hidden" name="currency" value={currency} />
        <input type="hidden" name="return_param" value={return_params} />
        <button className="proceed-btn" type="submit">
          Proceed To Checkout
        </button>
      </form>
    </div>
  );
};

export default ProceedCheckout;
