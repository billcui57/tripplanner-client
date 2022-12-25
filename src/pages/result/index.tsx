import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useQueryClient } from "react-query";
import GoogleMapReact from "google-map-react";
import { IPlanTripResponse } from "../../api/plantrip";
import { Circle } from "@mui/icons-material";
import { Pin } from "../../components/Pin/Pin";

export default function ResultPage() {
  const queryClient = useQueryClient();

  const tripData = queryClient.getQueryData<IPlanTripResponse>("plan-trip");

  const renderHotels = () => {
    const hotelMarkers = tripData?.day_drive_with_hotels
      .map((dayDrive, i) => {
        return dayDrive.hotel_geocodes.map((hotelGeocode, j) => {
          return (
            <Pin
              lat={hotelGeocode.latitude}
              lng={hotelGeocode.longitude}
              color="secondary"
              key={`hotel-marker-day-drive-${i}-hotel-${j}`}
            />
          );
        });
      })
      .flat();
    return hotelMarkers;
  };

  const renderSites = () => {
    return tripData?.sites.map((site, i) => {
      return (
        <Pin
          lat={site.location.latitude}
          lng={site.location.longitude}
          color="primary"
          key={`site-marker-${i}`}
        />
      );
    });
  };

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
        {renderSites()}
      </GoogleMapReact>
    </div>
  );
}
