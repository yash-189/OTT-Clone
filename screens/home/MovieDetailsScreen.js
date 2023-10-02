import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { StarIcon } from 'react-native-heroicons/solid';
import { useDispatch, useSelector } from 'react-redux';
import { selectmovieDetail } from '../../redux/movieDetails/movieDetailSlice';
import { fetchMovieDetail } from '../../redux/movieDetails/api';
import { Dimensions } from 'react-native';
import { ClockIcon, XCircleIcon } from 'react-native-heroicons/outline';

const windowWidth = Dimensions.get('window').width;


const MovieDetailsScreen = ({ route, navigation }) => {
  const { movieId } = route.params;
  const dispatch = useDispatch();
  const movieDetails = useSelector(selectmovieDetail);

  useEffect(() => {
    dispatch(fetchMovieDetail(movieId));
  }, [dispatch, movieId]);


  return (
    <ScrollView style={styles.container}>
     
      {/* Backdrop */}
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}` }} style={styles.backdrop} />
      <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.crossButton} >
        <XCircleIcon size={25} color={'#ffffff'} />
      </TouchableOpacity>
      {/* Poster */}
      <View style={styles.posterContainer}>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}` }} style={styles.poster} />
      </View>

      {/* Movie Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.timeBox}>
          <ClockIcon size={20} color={'gray'} />
          <Text style={styles.runtime}>{Math.floor(movieDetails.runtime / 60)}h {movieDetails.runtime % 60}min</Text>
        </View>

        <Text style={styles.title}>{movieDetails.title}</Text>

        <View style={styles.genre}>
          {movieDetails?.genres?.map((genre) =>
            <Text style={styles.genreName}>
              {genre.name}
            </Text>)}
        </View>
        <Text style={styles.tagline} >
          {movieDetails.tagline}
        </Text>
        <View style={styles.ratingContainer}>
          <StarIcon size={18} color={'gold'} />
          <Text style={styles.rating}>{(movieDetails.vote_average)?.toFixed(1)} ({movieDetails.vote_count}) {new Date(movieDetails.release_date)?.toLocaleDateString('en-US', { day: "numeric", month: "long", year: "numeric" })}</Text>
        </View>


        <Text style={styles.overview}>{movieDetails.overview}</Text>
      </View>


      <View style={styles.footer}>



        {/* Select Seats Button */}
        <TouchableOpacity style={styles.selectSeatsButton}>
          <Text style={styles.selectSeatsButtonText}>Select Seats</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    position:'relative'
  },
  crossButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    backgroundColor: '#ff7043',
    padding:6,
    borderRadius:50
  },
  backdrop: {
    width: '100%',
    height: 200,
  },
  posterContainer: {
    alignItems: 'center',
    marginTop: -90,
    marginBottom: 20,
  },
  poster: {
    width: windowWidth * 0.8,
    height: windowWidth * 1.2,
    borderRadius: 10,
    borderColor: 'white',
    backgroundColor: '#333',
    resizeMode: 'cover',
  },
  timeBox: {
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 20,
    textAlign: 'center'
  },
  genreName: {
    color: 'gray',
    fontSize: 12,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20

  },
  genre: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',

  },
  tagline: {
    color: 'gray',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 10,
    marginBottom: 20
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rating: {
    color: '#ffffff',
    fontSize: 15,
    marginLeft: 5,
    fontWeight: '500'
  },

  runtime: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '500'
  },
  overview: {
    color: 'gray',
    fontSize: 16,
    marginBottom: 20,
  },
  footer: {
    padding: 20,
    alignItems: 'center'
  },
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  castList: {
    color: 'gray',
    fontSize: 16,
    marginBottom: 20,
  },
  selectSeatsButton: {
    backgroundColor: '#ff7043',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    width: 150,
    marginHorizontal: 'auto',

  },
  selectSeatsButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MovieDetailsScreen;
