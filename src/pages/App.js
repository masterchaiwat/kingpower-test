import StaffEditor from '../components/StaffEditor';
import React from 'react';
import StaffGrid from '../components/StaffGrid';

const App = () => {
    return (
        <React.Fragment>
            <StaffEditor/>
            <br></br>
            <StaffGrid/>
        </React.Fragment>
    )
}

export default App;