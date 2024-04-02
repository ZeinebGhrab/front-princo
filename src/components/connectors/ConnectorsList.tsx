import { Card, OverlayTrigger, Pagination, Tooltip } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import { getConnectors } from "../../api/reducers/ConnectorsReducer";
import Connector from "../../interfaces/Connector";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Button, Col, Container, Row, SizeButton, TypeButton, Text } from "@piximind/ds-p-23";
import { Size, TextType } from "@piximind/ds-p-23/lib/esn/Interfaces";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../nav/Navbar";
import { LuCircleOff } from "react-icons/lu";

export default function ConnectorsList() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authData = useAppSelector(state => state.auth.data);
  const connectorsData = useAppSelector(state => state.connectors.data);

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9;

  const totalPages = useMemo(() : number =>{ 
  return Math.floor((Array.isArray(connectorsData) && connectorsData?.length || 0) / limit) + 1
},[connectorsData, limit]);

const handlePageChange = async (pageNumber: number): Promise<void> => {
  setCurrentPage(pageNumber);
};

  const showConnectors = useCallback(
    async (): Promise<void> => {
      try {
        const skip = limit * (currentPage - 1);
        dispatch(getConnectors({ id: authData?.id, token: authData?.token, skip, limit })).unwrap();
      } catch (error) {
        console.log(error);
      }
    }
  ,[authData?.id, authData?.token, currentPage, dispatch, limit]);

  const connectors = Array.isArray(connectorsData) &&
    connectorsData.reduce((newConnectorsData: Connector[][], connector: Connector, index: number) => {
      const RowIndex = Math.floor(index / 3);

      if (!newConnectorsData[RowIndex]) {
        newConnectorsData[RowIndex] = []; 
      }

      newConnectorsData[RowIndex].push(connector);
      return newConnectorsData;
    }, []);


  const addConnector = async (): Promise<void> => {
    navigate('/addConnector');
  }

  const handleClick = (id : string | undefined) => {
    navigate(`/connectorDetails/${id}`);
  };

  useEffect(() => {
    showConnectors();
  }, [showConnectors]);

  return (
    <>
      <Navbar />
      <div>
        {
          Array.isArray(connectorsData) && connectorsData.length !==0 && (
        <div className="ds-justify-end ds-flex ds-mt-30 ds-mr-70">
        <Button
        text = {<><IoIosAddCircleOutline className="ds-text-size-20 ds-mr-3"/> Ajouter un connecteur</> as unknown as string}
        type={TypeButton.secondary}
        size={SizeButton.medium}
        onClick={()=>addConnector()}
        />
        </div>
        )
        }
        <div className="ds-justify-center ds-flex">
        <div className="ds-mt-35 ds-m-50">
        {Array.isArray(connectors) && connectors.map((rowConnectors: Connector[], rowIndex: number) => (
            <Row key={rowIndex} className="ds-mb-20">
              {rowConnectors.map((connector: Connector, colIndex: number) => (
                <Col key={colIndex} >
                  <OverlayTrigger
                    overlay={
                      <Tooltip id="tooltip-disabled">
                        Accéder aux détails du connecteur
                      </Tooltip>
                    }
                  >
                    <span className="d-inline-block">
                      <Card
                        onClick={() => handleClick(connector._id)}
                        className='ds-box-shadow1'
                        style={{
                          width: "20rem",
                          height: "7rem",
                          borderWidth: "1px",
                          borderStyle: "solid",
                          cursor: "pointer",
                          borderColor: "#A4BABC",
                        }}
                      >
                        <Card.Title
                          style={{
                            display: "flex",
                            color: "#3B6A6E",
                            alignItems: "center",
                            margin: "10px",
                          }}
                        >
                          {connector.connectorName}
                        </Card.Title>
                        <Card.Body>
                          <Button
                            text="Connecté"
                            size={SizeButton.small}
                            type={TypeButton.secondary}
                            style={{
                              color : '#477377',
                              borderColor: '#477377'
                            }}
                          />
                        </Card.Body>
                      </Card>
                    </span>
                  </OverlayTrigger>
                </Col>
              ))}
            </Row>
          ))}

        </div>
       
    {
       Array.isArray(connectorsData) && connectorsData.length !==0 && (
        <Pagination  className="ds-mb-20 ds-flex ds-justify-center ds-text-neutral800 fixed-bottom">
              <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
              <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
              <Pagination.Item>{currentPage}</Pagination.Item>
              <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages } />
              <Pagination.Last onClick={() => handlePageChange(totalPages)} />
          </Pagination>
       )
    }
        </div>
        {
          Array.isArray(connectorsData) && connectorsData.length ===0 && currentPage === 1 && (
            <div className="ds-flex ds-center">
              <div className="ds-m-60">
                <Container
                className='ds-mb-25'
                children = {
                  <>
                  <div className='ds-text-size-90 ds-flex ds-justify-center' style = {{color : '#2D5F63'}}>
                  <LuCircleOff />
                  </div>
                  <Text
                  text='Pas de connecteurs'
                  type={TextType["type-4"]}
                  style = {{color : '#2D5F63'}}
                  />
                  </>
                }
                />
                  
              <Button
              text = "Créer votre premier connecteur"
              className="ds-mb-12 ds-w-100"
              onClick={() => addConnector()}
              type={TypeButton.secondary}
              size={Size.large} 
              style = {{
                fontSize: '16px',
                borderColor : '#15803d',
                color : '#15803d'
              }}
              />
              <span className="ds-flex ds-justify-center ds-text-neutral500 ds-text-size-16">
                Besoin d'aide ? 
                <Link to='/guide'
                 className='ds-ml-7 ds-text-primary900' 
                 >
                    Consultez le guide
                    </Link>
              </span>
              </div>
            </div>
          )
        }
      </div>
    </>
  );
}