import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background: #f5f5f5;
`;

export const Form = styled.View`
  flex-direction: row;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: #eee;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  flex: 1;
  height: 40px;
  background: #FFF;
  border-radius: 4px;
  padding: 0 15px;
  border: 1px solid #eee;
`;

export const SubmitButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  /* background: #7159c1; */
  border-radius: 4px;
  margin-left: 15px;
  padding: 0 10px;
  opacity: ${props => props.loading ? 0.7 : 1};
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const User = styled.View`
  background: #FFF;
  border-radius: 4px;
  padding: 10px 15px;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const Avatar = styled.Image`
  height: 42px;
  width: 42px;
  border-radius: 21px;
  background: #eee;
`;
export const Name = styled.Text.attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  font-size: 14px;
  color: #333;
  font-weight: bold;
  margin-top: 5;
  margin-left: 10;

`;
export const Bio = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-size: 13px;
  line-height: 18px;
  color: #999;
  margin-left: 10;
`;
export const ProfileButton = styled.TouchableOpacity`
  width: 42;
  height: 42;
  margin-top: 10px;
  align-self: stretch;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  height: 36px;
`;
export const ProfileButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
`;

export const ViewAvatar = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export const ViewAvatarBio = styled.View`
  max-width: 80%;
`;

export const DeleteUser = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  /* background: #7159c1; */
  border-radius: 4px;
  padding: 0 10px;
  margin-right: -15;
  opacity: ${props => props.loading ? 0.7 : 1};
`
