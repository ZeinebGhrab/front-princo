import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import { getConnectors } from "../../api/reducers/ConnectorsReducer";
import Connector from "../../interfaces/Connector";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Button, Col, Row, SizeButton, TypeButton } from "@piximind/ds-p-23";
import { Size, Type } from "@piximind/ds-p-23/lib/esn/Interfaces";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavApp from "../nav/NavApp";
import ComponentPagination from "../../customComponent/ComponentPagination";
import { groupDataByRows } from "../helpers/GroupDataByRows";

export default function ConnectorsList() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authData = useAppSelector(state => state.authentication.data);
  const connectorsData = useAppSelector(state => state.connectors.data);

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8;

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

  const connectors = Array.isArray(connectorsData) && groupDataByRows(connectorsData);

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
      <NavApp />
      <div>
        <div className="ds-justify-center ds-flex ds-mt-50">
        <div className="ds-mt-35 ds-ml-160">
        {Array.isArray(connectors) && connectors.map((rowConnectors: Connector[], rowIndex: number) => (
    <Row key={rowIndex} className="ds-mb-20">
      {rowConnectors.map((connector: Connector, colIndex: number) => (
        <Col key={colIndex}>
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
                className='ds-box-shadow3'
                style={{
                  width: "20rem",
                  height: "7rem",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  cursor: "pointer",
                  borderColor: "#eaeeeb",
                }}
              >
                <Card.Title
                  style={{
                    display: "flex",
                    color: "#195054",
                    alignItems: "center",
                    margin: "10px",
                  }}
                >
                  {connector.connectorName}
                </Card.Title>
                <Card.Body>
                  <Button
                    text= {connector.isActive ? "Connecté" : "Déconnecté"}
                    size={SizeButton.small}
                    type={TypeButton.secondary}
                  />
                </Card.Body>
              </Card>
            </span>
          </OverlayTrigger>
        </Col>
      ))}
      {rowConnectors.length < 3 && (
        <Col key={rowConnectors.length}>
          <Card 
            className='ds-box-shadow3'
            style={{ width: '20rem', 
            height: '7rem',
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
                  onClick={() => addConnector()}
                />
              </div>
              <Card.Title style={{ textAlign: 'center', color : '#195054' }}>Ajouter un connecteur</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      )}
    </Row>
  ))}
  {Array.isArray(connectors) && connectors.length > 0 && connectors[connectors.length - 1].length === 3 && (
    <Row key="additionalRow" className="ds-mb-20">
      <Col key={connectors[connectors.length - 1].length}>
        <Card 
          className='ds-box-shadow3'
          style={{ width: '20rem', 
          height: '7rem',
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
                onClick={() => addConnector()}
              />
            </div>
            <Card.Title style={{ textAlign: 'center', color : '#195054' }}>Ajouter un connecteur</Card.Title>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )}
        </div>
       
       <div>
       {
      <ComponentPagination 
      currentPage={currentPage} 
      totalPages={totalPages} 
      text="Pas de connecteurs"
      length={Array.isArray(connectorsData) && connectorsData.length || 0}
      handlePageChange={handlePageChange}/>
        } 
        {
         Array.isArray(connectorsData) && connectorsData.length ===0 && (
            <div className="">
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
                 className='ds-ml-7 ds-text-primary900 ds-ml-7' 
                 >
                    Consultez le guide
                    </Link>
              </span>
              </div>
          )
        }
         </div>
       </div>
      </div>
    </>
  );
}