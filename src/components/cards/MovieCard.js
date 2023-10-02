import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MovieCard = ({navigation,item}) => {
  
  return (
        <TouchableOpacity  onPress={()=>navigation.navigate('MovieDetails',{movieId:item.id})}  style={styles.movieItem}>
          <Image alt='poster' source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.movieImage} />
          <Text style={styles.movieTitle}>{item.title}</Text>
        </TouchableOpacity>
     
  )
}

const styles = StyleSheet.create({
    movieItem: {
        width: windowWidth / 2.8,
        marginRight: 20,
        marginBottom: 10,
      },
      movieImage: {
        width: '100%',
        height: windowWidth / 1.9,
        borderRadius: 20,
        marginBottom: 8,
      },
      movieTitle: {
        color: 'gray',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '500',
      },
})

export default MovieCard