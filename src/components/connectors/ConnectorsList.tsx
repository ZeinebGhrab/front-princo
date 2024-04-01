import { Card, OverlayTrigger, Pagination, Tooltip } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import { getConnectors } from "../../api/reducers/ConnectorsReducer";
import Connector from "../../interfaces/Connector";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Button, Col, Container, Row, SizeButton, TypeButton, Text } from "@piximind/ds-p-23";
import { Size, TextType, Type } from "@piximind/ds-p-23/lib/esn/Interfaces";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../nav/Navbar";
import { LuCircleOff } from "react-icons/lu";

export default function ConnectorsList() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authData = useAppSelector(state => state.auth.data);
  const connectorsData = useAppSelector(state => state.connectors.data);
  const lastRowHasLessThanThreeConnectors = Array.isArray(connectorsData) && connectorsData.length !== 0 && connectorsData.length % 3 === 0;

  const showConnectors = useCallback(
    async (): Promise<void> => {
      try {
        dispatch(getConnectors({ id: authData?.id, token: authData?.token })).unwrap();
      } catch (error) {
        console.log(error);
      }
    }
  ,[authData?.id, authData?.token, dispatch])

  const addConnector = async (): Promise<void> => {
    navigate('/addConnector');
  }

  const handleClick = (id : string | undefined) => {
    navigate(`/connectorDetails/${id}`);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9;
  const totalPages = useMemo(() : number => Math.floor((connectorsData?.length || 0) / limit) + 1, [connectorsData, limit]);

  const handlePageChange = async (pageNumber: number): Promise<void> => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    showConnectors();
  }, [showConnectors]);


  return (
    <>
      <Navbar />
      <div className='ds-flex ds-center ds-mt-13'>
        <div className="ds-m-50">
        {Array.isArray(connectorsData) &&
        connectorsData
    .reduce((data: Connector[][], connector: Connector, index: number) => {
      const chunkIndex = Math.floor(index / 3);
      if (!data[chunkIndex]) {
        data[chunkIndex] = [];
      }
      data[chunkIndex].push(connector);
      return data;
    }, [])
    .map((connData: Connector[], connDataIndex: number) => (
      <Row key={connDataIndex} className="ds-mb-20">
        {connData.map((connector: Connector, index: number) => (
          <Col key={index}>
            <OverlayTrigger overlay={
            <Tooltip id="tooltip-disabled">
              Accéder aux détails du connecteur
              </Tooltip>}>
      <span className="d-inline-block">
      <Card 
            onClick={()=>handleClick(connector._id)} 
            style={{
              width: '22rem',
               height: '8rem',
                borderWidth: '2px', 
                borderStyle: 'solid', 
                cursor: 'pointer',
                borderColor : '#16a34a'
                }} >
              <Card.Title 
              style={{ 
                display: 'flex',
                color : '#15803d',
                alignItems: 'center',
                margin: '10px',
                }}>
                {connector.connectorName}
              </Card.Title>
              <Card.Body>
                <Button text="Connecté"
                  size={SizeButton.small}
                  type={TypeButton.secondary}
                  style={{
                    backgroundColor: '#fff',
                    borderColor: '#16a34a',
                    color: '#16a34a',
                    fontSize : '16px'
                  }}
                />
              </Card.Body>
            </Card>

      </span>
      </OverlayTrigger>
          </Col>
        ))}
        {connData.length < 3  && (
          <Col key={connData.length}>
            <Card 
             style={{ width: '22rem', 
             height: '8rem',
              borderWidth: '2px',
              borderStyle: 'solid',
              borderColor : '#16a34a'

               }}>
              <Card.Body>
                <div className="ds-flex ds-justify-center ds-mb-4">
                  <Button
                    text={<IoIosAddCircleOutline /> as unknown as string}
                    className="ds-text-size-30 ds-text-success600"
                    style={{
                      backgroundColor: '#fff',
                    }}
                    type={Type.primary}
                    onClick={() => addConnector()}
                  />
                </div>
                <Card.Title style={{ textAlign: 'center', color : '#15803d' }}>Ajouter un connecteur</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    ))}

          {lastRowHasLessThanThreeConnectors && (
            <Row key="connector" className="ds-mb-20">
              <Col>
                <Card style={{ width: '22rem', height: '8rem', borderWidth: '1px', borderStyle: 'solid', borderColor: '#16a34a'}}>
                  <Card.Body>
                    <div className="ds-flex ds-justify-center ds-mb-4">
                      <Button
                        text={<IoIosAddCircleOutline /> as unknown as string}
                        className="ds-text-size-30 ds-text-neutral900"
                        style={{
                          backgroundColor: '#fff',
                          borderColor: '#2d5f63'
                        }}
                        type={Type.primary}
                        onClick={() => addConnector()}
                      />
                    </div>
                    <Card.Title style={{ textAlign: 'center', color : '#15803d' }}>Ajouter un connecteur</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
          <Pagination className="mb-2 mt-1 d-flex justify-content-center">
              <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
              <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
              <Pagination.Item>{currentPage}</Pagination.Item>
              <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages || currentPage >= totalPages} />
              <Pagination.Last onClick={() => handlePageChange(totalPages)} />
          </Pagination>
        </div>
        {
          Array.isArray(connectorsData) && connectorsData.length ===0 && (
            <div className="ds-m-100">
              <div>
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