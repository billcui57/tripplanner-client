import { Button, ButtonGroup, Dialog, DialogTitle } from "@mui/material";
import Box from "@mui/material/Box";

export type IDirectionType = "source" | "destination";

interface IProps {
  open: boolean;
  onClose: (value: IDirectionType) => void;
}

export const DirectionTypeSelectModal: React.FC<IProps> = (props: IProps) => {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle sx={{ color: "#264653" }}>
        Set this as source or destination
      </DialogTitle>

      <Box textAlign={"center"} paddingBottom={4}>
        <Button
          onClick={() => {
            props.onClose("source");
          }}
          sx={{ color: "#2A9D8F" }}
        >
          Source
        </Button>
        <Button
          onClick={() => {
            props.onClose("destination");
          }}
          sx={{ color: "#2A9D8F" }}
        >
          Destination
        </Button>
      </Box>
    </Dialog>
  );
};
