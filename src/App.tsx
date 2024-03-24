import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import RequireAuthentication from './routes/RequireAuthentication'
import PageNotFound from './routes/PageNotFound'
import ConnectorsList from './components/connectors/ConnectorsList'
import SignUp from './components/SignUp'
import Verify from './routes/Verify'
import ForgetPassword from './components/password/ForgetPassword'
import ResetPassword from './components/password/ResetPassword'
import RequireValidation from './routes/RequiredValidation'
import Profile from './components/profile/Profile'


function App() {
  return (
    <>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/forgetPassword' element={<ForgetPassword/>}/>
          <Route path='/sign' element={<SignUp/>}/>
          <Route path ='/verify' element={<RequireValidation/>}>
              <Route path='verify/validate' element={<Verify/>}/>
              <Route path='verify/resetPassword' element={<ResetPassword/>}/>         
          </Route>
          <Route element={<RequireAuthentication/>}>
            <Route path='/' element={<ConnectorsList/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='*' element={<PageNotFound/>}/>
          </Route>
        </Routes>
    </>
  )
}

export default App
