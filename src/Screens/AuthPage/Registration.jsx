import { Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useRegisterMutation } from '../../service/Auth';

const RegistrationSchema = yup.object().shape({
  name: yup.string().required('Name is required').min(5, 'Name must be at least 5 characters').max(15, 'Name can\'t be more than 15 characters'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 8 characters'),
});

const Registration = () => {
  const navigate=useNavigate()
  const [register] = useRegisterMutation();
  return (
    <div className='min-h-screen flex justify-center items-center bg-gray-100'>
      <div className='max-w-lg w-full bg-white p-6 rounded-lg shadow-lg'>
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          validationSchema={RegistrationSchema}
          onSubmit={(values, { setSubmitting}) => {
            register(values)
              .then((data) => {
                // Storing token or user data after login
                localStorage.setItem('auth', data.data.token);

                toast.success(data.data.msg);
                if (data.data.msg === "user login successfully") {
                  navigate('/');
                }// Navigate after successful login
              })
              .catch((error) => {
                toast.error(error);
              })
              .finally(() => setSubmitting(false));
          }}
        >
          {({ values, errors, handleBlur, handleChange, handleSubmit, touched, isSubmitting }) => (
            <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
              <h1 className='text-xl md:text-3xl font-bold text-center text-blue-600 md:mb-6'>Create a new account</h1>

              <div className='flex flex-col'>
                <label htmlFor="name" className='text-lg'>Name</label>
                <input
                  className={`border p-2 rounded-lg ${touched.name && errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  type="text"
                  name='name'
                  placeholder='Enter your name'
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.name && errors.name && <span className='text-red-600 text-sm mt-1'>{errors.name}</span>}
              </div>

              <div className='flex flex-col'>
                <label htmlFor="email" className='text-lg'>Email</label>
                <input
                  className={`border p-2 rounded-lg ${touched.email && errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  type="text"
                  name='email'
                  placeholder='Enter your email'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.email && errors.email && <span className='text-red-600 text-sm mt-1'>{errors.email}</span>}
              </div>

              <div className='flex flex-col'>
                <label htmlFor="password" className='text-lg'>Password</label>
                <input
                  className={`border p-2 rounded-lg ${touched.password && errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  type="password"
                  name='password'
                  placeholder='Enter new password'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.password && errors.password && <span className='text-red-600 text-sm mt-1'>{errors.password}</span>}
              </div>
              <button
                type="submit"
                className='w-full bg-blue-500 text-white p-3 rounded-lg font-semibold mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'
                disabled={isSubmitting}
              >
                Sign Up
              </button>

              <div className='flex justify-center mt-4'>
                <p>Already have an account? </p>
                <Link to='/' className='text-blue-600 font-semibold ml-1 hover:underline'>
                  Login
                </Link>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Registration;
