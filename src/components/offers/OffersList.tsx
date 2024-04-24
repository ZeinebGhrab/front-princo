import NavApp from "../nav/NavApp";
import { Button, Col, Row, TypeButton } from "@piximind/ds-p-23";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getAdminOffers } from "../../api/reducers/OfferReducer";
import { Offer } from "../../interfaces/Offer";
import { Card } from "react-bootstrap";
import ComponentPagination from "../../customComponent/ComponentPagination";
import { FaPencilAlt } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import DeleteOffer from "./DeleteOffer";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Size, Type } from "@piximind/ds-p-23/lib/esn/Interfaces";
import ComponentTitle from "../../customComponent/ComponentTitle";
import { groupDataByRows } from "../helpers/GroupDataByRows";

export default function OffersList() {

    const navigate = useNavigate();
    const offerData = useAppSelector(state=>state.offers.data);
    const authData = useAppSelector(state => state.authentication.data);
    const dispatch = useAppDispatch();
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [idOffer, setIdOffer] = useState<string | undefined>(undefined);

    const [currentPage, setCurrentPage] = useState(1);
    const limit = 8;
  
    const totalPages = useMemo(() : number =>{ 
    return Math.floor((Array.isArray(offerData) && offerData?.length || 0) / limit) + 1
  },[offerData, limit]);

  const handlePageChange = async (pageNumber: number): Promise<void> => {
    setCurrentPage(pageNumber);
  };

    const fetchOffers = useCallback(async () : Promise<void> => {
        try {
            const skip = limit * (currentPage - 1);
            await dispatch(getAdminOffers({id: authData?.id, token: authData?.token ,skip,limit})).unwrap()
        }
        catch(error) {
            console.log(error);
        }
    },[authData, currentPage, dispatch]);

    const offers = Array.isArray(offerData) && groupDataByRows(offerData);
    
    useEffect(()=>{
        fetchOffers();
    },[fetchOffers, showModalDelete]);
    
    return(
        <>
        <NavApp/>
        <div className="ds-mt-40">
           <ComponentTitle title="Mes offres" navigatePage='/'/>
        </div>
        <div className="ds-justify-center ds-flex ds-mt-12 ds-ml-45">
        <div>
{Array.isArray(offers) && offers?.map((rowOffers: Offer[], rowIndex: number) => (
<Row key={rowIndex} className="ds-mb-20">
{rowOffers.map((offer: Offer, colIndex: number) => (
<Col key={colIndex}>
      <Card
        className='ds-box-shadow3'
        style={{
          width: "25rem",
          height: "8rem",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "#eaeeeb",
        }}
      >
        <Card.Body>
          <div  className="ds-flex ds-justify-between" style={{ width: "100%" }}>
            <div>
            <b className='ds-text-size-18 ds-text-primary' >{offer.title}</b>
            </div>
            <div className="ds-ml-5 ds-justify-end ds-flex">
            <Button
          text={<FaPencilAlt className="ds-text-size-17 ds-mr-3"/> as unknown as string}
          size={Size.xSmall}
          className="ds-text-size-18 ds-mr-4"
          style={{
          backgroundColor: '#eaeeeb',
          borderColor: '#eaeeeb',
          color: '#195054',
        }}
          onClick= {()=>navigate(`/editOffer/${offer._id}`)}    
        />
        <Button
          text={<TiDelete  className="ds-text-size-25 ds-mr-3"/> as unknown as string}
          size={Size.xSmall}
          className="ds-text-size-18 ds-mr-4"
          style={{
          backgroundColor: '#eaeeeb',
          borderColor: '#eaeeeb',
          color: '#195054',
        }}
          onClick={()=>{if (offer._id) {setShowModalDelete(true); setIdOffer(offer._id);}}}
         />
            </div>
          </div>
            <div className='ds-mt-3' style={{borderTop: '2px solid #E3E3E6',color: '#195054'}}>
            <div className="ds-mt-6 ds-text-size-14">
            {offer.description}
            </div>
            <div className="ds-mt-4">
            <b className="ds-text-size-15">{offer.unitPrice} Euro</b>
            </div>
            </div>
        </Card.Body>
      </Card>
</Col>
))}
      {rowOffers.length < 3 && (
        <Col key={rowOffers.length}>
          <Card 
            className='ds-box-shadow3'
            style={{ width: '25rem', 
            height: '8rem',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor : '#eaeeeb'
          }}>
            <Card.Body>
              <div className="ds-flex ds-justify-center ds-mb-4">
                <Button
                  text={<IoIosAddCircleOutline /> as unknown as string}
                  className="ds-text-size-30"
                  style={{
                    backgroundColor: '#fff',
                    color:'#79c300',
                  }}
                  type={Type.primary}
                  onClick={()=>navigate('/addOffer')} 
                />
              </div>
              <Card.Title style={{ textAlign: 'center', color : '#195054' }}>Ajouter un offre</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      )}
</Row>
))} 
  {Array.isArray(offers) && offers.length > 0 && offers[offers.length - 1].length === 3 && (
    <Row key="additionalRow" className="ds-mb-20">
      <Col key={offers[offers.length - 1].length}>
        <Card 
          className='ds-box-shadow3'
          style={{ width: '25rem', 
          height: '8rem',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor : '#eaeeeb'
        }}>
          <Card.Body>
            <div className="ds-flex ds-justify-center ds-mb-4">
              <Button
                text={<IoIosAddCircleOutline /> as unknown as string}
                className="ds-text-size-30 ds-text-success600"
                style={{
                  backgroundColor: '#fff',
                  color:'#536375',
                }}
                type={Type.primary}
                onClick={()=>navigate('/addOffer')} 
              />
            </div>
            <Card.Title style={{ textAlign: 'center', color : '#195054' }}>Ajouter un offre</Card.Title>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )}
 {
      <ComponentPagination 
       currentPage={currentPage}
       totalPages={totalPages} 
       length={Array.isArray(offers) && offers?.length || 0}
       text="Pas d'offres" 
       handlePageChange={handlePageChange}/>
 }   
 {
         Array.isArray(offers) && offers.length ===0 && (
            <div>
              <Button
              text = "Créer votre premier offre"
              className="ds-mb-12 ds-w-100"
              onClick={()=>navigate('/addOffer')}
              type={TypeButton.secondary}
              size={Size.large} 
              style = {{
                fontSize: '16px',
                borderColor : '#15803d',
                color : '#15803d'
              }}
              />
              </div>
              )}
 </div>
 </div>  
 <DeleteOffer data={idOffer} show={showModalDelete} handleClose={()=>setShowModalDelete(false)} />
 </>
    )

}