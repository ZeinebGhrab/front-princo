import { ModalRefType } from "@piximind/ds-p-23";

export default interface Props {
    modalRef: React.RefObject<ModalRefType>;
    cancel: () => void;
}