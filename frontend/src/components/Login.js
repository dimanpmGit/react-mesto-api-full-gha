import AuthForm from './AuthForm';

export default function Login({ handleChange, handleSubmit, formValues }) {
  return (
    <div className='login'>
      <AuthForm title='Вход' buttonText='Войти' handleChange={handleChange} handleSubmit={handleSubmit} formValues={formValues} />
    </div>
  )
}