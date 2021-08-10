import './Modal.css';

function ModalWindow(props: any) {
  return (
    <div className="modal-frame">
      <div className="modal-window">
        {props.children}
      </div>
    </div>
  );
}
export default ModalWindow;
