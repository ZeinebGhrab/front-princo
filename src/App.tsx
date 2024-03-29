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
import ProfileDetails from './components/profile/ProfileDetails'
import InvoiceDetails from './components/profile/InvoiceDetails'
import AddConnector from './components/connectors/AddConnector'
import ConnectorDetails from './components/connectors/ConnectorDetails'
import Guide from './components/connectors/Guide'
import EditConnector from './components/connectors/EditConnector'


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
            <Route path='/addConnector' element={<AddConnector/>}/>
            <Route path='/connectorDetails/:id' element={<ConnectorDetails/>}/>
            <Route path='/editConnector/:id' element={<EditConnector/>}/>
            <Route path='/guide' element={<Guide exportGuide={false} />}/>
            <Route path='/profileDetails' element={<ProfileDetails/>}/>
            <Route path='/invoiceDetails' element={<InvoiceDetails/>}/>
            <Route path='*' element={<PageNotFound/>}/>
          </Route>
        </Routes>
    </>
  )
}

export default App
