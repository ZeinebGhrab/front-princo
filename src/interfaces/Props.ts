import { ModalRefType } from "@piximind/ds-p-23";
import User from "./User";

export default interface Props {
    modalRef: React.RefObject<ModalRefType>;
    data? : User;
    cancel: () => void;
}