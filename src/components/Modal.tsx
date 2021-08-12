import './Modal.css';

function ModalWindow(props: any) {
  return (
    <div className="modal-frame">
      <div className={`modal-window ${props.className}`}>
        {props.children}
      </div>
    </div>
  );
}
export default ModalWindow;
