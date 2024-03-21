import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import RequireAuthentication from './routes/RequireAuthentication'
import PageNotFound from './routes/PageNotFound'
import ConnectorsList from './components/connectors/ConnectorsList'
import SignUp from './components/SignUp'
import ProfileDetails from './components/profile/ProfileDetails'
import InvoiceDetails from './components/profile/InvoiceDetails'


function App() {
  return (
    <>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/sign' element={<SignUp/>}/>
          <Route element={<RequireAuthentication/>}>
            <Route path='/' element={<ConnectorsList/>}/>
            <Route path='/profile' element={<ProfileDetails/>}/>
            <Route path='/invoiceDetails' element={<InvoiceDetails/>}/>
            <Route path='*' element={<PageNotFound/>}/>
          </Route>
        </Routes>
    </>
  )
}

export default App
