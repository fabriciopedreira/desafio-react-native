import React from 'react';
//import { View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Form, Input, SubmitButton } from './styles';

export default function Home() {
  return (
    <Container>
      <Form>
        <Input
          autoCorrect={false}
          autoCapitaliza="none"
          placeholder="Adicionar usúario"
        />
        <SubmitButton>
          <Icon name="add" size={20} color="#FFF" />
        </SubmitButton>
      </Form>
    </Container>
  );
}

Home.navigationOptions = {
  title: 'GitIssues',
};
