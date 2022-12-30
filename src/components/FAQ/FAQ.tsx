import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const FAQ: React.FC = () => {
  return (
    <div>
      <Typography variant="h6" sx={{ color: "#264653" }} textAlign="center">
        Frequently Asked Questions
      </Typography>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ color: "#264653" }}>What is a site?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            A site is a point on a map that you wish to visit. The number on the
            marker that appears on the map after you create a site indicates the
            order in which you are visiting each site. For instance, if you were
            to click on Toronto, then Chicago, then Louisiana, that would mean
            you wish to visit Toronto first, Chicago second, and Louisiana last.
            This is reflected by the ordering shown on the map with the site
            marker on Toronto being 1, Chicago being 2, and Louisiana being 3.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ color: "#264653" }}>
            I am seeing errors that say &quot;Could not find enough hotels in
            route given constraints, please loosen constraints&quot;. What does
            that mean?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            It looks like the constraints you provided have resulted in a lack
            of hotel options for one or more nights in our service. To help you
            with creating a complete trip plan, we recommend loosening your
            constraints so that our algorithm can consider a wider range of
            hotels. Please keep in mind that our algorithm is constantly
            improving and will soon be able to handle more and more unique
            situations.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
