import { Circle } from "@mui/icons-material";
import Box from "@mui/material/Box";
import { Button, styled } from "@mui/material";
import GoogleMapReact from "google-map-react";
import * as React from "react";
import { useState } from "react";
import { ISite } from "../../../types";
import { Pin } from "../../Pin/Pin";
import { cloneDeep } from "lodash";
import PlaceIcon from "@mui/icons-material/Place";

interface IProps {
  onChange: (newSiteList: ISite[]) => void;
  sites: ISite[];
}

export const SiteListCreatorV2: React.FC<IProps> = ({ onChange, sites }) => {
  const [curSite, setCurSite] = useState<ISite | undefined>(undefined);
  const [selectedSiteIndex, setSelectedSiteIndex] =
    useState<number | undefined>(undefined);

  const renderSites = () => {
    return sites.map((site, index) => {
      return (
        <Pin
          type="site"
          geocode={site.location}
          lat={site.location.latitude}
          lng={site.location.longitude}
          key={`site-${index}`}
          onClick={() => handleSiteClick(index)}
        >
          {index + 1}
        </Pin>
      );
    });
  };

  const renderCurSite = () => {
    if (curSite === undefined) {
      return null;
    }
    return (
      <Pin
        geocode={curSite.location}
        lat={curSite.location.latitude}
        lng={curSite.location.longitude}
        type="cur-site"
      >
        <PlaceIcon />
      </Pin>
    );
  };

  const handleSiteClick = (index: number) => {
    setCurSite(undefined);
    setSelectedSiteIndex(index);
  };

  const handleMapClick = (value: GoogleMapReact.ClickEventValue) => {
    setSelectedSiteIndex(undefined);
    setCurSite({ location: { latitude: value.lat, longitude: value.lng } });
  };

  const handleAddSiteButtonClick = () => {
    if (!curSite) {
      return;
    }
    const _sites = cloneDeep(sites);
    _sites.push(curSite);
    onChange(_sites);
    setCurSite(undefined);
  };

  const handleRemoveSiteButtonClick = () => {
    if (selectedSiteIndex === undefined) {
      return;
    }

    const _sites = cloneDeep(sites);
    _sites.splice(selectedSiteIndex, 1);
    onChange(_sites);
    setSelectedSiteIndex(undefined);
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY! }}
        defaultCenter={{
          lat: 44.1236349,
          lng: -79.3715556,
        }}
        defaultZoom={5}
        onClick={handleMapClick}
      >
        {renderCurSite()}
        {renderSites()}
      </GoogleMapReact>
      {curSite ? (
        <Wrapper>
          <StyledButton variant="contained" onClick={handleAddSiteButtonClick}>
            Add Site
          </StyledButton>
        </Wrapper>
      ) : null}
      {selectedSiteIndex !== undefined ? (
        <Wrapper>
          <StyledButton
            variant="contained"
            onClick={handleRemoveSiteButtonClick}
          >
            Remove Site
          </StyledButton>
        </Wrapper>
      ) : null}
    </div>
  );
};

const Wrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
});

const StyledButton = styled(Button)({
  position: "absolute",
  bottom: 24,
});
