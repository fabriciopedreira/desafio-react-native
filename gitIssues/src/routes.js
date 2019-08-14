import { createAppContainer, createStackNavigator } from 'react-navigation';

import Home from './screens/Home';
import ListUser from './screens/ListUser';
import ListIssues from './screens/ListIssues';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Home,
      ListUser,
      ListIssues,
    },
    {
      headerLayoutPreset: 'center',
      headerBackTitleVisible: false,
      defaultNavigationOptions: {
        headerStyle: {
          //backgroundColor: 'transparent',
        },
        headerTintColor: '#000',
      },
    }
  )
);

export default Routes;
