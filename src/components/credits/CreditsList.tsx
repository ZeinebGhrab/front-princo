import { Button, Col, Container, Row, Text } from "@piximind/ds-p-23";
import { IoIosArrowRoundBack } from "react-icons/io";
import Navbar from "../nav/Navbar";
import { Size, Type } from "@piximind/ds-p-23/lib/esn/Interfaces";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getOffers } from "../../api/reducers/OfferReducer";
import { Offer } from "../../interfaces/Offer";
import { Card, Pagination } from "react-bootstrap";
import Payment from "./payment/Payment";
import moment from "moment";
import { getUser } from "../../api/reducers/ProfileReducer";

export default function CreditsList() {

    const navigate = useNavigate();
    const offerData = useAppSelector(state=>state.offers.data);
    const authData = useAppSelector(state => state.authentication.data);
    const userData = useAppSelector(state => state.profile.data);
    const dispatch = useAppDispatch();

    const fetchUser = useCallback(async () : Promise<void> => {
      try {
          await dispatch(getUser({token: authData?.token ,id: authData?.id})).unwrap();
      }
      catch(error) {
          console.log(error);
      }
  },[authData, dispatch])

    const [currentPage, setCurrentPage] = useState(1);
    const limit = 6;
  
    const totalPages = useMemo(() : number =>{ 
    return Math.floor((offerData?.length || 0) / limit) + 1
  },[offerData, limit]);

  const handlePageChange = async (pageNumber: number): Promise<void> => {
    setCurrentPage(pageNumber);
  };

    const fetchOffers = useCallback(async () : Promise<void> => {
        try {
            const skip = limit * (currentPage - 1);
            await dispatch(getOffers({token: authData?.token ,skip,limit})).unwrap()
        }
        catch(error) {
            console.log(error);
        }
    },[authData, currentPage, dispatch]);

    const offers = offerData?.reduce((newOffersData: Offer[][], offer: Offer, index: number) => {
      const RowIndex = Math.floor(index / 3);

      if (!newOffersData[RowIndex]) {
        newOffersData[RowIndex] = []; 
      }

      newOffersData[RowIndex].push(offer);
      return newOffersData;
    }, []);
    
    useEffect(()=>{
        fetchOffers();
        fetchUser();
    },[fetchOffers, fetchUser])
    
    return(
        <>
         <Navbar/>
        <Container
        children = {
            <div className="ds-flex ds-align-center ds-justify-between ds-mt-40 ds-mr-30">
                <div className="ds-flex ds-align-center">
                <Button
                text = {<IoIosArrowRoundBack /> as unknown as string}
                type = {Type.tertiary}
                className="ds-text-size-55 ds-ml-50"
                style = {{color : '#003D42'}}
                size = {Size.small}
                onClick={()=>navigate('/')}
                />
                <Text
                text = "Achat crédit"
                className="ds-text-size-30"
                style = {{color : '#003D42'}}
                />
                </div>
              <div className="ds-flex ds-justify-between ds-text-size-15">
                <div className="ds-flex ds-align-center ds-mr-40">
                <Text
                text="Mon crédit actuel : "
                className="ds-text-neutral700"
                style={{fontWeight:'600'}}
                />
                <Text
                text= {userData?.tickets as unknown as string}
                className="ds-text-neutral700 ds-ml-6"
                />  
                </div>
                <div className="ds-flex ds-align-start">
                <Text
                text="Date d'expiration :"
                className="ds-text-neutral700"
                style={{fontWeight:'600'}}
                />
                <Text
                text= {moment(userData?.ticketsExpirationDate as Date).format("DD/MM/YYYY")}
                className="ds-text-neutral700 ds-ml-6"
                />
                </div>
                </div>
            </div>
        }
        />
        <div className="ds-justify-center ds-flex ds-mt-25">
        <div >

{offers?.map((rowOffers: Offer[], rowIndex: number) => (
<Row key={rowIndex} className="ds-mb-30">
{rowOffers.map((offer: Offer, colIndex: number) => (
<Col key={colIndex}>
      <Card
        className='ds-box-shadow3'
        style={{
          width: "23rem",
          height: "10rem",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "#eaeeeb",
        }}
      >
      
        <Card.Body>
            <b className='ds-text-primary ds-text-size-17'>{offer.title}</b>
            <div className='ds-text-size-13 ds-mt-7'>
            {offer.description}
            </div>
            <b className="ds-mt-7">{offer.unitPrice} Euro</b>
            <Payment offerId={offer._id}/>
        </Card.Body>
      </Card>
</Col>
))}
</Row>
))} 
 {
       offerData?.length !==0 && (
        <Pagination  className="ds-mb-15 ds-flex ds-justify-center ds-text-neutral800 fixed-bottom">
              <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
              <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
              <Pagination.Item>{currentPage}</Pagination.Item>
              <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages } />
              <Pagination.Last onClick={() => handlePageChange(totalPages)} />
          </Pagination>
       )
    }     
 </div>
 </div>
        </>
    )

}