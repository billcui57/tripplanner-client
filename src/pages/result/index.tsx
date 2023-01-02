import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useQuery } from "react-query";
import planTrip, { IPlanTripRequest } from "../../service/plantrip";
import { DirectionCreator } from "../../components/DirectionCreator.tsx/DirectionCreator";
import {
  DirectionTypeSelectModal,
  IDirectionType,
} from "../../components/DirectionCreator.tsx/DirectionTypeSelectModal";
import { IPin } from "../../components/Pin/Pin";
import { ResultList } from "../../components/ResultList/ResultList";
import { ResultMap } from "../../components/ResultMap/ResultMap";
import { FAQ } from "../../components/FAQ/FAQ";
import { Stack } from "@mui/system";

export default function ResultPage() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const router = useRouter();
  const [sourceLocation, setSourceLocation] =
    useState<IPin | undefined>(undefined);
  const [destLocation, setDestLocation] = useState<IPin | undefined>(undefined);
  const [selectedPin, setSelectedPin] = useState<IPin | undefined>(undefined);
  const [directionTypeSelectModalOpen, setDirectionTypeSelectModalOpen] =
    useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const queryData = router.query.data as string;
  const planTripRequest: IPlanTripRequest | undefined = queryData
    ? JSON.parse(queryData)
    : undefined;

  const fetchData = async () => {
    return planTrip(planTripRequest!);
  };

  const getQueryKey = () => {
    return "plan-trip" + queryData;
  };

  const { isLoading, data, refetch } = useQuery(getQueryKey(), fetchData, {
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!router.query.data && !!planTripRequest,
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.error);
      }
    },
  });

  const goToMainPage = () => {
    console.log(planTripRequest);
    router.push({
      pathname: "/",
      query: { data: JSON.stringify(planTripRequest) },
    });
  };

  const handleMarkerClick = (pin: IPin) => {
    setSelectedPin(pin);
    setDirectionTypeSelectModalOpen(true);
  };

  const handleModalClose = (value: IDirectionType) => {
    if (value === "source") {
      setSourceLocation(selectedPin);
    } else if (value === "destination") {
      setDestLocation(selectedPin);
    }
    setDirectionTypeSelectModalOpen(false);
  };

  if (error) {
    return (
      <React.Fragment>
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={goToMainPage}>
              Go Back
            </Button>
          }
          sx={{ marginBottom: 8 }}
        >
          {error}
        </Alert>
        <Container maxWidth="sm">
          <FAQ />
        </Container>
      </React.Fragment>
    );
  }

  if (isLoading || !data) {
    return (
      <React.Fragment>
        <CircularProgress
          sx={{
            position: "fixed",
            top: "47%",
            left: "49%",
            color: "#2A9D8F",
          }}
        />
      </React.Fragment>
    );
  }

  const renderDesktop = () => {
    return (
      <React.Fragment>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button color="primary" size="small" onClick={goToMainPage}>
              Go Back
            </Button>

            <Container maxWidth="sm">
              <Typography
                variant="h4"
                textAlign={"center"}
                marginBottom={2}
                marginTop={2}
                sx={{ color: "#264653" }}
              >
                Your trip, planned
              </Typography>
              <Box sx={{ marginBottom: 8 }}>
                <ResultList tripData={data} />
              </Box>
              <FAQ />
            </Container>
          </Grid>
          <Grid item xs={6}>
            <ResultMap
              tripData={data}
              onMarkerClick={handleMarkerClick}
              showDirectionCreator
              directionCreatorSource={sourceLocation}
              directionCreatordestination={destLocation}
            />
          </Grid>
        </Grid>

        <DirectionTypeSelectModal
          open={directionTypeSelectModalOpen}
          onClose={handleModalClose}
        ></DirectionTypeSelectModal>
      </React.Fragment>
    );
  };

  const renderMobile = () => {
    return (
      <Stack spacing={4} marginTop={4}>
        <Container maxWidth="sm">
          <Button color="primary" size="small" onClick={goToMainPage}>
            Go Back
          </Button>
          <Typography
            variant="h4"
            textAlign={"center"}
            marginBottom={2}
            marginTop={2}
            sx={{ color: "#264653" }}
          >
            Your trip, planned
          </Typography>
          <ResultList tripData={data} />
        </Container>
        <ResultMap
          tripData={data}
          onMarkerClick={handleMarkerClick}
          showDirectionCreator
          directionCreatorSource={sourceLocation}
          directionCreatordestination={destLocation}
        />
        <DirectionTypeSelectModal
          open={directionTypeSelectModalOpen}
          onClose={handleModalClose}
        ></DirectionTypeSelectModal>
        <Box textAlign="center">
          <Container maxWidth="sm">
            <FAQ />
          </Container>
        </Box>
      </Stack>
    );
  };

  return isDesktop ? renderDesktop() : renderMobile();
}
