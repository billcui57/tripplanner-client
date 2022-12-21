import { IconButton, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { cloneDeep } from "lodash";
import * as React from "react";
import AddIcon from "@mui/icons-material/Add";

interface IProps {
  onChange: (newSiteList: ISite[]) => void;
}

export interface ISite {
  name: string;
}

export const SiteListCreator: React.FC<IProps> = (props) => {
  const [sites, setSites] = React.useState<ISite[]>([]);

  const handleSiteChange = (event: any, index: number) => {
    const _sites = cloneDeep(sites);
    const newSiteName = event.target.value;
    _sites[index].name = newSiteName;
    setSites(_sites);
    props.onChange(_sites);
  };

  const handleSiteBlur = (event: any, index: number) => {
    const _sites = cloneDeep(sites);
    const newSiteName = event.target.value;
    if (newSiteName === "") {
      _sites.splice(index, 1);
      setSites(_sites);
    }
    props.onChange(_sites);
  };

  const handleSiteAdd = () => {
    const _sites = cloneDeep(sites);
    _sites.push({ name: "new site" } as ISite);
    setSites(_sites);
    props.onChange(_sites);
  };
  const renderSiteList = () => {
    return sites.map((site, index) => {
      return (
        <TextField
          defaultValue={site.name}
          key={`site-${index + 1}`}
          label={`site-${index + 1}`}
          onChange={(e) => handleSiteChange(e, index)}
          onBlur={(e) => handleSiteBlur(e, index)}
          value={site.name}
        ></TextField>
      );
    });
  };

  return (
    <>
      <Typography variant="h4">Sites</Typography>
      {renderSiteList()}
      <IconButton aria-label="delete" color="primary" onClick={handleSiteAdd}>
        <AddIcon />
      </IconButton>
    </>
  );
};
