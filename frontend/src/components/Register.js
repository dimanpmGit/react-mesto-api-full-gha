import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';

export default function Register({ handleChange, handleSubmit, formValues }) {
  return (
    <div className='register'>

      <AuthForm title='Регистрация' buttonText='Зарегистрироваться' handleChange={handleChange} handleSubmit={handleSubmit} formValues={formValues} />
      <div className='register__signin' href='#'>
        Уже зарегистрированы?&nbsp;
        <Link to='/signin' className='register__signin-link link'>Войти</Link>
      </div>
    </div>
  )
}