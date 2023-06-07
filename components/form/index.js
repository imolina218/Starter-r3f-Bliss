import { useEffect, useState } from 'react'
import s from './form.module.scss'

export const Form = () => {
  const paymentInfo = {
    network: 'visa',
    username: '',
    cardnumber: '',
    expirymonth: '',
    expiryyear: '',
    cvv: '',
    email: '',
    city: '',
    zipcode: '',
    address: '',
    phonenumber: '',
  }
  const [formValues, setFormValues] = useState(paymentInfo)
  const [errors, setErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const [purchased, setPurchased] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors(validate(formValues))
    setIsSubmit(true)
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmit === true) {
      setPurchased(true)
    }
  }, [errors])

  const validate = (values) => {
    const errors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    const zipRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/
    const expressRegex = /^3[47][0-9]{13}$/
    const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/
    const mastercardRegex =
      /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/

    if (
      !values.cardnumber.match(
        values.network === 'express'
          ? expressRegex
          : values.network === 'visa'
          ? visaRegex
          : mastercardRegex
      )
    ) {
      errors.cardnumber = `Card number not valid for ${values.network} card!`
    }

    if (values.cvv.length !== (values.network === 'express' ? 2 : 3)) {
      errors.cvv = `CVV not valid for a ${values.network} card!`
    }

    if (!emailRegex.test(values.email)) {
      errors.email = 'This is not a valid email format!'
    }
    if (!zipRegex.test(values.zipcode)) {
      errors.zipcode = 'This is not a valid Zip code in the US!'
    }

    return errors
  }

  return (
    <>
      <form method="post" onSubmit={handleSubmit}>
        <div className={s['card-information']}>
          <div className={s['payment-network']}>
            <select
              name="network"
              value={formValues.network}
              onChange={handleChange}
              required
            >
              <option value="express">american express</option>
              <option value="visa">visa</option>
              <option value="mastercard">mastercard</option>
            </select>
          </div>
          <div>
            <label htmlFor="user-name">Full Name:</label>
            <input
              type="text"
              id="user-name"
              name="username"
              value={formValues.username}
              onChange={handleChange}
              autoComplete="on"
              required
            />
          </div>
          <div>
            <label htmlFor="card-number">Card Number:</label>
            <input
              type="number"
              id="card-number"
              name="cardnumber"
              value={formValues.cardnumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className={s['expiration']}>
            <label htmlFor="expiry"> Expiry MM/YY: </label>
            <select
              id="expiry"
              name="expirymonth"
              onChange={handleChange}
              value={formValues.expirymonth}
              required
            >
              <option>01</option>
              <option>02</option>
              <option>03</option>
              <option>04</option>
              <option>05</option>
              <option>06</option>
              <option>07</option>
              <option>08</option>
              <option>09</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
            </select>
            <select
              name="expirymonth"
              onChange={handleChange}
              value={formValues.expirymonth}
              required
            >
              <option>23</option>
              <option>24</option>
              <option>25</option>
              <option>26</option>
              <option>27</option>
              <option>28</option>
              <option>29</option>
              <option>30</option>
              <option>31</option>
              <option>32</option>
              <option>33</option>
              <option>34</option>
              <option>35</option>
            </select>
          </div>
          <div className={s['cvc']}>
            <label htmlFor="cvv">CVC/CVV:</label>
            <input
              type="number"
              placeholder="- - -"
              id="cvv"
              name="cvv"
              value={formValues.cvv}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className={s['user-information']}>
          <input
            type="text"
            placeholder="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            autoComplete="on"
            required
          />
          <input
            type="text"
            placeholder="city"
            name="city"
            value={formValues.city}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            placeholder="zip code"
            name="zipcode"
            value={formValues.zipcode}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="address"
            name="address"
            value={formValues.address}
            onChange={handleChange}
            autoComplete="on"
            required
          />
          <input
            type="number"
            placeholder="phone number"
            name="phonenumber"
            value={formValues.phonenumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className={s['error-container']}>
          <span className={s[!errors.cardnumber ? 'hidden' : 'hello-there']}>
            {errors.cardnumber}
          </span>
          <span className={s[!errors.cvv ? 'hidden' : 'hello-there']}>
            {errors.cvv}
          </span>
          <span className={s[!errors.email ? 'hidden' : 'hello-there']}>
            {errors.email}
          </span>
          <span className={s[!errors.zipcode ? 'hidden' : 'hello-there']}>
            {errors.zipcode}
          </span>
        </div>

        <div className={s[purchased ? 'success' : 'hidden']}>
          <span>
            Purchased but is not a real product, thanks for passing by &#128513;
          </span>
        </div>

        <button className={s['button']}>purchase</button>
      </form>
    </>
  )
}
