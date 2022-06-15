import * as React from 'react';
import { NativeRouter,Route,Switch } from 'react-router-native';
import Login from './pages/Login';
import Home from './pages/Home';
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
    <NativeRouter>
        <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/home" component={Home}/>
        </Switch>
    </NativeRouter>
    </PaperProvider>
  );
}
