import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useQueryClient } from "react-query";
import GoogleMapReact from "google-map-react";
import {
  IPlanTripResponse,
  IPlanTripResponseAdapter,
} from "../../api/plantrip";
import { Circle } from "@mui/icons-material";

export default function ResultPage() {
  const queryClient = useQueryClient();

  const tripData = queryClient.getQueryData<IPlanTripResponse>("plan-trip");

  const renderHotels = () => {
    const hotelMarkers = tripData?.day_drive_with_hotels
      .map((dayDrive) => {
        return dayDrive.hotel_geocodes.map((hotelGeocode) => {
          return (
            <Circle
              lat={hotelGeocode.latitude}
              lng={hotelGeocode.longitude}
              color="yellow"
            >
              hello
            </Circle>
          );
        });
      })
      .flat();
    return hotelMarkers;
  };

  // const renderSites = () => {
  //   return tripData?.sites.map((site) => {
  //     return (
  //       <Circle
  //         lat={hotelGeocode.latitude}
  //         lng={hotelGeocode.longitude}
  //         color="blue"
  //       >
  //         {site}
  //       </Circle>
  //     );
  //   });
  // };

  console.log({ cached: tripData });

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY! }}
        defaultCenter={{
          lat: 44.1236349,
          lng: -79.3715556,
        }}
        defaultZoom={23}
      >
        {renderHotels()}
        {/* {renderSites()} */}
      </GoogleMapReact>
    </div>
  );
}
