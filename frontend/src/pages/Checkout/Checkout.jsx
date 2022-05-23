import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import { classNames } from '../../../utils';
import useAuthContext from '../../auth/userAuthContext';
import Header from '../../components/Header/Header';
import Steps from '../../components/Steps/Steps';

const countries = [
  'United States',
  'Afghanistan',
  'Albania',
  'Algeria',
  'American Samoa',
  'Andorra',
  'Angola',
  'Anguilla',
  'Antarctica',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Aruba',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bermuda',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegowina',
  'Botswana',
  'Bouvet Island',
  'Brazil',
  'British Indian Ocean Territory',
  'Brunei Darussalam',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Cabo Verde',
  'Cayman Islands',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Christmas Island',
  'Cocos (Keeling) Islands',
  'Colombia',
  'Comoros',
  'Congo',
  'Congo, the Democratic Republic of the',
  'Cook Islands',
  'Costa Rica',
  "Cote d'Ivoire",
  'Croatia (Hrvatska)',
  'Cuba',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'East Timor',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Ethiopia',
  'Falkland Islands (Malvinas)',
  'Faroe Islands',
  'Fiji',
  'Finland',
  'France',
  'French Guiana',
  'French Polynesia',
  'French Southern Territories',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Gibraltar',
  'Greece',
  'Greenland',
  'Grenada',
  'Guadeloupe',
  'Guam',
  'Guatemala',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Heard and Mc Donald Islands',
  'Holy See (Vatican City State)',
  'Honduras',
  'Hong Kong',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran (Islamic Republic of)',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  "Korea, Democratic People's Republic of",
  'Korea, Republic of',
  'Kuwait',
  'Kyrgyzstan',
  "Lao, People's Democratic Republic",
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libyan Arab Jamahiriya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Macao',
  'Macedonia, The Former Yugoslav Republic of',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Martinique',
  'Mauritania',
  'Mauritius',
  'Mayotte',
  'Mexico',
  'Micronesia, Federated States of',
  'Moldova, Republic of',
  'Monaco',
  'Mongolia',
  'Montserrat',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'Netherlands Antilles',
  'New Caledonia',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'Niue',
  'Norfolk Island',
  'Northern Mariana Islands',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Pitcairn',
  'Poland',
  'Portugal',
  'Puerto Rico',
  'Qatar',
  'Reunion',
  'Romania',
  'Russian Federation',
  'Rwanda',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia (Slovak Republic)',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Georgia and the South Sandwich Islands',
  'Spain',
  'Sri Lanka',
  'St. Helena',
  'St. Pierre and Miquelon',
  'Sudan',
  'Suriname',
  'Svalbard and Jan Mayen Islands',
  'Swaziland',
  'Sweden',
  'Switzerland',
  'Syrian Arab Republic',
  'Taiwan, Province of China',
  'Tajikistan',
  'Tanzania, United Republic of',
  'Thailand',
  'Togo',
  'Tokelau',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Turks and Caicos Islands',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'United States Minor Outlying Islands',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Venezuela',
  'Vietnam',
  'Virgin Islands (British)',
  'Virgin Islands (U.S.)',
  'Wallis and Futuna Islands',
  'Western Sahara',
  'Yemen',
  'Serbia',
  'Zambia',
  'Zimbabwe',
];

function Checkout() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const step = 1;

  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=/checkout');
    }
  }, [user, navigate]);
  if (!user) return null;


  return (
    <>
      <Header />
      <div className="container mx-auto ">
        <div className="flex">
          <div className="w-2/4 bg-white px-10 py-10 mx-auto">
            <div>
              <Steps currentStep={step} />
            </div>

            <Formik
              initialValues={{
                address: '',
                city: '',
                state: '',
                zip: '',
                country: '',
                phone: '',
              }}
              validate={(values) => {
                const errors = {};

                if (!values.address) {
                  errors.address = 'Required';
                }

                if (!values.city) {
                  errors.city = 'Required';
                }

                if (!values.state) {
                  errors.state = 'Required';
                }

                if (!values.zip) {
                  errors.zip = 'Required';
                }

                if (!values.country) {
                  errors.country = 'Required';
                }

                if (!values.phone) {
                  errors.phone = 'Required';
                }

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  navigate('/ordersummary', {
                    state: {
                      shippingInfo: values,
                    },
                  });
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form className="flex flex-col mt-8" onSubmit={handleSubmit}>
                  <h2 className="mb-4 font-medium">Contact Information</h2>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="name"
                    >
                      Customer Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Name"
                      disabled
                      readOnly
                      value={user.name}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="name"
                    >
                      Email
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      disabled
                      readOnly
                      value={user.email}
                    />
                  </div>

                  <h2 className="mb-4 font-medium">Shipping Information</h2>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="address"
                  >
                    Shipping Address
                  </label>
                  <div className="mb-4">
                    <input
                      className={classNames(
                        errors.address && touched.address && 'border-red-500',
                        'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      )}
                      id="address"
                      name="address"
                      type="text"
                      placeholder="Address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address}
                    />
                    {errors.address && touched.address && (
                      <p className="text-red-500 text-xs italic">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-center align-baseline">
                    <div className="flex-1 mr-2">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="city"
                      >
                        City
                      </label>
                      <div className="mb-4">
                        <input
                          className={classNames(
                            errors.city && touched.city && 'border-red-500',
                            'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                          )}
                          id="city"
                          name="city"
                          type="text"
                          placeholder="City"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.city}
                        />
                        {errors.city && touched.city && (
                          <p className="text-red-500 text-xs italic">
                            {errors.city}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex-1 ml-2">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="country"
                      >
                        Country
                      </label>
                      <div className="mb-4">
                        <select
                          className={classNames(
                            errors.country &&
                              touched.country &&
                              'border-red-500',
                            'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                          )}
                          id="country"
                          name="country"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.country}
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Select Country
                          </option>
                          {countries.map((country, i) => (
                            <option key={i} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                        {errors.country && touched.country && (
                          <p className="text-red-500 text-xs italic">
                            {errors.country}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center align-baseline">
                    <div className="flex-1 mr-2">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="state"
                      >
                        State/Province
                      </label>
                      <div className="mb-4">
                        <input
                          className={classNames(
                            errors.state && touched.state && 'border-red-500',
                            'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                          )}
                          id="state"
                          name="state"
                          type="text"
                          placeholder="state"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.state}
                        />
                        {errors.state && touched.state && (
                          <p className="text-red-500 text-xs italic">
                            {errors.state}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex-1 ml-2">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="zip"
                      >
                        Postal code
                      </label>
                      <div className="mb-4">
                        <input
                          className={classNames(
                            errors.zip && touched.zip && 'border-red-500',
                            'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                          )}
                          id="zip"
                          name="zip"
                          type="text"
                          placeholder="Postal code"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.zip}
                        />
                        {errors.zip && touched.zip && (
                          <p className="text-red-500 text-xs italic">
                            {errors.zip}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="city"
                  >
                    Phone
                  </label>
                  <div className="mb-4">
                    <input
                      className={classNames(
                        errors.phone && touched.phone && 'border-red-500',
                        'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      )}
                      id="phone"
                      name="phone"
                      type="text"
                      placeholder="Phone"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.phone}
                    />
                    {errors.phone && touched.phone && (
                      <p className="text-red-500 text-xs italic">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* continue button */}
                  <div className="flex justify-center">
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      Continue
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
