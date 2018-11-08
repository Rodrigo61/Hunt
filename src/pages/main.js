import React, { Component } from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import api from '../services/api';

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
      <TouchableOpacity style={styles.productButton} onPress={() => {}}>
        <Text style={styles.productButtonText}>Acessar URL</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <View style={ styles.container }>
        <Text> Página Main: </Text>
        <FlatList
          contentContainerStyle={ styles.list }
          data={ this.state.docs }
          keyExtractor={ item => item._id }
          renderItem={ this.renderItem }
          onEndReached={ this.loadMore }
          onEndReachedThreshold={ 0.2 }
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff7fe'
  },

  list: {
    padding: 20
  },

  productContainer: {
    backgroundColor: '#ffe0d0',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
  },

  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',

  },

  productText: {
    fontSize: 12,
    marginTop: 5,
    lineHeight: 24,
  },

  productButton: {
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#DA552F',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  productButtonText: {
    color: '#DA552F',
    fontWeight: 'bold',
  },

});