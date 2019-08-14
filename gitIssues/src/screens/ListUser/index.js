import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class ListUser extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  })

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  }

  state = {
    stars: [],
    loading: false,
  }

  async componentDidMount() {
    const { navigation } = this.props;
    this.setState({ loading: true });

    const user = navigation.getParam('user');

    const response = await api.get(`/users/${user.login}/repos`);
    console.log("response", response)

    this.setState({ stars: response.data, loading: false });
  }

  handleNavigate = (repo) => {
    const { navigation } = this.props;
    navigation.navigate('ListIssues', { repo });
  }

  render() {
    const { navigation } = this.props;
    const { stars, loading } = this.state;

    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        {
          loading ? (
            <ActivityIndicator color="#7159c1" size='large' />
          ) : (
            <Stars
              data={stars}
              keyExtractor={star => String(star.id)}
              renderItem={( { item }) => (
                <Starred>
                  <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                  <Info>
                    <Title>{item.name}</Title>
                    <Author>{item.owner.login}</Author>
                  </Info>

                  {/* <ProfileButton onPress={() => this.handleNavigate(item)}>
                    <ProfileButtonText>
                      <Icon name="keyboard-arrow-right" size={25} color="#999" />
                    </ProfileButtonText>
                  </ProfileButton> */}

                  <TouchableOpacity onPress={() => this.handleNavigate(item)}>
                    <Icon name="keyboard-arrow-right" size={25} color="#999" />
                  </TouchableOpacity>
                </Starred>
              )}
            />
          )
        }
      </Container>
    );
  }
}
