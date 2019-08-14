import React, { Component } from 'react';
import { Keyboard, ActivityIndicator, View } from 'react-native';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
  ProfileButton,
  ProfileButtonText,
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
    isFetching: false,
  }

  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');

    if (users) {
      this.setState({ users: JSON.parse(users) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { users } = this.state;
    if (prevState.users !== users) {
      AsyncStorage.setItem('users', JSON.stringify(users));
    }

   // AsyncStorage.clear();
  }

  handleAddUser = async () => {
    const { users, newUser } = this.state;
    this.setState({ loading: true });

    const response = await api.get(`/users/${newUser}`);
    console.tron.log("response", response)
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
      isFetching: false,
    });

    Keyboard.dismiss();

    //AsyncStorage.clear();
  }

  handleNavigate = (user) => {
    const { navigation } = this.props;
    navigation.navigate('ListUser', { user });
  }

  onRefresh() {
    this.setState({ isFetching: true }, function() { this.handleAddUser()});
 }

  render() {
    const { users, newUser, loading } = this.state;

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
                <ActivityIndicator color="#FFF" />
              ) : (
                <Icon name="add" size={20} color="#000" />
              )
            }
          </SubmitButton>
        </Form>

        <List
          data={users}
          keyExtractor={user => user.login}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
          renderItem={( { item } ) => (
            <User>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Avatar source={{ uri: item.avatar }} />
                <View style={{ maxWidth: '80%', }}>
                  <Name>{item.name}</Name>
                  <Bio>{item.company}</Bio>
                </View>
              </View>

              <ProfileButton onPress={() => this.handleNavigate(item)}>
                <ProfileButtonText>
                  <Icon name="keyboard-arrow-right" size={25} color="#999" />
                </ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
}
