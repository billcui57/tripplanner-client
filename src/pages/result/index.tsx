import { Alert, Button, CircularProgress, Container } from "@mui/material";
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

export default function ResultPage() {
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

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button sx={{ color: "#264653" }} size="small" onClick={goToMainPage}>
            Go Back
          </Button>

          <Container maxWidth="sm">
            <Box sx={{ marginBottom: 8 }}>
              <ResultList tripData={data} />
            </Box>
            <FAQ />
          </Container>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ position: "absolute", top: 10, right: 64, zIndex: 999 }}>
            <DirectionCreator
              source={sourceLocation}
              destination={destLocation}
            />
          </Box>
          <ResultMap tripData={data} onMarkerClick={handleMarkerClick} />
        </Grid>
      </Grid>

      <DirectionTypeSelectModal
        open={directionTypeSelectModalOpen}
        onClose={handleModalClose}
      ></DirectionTypeSelectModal>
    </React.Fragment>
  );
}
