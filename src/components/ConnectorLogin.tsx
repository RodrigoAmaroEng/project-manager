import "./ConnectorLogin.css";
import GDriveIcon from "../img/google-drive.svg";
import Button, { ButtonType } from "./Button";
import StaticField from "./StaticField";

export function ConnectorLogin(props: any) {
  if (props.user) {
    return (
      <div className="connector-login-user">
        <img src={props.user.picture} />
        <StaticField label="Logged as:" value={props.user.name} />
      </div>
    );
  } else if (props.isLoading) {
    return (
      <div className="connector-login-loading">
        <img src={GDriveIcon} />
        <span>Loading...</span>
      </div>
    );
  } else {
    return (
      <Button type={ButtonType.main} onClick={props.onClick}>
        <div className="connector-login">
          <img src={GDriveIcon} />
          <span>Click to login</span>
        </div>
      </Button>
    );
  }
}
