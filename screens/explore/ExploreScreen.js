import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import { MagnifyingGlassIcon } from 'react-native-heroicons/solid';
import { useDispatch, useSelector } from 'react-redux';
import { selectPopularMovies, selectSearchMovies } from '../../redux/movies/movieSlice';
import { fetchMovieByName } from '../../redux/movies/api';
import Loader from '../../src/components/loader/Loader';

const ExploreScreen = ({ navigation,route }) => {
// const search = route?.params?.search 

console.log("🚀 ~ file: ExploreScreen.js:12 ~ ExploreScreen ~ search:", route?.params?.search)


  const dispatch = useDispatch()
  const popularMovies = useSelector(selectPopularMovies)
  const searchData = useSelector(selectSearchMovies)


  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {

    dispatch(fetchMovieByName(query))
  };

  useEffect(() => {
  if (route?.params?.search) {
    console.log('search',route?.params?.search);
    
    dispatch(fetchMovieByName(route?.params?.search))
    setSearchQuery(route?.params?.search)
  }

  }, [dispatch])
  
  
  console.log("🚀 ~ file: ExploreScreen.js:13 ~ ExploreScreen ~ searchData:", searchData)

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('MovieDetails',{movieId:item.id})} style={styles.movieItem}>
      <Image resizeMode='contain' source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.movieImage} />
      <Text style={styles.movieTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

 

  return (
    <View style={styles.container}>
      {searchData.status ==='loading' && <Loader/>}
      {/* Search Bar */}
      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search your movies"
          placeholderTextColor="gray"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          onSubmitEditing={()=>handleSearch(searchQuery)}
        />
        <TouchableOpacity onPress={()=>handleSearch(searchQuery)}>
          <MagnifyingGlassIcon color={'#ff7043'} size={24} />
        </TouchableOpacity>
      </View>

      {/* Search Results */}
      {searchData?.result && <FlatList
        data={searchData?.result }
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        contentContainerStyle={styles.flatListContainer}
      />}

      {searchData.result=='' && <FlatList
        data={popularMovies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        contentContainerStyle={styles.flatListContainer}
      />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 16,
  },
  searchBox: {
    borderWidth: 1,
    borderColor: 'gray',
    flexDirection: 'row',
    borderRadius: 20,
    height: 56,
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  searchBar: {
    color: '#ffffff',
    paddingLeft: 8,
    flex: 1,
  },
  movieItem: {
    flex: 1,
    margin: 8,
  },
  movieImage: {
    width: '100%',
    height: 240,
    borderRadius: 20,
  },
  movieTitle: {
    color: 'gray',
    marginTop: 8,
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center'
  },
  flatListContainer: {
    justifyContent: 'center',
  },
});

export default ExploreScreen;
