import { Card } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import { getConnectors } from "../../api/reducers/ConnectorsReducer";
import Printer from "../../interfaces/Connector";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Button, Col, Row } from "@piximind/ds-p-23";
import { Type } from "@piximind/ds-p-23/lib/esn/Interfaces";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../nav/Navbar";

export default function ConnectorsList(){

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authData = useAppSelector(state => state.auth.data);
  const printersData = useAppSelector (state=> state.printers.data);

  const showConnectors= async () : Promise<void> => {
       try {
        dispatch(getConnectors({id : authData?.id , token: authData?.token})).unwrap();
       }
       catch(error) {
        console.log(error);
       }
  }

  const addPrinter = async () : Promise<void> =>{
    navigate('/addConnector');
  }

  useEffect(()=>{
    showConnectors();
  }, [])



    return(
        <>
        <Navbar/>

        <div className="ds-m-100">
          {
            printersData && printersData.map((printer : Printer) => {
              return (
                <Row>
                  <Col>
                  <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>{printer.connectorName}</Card.Title>
                  <Card.Text>
                  </Card.Text>
                  <Button text="Connecté"/>
                </Card.Body>
              </Card>
                  </Col>
                </Row>
              )    
            }
            )
          }
          <Card style={{ width: '20rem', height:'7rem', borderWidth: '2px', borderStyle: 'solid', borderColor: '#283c53' }}>
                <Card.Body>
                  <div className = "ds-flex ds-justify-center ds-mb-">
                  <Button
                  text = {<IoIosAddCircleOutline/> as unknown as string}
                  className="ds-text-size-30 ds-text-neutral900"
                  style={{
                    backgroundColor : '#fff',
                    borderColor: '#eaeeeb'
                  }}
                  type={Type.primary}
                  onClick={()=>addPrinter()}
                  />
                  </div>
                  <Card.Title style={{ textAlign: 'center', color: '#283c53' }}>Ajouter une imprimante</Card.Title>
                </Card.Body>
              </Card>
        </div>
        </>
    )
}