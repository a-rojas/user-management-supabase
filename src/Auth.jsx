import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    setLoading(true)
    const result = await supabase.auth.signInWithPassword({
        email,
        password
      })
    console.log(result);
    if (result.error) {
      alert(result.error.error_description || result.error.message)
    } else {
      alert('Logged in')
    }
    setLoading(false)
  }

  const handleSignUp = async (event) => {
    event.preventDefault()

    setLoading(true)
    const result = await supabase.auth.signUp({
        email,
        password
      })
    console.log(result);
    if (result.error) {
      alert(result.error.error_description || result.error.message)
    } else {
      alert('Check your email for the login link!')
    }
    setLoading(false)
  }

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">Supabase + React</h1>
        <p className="description">Sign in via magic link with your email below</p>
        <form className="form-widget">
          <div>
            <input
              className="inputField"
              type="email"
              placeholder="Your email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              className="passwordField"
              type="password"
              placeholder="Your pasword"
              value={[password]}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button className={'button block'} disabled={loading} onClick={handleLogin}>
              {loading ? <span>Loading</span> : <span>Login</span>}
            </button>
          </div>
          <div>
            <button className={'button block'} disabled={loading} onClick={handleSignUp}>
              {loading ? <span>Loading</span> : <span>Sign Up</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}