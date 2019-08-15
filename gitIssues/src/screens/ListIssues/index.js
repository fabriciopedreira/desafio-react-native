import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, Linking } from 'react-native';
import api from '../../services/api';

import {
  Container,
  TextFilter,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  TextMessage,
  ViewButtonFilters,
  TextFilterActive,
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
    refreshing: false,
  }

  async componentDidMount() {
    this.handleAddUser()
  }

  handleAddUser = async () => {
    const issues = await api.get(`/repos/${this.state.owner}/${this.state.title}/issues`);
    this.setState({ issues: issues.data, loading: false });
  }

  onRefresh() {
    this.setState({ refreshing: true }, function() { this.handleAddUser(); } );
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
    const { issues, loading, filter, refreshing } = this.state;

    return (
      <Container>
        {
          loading ? (
            <ActivityIndicator color="#7159c1" size='large' />
          ) :
            issues.length === 0 ? <TextMessage>Esse repositório não possui issues até o momento.</TextMessage> :
          (
            <>
            <ViewButtonFilters>
              <TouchableOpacity onPress={() => this.changeFilter('all')}>
                {
                  filter === 'all' ? <TextFilter>Todas</TextFilter> : <TextFilterActive>Todas</TextFilterActive>
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.changeFilter('open')}>
                {
                  filter === 'open' ? <TextFilter>Abertas</TextFilter> : <TextFilterActive>Abertas</TextFilterActive>
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.changeFilter('closed')}>
                {
                  filter === 'close' ? <TextFilter>Fechadas</TextFilter> : <TextFilterActive>Fechadas</TextFilterActive>
                }
              </TouchableOpacity>
            </ViewButtonFilters>
              {
                this.state.filter !== 'all' && issues.filter(this.filter).length < 1 ?
                  <TextMessage>Não encontramos issues com status: {this.state.filter}</TextMessage>
                : null
              }
              <Stars
                data={issues.filter(this.filter)}
                keyExtractor={issues => String(issues.id)}
                onRefresh={() => this.handleAddUser()}
                refreshing={refreshing}
                renderItem={( { item }) => (
                  <TouchableOpacity onPress={ ()=>{ Linking.openURL(item.html_url);}}>
                    <Starred>
                      <OwnerAvatar source={{ uri: item.user.avatar_url }} />
                      <Info>
                        <Title>{item.title}</Title>
                        <Author>{item.state}</Author>
                      </Info>
                    </Starred>
                  </TouchableOpacity>
                )}
              />
            </>
          )
        }
      </Container>
    );
  }
}
