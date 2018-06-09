import React from 'react';
import { PageHeader,
      Button,
      ButtonGroup,
      ListGroupItem,
      ListGroup,
      Glyphicon,
      Panel,
      Image,
      Grid,
      Col,
      Row,
      Text,
      Badge,
    } from 'react-bootstrap';

import { Player } from 'video-react';
import "../node_modules/video-react/dist/video-react.css"; // import css



export default () => (
  <section>
    <PageHeader>About</PageHeader>
    <p><b>Symphony Hackathon June 2018 SG/HK/TKY</b> Featuring Symphony Technologies. </p>
    <p>
    </p>
    <p>
    Messaging is a powerful tool. If you can utilize in a secure platform, it also provides as a medium
    to access/communicate when not at your desk. 
    </p>
    <p>
    </p>
    <p>
    The Application implemented by TradeOK is an example where Traders of Bonds/Repos from a Market Taker.  The  perspective is Bond netural and needs to fund the positions of Bonds by using Repos.

Often a view of this nature, needs daily monitoring and keep rolling repos at the current market rate for expired due  repos.  This tool is meant to show and example of dissemination of possible repos to  broadcast too select counterparts/interested Market Makers.

The Bot/automated application would try and fill the orders of the day.

Once ticket is done, this can easily be workflowed to Trading platforms/Middle operations for clearence.
     </p>
   

    <p>
    </p>
    <p>
    </p>
    <p>
      Created by TradeOK <a href="https://www.linkedin.com/in/justin-woodhead-43b1511b/">Justin Woodhead</a>,<a href="https://www.linkedin.com/in/himanshupanchal/">Himanshu Panchal</a>  If you need further details, drop a line in linkedin.

    </p>
  </section>
);
