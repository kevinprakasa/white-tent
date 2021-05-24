import React, { Component } from 'react';

export default class ReportViewer extends Component {
    // The componentDidMount() method runs after the component output has been rendered to the DOM. 
    componentDidMount() {
        window.jQuery('#reportViewer1')
            .telerik_ReportViewer({
                reportServer: {
                    url: "http://desktop-dtv4bsb:83",
                    username: "misaeljonathann",
                    password: "whitetent"
                },
                reportSource: {
                    report: 'Samples/WhiteTent2'
                },
                scale: 1.0,
                viewMode: 'INTERACTIVE',
                printMode: 'SPECIFIC',
                sendEmail: { enabled: true }
            });
    }

    render() {
        return <div id="reportViewer1"></div>
    }
} 