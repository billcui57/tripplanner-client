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
      <DialogTitle>Set this as source or destination</DialogTitle>

      <Box textAlign={"center"} paddingBottom={4}>
        <ButtonGroup variant="contained">
          <Button
            onClick={() => {
              props.onClose("source");
            }}
          >
            Source
          </Button>
          <Button
            onClick={() => {
              props.onClose("destination");
            }}
          >
            Destination
          </Button>
        </ButtonGroup>
      </Box>
    </Dialog>
  );
};
