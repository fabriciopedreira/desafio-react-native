import React, { Component } from 'react';
import { Keyboard, ActivityIndicator, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import MyIcon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ViewAvatar,
  ViewAvatarBio,
  DeleteUser,
} from './styles';

export default class Home extends Component {
  static navigationOptions = {
    title: 'GitIssues',
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    newUser: '',
    users: [],
    loading: false,
    refreshing: false,
  }

  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');
    console.log("date", new Date(1565848714 * 1000))

    if (users) {
      this.setState({ users: JSON.parse(users) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { users } = this.state;
    if (prevState.users !== users) {
      AsyncStorage.setItem('users', JSON.stringify(users));
    }
    //AsyncStorage.clear();
  }

  handleAddUser = async () => {
    const { users, newUser } = this.state;

    if (newUser !== '') {
      this.setState({ loading: true, refreshing: true });

      const response = await api.get(`/users/${newUser}`);
      console.log("response", response)

      const data = {
        id: response.data.id,
        name: response.data.name,
        login: response.data.login,
        company: response.data.company,
        avatar: response.data.avatar_url,
      };

      this.setState({
        users: [...users, data],
        newUser: '',
        loading: false,
        refreshing: false,
      });

      Keyboard.dismiss();
      //AsyncStorage.clear();
    } else {
      this.setState({ loading: false, refreshing: false });
    }
    //AsyncStorage.clear();
  }

  handleNavigate = (user) => {
    const { navigation } = this.props;
    navigation.navigate('ListUser', { user });
  }

  onRefresh() {
    this.setState({ refreshing: true }, function() { this.handleAddUser();});
  }

  deleteUser = () => {
    AsyncStorage.clear();
    this.setState({ users: [] })
  }

  render() {
    const { users, newUser, loading, refreshing } = this.state;
    console.log("users", users)

    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitaliza="none"
            placeholder="Adicionar novo repositório"
            value={newUser}
            onChangeText={text => this.setState({ newUser: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <SubmitButton loading={loading} onPress={this.handleAddUser}>
            {
              loading ? (
                <ActivityIndicator color="#999" />
              ) : (
                <MyIcon name="add" size={25} color="#000" />
              )
            }
          </SubmitButton>
          <DeleteUser onPress={this.deleteUser}>
            <MyIcon name="delete" size={25} color="#ef6464" />
          </DeleteUser>
        </Form>

        <List
          data={users}
          keyExtractor={user => user.login}
          onRefresh={() => this.handleAddUser()}
          refreshing={refreshing}
          renderItem={( { item } ) => (
            <TouchableOpacity onPress={() => this.handleNavigate(item)}>
              <User>
                <ViewAvatar>
                  <Avatar source={{ uri: item.avatar }} />
                  <ViewAvatarBio>
                    <Name>{item.name}</Name>
                    <Bio>{item.company}</Bio>
                  </ViewAvatarBio>
                </ViewAvatar>
                <MyIcon name="keyboard-arrow-right" size={25} color="#999" />
              </User>
            </TouchableOpacity>
          )}
        />
      </Container>
    );
  }
}
