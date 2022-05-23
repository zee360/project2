import React from 'react';
import { Formik } from 'formik';
import Header from '../../components/Header/Header';
import { classNames } from '../../../utils';
import AuthService from '../../services/auth.service';
import { toast } from 'react-toastify';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import useAuthContext from '../../auth/userAuthContext';

function Login() {
  const { setAuth } = useAuthContext();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect');
  return (
    <>
      <div className="mb-2">
        <Header />
      </div>
      <section className="flex flex-col justify-center items-center">
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={(values) => {
            const errors = {};

            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }

            if (!values.password) {
              errors.password = 'Required';
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              AuthService.login(values.email, values.password)
                .then((res) => {
                  toast.success('Login successful');
                  setAuth(res);
                  if (redirect) {
                    navigate(redirect);
                  } else {
                    navigate('/');
                  }
                })
                .catch((err) => {
                  toast.error('Login failed, please try again.');
                }).finally(() => setSubmitting(false));

              
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
            <form
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[50%]"
              onSubmit={handleSubmit}
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email && (
                  <p className="text-red-500 text-xs italic">{errors.email}</p>
                )}
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className={classNames(
                    errors.password && touched.password && 'border-red-500',
                    'shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                  )}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="******************"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />

                {errors.password && touched.password && (
                  <p className="text-red-500 text-xs italic">
                    {errors.password}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between mb-6">
                <button
                  className={classNames(
                    isSubmitting && 'bg-gray-500',
                    'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  )}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Login
                </button>
              </div>

              <span className="mr-1">Existing customer? </span>
              <Link
                to="/register"
                className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-800"
              >
                Register
              </Link>
            </form>
          )}
        </Formik>
      </section>
    </>
  );
}

export default Login;
