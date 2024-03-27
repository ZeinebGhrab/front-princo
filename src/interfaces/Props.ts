import Connector from "./Connector";

export default interface Props {
    data? : Connector
    show : boolean;
    handleClose: () => void;
}