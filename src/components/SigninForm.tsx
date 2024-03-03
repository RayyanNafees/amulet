

export default () => {

  return (
    <form action='/signin' method='POST' >
      <input name="enroll" placeholder='Enrollment No' required/>
      <small></small>
      <input name="email" placeholder='email' type='email' required />
      <small></small>
      <input type="password" name="password" placeholder="Password" required />
      <small>Minimum 8 characters</small>
      <input type="submit" value="Login" />
    </form>
  )
}