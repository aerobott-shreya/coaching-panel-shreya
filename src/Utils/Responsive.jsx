import React from 'react'
import MediaQuery from 'react-responsive';



export class IsDesktopOrLaptopWrapper extends React.Component {
    render() {
        return (
            <MediaQuery minDeviceWidth={1224} >
                {
                    this.props.children
                }
            </MediaQuery>

        )
    }
}

