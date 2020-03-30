export const leanInstructions = [
  {
    title: 'Step 0. wsk client basics',
    buttonText: 'wsk --help',
    firstButtonCommand: 'wsk --help',
    cardText1:
      'To interact with Lean OW during this tutorial we’ll use the command line interface,wsk.',
    cardText2:
      'To check if wsk is installed you can run the wsk --help command to see the usage options:',
  },
  {
    title: 'Step 1. Package generation',
    buttonText: 'wsk package create',
    firstButtonCommand: 'wsk -i package create tutorial',
    cardText1:
      'To create a package at Lean OpenWhisk, you can run wsk package create command with package name:',
    cardText3: 'You can now check the packages by wsk list:',
    buttonText2: 'wsk list packages',
    secondButtonCommand: 'wsk -i package list',
  },
  {
    title: 'Step 2. Action generation',
    buttonText: 'wsk action create',
    firstButtonCommand:
      'wsk -i action create /guest/tutorial/test --docker hello-action-img',
    cardText1: 'To create an action on the package at Lean OpenWhisk,',
    cardText2:
      'you can run wsk action create command with name of the action and dockerfile name of the source:',
    cardText3: 'You can now check the actions by wsk list:',
    buttonText2: 'wsk list actions',
    secondButtonCommand: 'wsk -i action list',
  },
  {
    title: 'Step 3. Checking the system',
    buttonText: 'wsk list',
    firstButtonCommand: 'wsk -i list',
    cardText1: 'Check the current status of the system:',
  },
  {
    title: 'Step 4. Details of the action',
    buttonText: 'wsk action get',
    firstButtonCommand: 'wsk -i action get tutorial/test',
    cardText1: 'See details about the action:',
  },
  {
    title: 'Step 5. Delete the action',
    buttonText: 'wsk action delete',
    firstButtonCommand: 'wsk -i action delete tutorial/test',
    cardText1: 'Delete an existing action:',
  },
  {
    title: 'Step 6. Delete the package',
    buttonText: 'wsk package delete',
    firstButtonCommand: 'wsk -i package delete tutorial',
    cardText1: 'Delete an existing package which has no action:',
  },
];
