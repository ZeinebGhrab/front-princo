import { Pagination} from "react-bootstrap";
import PaginationProps from "../interfaces/props/PaginationProps";
import { Container,Text, TextType } from "@piximind/ds-p-23";
import { LuCircleOff } from "react-icons/lu";


export default function ComponentPagination({ currentPage, totalPages, text,length, handlePageChange }: PaginationProps) {

    return(
      <>
      {length!== 0 && (
        <Pagination className="ds-mb-10 ds-flex ds-justify-center ds-text-neutral800 fixed-bottom">
          <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
          <Pagination.Item><span style={{ color: '#195054' }}>{currentPage}</span></Pagination.Item>
          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => handlePageChange(totalPages)} />
        </Pagination>
      )}
      {
        length === 0 && (
                <div className="ds-mt-100 ds-flex ds-center">
                  <Container
                  className="ds-justify-center"
                  children = {
                    <>
                    <div className='ds-text-size-90 ds-flex ds-justify-center' style = {{color : '#2D5F63'}}>
                    <LuCircleOff />
                    </div>
                    <Text
                    text={text}
                    type={TextType["type-4"]}
                    style = {{color : '#2D5F63'}}
                    className='ds-flex ds-justify-center'
                    />
                    </>
        }
                  />
                </div>
        )
      }
    </>
    )
}