export default function AuthForm({ title, buttonText, handleChange, handleSubmit, formValues }) {
  return (
    <form className='form' onSubmit={handleSubmit}>
    <h1 className='form__title'>{title}</h1>
      <input className='form__input' placeholder='Email' name='email' type='email' autoComplete='email' value={formValues ? formValues.email : ''} onChange={handleChange} />
      <input className='form__input' placeholder='Пароль' name='password' type='password' autoComplete='new-password' value={formValues ? formValues.password : ''} onChange={handleChange} />
    <button className='form__button'>{buttonText}</button>
  </form>
  )
}