import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ActivityIndicator } from 'react-native';
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

export default class ListIssues extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('repo').name,
  })

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  }

  state = {
    issues: [],
    loading: true,
    owner: this.props.navigation.getParam('repo').owner.login,
    title: this.props.navigation.getParam('repo').name,
    filter: 'all',
  }

  async componentDidMount() {
    const issues = await api.get(`/repos/${this.state.owner}/${this.state.title}/issues`);
    console.log("issues", issues);
    this.setState({ issues: issues.data, loading: false });
  }

  handleNavigate = (user) => {
    const { navigation } = this.props;
    navigation.navigate('ListUser', { user });
  }

  changeFilter = (filter) => {
    this.setState({ filter });
  }

  filter = (item) => {
    return this.state.filter === 'all' || item.state === this.state.filter;
  }

  render() {
    const { navigation } = this.props;
    const { issues, loading } = this.state;

    //const user = navigation.getParam('user');

    return (
      <Container>
        {
          loading ? (
            <ActivityIndicator color="#7159c1" size='large' />
          ) :
            issues.length === 0 ? <Text>Esse repositório não possui issues até o momento.</Text> :
          (
            <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <TouchableOpacity onPress={() => this.changeFilter('all')}>
                <Text>Todos</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.changeFilter('open')}>
                <Text>Abertas</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.changeFilter('closed')}>
                <Text>Fechadas</Text>
              </TouchableOpacity>
            </View>

            {
              this.state.filter !== 'all' && issues.filter(this.filter).length < 1 ?
                <Text>Não encontramos issues com status: {this.state.filter}</Text>
              : null
            }

            <Stars
              data={issues.filter(this.filter)}
              keyExtractor={issues => String(issues.id)}
              renderItem={( { item }) => (
                <Starred>
                  <OwnerAvatar source={{ uri: item.user.avatar_url }} />
                  <Info>
                    <Title>{item.title}</Title>
                    <Author>{item.state}</Author>
                  </Info>
                  <TouchableOpacity onPress={() => this.handleNavigate(item)}>
                    <Icon name="keyboard-arrow-right" size={25} color="#999" />
                  </TouchableOpacity>
                </Starred>
              )}
            />
            </>
          )
        }

      </Container>
    );
  }
}
