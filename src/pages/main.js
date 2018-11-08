import React, { Component } from 'react';
import {View, Text} from 'react-native';

export default class Main extends Component {
  static navigationOptions = {
    title: "JSHunt"
  };

  state = {
    productInfo: {},
    docs: [],
    page: 1,
  };

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async (page = 1) => {
    const response = await api.get('/products?page='+page);

    const { docs, ...productInfo } = response.data;

    this.setState({ docs: [...this.state.docs, ...docs], productInfo , page});
  };

  loadMore = () => {
    const {page, productInfo} = this.state;
    
    if (page != productInfo.pages) {
      this.loadProducts(page + 1);
    }

  };

  renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Text style={styles.productTitle}> {item.title} </Text>
      <Text style={styles.productText}> {item.description} </Text>

      <TouchableOpacity
        style={styles.productButton}
        onPress={() => {
          this.props.navigation.navigate('Products', {product: item});
        }}
      >
        <Text style={styles.productButtonText}>Acessar URL</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <View>
        <Text> Página Main </Text>
      </View>
    );
  }
}