import axios from 'axios'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Header from '../../header'
import { resetCart } from '../../../redux/storeSlice'
import { Link } from 'react-router-dom'

import './style.css'
const Address = () => {
  const cart = useSelector((state) => state.store.cart)
  const totalBill = useSelector((state) => state.store.totalBill)
  const dp = useDispatch()

  const [fullName, setFullName] = useState('')
  const [mobilePhone, setMobilePhone] = useState('')
  const [email, setEmail] = useState('')
  const [houseNo, setHouseNo] = useState('')
  const [district, setDistrict] = useState('')
  const [province, setProvince] = useState('')
  const [userInfo, setUserInfo] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (fullName && mobilePhone && houseNo && district && province) {
      setUserInfo({ fullName, mobilePhone, houseNo, district, province })
      const { msg } = await axios.post(
        'http://localhost:5000/checkout/address',
        { address: userInfo, order: cart, totalBill: totalBill }
      )
    }
    // dp(resetCart())
  }
  return (
    <>
      <Header />
      <div className='cart-container'>
        <div className='process'>
          <i className='fas fa-shopping-cart '></i>
          <h4>Cart</h4>
          <h4 className='process-seperate'>{'>'}</h4>
          <i className='fas fa-home active'></i>
          <h4 className='active'>Address</h4>
        </div>
        <div className='content-address'>
          <div className='address-card new-address'>
            <form onSubmit={handleSubmit}>
              <h4>Add New Address</h4>
              <p>
                Be sure to check "Deliver to this address" when you have
                finished
              </p>
              <div className='form-input'>
                <div className='form-input-detail'>
                  <label>Full Name</label>
                  <div className='input-wrapper'>
                    <input
                      type='text'
                      name='fullName'
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    <p>The Full Name field is required</p>
                  </div>
                </div>

                <div className='form-input-detail'>
                  <label>Mobile Number</label>
                  <div className='input-wrapper'>
                    <input
                      type='text'
                      name='mobileNumber'
                      value={mobilePhone}
                      onChange={(e) => setMobilePhone(e.target.value)}
                    />
                    <p>The Mobile Number field is required</p>
                  </div>
                </div>

                <div className='form-input-detail'>
                  <label>Email</label>
                  <div className='input-wrapper'>
                    <input
                      type='email'
                      name='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className='form-input-detail'>
                  <label>House No</label>
                  <div className='input-wrapper'>
                    <input
                      type='text'
                      name='houseNo'
                      value={houseNo}
                      onChange={(e) => setHouseNo(e.target.value)}
                    />
                    <p>The House No field is required</p>
                  </div>
                </div>

                <div className='form-input-detail'>
                  <label>District</label>
                  <div className='input-wrapper'>
                    <input
                      type='text'
                      name='district'
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                    />
                    <p>The district field is required</p>
                  </div>
                </div>

                <div className='form-input-detail'>
                  <label>Province</label>
                  <div className='input-wrapper'>
                    <input
                      type='text'
                      name='state'
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                    />
                    <p>The Province field is required</p>
                  </div>
                </div>
              </div>

              <button
                id='new-address-btn'
                type='submit'
                className='btn btn-wishlist'
              >
                Save and Deliver Here
              </button>
            </form>
          </div>
          <div class='address-card old-address'>
            <h4>{fullName}</h4>
            <p>{email}</p>
            <p>{mobilePhone}</p>
            <p>{houseNo}</p>
            <p>
              {district}, {province}
            </p>

            <button class='btn btn-wishlist'>Deliver To This Address</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Address
