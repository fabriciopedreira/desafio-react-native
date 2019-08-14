import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

import { Container, Form, Input, SubmitButton } from './styles';

export default class Home extends Component {
  state = {
    newUser: '',
    users: [],
  }

  handleAddUser = async () => {
    const { users, newUser } = this.state;

    const response = await api.get(`/users/${newUser}`);

    const data = {
      name: response.data.nome,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    }

    this.setState({
      users: [...users, data],
      newUser: '',
    });

    Keyboard.dismiss();

  }

  render() {
    const { users, newUser } = this.state;

    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitaliza="none"
            placeholder="Adicionar usúario"
            value={newUser}
            onChangeText={text => this.setState({ newUser: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <SubmitButton onPress={this.handleAddUser}>
            <Icon name="add" size={20} color="#FFF" />
          </SubmitButton>
        </Form>
      </Container>
    );
  }
}

Home.navigationOptions = {
  title: 'GitIssues',
};
