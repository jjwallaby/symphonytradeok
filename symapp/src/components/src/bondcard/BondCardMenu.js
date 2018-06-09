import React from 'react';
import { PageHeader } from 'react-bootstrap';

import BondCard from './BondCard';

export default(props) => (
    <section>
        <BondCard {...props}/>
    </section>
);
