import React from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Trash3Fill } from "react-bootstrap-icons";
import { Product } from "../../utils/types";
import CloseButton from "../buttons/CloseButton";
import OrderMenuItem from "../order/OrderMenuItem";

interface Props {
  showModal: boolean;
  handleCloseModal: () => void;
  selectedProduct: Product | null;
  onDelete: (productId: number) => void;
}

const DeleteOrderProductModal: React.FC<Props> = ({
  showModal,
  handleCloseModal,
  onDelete,
  selectedProduct,
}) => {
  return (
    <Modal
      className="modal"
      dialogClassName="modal__сustom"
      show={showModal}
      onHide={handleCloseModal}
    >
      {selectedProduct && (
        <>
          <Modal.Header className="modal__header">
            <Modal.Title>
              Вы уверены, что хотите удалить этот приход?
            </Modal.Title>
            <CloseButton onClose={handleCloseModal} />
          </Modal.Header>

          <Modal.Body className="modal__product">
            <Table>
              <tbody>
                <OrderMenuItem product={selectedProduct} />
              </tbody>
            </Table>
          </Modal.Body>

          <Modal.Footer className="modal__footer">
            <Button
              className="modal__cancelButton"
              variant="outline"
              onClick={handleCloseModal}
            >
              Отменить
            </Button>
            <Button
              className="modal__deleteButton"
              variant="outline-danger"
              onClick={() => onDelete(selectedProduct.id)}
            >
              <Trash3Fill className="modal__trash" />
              Удалить
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

export default DeleteOrderProductModal;
