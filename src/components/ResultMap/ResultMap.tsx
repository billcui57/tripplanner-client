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
import HotelIcon from "@mui/icons-material/Hotel";
import { useRouter } from "next/router";

interface IProps {
  tripData: IPlanTripResponse;
}

export const ResultMap: React.FC<IProps> = ({ tripData }: IProps) => {
  const renderHotels = () => {
    const hotelMarkers = tripData.day_drive_with_hotels
      .map((dayDrive, i) => {
        return dayDrive.hotels.map((hotel, j) => {
          return (
            <Pin
              lat={hotel.location.latitude}
              lng={hotel.location.longitude}
              color="green"
              key={`hotel-marker-day-drive-${i}-hotel-${j}`}
            >
              {i + 1}
              <HotelIcon fontSize="small" />
            </Pin>
          );
        });
      })
      .flat();
    return hotelMarkers;
  };

  const renderSites = () => {
    return tripData.sites.map((site, i) => {
      return (
        <Pin
          lat={site.location.latitude}
          lng={site.location.longitude}
          color="pink"
          key={`site-marker-${i}`}
        >
          {i + 1}
        </Pin>
      );
    });
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY! }}
        defaultCenter={{
          lat: tripData?.sites[0].location.latitude,
          lng: tripData?.sites[0].location.longitude,
        }}
        defaultZoom={5}
      >
        {renderHotels()}
        {renderSites()}
      </GoogleMapReact>
    </div>
  );
};
