import React, { Component } from 'react';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from 'react-simple-maps';

import { getColor } from 'utils/colors';
import ReactTooltip from "react-tooltip";

import world50m from 'assets/geo-data/world-50m.json';

class BubbleMap extends Component {
  state = {
    cities: [],
  };
  consortiums = [59,65,69,49,97,77,196,96];
  async componentDidMount() {
    const cities = await import('assets/geo-data/world-most-populous-cities.json');

    this.setState({
      cities,
    });
  }

  render() {
    // const primaryColor = getColor('primary');
    const secondaryColor = getColor('secondary');
    const lightColor = getColor('light');

    return (
      <div>
      <ComposableMap
        projectionConfig={{ scale: 205 }}
        width={150}
        height={220}
        style={{
          width: '100%',
          height: '596px',
        }}>
        <ZoomableGroup center={[15, 40]} zoom="1.40">
          <Geographies geography={world50m}>
            {(geographies, projection) =>
              geographies.map(
                (geography, i) =>
                  geography.id !== 'ATA' && (
                    <Geography
                      key={i}
                      data-tip= {this.consortiums.includes(i) ? geography.properties.name : ""}
                      geography={geography}
                      projection={projection}
                      style={{
                        default: {
                          fill: lightColor,
                          outline: 'none',
                        },
                        pressed: {
                          fill: secondaryColor,
                          outline: 'none',
                        },
                      }}
                    />
                  )
              )
            }
          </Geographies>
          <Markers>
            {this.state.cities.map((city, i) => (
              <Marker key={i} 
              marker={city}
              style={{
                default: { fill: "#FF5722" },
                hover: { fill: "#FFFFFF" },
                pressed: { fill: "#FF5722" },
              }}>
                <circle
                  cx={0}
                  cy={0}
                  r={1}
                  fill={secondaryColor}
                  style={{
                    stroke: "#FF5722",
                    strokeWidth: 2,
                    opacity: 1,
                  }}
                />
              </Marker>
            ))}
          </Markers>
        </ZoomableGroup>
      </ComposableMap>
    <ReactTooltip/>
  </div>  
  );
  }
}

export default BubbleMap;
