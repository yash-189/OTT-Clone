import { View, Text, StyleSheet, TextInput, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect ,useState} from 'react';
import { useWindowDimensions } from 'react-native';
import { Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGenre, fetchMovies, fetchPopularMovies, fetchTopRatedMovies, fetchUpcomingMovies } from '../../redux/movies/api';
import { selectGenre, selectMovies, selectMoviesStatus, selectPopularMovies, selectTopRatedMovies, selectUpcomingMovies } from '../../redux/movies/movieSlice';
import { StarIcon } from "react-native-heroicons/solid";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import MovieCard from '../../src/components/cards/MovieCard';

import { useFocusEffect } from '@react-navigation/native';
import Loader from '../../src/components/loader/Loader';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch()

  const movies = useSelector(selectMovies)
  const topRatedMovies = useSelector(selectTopRatedMovies)
  const upcomingMovies = useSelector(selectUpcomingMovies)
  const popularMovies = useSelector(selectPopularMovies)
  const status = useSelector(selectMoviesStatus)
  const [searchQuery, setsearchQuery] = useState('')

  console.log("🚀 ~ file: HomeScreen.js:20 ~ HomeScreen ~ popularMovies:", popularMovies)

  const genre = useSelector(selectGenre)

  useEffect(() => {
    dispatch(fetchMovies())
    dispatch(fetchGenre())
    dispatch(fetchPopularMovies())
    dispatch(fetchTopRatedMovies())
    dispatch(fetchUpcomingMovies())
  }, [dispatch])


  const moviesWithGenres = movies?.map((movie) => ({
    ...movie,
    genres: movie?.genre_ids?.map((genreId) => genre[genreId])
  })

  )

  // movie item
  const renderMovieItem = ({ item }) => (
    <TouchableOpacity onPress={()=>navigation.navigate('MovieDetails',{movieId:item.id})} style={styles.movieItem}>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.movieImage} />
      <View style={styles.movieDetails}>
        <View style={styles.rating}>
          <StarIcon size={18} color={'gold'} />

          <Text style={styles.movieInfo}>
            {item.vote_average} ({item.vote_count})
          </Text>
        </View>
        <Text style={styles.movieTitle}>{item.title}</Text>

        <View style={styles.genre}>
          {item?.genres?.map((genre) =>
            <Text style={styles.genreName}>
              {genre}
            </Text>)}
        </View>


      </View>
    </TouchableOpacity>
  );







  return (
    <ScrollView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search your movies"
          placeholderTextColor="gray"
          value={searchQuery}
          onChangeText={(text) => setsearchQuery(text)}
          onSubmitEditing={()=>navigation.navigate('Explore',{search:searchQuery})}
        />
         <TouchableOpacity onPress={()=>navigation.navigate('Explore',{search:searchQuery})}>
          <MagnifyingGlassIcon color={'#ff7043'} size={24} />
        </TouchableOpacity>
      </View>
      {/* Now Playing Movies */}

      <Text style={styles.sectionTitle}>Now Playing</Text>

      <FlatList
        data={moviesWithGenres}
        renderItem={renderMovieItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}

        pagingEnabled
        snapToInterval={windowWidth / 1.3 + 20}
        decelerationRate="fast"
      />

      {/* Popular Movies */}
      <Text style={styles.sectionTitle}>Popular</Text>
      <FlatList
        data={popularMovies}
        renderItem={({item})=><MovieCard navigation={navigation} item={item}/>}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />

      {/* upcoming Movies */}
      <Text style={styles.sectionTitle}>Upcoming</Text>
      <FlatList
        data={upcomingMovies}
        renderItem={({item})=><MovieCard navigation={navigation} item={item}/>}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />
      {/* toprated Movies */}
      <Text style={styles.sectionTitle}>Top Rated</Text>
      <FlatList
        data={topRatedMovies}
        renderItem={({item})=><MovieCard navigation={navigation} item={item}/>}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />
      {status==='loading' && <Loader/>}

    </ScrollView>
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
    marginHorizontal: 10
  },
  searchBar: {

    color: '#ffffff',
    paddingLeft: 8,
    flex: 1

  },
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: 10
  },
  movieItem: {
    width: windowWidth / 1.3,
    height: windowHeight / 1.5,
    marginRight: 20,
    marginBottom: 20,

    // backgroundColor: 'red' 
  },
  movieImage: {
    borderRadius: 20,
    width: '100%',
    height: '80%',
    marginBottom:10
  },
  movieDetails: {
    marginTop: 4,
    gap: 10,
  },
  movieTitle: {
    color: '#ffffff',
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '400',
    marginBottom: 4

  },
  rating: {
    flexDirection: 'row',
    gap: 2,
    justifyContent: 'center'
  },
  movieInfo: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',

  },
  genreName: {
    color: 'gray',
    fontSize: 12,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20

  },
  genre: {
    marginBottom: 4,
    flexDirection: 'row',
    justifyContent: 'space-evenly',

  },
  
});

export default HomeScreen;
