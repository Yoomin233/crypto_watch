import { createPortal } from "react-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10;
  display: flex;

  > div {
    width: 80vw;
    max-width: 500px;
    padding: 24px;
    margin: auto;
    border-radius: 16px;
    background: var(--gray-color);
  }
`;

const Modal: React.FC<{ show: boolean; onClose?: () => void }> = ({
  children,
  show,
  onClose
}) => {
  return show
    ? createPortal(
        <Wrapper onClick={onClose}>
          <div
            onClick={e => {
              e.stopPropagation();
            }}
          >
            {children}
          </div>
        </Wrapper>,
        document.body
      )
    : null;
};

export default Modal;
