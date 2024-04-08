import { Button, Container, Row, SizeButton, Text, TypeButton } from "@piximind/ds-p-23";
import { IoIosArrowRoundBack } from "react-icons/io";
import Navbar from "../nav/Navbar";
import { Size, TextType, Type } from "@piximind/ds-p-23/lib/esn/Interfaces";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { downloadInvoice, getInvoices, openInvoice } from "../../api/reducers/InvoiceReducer";
import Invoice from "../../interfaces/Invoice";
import { Card, Col, Pagination } from "react-bootstrap";
import { MdOpenInNew, MdOutlineFileDownload } from "react-icons/md";
import moment from "moment";
import { LuCircleOff } from "react-icons/lu";

export default function InvoicesList (){

    const navigate = useNavigate();
    const invoicesData = useAppSelector(state=>state.invoices.data);
    const authData = useAppSelector(state => state.authentication.data);
    const dispatch = useAppDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const limit = 6;
  
    const totalPages = useMemo(() : number =>{ 
    return Math.floor((invoicesData?.length || 0) / limit) + 1
  },[invoicesData?.length]);

  const handlePageChange = async (pageNumber: number): Promise<void> => {
    setCurrentPage(pageNumber);
  };

    const fetchInvoices = useCallback(async () : Promise<void> => {
        try {
            const skip = limit * (currentPage - 1);
            await dispatch(getInvoices({id: authData?.id , token: authData?.token,skip,limit})).unwrap();
        }
        catch(error) {
            console.log(error);
        }
    },[authData?.id, authData?.token, currentPage, dispatch]);

    const download = async (id: string | null | undefined, ref: string | null | undefined) : Promise<void> =>{
        try {
            await dispatch(downloadInvoice({id,ref, token: authData?.token})).unwrap();
        }
        catch(error) {
            console.log(error);
        }
    }

    const open = async (id: string | null | undefined) : Promise<void> =>{
        try {
            await dispatch(openInvoice({id, token: authData?.token})).unwrap();
        }
        catch(error) {
            console.log(error);
        }
    }

    const invoices = invoicesData?.reduce((newInvoicesData: Invoice[][], invoice: Invoice, index: number) => {
      const RowIndex = Math.floor(index / 3);

      if (!newInvoicesData[RowIndex]) {
        newInvoicesData[RowIndex] = []; 
      }

      newInvoicesData[RowIndex].push(invoice);
      return newInvoicesData;
    }, []);

    useEffect(()=>{
        fetchInvoices();
    },[fetchInvoices])

    return(
        <>
        <Navbar/>
        <Container
        children = {
            <div className="ds-flex ds-align-center ds-mt-40 ds-mr-40">
                <Button
                text = {<IoIosArrowRoundBack /> as unknown as string}
                type = {Type.tertiary}
                className="ds-text-size-55 ds-ml-50"
                style = {{color : '#003D42'}}
                size = {Size.small}
                onClick={()=>navigate('/')}
                />
                <Text
                text = "Mes factures"
                className="ds-text-size-30"
                style = {{color : '#003D42'}}
                />
            </div>
        }
        />
        <div className="ds-justify-center ds-flex ds-mt-19">
            <div >
            {invoices?.map((rowInvoices: Invoice[], rowIndex: number) => (
<Row key={rowIndex}>
{rowInvoices.map((invoice: Invoice, colIndex: number) => (
<Col key={colIndex}>
          <Card
      key={colIndex}
      className='ds-box-shadow3'
      style={{
        width: "24rem",
        height: "11rem",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#eaeeeb",
        margin:'10px',
      }}
    >
      <Card.Body>
        <Container
        className="ds-mb-3 ds-text-size-18 ds-text-primary"
        children ={
          <b>
          Facture {invoice.ref}
          </b>
        }
        />
        <Container
        className="ds-text-size-15"
        style={{
          borderTop: '2px solid #E3E3E6',
          color: '#195054'
        }}        
        children = {
            <>
            <div className="ds-mt-2"> Pack Premium : <span style={{fontWeight:'600'}}>{invoice.premiumPack}</span> </div>
            <div>Date : <span style={{fontWeight:'600'}}>{moment(invoice.date).format("DD/MM/YYYY")}</span></div> 
            <div>Montant : <span style={{fontWeight:'600'}}>{invoice.amount} Euro</span></div>
            </>
        }
        />
        <Container
        className="ds-flex ds-mt-11"
        children = {
            <>
        <Button
          text={<><MdOutlineFileDownload className="ds-text-size-17 ds-mr-4"/>Télécharger</> as unknown as string}
          className="ds-w-40 ds-mr-15"
          size={SizeButton.small}
          type={TypeButton.secondary}
          onClick={() => download(invoice._id,invoice.ref)}
        />
        <Button
          text={<><MdOpenInNew className="ds-text-size-17 ds-mr-4" />Aperçu</> as unknown as string}
          className="ds-w-40"
          size={SizeButton.small}
          type={TypeButton.secondary}
          onClick={() => open(invoice._id)}
        />
            </>
        }
        />
      </Card.Body>
    </Card>
</Col>
))}
</Row>
))} 
    {
       invoices?.length !==0 && (
        <Pagination  className="ds-mb-10 ds-flex ds-justify-center ds-text-neutral800 fixed-bottom">
              <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
              <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
              <Pagination.Item><span style = {{color : '#195054'}}>{currentPage}</span></Pagination.Item>
              <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages } />
              <Pagination.Last onClick={() => handlePageChange(totalPages)} />
          </Pagination>
       )
    }  
     </div>        
        </div>

        {
      invoices?.length ===0 && (
        <div className="ds-m-50">
              <div className="ds-mt-60 ds-flex ds-center">
                <Container
                children = {
                  <>
                  <div className='ds-text-size-90 ds-flex ds-justify-center' style = {{color : '#2D5F63'}}>
                  <LuCircleOff />
                  </div>
                  <Text
                  text='Pas de factures'
                  type={TextType["type-4"]}
                  style = {{color : '#2D5F63'}}
                  className='ds-flex ds-justify-center'
                  />
                  </>
                }
                />
                </div>
              </div>
      )
    } 
        </>
    )
}