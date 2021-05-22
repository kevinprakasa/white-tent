import { Dialog } from "@progress/kendo-react-dialogs";

export interface IDialogComponentProps {
  title: string;
  handleClose: () => void;
  body: string;
}

const DialogComponent: React.FC<IDialogComponentProps> = (
  props: IDialogComponentProps
) => {
  const { title, handleClose, body } = props;

  return (
    <Dialog title={title} onClose={handleClose}>
      <p style={{ margin: "25px", textAlign: "center" }}>{body}</p>
    </Dialog>
  );
};

export default DialogComponent;
