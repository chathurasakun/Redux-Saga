import React, { PureComponent } from 'react';
import { FlatList, View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Container, Header, Left, Right, Title, Body } from 'native-base';
import ItemCell from '../appComponents/itemCell';
import { Actions } from 'react-native-router-flux';
import { getListRequest } from '../redux/Actions/CartAction';
import { connect } from 'react-redux';

class ListView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount = () => {
    this.props.getListRequest();
  }

  render = () => {
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title style={{ color: '#FFFFFF', alignSelf: 'center' }}>List</Title>
          </Body>
          <Right>
            <TouchableOpacity onPress={() => Actions.push('cardListView')}>
              <Text style={{ color: '#FFFFFF' }}>Card List</Text>
            </TouchableOpacity>
          </Right>
        </Header>

        <View style={{ flex: 1, backgroundColor: '#EBEBEB' }}>
          {(this.props.loading) ?
            <ActivityIndicator
              size='large'
              color='#7573E1'
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            />
            :
            <FlatList
              data={this.props.cardData}
              keyExtractor={(item, index) => item.id.toString()}
              renderItem={({ item }) => <ItemCell listItem={item} fromCardView={false} />}
              scrollEnabled={true}
            />
          }
        </View>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cardData: state.card.cardData,
    loading: state.card.loading,
    error: state.card.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getListRequest: () => {
      dispatch(getListRequest())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListView);

