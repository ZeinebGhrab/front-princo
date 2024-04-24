import { Checkbox, Container, Input, Text, TypeCheckbox } from "@piximind/ds-p-23";
import NavApp from "../nav/NavApp";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import { activeConnector, getConnector } from "../../api/reducers/ConnectorsReducer";
import Guide from "./Guide";
import { FaPencilAlt } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import DeleteConnector from "./DeleteConnector";
import ComponentTitle from "../../customComponent/ComponentTitle";
import CopyButton from "../../customComponent/CopyButton";
import TitleButton from "../../customComponent/TitleButton";


export default function ConnectorDetails() {
    
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.authentication.data?.token)
    const data = useAppSelector(state=>state.connectors.data);
    const apiRef = useRef(null);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [copy, setCopy] = useState<boolean>(false);

    const buttons = [
      {
        text: <><FaPencilAlt className="ds-text-size-17 ds-mr-2"/> Modifier</>,
        className: "ds-mr-12",
        handle: ()=>navigate(`/editConnector/${id}`),
      },
      {
        text: <><TiDelete  className="ds-text-size-17 ds-mr-2"/>Supprimer</>,
        handle: ()=>setShowDeleteModal(true),
      }
    ]
   

  const handleCopyApi = () => {
    if (apiRef.current) {
      const inputValue = (apiRef?.current as HTMLInputElement)?.value;
      navigator.clipboard.writeText(inputValue);
      setCopy(true);
      setTimeout(() => {
        setCopy(false);
      }, 3000); 
    }
  };

    const fetchData =useCallback( async ()=> {
      try {
        await dispatch(getConnector({id,token})).unwrap()
      }
      catch(error){
        console.log(error);
      }
    },[dispatch, id, token]);
    
    const [active, setActive]= useState(Array.isArray(data) ? data[0].isActive : data.isActive);
    
    useEffect(()=>{
      const handleActive = async ()=> {
        try {
          await dispatch(activeConnector({id,active,token})).unwrap();      }
        catch(error){
          console.log(error);
        }
      }
      handleActive();
    },[active, dispatch, id, token]);

    useEffect(()=>{
      fetchData();
    },[data,fetchData ]);
  
    return (
        <>
        <NavApp/> 
  <Container className="ds-flex ds-align-center ds-justify-between ds-mt-40">
  <ComponentTitle title={Array.isArray(data) ? data[0]?.connectorName : data?.connectorName} navigatePage='/'/>
     <div className="ds-flex ds-align-center ds-mr-130">
      {
        buttons.map((button, index)=>(
          <TitleButton 
            key={index}
            text={button.text} 
            handle={button.handle} 
            className={button.className}        
          />
        ))
      }
    <Checkbox
      checked = {active}
      onClick={()=>{setActive(!active)}}
      type={TypeCheckbox.switch}  
      label="Activé"
      className="ds-ml-12" 
      />
     </div>
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
      <CopyButton
      copy={copy}
      className="ds-ml-15 ds-mt-24"
      type="secondary"
      handleCopy={handleCopyApi}
      />
    </Container>
    <Guide exportGuide={true} apiKey={Array.isArray(data) ? data[0]?.apiKey : data?.apiKey}/>
  </div>
</div>
<DeleteConnector show={showDeleteModal} handleClose={()=>setShowDeleteModal(false)} data={id}/>
         </>
    )

}
