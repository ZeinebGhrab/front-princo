import { Card } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import { getConnectors } from "../../api/reducers/ConnectorsReducer";
import Connector from "../../interfaces/Connector";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Button, Col, Row, SizeButton, TypeButton } from "@piximind/ds-p-23";
import { Size, Type } from "@piximind/ds-p-23/lib/esn/Interfaces";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../nav/Navbar";
import { RiEdit2Fill } from "react-icons/ri";
import EditConnector from "./EditConnector";

export default function ConnectorsList() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authData = useAppSelector(state => state.auth.data);
  const connectorsData = useAppSelector(state => state.connectors.data);
  const lastRowHasLessThanThreeConnectors = Array.isArray(connectorsData) && connectorsData.length % 3 === 0;
  const [showConnector, setShowConnector] = useState(Array(3 * (Array.isArray(connectorsData) ? connectorsData.length : 0)).fill(false));

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

  useEffect(() => {
    showConnectors();
  }, [showConnectors, showConnector]);

  return (
    <>
      <Navbar />
      <div className='ds-flex ds-center'>
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
            <EditConnector data={connector} handleClose={() => {
                const updatedShowConnector = [...showConnector];
                updatedShowConnector[connDataIndex * 3 + index] = false;
                setShowConnector(updatedShowConnector);
                }} 
                show={showConnector[connDataIndex * 3 + index]} 
            />

            <Card style={{ width: '22rem', height: '8rem', borderWidth: '1px', borderStyle: 'solid', borderColor: '#283c53' }}>
              <Card.Title style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px' }}>
                {connector.connectorName}
                <Button
                  text={<RiEdit2Fill /> as unknown as string}
                  size={Size.xSmall}
                  className="ds-text-size-18"
                  style={{
                    backgroundColor: '#eaeeeb',
                    borderColor: '#eaeeeb',
                    color: '#000',
                  }}
                  onClick={() =>  {
                    const updatedShowConnector = [...showConnector];
                    updatedShowConnector[connDataIndex * 3 + index] = true;
                    setShowConnector(updatedShowConnector);
                  }}
                />
              </Card.Title>
              <Card.Body>
                <Button text="Connecté"
                  size={SizeButton.small}
                  type={TypeButton.secondary}
                  style={{
                    backgroundColor: '#fff',
                    borderColor: '#283c53',
                    color: '#283c53',
                  }}
                />
              </Card.Body>
            </Card>
          </Col>
        ))}
        {connData.length < 3  && (
          <Col key={connData.length}>
            <Card style={{ width: '22rem', height: '8rem', borderWidth: '1px', borderStyle: 'solid', borderColor: '#283c53' }}>
              <Card.Body>
                <div className="ds-flex ds-justify-center ds-mb-">
                  <Button
                    text={<IoIosAddCircleOutline /> as unknown as string}
                    className="ds-text-size-30 ds-text-neutral900"
                    style={{
                      backgroundColor: '#fff',
                    }}
                    type={Type.primary}
                    onClick={() => addConnector()}
                  />
                </div>
                <Card.Title style={{ textAlign: 'center', color: '#283c53' }}>Ajouter une imprimante</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    ))}

          {lastRowHasLessThanThreeConnectors && (
            <Row key="connector" className="ds-mb-20">
              <Col>
                <Card style={{ width: '22rem', height: '8rem', borderWidth: '1px', borderStyle: 'solid', borderColor: '#283c53' }}>
                  <Card.Body>
                    <div className="ds-flex ds-justify-center ds-mb-">
                      <Button
                        text={<IoIosAddCircleOutline /> as unknown as string}
                        className="ds-text-size-30 ds-text-neutral900"
                        style={{
                          backgroundColor: '#fff',
                          borderColor: '#eaeeeb'
                        }}
                        type={Type.primary}
                        onClick={() => addConnector()}
                      />
                    </div>
                    <Card.Title style={{ textAlign: 'center', color: '#283c53' }}>Ajouter une imprimante</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </div>
      </div>
    </>
  );
}
