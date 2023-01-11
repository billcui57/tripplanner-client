import HotelIcon from "@mui/icons-material/Hotel";
import { Box, styled, Typography } from "@mui/material";
import GoogleMapReact from "google-map-react";
import { useRef, useState } from "react";
import useSupercluster from "use-supercluster";
import { IPlanTripResponse } from "../../service/plantrip";
import { IPin, Pin } from "../../components/Pin/Pin";
import { DirectionCreator } from "../DirectionCreator.tsx/DirectionCreator";
import React from "react";

interface IProps {
  tripData: IPlanTripResponse | undefined;
  onMarkerClick: (point: IPin) => void;
  showDirectionCreator?: boolean;
  directionCreatorSource: IPin | undefined;
  directionCreatordestination: IPin | undefined;
}

export const ResultMap: React.FC<IProps> = ({
  tripData,
  onMarkerClick,
  showDirectionCreator,
  directionCreatorSource,
  directionCreatordestination,
}: IProps) => {
  const mapRef = useRef();
  const [bounds, setBounds] = useState<any[] | undefined>(undefined);
  const [zoom, setZoom] = useState(10);

  if (!tripData) {
    return null;
  }

  const points = tripData.day_drive_with_hotels
    .map((dayDrive, i) => {
      return dayDrive.hotels.map((hotel, j) => {
        return {
          type: "Feature",
          properties: {
            cluster: false,
            name: hotel.name,
            dayCount: i + 1,
          },
          geometry: {
            type: "Point",
            coordinates: [hotel.location.longitude, hotel.location.latitude],
          },
        };
      });
    })
    .flat();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 50, maxZoom: 20 },
  });

  const renderHotels = () => {
    return clusters.map((cluster, i) => {
      const [longitude, latitude] = cluster.geometry.coordinates;
      const {
        cluster: isCluster,
        point_count: pointCount,
        name: hotelName,
        dayCount,
      } = cluster.properties;
      if (isCluster) {
        const pin: IPin = {
          geocode: { latitude: latitude, longitude: longitude },
          type: "cluster",
        };
        return (
          <Pin
            lat={latitude}
            lng={longitude}
            geocode={{ latitude: latitude, longitude: longitude }}
            type="cluster"
            key={`hotel-marker-${i}`}
            hoverText={`${pointCount} hotels`}
            onClick={() => {
              onMarkerClick(pin);
            }}
          >
            <Typography variant="caption">{pointCount}</Typography>
            <HotelIcon fontSize="small" />
          </Pin>
        );
      } else {
        const pin: IPin = {
          geocode: { latitude: latitude, longitude: longitude },
          type: "hotel",
        };
        return (
          <Pin
            lat={latitude}
            lng={longitude}
            {...pin}
            key={`hotel-marker-${i}`}
            hoverText={hotelName}
            onClick={() => {
              onMarkerClick(pin);
            }}
          >
            <HotelIcon fontSize="small" />
          </Pin>
        );
      }
    });
  };

  const renderEndOfDays = () => {
    return tripData.day_drive_with_hotels.map((dayDrive, i) => {
      const location = dayDrive.day_drive.end_location;
      const pin: IPin = {
        geocode: { latitude: location.latitude, longitude: location.longitude },
        type: "end-of-day",
      };
      return (
        <Pin
          lat={location.latitude}
          lng={location.longitude}
          {...pin}
          key={`end-of-day-marker-${i}`}
          hoverText={`Area to rest after day ${i + 1}`}
          onClick={() => {
            onMarkerClick(pin);
          }}
        >
          <Typography variant="caption">Night {i + 1}</Typography>
        </Pin>
      );
    });
  };

  const renderSites = () => {
    return tripData.sites.map((site, i) => {
      const pin: IPin = {
        geocode: {
          latitude: site.location.latitude,
          longitude: site.location.longitude,
        },
        type: "site",
      };
      return (
        <Pin
          lat={site.location.latitude}
          lng={site.location.longitude}
          {...pin}
          key={`site-marker-${i}`}
          onClick={() => {
            onMarkerClick(pin);
          }}
        >
          <Typography variant="caption">Site {i + 1}</Typography>
        </Pin>
      );
    });
  };

  return (
    <div>
      {showDirectionCreator ? (
        <DirectionCreatorWrapper>
          <DirectionCreator
            source={directionCreatorSource}
            destination={directionCreatordestination}
          />
        </DirectionCreatorWrapper>
      ) : null}
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY! }}
          defaultCenter={{
            lat: tripData?.sites[0].location.latitude,
            lng: tripData?.sites[0].location.longitude,
          }}
          defaultZoom={5}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map }) => {
            mapRef.current = map;
          }}
          onChange={({ zoom, bounds }) => {
            setZoom(zoom);
            setBounds([
              bounds.nw.lng,
              bounds.se.lat,
              bounds.se.lng,
              bounds.nw.lat,
            ]);
          }}
        >
          {renderHotels()}
          {renderSites()}
          {renderEndOfDays()}
        </GoogleMapReact>
      </div>
    </div>
  );
};

const DirectionCreatorWrapper = styled(Box)({
  position: "relative",
  top: 24,
  left: 24,
  zIndex: 999,
  height: 0,
  width: 0,
});
