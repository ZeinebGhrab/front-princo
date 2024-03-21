import { ModalRefType } from "@piximind/ds-p-23";
import User from "./User";
import InvoiceDetails from "./InvoiceDetails";

export default interface Props {
    modalRef: React.RefObject<ModalRefType>;
    data? : User | InvoiceDetails;
    cancel: () => void;
}