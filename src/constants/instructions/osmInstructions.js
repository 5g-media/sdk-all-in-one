export const osmInstructions = [
  {
    title: 'Step 0. osm client basics',
    buttonText: 'osm --help',
    cardText1:
      'To interact with OSM during this tutorial we’ll use the command line interface,osm.',
    cardText2:
      'To check if osm is installed you can run the osm --help command to see the usage options:',
  },
  {
    title: 'Step 1. VNF descriptor generation',
    buttonText: 'osm vnfd-create',
    cardText1: 'To create virtual network function descriptors,',
    cardText2: ' you can run osm vnfd-create command with file names:',
    cardText3: 'You can now check the packages by wsk list:',
    buttonText2: 'osm vnfd-list',
  },
  {
    title: 'Step 2. NS descriptor generation',
    buttonText: 'osm nsd-create',
    cardText1: 'To create network service descriptor,',
    cardText2: 'you can run osm nsd-create command with file names:',
    cardText3:
      'You can now check OSM by osm client to see the NS in the catalog:',
    buttonText2: 'osm nsd-list',
  },
  {
    title: 'Step 3. Instantiate a service',
    buttonText: 'osm ns-create',
    cardText1: 'Instantiate example pingpong service:',
    cardText2: 'Check service instance:',
    buttonText2: 'osm ns-list',
  },
  {
    title: 'Step 4. Deletion the existing service',
    buttonText: 'osm ns-delete',
    cardText1: 'Delete service instance:',
  },
];
