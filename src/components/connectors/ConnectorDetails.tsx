import { Button, Checkbox, Container, Input, SizeButton, Text, TypeButton, TypeCheckbox } from "@piximind/ds-p-23";
import Navbar from "../nav/Navbar";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Size, Type } from "@piximind/ds-p-23/lib/esn/Interfaces";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {  OverlayTrigger, Tooltip } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import { getConnector } from "../../api/reducers/ConnectorsReducer";
import Guide from "./Guide";
import { FaPencilAlt } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import DeleteConnector from "./DeleteConnector";



export default function ConnectorDetails() {

      
    
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.auth.data?.token)
    const data = useAppSelector(state=>state.connectors.data);
    const apiRef = useRef(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
   

  const handleCopyApi = () => {
    if (apiRef.current) {
      const inputValue = (apiRef?.current as HTMLInputElement)?.value;
      navigator.clipboard.writeText(inputValue)
    }
  };

    const [active, setActive] = useState<boolean>(true)

    const fetchData = async ()=> {
      try {
        await dispatch(getConnector({id,token})).unwrap()
      }
      catch(error){
        console.log(error);
      }
    }

    useEffect(()=>{
      fetchData();
    },[])
  
    return (
        <>
        <Navbar/> 
  <Container className="ds-flex ds-align-center ds-justify-between ds-ml-58 ds-mt-35">
    <div className="ds-flex ds-align-center">
    <Button
      text={<IoIosArrowRoundBack /> as unknown as string}
      type={Type.tertiary}
      className="ds-text-size-55"
      style = {{color : '#003D42'}}
      size={Size.small}
      onClick={() => navigate('/')}
    />
    <Text
      text= {Array.isArray(data) ? data[0]?.connectorName : data?.connectorName}
      className="ds-text-size-30"
      style = {{color : '#003D42'}}
    />
    </div>
     <Checkbox
      checked = {active}
      onClick={()=>setActive(!active)}
      type={TypeCheckbox.switch}  
      label="Activé" 
      containerClassName="ds-mb-14 ds-mr-130"
      />
  </Container>
  <div className="ds-ml-80"> 
  <div className="ds-w-50 ds-mt-35"> 
    <Container className="ds-mt-3 ds-text-size-16">
    <b className="ds-text-primary">Site web</b> 
    <Text 
    text={Array.isArray(data) ? data[0]?.webSite : data?.webSite}
    className="ds-text-neutral800"
     />
    </Container>
    <Container className="ds-flex ds-align-center ds-mt-3"> 
      <Input
        label={<b className="ds-text-primary">API key</b> as unknown as string}
        value={Array.isArray(data) ? data[0]?.apiKey : data?.apiKey}
        className="ds-text-neutral800"
        ref={apiRef}
      />
      <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Copier</Tooltip>} placement='bottom'>
      <span className="d-inline-block">
      <Button 
      text="Copier" 
      size = {Size.medium}
      type = {TypeButton.secondary}
      className="ds-ml-15 ds-mt-24"
      onClick={handleCopyApi}
      />
        </span>
      </OverlayTrigger>  
    </Container>

    <Container
    className="ds-flex ds-mt-25"
    children ={
      <>
       <Button
      text ={<><FaPencilAlt className="ds-mr-3 ds-text-size-17"/> Modifier</> as unknown as string}
      type={TypeButton.primary}
      size={SizeButton.medium}
      className="ds-mr-10 ds-w-20"
      onClick={()=>navigate(`/editConnector/${id}`)}
      />
      <Button
      text ={<><TiDeleteOutline  className="ds-mr-3 ds-text-size-17" /> Supprimer</> as unknown as string}
      type={TypeButton.secondary}
      size={SizeButton.medium}
      className="ds-w-20"
      onClick={()=>setShowDeleteModal(true)}
      />
      </>
    }
    />

    <Guide exportGuide={true}/>
  </div>
</div>
<DeleteConnector show={showDeleteModal} handleClose={()=>setShowDeleteModal(false)} data={id}/>
         </>
    )

}


/*
 <div className="ds-flex ds-align-center ds-mb-14">
      <Button
      text ={<><FaPencilAlt className="ds-mr-2 ds-text-size-17"/> Modifier</> as unknown as string}
      type={TypeButton.secondary}
      size={SizeButton.small}
      style ={{
        backgroundColor: '#fff',
        borderColor: '#003D42',
        color: '#003D42',
        fontSize: '15px'
      }}
      className="ds-mr-10"
      onClick={()=>navigate(`/editConnector/${id}`)}
      />
      <Button
      text ={<><TiDeleteOutline  className="ds-mr-2 ds-text-size-17" /> Supprimer</> as unknown as string}
      type={TypeButton.secondary}
      size={SizeButton.small}
      style ={{
        backgroundColor: '#fff',
        borderColor: '#003D42',
        color: '#003D42',
        fontSize: '15px'
      }}
      onClick={()=>setShowDeleteModal(true)}
      />
    </div>
*/