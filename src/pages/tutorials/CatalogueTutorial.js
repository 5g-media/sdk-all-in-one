import React from 'react';
import { Container } from 'reactstrap';
import catalogueScreen from 'assets/tutorial/privatecatalogue.jpg';

export default function CatalogueTutorial() {
  return (
    <Container>
      <div>
        <img src={catalogueScreen} alt="Catalogue" style={{ width: '100%' }} />
        <p>
          <br />
        </p>
       
        <p>A key feature of the 5G-MEDIA architecture is the catalogue where the descriptors of available applications and NSs are stored. This catalogue is present in the SDK as a private catalogue, allowing developers to design and validate applications, and in the core of the SVP as a public catalogue, storing all available applications and NSs descriptors for all platform users</p>
         <p>The screenshot provided represents the UI of the private catalogue. If the developer onboards the descriptor using validator web UI, they can view the descriptors in the private catalogue without any further action. Alternatively, the developer can onboard the descriptors with onboard VNF (or NS) buttons as shown in the screenshot. </p>
         <p>The private catalogue also validates the descriptors against TOSCA schema if the developer wants to onboard the descriptors without using validator UI. The VNFs should be packaged in CSAR format. If not, the developer can package their VNFs in CSAR format by using the validator web UI.</p>
        
         <p>The status of the descriptor whether it is onboarded locally, to public catalogue and to OSM is shown respectively in the boxes numbered <b>(1), (2),</b> and <b>(3)</b> in the screenshot. </p> 
         
         <p>The developer can perform the following actions with the buttons highlighted in the screenshot:</p>

          <p>(a)  The developer can view the descriptor text clicking on the button referred with <b>(a)</b></p>

          <p>(b) The developer can view the VNF Function Graph clicking on the button referred with <b>(b)</b></p>

          <p>(c) The developer can change the status of the VNFs or NSs (enabled or disabled) clicking on the button referred with <b>(c)</b></p>

          <p>(d) The developer can onboard the application or network service to public catalogue clicking the button referred with <b>(d)</b></p>

          <p>(e) The developer can remove the application or network service clicking the button referred with <b>(e)</b> <b>Before attempting to delete the applications or network services, the developer should confirm their status is disabled and NS should be removed before its associated VNFs.</b> </p>
        
      </div>
    </Container>
  );
}
